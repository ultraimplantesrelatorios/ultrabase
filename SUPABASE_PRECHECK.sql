-- ULTRA BASE v5.3 — pré-checagem do primeiro administrador
-- Pode ser executado mais de uma vez.

update public.profiles
set role = 'admin', full_name = 'Administrador ULTRA BASE', active = true
where id = '36f0fe49-fed1-4e9e-94d9-906668b587c2';

select id, full_name, role, active
from public.profiles
where id = '36f0fe49-fed1-4e9e-94d9-906668b587c2';

select
  (select count(*) from information_schema.tables where table_schema='public' and table_name in (
    'profiles','conversations','messages','analyses','suggested_responses','confirmed_actions',
    'conversation_memory','rd_templates','template_events','milena_findings','audit_log'
  )) as tabelas_ultra,
  (select count(*) from public.profiles where active=true) as usuarios_ativos;
