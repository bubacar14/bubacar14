-- Révizo : depuis l'admin, écarter des statistiques un appareil de test (le fondateur, un ami qui essaie…).
create function public.revizo_admin_marquer_test(p_id text, p_test boolean)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  n integer;
begin
  if length(p_id) < 6 then
    return json_build_object('ok', false);
  end if;
  update eleves set test = p_test where id::text like p_id || '%';
  get diagnostics n = row_count;
  update commandes set test = p_test where eleve_id in (select id from eleves where id::text like p_id || '%') and statut <> 'payee';
  return json_build_object('ok', n = 1);
end $$;
revoke all on function public.revizo_admin_marquer_test(text, boolean) from public, anon, authenticated;
grant execute on function public.revizo_admin_marquer_test(text, boolean) to service_role;
