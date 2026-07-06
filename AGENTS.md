# 🏛️ CanMyPet — Constituição do Projeto
> A **lei** do projeto. Todo agente (Cowork e Code) lê isto **ANTES de qualquer trabalho**.
> Adaptado do protocolo **V.L.A.E.G.** ao nosso caso (site estático + fluxo Cowork→Code).
> Regra-mãe: **confiabilidade > velocidade. Nunca adivinhar. Sempre verificar o arquivo real.**

## 0. Missão
CanMyPet é o "sistema operacional do dono de pet". O objetivo é **agregar valor real à vida das pessoas** — não só monetizar. Cada página tem que estar **correta e útil**.

## 1. Guard-rails inegociáveis
- **YMYL** (saúde, sintomas, plantas, emergência): só com **vet real** + disclaimers + **liderar com vet/poison-control**. Nunca dose calculada por IA em texto livre.
- **Sem vet fictício.** Sem "vet reviewed" sem revisão de vet real.
- **Sem conteúdo em massa por IA.** Dado **real, original e variado** (kcal factual, risco seguindo o veredito). Card errado em saúde pet é pior que card nenhum.
- **Segredos** só no `.env`/GitHub Secrets — nunca no repo. Contas no nome do dono. **Nunca** inflar pageviews nem clicar nos próprios anúncios. FTC nos afiliados.
- Pins: estilo emocional (skill `canmypet-pins`); marcar "IA-modificado".

## 2. Stack & Schemas (Dado-primeiro)
- Estático: HTML/CSS/JS. `build.js` (Node, **gitignored**) lê `assets/foods.js` e gera `foods/can-{dogs|cats}-eat-{slug}.html`.
- `window.PETIBLE_FOODS = [{slug,name,emoji,verb?,dog:{v,why,amount,toxic?,signs?},cat:{…}}]` · `v ∈ safe|caution|danger`.
- `window.PETIBLE_DEPTH[slug] = {intro,howMuch,tooMuch,emergency?|serving?,faq[{q,a}]}`.
- `window.PETIBLE_CARD[slug]`:
  - nutrition: `{type:"nutrition",score:0-10,bars:[[label,0-100]…],kcal,bestFor,didYouKnow}`
  - risk: `{type:"risk",level,little,onset,hits,swap:{slug,name},didYouKnow}`
- **Mudou o schema → atualiza ESTA constituição ANTES do código.**

## 3. Invariantes técnicas (as armadilhas que já nos pegaram)
1. **`foods.js` SEMPRE síncrono** (sem `defer`) em páginas com `<script>` inline que usa `PETIBLE`/`PETIBLE_FOODS` fora de `DOMContentLoaded`. (Foi o bug que quebrou 10 páginas — checker/result/emergência/quiz/jogos.)
2. **CSS sempre com classe própria** (`.tox-card`/`.pd-*`/`.wk-*`/`.vcard*`…). NUNCA reusar classes globais que colidem (`.steps`/`.stats`/`.related`).
3. **Mudou CSS → bump do `?v=`** (versão nova; nunca reusar uma já servida sem a regra nova).
4. **Todo `<script>` com `</script>`** de fechamento.
5. **Páginas à mão (`rich`, ex.: `chocolate`)** recebem TODA varredura sitewide (nav, persona, links). Não esquecer — elas não passam pelo `build.js`.
6. **Commit limpo:** nunca commitar `build.js`, `_SPEC*/_CARD*/_*.md`, `launch.json`, dev files, nem `*_sync.*` (gitignored).

## 4. Fluxo (V.L.A.E.G. adaptado)
- **V — Visão/Dado-primeiro:** schema travado antes de codar.
- **L — Link:** testar APIs/credenciais (`.env`) antes da lógica. (Vale na automação — Pinterest/MailerLite.)
- **A — Arquitetura:** `build.js` determinístico; os `_SPEC*.md` são os POPs (procedimentos). Lógica mudou → atualiza o POP antes do código.
- **E — Estilo/Verificar:** render no preview + console limpo + apresentar antes de subir.
- **G — Gatilho/Deploy:** commit + push + **confirmar NO AR**.

## 5. Confiabilidade — o backstop (o que de fato evita erro)
- **VERIFICAR O ARQUIVO REAL, não confiar no relatório.** Ex.: contar `"type":` (= nº de cards) **antes e depois** de cada lote.
- **UM agente por vez no git.** Antes de cada operação: `git status` limpo, sem `.git/index.lock`, e **confirmar a contagem esperada** (o working tree pode divergir do commit/deploy quando 2 agentes mexem).
- **Loop de autocorreção:** erro → **ler o erro (não adivinhar)** → corrigir → testar → **registrar a lição na seção 7** pra nunca repetir.

## 6. Preflight (rodar ANTES de cada commit)
1. **Greps de armadilha:** `foods.js`+`defer`+PETIBLE inline · `<script>` sem `</script>` · classes globais colidindo · CSS sem bump de `?v=`.
2. **Render da página alterada** no preview + **console sem erro** + o conteúdo **aparece** (não só o shell).
3. **Mudança sitewide → reteste as interativas** (checker, result, emergency, quiz, jogos), não só a home.
4. **Confirmar NO AR** (não só preview).
5. **Commit limpo** (sem dev files).

## 7. Log de Lições (findings — append-only)
- `defer` no `foods.js` quebra páginas com PETIBLE inline → manter síncrono nessas (08jf1495d).
- Working tree pode divergir do commit/deploy com 2 agentes → confirmar `"type":`=N antes de cada lote.
- `chocolate` é a única página à mão (`rich`) → incluir em toda varredura sitewide.
- O mount do sandbox Linux pode ficar **desatualizado** após edições via ferramentas do host → preflight/greps de verificação devem rodar nas ferramentas do host (Grep/Read), não no bash do sandbox (02/jul/2026).
- **`button.click()` sintético passa onde o clique humano falha.** `setPointerCapture` num container engole o click dos botões dentro dele (o browser compõe o click no ancestral capturado, não no botão) — foi o Start morto do Treat Drop (f2ab76e2). Capture de drag só com `if(!playing) return`. E abas automatizadas ficam `hidden`: rAF suspenso E cliques nativos CDP não chegam (`events:[]`) → botão de jogo precisa de teste com clique real em aba visível (02/jul/2026).
- **Build de teste polui o manifesto de datas.** Rodar `build.js` com conteúdo experimental (ex.: `AMZ_TAG=teste`) muda o `<main>` → `sitemap-dates.json` bumpa as datas pra hoje; o rebuild "limpo" NÃO desfaz (o hash antigo já foi sobrescrito). Após qualquer build de teste: `git checkout -- sitemap.xml assets/sitemap-dates.json` e rebuild (06/jul/2026).
- _(novas lições entram aqui, sempre.)_
