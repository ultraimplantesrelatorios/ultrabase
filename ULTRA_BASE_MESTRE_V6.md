# BASE MESTRE — ULTRA IMPLANTES | IA + RD CRM + RD CONVERSAS + GESTÃO

**Função desta base:** ser a fonte única de verdade para gerar a próxima versão do HTML, treinar as atendentes, estruturar o RD Conversas e analisar as futuras exportações do RD CRM.

> Regra central: o sistema deve transformar **fala + histórico + tarefa + etapa + resultado** em **leitura → próximo passo → resposta → registro → métrica → aprendizado**.

## 1. NORTE DO PROJETO

A ferramenta não é apenas um chatbot. Ela deve operar como **copiloto de atendimento + treinadora + analista comercial + supervisora de qualidade + inteligência de conversão**.

Resultado esperado: **atender melhor → responder melhor → fazer follow-up melhor → agendar mais avaliações → reduzir esquecimentos → aumentar comparecimento → aumentar conversão**, sempre dentro dos limites éticos e clínicos.

## 2. QUEM É A ULTRA

**Nome Oficial:** ULTRA Implantes – Tratamentos Odontológicos

**Localizacao:** Osasco/SP

**Fundador:** Dr. Francisma Albuquerque

**Essencia:** acessível; confiável; arrojada; humana; profissional; madura; tecnológica sem ser fria; popular sem perder sofisticação.

**Missao:** Transformar vidas por meio da reabilitação oral, devolvendo saúde, autoestima, função e segurança.

**Publico Prioritario:** Pessoas maduras, com predominância de público 50+, frequentemente acompanhadas ou influenciadas por familiares.

**Posicionamento:** Excelência clínica + atendimento humano + estrutura moderna + segurança + foco em qualidade de vida.

**Estrutura Declarada No Briefing:** Atendimento 100% particular; Laboratório de prótese próprio; Tomografia computadorizada; Radiologia digital; Scanner intraoral; Centro cirúrgico equipado; Equipe experiente em casos simples e de alta complexidade.

**Principios De Comunicacao:** clareza antes de persuasão; acolher antes de conduzir; uma pergunta por vez; não fazer o paciente repetir o que já informou; não pressionar; não usar medo; não transformar conversa em interrogatório; personalizar com o histórico; sempre deixar próximo passo claro.

## 3. PERSONALIDADE DO ATENDIMENTO

A voz da Ultra deve ser **humana, adulta, acolhedora, clara, segura e profissional**. Não é clínica popular agressiva, não é atendimento frio de call center e não é conversa excessivamente sofisticada.

**A atendente deve:** usar o contexto; reconhecer o que a pessoa já disse; fazer uma pergunta por vez; descobrir a barreira real; conduzir sem pressionar; combinar próximo passo; registrar o combinado.

**A atendente não deve:** repetir perguntas já respondidas; despejar menu de tratamentos; fugir de preço com resposta seca; criar promessa clínica; pressionar por agenda cedo demais; enviar follow-up genérico que ignora o histórico.

## 4. MAPA OPERACIONAL DA JORNADA

1. **ENTRADA DO LEAD**
2. **PRIMEIRO CONTATO**
3. **QUALIFICAÇÃO**
4. **IDENTIFICAÇÃO DE BARREIRA/OBJEÇÃO**
5. **ORIENTAÇÃO**
6. **AGENDAMENTO**
7. **CONFIRMAÇÃO**
8. **COMPARECIMENTO**
9. **AVALIAÇÃO**
10. **PROPOSTA/PLANO**
11. **FOLLOW-UP PÓS-AVALIAÇÃO**
12. **FECHAMENTO ou PERDA**
13. **PÓS-ATENDIMENTO/RELACIONAMENTO**

Cada etapa deve responder cinco perguntas: **o que sabemos? → o que falta saber? → qual barreira existe? → qual é o próximo passo? → o que precisa ficar registrado?**

## 5. TAXONOMIA OPERACIONAL

- **NOVO LEAD:** Primeiro contato e identificação da necessidade.
- **QUALIFICAÇÃO:** Entender situação, contexto, motivação e barreiras sem diagnosticar.
- **OBJEÇÃO:** Preço, medo, idade, pouco osso, comparação, experiência ruim, família ou outra barreira.
- **AGENDAMENTO:** Condução para avaliação quando há contexto e intenção suficientes.
- **CONFIRMAÇÃO:** Garantir que data e horário continuam viáveis.
- **REMARCAÇÃO:** Nova data após cancelamento ou barreira prática.
- **NO-SHOW:** Recuperação respeitosa após falta.
- **FOLLOW-UP:** Continuidade com contexto; nunca mensagem vazia de sentido.
- **PÓS-AVALIAÇÃO:** Acompanhar dúvidas comerciais e organização depois da avaliação.
- **CONTEÚDO:** Material útil associado a uma barreira real, não spam.
- **ENCERRAMENTO:** Encerrar tentativas com respeito e possibilidade de retomada.

## 6. MOTOR DE DECISÃO DO COPILOTO

Para qualquer fala, o HTML deve gerar estes blocos:

1. **Leitura principal** — qual cenário/intenção mais provável.
2. **Confiança** — encaixe forte / possível / precisa de mais contexto.
3. **O que já sabemos** — fatos explicitamente fornecidos.
4. **O que não perguntar novamente** — fatos já declarados.
5. **Barreira provável** — sem transformar inferência em fato.
6. **O que falta descobrir** — no máximo 1 pergunta prioritária por vez.
7. **Resposta recomendada** — preferir a versão B aprovada; permitir A/C conforme contexto.
8. **Próximo passo** — pergunta, avaliação, retorno, reagendamento, conteúdo ou encerramento.
9. **O que registrar no RD** — contexto, objeção, combinado, data, responsável e desfecho.
10. **Limite clínico** — quando deve encaminhar ao profissional.

## 7. BIBLIOTECA COMPLETA DE CENÁRIOS E RESPOSTAS

### Lead novo de implante [lead-implante]

**Categoria:** Primeiro contato

**Como pensar:** Use a origem. Não recomece do zero. Descubra o tamanho da necessidade.

**Objetivo:** Entender se a pessoa precisa repor um dente, alguns dentes ou uma reabilitação maior.

**Sinais:** interesse em implante; lead novo.

**Falta descobrir:** quantidade de dentes/alcance da necessidade.

**Melhor pergunta agora:** Hoje você precisa repor um dente, alguns dentes ou todos?

**Perguntas alternativas:** Hoje sua necessidade é mais pontual ou envolve uma reabilitação maior? | Você está buscando informações para você ou para alguém da família?

**Resposta A:** Oi, {{primeiro_nome}}. Vi seu interesse em implantes. Hoje você precisa repor um dente, alguns dentes ou todos?

**Resposta B — padrão/aprovada:** Oi, {{primeiro_nome}}. Eu sou a {{nome_atendente}}, da Ultra. Vi que você procurou informações sobre implantes e vou te acompanhar por aqui. Hoje sua necessidade é de um dente, alguns dentes ou uma reabilitação maior?

**Resposta C:** Oi, {{primeiro_nome}}. Obrigada por procurar a Ultra. Posso te orientar por aqui antes de qualquer decisão. Você está buscando informações para você ou para alguém da família?

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Olá, tudo bem? Como posso ajudar?” quando você já sabe por que ela chegou.
- Pressionar por avaliação antes de entender a necessidade.

**Próximos passos possíveis:** Entender necessidade; Qualificar barreira; Avaliação quando fizer sentido.

**Registrar:** Registrar origem.; Registrar necessidade principal.; Definir próximo passo..

**Limite clínico:** não é o gatilho principal deste cenário

### A pessoa só escreveu “Oi” [oi]

**Categoria:** Primeiro contato

**Como pensar:** Não despeje um menu. Faça uma pergunta simples que abra a conversa.

**Objetivo:** Descobrir o motivo da procura sem parecer robô.

**Sinais:** contato sem contexto.

**Falta descobrir:** motivo da procura.

**Melhor pergunta agora:** O que fez você procurar a gente hoje?

**Perguntas alternativas:** O que você gostaria de entender hoje? | Me conta o que está acontecendo e eu te ajudo a organizar o próximo passo.

**Resposta A:** Oi! Eu sou a {{nome_atendente}}, da Ultra. O que você gostaria de entender hoje?

**Resposta B — padrão/aprovada:** Oi! Seja bem-vindo(a) à Ultra. Eu sou a {{nome_atendente}} e vou te orientar por aqui. O que fez você procurar a gente hoje?

**Resposta C:** Oi! Fique à vontade. Me conta o que está acontecendo e o que você gostaria de entender melhor.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Mandar lista de tratamentos.
- Pedir agendamento antes de entender a necessidade.

**Próximos passos possíveis:** Descobrir motivo; Classificar interesse.

**Registrar:** Registrar interesse assim que ficar claro.; Continuar com uma pergunta por vez..

**Limite clínico:** não é o gatilho principal deste cenário

### Perguntou preço logo no início [preco]

**Categoria:** Objeções

**Como pensar:** Não fuja do preço. Antes de orientar, descubra qual situação está sendo considerada.

**Objetivo:** Entender a necessidade e descobrir depois se a barreira é condição, comparação ou percepção de valor.

**Sinais:** pergunta de preço.

**Falta descobrir:** qual situação está sendo avaliada; se preço é dúvida ou barreira.

**Melhor pergunta agora:** Estamos falando de um dente, alguns dentes ou uma reabilitação maior?

**Perguntas alternativas:** Hoje falta um dente, alguns dentes ou você usa algum tipo de prótese? | Além do valor, existe alguma outra dúvida importante para você agora?

**Resposta A:** Consigo te orientar, {{primeiro_nome}}. Antes, preciso entender qual situação estamos avaliando: é um dente, alguns dentes ou todos? O valor muda conforme a necessidade.

**Resposta B — padrão/aprovada:** Claro, {{primeiro_nome}}. O valor depende do que realmente precisa ser feito, e eu não quero te orientar errado. Estamos falando de um dente, alguns dentes ou uma reabilitação maior?

**Resposta C:** Entendo que o valor é importante para se organizar e comparar. Me conta só qual é a situação hoje: falta um dente, alguns dentes ou você usa algum tipo de prótese?

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Responder de forma seca: “Só na avaliação”.
- Inventar valor ou condição não confirmada.
- Transformar a conversa em defesa de preço.

**Próximos passos possíveis:** Entender necessidade; Seguir política comercial; Identificar objeção real.

**Registrar:** Registrar que preço apareceu como tema.; Investigar a objeção real.; Seguir a política comercial vigente..

**Limite clínico:** não é o gatilho principal deste cenário

### Usa dentadura ou prótese removível [protese]

**Categoria:** Primeiro contato

**Como pensar:** A pessoa já informou que usa prótese. Não pergunte isso de novo. Descubra o incômodo real.

**Objetivo:** Entender o que pesa mais: movimento, machucado, mastigação, estética ou insegurança.

**Sinais:** uso de prótese/dentadura.

**Falta descobrir:** principal incômodo.

**Melhor pergunta agora:** O que mais incomoda você nessa prótese hoje: conforto, mastigação, segurança ou aparência?

**Perguntas alternativas:** Ela se movimenta ou machuca em algum momento? | O que você gostaria de conseguir mudar na sua rotina com ela?

**Resposta A:** Entendi. O que mais incomoda você nessa prótese hoje: ela se movimenta, machuca, atrapalha para mastigar ou é outra questão?

**Resposta B — padrão/aprovada:** Entendi, {{primeiro_nome}}. Para eu compreender melhor sua situação: o que mais pesa hoje no uso dessa prótese — conforto, mastigação, segurança ou aparência?

**Resposta C:** Você já convive com essa prótese há bastante tempo? Me conta o que gostaria de conseguir mudar na sua rotina com ela.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Quer colocar implante?” antes de entender o problema.
- Fazer a pessoa repetir informação que já está no histórico.

**Próximos passos possíveis:** Identificar incômodo; Entender objetivo; Avaliação quando fizer sentido.

**Registrar:** Registrar principal incômodo.; Registrar objetivo do paciente..

**Limite clínico:** não é o gatilho principal deste cenário

### Perdeu um dente [um-dente]

**Categoria:** Primeiro contato

**Como pensar:** Qualifique sem indicar tratamento.

**Objetivo:** Entender há quanto tempo aconteceu e o impacto atual.

**Sinais:** perda de um dente.

**Falta descobrir:** tempo desde a perda; impacto atual.

**Melhor pergunta agora:** Faz quanto tempo que você perdeu esse dente?

**Perguntas alternativas:** Isso incomoda mais na mastigação ou na estética? | O que você gostaria de resolver primeiro nessa situação?

**Resposta A:** Entendi. Faz quanto tempo que você perdeu esse dente?

**Resposta B — padrão/aprovada:** Entendi, {{primeiro_nome}}. Para eu te orientar melhor, faz quanto tempo que esse dente foi perdido e isso tem incomodado mais pela mastigação ou pela estética?

**Resposta C:** Certo. Se você se sentir à vontade, me conta como essa perda tem afetado você hoje. A partir disso eu te explico o melhor próximo passo para avaliar.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Nesse caso é implante unitário.” antes da avaliação.

**Próximos passos possíveis:** Entender impacto; Orientar avaliação.

**Registrar:** Registrar tempo aproximado quando surgir.; Registrar principal incômodo..

**Limite clínico:** não é o gatilho principal deste cenário

### Perdeu vários dentes [varios-dentes]

**Categoria:** Primeiro contato

**Como pensar:** Descubra a situação atual e o impacto. Não pule direto para um procedimento.

**Objetivo:** Entender prótese atual, mastigação e prioridade.

**Sinais:** perda de vários dentes.

**Falta descobrir:** situação funcional; uso de prótese.

**Melhor pergunta agora:** Hoje você usa alguma prótese para substituir esses dentes ou está sem eles?

**Perguntas alternativas:** Essa falta de dentes já interfere na alimentação? | O que mais pesa hoje: mastigação, conforto ou segurança para sorrir?

**Resposta A:** Hoje você usa alguma prótese para substituir esses dentes ou está sem eles?

**Resposta B — padrão/aprovada:** Entendi. Hoje você consegue mastigar bem ou essa falta de dentes já interfere na alimentação?

**Resposta C:** Me conta um pouco de como está sua rotina hoje: você usa alguma prótese, evita alguns alimentos ou sente insegurança para sorrir?

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Você precisa de protocolo.”

**Próximos passos possíveis:** Entender função; Entender objetivo; Avaliação.

**Registrar:** Registrar situação funcional.; Registrar objetivo principal..

**Limite clínico:** não é o gatilho principal deste cenário

### Disseram que tem pouco osso [pouco-osso]

**Categoria:** Objeções

**Como pensar:** Não indique zigomático, enxerto ou outra solução. Entenda o contexto e conduza para avaliação.

**Objetivo:** Descobrir se há exames e de quando são.

**Sinais:** relato de pouco/sem osso; possível questão clínica.

**Falta descobrir:** exames recentes; origem da informação.

**Melhor pergunta agora:** Você chegou a fazer tomografia ou algum exame recentemente?

**Perguntas alternativas:** Quem te passou essa informação e há quanto tempo? | Você tem esse exame ou laudo disponível para levar na avaliação?

**Resposta A:** Entendi. Você chegou a fazer algum exame recentemente?

**Resposta B — padrão/aprovada:** Entendi, {{primeiro_nome}}. Existem diferentes possibilidades, mas a indicação depende da avaliação do especialista. Você chegou a fazer tomografia ou outro exame recentemente?

**Resposta C:** Receber essa informação costuma gerar muita dúvida. Se você tiver exames ou souber quando foi feita essa avaliação, isso pode ajudar o especialista a entender melhor seu caso.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Então você precisa de implante zigomático.”
- Diagnosticar por WhatsApp.

**Próximos passos possíveis:** Confirmar existência de exames; Avaliação com especialista.

**Registrar:** Registrar existência/data de exames.; Encaminhar para avaliação profissional..

**Conteúdo associado:** Conteúdo aprovado, somente se responder à barreira.

**Limite clínico:** SIM

### Tem medo de cirurgia ou procedimento [medo]

**Categoria:** Objeções

**Como pensar:** Não tente apagar o medo com promessa. Descubra do que exatamente a pessoa tem medo.

**Objetivo:** Identificar dor, anestesia, cirurgia, experiência anterior ou falta de informação.

**Sinais:** medo/receio.

**Falta descobrir:** medo específico.

**Melhor pergunta agora:** O que mais preocupa você: dor, anestesia, a cirurgia ou alguma experiência anterior?

**Perguntas alternativas:** Esse medo vem de alguma experiência que você já viveu? | O que você precisaria entender para se sentir mais seguro(a)?

**Resposta A:** Entendi. O que mais preocupa você: dor, anestesia, a cirurgia ou alguma experiência anterior?

**Resposta B — padrão/aprovada:** É importante você me contar isso. O que gera mais receio hoje: sentir dor, o procedimento em si ou algo que já aconteceu antes?

**Resposta C:** Faz sentido querer entender melhor antes de decidir. Se você se sentir à vontade, me conta o que mais te preocupa para eu conseguir te orientar sem pressionar.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Não vai doer.”
- “Pode ficar tranquilo, é simples.”

**Próximos passos possíveis:** Identificar medo real; Enviar conteúdo se ajudar; Avaliação quando houver segurança.

**Registrar:** Registrar medo específico.; Usar conteúdo aprovado somente se ele responder à barreira..

**Conteúdo associado:** Conteúdo aprovado, somente se responder à barreira.

**Limite clínico:** não é o gatilho principal deste cenário

### Acha que a idade impede tratamento [idade]

**Categoria:** Objeções

**Como pensar:** Idade isolada não define indicação. Não prometa elegibilidade.

**Objetivo:** Explicar que avaliação considera saúde e condição clínica.

**Sinais:** dúvida sobre idade.

**Falta descobrir:** condição clínica não pode ser inferida no WhatsApp.

**Melhor pergunta agora:** Sua dúvida é se a idade, por si só, impediria uma avaliação para implante?

**Perguntas alternativas:** Você já conversou com algum dentista sobre isso antes? | Posso te explicar como funciona a avaliação para entender o seu caso com segurança.

**Resposta A:** A idade, sozinha, não define a indicação. O especialista precisa avaliar sua saúde e sua condição bucal para orientar com segurança.

**Resposta B — padrão/aprovada:** Entendo sua dúvida. Pessoas mais velhas podem ter possibilidades de tratamento, mas cada caso precisa ser avaliado individualmente. Podemos organizar essa avaliação para você?

**Resposta C:** Essa é uma dúvida comum. Em vez de decidir só pela idade, o especialista avalia sua saúde, exames e condição bucal. Se quiser, te explico como funciona essa avaliação.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Idade não importa, pode fazer.”
- Garantir tratamento antes da avaliação.

**Próximos passos possíveis:** Explicar limite clínico; Avaliação.

**Registrar:** Registrar a dúvida.; Conduzir para avaliação..

**Limite clínico:** SIM

### Familiar falando pelo paciente [familiar]

**Categoria:** Primeiro contato

**Como pensar:** O familiar pode fazer parte da decisão. Não trate como obstáculo.

**Objetivo:** Entender para quem é, situação atual e papel do familiar.

**Sinais:** familiar participando.

**Falta descobrir:** para quem é; papel na decisão.

**Melhor pergunta agora:** Você está buscando informações para seu pai, mãe ou outro familiar?

**Perguntas alternativas:** O que está acontecendo com ele(a) hoje? | Quais são as principais dúvidas de vocês agora?

**Resposta A:** Claro. Você está buscando informações para seu pai, mãe ou outro familiar?

**Resposta B — padrão/aprovada:** Claro, podemos conversar por aqui. Me conta um pouco da situação do seu familiar hoje e o que vocês gostariam de entender.

**Resposta C:** Sem problema. Muitas famílias participam dessa decisão. Se quiser, me conta o que está acontecendo e quais são as principais dúvidas de vocês.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Mandar o familiar embora com “peça para o paciente entrar em contato” como primeira resposta.

**Próximos passos possíveis:** Identificar paciente; Entender necessidade; Apoiar decisão compartilhada.

**Registrar:** Registrar quem é o paciente.; Registrar quem participa da decisão..

**Limite clínico:** não é o gatilho principal deste cenário

### Está comparando clínicas [comparando]

**Categoria:** Objeções

**Como pensar:** Não ataque concorrente. Descubra o que a pessoa está comparando.

**Objetivo:** Entender se é valor, estrutura, prazo, confiança ou proposta clínica.

**Sinais:** comparação entre clínicas.

**Falta descobrir:** critério de comparação.

**Melhor pergunta agora:** O que você está comparando principalmente: valor, forma de tratamento, estrutura ou confiança na equipe?

**Perguntas alternativas:** O que é mais importante para você nessa escolha? | Posso explicar como funciona nossa avaliação para você comparar com mais segurança.

**Resposta A:** Faz sentido pesquisar. O que você está comparando principalmente: valor, forma de tratamento, estrutura ou confiança na equipe?

**Resposta B — padrão/aprovada:** É natural comparar antes de uma decisão importante. Se ajudar, posso explicar como funciona nossa avaliação e o que é analisado antes de qualquer indicação.

**Resposta C:** Sem problema. Se você quiser, posso organizar as principais informações sobre como funciona o processo aqui para você comparar com mais segurança.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Aqui somos melhores.”
- Desqualificar outra clínica.

**Próximos passos possíveis:** Descobrir critério; Responder com fatos verificáveis.

**Registrar:** Registrar critério de comparação.; Responder apenas com diferenciais concretos e verificáveis..

**Limite clínico:** não é o gatilho principal deste cenário

### Teve experiência ruim antes [experiencia-ruim]

**Categoria:** Objeções

**Como pensar:** Primeiro acolha. Depois descubra o que precisa ser diferente agora.

**Objetivo:** Identificar a origem da insegurança.

**Sinais:** experiência anterior negativa; possível trauma.

**Falta descobrir:** o que gerou insegurança.

**Melhor pergunta agora:** O que aconteceu naquela experiência que mais te deixou inseguro(a)?

**Perguntas alternativas:** O que você precisa sentir diferente desta vez? | Tem algo específico que você gostaria que a equipe soubesse antes da avaliação?

**Resposta A:** Entendi. O que aconteceu naquela experiência que mais te deixou inseguro(a)?

**Resposta B — padrão/aprovada:** Sinto que essa experiência ainda pesa na sua decisão. Se puder me contar o que aconteceu, consigo entender o que você precisa sentir diferente agora.

**Resposta C:** Você não precisa decidir nada agora. Se quiser, me conta o que não funcionou da outra vez e eu te explico como organizamos a avaliação aqui.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Criticar outro profissional.
- Prometer que “aqui nunca acontece”.

**Próximos passos possíveis:** Acolher; Entender gatilho; Adaptar condução.

**Registrar:** Registrar a experiência/barreira.; Adaptar a condução..

**Limite clínico:** não é o gatilho principal deste cenário

### Não respondeu ao primeiro contato [fup-sem-resposta]

**Categoria:** Follow-up

**Como pensar:** Retome o contexto; não cobre resposta.

**Objetivo:** Gerar uma resposta simples e reabrir a conversa.

**Sinais:** primeiro contato sem retorno.

**Falta descobrir:** se a pessoa teve tempo/condição de responder.

**Melhor pergunta agora:** Se sua dúvida sobre {{interesse}} continua, o que você gostaria de entender primeiro?

**Perguntas alternativas:** Quando puder, me conta o que mais gostaria de entender sobre sua situação. | Se esse assunto continuar importante, podemos retomar de onde paramos.

**Resposta A:** {{primeiro_nome}}, vi que ainda não conseguimos conversar. Se sua dúvida sobre {{interesse}} continua, me diga o que você gostaria de entender primeiro.

**Resposta B — padrão/aprovada:** Oi, {{primeiro_nome}}. Você procurou a Ultra para saber sobre {{interesse}}. Quando puder, me conta o que mais gostaria de entender sobre sua situação.

**Resposta C:** {{primeiro_nome}}, sei que nem sempre dá para conversar na hora. Se esse assunto continuar importante para você, posso retomar de onde paramos quando for melhor.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Ainda tem interesse?”
- “Conseguiu ver?”

**Próximos passos possíveis:** Gerar resposta; Registrar tentativa.

**Registrar:** Registrar tentativa conforme processo.; Não repetir indefinidamente..

**Limite clínico:** não é o gatilho principal deste cenário

### Conversou e depois sumiu [fup-sumiu]

**Categoria:** Follow-up

**Como pensar:** Use algo real do histórico. Não envie follow-up genérico.

**Objetivo:** Retomar pelo ponto mais importante da conversa.

**Sinais:** conversa iniciada; interrupção depois de contexto.

**Falta descobrir:** motivo da pausa.

**Melhor pergunta agora:** Nossa conversa ficou em {{contexto_real}}. Ficou alguma dúvida antes de avançarmos?

**Perguntas alternativas:** O que ficou mais importante para você depois da nossa conversa? | Existe alguma questão que esteja dificultando o próximo passo?

**Resposta A:** {{primeiro_nome}}, nossa conversa ficou em {{contexto_real}}. Ficou alguma dúvida antes de avançarmos?

**Resposta B — padrão/aprovada:** {{primeiro_nome}}, lembrei do que você comentou sobre {{contexto_real}}. Como isso parecia importante para você, quis retomar por esse ponto. Posso esclarecer alguma dúvida?

**Resposta C:** {{primeiro_nome}}, vou retomar a partir do que você me contou sobre {{contexto_real}}. Se ainda fizer sentido conversar, seguimos daqui sem precisar começar tudo de novo.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Oi, sumiu?”
- “Podemos dar continuidade?” sem contexto.

**Próximos passos possíveis:** Descobrir motivo; Retomar contexto.

**Registrar:** Registrar motivo da pausa quando descoberto.; Definir próximo passo..

**Limite clínico:** não é o gatilho principal deste cenário

### Parou depois de falar sobre preço [fup-preco]

**Categoria:** Follow-up

**Como pensar:** Não assuma que é apenas falta de dinheiro. Investigue.

**Objetivo:** Descobrir a objeção real.

**Sinais:** preço já discutido; conversa interrompida.

**Falta descobrir:** objeção real.

**Melhor pergunta agora:** Sua principal dúvida ficou no investimento ou apareceu outra questão?

**Perguntas alternativas:** O valor foi o principal ponto ou ficou alguma dúvida sobre o tratamento? | Além do investimento, existe algo que ainda precisa ficar mais claro?

**Resposta A:** {{primeiro_nome}}, nossa conversa parou depois que falamos sobre valor. Sua principal dúvida ficou no investimento ou apareceu outra questão?

**Resposta B — padrão/aprovada:** {{primeiro_nome}}, antes de encerrar esse assunto, queria entender se o valor foi o principal ponto ou se ficou alguma dúvida que eu possa esclarecer.

**Resposta C:** Sei que uma decisão como essa pode envolver orçamento, comparação e família. Se ajudar, posso esclarecer quais informações são importantes para vocês analisarem antes de decidir.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Vamos fechar?”
- Repetir preço sem entender o bloqueio.

**Próximos passos possíveis:** Identificar objeção; Retomar decisão.

**Registrar:** Registrar a objeção real.; Direcionar o próximo follow-up pelo motivo..

**Limite clínico:** não é o gatilho principal deste cenário

### Parou depois de revelar medo [fup-medo]

**Categoria:** Follow-up

**Como pensar:** Retome exatamente o medo informado. Conteúdo só entra se responder à barreira.

**Objetivo:** Diminuir insegurança e reabrir conversa.

**Sinais:** medo conhecido; conversa interrompida.

**Falta descobrir:** se o medo continua sendo a principal barreira.

**Melhor pergunta agora:** O que mais te preocupa hoje em relação a {{medo_especifico}}?

**Perguntas alternativas:** Quer que eu te envie uma explicação do especialista sobre esse ponto? | Depois da nossa conversa, ficou alguma dúvida específica sobre esse receio?

**Resposta A:** {{primeiro_nome}}, você comentou que {{medo_especifico}} te preocupa. Temos um conteúdo do especialista sobre esse ponto. Posso te enviar?

**Resposta B — padrão/aprovada:** {{primeiro_nome}}, lembrei do que você me contou sobre {{medo_especifico}}. Temos uma explicação simples do nosso especialista que pode ajudar você a entender melhor. Quer que eu envie?

**Resposta C:** Se achar útil, posso te mandar um conteúdo curto sobre {{tema}} para você ver com calma e até compartilhar com alguém da família.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Enviar vídeo aleatório.
- Prometer ausência de dor.

**Próximos passos possíveis:** Retomar medo real; Conteúdo se ajudar.

**Registrar:** Registrar conteúdo enviado.; Registrar reação..

**Conteúdo associado:** Conteúdo aprovado, somente se responder à barreira.

**Limite clínico:** não é o gatilho principal deste cenário

### Precisa conversar com a família [fup-familia]

**Categoria:** Follow-up

**Como pensar:** Não trate como desculpa. Facilite a decisão compartilhada.

**Objetivo:** Descobrir que informação pode ajudar a família a decidir.

**Sinais:** decisão compartilhada.

**Falta descobrir:** o que a família precisa entender.

**Melhor pergunta agora:** Ficou alguma informação que eu possa esclarecer para ajudar vocês a decidir o próximo passo?

**Perguntas alternativas:** Surgiu alguma dúvida quando você conversou com {{familiar}}? | Posso organizar as principais informações para você compartilhar com {{familiar}}.

**Resposta A:** {{primeiro_nome}}, você comentou que conversaria com {{familiar}}. Ficou alguma informação que eu possa esclarecer para ajudar vocês a decidir o próximo passo?

**Resposta B — padrão/aprovada:** Como você queria conversar com {{familiar}}, deixo esse canal aberto. Se surgir alguma dúvida sobre avaliação ou processo, posso esclarecer por aqui.

**Resposta C:** Se for mais fácil, posso organizar as principais informações para você compartilhar com {{familiar}} antes de marcar qualquer coisa.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Já falou com seu marido?” em tom de cobrança.

**Próximos passos possíveis:** Apoiar decisão; Registrar decisor.

**Registrar:** Registrar quem participa da decisão.; Registrar combinado de retorno..

**Limite clínico:** não é o gatilho principal deste cenário

### Pediu para chamar em outra data [retorno-data]

**Categoria:** Follow-up

**Como pensar:** Cumpra o combinado. Aqui, organização vale mais que insistência.

**Objetivo:** Retomar com permissão contextual.

**Sinais:** retorno combinado.

**Falta descobrir:** se agora é um bom momento.

**Melhor pergunta agora:** Conforme combinamos, estou retomando nossa conversa sobre {{interesse}}. Esse é um bom momento?

**Perguntas alternativas:** Podemos continuar de onde paramos? | Se ainda não for um bom momento, me avise e ajustamos.

**Resposta A:** Oi, {{primeiro_nome}}. Conforme combinamos, estou retomando nossa conversa sobre {{interesse}}. Esse é um bom momento?

**Resposta B — padrão/aprovada:** Oi, {{primeiro_nome}}. Você pediu que eu retornasse agora para falarmos sobre {{interesse}}. Podemos continuar de onde paramos?

**Resposta C:** Oi, {{primeiro_nome}}. Estou voltando no período que combinamos. Se ainda não for um bom momento, me avise e ajustamos sem problema.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Retomar antes da data combinada sem motivo.

**Próximos passos possíveis:** Cumprir combinado; Definir novo passo.

**Registrar:** Registrar nova data se a pessoa adiar novamente..

**Limite clínico:** não é o gatilho principal deste cenário

### Demonstrou interesse, mas não agendou [nao-agendou]

**Categoria:** Follow-up

**Como pensar:** Não ofereça horários repetidamente sem entender o bloqueio.

**Objetivo:** Descobrir o que falta para o próximo passo.

**Sinais:** interesse presente; sem agendamento.

**Falta descobrir:** barreira final.

**Melhor pergunta agora:** O que falta para você se sentir confortável em marcar a avaliação?

**Perguntas alternativas:** Ficou alguma dúvida ou dificuldade prática para escolher uma data? | O que ainda precisa ficar mais claro antes de pensar em um horário?

**Resposta A:** O que falta para você se sentir confortável em marcar a avaliação?

**Resposta B — padrão/aprovada:** Antes de seguirmos, queria entender se ficou alguma dúvida ou dificuldade prática para marcarmos sua avaliação.

**Resposta C:** Você não precisa decidir agora. Se quiser, me conta o que ainda precisa ficar mais claro para você antes de pensar em uma data.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Repetir “quer agendar?” sem contexto.

**Próximos passos possíveis:** Descobrir bloqueio; Agendar ou nutrir.

**Registrar:** Registrar barreira final.; Definir próximo passo..

**Limite clínico:** não é o gatilho principal deste cenário

### Cancelou e precisa de nova data [cancelou]

**Categoria:** Reagendamento

**Como pensar:** Reduza esforço. Se possível, ofereça opções objetivas.

**Objetivo:** Recuperar o agendamento sem pressão.

**Sinais:** cancelamento.

**Falta descobrir:** motivo quando relevante; nova possibilidade.

**Melhor pergunta agora:** Prefere que eu procure uma nova data agora ou existe alguma dificuldade que precisamos considerar antes?

**Perguntas alternativas:** Tenho {{opcao_1}} ou {{opcao_2}}. Qual funciona melhor? | O que pesou mais desta vez: horário, transporte, acompanhante ou outro imprevisto?

**Resposta A:** Tudo certo, {{primeiro_nome}}. Tenho {{opcao_1}} ou {{opcao_2}} para uma nova avaliação. Qual funciona melhor?

**Resposta B — padrão/aprovada:** Sem problema, {{primeiro_nome}}. Se você quiser, já posso procurar uma nova opção para não deixar sua avaliação pendente. Prefere durante a semana ou outro período disponível?

**Resposta C:** Entendi. Antes de marcar outra data, quero evitar oferecer um horário que volte a ser difícil. O que pesou mais desta vez: horário, transporte, acompanhante ou outro imprevisto?

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Você precisa remarcar.”
- Jogar toda a busca de horário para o paciente.

**Próximos passos possíveis:** Nova data; Resolver barreira.

**Registrar:** Registrar motivo quando relevante.; Registrar nova data ou próximo contato..

**Limite clínico:** não é o gatilho principal deste cenário

### Faltou sem avisar [noshow]

**Categoria:** Reagendamento

**Como pensar:** Primeiro entenda o que aconteceu. Não comece cobrando.

**Objetivo:** Recuperar relacionamento e depois avaliar reagendamento.

**Sinais:** não comparecimento.

**Falta descobrir:** se houve imprevisto.

**Melhor pergunta agora:** Aconteceu algum imprevisto hoje?

**Perguntas alternativas:** Está tudo bem por aí? | Algo como horário, transporte ou acompanhante dificultou sua ida?

**Resposta A:** Oi, {{primeiro_nome}}. Não conseguimos realizar sua avaliação hoje. Aconteceu algum imprevisto?

**Resposta B — padrão/aprovada:** Oi, {{primeiro_nome}}. Percebemos que não conseguimos realizar sua avaliação hoje e quis saber se aconteceu algum imprevisto. Está tudo bem por aí?

**Resposta C:** Oi, {{primeiro_nome}}. Vi que hoje não conseguimos realizar sua avaliação. Como você já tinha comentado sobre {{barreira}}, quis entender se isso acabou dificultando sua ida.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Você faltou à consulta.”
- Cobrança ou constrangimento.

**Próximos passos possíveis:** Acolher; Entender motivo; Reagendar se fizer sentido.

**Registrar:** Registrar motivo.; Registrar tentativa de recuperação..

**Limite clínico:** não é o gatilho principal deste cenário

### Consulta ainda não confirmada [nao-confirmou]

**Categoria:** Reagendamento

**Como pensar:** Seja objetivo. Facilite uma resposta simples.

**Objetivo:** Confirmar ou reorganizar agenda conforme regra interna.

**Sinais:** consulta marcada; sem confirmação.

**Falta descobrir:** se o horário continua válido.

**Melhor pergunta agora:** Sua avaliação está marcada para {{data}}, às {{hora}}. Esse horário continua funcionando para você?

**Perguntas alternativas:** Posso manter esse horário reservado para você? | Precisa que eu verifique outra possibilidade?

**Resposta A:** Oi, {{primeiro_nome}}. Sua avaliação está marcada para {{data}}, às {{hora}}. Esse horário continua funcionando para você?

**Resposta B — padrão/aprovada:** Oi, {{primeiro_nome}}. Estou confirmando sua avaliação de {{data}}, às {{hora}}. Posso manter esse horário reservado para você?

**Resposta C:** Oi, {{primeiro_nome}}. Antes de mantermos tudo preparado para sua avaliação em {{data}}, às {{hora}}, preciso confirmar se esse horário continua adequado para você.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Mensagem enorme antes da pergunta de confirmação.

**Próximos passos possíveis:** Confirmar; Reorganizar agenda.

**Registrar:** Registrar confirmado / não confirmado.; Seguir processo de agenda..

**Limite clínico:** não é o gatilho principal deste cenário

### Transporte, acompanhante ou horário [barreira-pratica]

**Categoria:** Reagendamento

**Como pensar:** Isso pode ser uma barreira operacional, não falta de interesse.

**Objetivo:** Encontrar uma opção realmente viável.

**Sinais:** barreira operacional.

**Falta descobrir:** qual dificuldade é dominante.

**Melhor pergunta agora:** Qual desses pontos está dificultando mais: horário, transporte ou acompanhante?

**Perguntas alternativas:** Qual período costuma ser mais viável para você? | Se precisa de acompanhante, quais períodos funcionam melhor para vocês dois?

**Resposta A:** Qual desses pontos está dificultando mais: horário, transporte ou acompanhante?

**Resposta B — padrão/aprovada:** Entendi. Em vez de insistir em um horário que não funciona, vamos ajustar. Qual período costuma ser mais viável para você?

**Resposta C:** Se você precisa de acompanhante, podemos procurar uma opção que funcione para os dois. Quais períodos costumam ser mais fáceis?

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Continuar oferecendo o mesmo tipo de horário repetidamente.

**Próximos passos possíveis:** Resolver barreira; Escolher horário viável.

**Registrar:** Registrar a barreira prática.; Usar essa informação no próximo agendamento..

**Limite clínico:** não é o gatilho principal deste cenário

### Pergunta clínica específica [clinica]

**Categoria:** Limite clínico

**Como pensar:** Acolha a pergunta, explique o limite e encaminhe. Atendente qualifica; dentista diagnostica.

**Objetivo:** Evitar diagnóstico por WhatsApp e manter a conversa útil.

**Sinais:** pergunta clínica.

**Falta descobrir:** avaliação profissional.

**Melhor pergunta agora:** Essa definição depende da avaliação do dentista. Posso te explicar como funciona essa avaliação?

**Perguntas alternativas:** Se houver exames, eles podem ajudar o especialista a avaliar com segurança. | Posso organizar sua avaliação para essa dúvida ser respondida corretamente.

**Resposta A:** Essa definição depende da avaliação do dentista. Posso te ajudar a organizar essa avaliação.

**Resposta B — padrão/aprovada:** Entendo sua dúvida. Para responder com segurança, o especialista precisa avaliar seu caso e, quando necessário, os exames. Posso te explicar como funciona essa avaliação.

**Resposta C:** É uma pergunta importante e eu não quero te dar uma resposta clínica incompleta por mensagem. O dentista consegue orientar com segurança depois de avaliar você.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Indicar tratamento.
- Garantir resultado.
- Dar prognóstico.

**Próximos passos possíveis:** Explicar limite; Encaminhar avaliação.

**Registrar:** Registrar dúvida clínica.; Encaminhar ao profissional/avaliação..

**Limite clínico:** SIM

### Já passou pela avaliação [pos-avaliacao]

**Categoria:** Pós-avaliação

**Como pensar:** Use apenas informações registradas. Não altere proposta clínica.

**Objetivo:** Identificar dúvida comercial, organizacional ou clínica e encaminhar corretamente.

**Sinais:** avaliação realizada.

**Falta descobrir:** dúvida atual; barreira pós-avaliação.

**Melhor pergunta agora:** Depois da sua avaliação, ficou alguma dúvida sobre o próximo passo que combinamos?

**Perguntas alternativas:** Ficou alguma dúvida sobre o plano apresentado, investimento ou organização para começar? | Existe alguma questão clínica que eu precise encaminhar ao profissional responsável?

**Resposta A:** Oi, {{primeiro_nome}}. Depois da sua avaliação, ficou alguma dúvida sobre o próximo passo que combinamos?

**Resposta B — padrão/aprovada:** Oi, {{primeiro_nome}}. Quis acompanhar você depois da avaliação. Ficou alguma dúvida sobre o plano apresentado, investimento ou organização para começar?

**Resposta C:** Oi, {{primeiro_nome}}. Sei que depois da avaliação pode surgir muita coisa para pensar. Se quiser, posso te ajudar com as dúvidas comerciais e de organização; questões clínicas eu encaminho ao profissional responsável.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Inventar condição.
- Mudar proposta clínica.
- Responder dúvida clínica fora do escopo.

**Próximos passos possíveis:** Classificar dúvida; Acompanhar decisão.

**Registrar:** Registrar objeção/dúvida.; Registrar decisão ou próximo contato..

**Limite clínico:** não é o gatilho principal deste cenário

### Disse “quero pensar” / não é o momento [pensar]

**Categoria:** Follow-up

**Como pensar:** Respeite. Descubra se existe algo a esclarecer ou se deve encerrar/nutrir.

**Objetivo:** Evitar insistência improdutiva e definir o próximo estado.

**Sinais:** pedido de tempo.

**Falta descobrir:** se precisa de informação ou apenas tempo.

**Melhor pergunta agora:** Você quer um tempo para pensar ou existe alguma questão específica que ainda precisa ficar mais clara?

**Perguntas alternativas:** Prefere que eu encerre por enquanto ou quer que eu retome em outro momento? | Existe uma data melhor para eu voltar a falar com você?

**Resposta A:** Entendi. Prefere que eu encerre por enquanto ou quer que eu retome com você em outro momento?

**Resposta B — padrão/aprovada:** Sem problema. Você quer um tempo para pensar ou existe alguma questão específica que ainda precisa ficar mais clara?

**Resposta C:** Tudo bem, {{primeiro_nome}}. Não quero ficar insistindo. Se fizer sentido, posso deixar registrado para retomarmos mais adiante; se preferir, encerramos por aqui e você nos chama quando quiser.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Criar urgência artificial.
- “Última chance”.

**Próximos passos possíveis:** Definir retorno; Nutrição ou encerramento.

**Registrar:** Registrar motivo.; Definir retorno futuro, nutrição ou encerramento..

**Limite clínico:** não é o gatilho principal deste cenário

### Enviar conteúdo para apoiar a conversa [conteudo]

**Categoria:** Conteúdo

**Como pensar:** Conteúdo é ferramenta para uma barreira específica, não enfeite.

**Objetivo:** Ajudar a pessoa a entender um ponto sem substituir o atendimento.

**Sinais:** pedido/oportunidade de conteúdo.

**Falta descobrir:** qual barreira o conteúdo precisa resolver.

**Melhor pergunta agora:** Qual ponto você gostaria de entender melhor para eu te enviar o conteúdo certo?

**Perguntas alternativas:** Tenho um conteúdo exatamente sobre {{tema}}. Posso te enviar? | Você prefere uma explicação curta ou um vídeo do especialista, se tivermos disponível?

**Resposta A:** Tenho um conteúdo exatamente sobre {{tema}}. Posso te enviar?

**Resposta B — padrão/aprovada:** Como você comentou sobre {{barreira}}, temos uma explicação que pode ajudar a entender esse ponto com mais calma. Quer que eu envie?

**Resposta C:** Se achar útil, posso te mandar um material curto sobre {{tema}} para você ver no seu tempo e compartilhar com a família.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- Mandar vários links.
- Enviar conteúdo sem relação com a dúvida.

**Próximos passos possíveis:** Enviar conteúdo relevante; Retomar depois.

**Registrar:** Registrar o que foi enviado.; Observar se ajudou a conversa a avançar..

**Conteúdo associado:** Conteúdo aprovado, somente se responder à barreira.

**Limite clínico:** não é o gatilho principal deste cenário

### Encerrar tentativas com respeito [encerrar]

**Categoria:** Encerramento

**Como pensar:** Encerrar não é punir. Preserve uma porta aberta.

**Objetivo:** Fechar o ciclo sem culpa ou pressão.

**Sinais:** tentativas previstas sem resposta.

**Falta descobrir:** nenhuma informação adicional obrigatória.

**Melhor pergunta agora:** Vou encerrar minhas tentativas por enquanto. Se quiser retomar, é só me chamar por aqui.

**Perguntas alternativas:** Seu histórico fica por aqui caso queira retomar depois. | Vou deixar você à vontade. Se esse assunto voltar a fazer sentido, seguimos de onde paramos.

**Resposta A:** {{primeiro_nome}}, vou encerrar minhas tentativas por enquanto. Se quiser retomar, é só me chamar por aqui.

**Resposta B — padrão/aprovada:** {{primeiro_nome}}, como não conseguimos continuar a conversa, vou encerrar este acompanhamento por enquanto. Seu histórico fica por aqui caso queira retomar depois.

**Resposta C:** Vou deixar você à vontade, {{primeiro_nome}}. Não quero ficar insistindo. Se esse assunto voltar a fazer sentido, pode nos chamar e seguimos de onde paramos.

**Usar A:** Quando a pessoa está objetiva e já engajada.
**Usar B:** Quando precisa de mais contexto e segurança.
**Usar C:** Quando a decisão é compartilhada, a pessoa está mais fria ou precisa de tempo/confiança.

**Evitar:**
- “Última chance.”
- “Você perdeu sua oportunidade.”

**Próximos passos possíveis:** Registrar encerramento; Nutrição conforme processo.

**Registrar:** Registrar encerramento/nutrição conforme processo..

**Limite clínico:** não é o gatilho principal deste cenário

## 8. TESTES DE INTERPRETAÇÃO JÁ VALIDADOS

Os 20 testes atuais devem permanecer como suíte mínima de regressão da próxima versão. Toda alteração no motor de classificação deve continuar reconhecendo corretamente:

- **Quanto custa um implante?** → `preco` — PASS
- **Tenho muito medo da cirurgia.** → `medo` — PASS
- **Me disseram que eu não tenho osso.** → `pouco-osso` — PASS
- **Minha mãe usa dentadura.** → `ambíguo: familiar/prótese` — PASS
- **Tenho 72 anos, ainda posso fazer?** → `idade` — PASS
- **Achei caro.** → `fup-preco` — PASS
- **Vou conversar com minha esposa.** → `fup-familia` — PASS
- **Já fui em outra clínica.** → `comparando` — PASS
- **Não consigo ir porque dependo da minha filha.** → `barreira-pratica` — PASS
- **Minha última cirurgia foi horrível.** → `experiencia-ruim` — PASS
- **Quero pensar.** → `pensar` — PASS
- **Me chama mês que vem.** → `retorno-data` — PASS
- **Não fui na consulta.** → `noshow` — PASS
- **Perdi um dente.** → `um-dente` — PASS
- **Perdi vários dentes.** → `varios-dentes` — PASS
- **Só queria saber como funciona.** → `precisa de mais contexto` — PASS
- **Oi.** → `oi` — PASS
- **Já passei na avaliação.** → `pos-avaliacao` — PASS
- **Tenho medo de anestesia.** → `medo` — PASS
- **Disseram que comigo só zigomático resolve.** → `pouco-osso` — PASS

## 9. O QUE O SISTEMA DEVE AUDITAR NAS TAREFAS DO RD

**Importante:** ainda não recebemos a exportação bruta real de Tarefas nesta base. Portanto, os itens abaixo são **regras de auditoria e falhas de processo já definidas para procurar**, não uma afirmação de que todas já ocorreram na operação.

### Tarefa Vencida Sem Continuidade
- **Gravidade:** alta
- **Detectar:** Tarefa vencida e nenhuma tarefa posterior relacionada ao mesmo lead/negociação.
- **Risco:** Lead esquecido e quebra de continuidade.
- **Ação:** Criar nova ação com responsável e prazo; sinalizar no painel 'Ação agora'.

### Tarefa Concluida Sem Proximo Passo
- **Gravidade:** alta
- **Detectar:** Atividade concluída em etapa que exige continuidade, mas sem próxima atividade.
- **Risco:** CRM aparenta organização, mas o paciente fica sem acompanhamento.
- **Ação:** Exigir próximo passo ou justificativa de encerramento.

### Nomenclatura Inconsistente
- **Gravidade:** media
- **Detectar:** Vários nomes para a mesma intenção operacional, como Follow Up / Retorno paciente / Entrar em contato novamente.
- **Risco:** Métricas fragmentadas e leitura incorreta da operação.
- **Ação:** Normalizar em família operacional preservando o texto original.

### Tarefa Sem Responsavel
- **Gravidade:** alta
- **Detectar:** Tarefa sem responsável definido.
- **Risco:** Ninguém assume o próximo passo.
- **Ação:** Bloquear invisibilidade: mostrar em 'Sem responsável'.

### Tarefa Sem Negociacao Ou Lead
- **Gravidade:** media
- **Detectar:** Atividade que não pode ser ligada com segurança a um lead/negociação.
- **Risco:** Impossibilidade de reconstruir a jornada.
- **Ação:** Exibir como problema de qualidade de dados.

### Campo Vazio Critico
- **Gravidade:** media
- **Detectar:** Ausência de status, data, responsável, tipo ou vínculo quando esses campos existirem na exportação.
- **Risco:** Indicadores pouco confiáveis.
- **Ação:** Gerar taxa de completude por campo e por responsável.

### Duplicidade
- **Gravidade:** media
- **Detectar:** Registros potencialmente duplicados pela combinação de identificadores, lead, tarefa, data/hora e responsável.
- **Risco:** Inflação de volume e métricas.
- **Ação:** Marcar como possível duplicidade; nunca excluir silenciosamente.

### Followup Sem Contexto
- **Gravidade:** media
- **Detectar:** Follow-up genérico sem registro do motivo, objeção, combinado ou data.
- **Risco:** Atendente seguinte recomeça a conversa do zero.
- **Ação:** Treinar registro mínimo: contexto + barreira + combinado + próxima data.

### Pos Avaliacao Sem Followup
- **Gravidade:** alta
- **Detectar:** Avaliação registrada sem continuidade comercial quando não houver fechamento/encerramento.
- **Risco:** Perda de oportunidade de maior intenção.
- **Ação:** Prioridade alta na fila de recuperação.

### No Show Sem Recuperacao
- **Gravidade:** alta
- **Detectar:** Falta/no-show sem tentativa posterior de contato ou reagendamento.
- **Risco:** Paciente de alta intenção abandonado.
- **Ação:** Acionar fluxo de recuperação respeitoso.

### Retorno Prometido Nao Cumprido
- **Gravidade:** alta
- **Detectar:** Paciente pediu retorno em data/período e não existe atividade compatível.
- **Risco:** Perda de confiança.
- **Ação:** Criar alerta de compromisso não cumprido.

### Fechamento Sem Motivo De Perda
- **Gravidade:** media
- **Detectar:** Quando futuramente houver negócios perdidos, ausência de motivo de perda.
- **Risco:** Gestão não aprende com as perdas.
- **Ação:** Exigir motivo padronizado + observação opcional.

## 10. NORMALIZAÇÃO DAS TAREFAS

Nunca apagar o dado original. Criar campos derivados.

**Exemplo:** `Contato do follow up`, `Follow Up`, `Retorno paciente`, `Entrar em contato novamente` podem virar `familia_operacional = FOLLOW-UP`, mantendo `atividade_original` intacta.

Famílias sugeridas: **NOVO_LEAD, QUALIFICACAO, AGENDAMENTO, FOLLOW_UP, POS_AVALIACAO, ORCAMENTO, REATIVACAO, CONFIRMACAO, REMARCACAO, FALTA, POS_ATENDIMENTO, ENCERRAMENTO**.

## 11. IMPORTAÇÃO DO RELATÓRIO RD

Fluxo obrigatório da tela **Importar Relatório RD**:

1. Arrastar/selecionar CSV ou XLSX bruto.
2. Detectar automaticamente colunas.
3. Exibir o mapeamento antes da análise.
4. Informar campos encontrados e campos ausentes.
5. Preservar valores originais.
6. Criar normalizações derivadas.
7. Procurar duplicidades e problemas de qualidade.
8. Calcular apenas indicadores sustentados pelos dados.
9. Identificar ações urgentes.
10. Comparar com a importação anterior.
11. Guardar fingerprint/identificador para evitar duplicação.
12. Gerar resumo gerencial em linguagem simples.

Quando uma métrica não puder ser calculada: **“Essa métrica ainda não pode ser calculada com esta exportação.”**

## 12. PAINEL DE GESTÃO — MÉTRICAS

- **Tarefas previstas hoje:** Quantidade de tarefas com vencimento no dia. **Dados necessários:** Tarefas.
- **Tarefas vencidas:** Tarefas não concluídas cujo prazo já passou. **Dados necessários:** Tarefas.
- **% de tarefas vencidas:** vencidas / tarefas abertas elegíveis. **Dados necessários:** Tarefas.
- **Tarefas sem responsável:** Quantidade e percentual sem dono. **Dados necessários:** Tarefas.
- **Tarefas sem continuidade:** Concluídas que deveriam gerar próxima ação e não geraram. **Dados necessários:** Tarefas + regra operacional.
- **Leads que precisam de ação agora:** Casos com vencimento, ausência de próximo passo, no-show, pós-avaliação ou retorno prometido pendente. **Dados necessários:** Tarefas + vínculo com lead.
- **Follow-ups realizados:** Quantidade de atividades normalizadas como FOLLOW-UP. **Dados necessários:** Tarefas.
- **Tempo médio entre contatos:** Intervalo médio entre atividades do mesmo lead. **Dados necessários:** Tarefas ordenadas por lead.
- **Tempo até primeiro contato:** Diferença entre entrada do lead e primeira ação. **Dados necessários:** Exige data de entrada do lead.
- **Taxa de contato:** Leads efetivamente contatados / leads recebidos. **Dados necessários:** Exige leads + resultado do contato.
- **Taxa de resposta:** Leads que responderam / leads contatados. **Dados necessários:** Exige conversas ou status de resposta.
- **Taxa de agendamento:** Avaliações agendadas / leads elegíveis ou contatados, conforme definição fixada. **Dados necessários:** Exige etapa/agendamento.
- **Taxa de confirmação:** Agendamentos confirmados / agendamentos. **Dados necessários:** Exige confirmação.
- **Taxa de comparecimento:** Comparecimentos / agendamentos válidos. **Dados necessários:** Exige presença.
- **Taxa de no-show:** Faltas / agendamentos válidos. **Dados necessários:** Exige presença.
- **Taxa de remarcação:** Remarcações / agendamentos. **Dados necessários:** Exige histórico de agenda.
- **Taxa pós-avaliação com follow-up:** Avaliações sem fechamento que receberam acompanhamento / avaliações elegíveis. **Dados necessários:** Exige avaliação + follow-up.
- **Taxa de fechamento:** Negócios ganhos / oportunidades elegíveis. **Dados necessários:** Exige negócios/resultado.
- **Taxa de perda:** Negócios perdidos / oportunidades encerradas. **Dados necessários:** Exige negócios/resultado.
- **Conversão por atendente:** Comparar resultado com volume, origem e estágio; nunca usar volume bruto isolado. **Dados necessários:** Exige responsável + funil.
- **Recuperação de leads:** Leads inativos/no-show reativados e que avançaram. **Dados necessários:** Exige histórico longitudinal.
- **Qualidade de registro:** Completude de campos essenciais e existência de próximo passo. **Dados necessários:** Tarefas/CRM.

## 13. PAINEL DA MILENA

### HOJE
- tarefas previstas
- tarefas atrasadas
- leads novos
- follow-ups
- avaliações marcadas
- avaliações confirmadas
- faltas/no-shows

### ATENÇÃO
- leads sem resposta
- negócios parados
- tarefas vencidas
- pacientes sem próxima atividade
- orçamento sem follow-up
- avaliação sem continuidade
- retorno prometido não realizado
- tarefas sem responsável

### RESULTADOS
- novos leads
- contatos
- agendamentos
- comparecimentos
- propostas
- fechamentos
- perdas
- recuperações

### EQUIPE
Comparar atendentes considerando **volume, origem, estágio e contexto**. Nunca concluir desempenho apenas pela quantidade bruta de tarefas.

## 14. SCORE DE QUALIDADE DO ATENDIMENTO

O score só deve existir com critérios observáveis. Dimensões recomendadas:

- **Acolhimento:** reconhece contexto e trata a pessoa com respeito.
- **Clareza:** mensagem simples e compreensível.
- **Escuta/contexto:** usa o que já foi dito e não repete perguntas.
- **Qualificação:** descobre o que realmente falta saber.
- **Condução:** deixa próximo passo claro sem pressão.
- **Objeção:** trabalha a barreira específica, não responde genericamente.
- **Follow-up:** retoma contexto e respeita timing.
- **Registro no CRM:** histórico suficiente para continuidade.
- **Disciplina de tarefas:** cumpre prazos e cria próxima ação.
- **Conversão:** somente quando os dados permitirem atribuição justa.

Cada nota deve mostrar **evidência + critério + exemplo do que melhorar**.

## 15. TREINAMENTO AUTOMÁTICO DAS ATENDENTES

Quando o sistema encontrar uma oportunidade de melhoria, não escrever apenas “a atendente errou”. Entregar:

1. **O que aconteceu.**
2. **Qual evidência existe.**
3. **Por que isso pode prejudicar a jornada.**
4. **Como conduzir melhor.**
5. **Exemplo de resposta melhor.**
6. **O que registrar no CRM.**
7. **Qual regra de processo evita repetição.**

## 16. INTELIGÊNCIA DO RD CONVERSAS

A evolução deve conectar **o que foi conversado + o que foi registrado + o que aconteceu depois**.

Perguntas que o sistema deve aprender a responder com dados:

- Qual resposta gera mais agendamento?
- Quais perguntas aparecem com maior frequência?
- Onde o lead abandona?
- Quais objeções são mais frequentes?
- Quem recupera mais leads e em quais contextos?
- Quantos follow-ups são necessários antes de avançar?
- Qual intervalo funciona melhor por tipo de situação?
- Quais abordagens geram silêncio ou encerramento?
- O que atendentes de maior conversão fazem diferente?
- Qual conteúdo ajuda qual objeção?

## 17. GUARDRAILS CLÍNICOS, ÉTICOS E COMERCIAIS

- Não diagnosticar.
- Não indicar tratamento individual sem avaliação profissional.
- Não interpretar exame como dentista.
- Não prescrever medicamento.
- Não prometer resultado.
- Não inventar preço, condição comercial ou prazo clínico.
- Não usar medo, culpa ou pressão.
- Não expor dados privados.
- Não transformar inferência em fato.
- Quando faltarem dados para uma métrica, declarar explicitamente que ela ainda não pode ser calculada.

## 18. ARQUITETURA RECOMENDADA DA PRÓXIMA VERSÃO DO HTML

### Central / Hoje
Responder em 10 segundos: o que está acontecendo hoje e quem precisa de atenção.

**Componentes:** KPIs do dia; Ação agora; tarefas vencidas; sem responsável; retornos prometidos; no-shows; pós-avaliação pendente.

### Copiloto de Atendimento
Interpretar a fala do paciente e orientar a atendente.

**Componentes:** leitura/intenção; o que já sabemos; o que não perguntar de novo; melhor pergunta agora; resposta sugerida; alternativas A/B/C; próximo passo; o que registrar; limite clínico.

### Biblioteca
Consultar rapidamente todos os cenários e objeções.

**Componentes:** busca; filtros por categoria; 28 cenários atuais; resposta aprovada; alternativas; erros a evitar; registro necessário.

### Importar RD
Receber CSV/XLSX bruto e transformar em auditoria operacional.

**Componentes:** drag-and-drop; mapeamento de colunas; preview; qualidade dos dados; normalização; comparação com importação anterior; alertas.

### Gestão / Milena
Supervisionar operação, qualidade e evolução.

**Componentes:** Hoje; Atenção; Resultados; Equipe; Evolução; dados insuficientes; ranking contextualizado.

### Treinamento
Transformar erros reais em aprendizado.

**Componentes:** o que aconteceu; por que prejudicou; como conduzir; exemplo melhor; regra operacional; casos para treino.

### Implantação RD Conversas
Controlar cadastro, teste e validação dos templates.

**Componentes:** status pendente/cadastrado/validado; categoria; versão aprovada; variáveis; validação técnica RD/Meta; exportação.

## 19. MAPA DE DADOS MÍNIMO

Para o sistema evoluir, cada entidade deve ter um identificador estável quando disponível.

**Lead/Contato:** id, nome (apenas no CRM; evitar colar no copiloto), origem, interesse, responsável.
**Negociação:** id, etapa, status, valor quando aplicável, ganho/perdido, motivo de perda.
**Tarefa:** id, tipo original, família normalizada, criação, vencimento, conclusão, responsável, vínculo com lead/negociação.
**Conversa:** id/thread, data/hora, autor, mensagem, intenção classificada, objeção, resposta usada.
**Agenda:** data, hora, status, confirmação, comparecimento, remarcação, no-show.
**Resultado:** avanço de etapa, avaliação, proposta, fechamento, perda, reativação.

## 20. LÓGICA DE PRIORIDADE — AÇÃO AGORA

Prioridade sugerida, sempre ajustável por regra real da Ultra:

1. **Crítico:** retorno prometido vencido; pós-avaliação sem continuidade; no-show sem recuperação; tarefa vencida de lead de alta intenção.
2. **Alta:** orçamento/proposta sem follow-up; agendamento não confirmado; lead interessado sem próxima atividade.
3. **Média:** follow-up previsto; lead parado; barreira prática pendente.
4. **Baixa:** conteúdo/relacionamento sem urgência; reativação fria.

## 21. O QUE NÃO DEVE SER CONFUNDIDO COM DADO

- Uma palavra-chave não prova a intenção do paciente.
- Uma tarefa concluída não prova que o lead foi bem atendido.
- Muito volume não prova produtividade.
- Poucas tarefas não provam baixa performance.
- Silêncio não prova desinteresse.
- Pergunta de preço não prova que preço é a objeção.
- “Quero pensar” não deve ser automaticamente classificado como perdido.
- Idade, pouco osso e medo não autorizam conclusão clínica.

## 22. DEFINIÇÃO DE SUCESSO DA PRÓXIMA VERSÃO

A próxima versão do HTML deve permitir que Milena e as atendentes respondam, sem navegar por várias telas:

- O que o paciente acabou de dizer?
- O que eu já sei e não devo perguntar de novo?
- Qual é a provável barreira?
- Qual pergunta é mais útil agora?
- O que posso responder com segurança?
- O que não posso responder?
- Qual deve ser a próxima ação?
- O que preciso registrar?
- Quais pacientes precisam de ação hoje?
- Quais tarefas estão quebrando o processo?
- O que melhorou desde a última importação?
- Onde estamos perdendo pacientes?
- O que cada atendente precisa treinar?

## 23. REGRA DE EVOLUÇÃO DA BASE

Esta base deve ser versionada. Toda nova exportação do RD, conversa real validada, objeção nova, template aprovado, regra comercial confirmada ou aprendizado de conversão deve atualizar a base sem apagar o histórico anterior.

**Fonte de verdade futura:** evidência real da Ultra > regra aprovada > hipótese/inferência.

Itens ainda pendentes de dados reais devem aparecer como **PENDENTE / A VALIDAR**, nunca como fato.
