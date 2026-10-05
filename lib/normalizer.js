const TYPO_MAP={
  'oço':'osso','ossooo':'osso','dentadua':'dentadura','dentaduraa':'dentadura','protese':'protese','protesi':'protese',
  'diabeti':'diabetes','diabetis':'diabetes','implati':'implante','inplante':'implante','emplante':'implante','cirugia':'cirurgia',
  'anestecia':'anestesia','enxerto':'enxerto','zigomatico':'zigomatico','zigomatic':'zigomatico','horaro':'horario','enderecoo':'endereco',
  'preço':'preco','quanto':'quanto','qto':'quanto','qt':'quanto','vc':'voce','vcs':'voces','tb':'tambem','pq':'porque','n':'nao','ñ':'nao'
};
export function strip(text=''){return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9@.\s-]/g,' ').replace(/\s+/g,' ').trim()}
export function normalize(text=''){
  return strip(text).split(' ').map(t=>TYPO_MAP[t]||t).join(' ')
    .replace(/nao tenho oco/g,'nao tenho osso')
    .replace(/sem oco/g,'sem osso')
    .replace(/dente preso/g,'dente fixo');
}
export function tokens(text=''){return normalize(text).split(' ').filter(Boolean)}
export function includesAny(text,terms=[]){const n=normalize(text);return terms.some(t=>n.includes(normalize(t)))}
export function similarity(a='',b=''){
 const A=new Set(tokens(a)),B=new Set(tokens(b)); if(!A.size||!B.size)return 0;
 let hit=0;A.forEach(x=>{if(B.has(x))hit++});return hit/Math.max(A.size,B.size)
}
