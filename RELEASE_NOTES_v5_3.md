# ULTRA BASE v5.3.0 — Supabase Connected

## Objetivo
Transformar a ULTRA BASE de uma aplicação local em uma aplicação multiusuário com autenticação e persistência central.

## Arquitetura
- Frontend estático compatível com GitHub Pages.
- Supabase Auth para login por e-mail e senha.
- Postgres/Supabase para conversas, mensagens, análises, sugestões, ações confirmadas, memória, templates e gestão.
- Acesso protegido pelas políticas RLS já criadas no projeto.
- Nenhuma chave secreta ou service_role no frontend.
- A Publishable Key é pública por design e está limitada por autenticação + RLS.

## Regra de integridade
- Mensagem real do paciente -> `messages`.
- Análise da IA -> `analyses`.
- Resposta/pergunta sugerida -> `suggested_responses`.
- Só após confirmação da atendente uma mensagem de atendente entra em `messages`.
- Ação só entra em `confirmed_actions` após confirmação.
- Memória consolidada -> `conversation_memory`.

## Fluxo de teste
1. Subir os arquivos na raiz do GitHub Pages.
2. Abrir `health.html` e confirmar v5.3.0.
3. Abrir a aplicação e fazer login.
4. Testar uma frase do paciente.
5. Conferir no Supabase `messages`, `analyses`, `suggested_responses` e `conversation_memory`.
6. Marcar uma resposta como enviada e confirmar que surge nova linha `messages` com role `attendant`.
7. Iniciar nova conversa e confirmar fechamento da anterior.

## Segurança
A senha nunca é persistida pela ULTRA BASE. O navegador guarda apenas a sessão emitida pelo Supabase Auth. A chave de frontend é publishable; chaves secretas não estão no pacote.
