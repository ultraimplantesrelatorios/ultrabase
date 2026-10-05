import {normalizeText,parseDate} from './csv.js';

export function family(subject=''){
  const s=normalizeText(subject);
  if(/confirm/.test(s)) return 'CONFIRMAÇÃO';
  if(/reagend|remarc/.test(s)) return 'REMARCAÇÃO';
  if(/agend/.test(s)) return 'AGENDAMENTO';
  if(/finance|pagamento|boleto|parcela/.test(s)) return 'FINANCEIRO';
  if(/pos.?avali|pós.?avali|revis/.test(s)) return 'PÓS-AVALIAÇÃO';
  if(/encerr|arquiv/.test(s)) return 'ENCERRAMENTO';
  if(/no.?show|falt/.test(s)) return 'NO-SHOW';
  if(/entrar em contato|tent|follow|retom|ligar|contato/.test(s)) return 'FOLLOW-UP';
  return 'OUTROS';
}

export function enrichRows(rows,mapping){
  const now=new Date();
  return rows.map((r,index)=>{
    const due=parseDate(r[mapping.scheduledDate],r[mapping.scheduledTime]);
    const done=parseDate(r[mapping.doneDate]);
    const status=normalizeText(r[mapping.status]);
    const isDone=/conclu|complet|finaliz|feito/.test(status);
    const fam=family(r[mapping.subject]);
    const desc=String(r[mapping.description]||'').trim();
    const responsible=String(r[mapping.responsible]||'').trim();
    return {...r,_row:index+1,_family:fam,_due:due?.toISOString()||null,_done:done?.toISOString()||null,_isDone:isDone,_late:!!due&&due<now&&!isDone,_noDesc:!desc,_noResponsible:!responsible};
  });
}

export function summarize(rows,mapping){
  const total=rows.length;
  const done=rows.filter(r=>r._isDone).length;
  const late=rows.filter(r=>r._late).length;
  const noDesc=rows.filter(r=>r._noDesc).length;
  const noResponsible=rows.filter(r=>r._noResponsible).length;
  const families=groupCount(rows,r=>r._family);
  const creators=groupCount(rows,r=>String(r[mapping.creator]||r[mapping.responsible]||'Não identificado').trim()||'Não identificado');
  const todayKey=new Date().toISOString().slice(0,10);
  const dueToday=rows.filter(r=>r._due?.slice(0,10)===todayKey&&!r._isDone).length;
  const completionQuality=total?Math.round((1-noDesc/total)*100):0;
  const ownerQuality=total?Math.round((1-noResponsible/total)*100):0;
  const actions=rows.filter(r=>r._late || (!r._isDone && ['PÓS-AVALIAÇÃO','NO-SHOW','CONFIRMAÇÃO','REMARCAÇÃO'].includes(r._family))).map(r=>({
    row:r._row,
    title:r[mapping.subject]||r._family,
    family:r._family,
    deal:r[mapping.deal]||'Sem negociação vinculada',
    responsible:r[mapping.responsible]||r[mapping.creator]||'Sem responsável',
    due:r._due,
    severity:r._late?'alta':'media',
    reason:r._late?'Tarefa vencida':'Acompanhamento prioritário'
  })).sort((a,b)=>(a.severity==='alta'?-1:1)-(b.severity==='alta'?-1:1));
  return {total,done,late,noDesc,noResponsible,dueToday,completionQuality,ownerQuality,families,creators,actions};
}

export function groupCount(rows,keyFn){
  const map=new Map(); rows.forEach(r=>{const k=keyFn(r)||'Não identificado';map.set(k,(map.get(k)||0)+1);});
  return [...map.entries()].map(([label,value])=>({label,value})).sort((a,b)=>b.value-a.value);
}

export function compare(current,previous){
  if(!previous) return null;
  const delta=(a,b)=>({absolute:a-b,percent:b?Math.round(((a-b)/b)*100):null});
  return {total:delta(current.total,previous.total),late:delta(current.late,previous.late),noDesc:delta(current.noDesc,previous.noDesc),done:delta(current.done,previous.done)};
}

export function toCsv(rows){
  if(!rows.length) return '';
  const headers=Object.keys(rows[0]).filter(k=>!k.startsWith('_'));
  const esc=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  return [headers.map(esc).join(';'),...rows.map(r=>headers.map(h=>esc(r[h])).join(';'))].join('\n');
}
