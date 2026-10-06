const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
let pass=0,fail=0;
function ok(cond,msg){if(cond){pass++;console.log('PASS',msg)}else{fail++;console.error('FAIL',msg)}}
const code=fs.readFileSync(path.join(root,'ultra-core-v5.2.js'),'utf8');
const ctx={globalThis:{}};ctx.globalThis.globalThis=ctx.globalThis;vm.createContext(ctx);vm.runInContext(code,ctx);const C=ctx.globalThis.ULTRACore;
ok(C&&C.VERSION==='5.2.0','core carrega v5.2.0');
const cases=[
 ['vcs atendem convenio?','INSURANCE'],['aceita unimed?','INSURANCE'],['qual endereco?','ADDRESS'],['abre sabado?','HOURS'],['quero um amigo banguelo','OUT_OF_SCOPE'],['meu tio precisa colocar um dente','TOOTH_REPLACEMENT'],['minha mãe usa dentadura','PROSTHESIS'],['minha tia quer implante mas tem medo','FEAR'],['me disseram que nao tenho oço','LOW_BONE'],['tenho diabeti posso fazer implante','CLINICAL'],['uso marevan','CLINICAL'],['quero marcar avaliacao','SCHEDULE'],['tem horario amanha?','SCHEDULE'],['nao quero marcar nada','NO_SCHEDULE'],['me chama mes que vem','RETURN_DATE'],['faltei ontem','NOSHOW'],['achei caro','PRICE'],['to sangrando muito','URGENCY']
];
for(const [text,intent] of cases){const a=C.analyze(text,{memory:C.newMemory()});ok(a.intent===intent,`${text} -> ${intent} (veio ${a.intent})`)}
let m=C.newMemory();let a=C.analyze('uso dentadura',{memory:m});m=C.observePatient(m,a);m=C.recordSuggestions(m,a);ok(m.askedQuestions.length===0,'sugestão de pergunta não vira pergunta enviada');ok(m.sentAnswers.length===0,'sugestão de resposta não vira resposta enviada');const q=a.question;m=C.confirmQuestion(m,q);ok(m.askedQuestions.includes(q),'pergunta só entra após confirmação');const edited='Resposta editada e realmente enviada.';m=C.confirmAnswer(m,edited);ok(m.sentAnswers.includes(edited),'salva resposta editada enviada');const before=m.observedFacts.length;const empty=C.newMemory();ok(empty.turns.length===0&&empty.observedFacts.length===0,'nova conversa inicia sem contaminação');
const t=C.TEMPLATES;ok(t.length===12,'12 templates RD');ok(new Set(t.map(x=>x.id)).size===12,'IDs de templates únicos');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');ok(html.includes('ultra-core-v5.2.js')&&html.includes('app-v5.2.js'),'index usa runtime versionado v5.2');ok(!html.includes('type="module"'),'index não depende de ES modules');ok(!html.includes('src="app.js"'),'index não carrega app antigo');
for(const f of ['index.html','styles.css','ultra-core-v5.2.js','app-v5.2.js','health.html','404.html'])ok(fs.existsSync(path.join(root,f)),`arquivo existe: ${f}`);
console.log(`\nTOTAL: ${pass} PASS / ${fail} FAIL`);if(fail)process.exit(1);
