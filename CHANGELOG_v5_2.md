# ULTRA BASE v5.2.0 — Stability Release

## Correção principal
A v5.1 podia ficar visualmente carregada porém funcionalmente “morta” se qualquer módulo JavaScript, JSON ou cache do Service Worker falhasse no GitHub Pages. A v5.2 remove esse ponto único de falha.

## Mudanças
- runtime do frontend convertido para JavaScript clássico versionado (`ultra-core-v5.2.js` + `app-v5.2.js`);
- removida dependência de `type="module"` para inicialização;
- removida dependência de `fetch()` de JSON para o Copiloto iniciar;
- removida dependência de IndexedDB para o funcionamento principal;
- memória e análises passam a usar armazenamento local simples e tolerante a falhas;
- Service Workers antigos são desregistrados e caches `ultra-base-*` são limpos;
- nomes de arquivos versionados evitam reaproveitamento de JS antigo;
- inicialização possui tratamento de erro visível;
- 12 templates do RD incorporados ao runtime;
- preservada Memória V2: sugestão não vira evento;
- preservadas as quatro áreas: Copiloto, Inteligência, Milena e Base;
- preservados os fluxos de nova mensagem, limpar campo e nova conversa.

## Deploy
Subir os ARQUIVOS DE DENTRO da pasta/ZIP na raiz do repositório, com `index.html` na raiz.
