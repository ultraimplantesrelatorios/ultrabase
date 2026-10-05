import {parseCSV,guessMapping,sha256} from './lib/csv.js';
import {enrichRows,summarize,compare,toCsv} from './lib/analytics.js';
import {classify,humanize,inferKnown} from './lib/copilot.js';
import {saveImport,getImports,getImport,clearImports,exportBackup,restoreBackup,setMeta,getMeta} from './lib/storage.js';

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const cfg=window.ULTRA_CONFIG; const scenarios=window.ULTRA_SCENARIOS||[];
let currentImport=null, previousImport=null, selectedCategory='Todos';
const titles={central:'Central',copiloto:'Copiloto',biblioteca:'Biblioteca',importar:'Importar RD',gestao:'Gestão · Milena',treinamento:'Treinamento'};

function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmtDate(v){if(!v)return'—';const d=new Date(v);return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(d)}
function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;$('#toastWrap').append(el);setTimeout(()=>el.remove(),3200)}
function download(name,content,type='text/plain'){const blob=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function setStep(n){$$('[data-step-pill]').forEach(x=>x.classList.toggle('active',Number(x.dataset.stepPill)<=n));}

async function init(){
  $('#humanRule').textContent=`“${cfg.texts.humanRule}”`; $('#privacyText').textContent=cfg.texts.privacy;
  const savedTheme=await getMeta('theme'); if(savedTheme) document.documentElement.dataset.theme=savedTheme;
  await loadLatest(); bindNav(); bindGlobal(); renderLibrary(); renderImportStart(); updateConnection();
  if('serviceWorker' in navigator && location.protocol!=='file:') navigator.serviceWorker.register('./sw.js').catch(()=>{});
}

function bindNav(){
  $$('[data-view]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.view)));
  $$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
  $('#menuBtn').addEventListener('click',()=>{$('#sidebar').classList.add('open');$('#scrim').classList.add('show')});
  $('#scrim').addEventListener('click',closeMenu);
}
function closeMenu(){$('#sidebar').classList.remove('open');$('#scrim').classList.remove('show')}
function go(view){$$('.view').forEach(v=>v.classList.remove('active'));$('#view-'+view)?.classList.add('active');$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#pageTitle').textContent=titles[view]||'Ultra';closeMenu();window.scrollTo({top:0,behavior:'smooth'});if(view==='gestao')renderManagement('hoje');}

function bindGlobal(){
  $('#themeBtn').addEventListener('click',async()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;await setMeta('theme',next)});
  $('#settingsBtn').addEventListener('click',()=>openSettings()); $('#closeSettings').addEventListener('click',()=>$('#settingsDrawer').classList.remove('open'));
  $('#clearCopilot').addEventListener('click',()=>{$('#patientText').value='';$('#patientName').value='';$('#copilotResult').innerHTML=emptyCopilot()});
  $('#analyzeBtn').addEventListener('click',runCopilot);
  $('#librarySearch').addEventListener('input',renderLibrary);
  $('#exportReportBtn').addEventListener('click',()=>{if(!currentImport)return toast('Importe um relatório primeiro.');download(`ultra-analise-${Date.now()}.csv`,toCsv(currentImport.rows),'text/csv;charset=utf-8')});
  $('#downloadTemplate').addEventListener('click',()=>download('modelo_colunas_ultra.csv','Assunto;Status;Descrição;Responsáveis;Usuário que criou;Data agendada;Hora agendada;Negociação vinculada;Data da conclusão\n','text/csv;charset=utf-8'));
  $('#backupBtn').addEventListener('click',async()=>download(`ultra-backup-${Date.now()}.json`,JSON.stringify(await exportBackup(),null,2),'application/json'));
  $('#restoreInput').addEventListener('change',async e=>{try{const p=JSON.parse(await e.target.files[0].text());await restoreBackup(p);toast('Backup restaurado.');await loadLatest();openSettings();}catch(err){toast(err.message||'Falha ao restaurar.')}});
  $('#clearDataBtn').addEventListener('click',async()=>{if(!confirm('Apagar todas as importações salvas neste navegador?'))return;await clearImports();currentImport=null;previousImport=null;renderDashboard();renderImportStart();openSettings();toast('Dados locais apagados.')});
  $$('[data-panel]').forEach(b=>b.addEventListener('click',()=>renderManagement(b.dataset.panel)));
  window.addEventListener('online',updateConnection);window.addEventListener('offline',updateConnection);
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();go('biblioteca');setTimeout(()=>$('#librarySearch').focus(),50)}});
}
function updateConnection(){const online=navigator.onLine;$('#connectionStatus').innerHTML=`<span class="dot" style="background:${online?'var(--success)':'var(--warning)'}"></span> Local · ${online?'online':'offline'}`}

async function loadLatest(){const list=await getImports();currentImport=list[0]||null;previousImport=list[1]||null;renderDashboard();}
function renderDashboard(){
  const s=currentImport?.summary; $('#kpiTotal').textContent=s?.total??'—';$('#kpiDone').textContent=s?.done??'—';$('#kpiLate').textContent=s?.late??'—';$('#kpiNoDesc').textContent=s?.noDesc??'—';$('#kpiNoOwner').textContent=s?.noResponsible??'—';
  if(!s){$('#actionNow').innerHTML='Importe um relatório do RD para montar a fila.';$('#qualityList').innerHTML='<div><span>Descrição preenchida</span><strong>—</strong></div><div><span>Responsável identificado</span><strong>—</strong></div>';$('#familyBars').innerHTML='<div class="empty-state">Sem dados.</div>';return;}
  $('#qualityList').innerHTML=`<div><span>Descrição preenchida</span><strong>${s.completionQuality}%</strong></div><div><span>Responsável identificado</span><strong>${s.ownerQuality}%</strong></div><div><span>Tarefas para hoje</span><strong>${s.dueToday}</strong></div>`;
  const max=Math.max(1,...s.families.map(x=>x.value));$('#familyBars').innerHTML=s.families.slice(0,7).map(x=>`<div class="bar-row"><span>${esc(x.label)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(x.value/max*100)}%"></div></div><strong>${x.value}</strong></div>`).join('');
  $('#actionNow').innerHTML=s.actions.length?actionTable(s.actions.slice(0,10)):'<div class="empty-state">Nenhuma prioridade detectada com as regras atuais.</div>';
}
function actionTable(actions){return `<div class="action-table-wrap"><table class="action-table"><thead><tr><th>Prioridade</th><th>Tarefa</th><th>Negociação</th><th>Responsável</th><th>Prazo</th></tr></thead><tbody>${actions.map(a=>`<tr><td><span class="tag ${a.severity==='alta'?'danger':''}">${a.severity==='alta'?'ALTA':'MÉDIA'}</span></td><td><strong>${esc(a.title)}</strong><br><small>${esc(a.family)}</small></td><td>${esc(a.deal)}</td><td>${esc(a.responsible)}</td><td>${fmtDate(a.due)}</td></tr>`).join('')}</tbody></table></div>`}

function emptyCopilot(){return `<div class="empty-state tall"><div class="big-icon">✦</div><strong>Pronta para pensar junto.</strong><span>Conhecimento forte por dentro. Conversa humana por fora.</span></div>`}
function runCopilot(){
  const text=$('#patientText').value.trim();if(!text)return $('#patientText').focus();
  const {scenario,confidence}=classify(text,scenarios),known=inferKnown(text),name=$('#patientName').value.trim(),agent=$('#agentName').value.trim();
  if(!scenario){$('#copilotResult').innerHTML=`<div class="analysis-grid"><div class="analysis-block"><label>Leitura</label><p>Precisa de mais contexto. Não há sinal suficiente para classificar com segurança.</p></div><div class="analysis-block"><label>Confiança</label><span class="confidence">precisa de contexto</span></div><div class="recommended"><label>Resposta humana</label><p id="copyText">Entendi. Me conta um pouco mais do que você gostaria de resolver hoje, para eu não te orientar de forma genérica.</p><button class="copy-btn" data-copy="#copyText">Copiar resposta</button></div></div>`;bindCopy();return;}
  const limit=/sim/i.test(scenario.clinicalLimit); const response=humanize(scenario.responseB,name,agent);
  $('#copilotResult').innerHTML=`<div class="analysis-grid"><div class="analysis-block"><label>Leitura principal</label><p><strong>${esc(scenario.title)}</strong><br><span class="muted">${esc(scenario.category)}</span></p></div><div class="analysis-block"><label>Confiança</label><span class="confidence">${esc(confidence)}</span></div><div class="analysis-block"><label>O que já sabemos</label><p>${known.length?known.map(esc).join('<br>'):'Apenas o que está explícito na mensagem.'}</p></div><div class="analysis-block"><label>Não repetir</label><p>${known.length?'Evite perguntar novamente pelos fatos já declarados.':'Ainda não há informação suficiente para bloquear perguntas específicas.'}</p></div><div class="analysis-block"><label>Como pensar</label><p>${esc(scenario.think)}</p></div><div class="analysis-block"><label>Melhor pergunta agora</label><p>${esc(scenario.bestQuestion)}</p></div><div class="recommended"><label>Resposta recomendada</label><p id="copyText">${esc(response)}</p><button class="copy-btn" data-copy="#copyText">Copiar resposta</button></div><div class="analysis-block"><label>Evitar</label><p>${esc(scenario.avoid)}</p></div><div class="analysis-block"><label>Registrar no RD</label><p>${esc(scenario.register)}</p></div><div class="analysis-block"><label>Limite clínico</label><p><span class="tag ${limit?'danger':''}">${limit?'ENCAMINHAR / AVALIAÇÃO PROFISSIONAL':'SEM GATILHO CLÍNICO PRINCIPAL'}</span></p></div></div>`;bindCopy();
}
function bindCopy(){$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{await navigator.clipboard.writeText($(b.dataset.copy).innerText);toast('Resposta copiada.')}))}

function renderLibrary(){
  const q=($('#librarySearch')?.value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const cats=['Todos',...new Set(scenarios.map(s=>s.category||'Outros'))];$('#categoryChips').innerHTML=cats.map(c=>`<button class="chip ${selectedCategory===c?'active':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');$$('[data-cat]').forEach(b=>b.addEventListener('click',()=>{selectedCategory=b.dataset.cat;renderLibrary()}));
  const list=scenarios.filter(s=>(selectedCategory==='Todos'||s.category===selectedCategory)&&(!q||JSON.stringify(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(q)));
  $('#scenarioGrid').innerHTML=list.map(s=>`<article class="scenario"><span class="category">${esc(s.category||'Cenário')}</span><h3>${esc(s.title)}</h3><p>${esc(s.objective||s.think||'Cenário estruturado.')}</p><button data-scenario="${s.id}">Ver orientação →</button></article>`).join('')||'<div class="empty-state">Nenhum cenário encontrado.</div>';
  $$('[data-scenario]').forEach(b=>b.addEventListener('click',()=>showScenario(b.dataset.scenario,b.closest('.scenario'))));
}
function showScenario(id,card){$('.scenario-detail')?.remove();const s=scenarios.find(x=>x.id===id);if(!s)return;const d=document.createElement('article');d.className='scenario-detail';d.innerHTML=`<h3>${esc(s.title)}</h3><dl><dt>Como pensar</dt><dd>${esc(s.think)}</dd><dt>Objetivo</dt><dd>${esc(s.objective)}</dd><dt>Melhor pergunta</dt><dd>${esc(s.bestQuestion)}</dd><dt>Resposta padrão</dt><dd>${esc(s.responseB)}</dd><dt>Evitar</dt><dd>${esc(s.avoid)}</dd><dt>Registrar</dt><dd>${esc(s.register)}</dd><dt>Limite clínico</dt><dd>${esc(s.clinicalLimit)}</dd></dl>`;card.after(d);d.scrollIntoView({behavior:'smooth',block:'center'})}

function renderImportStart(){setStep(1);$('#importWizard').innerHTML=`<label class="dropzone" id="dropzone"><input type="file" id="fileInput" accept=".csv,text/csv" hidden><div><img src="assets/rd-icon.png" alt=""><h3>Arraste o CSV bruto do RD</h3><span>ou clique para selecionar</span><p><small>Antes de analisar, você poderá revisar o mapeamento das colunas.</small></p></div></label>`;const d=$('#dropzone'),f=$('#fileInput');['dragenter','dragover'].forEach(ev=>d.addEventListener(ev,e=>{e.preventDefault();d.classList.add('drag')}));['dragleave','drop'].forEach(ev=>d.addEventListener(ev,e=>{e.preventDefault();d.classList.remove('drag')}));d.addEventListener('drop',e=>e.dataTransfer.files[0]&&prepareImport(e.dataTransfer.files[0]));f.addEventListener('change',e=>e.target.files[0]&&prepareImport(e.target.files[0]));}
async function prepareImport(file){
  const text=await file.text();const parsed=parseCSV(text);if(!parsed.rows.length)return toast('Não encontrei registros no CSV.');const fingerprint=await sha256(text);const existing=(await getImports()).find(i=>i.fingerprint===fingerprint);if(existing&& !confirm('Este arquivo já foi importado. Deseja analisar novamente?'))return;
  const draft={id:`imp_${Date.now()}`,name:file.name,size:file.size,createdAt:new Date().toISOString(),fingerprint,headers:parsed.headers,rawRows:parsed.rows,mapping:guessMapping(parsed.headers)};renderMapping(draft);
}
function renderMapping(d){setStep(2);const fields={subject:'Assunto / tarefa',status:'Status',description:'Descrição',responsible:'Responsável',creator:'Usuário que criou',scheduledDate:'Data agendada',scheduledTime:'Hora agendada',deal:'Negociação vinculada',createdDate:'Data de criação',doneDate:'Data da conclusão'};const opts=(selected)=>`<option value="">— não encontrado —</option>${d.headers.map(h=>`<option ${h===selected?'selected':''}>${esc(h)}</option>`).join('')}`;$('#importWizard').innerHTML=`<article class="card"><div class="section-head"><div><span class="eyebrow">MAPEAMENTO</span><h3>${esc(d.name)}</h3><p class="muted">Confirme quais colunas representam cada informação.</p></div></div><div class="mapping-grid">${Object.entries(fields).map(([k,l])=>`<div class="mapping-item"><label>${l}</label><select data-map="${k}">${opts(d.mapping[k])}</select></div>`).join('')}</div><div class="button-row"><button class="secondary" id="backImport">Voltar</button><button class="primary" id="reviewImport">Revisar dados</button></div></article>`;$('#backImport').onclick=renderImportStart;$('#reviewImport').onclick=()=>{Object.keys(fields).forEach(k=>d.mapping[k]=$(`[data-map="${k}"]`).value);renderPreview(d)}}
function renderPreview(d){setStep(3);const cols=d.headers.slice(0,8);$('#importWizard').innerHTML=`<article class="card"><div class="section-head"><div><span class="eyebrow">PRÉVIA</span><h3>${d.rawRows.length} registros encontrados</h3><p class="muted">Confira uma amostra antes de gravar a importação.</p></div></div><div class="preview-table-wrap"><table class="preview-table"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${d.rawRows.slice(0,8).map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="button-row"><button class="secondary" id="editMapping">Editar mapeamento</button><button class="primary" id="analyzeImport">Analisar e salvar</button></div></article>`;$('#editMapping').onclick=()=>renderMapping(d);$('#analyzeImport').onclick=()=>finalizeImport(d)}
async function finalizeImport(d){setStep(4);const rows=enrichRows(d.rawRows,d.mapping);const summary=summarize(rows,d.mapping);const record={id:d.id,name:d.name,size:d.size,createdAt:d.createdAt,fingerprint:d.fingerprint,headers:d.headers,mapping:d.mapping,rows,summary};await saveImport(record);await loadLatest();$('#importWizard').innerHTML=`<article class="card"><span class="eyebrow orange">IMPORTAÇÃO CONCLUÍDA</span><h2>${summary.total} tarefas analisadas</h2><div class="kpi-grid" style="margin-top:18px"><article class="kpi"><span>Concluídas</span><strong>${summary.done}</strong></article><article class="kpi alert"><span>Atrasadas</span><strong>${summary.late}</strong></article><article class="kpi"><span>Sem descrição</span><strong>${summary.noDesc}</strong></article><article class="kpi"><span>Sem responsável</span><strong>${summary.noResponsible}</strong></article></div><div class="button-row"><button class="primary" id="goDashboard">Ver Central</button><button class="secondary" id="newImport">Nova importação</button></div></article>`;$('#goDashboard').onclick=()=>go('central');$('#newImport').onclick=renderImportStart;toast('Relatório analisado e salvo.')}

function renderManagement(panel){$$('[data-panel]').forEach(b=>b.classList.toggle('active',b.dataset.panel===panel));const el=$('#managementPanel');if(!currentImport){el.innerHTML='<div class="empty-state">Importe um relatório do RD para preencher o painel.</div>';return;}const s=currentImport.summary;
  if(panel==='hoje')el.innerHTML=`<div class="kpi-grid"><article class="kpi"><span>Previstas hoje</span><strong>${s.dueToday}</strong></article><article class="kpi alert"><span>Atrasadas</span><strong>${s.late}</strong></article><article class="kpi"><span>Follow-ups</span><strong>${s.families.find(x=>x.label==='FOLLOW-UP')?.value||0}</strong></article><article class="kpi"><span>Confirmações</span><strong>${s.families.find(x=>x.label==='CONFIRMAÇÃO')?.value||0}</strong></article></div>`;
  if(panel==='atencao')el.innerHTML=s.actions.length?actionTable(s.actions):'<div class="empty-state">Sem prioridades detectadas.</div>';
  if(panel==='equipe')el.innerHTML=`<div class="section-head"><div><span class="eyebrow">RESPONSÁVEIS / CRIADORES</span><h3>Distribuição de tarefas</h3></div></div><div class="metric-list">${s.creators.map(x=>`<div><span>${esc(x.label)}</span><strong>${x.value}</strong></div>`).join('')}</div><p class="muted">Volume não é conversão. Use esta leitura como carga operacional, não como ranking de desempenho.</p>`;
  if(panel==='evolucao'){const c=compare(s,previousImport?.summary);el.innerHTML=c?`<div class="kpi-grid"><article class="kpi"><span>Tarefas</span><strong>${signed(c.total.absolute)}</strong><small>${pct(c.total.percent)}</small></article><article class="kpi"><span>Atrasadas</span><strong>${signed(c.late.absolute)}</strong><small>${pct(c.late.percent)}</small></article><article class="kpi"><span>Sem descrição</span><strong>${signed(c.noDesc.absolute)}</strong><small>${pct(c.noDesc.percent)}</small></article></div>`:'<div class="empty-state">É necessária uma segunda importação para comparar evolução.</div>'}
}
function signed(v){return `${v>0?'+':''}${v}`} function pct(v){return v===null?'sem base anterior':`${v>0?'+':''}${v}% vs. anterior`}

async function openSettings(){const list=await getImports();$('#importHistory').innerHTML=list.length?list.map(x=>`<div class="history-item"><strong>${esc(x.name)}</strong><small>${fmtDate(x.createdAt)} · ${x.summary?.total||0} registros</small></div>`).join(''):'<div class="muted">Nenhuma importação salva.</div>';$('#settingsDrawer').classList.add('open')}

init();
