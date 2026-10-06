import {normalize} from './normalizer.js';

export function semanticCheck(text,intent,context){
  const n=normalize(text);
  if(context.social_out_of_scope && !['OUT_OF_SCOPE','AMBIGUOUS'].includes(intent.id)){
    return {score:0.1,level:'LOW',reason:'A frase parece social/fora de escopo e não sustenta uma leitura clínica.'};
  }
  if(intent.id==='ONE_TOOTH' && context.declared_need==='substituir/colocar um dente'){
    return {score:0.45,level:'MEDIUM',reason:'Há necessidade de um dente, mas não há confirmação de perda.'};
  }
  if(intent.id==='HELLO' && n.split(' ').length>4) return {score:0.4,level:'MEDIUM',reason:'Mensagem longa demais para ser tratada só como saudação.'};
  return {score:0.9,level:'HIGH',reason:'A intenção é coerente com a frase inteira.'};
}
