(function(root){
  'use strict';
  const CONFIG={
    url:'https://yoedvpicdzbiznvgyszi.supabase.co',
    publishableKey:'sb_publishable_j7fRx2IPSVqyDYx7xgtFnw_KQPbG1PE'
  };
  const SESSION_KEY='ultra-base-supabase-session-v1';
  const CURRENT_CONV_KEY='ultra-base-current-conversation-v1';
  const safeParse=(s,f=null)=>{try{return JSON.parse(s)}catch{return f}};
  class UltraSupabase {
    constructor(){this.config=CONFIG;this.session=safeParse(localStorage.getItem(SESSION_KEY),null);}
    get connected(){return !!(this.session&&this.session.access_token&&this.session.user);}
    get user(){return this.session?.user||null;}
    get currentConversationId(){return localStorage.getItem(CURRENT_CONV_KEY)||'';}
    set currentConversationId(v){v?localStorage.setItem(CURRENT_CONV_KEY,v):localStorage.removeItem(CURRENT_CONV_KEY);}
    _headers(extra={}){const h={'apikey':CONFIG.publishableKey,'Content-Type':'application/json',...extra};if(this.session?.access_token)h.Authorization=`Bearer ${this.session.access_token}`;return h;}
    async _json(url,options={}){const r=await fetch(url,options);const text=await r.text();const data=text?safeParse(text,text):null;if(!r.ok){const e=new Error(data?.message||data?.error_description||data?.error||`HTTP ${r.status}`);e.status=r.status;e.payload=data;throw e;}return data;}
    async signIn(email,password){
      const data=await this._json(`${CONFIG.url}/auth/v1/token?grant_type=password`,{method:'POST',headers:this._headers(),body:JSON.stringify({email,password})});
      this.session={access_token:data.access_token,refresh_token:data.refresh_token,expires_at:Math.floor(Date.now()/1000)+(data.expires_in||3600),user:data.user};
      localStorage.setItem(SESSION_KEY,JSON.stringify(this.session));return this.session;
    }
    async refresh(){if(!this.session?.refresh_token)throw new Error('Sessão ausente.');const data=await this._json(`${CONFIG.url}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:this._headers(),body:JSON.stringify({refresh_token:this.session.refresh_token})});this.session={access_token:data.access_token,refresh_token:data.refresh_token||this.session.refresh_token,expires_at:Math.floor(Date.now()/1000)+(data.expires_in||3600),user:data.user||this.session.user};localStorage.setItem(SESSION_KEY,JSON.stringify(this.session));return this.session;}
    async ensureSession(){if(!this.connected)throw new Error('LOGIN_REQUIRED');if((this.session.expires_at||0)-60<Math.floor(Date.now()/1000))await this.refresh();return this.session;}
    async signOut(){try{if(this.session?.access_token)await fetch(`${CONFIG.url}/auth/v1/logout`,{method:'POST',headers:this._headers()});}catch{}this.session=null;localStorage.removeItem(SESSION_KEY);this.currentConversationId='';}
    async rest(path,{method='GET',body=null,headers={}}={}){await this.ensureSession();const opts={method,headers:this._headers(headers)};if(body!==null)opts.body=JSON.stringify(body);try{return await this._json(`${CONFIG.url}/rest/v1/${path}`,opts)}catch(e){if(e.status===401&&this.session?.refresh_token){await this.refresh();opts.headers=this._headers(headers);return this._json(`${CONFIG.url}/rest/v1/${path}`,opts)}throw e;}}
    async getProfile(){const rows=await this.rest(`profiles?id=eq.${encodeURIComponent(this.user.id)}&select=id,full_name,role,active`);return Array.isArray(rows)?rows[0]||null:null;}
    async createConversation(meta={}){const rows=await this.rest('conversations?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:{created_by:this.user.id,assigned_to:this.user.id,patient_first_name:meta.patientName||null,patient_ref:meta.patientRef||null,status:'open',conversation_state:meta.state||'EXPLORING',primary_intent:meta.primaryIntent||null,secondary_intents:meta.secondaryIntents||[],speaker_role:meta.speakerRole||null,patient_role:meta.patientRole||null,relationship:meta.relationship||null,confidence:meta.confidence||null,risk_level:meta.riskLevel||'normal'}});const c=rows?.[0];if(!c)throw new Error('Não foi possível criar a conversa.');this.currentConversationId=c.id;return c;}
    async ensureConversation(meta={}){if(this.currentConversationId){const rows=await this.rest(`conversations?id=eq.${encodeURIComponent(this.currentConversationId)}&select=*`);if(rows?.[0]&&rows[0].status!=='closed'&&rows[0].status!=='archived')return rows[0];this.currentConversationId='';}return this.createConversation(meta);}
    async updateConversation(id,patch){return this.rest(`conversations?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:patch});}
    async insertMessage(conversationId,{role,text,source='manual'}){const rows=await this.rest('messages?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:{conversation_id:conversationId,role,text,confirmed:true,sender_user_id:role==='attendant'?this.user.id:null,source}});return rows?.[0]||null;}
    async insertAnalysis(conversationId,messageId,a){const rows=await this.rest('analyses?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:{conversation_id:conversationId,source_message_id:messageId||null,primary_intent:a.intent||null,secondary_intents:(a.secondaryIntents||[]).map(x=>x.id||x),speaker_role:a.context?.speakerRole||null,patient_role:a.context?.patientRole||null,relationship:a.context?.relationship||null,observed_facts:a.known||a.context?.facts||[],inferred_facts:a.context?.inferences||[],unknowns:a.unknowns||a.context?.unknowns||[],motivations:a.context?.motivation?[a.context.motivation]:[],barriers:a.context?.barrier?[a.context.barrier]:[],readiness:a.state||null,risk:a.intent==='URGENCY'?'urgent':'normal',confidence:a.confidence||null,next_best_action:a.action||null,best_question:a.question||null,clinical_limit:!!(a.safety&&a.safety.length),raw_analysis:a}});return rows?.[0]||null;}
    async insertSuggestion(conversationId,analysisId,type,text){if(!text)return null;const rows=await this.rest('suggested_responses?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:{conversation_id:conversationId,analysis_id:analysisId||null,response_type:type,suggested_text:text}});return rows?.[0]||null;}
    async confirmSuggestion(id,actualText){if(!id)return null;return this.rest(`suggested_responses?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:{was_used:true,actual_sent_text:actualText,confirmed_by:this.user.id,confirmed_at:new Date().toISOString()}});}
    async insertAction(conversationId,action,description=''){return this.rest('confirmed_actions?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:{conversation_id:conversationId,action_type:action,description,performed_by:this.user.id,metadata:{source:'ultra_base'}}});}
    async upsertMemory(conversationId,m){return this.rest('conversation_memory?on_conflict=conversation_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:{conversation_id:conversationId,subject:m.subject||{},observed_facts:m.observedFacts||[],inferred_facts:m.inferredFacts||[],unknowns:m.unknowns||[],motivations:m.motivations||[],barriers:m.barriers||[],suggested_questions:m.suggestedQuestions||[],asked_questions:m.askedQuestions||[],suggested_answers:m.suggestedAnswers||[],sent_answers:m.sentAnswers||[],suggested_actions:m.suggestedActions||[],confirmed_actions:m.confirmedActions||[],commitments:m.commitments||[],clinical_flags:m.clinicalFlags||[],current_state:m.currentState||null}});}
    async getMemory(conversationId){const rows=await this.rest(`conversation_memory?conversation_id=eq.${encodeURIComponent(conversationId)}&select=*`);return rows?.[0]||null;}
    async getRecentMessages(limit=500){return this.rest(`messages?select=id,conversation_id,role,text,sender_user_id,created_at&order=created_at.desc&limit=${limit}`);}
    async getRecentAnalyses(limit=500){return this.rest(`analyses?select=id,conversation_id,primary_intent,secondary_intents,confidence,created_at,raw_analysis&order=created_at.desc&limit=${limit}`);}
    async getProfiles(){return this.rest('profiles?select=id,full_name,role,active&order=full_name.asc');}
    async getTemplates(){return this.rest('rd_templates?select=*&order=template_group.asc,version.asc');}
    async upsertTemplates(ts){const rows=ts.map(t=>({slug:t.id,name_rd:t.name_rd,template_group:t.group,version:t.version,goal:t.goal,meta_category:t.meta_category,text:t.text,variables:t.variables,when_to_use:t.when_to_use,when_not_to_use:t.when_not_to_use,next_best_action:t.next_best_action,status:t.status,created_by:this.user.id}));return this.rest('rd_templates?on_conflict=slug',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:rows});}
    async templateEvent(templateId,eventType,actualText=null,conversationId=null){return this.rest('template_events',{method:'POST',headers:{Prefer:'return=minimal'},body:{template_id:templateId,conversation_id:conversationId||null,user_id:this.user.id,event_type:eventType,actual_text:actualText}});}
  }
  root.UltraDB=new UltraSupabase();
  root.ULTRA_SUPABASE_CONFIG=Object.freeze({...CONFIG});
})(typeof globalThis!=='undefined'?globalThis:this);
