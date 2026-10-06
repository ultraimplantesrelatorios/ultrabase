import fs from 'node:fs';import path from 'node:path';import {ok} from './assert.mjs';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const db=fs.readFileSync(path.join(root,'supabase-v5.3.js'),'utf8');
const app=fs.readFileSync(path.join(root,'app-v5.3.js'),'utf8');
for(const token of ['sb_publishable_','signIn(email,password)','ensureConversation','insertMessage','insertAnalysis','insertSuggestion','confirmSuggestion','insertAction','upsertMemory','getRecentMessages','getTemplates','upsertTemplates'])ok(db.includes(token),`db layer missing ${token}`);
ok(!db.includes('sb_secret_'),'must not expose secret key');
ok(!db.includes('service_role'),'must not expose service_role');
for(const token of ['initDatabase','loadCloudData','restoreRemoteMemory','syncMemory','DB.insertMessage','DB.insertAnalysis','DB.upsertMemory'])ok(app.includes(token),`app integration missing ${token}`);
console.log('supabase-integration.test: PASS');
