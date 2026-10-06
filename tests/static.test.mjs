import fs from 'node:fs';import path from 'node:path';import {ok} from './assert.mjs';
const root=path.resolve(new URL('..',import.meta.url).pathname);const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const f of ['styles.css','ultra-core-v5.2.js','supabase-v5.3.js','app-v5.3.js','assets/ultra-logo.png','assets/ultra-icon.png','manifest.webmanifest'])ok(fs.existsSync(path.join(root,f)),`missing ${f}`);
for(const token of ['Templates RD','templateModal','milenaTabs','conversationFile','authBackdrop','dbStatus','accountBtn'])ok(html.includes(token),`index missing ${token}`);
console.log('static.test: PASS');
