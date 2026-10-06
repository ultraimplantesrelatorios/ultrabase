# COMANDO MESTRE — ULTRA BASE v5 | FECHAMENTO DE PONTAS + MÉTODO ULTRA

## Objetivo

Evoluir a ULTRA BASE sem recriar o projeto e sem corrigir apenas exemplos isolados. Toda alteração deve aumentar compreensão geral, autonomia, segurança, conversão ética e clareza operacional.

## Fluxo obrigatório

MENSAGEM → NORMALIZAÇÃO → CONTEXTO/SUJEITO → INTENÇÃO PRIMÁRIA E SECUNDÁRIA → COERÊNCIA → CONFIANÇA → FONTE DE CONHECIMENTO → GUARDRAILS → NEXT BEST ACTION → RESPOSTA → PRE-SEND CHECK.

## Regras inegociáveis

1. Não transformar palavra-chave em conclusão.
2. Descobrir quem é o paciente antes de usar “você” em contexto clínico.
3. Separar `facts`, `inferences` e `unknowns`.
4. Responder fatos institucionais conhecidos antes de pedir contexto.
5. Pergunta só existe se reduzir uma incerteza real.
6. Informação clínica geral nunca vira diagnóstico ou autorização individual.
7. Respeitar negativa de agendamento.
8. Urgência desliga venda.
9. Uma ação principal por vez.
10. Falha encontrada vira teste de regressão.

## Exemplos de regressão obrigatória

- “vcs atendem convenio?” → atendimento particular.
- “quero um amigo banguelo” → fora do escopo, sem classificação clínica.
- “meu tio precisa colocar um dente” → familiar + substituição dentária, sem assumir perda.
- “meu pai está banguelo e quer dente fixo” → reabilitação + familiar.
- “não quero marcar nada” → respeitar negativa.
- “minha filha que me leva” → barreira prática/logística.
- “to sangrando muito” → atenção clínica / comercial OFF.

## Milena — Templates RD

A área deve manter 12 templates oficiais organizados em quatro grupos e três objetivos:

- Início de conversa: Conversão / Humanização / Educação.
- Marketing: Conversão / Humanização / Educação.
- Follow-up: Conversão / Humanização / Educação.
- Reagendamento: Conversão / Humanização / Educação.

Cada template deve registrar: ID, nome RD, texto, variáveis, quando usar, quando não usar, objetivo, categoria sugerida, próxima ação e status.

Não apresentar taxa de resposta, agendamento ou conversão enquanto não houver dados ligados a resultado.

## Gate técnico

Antes de publicar:

- `npm test` precisa passar;
- JavaScript precisa passar em `node --check`;
- `index.html`, assets e JSON devem existir;
- `/health.html` precisa responder;
- GitHub Actions deve executar testes antes do deploy;
- não pode existir token/credencial no frontend.

## Regra de aprovação

A versão só avança se entender antes de responder, reconhecer sujeito, tolerar erro de escrita, evitar falso positivo, não inventar, respeitar limites clínicos e permitir uso intuitivo sem treinamento técnico.
