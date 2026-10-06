import {extractContext} from '../lib/context-extractor.js';
import {eq,ok} from './assert.mjs';
let c=extractContext('meu tio precisa colocar um dente');eq(c.relationship,'tio','detect tio');eq(c.declared_need,'substituir/colocar um dente','declared need');ok(c.unknowns.length>0,'unknowns exist');
c=extractContext('minha tia quer implante mas tem medo');eq(c.relationship,'tia','detect tia');eq(c.barrier,'medo','detect fear');
c=extractContext('quero um amigo banguelo');ok(c.social_out_of_scope,'social out of scope');
c=extractContext('minha filha que me leva');eq(c.relationship,'filha','detect filha');eq(c.barrier,'logística','logistics barrier');
console.log('context.test: PASS');
