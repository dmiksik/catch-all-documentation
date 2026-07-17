# catch-all-documentation

Zdroj obsahu a stylů pro samostatný web dokumentace **Data Catch-all Repository**
(https://datarepo.eosc.cz). Renderuje se přes image `cerit.io/docs/fuma`.

Repo je **overlay** – v produkci se přes `start.sh` (env `URL`+`BRANCH`) provede
`git clone` + `git archive HEAD | tar -x` nad `/opt/fumadocs`, takže se jeho
soubory naskládají na baked-in fumadocs aplikaci v image:

```
content/docs/          obsah (MDX + meta.json)
public/                obrázky + grafika (fonty, logo, pozadí, publicity)
app/[lang]/global.css  téma (barvy, pozadí, hover odkazů, tabulky)
app/[lang]/docs/docs.css  rozložení sloupců (horní odsazení, sidebar)
lib/, components/       nav logo, footer
```

## Spuštění lokálně

Web běží na **http://localhost:3000** a root přesměruje na
`/en/docs/catch-all-repository-introduction`. Image se nikdy nerebuilduje –
pracuje se jen s kontejnerem.

### A) Psaní obsahu – živý náhled (mount + dev)

`pnpm dev` sleduje `content/`, změny `.mdx` se projeví hned, **bez commitu a
bez restartu**. Pozor: overlay **styly se v tomto režimu neaplikují** (uvidíš
výchozí vzhled) – hodí se na text a strukturu.

```bash
docker run --rm --name catch-all-docs-local -p 3000:3000 \
  -e STARTPAGE=/en/docs/catch-all-repository-introduction \
  -e AUTH_SECRET=$(openssl rand -base64 32) \
  -v ~/catch-all-documentation/content:/opt/fumadocs/content \
  -v ~/catch-all-documentation/public:/opt/fumadocs/public \
  cerit.io/docs/fuma:latest
```

Edituj přímo `~/catch-all-documentation/content/...`, ulož → stránka se obnoví.

### B) Věrný náhled včetně stylů (URL + BRANCH)

Obsah i styly se berou z gitu a zapečou při buildu (~30 s). **Napřed pushni** do
větve `fumadocs`, pak spusť (bez `--rm`, ať jde restartovat):

```bash
docker run -d --name catch-all-docs-local -p 3000:3000 \
  -e STARTPAGE=/en/docs/catch-all-repository-introduction \
  -e AUTH_SECRET=$(openssl rand -base64 32) \
  -e URL=https://github.com/dmiksik/catch-all-documentation.git \
  -e BRANCH=fumadocs \
  cerit.io/docs/fuma:latest

docker logs -f catch-all-docs-local     # sleduj build, dokud nenaběhne (✓ Ready)
```

Po dalším pushi stačí **restart** – znovu naklonuje větev a přebuilduje:

```bash
git push                                # pushni změny do fumadocs
docker restart catch-all-docs-local
```

## Správa kontejneru

```bash
docker stop catch-all-docs-local        # zastavit (s --rm se i smaže)
docker rm -f catch-all-docs-local       # smazat (nutné po přejmenování/mazání
                                        # souborů obsahu = garantovaně čistý stav)
```

`--name` drží pevné jméno místo náhodného; jméno musí být v daný okamžik unikátní.
