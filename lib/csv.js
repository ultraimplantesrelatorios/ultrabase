export async function sha256(text){
  const bytes=new TextEncoder().encode(text);
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

function detectDelimiter(text){
  const sample=text.slice(0,8000);
  const candidates=[',',';','\t','|'];
  const counts=candidates.map(d=>({d,count:(sample.match(new RegExp(d==='|'?'\\|':d==='\t'?'\t':d,'g'))||[]).length}));
  counts.sort((a,b)=>b.count-a.count);
  return counts[0].d;
}

export function parseCSV(text){
  text=String(text||'').replace(/^\uFEFF/,'').replace(/^sep=.*\r?\n/i,'');
  if(!text.trim()) return {headers:[],rows:[],delimiter:','};
  const delimiter=detectDelimiter(text);
  const matrix=[];
  let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(c==='"'){
      if(quoted && text[i+1]==='"'){field+='"';i++;}
      else quoted=!quoted;
      continue;
    }
    if(c===delimiter && !quoted){row.push(field);field='';continue;}
    if((c==='\n'||c==='\r')&&!quoted){
      if(c==='\r'&&text[i+1]==='\n') i++;
      row.push(field);field='';
      if(row.some(v=>String(v).trim()!=='')) matrix.push(row);
      row=[];continue;
    }
    field+=c;
  }
  if(field.length||row.length){row.push(field);if(row.some(v=>String(v).trim()!=='')) matrix.push(row);}
  if(!matrix.length) return {headers:[],rows:[],delimiter};
  const headers=matrix.shift().map((h,i)=>String(h||`Coluna ${i+1}`).trim());
  const rows=matrix.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
  return {headers,rows,delimiter};
}

export function normalizeText(v=''){
  return String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}

export function guessMapping(headers){
  const n=headers.map(h=>({raw:h,n:normalizeText(h)}));
  const find=(terms)=>n.find(x=>terms.some(t=>x.n===normalizeText(t) || x.n.includes(normalizeText(t))))?.raw||'';
  return {
    subject:find(['assunto','tarefa','atividade']),
    status:find(['status']),
    description:find(['descrição','descricao','observação','observacao']),
    responsible:find(['responsáveis','responsaveis','responsável','responsavel']),
    creator:find(['usuário que criou','usuario que criou','criado por']),
    scheduledDate:find(['data agendada','vencimento','data da tarefa']),
    scheduledTime:find(['hora agendada','horário agendado','horario agendado']),
    deal:find(['negociação vinculada','negociacao vinculada','negociação','negociacao']),
    createdDate:find(['data de criação','data de criacao']),
    doneDate:find(['data da conclusão','data da conclusao','concluído em','concluido em'])
  };
}

export function parseDate(date,time=''){
  const d=String(date||'').trim(); const t=String(time||'').trim();
  if(!d) return null;
  let iso='';
  const br=d.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if(br) iso=`${br[3]}-${String(br[2]).padStart(2,'0')}-${String(br[1]).padStart(2,'0')}T${t||'00:00'}:00`;
  else if(/^\d{4}-\d{2}-\d{2}/.test(d)) iso=d.includes('T')?d:`${d}T${t||'00:00'}:00`;
  else return null;
  const dt=new Date(iso); return Number.isNaN(dt.getTime())?null:dt;
}
