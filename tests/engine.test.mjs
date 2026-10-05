import {routeIntent,analyze} from '../lib/engine.js';
const tests=[
 ['Quanto custa um implante?','price'],['Me disseram que nao tenho oço','bone'],['Tenho medo de anestecia','fear'],['Qual endereco?','address'],['abre sabado?','hours'],['quero marcar avaliacao','schedule'],['faltei ontem','noshow'],['minha filha que me leva','family'],['achei muito caro','price-block'],['uso dentadua','prosthesis'],['tenho diabeti posso fazer','clinical'],['uso marevan','clinical'],['to sangrando muito','urgent'],['vou pensar','think'],['ja passei na avaliacao','post-eval']
];let fail=0;for(const [q,want] of tests){const got=routeIntent(q).id;if(got!==want){console.error('FAIL',q,'wanted',want,'got',got);fail++}else console.log('PASS',q,'=>',got)}
const a=analyze('Me disseram que nao tenho oço',{name:'Maria'});if(!a.answer||!a.action)fail++;
if(fail){console.error(`${fail} test(s) failed`);process.exit(1)}console.log(`All ${tests.length+1} checks passed`);
