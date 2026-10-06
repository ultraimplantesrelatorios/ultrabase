# ULTRA BASE v5 — Método ULTRA

Versão de teste operacional da Central de Inteligência da Ultra Implantes.

## O que esta versão é

A ULTRA BASE v5 é um copiloto local de atendimento e uma camada de inteligência complementar ao RD. Ela não tenta substituir o CRM. O foco é:

- entender a fala antes de classificar;
- reconhecer familiar/terceiro e evitar falar com a pessoa errada;
- separar fato de inferência;
- responder fatos institucionais diretamente;
- tolerar erros comuns de escrita;
- sugerir uma próxima melhor ação;
- preservar limites clínicos;
- mostrar à Milena padrões úteis de conversa e coaching;
- disponibilizar 12 templates oficiais para RD Conversas.

## Navegação

### Copiloto
Cole a fala da pessoa. A saída padrão mostra:

- resposta sugerida;
- próxima melhor ação;
- o que registrar no RD;
- atenção clínica quando necessária.

A análise detalhada fica recolhida para não poluir o atendimento.

A memória funciona apenas durante a sessão atual do navegador. Use **Nova conversa** ao trocar de paciente/contexto.

### Inteligência
Recebe opcionalmente CSV de conversas e procura padrões. Sem autoria confiável, não atribui desempenho a uma atendente.

### Milena
Possui três áreas:

- **Visão:** oportunidades de coaching;
- **Atendentes:** leitura individual somente quando houver autoria confiável;
- **Templates RD:** 12 templates, com propósito, categoria sugerida, variáveis, regras de uso e status local.

### Base
Consulta rápida de fatos, FAQ e cenários.

## Arquitetura

```text
index.html
styles.css
app.js

lib/
  engine.js
  intent-router.js
  context-extractor.js
  semantic-check.js
  normalizer.js
  conversation-memory.js
  next-best-action.js
  pre-send.js
  csv.js
  insights.js
  storage.js

data/
  ultra-facts.js
  ultra-facts.json
  knowledge.js
  dental-language.json
  rd-templates.json
  scenarios.json

tests/
  run-all.mjs
  context.test.mjs
  router.test.mjs
  engine.test.mjs
  templates.test.mjs
  adversarial.test.mjs
  static.test.mjs
```

## Testar antes de publicar

Requer Node 22+.

```bash
npm test
```

O workflow do GitHub Pages também executa os testes e valida a sintaxe JavaScript antes de publicar. Se os testes falharem, o deploy não acontece.

## Publicar no GitHub Pages

1. Suba **o conteúdo da pasta** para a raiz do repositório.
2. Confirme que `.github/workflows/deploy-pages.yml` existe.
3. Em **Settings → Pages**, selecione **GitHub Actions** como fonte.
4. Faça commit/push na branch `main`.
5. Aguarde o workflow **Test and Deploy ULTRA BASE v5**.
6. Teste `/health.html` depois do deploy.

## O que ainda NÃO é produção clínica multiusuário

Esta versão é estática e local-first. Não colocar tokens do RD, senhas ou credenciais no frontend/GitHub Pages.

Para:

- login;
- múltiplos usuários;
- sincronização entre computadores;
- integração automática com RD;
- armazenamento de dados identificáveis/sensíveis;

é necessário backend seguro, controle de acesso, logs e governança LGPD.

## Dados institucionais pendentes

A base marca como pendente o que ainda não deve ser afirmado automaticamente, incluindo:

- estacionamento;
- acessibilidade;
- formas de pagamento específicas;
- horários de sábado/especiais.

## Regra de evolução

Não corrigir exemplos isolados com hacks. Toda falha deve virar:

1. regra de compreensão;
2. teste de regressão;
3. correção do motor;
4. novo teste adversarial.

Isso é o que mantém a ULTRA BASE ficando mais inteligente sem perder estabilidade.
