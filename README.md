# Ultra Implantes — Central de Inteligência v2

Versão premium, nativa e editável para GitHub Pages.

## O que mudou nesta versão

- arquitetura em JavaScript nativo com módulos separados;
- armazenamento local em IndexedDB, mais robusto que localStorage;
- histórico de importações;
- proteção contra importação duplicada por fingerprint SHA-256;
- importação CSV com parser robusto, inclusive campos entre aspas e quebras de linha;
- wizard de importação em 4 etapas: arquivo → mapeamento → revisão → análise;
- detecção automática e edição manual das colunas do RD;
- dashboard responsivo com prioridades, qualidade e famílias operacionais;
- painel da Milena com Hoje, Atenção, Equipe e Evolução;
- comparação com importação anterior;
- Copiloto com confiança, contexto reconhecido, resposta sugerida e copiar resposta;
- biblioteca com filtros por categoria e busca;
- tema claro/escuro;
- PWA/offline básico com service worker;
- backup/restauração dos dados locais;
- exportação da análise em CSV;
- navegação otimizada para desktop e celular;
- acessibilidade básica: skip link, foco, labels, estrutura semântica e navegação responsiva.

## Estrutura

```text
/
├─ index.html
├─ styles.css
├─ config.js
├─ app.js
├─ scenarios.js
├─ scenarios.json
├─ manifest.webmanifest
├─ sw.js
├─ .nojekyll
├─ README.md
├─ lib/
│  ├─ storage.js
│  ├─ csv.js
│  ├─ analytics.js
│  └─ copilot.js
└─ assets/
   ├─ ultra-logo.png
   ├─ ultra-icon.png
   ├─ rd-conversas.png
   └─ rd-icon.png
```

## Onde editar sem quebrar

### Marca, nomes, cores e textos gerais
Edite `config.js`.

### Layout, margens, tamanhos e responsividade
Edite `styles.css`.

### Cenários e respostas
Edite `scenarios.js` ou gere novamente a partir da Base Mestre.

### Regras de análise das tarefas
Edite `lib/analytics.js`.

### Regras de interpretação do Copiloto
Edite `lib/copilot.js`.

### Importação CSV
Edite `lib/csv.js` somente se souber o que está fazendo.

### Banco local
`lib/storage.js` usa IndexedDB. Não altere a versão do banco sem planejar migração.

## Publicar no GitHub Pages

1. Envie **o conteúdo desta pasta** para a raiz do repositório.
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione `main` e `/root`.
5. Salve.
6. Aguarde o workflow terminar.

Não coloque a pasta inteira dentro de outra pasta se quiser que `index.html` abra na raiz do Pages.

## Atualizar uma versão publicada

Altere os arquivos no GitHub e faça commit. O GitHub Pages fará novo deploy automaticamente.

## Limpar cache quando fizer atualização grande

Esta versão usa Service Worker. Se o navegador mostrar versão antiga após um deploy:

- recarregue com `Ctrl + Shift + R`;
- ou abra DevTools → Application → Service Workers → Unregister;
- depois recarregue.

Quando mudar arquivos importantes, atualize também o nome `CACHE` no início de `sw.js`.

## Limite importante de segurança

Esta versão é **local-first e estática**. Ela pode ser usada para prototipação e análise local, mas GitHub Pages não é backend de produção para dados clínicos.

Antes de usar com dados sensíveis de pacientes em produção, implemente:

- autenticação individual;
- controle de permissões;
- backend seguro;
- banco protegido;
- criptografia em trânsito e em repouso;
- logs de auditoria;
- política de retenção e exclusão;
- adequação LGPD;
- integração oficial com RD por API/webhooks quando aplicável.

## Próxima etapa recomendada

A v2 já resolve a camada premium de front-end estático. A próxima versão de produção deve separar:

1. **Frontend** — esta interface.
2. **API** — autenticação, importações, regras e integrações.
3. **Banco** — pacientes, tarefas, negociações, conversas e resultados.
4. **Motor de IA** — contexto seguro, guardrails e auditoria.
5. **Integração RD** — tarefas, negociações, Conversas e eventos.

Assim a Central deixa de ser apenas uma ferramenta de análise e vira uma aplicação operacional real.
