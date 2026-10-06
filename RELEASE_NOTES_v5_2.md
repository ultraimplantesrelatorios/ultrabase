# Release candidate — ULTRA BASE v5.2.0

Esta é uma release de estabilidade. A prioridade foi eliminar dependências que podiam fazer a tela abrir sem o motor funcionar.

## Gate técnico
Execute `npm test`. O deploy deve ser bloqueado se houver qualquer FAIL.

## Teste manual mínimo após publicar
1. Abrir `health.html` e conferir v5.2.0.
2. Abrir a home.
3. Digitar `vcs atendem convenio?` e clicar em Gerar orientação.
4. Confirmar que aparece `Convênio / atendimento particular`.
5. Testar `quero um amigo banguelo` e confirmar que não vira perda dentária.
6. Testar `meu tio precisa colocar um dente` e confirmar que o tio é tratado como paciente.
7. Abrir Milena > Templates RD e conferir 12 cards.
