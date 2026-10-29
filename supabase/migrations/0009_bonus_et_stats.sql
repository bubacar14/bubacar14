-- Révizo : 10 crédits offerts à chaque nouvel élève (réglable dans l'admin), et plus de données pour le tableau de bord.

alter table public.eleves add column credits_offerts integer not null default 0;

-- Réglages modifiables depuis l'admin.
create table public.reglages (cle text primary key, valeur integer not null);
alter table public.reglages enable row level security;
insert into public.reglages (cle, valeur) values ('credits_bienvenue', 10), ('bienvenue_max_par_reseau', 30);

-- Dépense de chaque campagne de pub (en FCFA), saisie dans l'admin pour calculer le coût par élève.
create table public.depenses_pub (
  source text not null,
  campagne text not null default '',
  depense integer not null check (depense >= 0),
  modifie_le timestamptz not null default now(),
  primary key (source, campagne)
);
alter table public.depenses_pub enable row level security;

-- Le serveur note aussi chaque correction (matière, niveau) pour les statistiques.
alter table public.evenements drop constraint evenements_type_check;
alter table public.evenements add constraint evenements_type_check
  check (type in ('visite', 'bienvenue', 'essai', 'quiz', 'installation', 'recharge', 'partage', 'exercice'));

-- Un nouvel élève reçoit les crédits de bienvenue (30 appareils au plus par réseau et par jour reçoivent ce cadeau,
-- contre ceux qui videraient l'appli pour recommencer ; les suivants ont l'exercice offert du jour).
create or replace function public.revizo_eleve(p_cle_hash text, p_ip_hash text)
returns public.eleves
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
  bonus integer := coalesce((select valeur from reglages where cle = 'credits_bienvenue'), 0);
  plafond integer := coalesce((select valeur from reglages where cle = 'bienvenue_max_par_reseau'), 30);
begin
  select * into e from eleves where cle_hash = p_cle_hash for update;
  if not found then
    if (select count(*) from eleves where ip_hash = p_ip_hash and cree_le > now() - interval '1 day') >= 300 then
      raise exception 'trop_de_comptes';
    end if;
    if (select count(*) from eleves where ip_hash = p_ip_hash and cree_le > now() - interval '1 day' and credits_offerts > 0) >= plafond then
      bonus := 0;
    end if;
    insert into eleves (cle_hash, ip_hash, credits, credits_offerts, dernier_cadeau)
      values (p_cle_hash, p_ip_hash, greatest(bonus, 1), bonus, current_date)
      on conflict (cle_hash) do nothing
      returning * into e;
    if found then
      insert into mouvements (eleve_id, delta, motif) values (e.id, greatest(bonus, 1), 'cadeau');
      return e;
    end if;
    select * into e from eleves where cle_hash = p_cle_hash for update;
  end if;
  if e.dernier_cadeau is distinct from current_date then
    if e.credits < 1 then
      insert into mouvements (eleve_id, delta, motif) values (e.id, 1 - e.credits, 'cadeau');
    end if;
    update eleves set credits = greatest(credits, 1), dernier_cadeau = current_date where id = e.id returning * into e;
  end if;
  return e;
end $$;

-- Les élèves déjà inscrits (hors appareils de test) reçoivent aussi leurs 10 crédits.
with cadeau as (
  update public.eleves set credits = credits + 10, credits_offerts = 10 where not test and credits_offerts = 0 returning id
)
insert into public.mouvements (eleve_id, delta, motif) select id, 10, 'cadeau' from cadeau;

-- Réglages et dépenses de pub, depuis l'admin.
create function public.revizo_admin_reglage(p_cle text, p_valeur integer)
returns json
language plpgsql security definer set search_path = public
as $$
begin
  if p_cle not in ('credits_bienvenue', 'bienvenue_max_par_reseau') or p_valeur < 0 or p_valeur > 100 then
    raise exception 'reglage_invalide';
  end if;
  update reglages set valeur = p_valeur where cle = p_cle;
  return json_build_object('ok', true);
end $$;

create function public.revizo_admin_depense(p_source text, p_campagne text, p_depense integer)
returns json
language plpgsql security definer set search_path = public
as $$
begin
  if p_depense < 0 or p_depense > 100000000 or length(p_source) = 0 then
    raise exception 'depense_invalide';
  end if;
  insert into depenses_pub (source, campagne, depense) values (lower(p_source), coalesce(p_campagne, ''), p_depense)
    on conflict (source, campagne) do update set depense = excluded.depense, modifie_le = now();
  return json_build_object('ok', true);
end $$;

-- Données en plus pour le tableau de bord, sur les N derniers jours (élèves de test exclus).
create function public.revizo_admin_plus(p_jours integer)
returns json
language sql security definer set search_path = public
as $$
  with
  depuis as (select date_trunc('day', now()) - make_interval(days => greatest(p_jours, 1) - 1) as t),
  vrais as (select * from eleves where not test),
  ev as (select v.* from evenements v join vrais e on e.id = v.eleve_id where v.quand >= (select t from depuis))
  select json_build_object(
    'en_ce_moment', (select count(distinct v.eleve_id) from evenements v join vrais e on e.id = v.eleve_id where v.quand > now() - interval '15 minutes'),
    'reglages', (select json_object_agg(cle, valeur) from reglages),
    -- Retour des élèves arrivés au moins 1 (ou 7) jours avant aujourd'hui : revenus un autre jour après leur arrivée.
    'retour_j1', (select json_build_object('base', count(*), 'revenus', count(*) filter (where exists (
        select 1 from evenements v where v.eleve_id = e.id and v.quand::date = e.cree_le::date + 1)))
      from vrais e where e.cree_le >= (select t from depuis) and e.cree_le::date <= current_date - 1),
    'retour_j7', (select json_build_object('base', count(*), 'revenus', count(*) filter (where exists (
        select 1 from evenements v where v.eleve_id = e.id and v.quand::date between e.cree_le::date + 1 and e.cree_le::date + 7 and v.quand::date >= e.cree_le::date + 7)))
      from vrais e where e.cree_le >= (select t from depuis) - interval '7 days' and e.cree_le::date <= current_date - 7),
    'heures', (select json_agg(json_build_object('heure', h, 'n', coalesce(n, 0)) order by h)
      from generate_series(0, 23) h left join (select extract(hour from quand)::int as heure, count(*) as n from ev group by 1) x on x.heure = h),
    'jours_semaine', (select json_agg(json_build_object('jour', d, 'n', coalesce(n, 0)) order by d)
      from generate_series(1, 7) d left join (select extract(isodow from quand)::int as jour, count(*) as n from ev group by 1) x on x.jour = d),
    'matieres', (select coalesce(json_agg(t order by t.n desc), '[]') from (
        select coalesce(nullif(details->>'matiere', ''), '?') as cle, count(*) as n from ev where type = 'exercice' group by 1) t),
    'quiz', (select json_build_object('nombre', count(*), 'score_moyen', round(avg((details->>'score')::numeric / nullif((details->>'total')::numeric, 0)) * 100))
      from ev where type = 'quiz'),
    'quiz_matieres', (select coalesce(json_agg(t order by t.n desc), '[]') from (
        select coalesce(nullif(details->>'matiere', ''), 'Tout mélangé') as cle, count(*) as n,
               round(avg((details->>'score')::numeric / nullif((details->>'total')::numeric, 0)) * 100) as score
        from ev where type = 'quiz' group by 1) t),
    'credits', json_build_object(
      'offerts', (select coalesce(sum(m.delta), 0) from mouvements m join vrais e on e.id = m.eleve_id where m.motif = 'cadeau' and m.quand >= (select t from depuis)),
      'utilises', (select count(*) from mouvements m join vrais e on e.id = m.eleve_id where m.motif = 'exercice' and m.quand >= (select t from depuis)),
      'en_circulation', (select coalesce(sum(credits), 0) from vrais)),
    'depenses', (select coalesce(json_agg(json_build_object('source', source, 'campagne', campagne, 'depense', depense)), '[]') from depenses_pub)
  );
$$;

revoke all on function public.revizo_admin_reglage(text, integer) from public, anon, authenticated;
revoke all on function public.revizo_admin_depense(text, text, integer) from public, anon, authenticated;
revoke all on function public.revizo_admin_plus(integer) from public, anon, authenticated;
grant execute on function public.revizo_admin_reglage(text, integer) to service_role;
grant execute on function public.revizo_admin_depense(text, text, integer) to service_role;
grant execute on function public.revizo_admin_plus(integer) to service_role;

-- revizo_admin_stats : les résultats par source comptent aussi les revenus de chaque campagne.
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
               count(*) filter (where exists (select 1 from commandes c where c.eleve_id = p.id and c.statut = 'payee' and not c.test)) as payeurs,
               coalesce(sum((select sum(c.montant) from commandes c where c.eleve_id = p.id and c.statut = 'payee' and not c.test)), 0) as revenus
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

