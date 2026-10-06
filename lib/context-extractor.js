import {normalize, includesAny} from './normalizer.js';

const RELATIONS=[
  ['mae',['minha mae','mae dele','mae dela']],['pai',['meu pai','pai dele','pai dela']],
  ['tio',['meu tio','tio dele','tio dela']],['tia',['minha tia','tia dele','tia dela']],
  ['avo',['minha avo','meu avo','avo dele','avo dela']],['esposa',['minha esposa']],['marido',['meu marido']],
  ['filha',['minha filha']],['filho',['meu filho']],['irma',['minha irma']],['irmao',['meu irmao']],
  ['amigo',['meu amigo','minha amiga']],['familiar',['meu familiar','minha familiar','familia']]
];

const DENTAL_ACTIONS=['implante','dente','dentadura','protese','protocolo','avaliacao','tratamento','cirurgia','mastigar','sorrir','osso','clareamento','faceta'];
const URGENCY=['sangrando muito','sangramento intenso','sangramento forte','falta de ar','desmaio','inchaco aumentando','inchaço aumentando','reacao alergica','reação alérgica','dor insuportavel','febre alta'];

function relationOf(n){
  for(const [relation,patterns] of RELATIONS){if(patterns.some(p=>n.includes(normalize(p)))) return relation;}
  return null;
}

function declaredNeed(n){
  if(/\b(colocar|por|botar|substituir) (um )?dente\b/.test(n)) return 'substituir/colocar um dente';
  if(/\b(perdi|perdeu|falta|faltando) (um )?dente\b/.test(n)) return 'ausência/perda de um dente relatada';
  if(/\b(perdi|perdeu|faltam|faltando) (varios|muitos|alguns) dentes\b/.test(n)) return 'ausência de vários dentes relatada';
  if(includesAny(n,['dentadura','protese removivel','chapa'])) return 'uso de prótese removível';
  if(includesAny(n,['implante','pino','parafuso'])) return 'interesse/dúvida sobre implante';
  if(includesAny(n,['faceta','lente'])) return 'interesse/dúvida sobre facetas';
  if(includesAny(n,['clareamento'])) return 'interesse/dúvida sobre clareamento';
  return '';
}

function motivation(n){
  const map=[
    ['mastigar melhor',['voltar a comer','comer melhor','mastigar melhor','nao consigo mastigar']],
    ['sorrir com segurança',['voltar a sorrir','vergonha de sorrir','sorrir melhor']],
    ['resolver logo',['quero resolver','quero fazer esse ano','cansei disso']],
    ['ter dentes fixos',['dente fixo','dentadura fixa','nao quero dentadura']]
  ];
  for(const [m,terms] of map){if(includesAny(n,terms))return m;} return '';
}

function barrier(n){
  const map=[
    ['medo',['medo','pavor','receio','trauma','anestesia']],
    ['preço',['achei caro','muito caro','sem dinheiro','fora do orcamento']],
    ['família',['falar com minha','conversar com minha','conversar com meu']],
    ['logística',['minha filha que me leva','dependo de','transporte','acompanhante','horario dificil']],
    ['pouco osso',['nao tenho osso','sem osso','pouco osso','perda ossea']],
    ['tempo',['sem tempo','nao consigo ir','trabalho o dia todo']]
  ];
  for(const [m,terms] of map){if(includesAny(n,terms))return m;} return '';
}


function ageSignal(n){
  const m=n.match(/\b(?:tenho|tem|com)\s+(\d{2,3})\s+anos\b/);
  return m?Number(m[1]):null;
}
function explicitSignals(n){
  const out=[];
  const age=ageSignal(n); if(age)out.push(`Idade declarada: ${age} anos.`);
  if(includesAny(n,['nao tenho osso','sem osso','pouco osso','perda ossea']))out.push('Relato de pouca disponibilidade óssea.');
  if(includesAny(n,['medo','pavor','receio','trauma']))out.push('Medo/receio declarado.');
  if(includesAny(n,['dentadura','protese removivel','chapa']))out.push('Uso de prótese removível mencionado.');
  if(includesAny(n,['diabetes','diabeti','diabetico','diabetica']))out.push('Diabetes mencionado pelo paciente/familiar.');
  if(includesAny(n,['marevan','varfarina','anticoagulante']))out.push('Uso de anticoagulante/medicação relacionada mencionado.');
  if(includesAny(n,['quanto custa','qual valor','quanto fica','quanto sai','preco']))out.push('Paciente perguntou sobre preço/valor.');
  return out;
}
function commitmentSignal(n){
  if(/\b(me chama|me ligue|liga pra mim|fala comigo|retorna|retorne)\b/.test(n)){
    return {source:'patient',type:'follow_up',raw:n,status:'pending'};
  }
  return null;
}

function isSocialOutOfScope(n){
  const patterns=[/^quero um amigo\b/,/^quero uma amiga\b/,/arrumar um amigo/,/procurando um amigo/,/quero amigo banguelo/];
  return patterns.some(r=>r.test(n));
}

export function extractContext(text=''){
  const n=normalize(text);
  const relation=relationOf(n);
  const hasDental=DENTAL_ACTIONS.some(t=>n.includes(normalize(t)));
  const socialOutOfScope=isSocialOutOfScope(n);
  const urgency=includesAny(n,URGENCY);
  const facts=[];
  const need=declaredNeed(n);
  if(relation)facts.push(`A pessoa está falando sobre ${relation === 'avo' ? 'um(a) avô/avó' : relation}.`);
  if(need)facts.push(`Necessidade declarada: ${need}.`);
  facts.push(...explicitSignals(n));
  const context={
    original:text,
    normalized:n,
    speaker_role: relation ? 'familiar_ou_terceiro' : 'possivel_paciente',
    patient_role: relation || 'proprio_ou_nao_definido',
    relationship: relation || '',
    subject_confidence: relation ? 'alta' : 'media',
    facts,
    inferences:[],
    unknowns:[],
    declared_need:need,
    motivation:motivation(n),
    barrier:barrier(n),
    readiness: includesAny(n,['quero marcar','quero agendar','tem horario','qual dia tem','posso ir amanha']) ? 'alta' : '',
    urgency,
    social_out_of_scope:socialOutOfScope,
    has_dental_signal:hasDental,
    commitment:commitmentSignal(n)
  };
  if(need==='substituir/colocar um dente') context.unknowns.push('Ainda não sabemos se o dente já foi perdido nem qual tratamento foi indicado.');
  if(relation && !hasDental) context.unknowns.push('Ainda não está claro se a mensagem é sobre atendimento odontológico.');
  return context;
}
