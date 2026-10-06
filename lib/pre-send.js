const PROMISES=[/nao vai doer/i,/garantido/i,/100%/i,/vai dar certo/i,/com certeza pode fazer/i,/resultado garantido/i];
export function preSendCheck(payload){
  const issues=[];
  const response=[payload.answer,payload.question].filter(Boolean).join(' ');
  if(!response.trim())issues.push('Resposta vazia.');
  if(PROMISES.some(r=>r.test(response)))issues.push('Possível promessa clínica/comercial.');
  if(response.length>900)issues.push('Resposta longa demais para WhatsApp.');
  if(payload.context?.relationship && /\bvoce perdeu\b/i.test(response))issues.push('Resposta fala com o familiar como se fosse o paciente.');
  if(payload.intent?.id==='TOOTH_REPLACEMENT' && /perdeu esse dente/i.test(response))issues.push('Inferiu perda de dente sem confirmação.');
  return {ok:issues.length===0,issues};
}
