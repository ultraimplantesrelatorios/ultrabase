import {analyze} from '../lib/engine.js';
import {eq,ok} from './assert.mjs';
const direct=[
 ['vcs atendem convenio?','INSURANCE','particular'],['qual endereco?','ADDRESS','Rua Dr. Antônio'],['abre sabado?','HOURS','segunda a sexta'],['quero um amigo banguelo','OUT_OF_SCOPE','odontologia']
];
for(const [text,intent,contains] of direct){const a=analyze(text);eq(a.intent,intent,`intent ${text}`);ok(a.answer.toLowerCase().includes(contains.toLowerCase()),`answer ${text}`)}
let a=analyze('meu tio precisa colocar um dente');eq(a.intent,'TOOTH_REPLACEMENT','tio intent');ok(a.answer.includes('seu tio'),'recognize tio');ok(!a.answer.includes('você perdeu'),'must not treat speaker as patient');ok(!a.question.includes('perdeu esse dente'),'must not infer loss');
a=analyze('Me falaram que eu não tenho oço');eq(a.intent,'BONE','typo osso');ok(a.safety.length>0,'bone safety');
a=analyze('tenho diabeti posso fazer implante');eq(a.intent,'CLINICAL','diabetes typo');ok(a.safety.length>0,'clinical limit');
a=analyze('to sangrando muito');eq(a.action,'ESCALAR_CLINICO','urgent action');
console.log('engine.test: PASS');
