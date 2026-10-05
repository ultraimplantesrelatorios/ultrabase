import {analyze} from './lib/engine.js';
import {put,all} from './lib/storage.js';
import {parseCSV,guess} from './lib/csv.js';
import {analyzeConversationRows,summarize} from './lib/insights.js';
import {ULTRA_FACTS} from './data/ultra-facts.js';
import {FAQ} from './data/knowledge.js';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let scenarios=[],baseMode='facts',analyses=[],messages=[];
const titles={copiloto:'Copiloto',inteligencia:'Inteligência',milena:'Milena',base:'Base'};
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
function go(view){$$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${view}`));$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#pageTitle').textContent=titles[view]||'ULTRA BASE';$('.sidebar').classList.remove('open');if(view==='inteligencia')renderIntelligence();if(view==='milena')renderMilena();if(view==='base')renderBase()}
function copy(text){navigator.clipboard?.writeText(text).then(()=>toast('Copiado.')).catch(()=>toast('Não foi possível copiar.'))}

async function runAnalysis(){const text=$('#patientText').value.trim();if(!text){toast('Escreva a fala do paciente.');$('#patientText').focus();return}const a=analyze(text,{name:$('#patientName').value,agent:$('#agentName').value});analyses.unshift(a);await put('analyses',a);renderResult(a)}
function renderResult(a){const full=[a.answer,a.question].filter(Boolean).join(a.question?'\n\n':'');$('#copilotResult').innerHTML=`
  <div class="result-top"><div><span class="intent-pill">${esc(a.intentLabel)}</span><div class="confidence">Confiança: ${esc(a.confidence)} · Estado: ${esc(a.state)}</div></div></div>
  <div class="answer-box"><h3>Resposta sugerida</h3><p id="recommendedAnswer">${esc(full)}</p></div>
  <div class="copy-row"><button class="primary" id="copyAnswer">Copiar resposta</button></div>
  <div class="action-card"><div class="micro-card"><span>Próxima melhor ação</span><strong>${esc(a.action)}</strong></div><div class="micro-card"><span>Registrar no RD</span><strong>${esc(a.register)}</strong></div></div>
  ${a.safety.length?`<div class="warning-box"><strong>Atenção:</strong> ${esc(a.safety.join(' '))}</div>`:''}
  <details class="details"><summary>Ver leitura do atendimento</summary><div class="detail-grid">
    <div class="detail-item"><span>O que já sabemos</span><p>${esc(a.known.join(' ')||'Ainda há pouco contexto declarado.')}</p></div>
    <div class="detail-item"><span>Motivação identificada</span><p>${esc(a.motivation||'Não identificada com segurança.')}</p></div>
    <div class="detail-item"><span>Intenção</span><p>${esc(a.intentLabel)}</p></div>
    <div class="detail-item"><span>Fonte</span><p>${esc(a.source||'Método ULTRA / Base Mestre')}</p></div>
  </div></details>`;$('#copyAnswer').onclick=()=>copy(full)}

function topList(items=[]){return items.length?`<div class="list-clean">${items.map(x=>`<div><span>${esc(x.label)}</span><strong>${x.value}</strong></div>`).join('')}</div>`:'<p class="muted">Ainda sem amostra suficiente.</p>'}
function currentItems(){return messages.length?messages:analyses.map(a=>({agent:a.agent||'Não identificado',analysis:a,text:a.raw}))}
function renderIntelligence(){const s=summarize(currentItems());$('#intelligenceGrid').innerHTML=`
 <article class="insight-card"><span class="eyebrow">AMOSTRA</span><div class="big">${s.total}</div><p>interações analisadas neste navegador.</p></article>
 <article class="insight-card"><span class="eyebrow">ASSUNTOS MAIS FREQUENTES</span><h3>O que mais aparece</h3>${topList(s.intents)}</article>
 <article class="insight-card"><span class="eyebrow">${s.hasAgentRole?'RESPOSTAS MAIS USADAS':'FRASES REPETIDAS'}</span><h3>O que mais se repete</h3>${topList(s.phrases.slice(0,4).map(x=>({label:x.label.slice(0,72)+(x.label.length>72?'…':''),value:x.value})))}</article>
 ${s.issues.slice(0,3).map(i=>`<article class="insight-card"><span class="eyebrow">OPORTUNIDADE</span><div class="big">${i.count}</div><h3>${esc(i.title)}</h3><p>${esc(i.why)}</p></article>`).join('')}`}
function renderMilena(){const s=summarize(currentItems());const priorities=s.issues.length?s.issues:[{title:'Ainda sem padrão negativo suficiente',count:0,why:'Use o Copiloto ou importe conversas para formar uma amostra real.'}];$('#milenaPanel').innerHTML=`
 <article class="milena-hero"><span class="eyebrow">LEITURA GERENCIAL</span><h3>${s.total?`Há ${s.total} interações disponíveis para aprender.`:'Comece pelo comportamento, não pelo volume.'}</h3><p>${s.total?'Abaixo estão somente pontos que ajudam a Milena a decidir onde olhar e o que treinar.':'A ULTRA BASE não replica tarefas e funil do RD. Ela complementa o CRM com inteligência sobre a qualidade das conversas.'}</p></article>
 <div class="milena-grid"><article class="coach-card"><span class="eyebrow orange">O QUE MELHORAR</span><h3>Prioridades de coaching</h3><div class="priority-list">${priorities.slice(0,5).map((p,i)=>`<div class="priority-item"><div class="priority-number">${i+1}</div><div><h4>${esc(p.title)}${p.count?` · ${p.count} caso(s)`:''}</h4><p>${esc(p.why)}</p></div></div>`).join('')}</div></article>
 <article class="coach-card"><span class="eyebrow orange">ATENDENTES</span><h3>Onde a Milena deve olhar</h3>${s.agents.length?s.agents.map(a=>`<div class="person-row"><strong>${esc(a.label)}</strong><p>${esc(a.note)}</p></div>`).join(''):'<p class="muted">Ainda não existe identificação suficiente de atendentes nesta amostra.</p>'}</article></div>
 <article class="coach-card" style="margin-top:16px"><span class="eyebrow orange">TREINO DA SEMANA</span><h3>${priorities[0].title}</h3><p class="muted">${esc(priorities[0].why)} Regra do Método ULTRA: reconhecer o contexto → responder → fazer uma pergunta útil → deixar próximo passo claro.</p></article>`}

function baseItems(){const q=($('#baseSearch').value||'').toLowerCase();if(baseMode==='facts')return ULTRA_FACTS.filter(x=>JSON.stringify(x).toLowerCase().includes(q)).map(x=>({title:x.q,text:x.answer,source:x.source,tag:'Confirmado'}));if(baseMode==='faq')return FAQ.filter(x=>JSON.stringify(x).toLowerCase().includes(q)).map(x=>({title:x.title,text:x.answer,source:x.limit?'Exige limite clínico quando individualizado':'Informação geral segura',tag:x.limit?'Limite clínico':'Conhecimento'}));return scenarios.filter(x=>JSON.stringify(x).toLowerCase().includes(q)).map(x=>({title:x.title,text:x.responseB||x.objective,source:x.category,tag:'Cenário'}))}
function renderBase(){const items=baseItems();$('#baseContent').innerHTML=`<div class="knowledge-grid">${items.map(x=>`<article class="knowledge-card"><span class="tag ${x.tag==='Confirmado'?'safe':x.tag==='Limite clínico'?'limit':''}">${esc(x.tag)}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><div class="source">${esc(x.source||'')}</div></article>`).join('')||'<p class="muted">Nada encontrado.</p>'}</div>`}

async function importConversations(file){const text=await file.text();const parsed=parseCSV(text);if(!parsed.rows.length){toast('CSV sem registros.');return}const m=guess(parsed.headers);renderConversationMapping(parsed,m,file.name)}
function selectOptions(headers,selected=''){return `<option value="">— não disponível —</option>${headers.map(h=>`<option value="${esc(h)}" ${h===selected?'selected':''}>${esc(h)}</option>`).join('')}`}
function renderConversationMapping(parsed,m,fileName){go('inteligencia');$('#importHelp').innerHTML=`<div class="section-head"><div><span class="eyebrow orange">MAPEAR CONVERSAS</span><h3>${esc(fileName)}</h3><p class="muted">Confirme quatro campos. Só “Mensagem” é obrigatório.</p></div></div><div class="detail-grid" style="margin-top:14px"><div><label>Mensagem</label><select id="mapMessage">${selectOptions(parsed.headers,m.message)}</select></div><div><label>Atendente</label><select id="mapAgent">${selectOptions(parsed.headers,m.agent)}</select></div><div><label>Autor / tipo</label><select id="mapAuthor">${selectOptions(parsed.headers,m.author)}</select></div><div><label>Data</label><select id="mapDate">${selectOptions(parsed.headers,m.date)}</select></div></div><button class="primary" id="confirmConversationMap" style="margin-top:14px">Analisar conversas</button>`;$('#confirmConversationMap').onclick=async()=>{const mapping={message:$('#mapMessage').value,agent:$('#mapAgent').value,author:$('#mapAuthor').value,date:$('#mapDate').value};if(!mapping.message){toast('Escolha a coluna que contém a mensagem.');return}const list=analyzeConversationRows(parsed.rows,mapping);messages=list;for(const item of list.slice(0,5000))await put('messages',item);toast(`${list.length} mensagens analisadas.`);renderIntelligence();renderMilena();$('#importHelp').innerHTML='<div class="section-head"><div><span class="eyebrow">IMPORTAÇÃO CONCLUÍDA</span><h3>Conversas disponíveis para análise.</h3></div></div><p class="muted">A análise fica neste navegador. Para uso multiusuário e integração automática com RD, será necessário backend seguro.</p>'}}

async function init(){try{scenarios=await (await fetch('./data/scenarios.json')).json()}catch{scenarios=[]}try{analyses=(await all('analyses')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));messages=await all('messages')}catch{}
 $$('#nav [data-view]').forEach(b=>b.onclick=()=>go(b.dataset.view));$('#menuBtn').onclick=()=>$('.sidebar').classList.toggle('open');$('#analyzeBtn').onclick=runAnalysis;$('#patientText').addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')runAnalysis()});$$('[data-example]').forEach(b=>b.onclick=()=>{$('#patientText').value=b.dataset.example;runAnalysis()});$('#conversationFile').onchange=e=>e.target.files[0]&&importConversations(e.target.files[0]);$$('[data-base]').forEach(b=>b.onclick=()=>{baseMode=b.dataset.base;$$('[data-base]').forEach(x=>x.classList.toggle('active',x===b));renderBase()});$('#baseSearch').oninput=renderBase;renderIntelligence();renderMilena();renderBase();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});}
init();
