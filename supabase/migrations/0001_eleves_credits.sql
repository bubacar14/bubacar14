-- Révizo : les élèves et leurs crédits, gardés sur le serveur.
-- Un élève = un appareil, reconnu par une clé aléatoire (seule son empreinte SHA-256 est stockée).
-- Aucune règle d'accès publique : seules les fonctions Vercel, avec la clé secrète, lisent et écrivent.

create table public.eleves (
  id uuid primary key default gen_random_uuid(),
  cle_hash text not null unique,
  credits integer not null default 0 check (credits >= 0),
  dernier_cadeau date,
  ip_hash text,
  cree_le timestamptz not null default now()
);
create index eleves_ip_cree on public.eleves (ip_hash, cree_le);

-- Chaque mouvement de crédit : cadeau du jour, exercice, remboursement, signalement, achat.
create table public.mouvements (
  id bigint generated always as identity primary key,
  eleve_id uuid not null references public.eleves (id) on delete cascade,
  delta integer not null,
  motif text not null check (motif in ('cadeau', 'exercice', 'remboursement', 'signalement', 'achat')),
  reference bigint, -- l'exercice d'origine, pour un remboursement ou un signalement
  quand timestamptz not null default now()
);
create index mouvements_eleve_quand on public.mouvements (eleve_id, quand);
create unique index mouvements_un_retour on public.mouvements (reference) where reference is not null;

alter table public.eleves enable row level security;
alter table public.mouvements enable row level security;

-- Trouve ou crée l'élève, et donne l'exercice offert du jour (le solde remonte à 1 s'il est à 0).
-- Limite de nouveaux comptes par adresse IP et par jour (300 depuis 0003_limite_comptes.sql).
create function public.revizo_eleve(p_cle_hash text, p_ip_hash text)
returns public.eleves
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  select * into e from eleves where cle_hash = p_cle_hash for update;
  if not found then
    if (select count(*) from eleves where ip_hash = p_ip_hash and cree_le > now() - interval '1 day') >= 10 then
      raise exception 'trop_de_comptes';
    end if;
    insert into eleves (cle_hash, ip_hash) values (p_cle_hash, p_ip_hash) returning * into e;
  end if;
  if e.dernier_cadeau is distinct from current_date then
    if e.credits < 1 then
      insert into mouvements (eleve_id, delta, motif) values (e.id, 1 - e.credits, 'cadeau');
    end if;
    update eleves set credits = greatest(credits, 1), dernier_cadeau = current_date where id = e.id returning * into e;
  end if;
  return e;
end $$;

-- Retire 1 crédit avant une correction. Renvoie le solde et le numéro du mouvement.
create function public.revizo_debiter(p_cle_hash text, p_ip_hash text)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
  m bigint;
begin
  e := revizo_eleve(p_cle_hash, p_ip_hash);
  if e.credits < 1 then
    return json_build_object('ok', false, 'credits', 0);
  end if;
  update eleves set credits = credits - 1 where id = e.id returning credits into e.credits;
  insert into mouvements (eleve_id, delta, motif) values (e.id, -1, 'exercice') returning id into m;
  return json_build_object('ok', true, 'credits', e.credits, 'mouvement', m);
end $$;

-- Rend le crédit d'un exercice : correction ratée (remboursement) ou erreur signalée par l'élève.
-- Une seule fois par exercice, et seulement dans les 24 heures.
create function public.revizo_rendre(p_cle_hash text, p_mouvement bigint, p_motif text)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  if p_motif not in ('remboursement', 'signalement') then
    raise exception 'motif_invalide';
  end if;
  select * into e from eleves where cle_hash = p_cle_hash for update;
  if not found then
    return json_build_object('ok', false, 'credits', 0);
  end if;
  if not exists (select 1 from mouvements where id = p_mouvement and eleve_id = e.id and motif = 'exercice' and quand > now() - interval '1 day')
     or exists (select 1 from mouvements where reference = p_mouvement) then
    return json_build_object('ok', false, 'credits', e.credits);
  end if;
  update eleves set credits = credits + 1 where id = e.id returning credits into e.credits;
  insert into mouvements (eleve_id, delta, motif, reference) values (e.id, 1, p_motif, p_mouvement);
  return json_build_object('ok', true, 'credits', e.credits);
end $$;

-- Ajoute des crédits achetés. Le serveur ne l'appelle qu'après un paiement confirmé
-- (pour l'instant : seulement en mode démo, sur l'ordinateur du développeur).
create function public.revizo_crediter(p_cle_hash text, p_ip_hash text, p_credits integer)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  if p_credits not between 1 and 100 then
    raise exception 'quantite_invalide';
  end if;
  e := revizo_eleve(p_cle_hash, p_ip_hash);
  update eleves set credits = credits + p_credits where id = e.id returning credits into e.credits;
  insert into mouvements (eleve_id, delta, motif) values (e.id, p_credits, 'achat');
  return json_build_object('ok', true, 'credits', e.credits);
end $$;

revoke all on function public.revizo_eleve(text, text) from public, anon, authenticated;
revoke all on function public.revizo_debiter(text, text) from public, anon, authenticated;
revoke all on function public.revizo_rendre(text, bigint, text) from public, anon, authenticated;
revoke all on function public.revizo_crediter(text, text, integer) from public, anon, authenticated;
grant execute on function public.revizo_eleve(text, text) to service_role;
grant execute on function public.revizo_debiter(text, text) to service_role;
grant execute on function public.revizo_rendre(text, bigint, text) to service_role;
grant execute on function public.revizo_crediter(text, text, integer) to service_role;
