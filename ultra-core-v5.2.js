(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  root.ULTRACore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const VERSION='5.2.0';
  const FACTS=[
    {id:'private',q:'Vocês atendem convênio?',keywords:['convenio','convênio','plano','unimed','amil','bradesco saude','odontoprev'],answer:'A Ultra trabalha com atendimento particular.',source:'Base institucional ULTRA',status:'CONFIRMADO'},
    {id:'address',q:'Qual é o endereço?',keywords:['endereco','endereço','onde fica','localizacao','localização','como chegar'],answer:'A Ultra Implantes fica em Osasco/SP. Para envio ao paciente, use o endereço oficial vigente cadastrado pela clínica.',source:'Base institucional ULTRA',status:'CONFIRMAR_ENDERECO_OPERACIONAL'},
    {id:'hours',q:'Qual é o horário de atendimento?',keywords:['horario','horário','abre','fecha','sabado','sábado','domingo'],answer:'O horário deve ser respondido conforme a informação operacional vigente da Ultra. Se houver dúvida sobre sábado ou horário especial, confirme internamente antes de prometer.',source:'Base institucional ULTRA',status:'VALIDAR_HORARIOS_ESPECIAIS'},
    {id:'private2',q:'O atendimento é particular?',keywords:['particular'],answer:'Sim. A Ultra trabalha com atendimento particular.',source:'Base institucional ULTRA',status:'CONFIRMADO'},
    {id:'structure',q:'Que estrutura a Ultra possui?',keywords:['tomografia','scanner','laboratorio','laboratório','radiologia','centro cirurgico','centro cirúrgico'],answer:'A base institucional da Ultra registra laboratório de prótese próprio, tomografia computadorizada, radiologia digital, scanner intraoral e centro cirúrgico equipado.',source:'Base institucional ULTRA',status:'CONFIRMADO'}
  ];

  const FAQ=[
    {id:'implant',title:'O que é implante dentário?',keys:['o que e implante','como funciona implante'],answer:'O implante substitui a raiz de um dente ausente e pode servir de suporte para uma prótese. A indicação e o planejamento dependem da avaliação individual.',limit:true},
    {id:'pain',title:'Implante dói?',keys:['implante doi','vai doer','dor cirurgia','medo de dor'],answer:'O procedimento é realizado com anestesia e o conforto é planejado pela equipe. A experiência varia de pessoa para pessoa; não é seguro prometer ausência total de dor.',limit:true},
    {id:'age',title:'Idade impede implante?',keys:['idade','anos','velho','idoso'],answer:'A idade isoladamente não define se alguém pode ou não receber implantes. Saúde geral, condição bucal, exames e avaliação profissional são mais importantes.',limit:true},
    {id:'bone',title:'Pouco osso impede tratamento?',keys:['pouco osso','sem osso','não tenho osso','nao tenho osso'],answer:'Existem diferentes possibilidades de planejamento quando há pouca disponibilidade óssea, mas a indicação depende de avaliação clínica e exames. Não é correto concluir um tratamento específico por mensagem.',limit:true},
    {id:'diabetes',title:'Quem tem diabetes pode fazer implante?',keys:['diabetes','diabeti','diabetico','diabético'],answer:'Pessoas com diabetes podem ter possibilidades de tratamento, mas o controle da condição e outros fatores de saúde precisam ser avaliados pelo cirurgião-dentista e, quando necessário, pelo médico.',limit:true},
    {id:'anticoag',title:'Quem usa anticoagulante pode fazer?',keys:['marevan','varfarina','anticoagulante'],answer:'O uso de anticoagulantes precisa ser informado ao profissional. A pessoa não deve suspender ou alterar medicação por conta própria; a conduta depende de avaliação clínica e, quando necessário, médica.',limit:true}
  ];

  const TEMPLATES=[
    {id:'inicio-conv',group:'INICIO_CONVERSA',version:'A',goal:'CONVERSAO',meta_category:'MARKETING',name_rd:'ultra_inicio_interesse_v1',text:'Oi, {{1}}. Aqui é da Ultra Implantes. Você demonstrou interesse em saber mais sobre {{2}} e estou entrando em contato para te orientar por aqui. Hoje sua dúvida é mais sobre como funciona, valores ou entender quais possibilidades podem existir para sua situação?',variables:['{{1}} primeiro_nome','{{2}} interesse'],when_to_use:'Lead com intenção já demonstrada e espaço para uma pergunta objetiva.',when_not_to_use:'Quando a pessoa já fez uma pergunta específica; responda primeiro ao que ela perguntou.',next_best_action:'QUALIFICAR',status:'READY_FOR_RD'},
    {id:'inicio-hum',group:'INICIO_CONVERSA',version:'B',goal:'HUMANIZACAO',meta_category:'MARKETING',name_rd:'ultra_inicio_humano_v1',text:'Oi, {{1}}. Tudo bem? Aqui é da equipe da Ultra Implantes. Vi que você procurou informações sobre {{2}}. Antes de falar em tratamento ou agendamento, quero entender o que você gostaria de resolver. Se quiser, pode me contar por aqui.',variables:['{{1}} primeiro_nome','{{2}} interesse'],when_to_use:'Lead frio, inseguro ou quando acolhimento deve vir antes da condução.',when_not_to_use:'Quando a pessoa já pediu diretamente para agendar.',next_best_action:'QUALIFICAR',status:'READY_FOR_RD'},
    {id:'inicio-edu',group:'INICIO_CONVERSA',version:'C',goal:'EDUCACAO',meta_category:'MARKETING',name_rd:'ultra_inicio_orientacao_v1',text:'Oi, {{1}}. Aqui é da Ultra Implantes. Recebemos seu interesse em {{2}}. Cada situação precisa ser entendida individualmente antes de qualquer orientação. Posso te ajudar a organizar as primeiras dúvidas e explicar como costuma funcionar essa etapa.',variables:['{{1}} primeiro_nome','{{2}} interesse'],when_to_use:'Quando a pessoa ainda está buscando compreensão antes de decidir.',when_not_to_use:'Quando há urgência clínica ou pedido objetivo de agenda.',next_best_action:'EXPLICAR',status:'READY_FOR_RD'},
    {id:'mkt-conv',group:'MARKETING',version:'A',goal:'CONVERSAO',meta_category:'MARKETING',name_rd:'ultra_conteudo_educativo_v1',text:'Oi, {{1}}. Muitas pessoas que procuram a Ultra por {{2}} chegam com dúvidas sobre qual caminho faz mais sentido. A avaliação existe justamente para entender a situação antes de qualquer indicação. Se esse assunto ainda for importante para você, posso te explicar como funciona.',variables:['{{1}} primeiro_nome','{{2}} tema'],when_to_use:'Conteúdo educativo com convite para retomar a conversa.',when_not_to_use:'Quando a pessoa pediu para não receber novos contatos.',next_best_action:'RESPONDER',status:'READY_FOR_RD'},
    {id:'mkt-hum',group:'MARKETING',version:'B',goal:'HUMANIZACAO',meta_category:'MARKETING',name_rd:'ultra_qualidade_vida_v1',text:'{{1}}, voltar a mastigar com mais segurança, sorrir sem preocupação ou deixar uma prótese desconfortável para trás pode fazer diferença na rotina. Se você estiver pensando em cuidar disso, podemos primeiro entender sua situação e orientar o próximo passo com calma.',variables:['{{1}} primeiro_nome'],when_to_use:'Quando o tema já tem relação com qualidade de vida declarada pelo paciente.',when_not_to_use:'Não usar para presumir sofrimento que a pessoa não declarou.',next_best_action:'QUALIFICAR',status:'READY_FOR_RD'},
    {id:'mkt-edu',group:'MARKETING',version:'C',goal:'EDUCACAO',meta_category:'MARKETING',name_rd:'ultra_estrutura_avaliacao_v1',text:'Oi, {{1}}. Quando falamos de reabilitação oral, planejamento é uma etapa importante. Na Ultra, a avaliação pode contar com recursos de diagnóstico e planejamento conforme a necessidade do caso. Se quiser, posso te explicar como funciona essa primeira etapa.',variables:['{{1}} primeiro_nome'],when_to_use:'Quando estrutura e planejamento ajudam a reduzir incerteza.',when_not_to_use:'Não usar como promessa de exame ou tratamento específico.',next_best_action:'EXPLICAR',status:'READY_FOR_RD'},
    {id:'fu-conv',group:'FOLLOW_UP',version:'A',goal:'CONVERSAO',meta_category:'MARKETING',name_rd:'ultra_followup_contexto_v1',text:'Oi, {{1}}. Estou retomando nossa conversa porque você comentou sobre {{2}}. Como esse parecia ser um ponto importante para você, queria saber se ficou alguma dúvida que eu possa ajudar a esclarecer.',variables:['{{1}} primeiro_nome','{{2}} contexto_real'],when_to_use:'Quando existe contexto real registrado.',when_not_to_use:'Nunca preencher {{2}} com texto genérico ou inventado.',next_best_action:'FOLLOW_UP',status:'READY_FOR_RD'},
    {id:'fu-hum',group:'FOLLOW_UP',version:'B',goal:'HUMANIZACAO',meta_category:'MARKETING',name_rd:'ultra_followup_humano_v1',text:'Oi, {{1}}. Lembrei do que você comentou sobre {{2}}. Não quero te pressionar, mas deixo o canal aberto caso ainda exista alguma dúvida ou algo que esteja dificultando o próximo passo.',variables:['{{1}} primeiro_nome','{{2}} contexto_real'],when_to_use:'Retomadas delicadas, medo, experiência ruim ou decisão compartilhada.',when_not_to_use:'Quando a pessoa solicitou explicitamente encerramento.',next_best_action:'FOLLOW_UP',status:'READY_FOR_RD'},
    {id:'fu-edu',group:'FOLLOW_UP',version:'C',goal:'EDUCACAO',meta_category:'MARKETING',name_rd:'ultra_followup_duvida_v1',text:'Oi, {{1}}. Na nossa conversa você ficou com uma dúvida sobre {{2}}. Se isso ainda estiver pesando na decisão, posso explicar esse ponto com mais calma antes de você pensar em qualquer próximo passo.',variables:['{{1}} primeiro_nome','{{2}} dúvida_real'],when_to_use:'Quando uma dúvida real ficou pendente.',when_not_to_use:'Não inventar dúvida para gerar contato.',next_best_action:'EXPLICAR',status:'READY_FOR_RD'},
    {id:'rea-conv',group:'REAGENDAMENTO',version:'A',goal:'CONVERSAO',meta_category:'UTILITY',name_rd:'ultra_reagendamento_opcoes_v1',text:'Oi, {{1}}. Precisamos reorganizar sua avaliação na Ultra. Posso verificar uma nova opção para você. Prefere um horário pela manhã ou à tarde?',variables:['{{1}} primeiro_nome'],when_to_use:'Quando existe avaliação real a ser reorganizada.',when_not_to_use:'Não usar se não houver agendamento prévio.',next_best_action:'REMARCAR',status:'READY_FOR_RD'},
    {id:'rea-hum',group:'REAGENDAMENTO',version:'B',goal:'HUMANIZACAO',meta_category:'UTILITY',name_rd:'ultra_reagendamento_humano_v1',text:'Oi, {{1}}. Tudo bem? Sua avaliação não conseguiu acontecer como estava prevista. Se ainda fizer sentido para você, posso te ajudar a encontrar uma nova data que fique mais confortável para sua rotina.',variables:['{{1}} primeiro_nome'],when_to_use:'Reagendamento em que reduzir pressão é importante.',when_not_to_use:'Quando a pessoa pediu encerramento do contato.',next_best_action:'REMARCAR',status:'READY_FOR_RD'},
    {id:'rea-edu',group:'REAGENDAMENTO',version:'C',goal:'EDUCACAO',meta_category:'MARKETING_REVIEW',name_rd:'ultra_recuperacao_avaliacao_v1',text:'Oi, {{1}}. Vi que não conseguimos realizar sua avaliação em {{2}}. Espero que esteja tudo bem. Se aconteceu algum imprevisto, posso te ajudar a reorganizar o próximo passo sem precisar começar tudo de novo.',variables:['{{1}} primeiro_nome','{{2}} data'],when_to_use:'Recuperação após falta, quando permitido pela política vigente.',when_not_to_use:'Confirmar enquadramento e aprovação no RD/Meta antes de ativar.',next_best_action:'REMARCAR',status:'DRAFT'}
  ];

  const EMPTY_MEMORY={version:3,subject:{relationship:'',patientRole:'',speakerRole:''},observedFacts:[],inferredFacts:[],unknowns:[],motivations:[],barriers:[],suggestedQuestions:[],askedQuestions:[],suggestedAnswers:[],sentAnswers:[],suggestedActions:[],confirmedActions:[],commitments:[],clinicalFlags:[],currentState:null,turns:[]};

  function clone(x){return JSON.parse(JSON.stringify(x));}
  function strip(s=''){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
  function norm(s=''){
    let x=strip(s).replace(/[^a-z0-9\s?!.]/g,' ').replace(/\s+/g,' ');
    const fixes={
      'oço':'osso','oco':'osso','dentadua':'dentadura','anestecia':'anestesia','convenio':'convenio','implanti':'implante','protese':'protese','diabeti':'diabetes','avaliacao':'avaliacao','zigomatico':'zigomatico'
    };
    return x.split(' ').map(w=>fixes[w]||w).join(' ');
  }
  function has(n,parts){return parts.some(p=>n.includes(strip(p)));}
  function uniq(a){return [...new Set((a||[]).filter(Boolean))];}

  function extractContext(text){
    const n=norm(text), c={speakerRole:'self_or_unknown',patientRole:'self_or_unknown',relationship:'',facts:[],inferences:[],unknowns:[],motivation:'',barrier:'',commitment:null,hasDentalSignal:false};
    const rels=[['mae','mãe'],['pai','pai'],['tio','tio'],['tia','tia'],['avo','avó/avô'],['marido','marido'],['esposa','esposa'],['filho','filho'],['filha','filha'],['irmao','irmão'],['irma','irmã'],['amigo','amigo'],['amiga','amiga']];
    for(const [key,label] of rels){if(n.includes(`meu ${key}`)||n.includes(`minha ${key}`)){c.relationship=label;c.patientRole=label;c.speakerRole='familiar_or_third_party';c.facts.push(`Paciente mencionado: ${label}.`);break;}}
    if(has(n,['implante','dente','dentadura','protese','osso','clareamento','faceta','lente','gengiva','mastig','cirurgia','anestesia'])) c.hasDentalSignal=true;
    if(has(n,['medo','receio','pavor','trauma'])){c.barrier='medo';c.facts.push('A pessoa declarou medo ou receio.');c.unknowns.push('Qual aspecto gera mais medo?');}
    if(has(n,['caro','preco','valor','quanto custa','quanto fica'])) c.inferences.push('Preço pode ser uma dúvida ou barreira, mas isso ainda precisa ser confirmado.');
    if(has(n,['voltar a comer','mastigar melhor','comer carne'])){c.motivation='melhorar mastigação';c.facts.push('Motivação funcional declarada: melhorar mastigação.');}
    if(has(n,['nao tenho osso','sem osso','pouco osso'])){c.facts.push('Relato de pouca disponibilidade óssea.');c.unknowns.push('Existe exame ou avaliação recente?');}
    if(has(n,['uso dentadura','usa dentadura','uso protese','usa protese'])) c.facts.push('Uso de prótese removível/dentadura foi mencionado.');
    if(has(n,['me chama sexta','me chama mes que vem','retorna sexta','retorne sexta'])) c.commitment={type:'follow_up',source:'patient',raw:text,status:'pending'};
    return c;
  }

  function route(text,context){
    const n=norm(text), secondary=[];
    if(context.relationship) secondary.push({id:'FAMILY',label:'Familiar/terceiro'});
    if(context.barrier==='medo') secondary.push({id:'FEAR',label:'Medo'});
    if(has(n,['sangrando muito','sangramento intenso','falta de ar','desmaiei','desmaiou','reacao alergica','reação alérgica'])) return {id:'URGENCY',label:'Atenção clínica',confidence:'HIGH',secondary};
    if(has(n,['convenio','plano','unimed','amil','odontoprev','bradesco saude'])) return {id:'INSURANCE',label:'Convênio / atendimento particular',confidence:'HIGH',secondary};
    if(has(n,['qual endereco','onde fica','localizacao','como chegar'])) return {id:'ADDRESS',label:'Localização',confidence:'HIGH',secondary};
    if(has(n,['nao quero marcar','não quero marcar'])) return {id:'NO_SCHEDULE',label:'Sem intenção de agendar agora',confidence:'HIGH',secondary};
    if(has(n,['quero marcar','quero agendar','tem horario amanha','tem horario','marcar avaliacao','agendar avaliacao'])) return {id:'SCHEDULE',label:'Agendamento',confidence:'HIGH',secondary};
    if(has(n,['abre sabado','horario de atendimento','que horas abre','que horas fecha'])) return {id:'HOURS',label:'Horário',confidence:'HIGH',secondary};
    if(has(n,['faltei','nao fui na consulta','não fui na consulta'])) return {id:'NOSHOW',label:'No-show',confidence:'HIGH',secondary};
    if(has(n,['me chama sexta','me chama mes que vem','me chama mês que vem'])) return {id:'RETURN_DATE',label:'Retorno combinado',confidence:'HIGH',secondary};
    if(n==='oi'||n==='ola'||n==='olá'||n==='bom dia'||n==='boa tarde'||n==='boa noite') return {id:'HELLO',label:'Primeiro contato',confidence:'HIGH',secondary};
    if(has(n,['amigo banguelo','amiga banguela'])&&!has(n,['meu amigo','minha amiga','precisa','quer implante','quer dente','tratamento'])) return {id:'OUT_OF_SCOPE',label:'Fora do contexto odontológico',confidence:'HIGH',secondary};
    if(has(n,['diabetes','diabetico','marevan','varfarina','anticoagulante','osteoporose'])) return {id:'CLINICAL',label:'Dúvida clínica individual',confidence:'HIGH',secondary};
    if(has(n,['nao tenho osso','sem osso','pouco osso','zigomatico'])) return {id:'LOW_BONE',label:'Relato de pouco osso',confidence:'HIGH',secondary};
    if(context.barrier==='medo') return {id:'FEAR',label:'Medo / insegurança',confidence:'HIGH',secondary};
    if(has(n,['quanto custa','quanto fica','preco','valor','caro'])) return {id:'PRICE',label:'Preço / investimento',confidence:'HIGH',secondary};
    if(has(n,['dentadura','protese removivel','chapa'])) return {id:'PROSTHESIS',label:'Prótese / dentadura',confidence:'HIGH',secondary};
    if(has(n,['precisa colocar um dente','preciso colocar um dente','quero colocar um dente'])) return {id:'TOOTH_REPLACEMENT',label:'Substituição de um dente',confidence:'HIGH',secondary};
    if(has(n,['perdi um dente','to sem um dente','estou sem um dente'])) return {id:'ONE_TOOTH',label:'Ausência de um dente',confidence:'HIGH',secondary};
    if(context.relationship&&context.hasDentalSignal) return {id:'FAMILY',label:'Familiar buscando orientação',confidence:'MEDIUM',secondary};
    if(context.hasDentalSignal) return {id:'DENTAL_GENERAL',label:'Dúvida odontológica',confidence:'MEDIUM',secondary};
    return {id:'AMBIGUOUS',label:'Precisa de contexto',confidence:'LOW',secondary};
  }

  function factMatch(text){const n=norm(text);return FACTS.find(f=>(f.keywords||[]).some(k=>n.includes(strip(k))))||null;}
  function faqMatch(text){const n=norm(text);return FAQ.find(f=>(f.keys||[]).some(k=>n.includes(strip(k))))||null;}
  function who(c){if(!c.relationship)return 'você';const feminine=['mãe','tia','avó','esposa','filha','irmã','amiga'];const poss=feminine.includes(c.patientRole)?'sua':'seu';return `${poss} ${c.patientRole}`;}

  function buildResponse(intent,c,text,name=''){
    const g=name?`${name}, `:''; const target=who(c);
    switch(intent.id){
      case 'URGENCY': return {answer:`${g}se há sangramento intenso, falta de ar, desmaio ou reação importante, a prioridade é segurança e avaliação profissional imediata.`,question:'',action:'ESCALAR_CLINICO',register:'Registrar apenas o necessário e orientar atendimento clínico/urgência conforme o caso.',state:'URGENCIA',safety:['Modo comercial desligado. Não diagnosticar nem prescrever.'],source:'Guardrail clínico ULTRA'};
      case 'INSURANCE': return {answer:`${g}a Ultra trabalha com atendimento particular.`,question:'Se quiser, posso te explicar como funciona a avaliação.',action:'RESPONDER',register:'Registrar somente se a informação for relevante para a continuidade.',state:'EXPLORING',source:'Fato institucional ULTRA'};
      case 'ADDRESS': {const f=factMatch(text);return {answer:f?f.answer:'A Ultra fica em Osasco/SP.',question:'',action:'RESPONDER',register:'Nenhum registro obrigatório.',state:'EXPLORING',source:f?.source||'Fato institucional ULTRA'};}
      case 'HOURS': return {answer:'O horário precisa seguir a informação operacional vigente da clínica. Para sábado ou horários especiais, confirme antes de prometer.',question:'',action:'RESPONDER',register:'Nenhum registro obrigatório.',state:'EXPLORING',source:'Fato institucional ULTRA'};
      case 'SCHEDULE': return {answer:`${g}claro. Se você já quer avançar para a avaliação, não precisamos alongar a conversa.`,question:'Qual período costuma funcionar melhor para você: manhã ou tarde?',action:'AGENDAR',register:'Registrar intenção de agendamento e o horário efetivamente combinado.',state:'READY_TO_SCHEDULE',source:'Método ULTRA'};
      case 'NO_SCHEDULE': return {answer:`${g}tudo bem. Não vou te pressionar a marcar agora.`,question:'Se quiser, posso apenas esclarecer a dúvida que trouxe você até aqui.',action:'RESPONDER',register:'Registrar apenas se houver um próximo passo real combinado.',state:'POSTPONING',source:'Método ULTRA'};
      case 'NOSHOW': return {answer:`${g}vi que a avaliação não aconteceu. Espero que esteja tudo bem.`,question:'Aconteceu algum imprevisto que eu precise considerar antes de procurar outra data?',action:'RESCHEDULE',register:'Registrar o motivo real, se informado, e a nova ação combinada.',state:'BLOCKED',source:'Método ULTRA'};
      case 'RETURN_DATE': return {answer:`${g}combinado. Vamos respeitar o período que você pediu.`,question:'',action:'FOLLOW_UP',register:'Registrar o período/data solicitada pelo paciente.',state:'POSTPONING',source:'Método ULTRA'};
      case 'HELLO': return {answer:`${g}oi! Seja bem-vindo(a) à Ultra.`,question:'O que fez você procurar a gente hoje?',action:'ASK',register:'Registrar o interesse quando ficar claro.',state:'EXPLORING',source:'Método ULTRA'};
      case 'OUT_OF_SCOPE': return {answer:'Se a sua dúvida for sobre atendimento da Ultra ou odontologia, posso te ajudar por aqui.',question:'',action:'ANSWER',register:'Nenhum registro necessário.',state:'OUT_OF_SCOPE',source:'Método ULTRA'};
      case 'CLINICAL': {const f=faqMatch(text);return {answer:f?f.answer:`${g}posso explicar o que normalmente é avaliado, mas uma decisão individual depende do cirurgião-dentista.`,question:'Se quiser, posso te explicar qual costuma ser o próximo passo para avaliar isso com segurança.',action:'ESCALATE_CLINICAL',register:'Registrar a dúvida clínica se ela interferir na continuidade.',state:'CONSIDERING',source:'Base clínica ULTRA',safety:['Não transformar informação geral em autorização, diagnóstico ou contraindicação individual.']};}
      case 'LOW_BONE': return {answer:`${g}entendi. Ter ouvido que há pouco osso não permite concluir por mensagem qual tratamento é indicado. Existem possibilidades diferentes, e o especialista precisa avaliar o caso e os exames.`,question:`${c.relationship?`Você sabe se ${target} tem`:'Você tem'} tomografia ou algum exame recente?`,action:'ASK',register:'Registrar o relato de pouco osso e existência/data de exames quando informado.',state:'BLOCKED',source:'Base clínica ULTRA',safety:['Não indicar zigomático, enxerto ou outro tratamento sem avaliação.']};
      case 'FEAR': return {answer:`${g}é importante levar esse receio a sério, sem prometer que “não vai doer”.`,question:`O que mais preocupa ${c.relationship?target:'você'}: dor, anestesia, a cirurgia ou alguma experiência anterior?`,action:'ASK',register:'Registrar o medo específico quando ficar claro.',state:'BLOCKED',source:'Método ULTRA'};
      case 'PRICE': return {answer:`${g}o valor é uma informação importante, mas depende do que realmente precisa ser feito. Eu não quero te orientar com um número que não corresponda à situação.`,question:'Estamos falando de um dente, alguns dentes ou uma reabilitação maior?',action:'ASK',register:'Registrar que preço surgiu como tema; não assumir que é a objeção principal.',state:'CONSIDERING',source:'Método ULTRA'};
      case 'PROSTHESIS': return {answer:`${g}entendi${c.relationship?`, é sobre ${target}`:''}. Como já existe uso de dentadura/prótese, o mais útil é entender o que realmente pesa na rotina.`,question:`O que mais incomoda ${c.relationship?target:'você'} hoje: mastigação, movimento, conforto, segurança ou aparência?`,action:'ASK',register:'Registrar principal incômodo e objetivo.',state:'CONSIDERING',source:'Método ULTRA'};
      case 'TOOTH_REPLACEMENT': return {answer:`${g}entendi${c.relationship?`, é para ${target}`:''}. Você mencionou a necessidade de colocar ou substituir um dente, mas ainda não dá para assumir qual tratamento é o indicado.`,question:`Você sabe se ${c.relationship?target:'esse dente'} já perdeu esse dente ou se algum dentista já orientou a substituição?`.replace('se esse dente já perdeu esse dente','se esse dente já foi perdido'),action:'ASK',register:`${c.relationship?`Registrar que ${target} é o paciente. `:''}Registrar necessidade inicial de substituir um dente sem assumir indicação.`,state:'CONSIDERING',source:'Método ULTRA'};
      case 'ONE_TOOTH': return {answer:`${g}entendi${c.relationship?`, é sobre ${target}`:''}. Para orientar sem assumir tratamento, vale entender melhor o contexto dessa ausência.`,question:`Faz quanto tempo que ${c.relationship?target:'você'} está sem esse dente?`,action:'ASK',register:'Registrar tempo aproximado e impacto quando informado.',state:'CONSIDERING',source:'Método ULTRA'};
      case 'FAMILY': return {answer:`${g}entendi, você está buscando orientação para ${target}.`,question:'O que está acontecendo com essa pessoa hoje e o que vocês gostariam de entender primeiro?',action:'ASK',register:`Registrar que ${target} é o paciente e quem participa da decisão.`,state:'CONSIDERING',source:'Método ULTRA'};
      case 'DENTAL_GENERAL': return {answer:`${g}posso te orientar por aqui sem assumir diagnóstico ou tratamento antes da avaliação.`,question:'O que você gostaria de entender primeiro sobre essa situação?',action:'ASK',register:'Registrar apenas fatos realmente informados.',state:'CONSIDERING',source:'Método ULTRA'};
      default: return {answer:'Não quero adivinhar o que você quis dizer.',question:'Pode me explicar em uma frase o que você gostaria de resolver?',action:'ASK',register:'Não registrar hipótese como fato.',state:'NEEDS_CONTEXT',source:'Método ULTRA'};
    }
  }

  function updateContextFromMemory(c,m){
    if(!c.relationship&&m?.subject?.relationship){c.relationship=m.subject.relationship;c.patientRole=m.subject.patientRole||m.subject.relationship;c.speakerRole=m.subject.speakerRole||'familiar_or_third_party';}
    return c;
  }
  function sameQuestion(q,asked){const a=strip(q);return (asked||[]).some(x=>strip(x)===a);}
  function analyze(text,opts={}){
    const memory=opts.memory||clone(EMPTY_MEMORY); const c=updateContextFromMemory(extractContext(text),memory); const intent=route(text,c); const r=buildResponse(intent,c,text,opts.name||'');
    if(r.question&&sameQuestion(r.question,memory.askedQuestions)){r.question=''; if(r.action==='ASK') r.action='ANSWER';}
    return {id:`analysis-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,createdAt:new Date().toISOString(),raw:text,agent:opts.agent||'',patientName:opts.name||'',intent:intent.id,intentLabel:intent.label,secondaryIntents:intent.secondary||[],confidence:intent.confidence,state:r.state,answer:r.answer,question:r.question||'',action:r.action,register:r.register||'',source:r.source||'Método ULTRA',safety:r.safety||[],known:uniq([...(memory.observedFacts||[]),...(c.facts||[])]),unknowns:c.unknowns||[],motivation:c.motivation||'',barrier:c.barrier||'',context:c};
  }

  function newMemory(){return clone(EMPTY_MEMORY);}
  function observePatient(memory,a){const m=clone(memory||EMPTY_MEMORY),c=a.context||{};if(c.relationship){m.subject={relationship:c.relationship,patientRole:c.patientRole,speakerRole:c.speakerRole};}m.observedFacts=uniq([...m.observedFacts,...(c.facts||[])]).slice(-50);m.inferredFacts=uniq([...m.inferredFacts,...(c.inferences||[])]).slice(-30);m.unknowns=uniq([...m.unknowns,...(c.unknowns||[])]).slice(-30);if(c.motivation)m.motivations=uniq([...m.motivations,c.motivation]);if(c.barrier)m.barriers=uniq([...m.barriers,c.barrier]);if(c.commitment)m.commitments=[...m.commitments,{...c.commitment,timestamp:new Date().toISOString()}].slice(-20);m.currentState=a.state;m.turns=[...m.turns,{id:`patient-${Date.now()}`,role:'patient',text:a.raw,timestamp:new Date().toISOString(),extractedFacts:c.facts||[],inferredSignals:c.inferences||[]}].slice(-100);return m;}
  function recordSuggestions(memory,a){const m=clone(memory);if(a.question)m.suggestedQuestions=uniq([...m.suggestedQuestions,a.question]).slice(-30);if(a.answer)m.suggestedAnswers=uniq([...m.suggestedAnswers,a.answer]).slice(-30);if(a.action)m.suggestedActions=uniq([...m.suggestedActions,a.action]).slice(-30);return m;}
  function confirmQuestion(memory,text){const m=clone(memory),v=String(text||'').trim();if(!v)return m;m.askedQuestions=uniq([...m.askedQuestions,v]).slice(-40);m.turns=[...m.turns,{id:`attendant-${Date.now()}`,role:'attendant',kind:'question',text:v,timestamp:new Date().toISOString(),confirmed:true}].slice(-100);return m;}
  function confirmAnswer(memory,text){const m=clone(memory),v=String(text||'').trim();if(!v)return m;m.sentAnswers=uniq([...m.sentAnswers,v]).slice(-40);m.turns=[...m.turns,{id:`attendant-${Date.now()}`,role:'attendant',kind:'answer',text:v,timestamp:new Date().toISOString(),confirmed:true}].slice(-100);return m;}
  function confirmAction(memory,action){const m=clone(memory),v=String(action||'').trim();if(!v)return m;m.confirmedActions=[...m.confirmedActions,{action:v,timestamp:new Date().toISOString()}].slice(-40);return m;}

  function parseCSV(text){
    const first=(text.split(/\r?\n/)[0]||''); const delim=(first.match(/;/g)||[]).length>(first.match(/,/g)||[]).length?';':','; const rows=[];let row=[],cell='',q=false;
    for(let i=0;i<text.length;i++){const ch=text[i],nx=text[i+1];if(ch==='"'){if(q&&nx==='"'){cell+='"';i++;}else q=!q;}else if(ch===delim&&!q){row.push(cell);cell='';}else if((ch==='\n'||ch==='\r')&&!q){if(ch==='\r'&&nx==='\n')i++;row.push(cell);cell='';if(row.some(x=>x.trim()))rows.push(row);row=[];}else cell+=ch;}
    if(cell||row.length){row.push(cell);rows.push(row);} const headers=(rows.shift()||[]).map(x=>x.trim()); return {headers,rows:rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]||''])))};
  }
  function guess(headers){const find=(terms)=>headers.find(h=>terms.some(t=>strip(h).includes(t)))||'';return {message:find(['mensagem','message','texto','conteudo']),agent:find(['atendente','responsavel','responsável','agent']),author:find(['autor','author','tipo','remetente']),date:find(['data','date','hora'])};}

  return {VERSION,FACTS,FAQ,TEMPLATES,EMPTY_MEMORY,newMemory,norm,extractContext,route,analyze,observePatient,recordSuggestions,confirmQuestion,confirmAnswer,confirmAction,parseCSV,guess,clone,strip};
});
