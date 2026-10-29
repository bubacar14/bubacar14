-- Révizo : deux demandes simultanées d'un nouvel appareil (visite et solde) ne créent qu'un élève, sans erreur.
create or replace function public.revizo_eleve(p_cle_hash text, p_ip_hash text)
returns public.eleves
language plpgsql security definer set search_path = public
as $$
declare
  e public.eleves;
begin
  select * into e from eleves where cle_hash = p_cle_hash for update;
  if not found then
    if (select count(*) from eleves where ip_hash = p_ip_hash and cree_le > now() - interval '1 day') >= 300 then
      raise exception 'trop_de_comptes';
    end if;
    insert into eleves (cle_hash, ip_hash) values (p_cle_hash, p_ip_hash) on conflict (cle_hash) do nothing;
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
