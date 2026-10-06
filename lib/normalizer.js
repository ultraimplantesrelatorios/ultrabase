const TYPO_MAP = new Map(Object.entries({
  'oço':'osso','osso':'osso','oco':'osso','dentadua':'dentadura','dentadura':'dentadura',
  'anestecia':'anestesia','anestezia':'anestesia','convenio':'convenio','convênio':'convenio',
  'implanti':'implante','protese':'protese','prótese':'protese','diabeti':'diabetes','diabetico':'diabetes',
  'diabético':'diabetes','diabetica':'diabetes','diabética':'diabetes','avaliacao':'avaliacao','avaliação':'avaliacao',
  'horario':'horario','horário':'horario','endereco':'endereco','endereço':'endereco','nao':'nao','não':'nao',
  'mae':'mae','mãe':'mae','irma':'irma','irmã':'irma','irmao':'irmao','irmão':'irmao','vo':'avo','vó':'avo','avó':'avo',
  'vô':'avo','avô':'avo','zigomatico':'zigomatico','zigomático':'zigomatico','reabilitacao':'reabilitacao','reabilitação':'reabilitacao'
}));

export function stripAccents(value=''){
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

export function normalize(value=''){
  const base=stripAccents(String(value).toLowerCase())
    .replace(/[^a-z0-9\s@.+-]/g,' ')
    .replace(/\s+/g,' ').trim();
  return base.split(' ').map(t=>TYPO_MAP.get(t)||t).join(' ');
}

export function tokens(value=''){
  return normalize(value).split(' ').filter(t=>t.length>1);
}

export function includesPhrase(value,phrase){
  const n=normalize(value), p=normalize(phrase);
  return n===p || n.includes(p);
}

export function includesAny(value,terms=[]){
  return terms.some(t=>includesPhrase(value,t));
}

export function similarity(a='',b=''){
  const A=new Set(tokens(a)), B=new Set(tokens(b));
  if(!A.size||!B.size)return 0;
  let hit=0; A.forEach(x=>{if(B.has(x))hit++});
  return hit/Math.max(A.size,B.size);
}

export function normalizeForSearch(value=''){
  return normalize(value).replace(/\b(vc|vcs|pq|q|tb|tmb|pra|pro)\b/g,m=>({vc:'voce',vcs:'voces',pq:'porque',q:'que',tb:'tambem',tmb:'tambem',pra:'para',pro:'para o'}[m]||m));
}
