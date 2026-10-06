# ULTRA BASE v5.3.0 — Supabase Connected

# ULTRA BASE v5.2.0 — Método ULTRA

## Publicação no GitHub Pages
Extraia o ZIP e envie **o conteúdo interno** para a raiz do repositório. O arquivo `index.html` deve aparecer na raiz, ao lado de `styles.css`, `ultra-core-v5.2.js` e `app-v5.2.js`.

Depois publique pelo GitHub Pages normalmente. Acesse primeiro `/health.html` e confirme `ULTRA BASE v5.2.0`.

## Por que esta versão é mais robusta
A v5.2 não precisa carregar uma cadeia de módulos ES para iniciar. O Copiloto usa dois scripts clássicos versionados e traz os dados essenciais embutidos no runtime. Isso reduz drasticamente falhas por arquivo ausente, cache antigo, MIME incorreto ou caminho de módulo quebrado.

## Arquivos principais
- `index.html`: interface.
- `styles.css`: visual responsivo.
- `ultra-core-v5.2.js`: entendimento, roteamento, respostas, memória e templates.
- `app-v5.2.js`: interface e ações.
- `health.html`: teste de publicação.
- `tests/run-v5.2.cjs`: gate automatizado.

## Regra de memória
**Análise não é evento. Sugestão não é ação. Só algo confirmado como real altera o histórico operacional.**


## Banco conectado
Esta release usa Supabase Auth + Postgres via `supabase-v5.3.js`, sem SDK externo no caminho crítico. A configuração de frontend contém somente Project URL e Publishable Key. Nunca adicionar `sb_secret_`, `service_role` ou senha do banco ao repositório.

Primeiro acesso: confirme o administrador com `SUPABASE_PRECHECK.sql`, publique os arquivos na raiz do GitHub Pages e entre com o usuário criado em Authentication.
