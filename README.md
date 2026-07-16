# catch-all-documentation

Zdroj obsahu pro samostatný web dokumentace **Data Catch-all Repository**
(https://datarepo.eosc.cz). Renderuje se přes image `cerit.io/docs/fuma`.

Toto repo je **overlay** – obsahuje pouze soubory, které se překrývají přes
baked-in fumadocs aplikaci v image (`/opt/fumadocs`). V produkci se přes
`start.sh` (proměnné `URL`+`BRANCH`) provede `git archive HEAD | tar -x` nad
`/opt/fumadocs`, takže se aplikuje na místo:

```
content/docs/          – obsah (5 stránek + meta.json)
public/                – obrázky k obsahu + grafika (logo.svg, background.svg)
app/[lang]/global.css  – styly: téma + grafika samostatné instance,
                         plumbing (tailwind/preset/fonty/tabulky) z image
lib/shared.ts          – appName + logo (nav)
```

Styly a grafika převzaty ze starší lokální instance `~/nrp-catch-all-docs`
(teal/petrolejové téma, růžový hover odkazů, logo/pozadí). Vše ostatní odpovídá
konfiguraci image `cerit.io/docs/fuma`.

## Lokální spuštění

Overlay soubory (styly, `lib/`) se aplikují jen v `URL`+`BRANCH` režimu –
tj. z gitu:

```bash
docker run --rm -p 3000:3000 \
  -e STARTPAGE=/en/docs/catch-all-repository-introduction \
  -e AUTH_SECRET=$(openssl rand -base64 32) \
  -e URL=https://github.com/NRP-CZ/catch-all-documentation.git \
  -e BRANCH=fumadocs \
  cerit.io/docs/fuma:latest
```

Rychlý náhled jen obsahu (bez overlay stylů) přes mount:

```bash
docker run --rm -p 3000:3000 \
  -e STARTPAGE=/en/docs/catch-all-repository-introduction \
  -e AUTH_SECRET=$(openssl rand -base64 32) \
  -v $(pwd)/content:/opt/fumadocs/content \
  -v $(pwd)/public:/opt/fumadocs/public \
  cerit.io/docs/fuma:latest
```

Web pak běží na http://localhost:3000 a přesměruje na
`/en/docs/catch-all-repository-introduction`.
