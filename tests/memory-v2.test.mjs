import {analyze} from '../lib/engine.js';
import {emptyMemory,observePatientTurn,recordSuggestions,confirmQuestionSent,confirmAnswerSent,confirmAction,clearMemory,memorySummary} from '../lib/conversation-memory.js';
import {ok,eq} from './assert.mjs';

let memory=emptyMemory();

// 1. Patient message becomes an observed turn; suggestion does not become a real sent event.
const a1=analyze('uso dentadura',{memory});
memory=observePatientTurn(memory,a1);
memory=recordSuggestions(memory,a1);
let s=memorySummary(memory);
eq(s.turns.filter(t=>t.role==='patient').length,1,'patient turn observed');
eq(s.askedQuestions.length,0,'suggested question must not become asked');
eq(s.sentAnswers.length,0,'suggested answer must not become sent');
eq(s.confirmedActions.length,0,'suggested action must not become confirmed');
ok(s.facts.some(x=>/prótese removível/i.test(x)),'prosthesis fact preserved');

// 2. New patient message uses confirmed context from prior turn.
const a2=analyze('ela solta quando como',{memory});
eq(a2.intent,'PROSTHESIS','second message should use previous prosthesis context');
memory=observePatientTurn(memory,a2);

// 3. Confirming a question makes it real; a suggestion alone does not.
const suggested=a1.question;
memory=confirmQuestionSent(memory,suggested);
s=memorySummary(memory);
ok(s.askedQuestions.includes(suggested),'confirmed question recorded');
ok(s.turns.some(t=>t.role==='attendant'&&t.kind==='question'&&t.confirmed),'confirmed question turn recorded');

// 4. Edited response saves the actual edited version.
const edited='Entendi. Me conta como essa prótese interfere na mastigação hoje.';
memory=confirmAnswerSent(memory,edited);
s=memorySummary(memory);
ok(s.sentAnswers.includes(edited),'edited sent answer stored');
ok(!s.sentAnswers.includes(a1.answer)||a1.answer===edited,'suggested answer not auto stored as sent');

// 5. Confirmed action only after explicit confirmation.
memory=confirmAction(memory,'FOLLOW_UP','ligação realizada');
s=memorySummary(memory);
eq(s.confirmedActions.at(-1).action,'FOLLOW_UP','confirmed action stored');

// 6. Fact x inference: price is observed; financial barrier not auto confirmed as fact.
let m2=emptyMemory();
const p=analyze('quero saber preço',{memory:m2});
m2=observePatientTurn(m2,p);
const s2=memorySummary(m2);
ok(s2.facts.some(x=>/preço|necessidade|preco/i.test(x)) || p.intent==='PRICE','price recognized');
ok(!s2.facts.some(x=>/objeção principal|barreira financeira principal/i.test(x)),'price not promoted to primary barrier fact');

// 7. Compound message preserves multiple signals.
let m3=emptyMemory();
const c=analyze('Tenho 68 anos, uso dentadura, falaram que não tenho osso e tenho medo.',{memory:m3});
m3=observePatientTurn(m3,c);
const s3=memorySummary(m3);
ok(s3.facts.some(x=>/68 anos/i.test(x)),'age preserved');
ok(s3.facts.some(x=>/prótese removível/i.test(x)),'prosthesis preserved');
ok(s3.facts.some(x=>/óssea|ossea/i.test(x)),'bone signal preserved');
ok(s3.facts.some(x=>/medo/i.test(x)),'fear preserved');

// 8. New conversation clears all context, preventing leakage.
const cleared=clearMemory();
const s4=memorySummary(cleared);
eq(s4.turns.length,0,'turns cleared');
eq(s4.facts.length,0,'facts cleared');
eq(s4.askedQuestions.length,0,'asked questions cleared');
const b=analyze('quero clareamento',{memory:cleared});
ok(!b.known.some(x=>/dentadura|prótese removível/i.test(x)),'patient A context must not leak to patient B');

console.log('memory-v2.test: PASS');
