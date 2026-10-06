import {normalize,includesAny,similarity} from './normalizer.js';
import {extractContext} from './context-extractor.js';
import {routeIntent} from './intent-router.js';
import {nextBestAction} from './next-best-action.js';
import {preSendCheck} from './pre-send.js';
import {ULTRA_FACTS} from '../data/ultra-facts.js';
import {FAQ} from '../data/knowledge.js';

const RELATION_LABEL={mae:'sua mãe',pai:'seu pai',tio:'seu tio',tia:'sua tia',avo:'seu familiar',esposa:'sua esposa',marido:'seu marido',filha:'sua filha',filho:'seu filho',irma:'sua irmã',irmao:'seu irmão',amigo:'seu amigo',familiar:'seu familiar'};

function firstName(name=''){return String(name).trim().split(/\s+/)[0]||'';}
function greeting(name=''){const f=firstName(name);return f?`${f}, `:'';}
function subject(context){return context.relationship?RELATION_LABEL[context.relationship]||'seu familiar':'você';}
function factByIntent(id){
  const map={ADDRESS:'address',HOURS:'hours',WHATSAPP:'whatsapp',EMAIL:'email',INSURANCE:'insurance',PAYMENT:'payment',PARKING:'parking',ACCESSIBILITY:'accessibility',TREATMENTS:'treatments'};
  return ULTRA_FACTS.find(f=>f.id===map[id]);
}
function faqMatch(text){return FAQ.map(f=>({...f,score:f.keywords.reduce((s,k)=>s+(includesAny(text,[k])?4:0),0)+similarity(text,f.title)})).sort((a,b)=>b.score-a.score)[0];}

function buildResponse(intent,context,text,name,memory={}){
  const g=greeting(name), who=subject(context), n=normalize(text);
  const direct=factByIntent(intent.id);
  if(direct){
    return {answer:direct.answer,question:'',action:'RESPONDER',register:'Não exige tarefa apenas por esta pergunta.',state:'INFORMACAO',source:direct.source,safety:direct.status==='PENDENTE'||direct.status==='A_VALIDAR'?['Informação ainda precisa de validação interna.']:[]};
  }
  switch(intent.id){
    case 'URGENT': return {answer:`${g}esse relato precisa de atenção clínica agora. Entre em contato direto com a equipe responsável. Se houver falta de ar, sangramento intenso, desmaio, reação importante ou piora rápida, procure atendimento de urgência.`,question:'',action:'ESCALAR_CLINICO',register:'Registrar o relato e o encaminhamento realizado.',state:'ATENCAO_CLINICA',source:'Método ULTRA / guardrail clínico',safety:['Modo comercial desligado. Não diagnosticar nem prescrever.']};
    case 'SCHEDULE': return {answer:`${g}claro. Posso te ajudar com o próximo passo.`,question:'Você prefere verificar opções pela manhã ou à tarde?',action:'AGENDAR',register:'Registrar intenção de agendamento e preferência de período.',state:'PRONTO_PARA_AGENDAR',source:'Método ULTRA'};
    case 'RESCHEDULE': return {answer:`${g}sem problema. Vamos procurar uma opção que funcione melhor para a sua rotina.`,question:'Prefere outro dia ou apenas outro período?',action:'REMARCAR',register:'Registrar motivo quando relevante e nova opção combinada.',state:'AGENDADO',source:'Método ULTRA'};
    case 'NO_SHOW': return {answer:`${g}vi que a avaliação não conseguiu acontecer. Quero primeiro entender se houve algum imprevisto.`,question:'Está tudo bem por aí?',action:'FOLLOW_UP',register:'Registrar motivo da falta e próximo passo.',state:'BLOQUEADO',source:'Método ULTRA'};
    case 'PRICE_BLOCK': return {answer:`${g}entendo. O valor é uma parte importante da decisão, mas eu não quero assumir que foi o único ponto que te travou.`,question:'O investimento foi o principal motivo ou ficou alguma outra dúvida importante?',action:'QUALIFICAR',register:'Registrar a objeção real, sem presumir que preço é a única barreira.',state:'BLOQUEADO',source:'Método ULTRA'};
    case 'PRICE': return {answer:`${g}o valor depende do que realmente precisa ser feito, e eu não quero te passar uma referência que não tenha relação com a situação.`,question: context.declared_need ? 'Além do valor, existe alguma dúvida importante sobre o próximo passo?' : 'Estamos falando de um dente, alguns dentes ou uma reabilitação maior?',action:'QUALIFICAR',register:'Registrar que preço apareceu como tema e a necessidade considerada.',state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'FEAR': return {answer:`${g}é importante você me contar isso. Em vez de minimizar o medo, o mais útil é entender exatamente o que está deixando ${context.relationship?who:'você'} inseguro(a).`,question:`O que mais preocupa ${context.relationship?who:'você'}: dor, anestesia, a cirurgia ou alguma experiência anterior?`,action:'QUALIFICAR',register:'Registrar o medo específico e o que ajudaria a pessoa a se sentir mais segura.',state:'BLOQUEADO',source:'Método ULTRA'};
    case 'BONE': return {answer:`${g}receber a informação de que “não tem osso” costuma gerar muita dúvida. Existem diferentes possibilidades, mas a solução não deve ser definida por mensagem.`,question:`${context.relationship?`${who.charAt(0).toUpperCase()+who.slice(1)} chegou`:'Você chegou'} a fazer tomografia ou outro exame recentemente?`,action:'QUALIFICAR',register:'Registrar o relato de pouca disponibilidade óssea e a existência/data de exames.',state:'CONSIDERANDO',source:'Método ULTRA',safety:['Não indicar enxerto, zigomático ou outro tratamento sem avaliação.']};
    case 'THINK': return {answer:`${g}tudo bem. Não quero transformar isso em pressão.`,question: n.includes('me chama')?'':'Se fizer sentido, ficou alguma questão específica que eu possa esclarecer sem falar de agendamento agora?',action:n.includes('me chama')?'RETORNAR':'RESPONDER',register:n.includes('me chama')?'Registrar a data/período combinado para retorno.':'Registrar que a pessoa não quer agendar agora, se isso for relevante para a continuidade.',state:'ADIANDO',source:'Método ULTRA'};
    case 'LOGISTICS': return {answer:`${g}entendi. Isso parece ser uma questão prática de organização, não necessariamente falta de interesse.`,question:'Qual ponto está dificultando mais agora: horário, transporte ou acompanhante?',action:'QUALIFICAR',register:'Registrar a barreira prática e usar essa informação no próximo agendamento.',state:'BLOQUEADO',source:'Método ULTRA'};
    case 'COMPARISON': return {answer:`${g}faz sentido comparar antes de uma decisão importante. O melhor é comparar critérios concretos, sem desqualificar outra clínica.`,question:'O que está pesando mais nessa comparação: valor, estrutura, confiança, prazo ou proposta de tratamento?',action:'QUALIFICAR',register:'Registrar o critério real de comparação.',state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'POST_EVAL': return {answer:`${g}depois da avaliação podem surgir dúvidas novas, e eu posso ajudar a organizar isso sem alterar a proposta clínica.`,question:'Sua dúvida agora é sobre o plano apresentado, investimento, organização para começar ou algum ponto clínico?',action:'QUALIFICAR',register:'Registrar dúvida/barreira e próximo contato.',state:'POS_AVALIACAO',source:'Método ULTRA'};
    case 'REHABILITATION': return {answer:`${g}entendi${context.relationship?`, é sobre ${who}`:''}. A ideia de ter dentes fixos pode envolver caminhos diferentes, e não é seguro assumir o tratamento antes da avaliação.`,question:`O que mais importa para ${context.relationship?who:'você'} nessa busca: mastigar melhor, ter mais segurança com a prótese ou outra questão?`,action:'QUALIFICAR',register:`${context.relationship?`Registrar que ${who} é o paciente. `:''}Registrar interesse em reabilitação/dentes fixos e principal objetivo.`,state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'PROSTHESIS': return {answer:`${g}entendi${context.relationship?`, é sobre ${who}`:''}. Como já existe uso de prótese, o mais útil é entender o que realmente pesa na rotina.`,question:`O que mais incomoda ${context.relationship?who:'você'} hoje: mastigação, movimento, conforto, segurança ou aparência?`,action:'QUALIFICAR',register:'Registrar principal incômodo e objetivo pessoal.',state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'ONE_TOOTH': return {answer:`${g}entendi${context.relationship?`, é sobre ${who}`:''}. Para orientar sem assumir um tratamento antes da avaliação, vale entender o contexto dessa perda.`,question:`Faz quanto tempo que ${context.relationship?who:'você'} está sem esse dente?`,action:'QUALIFICAR',register:'Registrar tempo aproximado e principal impacto.',state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'TOOTH_REPLACEMENT': return {answer:`${g}entendi${context.relationship?`, é para ${who}`:''}. Você mencionou a necessidade de colocar ou substituir um dente, mas ainda não dá para assumir qual tratamento é o indicado.`,question:`Você sabe se ${context.relationship?who:'esse dente'} já está sem o dente ou se algum dentista já orientou que ele precisa ser substituído?`.replace('se esse dente já está sem o dente','se esse dente já foi perdido'),action:'QUALIFICAR',register:`${context.relationship?`Registrar que ${who} é o paciente. `:''}Registrar necessidade inicial de substituir/colocar um dente e evitar assumir indicação.`,state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'MANY_TEETH': return {answer:`${g}entendi${context.relationship?`, é sobre ${who}`:''}. Quando faltam vários dentes, a situação atual e o impacto na rotina ajudam a organizar o próximo passo.`,question:`${context.relationship?`${who.charAt(0).toUpperCase()+who.slice(1)} usa`:'Você usa'} alguma prótese hoje ou está sem esses dentes?`,action:'QUALIFICAR',register:'Registrar situação funcional e objetivo principal.',state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'CLINICAL': {
      const f=faqMatch(text);
      return {answer:f?.answer||`${g}posso explicar o que normalmente é avaliado, mas uma decisão individual depende do cirurgião-dentista.`,question:f?.limit?'Se quiser, posso te explicar qual costuma ser o próximo passo para avaliar isso com segurança.':'',action:'ESCALAR_SE_NECESSARIO',register:'Registrar a dúvida clínica quando ela influenciar a continuidade do atendimento.',state:'CONSIDERANDO',source:'Base clínica ULTRA',safety:f?.limit?['Não transformar informação geral em autorização ou contraindicação individual.']:[]};
    }
    case 'FAMILY': return {answer:`${g}entendi, você está buscando orientação para ${who}.`,question:'O que está acontecendo com essa pessoa hoje e o que vocês gostariam de entender primeiro?',action:'QUALIFICAR',register:`Registrar que ${who} é o paciente e quem participa da decisão.`,state:'CONSIDERANDO',source:'Método ULTRA'};
    case 'OUT_OF_SCOPE': return {answer:'Se a sua dúvida for sobre atendimento da Ultra ou sobre odontologia, posso te ajudar por aqui.',question:'',action:'PEDIR_CONTEXTO',register:'Nenhum registro necessário.',state:'FORA_DE_ESCOPO',source:'Método ULTRA'};
    case 'AMBIGUOUS': return {answer:'Não consegui entender com segurança qual é a sua dúvida odontológica.',question:'Pode me explicar em uma frase o que você gostaria de resolver?',action:'PEDIR_CONTEXTO',register:'Não registrar hipótese como fato.',state:'PRECISA_CONTEXTO',source:'Método ULTRA'};
    case 'HELLO': return {answer:`${g}oi! Seja bem-vindo(a) à Ultra.`,question:'O que fez você procurar a gente hoje?',action:'QUALIFICAR',register:'Registrar interesse assim que ficar claro.',state:'EXPLORANDO',source:'Método ULTRA'};
    default: return {answer:'Quero te orientar sem adivinhar a situação.',question:'Pode me explicar um pouco melhor o que você precisa resolver?',action:'PEDIR_CONTEXTO',register:'Não registrar hipótese como fato.',state:'PRECISA_CONTEXTO',source:'Método ULTRA'};
  }
}

function inferKnown(context,memory){
  return [...new Set([...(memory?.observedFacts||memory?.known_facts||[]),...(context.facts||[])])];
}

function applyConfirmedContext(context,memory={}){
  const subject=memory?.subject||{};
  const facts=memory?.observedFacts||memory?.known_facts||[];
  if(!context.relationship && subject.relationship){
    context.relationship=subject.relationship;
    context.patient_role=subject.patientRole||subject.patient||subject.relationship;
    context.speaker_role=subject.speakerRole||'familiar_ou_terceiro';
    context.subject_confidence='alta';
    context.facts=[...new Set([...(context.facts||[]),`Contexto confirmado da conversa: paciente é ${context.patient_role}.`])];
  }
  if(!context.declared_need){
    const joined=facts.join(' ').toLowerCase();
    if(joined.includes('prótese removível')||joined.includes('dentadura')) context.prior_need='uso de prótese removível';
    else if(joined.includes('pouca disponibilidade óssea')) context.prior_need='pouco osso';
    else if(joined.includes('substituir/colocar um dente')) context.prior_need='substituir/colocar um dente';
    else if(joined.includes('ausência/perda de um dente')) context.prior_need='ausência/perda de um dente';
    if(context.prior_need) context.has_dental_signal=true;
  }
  return context;
}

function avoidRepeatedSuggestion(response,memory={}){
  const asked=memory?.askedQuestions||memory?.asked_questions||[];
  if(response.question && asked.some(q=>String(q).trim().toLowerCase()===String(response.question).trim().toLowerCase())){
    response.question='';
    response.action=response.action==='QUALIFICAR'?'RESPONDER':response.action;
    response.safety=[...(response.safety||[]),'A pergunta sugerida já foi confirmada como enviada nesta conversa; não repetir sem necessidade.'];
  }
  return response;
}

export function analyze(text,{name='',agent='',memory={}}={}){
  const context=applyConfirmedContext(extractContext(text),memory);
  const intent=routeIntent(text,context);
  const response=avoidRepeatedSuggestion(buildResponse(intent,context,text,name,memory),memory);
  const action=nextBestAction(intent,context);
  const payload={...response,action:response.action||action,context,intent};
  const check=preSendCheck(payload);
  if(!check.ok){
    // Safety fallback: prefer uncertainty over an unsafe or incoherent answer.
    payload.answer='Quero te orientar sem assumir algo que você não disse.';
    payload.question=context.relationship?'Pode me contar o que está acontecendo com essa pessoa hoje?':'Pode me explicar em uma frase o que você gostaria de resolver?';
    payload.action='PEDIR_CONTEXTO';
    payload.register='Não registrar hipótese como fato.';
    payload.state='PRECISA_CONTEXTO';
    payload.safety=[...(payload.safety||[]),...check.issues];
  }
  const known=inferKnown(context,memory);
  return {
    id:`analysis-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    createdAt:new Date().toISOString(),
    raw:text,
    agent,
    patientName:name,
    intent:intent.id,
    intentLabel:intent.label,
    secondaryIntents:intent.secondary||[],
    confidence:intent.confidence||'MEDIUM',
    state:payload.state||'CONSIDERANDO',
    answer:payload.answer,
    question:payload.question||'',
    action:payload.action,
    register:payload.register||'',
    source:payload.source||'Método ULTRA',
    safety:payload.safety||[],
    known,
    unknowns:context.unknowns||[],
    motivation:context.motivation||(memory?.motivations||[]).at(-1)||memory?.motivation||'',
    barrier:context.barrier||(memory?.barriers||[]).at(-1)||memory?.barrier||'',
    context,
    checks:{preSend:check}
  };
}

export {routeIntent,extractContext};
