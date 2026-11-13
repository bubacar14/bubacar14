-- Révizo : le gratuit devient une raison de revenir, et laisse une raison de payer.
-- 1. Crédits de bienvenue : 3 au lieu de 10 (toujours réglable dans l'admin).
-- 2. L'exercice offert du jour n'est donné qu'à l'élève venu aussi la veille (« chaque jour où tu reviens »).
update public.reglages set valeur = 3 where cle = 'credits_bienvenue' and valeur = 10;

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
    -- « dernier_cadeau » est le dernier jour de visite : le cadeau du jour récompense celui qui était là hier.
    if e.dernier_cadeau = current_date - 1 and e.credits < 1 then
      insert into mouvements (eleve_id, delta, motif) values (e.id, 1 - e.credits, 'cadeau');
      update eleves set credits = 1, dernier_cadeau = current_date where id = e.id returning * into e;
    else
      update eleves set dernier_cadeau = current_date where id = e.id returning * into e;
    end if;
  end if;
  return e;
end $$;
