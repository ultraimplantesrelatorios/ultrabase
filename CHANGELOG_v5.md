# CHANGELOG — ULTRA BASE v5.0.0

## Motor de compreensão

- Adicionada camada `context-extractor.js` para sujeito, familiar, necessidade declarada, motivação, barreira e lacunas.
- Adicionado `intent-router.js` antes dos cenários.
- Adicionada checagem de coerência semântica.
- Adicionado nível de confiança HIGH / MEDIUM / LOW.
- Reduzido uso de palavras isoladas como prova de intenção.
- Corrigido falso positivo de frases como “quero um amigo banguelo”.
- Corrigido “meu tio precisa colocar um dente”: não assume perda nem trata o interlocutor como paciente.
- Corrigido “vcs atendem convênio?” para resposta institucional direta.
- Adicionado entendimento de formas de pagamento, estacionamento, acessibilidade, tratamentos, e-mail e contato.
- Adicionada barreira logística e negativa explícita de agendamento.

## Segurança e qualidade

- Criado `pre-send.js` para bloquear promessas, respostas incoerentes e inferências perigosas.
- Urgência desliga condução comercial.
- Fatos pendentes retornam como pendentes, sem invenção.
- Base clínica continua separada de decisão clínica individual.

## Memória

- Criada memória de sessão com `sessionStorage`.
- Botão “Nova conversa” limpa a memória antes de trocar de paciente.
- Fatos da conversa são acumulados sem substituir o texto original.

## Milena

- Área dividida em Visão, Atendentes e Templates RD.
- Inclusos 12 templates oficiais:
  - 3 Início de conversa;
  - 3 Marketing;
  - 3 Follow-up;
  - 3 Reagendamento.
- Cada template possui versão de Conversão, Humanização e Educação.
- Inclusos quando usar, quando não usar, variáveis, próxima ação, categoria sugerida e status.
- Status pode ser gerenciado localmente.
- Sem métricas fictícias de conversão.

## UX

- Hierarquia mais limpa no Copiloto.
- Resposta fica em primeiro plano; engenharia interna recolhida.
- Interface responsiva para desktop/tablet/mobile.
- Modal de detalhes dos templates.
- Botões presentes possuem ação real.

## Deploy

- Service Worker versionado como `ultra-base-v5`.
- Cache antigo é removido na ativação.
- GitHub Actions roda testes antes do deploy.
- Deploy fica bloqueado quando os testes falham.
