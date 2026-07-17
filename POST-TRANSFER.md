# Kroky po přenosu repa do NRP-CZ

Až repo přejde na `github.com/NRP-CZ/catch-all-documentation` (větev `fumadocs`),
projdi tyto kroky. Jsou dva typy: **úprava odkazů `dmiksik` → `NRP-CZ`** v repu
a **doplnění produkční domény** + nasazení.

## 1) Přesměrovat lokální klon na nový remote

```bash
cd ~/catch-all-documentation
git remote set-url origin git@github.com:NRP-CZ/catch-all-documentation.git
git fetch origin && git status   # ověř, že sedí
```

## 2) Přepsat odkazy `dmiksik` → `NRP-CZ` v repu

Dva výskyty:

- **`lib/shared.ts`** (řádek ~11) — `gitConfig.user: 'dmiksik'` → `'NRP-CZ'`
- **`README.md`** (řádek ~50) — v ukázkovém příkazu
  `-e URL=https://github.com/dmiksik/catch-all-documentation.git` → `…/NRP-CZ/…`

Kontrola, že nic nezůstalo:

```bash
git grep -n dmiksik
```

## 3) Doplnit produkční doménu do `LINKING.md`

Nahraď placeholder `<catch-all-docs-domena>` skutečnou veřejnou adresou catch-all
webu (3 výskyty v `LINKING.md`):

```bash
git grep -n 'catch-all-docs-domena'
```

## 4) Nasazení přes image `cerit.io/docs/fuma`

Na straně nasazení (cerit / k8s) nastavit proměnné:

| proměnná | hodnota |
|---|---|
| `URL` | `https://github.com/NRP-CZ/catch-all-documentation.git` |
| `BRANCH` | `fumadocs` |
| `STARTPAGE` | `/en/docs/catch-all-repository-introduction` |
| `AUTH_SECRET` | vygenerovat (`openssl rand -base64 32`) |
| `HOST` | produkční doména (pro absolutní URL / metadata) |

## 5) Ověření

- default branch repa na GitHubu = **`fumadocs`**;
- po nasazení projít web: `/` přesměruje na `…/catch-all-repository-introduction`,
  obrázky/loga/footer se načítají, odkazy do `docs.nrp.eosc.cz` fungují;
- pozor na cache 308 přesměrování v prohlížeči při změně `STARTPAGE` – testovat
  v anonymním okně (viz commit historie / README).

## 6) Commity

Commitovat pod nakonfigurovanou git identitou (bez `-c user.email` override).
