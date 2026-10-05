import {normalizeText} from './csv.js';

const RULES=[
  ['pouco-osso',/pouco osso|sem osso|nao tenho osso|zigomatic|zigomát/],
  ['idade',/\b(6\d|7\d|8\d|9\d)\s*anos|velh[oa]|idade.*implante/],
  ['medo',/medo|receio|ansiedad|anestesia|cirurgia.*(medo|receio)|trauma/],
  ['preco',/quanto custa|qual.*valor|pre[cç]o|quanto.*implante/],
  ['fup-preco',/achei caro|muito caro|valor.*alto|caro demais/],
  ['fup-familia',/falar com|minha esposa|meu marido|meu filho|minha filha|familia/],
  ['familiar',/minha mae|minha mãe|meu pai|para meu pai|para minha mae|para minha mãe/],
  ['protese',/dentadura|protese removivel|prótese removível|chapa/],
  ['um-dente',/perdi um dente|falta um dente|um dente perdido/],
  ['varios-dentes',/perdi varios|perdi vários|faltam varios|faltam vários|muitos dentes/],
  ['experiencia-ruim',/experiencia ruim|experiência ruim|cirurgia.*horrivel|horrível|trauma anterior/],
  ['barreira-pratica',/transporte|acompanhante|dependo da|minha filha.*levar|horario dificil|horário difícil/],
  ['noshow',/nao fui|não fui|faltei|perdi a consulta/],
  ['pos-avaliacao',/ja passei.*avali|já passei.*avali|fiz a avali/],
  ['pensar',/quero pensar|vou pensar|nao e o momento|não é o momento/],
  ['retorno-data',/me chama|retorna.*mes|retorna.*semana|fala comigo.*depois/],
  ['comparando',/outra clinica|outra clínica|comparando|orcamento em outro|orçamento em outro/],
  ['oi',/^\s*(oi+|ola|olá|bom dia|boa tarde|boa noite)[!. ]*$/i],
  ['clinica',/posso fazer|tenho indicacao|tenho indicação|qual tratamento|isso e normal|isso é normal|meu exame/],
  ['lead-implante',/implante|dente fixo|dentes fixos/]
];

export function classify(text,scenarios){
  const n=normalizeText(text);
  for(let i=0;i<RULES.length;i++){
    const [id,rx]=RULES[i]; if(rx.test(n)) return {scenario:scenarios.find(s=>s.id===id)||null,confidence:i<5?'forte':'possível'};
  }
  return {scenario:null,confidence:'precisa de contexto'};
}
export function humanize(template,name='',agent='equipe Ultra'){
  return String(template||'').replaceAll('{{primeiro_nome}}',name||'').replaceAll('{{nome_atendente}}',agent||'equipe Ultra').replace(/\s+,/g,',').replace(/Oi, \./,'Oi.').trim();
}
export function inferKnown(text=''){
  const t=normalizeText(text),known=[];
  if(/dentadura|protese|prótese|chapa/.test(t)) known.push('Já usa prótese/dentadura.');
  if(/medo|receio|anestesia/.test(t)) known.push('Existe medo ou insegurança declarado.');
  if(/nao tenho osso|não tenho osso|pouco osso/.test(t)) known.push('Relatou informação prévia sobre pouca disponibilidade óssea.');
  if(/minha mae|minha mãe|meu pai|minha esposa|meu marido/.test(t)) known.push('Há familiar participando da decisão.');
  if(/quanto custa|preço|preco|valor/.test(t)) known.push('Preço apareceu como tema.');
  return known;
}
