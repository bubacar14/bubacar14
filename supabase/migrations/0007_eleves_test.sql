-- Révizo : les appareils utilisés pour tester l'appli avant le lancement ne comptent pas dans les statistiques.
alter table public.eleves add column test boolean not null default false;
update public.eleves set test = true where cree_le < now();
update public.commandes set test = true where eleve_id in (select id from public.eleves where test);
-- Les fonctions revizo_admin_stats et revizo_admin_eleves sont recréées avec le filtre « not test »
-- (voir les versions finales ci-dessous).

-- Tous les chiffres du tableau de bord, sur les N derniers jours (heure de Dakar = UTC).
create or replace function public.revizo_admin_stats(p_jours integer)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  depuis timestamptz := date_trunc('day', now()) - make_interval(days => greatest(p_jours, 1) - 1);
  resultat json;
begin
  with
  jours as (select generate_series(depuis::date, now()::date, interval '1 day')::date as jour),
  visites as (select quand::date as jour, count(distinct eleve_id) as n from evenements where type = 'visite' and quand >= depuis and eleve_id in (select id from eleves where not test) group by 1),
  nouveaux as (select cree_le::date as jour, count(*) as n from eleves where cree_le >= depuis and not test group by 1),
  exercices as (select quand::date as jour, count(*) as n from mouvements m where motif = 'exercice' and quand >= depuis and m.eleve_id in (select id from eleves where not test)
                and not exists (select 1 from mouvements r where r.reference = m.id and r.motif = 'remboursement') group by 1),
  revenus as (select payee_le::date as jour, sum(montant) as fcfa, count(*) as n from commandes where statut = 'payee' and not test and payee_le >= depuis group by 1),
  quiz as (select quand::date as jour, count(*) as n from evenements where type = 'quiz' and quand >= depuis and eleve_id in (select id from eleves where not test) group by 1),
  periode as (select * from eleves where cree_le >= depuis and not test)
  select json_build_object(
    'jours', p_jours,
    'totaux', json_build_object(
      'eleves', (select count(*) from eleves where not test),
      'nouveaux', (select count(*) from periode),
      'actifs', (select count(distinct eleve_id) from evenements where quand >= depuis and eleve_id in (select id from eleves where not test)),
      'actifs_aujourdhui', (select count(distinct eleve_id) from evenements where quand >= date_trunc('day', now()) and eleve_id in (select id from eleves where not test)),
      'exercices', (select coalesce(sum(n), 0) from exercices),
      'quiz', (select coalesce(sum(n), 0) from quiz),
      'essais', (select count(*) from evenements where type = 'essai' and quand >= depuis and eleve_id in (select id from eleves where not test)),
      'installations', (select count(*) from evenements where type = 'installation' and quand >= depuis and eleve_id in (select id from eleves where not test)),
      'revenus', (select coalesce(sum(fcfa), 0) from revenus),
      'commandes_payees', (select coalesce(sum(n), 0) from revenus),
      'commandes_commencees', (select count(*) from commandes where not test and creee_le >= depuis),
      'payeurs', (select count(distinct eleve_id) from commandes where statut = 'payee' and not test and payee_le >= depuis),
      'credits_vendus', (select coalesce(sum(credits), 0) from commandes where statut = 'payee' and not test and payee_le >= depuis),
      'signalements', (select count(*) from mouvements where motif = 'signalement' and quand >= depuis and eleve_id in (select id from eleves where not test))
    ),
    'par_jour', (select json_agg(json_build_object(
        'jour', j.jour, 'visiteurs', coalesce(v.n, 0), 'nouveaux', coalesce(nv.n, 0), 'exercices', coalesce(x.n, 0),
        'quiz', coalesce(q.n, 0), 'revenus', coalesce(r.fcfa, 0)) order by j.jour)
      from jours j left join visites v using (jour) left join nouveaux nv using (jour) left join exercices x using (jour)
      left join quiz q using (jour) left join revenus r using (jour)),
    -- Entonnoir des nouveaux élèves de la période : arrivés, accueil fini, essai ou exercice, recharge ouverte, payé.
    'entonnoir', json_build_object(
      'arrives', (select count(*) from periode),
      'bienvenue', (select count(*) from periode p where exists (select 1 from evenements e where e.eleve_id = p.id and e.type = 'bienvenue')),
      'premier_exercice', (select count(*) from periode p where exists (select 1 from evenements e where e.eleve_id = p.id and e.type = 'essai')
                            or exists (select 1 from mouvements m where m.eleve_id = p.id and m.motif = 'exercice')),
      'recharge', (select count(*) from periode p where exists (select 1 from evenements e where e.eleve_id = p.id and e.type = 'recharge')),
      'payeurs', (select count(*) from periode p where exists (select 1 from commandes c where c.eleve_id = p.id and c.statut = 'payee' and not c.test))
    ),
    'par_pays', (select coalesce(json_agg(t order by t.n desc), '[]') from (select coalesce(pays, '?') as cle, count(*) as n from periode group by 1) t),
    'par_classe', (select coalesce(json_agg(t order by t.n desc), '[]') from (select coalesce(classe, '?') as cle, count(*) as n from periode group by 1) t),
    'par_source', (select coalesce(json_agg(t order by t.n desc), '[]') from (
        select coalesce(p.source, 'direct') as cle, coalesce(max(p.campagne) filter (where p.campagne is not null), '') as campagne, count(*) as n,
               count(*) filter (where exists (select 1 from mouvements m where m.eleve_id = p.id and m.motif = 'exercice')
                                   or exists (select 1 from evenements e where e.eleve_id = p.id and e.type = 'essai')) as actives,
               count(*) filter (where exists (select 1 from commandes c where c.eleve_id = p.id and c.statut = 'payee' and not c.test)) as payeurs
        from periode p group by 1) t),
    'commandes', (select coalesce(json_agg(t), '[]') from (
        select c.reference, c.offre, c.credits, c.montant, c.statut, c.test, c.creee_le, c.payee_le, e.pays, left(e.id::text, 8) as eleve
        from commandes c join eleves e on e.id = c.eleve_id order by c.creee_le desc limit 30) t)
  ) into resultat;
  return resultat;
end $$;

-- Liste des élèves (les plus récents d'abord), avec un résumé de leur activité.
create or replace function public.revizo_admin_eleves(p_recherche text, p_limite integer)
returns json
language sql security definer set search_path = public
as $$
  select coalesce(json_agg(t), '[]') from (
    select left(e.id::text, 8) as id, e.pays, e.classe, e.source, e.campagne, e.credits, e.cree_le, e.vu_le,
      (select count(*) from mouvements m where m.eleve_id = e.id and m.motif = 'exercice') as exercices,
      (select count(*) from evenements v where v.eleve_id = e.id and v.type = 'quiz') as quiz,
      (select coalesce(sum(c.montant), 0) from commandes c where c.eleve_id = e.id and c.statut = 'payee' and not c.test) as depense
    from eleves e
    where p_recherche is null or p_recherche = '' or e.id::text like p_recherche || '%'
       or e.pays ilike p_recherche or e.classe ilike '%' || p_recherche || '%' or e.source ilike p_recherche
    order by e.vu_le desc
    limit least(greatest(p_limite, 1), 200)
  ) t;
$$;

-- Détail d'un élève (par le début de son identifiant) : profil, mouvements de crédits, commandes, derniers événements.
create or replace function public.revizo_admin_eleve(p_id text)
returns json
language sql security definer set search_path = public
as $$
  select json_build_object(
    'eleve', json_build_object('id', left(e.id::text, 8), 'pays', e.pays, 'classe', e.classe, 'source', e.source, 'campagne', e.campagne,
                               'credits', e.credits, 'cree_le', e.cree_le, 'vu_le', e.vu_le),
    'mouvements', (select coalesce(json_agg(m order by m.quand desc), '[]') from (select delta, motif, quand from mouvements where eleve_id = e.id order by quand desc limit 50) m),
    'commandes', (select coalesce(json_agg(c order by c.creee_le desc), '[]') from (select reference, montant, credits, statut, test, creee_le from commandes where eleve_id = e.id order by creee_le desc limit 20) c),
    'evenements', (select coalesce(json_agg(v order by v.quand desc), '[]') from (select type, details, quand from evenements where eleve_id = e.id order by quand desc limit 50) v)
  )
  from eleves e where e.id::text like p_id || '%' and length(p_id) >= 6
  limit 1;
$$;


-- Liste des élèves (les plus récents d'abord), avec un résumé de leur activité.
create or replace function public.revizo_admin_eleves(p_recherche text, p_limite integer)
returns json
language sql security definer set search_path = public
as $$
  select coalesce(json_agg(t), '[]') from (
    select left(e.id::text, 8) as id, e.pays, e.classe, e.source, e.campagne, e.credits, e.cree_le, e.vu_le,
      (select count(*) from mouvements m where m.eleve_id = e.id and m.motif = 'exercice') as exercices,
      (select count(*) from evenements v where v.eleve_id = e.id and v.type = 'quiz') as quiz,
      (select coalesce(sum(c.montant), 0) from commandes c where c.eleve_id = e.id and c.statut = 'payee' and not c.test) as depense
    from eleves e
    where not e.test and (p_recherche is null or p_recherche = '' or e.id::text like p_recherche || '%'
       or e.pays ilike p_recherche or e.classe ilike '%' || p_recherche || '%' or e.source ilike p_recherche)
    order by e.vu_le desc
    limit least(greatest(p_limite, 1), 200)
  ) t;
$$;

