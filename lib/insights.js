import {analyze} from './engine.js';
import {normalize} from './normalizer.js';
export function analyzeConversationRows(rows,mapping){return rows.map((r,i)=>{const text=r[mapping.message]||'';const role=normalize(r[mapping.author]||'');const agent=r[mapping.agent]||'Não identificado';const a=analyze(text,{agent});return {id:`m_${Date.now()}_${i}`,text,agent,role,date:r[mapping.date]||'',analysis:a}}).filter(x=>x.text)}
function isAgent(x){return /atendente|agent|operador|operator|equipe|team|outbound|sent|enviado/.test(x.role||'')}
function countBy(arr,key){return arr.reduce((m,x)=>{const v=key(x)||'Não identificado';m[v]=(m[v]||0)+1;return m},{})}
function top(o,n=6){return Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([label,value])=>({label,value}))}
function normalizedPhrase(t=''){return normalize(t).replace(/\b\d+\b/g,'#').trim()}
export function summarize(items=[]){
 const intents=top(countBy(items,x=>x.analysis.intentLabel));
 const withAgent=items.filter(x=>x.agent&&x.agent!=='Não identificado');
 const agents=top(countBy(withAgent,x=>x.agent),12);
 const agentMsgs=items.filter(isAgent);
 const phraseSource=agentMsgs.length?agentMsgs:items;
 const phraseMap={}; const phraseOriginal={};
 phraseSource.forEach(x=>{const k=normalizedPhrase(x.text);if(k.length<8)return;phraseMap[k]=(phraseMap[k]||0)+1;phraseOriginal[k]=x.text});
 const phrases=top(phraseMap,6).map(x=>({label:phraseOriginal[x.label]||x.label,value:x.value}));
 const issues=[];
 const generic=items.filter(x=>/ainda tem interesse|conseguiu ver|podemos dar continuidade/i.test(x.text)).length;if(generic)issues.push({id:'generic',title:'Follow-up genérico',count:generic,why:'Mensagens genéricas perdem contexto e fazem o paciente recomeçar a conversa.'});
 const early=items.filter(x=>/quer agendar|quer marcar|podemos marcar/i.test(x.text)&&!/(valor|medo|osso|dentadura|dente|implante|protocolo)/i.test(x.text)).length;if(early)issues.push({id:'early',title:'Agenda sem contexto suficiente',count:early,why:'Pedir agenda cedo pode reduzir a percepção de escuta.'});
 const long=items.filter(x=>x.text.length>600).length;if(long)issues.push({id:'long',title:'Mensagens muito longas',count:long,why:'Textos extensos aumentam carga cognitiva no WhatsApp.'});
 if(!agentMsgs.length&&items.length)issues.push({id:'role',title:'Autor da mensagem não identificado',count:items.length,why:'Sem distinguir paciente de atendente, “respostas mais usadas” ficam apenas como frases repetidas da amostra.'});
 if(!withAgent.length&&items.length)issues.push({id:'agent',title:'Atendente não identificado',count:items.length,why:'Sem autor confiável, não é possível fazer coaching individual justo.'});
 const perAgent=agents.map(a=>{const subset=items.filter(x=>x.agent===a.label);const longs=subset.filter(x=>x.text.length>600).length;const generics=subset.filter(x=>/ainda tem interesse|conseguiu ver|podemos dar continuidade/i.test(x.text)).length;const earlyA=subset.filter(x=>/quer agendar|quer marcar|podemos marcar/i.test(x.text)&&!/(valor|medo|osso|dentadura|dente|implante|protocolo)/i.test(x.text)).length;let note='Sem padrão negativo forte detectado nesta amostra.';if(generics)note=`${generics} follow-up(s) genérico(s) para revisar.`;else if(earlyA)note=`${earlyA} convite(s) para agenda que merecem revisão de contexto.`;else if(longs)note=`${longs} mensagem(ns) longa(s) para revisar.`;return {...a,note}});
 return {total:items.length,intents,agents:perAgent,phrases,issues,hasAgentRole:agentMsgs.length>0};
}
