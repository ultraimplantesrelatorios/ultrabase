# TEST REPORT — ULTRA BASE v5.1.0

## Resultado
**8 suítes aprovadas / 0 falhas. DEPLOY LIBERADO PELOS TESTES AUTOMATIZADOS.**

## Suítes executadas
1. `context.test.mjs` — extração de contexto.
2. `router.test.mjs` — roteamento de intenção (13 casos).
3. `engine.test.mjs` — motor principal.
4. `templates.test.mjs` — integridade dos Templates RD.
5. `static.test.mjs` — arquivos e elementos essenciais.
6. `adversarial.test.mjs` — 25 casos adversariais.
7. `memory-v2.test.mjs` — realidade x sugestão, histórico e isolamento entre pacientes.
8. `ui-memory-contract.test.mjs` — contratos de interface para limpar campo, nova mensagem, confirmação e nova conversa.

## Casos novos validados
- sugestão de pergunta não vira pergunta feita;
- sugestão de resposta não vira resposta enviada;
- ação sugerida não vira ação confirmada;
- resposta editada é salva exatamente como enviada;
- segunda mensagem usa contexto real da primeira;
- nova conversa não carrega informação do paciente anterior;
- mensagem composta preserva idade, prótese, pouco osso e medo;
- pergunta de preço não vira automaticamente “objeção principal”.

## Validações adicionais
- sintaxe JavaScript validada com Node;
- JSONs principais parseáveis;
- arquivos principais referenciados pelo HTML presentes;
- `health.html` atualizado para v5.1.0;
- cache atualizado para `ultra-base-v5.1`.

## Limites do teste
Os testes automatizados não substituem homologação humana em navegador real. A release deve ser submetida a teste dirigido por atendimento, gestão, clínica/ética e tecnologia antes de uso irrestrito.
