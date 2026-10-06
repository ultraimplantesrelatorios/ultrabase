import {analyze} from '../lib/engine.js';
import {eq,ok} from './assert.mjs';
const cases=[
 ['vcs atendem convenio?','INSURANCE'],['aceita unimed?','INSURANCE'],['qual endereco?','ADDRESS'],['abre sabado?','HOURS'],['qual whatsapp?','WHATSAPP'],['tem estacionamento?','PARKING'],['aceita pix?','PAYMENT'],
 ['quero um amigo banguelo','OUT_OF_SCOPE'],['meu tio precisa colocar um dente','TOOTH_REPLACEMENT'],['minha mãe usa dentadura','PROSTHESIS'],['minha tia quer implante mas tem medo','FEAR'],
 ['me disseram que nao tenho oço','BONE'],['tenho diabeti posso fazer implante','CLINICAL'],['uso marevan','CLINICAL'],['quero marcar','SCHEDULE'],['tem horario amanha?','SCHEDULE'],
 ['nao quero marcar nada','THINK'],['me chama mes que vem','THINK'],['faltei ontem','NO_SHOW'],['achei caro','PRICE_BLOCK'],['minha filha que me leva','LOGISTICS'],['to sangrando muito','URGENT'],
 ['to sem um dente','ONE_TOOTH'],['quero colocar um dente','TOOTH_REPLACEMENT'],['meu pai está banguelo e quer dente fixo','REHABILITATION']
];
for(const [q,want] of cases){const a=analyze(q);eq(a.intent,want,`adversarial ${q}`);ok(a.answer.length>10,`non-empty answer ${q}`);ok(!/resultado garantido|nao vai doer|100%/i.test(a.answer),'no unsafe promise')}
console.log(`adversarial.test: ${cases.length} PASS`);
