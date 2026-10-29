-- Révizo : corrections signalées (contenu pour corriger les guides), coût réel de l'IA, robots écartés des chiffres.

-- 1. Une correction signalée fausse : l'énoncé et la réponse de l'IA, sans rien sur l'élève à part sa classe et son pays.
create table public.signalements (
  id bigint generated always as identity primary key,
  eleve_id uuid not null references public.eleves (id) on delete cascade,
  mouvement bigint unique,
  matiere text, classe text, pays text,
  enonce text not null, reponse text,
  traite boolean not null default false,
  quand timestamptz not null default now()
);
create index signalements_quand on public.signalements (traite, quand desc);
alter table public.signalements enable row level security;

create function public.revizo_signalement_ajouter(p_cle_hash text, p_mouvement bigint, p_matiere text, p_classe text, p_pays text, p_enonce text, p_reponse text)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  select * into e from eleves where cle_hash = p_cle_hash;
  -- Seulement pour un vrai exercice de cet élève, et une seule fois.
  if not found or not exists (select 1 from mouvements where id = p_mouvement and eleve_id = e.id and motif = 'exercice') then
    return;
  end if;
  insert into signalements (eleve_id, mouvement, matiere, classe, pays, enonce, reponse)
  values (e.id, p_mouvement, left(p_matiere, 40), left(p_classe, 40), left(p_pays, 4), left(p_enonce, 4000), left(p_reponse, 3000))
  on conflict (mouvement) do nothing;
end $$;

create function public.revizo_admin_signalements(p_traites boolean)
returns json
language sql security definer set search_path = public
as $$
  select coalesce(json_agg(t), '[]') from (
    select s.id, s.matiere, s.classe, s.pays, s.enonce, s.reponse, s.traite, s.quand, left(s.eleve_id::text, 8) as eleve
    from signalements s join eleves e on e.id = s.eleve_id
    where s.traite = p_traites and not e.test
    order by s.quand desc limit 100
  ) t;
$$;

create function public.revizo_admin_signalement_traite(p_id bigint, p_traite boolean)
returns json
language sql security definer set search_path = public
as $$
  update signalements set traite = p_traite where id = p_id returning json_build_object('ok', true);
$$;

-- 2. Coût réel : chaque lecture et chaque correction notent leur coût (millionièmes de dollar) dans les événements.
alter table public.evenements drop constraint evenements_type_check;
alter table public.evenements add constraint evenements_type_check
  check (type in ('visite', 'bienvenue', 'essai', 'quiz', 'installation', 'recharge', 'partage', 'exercice', 'correction', 'prenom', 'lecture'));

create function public.revizo_admin_couts(p_jours integer)
returns json
language sql security definer set search_path = public
as $$
  with depuis as (select date_trunc('day', now()) - make_interval(days => greatest(p_jours, 1) - 1) as t),
  c as (select v.* from evenements v join eleves e on e.id = v.eleve_id
        where v.type in ('exercice', 'lecture') and v.details ? 'cout' and v.quand >= (select t from depuis) and not e.test)
  select json_build_object(
    'total', (select coalesce(sum((details->>'cout')::bigint), 0) from c),
    'corrections', (select count(*) from c where type = 'exercice'),
    'cout_corrections', (select coalesce(sum((details->>'cout')::bigint), 0) from c where type = 'exercice'),
    'lectures', (select count(*) from c where type = 'lecture'),
    'cout_lectures', (select coalesce(sum((details->>'cout')::bigint), 0) from c where type = 'lecture'),
    'par_jour', (select coalesce(json_agg(t order by t.jour), '[]') from (
        select quand::date as jour, sum((details->>'cout')::bigint) as cout from c group by 1) t),
    'par_matiere', (select coalesce(json_agg(t order by t.cout desc), '[]') from (
        select coalesce(nullif(details->>'matiere', ''), '?') as cle, count(*) as n, sum((details->>'cout')::bigint) as cout
        from c where type = 'exercice' group by 1) t)
  );
$$;

-- 3. Robots : un appareil reconnu comme robot (d'après son navigateur) est écarté des chiffres.
create function public.revizo_marquer_robot(p_cle_hash text)
returns void
language sql security definer set search_path = public
as $$
  update eleves set test = true where cle_hash = p_cle_hash and not test;
$$;

-- Visites suspectes : arrivées par groupes d'au moins 4 appareils dans la même minute, sans classe ni aucune action
-- (souvent les robots de vérification des pubs). L'admin les montre avant de les écarter.
create function public.revizo_admin_suspects()
returns json
language sql security definer set search_path = public
as $$
  with seuls as (
    select e.id, e.cree_le, date_trunc('minute', e.cree_le) as minute from eleves e
    where not e.test and e.classe is null
      and not exists (select 1 from evenements v where v.eleve_id = e.id and v.type <> 'visite')
      and not exists (select 1 from mouvements m where m.eleve_id = e.id and m.motif <> 'cadeau')
  ),
  groupes as (select minute from seuls group by minute having count(*) >= 4)
  select coalesce(json_agg(json_build_object('id', left(s.id::text, 8), 'arrive', s.cree_le) order by s.cree_le), '[]')
  from seuls s join groupes g using (minute);
$$;

create function public.revizo_admin_ecarter_suspects()
returns json
language plpgsql security definer set search_path = public
as $$
declare
  n integer;
begin
  with seuls as (
    select e.id, date_trunc('minute', e.cree_le) as minute from eleves e
    where not e.test and e.classe is null
      and not exists (select 1 from evenements v where v.eleve_id = e.id and v.type <> 'visite')
      and not exists (select 1 from mouvements m where m.eleve_id = e.id and m.motif <> 'cadeau')
  ),
  groupes as (select minute from seuls group by minute having count(*) >= 4)
  update eleves set test = true where id in (select s.id from seuls s join groupes g using (minute));
  get diagnostics n = row_count;
  return json_build_object('ok', true, 'ecartes', n);
end $$;

revoke all on function public.revizo_signalement_ajouter(text, bigint, text, text, text, text, text) from public, anon, authenticated;
revoke all on function public.revizo_admin_signalements(boolean) from public, anon, authenticated;
revoke all on function public.revizo_admin_signalement_traite(bigint, boolean) from public, anon, authenticated;
revoke all on function public.revizo_admin_couts(integer) from public, anon, authenticated;
revoke all on function public.revizo_marquer_robot(text) from public, anon, authenticated;
revoke all on function public.revizo_admin_suspects() from public, anon, authenticated;
revoke all on function public.revizo_admin_ecarter_suspects() from public, anon, authenticated;
grant execute on function public.revizo_signalement_ajouter(text, bigint, text, text, text, text, text) to service_role;
grant execute on function public.revizo_admin_signalements(boolean) to service_role;
grant execute on function public.revizo_admin_signalement_traite(bigint, boolean) to service_role;
grant execute on function public.revizo_admin_couts(integer) to service_role;
grant execute on function public.revizo_marquer_robot(text) to service_role;
grant execute on function public.revizo_admin_suspects() to service_role;
grant execute on function public.revizo_admin_ecarter_suspects() to service_role;
