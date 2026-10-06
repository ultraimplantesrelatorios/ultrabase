const KEY='ultra-base-v5.1-session-memory';

const EMPTY={
  version:2,
  subject:{patient:'',relationship:'',speakerRole:'',patientRole:''},
  observedFacts:[],
  inferredFacts:[],
  unknowns:[],
  motivations:[],
  barriers:[],
  suggestedQuestions:[],
  askedQuestions:[],
  suggestedAnswers:[],
  sentAnswers:[],
  suggestedActions:[],
  confirmedActions:[],
  commitments:[],
  clinicalFlags:[],
  currentState:null,
  turns:[]
};

function clone(v){return JSON.parse(JSON.stringify(v));}
function getStore(){
  if(typeof sessionStorage!=='undefined') return sessionStorage;
  if(!globalThis.__ULTRA_MEMORY_STORE){
    const m=new Map();
    globalThis.__ULTRA_MEMORY_STORE={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};
  }
  return globalThis.__ULTRA_MEMORY_STORE;
}
function uniq(items=[]){return [...new Set(items.filter(Boolean))];}
function normMemory(raw={}){
  // Backward compatibility with v5 memory keys.
  const m={...clone(EMPTY),...(raw||{})};
  m.subject={...clone(EMPTY.subject),...(raw.subject||{})};
  if(raw.patient&&!m.subject.patient)m.subject.patient=raw.patient;
  if(raw.relationship&&!m.subject.relationship)m.subject.relationship=raw.relationship;
  if(raw.known_facts?.length&&!m.observedFacts.length)m.observedFacts=[...raw.known_facts];
  if(raw.asked_questions?.length&&!m.askedQuestions.length)m.askedQuestions=[...raw.asked_questions];
  if(raw.motivation&&!m.motivations.length)m.motivations=[raw.motivation];
  if(raw.barrier&&!m.barriers.length)m.barriers=[raw.barrier];
  return m;
}
export function emptyMemory(){return clone(EMPTY);}
export function loadMemory(){
  try{return normMemory(JSON.parse(getStore().getItem(KEY)||'{}'));}
  catch{return emptyMemory();}
}
export function saveMemory(memory){
  const m=normMemory(memory);
  getStore().setItem(KEY,JSON.stringify(m));
  return m;
}
export function clearMemory(){getStore().removeItem(KEY);return emptyMemory();}

function turnId(role){return `${role}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;}

// PATIENT MESSAGE = observed event. This is the only automatic operational update.
export function observePatientTurn(memory,analysis){
  const m=normMemory(memory);
  const c=analysis.context||{};
  if(c.relationship){
    m.subject.relationship=c.relationship;
    m.subject.patient=c.patient_role||c.relationship;
    m.subject.speakerRole=c.speaker_role||'familiar_ou_terceiro';
    m.subject.patientRole=c.patient_role||'';
  }
  m.observedFacts=uniq([...m.observedFacts,...(c.facts||[])]).slice(-40);
  m.inferredFacts=uniq([...m.inferredFacts,...(c.inferences||[])]).slice(-30);
  m.unknowns=uniq([...(c.unknowns||[]),...m.unknowns]).slice(0,30);
  if(c.motivation)m.motivations=uniq([...m.motivations,c.motivation]).slice(-12);
  if(c.barrier)m.barriers=uniq([...m.barriers,c.barrier]).slice(-12);
  if(analysis.safety?.length)m.clinicalFlags=uniq([...m.clinicalFlags,...analysis.safety]).slice(-15);
  if(c.commitment){m.commitments.push({...c.commitment,text:analysis.raw||'',timestamp:new Date().toISOString()});m.commitments=m.commitments.slice(-20);}
  m.currentState=analysis.state||m.currentState;
  m.turns.push({id:turnId('patient'),role:'patient',text:analysis.raw||'',timestamp:new Date().toISOString(),extractedFacts:[...(c.facts||[])],inferredSignals:[...(c.inferences||[])]});
  m.turns=m.turns.slice(-80);
  return saveMemory(m);
}

// Suggestions are advisory only; they never become asked/sent/confirmed facts automatically.
export function recordSuggestions(memory,analysis){
  const m=normMemory(memory);
  if(analysis.question)m.suggestedQuestions=uniq([...m.suggestedQuestions,analysis.question]).slice(-20);
  if(analysis.answer)m.suggestedAnswers=uniq([...m.suggestedAnswers,analysis.answer]).slice(-20);
  if(analysis.action)m.suggestedActions=uniq([...m.suggestedActions,analysis.action]).slice(-20);
  return saveMemory(m);
}

export function confirmQuestionSent(memory,text){
  const value=String(text||'').trim(); if(!value)return normMemory(memory);
  const m=normMemory(memory);
  m.askedQuestions=uniq([...m.askedQuestions,value]).slice(-30);
  m.turns.push({id:turnId('attendant'),role:'attendant',kind:'question',text:value,timestamp:new Date().toISOString(),confirmed:true});
  m.turns=m.turns.slice(-80);
  return saveMemory(m);
}
export function confirmAnswerSent(memory,text){
  const value=String(text||'').trim(); if(!value)return normMemory(memory);
  const m=normMemory(memory);
  m.sentAnswers=uniq([...m.sentAnswers,value]).slice(-30);
  m.turns.push({id:turnId('attendant'),role:'attendant',kind:'answer',text:value,timestamp:new Date().toISOString(),confirmed:true});
  m.turns=m.turns.slice(-80);
  return saveMemory(m);
}
export function confirmAction(memory,action,details=''){
  const value=String(action||'').trim(); if(!value)return normMemory(memory);
  const m=normMemory(memory);
  m.confirmedActions.push({action:value,details:String(details||'').trim(),timestamp:new Date().toISOString()});
  m.confirmedActions=m.confirmedActions.slice(-30);
  return saveMemory(m);
}
export function addCommitment(memory,commitment){
  const m=normMemory(memory);
  m.commitments.push({...commitment,status:commitment.status||'pending',timestamp:commitment.timestamp||new Date().toISOString()});
  m.commitments=m.commitments.slice(-20);
  return saveMemory(m);
}

export function memorySummary(memory){
  const m=normMemory(memory);
  return {
    facts:m.observedFacts,
    inferences:m.inferredFacts,
    unknowns:m.unknowns,
    motivations:m.motivations,
    barriers:m.barriers,
    commitments:m.commitments,
    askedQuestions:m.askedQuestions,
    sentAnswers:m.sentAnswers,
    confirmedActions:m.confirmedActions,
    turns:m.turns,
    subject:m.subject,
    currentState:m.currentState
  };
}
