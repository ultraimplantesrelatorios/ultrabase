export function nextBestAction(intent,context){
  if(intent.id==='URGENT')return 'ESCALAR_CLINICO';
  if(['ADDRESS','HOURS','WHATSAPP','EMAIL','INSURANCE','PAYMENT','PARKING','ACCESSIBILITY','TREATMENTS'].includes(intent.id))return 'RESPONDER';
  if(intent.id==='SCHEDULE')return 'AGENDAR';
  if(intent.id==='RESCHEDULE')return 'REMARCAR';
  if(intent.id==='NO_SHOW')return 'FOLLOW_UP';
  if(['FEAR','PRICE_BLOCK','BONE','COMPARISON'].includes(intent.id))return 'QUALIFICAR';
  if(intent.id==='THINK')return 'RETORNAR';
  if(['CLINICAL'].includes(intent.id))return 'ESCALAR_SE_NECESSARIO';
  if(['OUT_OF_SCOPE','AMBIGUOUS'].includes(intent.id))return 'PEDIR_CONTEXTO';
  if(context.readiness==='alta')return 'AGENDAR';
  return 'QUALIFICAR';
}
