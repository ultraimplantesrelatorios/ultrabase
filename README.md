# ULTRA BASE PRO v4.0.0

Versão de início de uso e teste do **Método ULTRA**.

## O que mudou
- interface reduzida a quatro áreas: **Copiloto, Inteligência, Milena e Base**;
- removido o conceito de “mini-RD”; o RD continua sendo o sistema operacional do CRM;
- Copiloto universal com normalização de erros de escrita e roteamento por intenção;
- fatos oficiais da Ultra separados de conhecimento clínico e cenários;
- estados de conversa e próxima melhor ação;
- urgência desliga condução comercial;
- análise opcional de CSV de conversas com mapeamento simples;
- painel da Milena mostra somente oportunidades de coaching e padrões;
- IndexedDB para guardar análises e amostras localmente;
- PWA, health check e deploy GitHub Pages.

## Uso
Abra `index.html` via servidor local ou publique no GitHub Pages. No Copiloto, cole somente o contexto necessário da conversa. A análise salva localmente no navegador para formar a amostra de teste.

### Importar conversas
Em **Inteligência → Importar conversas**, selecione um CSV. Confirme qual coluna é Mensagem e, se existirem, Atendente, Autor/tipo e Data. Sem esses campos a ULTRA BASE não inventa autoria nem desempenho individual.

## GitHub Pages
1. Envie o conteúdo desta pasta para a raiz do repositório.
2. `Settings → Pages → Source → GitHub Actions`.
3. O workflow `.github/workflows/deploy-pages.yml` fará o deploy.
4. Teste `/health.html` após publicação.

## Segurança
Esta versão é **local-first** e adequada para teste sem dados sensíveis. Não coloque tokens do RD, senhas ou prontuários no GitHub. Para vários usuários, dados sensíveis, sincronização ou integração automática com RD, use backend autenticado e desenho LGPD adequado.

## Fontes institucionais usadas na base factual
- Contexto Mestre de Produção da Ultra;
- site oficial `ultraimplantes.com.br` consultado em 05/10/2026 para endereço, contato, horário e estrutura declarada.

## Testes
Com Node instalado:

```bash
npm test
```

A suíte atual verifica intenções essenciais, inclusive erros como `oço`, `anestecia`, `dentadua` e `diabeti`.

## Arquivos principais
- `app.js`: interface e fluxo;
- `lib/engine.js`: inteligência de atendimento;
- `lib/normalizer.js`: normalização de linguagem;
- `lib/insights.js`: padrões para Milena;
- `data/ultra-facts.js`: fatos institucionais confirmados;
- `data/knowledge.js`: FAQ clínica segura;
- `data/scenarios.json`: cenários herdados da Base Mestre;
- `COMANDO_MESTRE_PRODUCAO.md`: regra de evolução do produto.
