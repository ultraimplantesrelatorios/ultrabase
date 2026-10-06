# COMANDO MESTRE — CORREÇÃO FUNCIONAL DA ULTRA BASE
## FOCO: LIMPEZA, MEMÓRIA, HISTÓRICO E CONTINUIDADE DA CONVERSA
## NÃO RECOMEÇAR DO ZERO

Você vai corrigir a versão atual da ULTRA BASE preservando toda a arquitetura existente.

NÃO quero redesign completo.
NÃO quero reescrever a aplicação do zero.
NÃO quero perder nenhum recurso já validado.
NÃO quero alterar cenários, respostas, guardrails, RD, gestão ou identidade visual além do necessário para corrigir este problema.

O objetivo é corrigir um erro estrutural de funcionamento:

> A ferramenta não pode confundir:
> 1. texto digitado;
> 2. análise gerada pela IA;
> 3. sugestão de resposta;
> 4. ação realmente realizada pela atendente;
> 5. histórico real da conversa.

A partir desta correção:

# ANÁLISE NÃO É EVENTO.
# SUGESTÃO NÃO É AÇÃO.
# SOMENTE ALGO CONFIRMADO COMO REALMENTE ENVIADO/REALIZADO PODE ALTERAR O HISTÓRICO OPERACIONAL.

==================================================
1. PRIMEIRO: AUDITAR O FUNCIONAMENTO ATUAL
==================================================

Antes de editar:

- abrir todo o projeto atual;
- localizar:
  - conversation-memory;
  - engine;
  - context-extractor;
  - intent-router;
  - next-best-action;
  - pre-send;
  - app.js;
  - função de limpar;
  - função de nova conversa;
  - função que grava asked_questions;
  - função que grava resposta/ação;
- identificar exatamente onde uma sugestão está sendo salva como fato;
- identificar exatamente o que o botão “Limpar” apaga hoje;
- identificar o que sessionStorage/localStorage armazena;
- rodar testes existentes antes da alteração.

NÃO modificar antes de mapear.

==================================================
2. SEPARAR 4 AÇÕES DIFERENTES NA INTERFACE
==================================================

Criar quatro comportamentos distintos:

## A. LIMPAR CAMPO

Botão:
“Limpar campo”

Função:
apagar SOMENTE o conteúdo do campo onde a atendente cola/escreve a mensagem.

NÃO apagar:
- memória;
- histórico;
- paciente;
- análise anterior armazenada;
- fatos;
- compromissos;
- estado;
- contexto.

Exemplo conceitual:

function clearComposer() {
  textarea.value = "";
  textarea.focus();
}

==================================================

## B. NOVA MENSAGEM

Botão:
“Nova mensagem do paciente”

Uso:
continuar a MESMA conversa.

Ao clicar:
- limpar o campo de entrada;
- manter memória;
- manter histórico;
- manter fatos;
- manter barreiras;
- manter motivação;
- manter compromissos;
- manter sujeito;
- manter estado.

A próxima fala deve ser analisada usando todo o contexto já confirmado.

==================================================

## C. CONFIRMAR O QUE FOI REALMENTE FEITO

Adicionar controles como:

“Marcar pergunta como enviada”
“Marcar resposta como enviada”
“Registrar ação realizada”

Uma sugestão da IA NÃO entra automaticamente no histórico.

Só entra quando a atendente confirmar.

Se a atendente editar o texto antes de enviar:
registrar o texto realmente usado.

Estruturar:

suggestedQuestion
sentQuestion

suggestedAnswer
sentAnswer

suggestedAction
confirmedAction

==================================================

## D. NOVA CONVERSA

Botão:
“Nova conversa”

Esse sim deve encerrar o caso atual.

Ao clicar:
- mostrar confirmação;
- limpar memória;
- limpar histórico;
- limpar sujeito;
- limpar fatos;
- limpar inferências;
- limpar compromissos;
- limpar estado;
- limpar campo;
- limpar análise atual.

Mensagem de confirmação:

“Iniciar uma nova conversa?
O contexto atual será encerrado.”

==================================================
3. NÃO REGISTRAR PERGUNTA SUGERIDA COMO PERGUNTA REAL
==================================================

Localizar qualquer lógica equivalente a:

if (analysis.question) {
  asked_questions.push(analysis.question)
}

CORRIGIR.

analysis.question é apenas sugestão.

Ela deve ir para:

suggestedQuestions

Somente após confirmação explícita:

askedQuestions.push(actualSentQuestion)

==================================================
4. NÃO REGISTRAR RESPOSTA SUGERIDA COMO RESPOSTA REAL
==================================================

Aplicar a mesma regra para respostas.

Separar:

suggestedAnswers
sentAnswers

Se a atendente editar a resposta:
guardar a versão editada enviada.

Isso é obrigatório para aprendizado futuro.

==================================================
5. MEMÓRIA V2 — SEPARAR REALIDADE DE INTERPRETAÇÃO
==================================================

Evoluir a memória para esta estrutura conceitual:

conversationMemory = {

  subject: {},

  observedFacts: [],
  inferredFacts: [],
  unknowns: [],

  motivations: [],
  barriers: [],

  suggestedQuestions: [],
  askedQuestions: [],

  suggestedAnswers: [],
  sentAnswers: [],

  suggestedActions: [],
  confirmedActions: [],

  commitments: [],

  clinicalFlags: [],

  currentState: null,

  turns: []
}

==================================================
6. CRIAR HISTÓRICO REAL POR TURNOS
==================================================

Adicionar estrutura:

turns: [
  {
    id: "...",
    role: "patient",
    text: "...",
    timestamp: "...",
    extractedFacts: [],
    inferredSignals: []
  },
  {
    id: "...",
    role: "attendant",
    text: "...",
    timestamp: "...",
    confirmed: true
  }
]

Regra:

Só adicionar turno da atendente quando ela marcar como realmente enviado.

Mensagem do paciente analisada pode entrar como turno observado.

==================================================
7. SEPARAR FATO / INFERÊNCIA / LACUNA
==================================================

Nunca misturar.

Exemplo:

Paciente:
“Tenho medo da cirurgia.”

observedFacts:
- paciente declarou medo de cirurgia

inferredFacts:
- possível barreira emocional

unknowns:
- qual aspecto gera mais medo

Nunca transformar:
“possível barreira”

em fato confirmado.

==================================================
8. PRESERVAR MÚLTIPLAS INFORMAÇÕES NA MESMA FALA
==================================================

Corrigir lógica que reduz a fala inteira a apenas uma intenção principal.

Exemplo:

“Tenho 68 anos, uso dentadura, disseram que não tenho osso, tenho medo e queria voltar a comer carne.”

A análise deve preservar:

idade
prótese
relato de pouco osso
medo
motivação funcional

Mesmo que exista uma intenção principal.

Não descartar sinais secundários.

==================================================
9. NOVA REGRA DE ATUALIZAÇÃO DA MEMÓRIA
==================================================

A memória pode ser atualizada automaticamente apenas com:

- fatos explicitamente ditos pelo paciente;
- dados objetivos observáveis;
- mensagem real recebida.

A memória NÃO pode confirmar automaticamente:

- pergunta sugerida;
- resposta sugerida;
- ação sugerida;
- agendamento;
- envio de conteúdo;
- compromisso;
- reação do paciente.

Esses dependem de confirmação real.

==================================================
10. COMPROMISSOS
==================================================

Se o paciente disser:

“me chama sexta”

isso pode ser registrado como compromisso real.

Estrutura:

commitments: [
  {
    source: "patient",
    type: "follow_up",
    date: "...",
    status: "pending"
  }
]

Se a IA apenas sugerir:
“retornar sexta”

não registrar como compromisso confirmado.

==================================================
11. FLUXO CORRETO APÓS A CORREÇÃO
==================================================

Fluxo esperado:

MENSAGEM DO PACIENTE
→
ANALISAR
→
EXTRAIR FATOS
→
EXTRAIR INFERÊNCIAS
→
EXTRAIR LACUNAS
→
GERAR SUGESTÃO
→
GERAR NEXT BEST ACTION
→
NÃO GRAVAR SUGESTÃO COMO REALIDADE
→
ATENDENTE DECIDE
→
CONFIRMA O QUE ENVIOU/FEZ
→
ATUALIZA HISTÓRICO REAL
→
AGUARDA PRÓXIMA MENSAGEM
→
ANALISA NOVA FALA USANDO APENAS CONTEXTO REAL

==================================================
12. UX DO COPILOTO
==================================================

Organizar a tela para mostrar:

## O QUE O PACIENTE DISSE
texto atual

## O QUE JÁ SABEMOS
somente fatos observados

## HIPÓTESES DA IA
inferências claramente marcadas

## O QUE FALTA SABER
lacunas

## PRÓXIMA MELHOR AÇÃO
uma ação

## RESPOSTA SUGERIDA

Botões:

COPIAR
MARCAR COMO ENVIADA
EDITAR
NOVA MENSAGEM
LIMPAR CAMPO

Separado:

NOVA CONVERSA

==================================================
13. INDICADOR VISUAL DE MEMÓRIA
==================================================

Adicionar uma pequena área:

“Contexto desta conversa”

Mostrar de forma resumida:

- fatos confirmados;
- motivação;
- barreira;
- compromisso;
- perguntas já realizadas.

Não mostrar inferência como fato.

==================================================
14. PROTEÇÃO CONTRA CONTAMINAÇÃO ENTRE PACIENTES
==================================================

Ao clicar “Nova conversa”:

zerar totalmente o contexto da sessão.

Criar teste específico para garantir:

Paciente A:
“uso dentadura”

Nova conversa

Paciente B:
“quero clareamento”

O sistema NÃO pode lembrar da dentadura.

==================================================
15. TESTES OBRIGATÓRIOS
==================================================

Adicionar testes:

### TESTE 1 — Limpar campo

Escrever mensagem.
Clicar limpar campo.

Esperado:
- textarea vazio;
- memória mantida.

### TESTE 2 — Nova mensagem

Paciente:
“uso dentadura”

Depois:
“ela solta quando como”

Esperado:
- segunda fala usa contexto da primeira.

### TESTE 3 — Sugestão não vira fato

IA sugere:
“o que mais preocupa?”

Não clicar em marcar como enviada.

Próxima análise:

Esperado:
a IA NÃO deve considerar que essa pergunta já foi feita.

### TESTE 4 — Pergunta enviada

Marcar pergunta como enviada.

Próxima análise:

Esperado:
não repetir a mesma pergunta sem necessidade.

### TESTE 5 — Resposta editada

IA sugere resposta A.

Atendente edita.

Marcar como enviada.

Esperado:
histórico salva a versão editada.

### TESTE 6 — Nova conversa

Paciente A tem histórico.

Clicar Nova conversa.

Paciente B envia nova mensagem.

Esperado:
zero contexto do paciente A.

### TESTE 7 — Fato x inferência

Paciente:
“quero saber preço.”

Esperado:

fato:
perguntou preço

inferência:
possível barreira financeira

NÃO:
“preço é a objeção principal”

### TESTE 8 — mensagem composta

“Tenho 68 anos, uso dentadura, falaram que não tenho osso e tenho medo.”

Esperado:
todos os sinais preservados.

==================================================
16. NÃO QUEBRAR A V5
==================================================

Todos os testes existentes continuam obrigatórios.

Nenhum teste pode ser apagado.

Nenhum módulo validado pode ser removido.

Não alterar guardrails clínicos.

Não alterar regras éticas.

Não quebrar:
- GitHub Pages;
- CSV;
- Milena;
- Templates RD;
- service worker;
- health;
- deploy.

==================================================
17. REGRA FUNDAMENTAL
==================================================

Adicionar ao código e à documentação:

# ANÁLISE NÃO É EVENTO.
# SUGESTÃO NÃO É AÇÃO.
# SOMENTE AÇÃO CONFIRMADA PODE ALTERAR O HISTÓRICO OPERACIONAL.

==================================================
18. ENTREGA
==================================================

Ao final:

1. entregar projeto corrigido completo;
2. entregar ZIP pronto para GitHub;
3. atualizar changelog;
4. atualizar testes;
5. informar arquivos alterados;
6. informar exatamente qual bug foi corrigido;
7. executar todos os testes.

Se qualquer teste falhar:

DEPLOY BLOQUEADO.

Não mascarar falha.

==================================================
19. DEFINIÇÃO DE SUCESSO
==================================================

A correção estará pronta somente se:

- Limpar campo limpa só o campo;
- Nova mensagem mantém o contexto;
- Nova conversa apaga o contexto;
- sugestão não vira histórico automaticamente;
- pergunta sugerida não vira pergunta feita;
- resposta sugerida não vira resposta enviada;
- texto editado é o texto registrado;
- fatos e inferências ficam separados;
- múltiplos sinais da mensagem são preservados;
- memória usa somente eventos reais;
- contexto de um paciente nunca vaza para outro;
- todos os testes anteriores continuam passando.

NÃO REDESENHE A APLICAÇÃO.
NÃO RECOMECE DO ZERO.
CORRIJA O MOTOR.
PRESERVE O RESTANTE.
TESTE.
ENTREGUE.