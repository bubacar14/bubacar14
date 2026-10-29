-- Révizo : test A/B de l'accueil. A = accueil en 3 étapes (classe, pays, prénom) ; B = classe seule, puis
-- photo ou exemple gratuit, prénom facultatif après la première correction.
alter table public.eleves add column version_accueil text;

alter table public.evenements drop constraint evenements_type_check;
alter table public.evenements add constraint evenements_type_check
  check (type in ('visite', 'bienvenue', 'essai', 'quiz', 'installation', 'recharge', 'partage', 'exercice', 'correction', 'prenom'));

-- La version de l'accueil est gardée à la première visite de l'appareil.
create or replace function public.revizo_evenement(p_cle_hash text, p_ip_hash text, p_type text, p_details jsonb)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  e := revizo_eleve(p_cle_hash, p_ip_hash);
  if (select count(*) from evenements where eleve_id = e.id and quand > now() - interval '1 day') >= 200 then
    return;
  end if;
  insert into evenements (eleve_id, type, details) values (e.id, p_type, coalesce(p_details, '{}'));
  update eleves set
    vu_le = now(),
    source = coalesce(source, nullif(p_details->>'source', '')),
    campagne = coalesce(campagne, nullif(p_details->>'campagne', '')),
    version_accueil = coalesce(version_accueil, nullif(p_details->>'version', '')),
    classe = coalesce(nullif(p_details->>'classe', ''), classe),
    pays = coalesce(nullif(p_details->>'pays', ''), pays)
  where id = e.id;
end $$;

-- Les 4 indicateurs, séparément pour chaque version de l'accueil (nouveaux élèves de la période, test exclus).
-- « Le lendemain » = le jour qui suit l'arrivée ; seuls les élèves arrivés avant aujourd'hui comptent pour ces deux-là.
create function public.revizo_admin_accueil(p_jours integer)
returns json
language sql security definer set search_path = public
as $$
  with depuis as (select date_trunc('day', now()) - make_interval(days => greatest(p_jours, 1) - 1) as t),
  nouveaux as (select * from eleves where not test and version_accueil is not null and cree_le >= (select t from depuis))
  select coalesce(json_agg(t order by t.version), '[]') from (
    select n.version_accueil as version,
      count(*) as nouveaux,
      count(*) filter (where exists (select 1 from evenements v where v.eleve_id = n.id and v.type = 'correction')) as premiere_correction,
      count(*) filter (where exists (select 1 from mouvements m where m.eleve_id = n.id and m.motif = 'exercice')) as exercice_perso,
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
