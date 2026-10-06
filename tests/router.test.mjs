import {routeIntent} from '../lib/intent-router.js';
import {extractContext} from '../lib/context-extractor.js';
import {eq,ok} from './assert.mjs';
const cases=[
 ['vcs atendem convenio?','INSURANCE'],['aceita unimed?','INSURANCE'],['qual endereco?','ADDRESS'],['abre sabado?','HOURS'],
 ['quero um amigo banguelo','OUT_OF_SCOPE'],['meu tio precisa colocar um dente','TOOTH_REPLACEMENT'],['meu pai está banguelo e quer dente fixo','REHABILITATION'],
 ['to sem um dente','ONE_TOOTH'],['quero colocar um dente','TOOTH_REPLACEMENT'],['quero marcar avaliacao','SCHEDULE'],['faltei ontem','NO_SHOW'],['achei caro','PRICE_BLOCK'],['to sangrando muito','URGENT']
];
for(const [text,want] of cases){const c=extractContext(text);const got=routeIntent(text,c);eq(got.id,want,`router: ${text}`)}
console.log(`router.test: ${cases.length} PASS`);
