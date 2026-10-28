-- Révizo : les achats de crédits par mobile money (DexPay).
-- Une commande est créée avant le paiement ; les crédits ne sont ajoutés qu'une fois,
-- quand DexPay confirme le paiement (webhook signé ou vérification directe).

create table public.commandes (
  reference text primary key,
  eleve_id uuid not null references public.eleves (id) on delete cascade,
  offre text not null,
  credits integer not null check (credits > 0),
  montant integer not null check (montant > 0),
  statut text not null default 'en_attente' check (statut in ('en_attente', 'payee', 'echouee')),
  creee_le timestamptz not null default now(),
  payee_le timestamptz
);
create index commandes_eleve on public.commandes (eleve_id, creee_le);
alter table public.commandes enable row level security;

-- Crée la commande d'un élève (au plus 20 commandes en attente par jour, contre les abus).
create function public.revizo_commande_creer(p_cle_hash text, p_ip_hash text, p_reference text, p_offre text, p_credits integer, p_montant integer)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  e := revizo_eleve(p_cle_hash, p_ip_hash);
  if (select count(*) from commandes where eleve_id = e.id and creee_le > now() - interval '1 day') >= 20 then
    raise exception 'trop_de_commandes';
  end if;
  insert into commandes (reference, eleve_id, offre, credits, montant) values (p_reference, e.id, p_offre, p_credits, p_montant);
  return json_build_object('ok', true);
end $$;

-- Marque la commande payée et ajoute les crédits, une seule fois. Le montant payé doit correspondre.
create function public.revizo_commande_payer(p_reference text, p_montant integer)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  c public.commandes;
  solde integer;
begin
  update commandes set statut = 'payee', payee_le = now()
    where reference = p_reference and statut = 'en_attente' and montant = p_montant
    returning * into c;
  if not found then
    return json_build_object('ok', false);
  end if;
  update eleves set credits = credits + c.credits where id = c.eleve_id returning credits into solde;
  insert into mouvements (eleve_id, delta, motif) values (c.eleve_id, c.credits, 'achat');
  return json_build_object('ok', true, 'credits', solde);
end $$;

create function public.revizo_commande_echouer(p_reference text)
returns void
language sql security definer set search_path = public
as $$
  update commandes set statut = 'echouee' where reference = p_reference and statut = 'en_attente';
$$;

-- État d'une commande, seulement pour l'élève qui l'a passée.
create function public.revizo_commande_etat(p_cle_hash text, p_reference text)
returns json
language sql security definer set search_path = public
as $$
  select json_build_object('statut', c.statut, 'credits_achetes', c.credits, 'montant', c.montant, 'credits', e.credits)
  from commandes c join eleves e on e.id = c.eleve_id
  where c.reference = p_reference and e.cle_hash = p_cle_hash;
$$;

revoke all on function public.revizo_commande_creer(text, text, text, text, integer, integer) from public, anon, authenticated;
revoke all on function public.revizo_commande_payer(text, integer) from public, anon, authenticated;
revoke all on function public.revizo_commande_echouer(text) from public, anon, authenticated;
revoke all on function public.revizo_commande_etat(text, text) from public, anon, authenticated;
grant execute on function public.revizo_commande_creer(text, text, text, text, integer, integer) to service_role;
grant execute on function public.revizo_commande_payer(text, integer) to service_role;
grant execute on function public.revizo_commande_echouer(text) to service_role;
grant execute on function public.revizo_commande_etat(text, text) to service_role;
