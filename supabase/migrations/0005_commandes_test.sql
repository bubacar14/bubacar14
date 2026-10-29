-- Révizo : les paiements faits avec les clés de test de DexPay ne comptent pas dans les revenus.
alter table public.commandes add column test boolean not null default false;
-- Toutes les commandes passées avant le passage en paiement réel étaient des essais.
update public.commandes set test = true where creee_le < '2026-10-28 00:00:00+00';

drop function public.revizo_commande_creer(text, text, text, text, integer, integer);
create function public.revizo_commande_creer(p_cle_hash text, p_ip_hash text, p_reference text, p_offre text, p_credits integer, p_montant integer, p_test boolean)
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
  insert into commandes (reference, eleve_id, offre, credits, montant, test) values (p_reference, e.id, p_offre, p_credits, p_montant, p_test);
  return json_build_object('ok', true);
end $$;
revoke all on function public.revizo_commande_creer(text, text, text, text, integer, integer, boolean) from public, anon, authenticated;
grant execute on function public.revizo_commande_creer(text, text, text, text, integer, integer, boolean) to service_role;
