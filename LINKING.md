# Odkazování napříč dokumentacemi

Catch-all dokumentace (tento repo) a hlavní NRP dokumentace
(**https://docs.nrp.eosc.cz/**) jsou **dva samostatné weby / nasazení**. Odkazy
mezi nimi proto musí být **absolutní `https://` URL** – relativní cesty (`../`)
fungují jen v rámci jednoho webu a při přechodu mezi weby se rozbijí.

Obě dokumentace běží na stejném image `cerit.io/docs/fuma`, takže mají stejnou
strukturu URL: stránka ze souboru `content/docs/<cesta>/<jméno>.mdx` je dostupná
na `…/en/docs/<cesta>/<jméno>`.

## 1) Uvnitř téhož webu (catch-all → catch-all)

Relativní odkaz holým jménem sourozeneckého souboru – tak, jak to obsah už dělá:

```md
See [Getting Access](catch-all-getting-started).
[Community and Access](catch-all-repository-record-creation#community-and-access)
```

Funguje, protože všechny stránky jsou sourozenci v `content/docs/`. Nepřidávej
`../` ani doménu.

## 2) Z catch-all → hlavní dokumentace (docs.nrp.eosc.cz)

Vždy **absolutní URL** na ostrý web, včetně prefixu `/en/docs/`:

```md
See the [recommendations for choosing a repository](https://docs.nrp.eosc.cz/en/docs/intro-to-nrp/use-cases#choice-of-a-repository).
```

- ❌ nikdy relativně (`../../intro-to-nrp/use-cases`) – míří mimo tento web a 404.
- fumadocs `https://` odkaz automaticky otevře v nové záložce (`target="_blank"`).

## 3) Z hlavní dokumentace → catch-all

Ze strany hlavní dokumentace je catch-all web „cizí" doména, takže zase
**absolutní URL** na veřejnou adresu catch-all webu:

```md
See the [Data Catch-all Repository guide](https://<catch-all-docs-domena>/en/docs/catch-all-repository-introduction).
```

> Nahraď `<catch-all-docs-domena>` skutečnou produkční adresou catch-all webu,
> až bude nasazený.

## Kotvy (`#…`)

Kotva = nadpis převedený na kebab-case: malá písmena, mezery → pomlčky,
interpunkce odstraněna.

```
## Choice of a Repository   →   #choice-of-a-repository
```

Vždy ověř, že cílový nadpis na dané stránce existuje (kotvy se mění při
přejmenování nadpisu).

## Shrnutí

| Odkud → kam | Forma |
|---|---|
| catch-all → catch-all | relativní, holé jméno souboru |
| catch-all → hlavní docs | absolutní `https://docs.nrp.eosc.cz/en/docs/…` |
| hlavní docs → catch-all | absolutní `https://<catch-all-docs-domena>/en/docs/…` |

Pravidlo: **uvnitř webu relativně, mezi weby absolutně.** `../` mezi weby nikdy.
