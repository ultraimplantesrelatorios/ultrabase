# ULTRA BASE v5.1.0 — Release Candidate

## Decisão técnica
Esta release corrige o modelo de memória sem redesenhar o produto.

### Bug raiz corrigido
Na v5, `analysis.question` podia ser gravado automaticamente em `asked_questions` e a próxima ação sugerida podia contaminar a memória como se já tivesse acontecido. Isso fazia a IA raciocinar sobre eventos que nunca ocorreram.

### Regra implementada
**ANÁLISE NÃO É EVENTO. SUGESTÃO NÃO É AÇÃO. SOMENTE ALGO REALMENTE RECEBIDO OU CONFIRMADO COMO ENVIADO/REALIZADO PODE ALTERAR O HISTÓRICO OPERACIONAL.**

## Fluxo funcional
1. mensagem real do paciente é analisada;
2. fatos observados entram na memória;
3. inferências e lacunas ficam separadas;
4. IA gera resposta, pergunta e ação como sugestões;
5. atendente pode editar;
6. atendente confirma o que realmente enviou/fez;
7. somente então o turno/ação entra no histórico real;
8. próxima mensagem utiliza apenas contexto real confirmado + fatos observados.

## Homologação recomendada
- Atendimento: testar continuidade de 20 conversas simuladas.
- Comercial: validar timing de pergunta e CTA.
- Clínica/ética: revisar respostas com flags clínicas.
- Gestão: validar que histórico exibido distingue fatos de hipóteses.
- Tecnologia: publicar em ambiente de teste e verificar cache/console/mobile.
