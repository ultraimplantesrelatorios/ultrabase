# TEST REPORT — ULTRA BASE v5.0.0

Data: 05/10/2026

## Resultado executivo

**STATUS: APROVADA PARA TESTE OPERACIONAL CONTROLADO**

A versão passou nas suítes automatizadas disponíveis para esta entrega e está preparada para homologação da diretoria clínica, comercial e técnica.

Isto não significa que a IA esteja “pronta para nunca errar”. O critério adotado é: erros conhecidos foram convertidos em regras e testes, e novos erros encontrados na homologação devem virar regressão antes da próxima publicação.

## Suítes automatizadas

Resultado de `npm test`:

- `context.test`: PASS
- `router.test`: 13 casos PASS
- `engine.test`: PASS
- `templates.test`: PASS
- `static.test`: PASS
- `adversarial.test`: 25 casos PASS
- **6 suítes executadas / 6 aprovadas**

## Casos adversariais cobertos

Entre os casos testados:

- vcs atendem convenio?
- aceita unimed?
- qual endereco?
- abre sabado?
- qual whatsapp?
- tem estacionamento?
- aceita pix?
- quero um amigo banguelo
- meu tio precisa colocar um dente
- minha mãe usa dentadura
- minha tia quer implante mas tem medo
- me disseram que nao tenho oço
- tenho diabeti posso fazer implante
- uso marevan
- quero marcar
- tem horario amanha?
- nao quero marcar nada
- me chama mes que vem
- faltei ontem
- achei caro
- minha filha que me leva
- to sangrando muito
- to sem um dente
- quero colocar um dente
- meu pai está banguelo e quer dente fixo

## Templates RD

- 12 templates carregados.
- 12 IDs únicos.
- 4 grupos x 3 objetivos.
- Todos possuem texto, regra de uso, regra de não uso, categoria sugerida, próxima ação e status.
- Verificação automática bloqueia termos óbvios de promessa no conjunto atual.

## Integridade técnica

- `node --check` aprovado para `app.js`, `lib/*.js`, `data/*.js` e `tests/*.mjs`.
- `index.html` sem referência local ausente nas dependências principais.
- `/index.html`: HTTP 200 em servidor local.
- `/data/rd-templates.json`: HTTP 200.
- `/health.html`: identificou `ULTRA BASE v5.0.0`.
- Service Worker usa cache `ultra-base-v5` e remove caches anteriores.
- GitHub Actions executa testes e verificação de sintaxe antes do deploy.
- Deploy depende do job de teste: falha de teste bloqueia publicação.

## Pontas deliberadamente não inventadas

Ainda marcadas para validação humana:

- estacionamento;
- acessibilidade;
- condições/formas de pagamento específicas;
- sábado e horários especiais;
- classificação final de cada template no RD/Meta no momento do cadastro.

## Limites desta release

Esta versão é frontend estático/local-first.

Não é indicada para armazenar dados clínicos identificáveis ou credenciais. Para login, multiusuário, sincronização ou integração direta com RD será necessário backend seguro e governança de acesso/LGPD.

## Homologação humana exigida antes de chamar de produção definitiva

A diretoria deve executar o arquivo `DIRECTOR_REVIEW_CHECKLIST.md`, com atenção especial a:

1. linguagem clínica;
2. regras comerciais vigentes;
3. fatos institucionais pendentes;
4. leitura em celulares reais;
5. cadastro/validação dos templates no RD Conversas/Meta.

## Decisão técnica

A v5 está apta para **início de uso em teste controlado**, porque:

- não depende mais de cenário como primeira camada;
- reconhece sujeito/familiar;
- responde fatos conhecidos diretamente;
- trata baixa confiança como incerteza;
- reduz falsos positivos já detectados;
- possui testes de regressão;
- não replica o RD no painel da Milena;
- disponibiliza templates com governança.
