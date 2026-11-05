-- Révizo : version C de l'accueil. Une équation en 3 taps dès l'ouverture (événement « demo », étapes debut, 1, 2, 3, fin),
-- puis la promesse de revenir le lendemain à un moment choisi (événement « promesse », avec « tenue » le lendemain).
alter table public.evenements drop constraint evenements_type_check;
alter table public.evenements add constraint evenements_type_check
  check (type in ('visite', 'bienvenue', 'essai', 'quiz', 'installation', 'recharge', 'partage', 'exercice', 'correction', 'prenom', 'lecture', 'demo', 'promesse'));

-- Mêmes indicateurs qu'avant, plus 3 pour la version C : équation finie, promesse faite, promesse tenue.
create or replace function public.revizo_admin_accueil(p_jours integer)
returns json
language sql security definer set search_path = public
as $$
  with depuis as (select date_trunc('day', now()) - make_interval(days => greatest(p_jours, 1) - 1) as t),
  nouveaux as (select * from eleves where not test and version_accueil is not null and cree_le >= (select t from depuis))
  select coalesce(json_agg(t order by t.version), '[]') from (
    select n.version_accueil as version,
      count(*) as nouveaux,
      count(*) filter (where exists (select 1 from evenements v where v.eleve_id = n.id and v.type = 'demo' and v.details->>'etape' = 'fin')) as demo_finie,
      count(*) filter (where exists (select 1 from evenements v where v.eleve_id = n.id and v.type = 'correction')) as premiere_correction,
      count(*) filter (where exists (select 1 from mouvements m where m.eleve_id = n.id and m.motif = 'exercice')) as exercice_perso,
      count(*) filter (where exists (select 1 from evenements v where v.eleve_id = n.id and v.type = 'promesse' and v.details->>'tenue' is null)) as promesse,
      count(*) filter (where exists (select 1 from evenements v where v.eleve_id = n.id and v.type = 'promesse' and v.details->>'tenue' = 'true')) as promesse_tenue,
      count(*) filter (where n.cree_le::date < current_date) as base_lendemain,
      count(*) filter (where n.cree_le::date < current_date and exists (
        select 1 from evenements v where v.eleve_id = n.id and v.quand::date = n.cree_le::date + 1)) as retour_lendemain,
      count(*) filter (where n.cree_le::date < current_date and exists (
        select 1 from evenements v where v.eleve_id = n.id and v.quand::date = n.cree_le::date + 1
          and v.type in ('essai', 'quiz', 'correction', 'exercice'))) as activite_lendemain
    from nouveaux n group by 1
  ) t;
$$;
revoke all on function public.revizo_admin_accueil(integer) from public, anon, authenticated;
grant execute on function public.revizo_admin_accueil(integer) to service_role;
