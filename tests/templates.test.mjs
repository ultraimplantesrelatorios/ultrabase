import fs from 'node:fs';
import {eq,ok} from './assert.mjs';
const t=JSON.parse(fs.readFileSync(new URL('../data/rd-templates.json',import.meta.url),'utf8'));
eq(t.length,12,'12 templates');
for(const g of ['INICIO_CONVERSA','MARKETING','FOLLOW_UP','REAGENDAMENTO']){const list=t.filter(x=>x.group===g);eq(list.length,3,`${g} count`);for(const goal of ['CONVERSAO','HUMANIZACAO','EDUCACAO'])ok(list.some(x=>x.goal===goal),`${g} missing ${goal}`)}
for(const x of t){ok(x.name_rd&&x.text&&x.when_to_use&&x.when_not_to_use&&x.meta_category,'template required fields');ok(!/última chance|garantido|100%/i.test(x.text),'unsafe wording')}
console.log('templates.test: PASS');
