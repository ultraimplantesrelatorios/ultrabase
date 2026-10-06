# TEST REPORT — ULTRA BASE v5.2.0

## Resultado
**35 PASS / 0 FAIL**

## Validado
- carregamento do core v5.2;
- roteamento institucional, clínico, familiar, agenda, no-show, preço e urgência;
- falsos positivos conhecidos;
- Memória V2: sugestão não vira evento;
- pergunta e resposta só entram no histórico após confirmação;
- resposta editada é preservada como enviada;
- nova conversa nasce sem contexto anterior;
- 12 templates RD com IDs únicos;
- `index.html` não usa `type="module"`;
- `index.html` não carrega o `app.js` antigo;
- sintaxe dos dois scripts de runtime validada por `node --check`;
- arquivos críticos presentes.

## Casos de regressão incluídos
`vcs atendem convenio?`, `aceita unimed?`, `qual endereco?`, `abre sabado?`, `quero um amigo banguelo`, `meu tio precisa colocar um dente`, `minha mãe usa dentadura`, `minha tia quer implante mas tem medo`, `me disseram que nao tenho oço`, `tenho diabeti posso fazer implante`, `uso marevan`, `quero marcar avaliacao`, `tem horario amanha?`, `nao quero marcar nada`, `me chama mes que vem`, `faltei ontem`, `achei caro`, `to sangrando muito`.

## Observação
O ambiente de execução desta sessão não permitiu navegação automatizada local pelo Chromium/Playwright. Por isso o gate executado é de runtime/sintaxe/contrato e lógica. A própria release inclui `health.html` e checklist manual pós-deploy.
