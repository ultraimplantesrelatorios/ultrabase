import {normalize,includesAny} from './normalizer.js';
import {semanticCheck} from './semantic-check.js';

const RULES=[
  ['URGENT','Atenção clínica',['sangrando muito','sangramento intenso','sangramento forte','falta de ar','desmaio','reacao alergica','reação alérgica','dor insuportavel','febre alta'],100],
  ['INSURANCE','Atendimento particular / convênio',['convenio','plano odontologico','aceita unimed','aceita plano','atendem plano','atende plano'],98],
  ['ADDRESS','Endereço',['endereco','onde fica','como chegar','localizacao'],98],
  ['HOURS','Horário de atendimento',['abre sabado','funciona sabado','que horas abre','que horas fecha','qual horario de funcionamento','horario de funcionamento','domingo'],98],
  ['WHATSAPP','Contato da clínica',['whatsapp','telefone','numero de contato','contato da clinica'],96],
  ['EMAIL','E-mail da clínica',['email','e mail'],96],
  ['PAYMENT','Formas de pagamento',['forma de pagamento','formas de pagamento','parcelamento','parcela','cartao','pix','entrada'],95],
  ['PARKING','Estacionamento',['estacionamento','estacionar'],95],
  ['ACCESSIBILITY','Acessibilidade',['acessibilidade','cadeirante','elevador'],95],
  ['TREATMENTS','Tratamentos da clínica',['quais tratamentos','que tratamentos','faz implante','faz protocolo','faz clareamento','faz faceta'],94],
  ['SCHEDULE','Pronto para agendar',['quero marcar','quero agendar','tem horario','marcar avaliacao','qual dia tem','posso ir amanha','como faco para marcar'],95],
  ['RESCHEDULE','Reagendamento',['remarcar','mudar horario','outra data','cancelar consulta','reagendar'],94],
  ['NO_SHOW','Recuperação de falta',['faltei','nao fui','perdi a consulta','nao consegui ir na consulta'],93],
  ['PRICE_BLOCK','Objeção de preço',['achei caro','muito caro','fora do meu orcamento','nao tenho dinheiro'],90],
  ['PRICE','Pergunta de preço',['quanto custa','qual valor','quanto fica','quanto sai','preco'],88],
  ['FEAR','Medo / insegurança',['medo','pavor','receio','anestesia','trauma','cirurgia horrivel'],87],
  ['BONE','Pouco osso',['nao tenho osso','sem osso','pouco osso','perda ossea','zigomatico'],86],
  ['POST_EVAL','Pós-avaliação',['ja passei na avaliacao','fiz avaliacao','orcamento que recebi','plano que recebi'],85],
  ['THINK','Adiamento',['vou pensar','quero pensar','agora nao','mais pra frente','me chama mes que vem','me chama ano que vem','nao quero marcar','nao quero agendar','so quero saber'],83],
  ['LOGISTICS','Barreira prática',['minha filha que me leva','dependo da minha filha','dependo do meu filho','transporte','acompanhante','horario dificil'],84],
  ['COMPARISON','Comparação',['outra clinica','mais barato','outro orcamento','concorrente'],82],
  ['REHABILITATION','Reabilitação / dentes fixos',['dente fixo','dentes fixos','dentadura fixa','reabilitacao'],81],
  ['PROSTHESIS','Prótese / dentadura',['dentadura','protese removivel','chapa','protocolo'],80],
  ['MANY_TEETH','Vários dentes ausentes',['perdi varios dentes','faltam varios dentes','perdi muitos dentes','faltam muitos dentes'],80],
  ['ONE_TOOTH','Um dente ausente',['perdi um dente','falta um dente','to sem um dente','estou sem um dente'],79],
  ['TOOTH_REPLACEMENT','Substituição de um dente',['colocar um dente','botar um dente','por um dente','substituir um dente','precisa colocar um dente'],79],
  ['CLINICAL','Dúvida clínica',['posso fazer','isso e normal','tenho diabetes','marevan','anticoagulante','implante doi','faceta','clareamento','carga imediata','rejeita','rejeicao'],76],
  ['HELLO','Primeiro contato',['oi','ola','bom dia','boa tarde','boa noite'],50]
];

function exactOrContains(n,terms){return terms.some(t=>{const x=normalize(t);return n===x||n.includes(x)});}

export function routeIntent(text,context={}){
  const n=normalize(text);
  if(context.social_out_of_scope) return {id:'OUT_OF_SCOPE',label:'Fora do escopo de atendimento',confidence:'LOW',secondary:[],reason:'A frase não apresenta uma solicitação odontológica coerente.'};
  if(includesAny(n,['nao quero marcar','nao quero agendar','so quero saber'])) return {id:'THINK',label:'Não quer agendar agora',confidence:'HIGH',secondary:[],reason:'Há uma negativa explícita de agendamento; respeitar e não pressionar.'};

  const matches=RULES.filter(([, ,terms])=>exactOrContains(n,terms)).map(([id,label,terms,weight])=>({id,label,weight,terms})).sort((a,b)=>b.weight-a.weight);
  let primary=matches[0]||null;

  if(!primary){
    if(context.prior_need==='uso de prótese removível') primary={id:'PROSTHESIS',label:'Prótese / dentadura',weight:72};
    else if(context.prior_need==='pouco osso') primary={id:'BONE',label:'Pouco osso',weight:72};
    else if(context.prior_need==='substituir/colocar um dente') primary={id:'TOOTH_REPLACEMENT',label:'Substituição de um dente',weight:72};
    else if(context.prior_need==='ausência/perda de um dente') primary={id:'ONE_TOOTH',label:'Um dente ausente',weight:72};
    else if(context.relationship && context.has_dental_signal) primary={id:'FAMILY',label:'Familiar buscando orientação',weight:70};
    else if(context.has_dental_signal) primary={id:'AMBIGUOUS',label:'Precisa de mais contexto',weight:20};
    else return {id:'OUT_OF_SCOPE',label:'Fora do escopo ou sem contexto',confidence:'LOW',secondary:[],reason:'Não há sinal suficiente de intenção odontológica.'};
  }

  const secondary=[];
  if(context.relationship && primary.id!=='FAMILY') secondary.push({id:'FAMILY',label:'Familiar/terceiro'});
  if(context.barrier==='medo' && primary.id!=='FEAR') secondary.push({id:'FEAR',label:'Medo/insegurança'});
  if(context.barrier==='preço' && !['PRICE','PRICE_BLOCK'].includes(primary.id)) secondary.push({id:'PRICE_BLOCK',label:'Preço'});

  const sem=semanticCheck(text,primary,context);
  const confidence=sem.level;
  if(confidence==='LOW' && !['URGENT','INSURANCE','ADDRESS','HOURS','WHATSAPP'].includes(primary.id)){
    return {id:'AMBIGUOUS',label:'Precisa de mais contexto',confidence:'LOW',secondary,reason:sem.reason};
  }
  return {...primary,confidence,secondary,reason:sem.reason};
}
