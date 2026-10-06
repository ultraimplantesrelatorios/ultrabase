# CHANGELOG — ULTRA BASE v5.1.0

## Correção estrutural principal
A memória da v5 gravava automaticamente a pergunta sugerida e a próxima ação como se já tivessem acontecido. Isso contaminava a conversa: a IA podia acreditar que a atendente já havia perguntado/enviado/feito algo que era apenas uma sugestão.

## Alterações
- Memória V2 separando `observedFacts`, `inferredFacts` e `unknowns`.
- Separação entre `suggestedQuestions` e `askedQuestions`.
- Separação entre `suggestedAnswers` e `sentAnswers`.
- Separação entre `suggestedActions` e `confirmedActions`.
- Histórico por turnos reais (`patient` e `attendant`).
- Turno de atendente somente após confirmação explícita.
- Texto editado é o texto efetivamente registrado como enviado.
- Compromissos explicitamente pedidos pelo paciente podem ser observados; sugestão de retorno da IA não vira compromisso.
- Contexto confirmado é reutilizado entre mensagens da mesma conversa.
- `Nova conversa` zera toda a memória e exige confirmação.
- `Nova mensagem do paciente` e `Limpar campo` preservam contexto.
- Painel visível “Contexto desta conversa”.
- Mensagens compostas preservam múltiplos sinais (idade, prótese, osso, medo etc.).
- Novo cache `ultra-base-v5.1` para invalidar versões antigas no GitHub Pages.

## Compatibilidade
- Todos os módulos, cenários, templates RD, Milena, importação CSV, PWA e guardrails da v5 foram preservados.
- Memórias antigas são migradas de forma compatível quando encontradas.
