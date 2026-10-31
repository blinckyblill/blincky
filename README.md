# BlinckyBill Keukens — website (GitHub Pages)

Statische website op **https://blinckybillkeukens.nl** (zie `CNAME`), gepubliceerd vanaf de `main`-branch, map `/ (root)`.

## Pagina's
- `index.html` — Home
- `diensten.html` — Diensten
- `portfolio.html` — Projecten (galerij met filters en vergroting)
- `badkamermeubels.html` — Badkamermeubels
- `contact.html` — Contact & offerteformulier (opent WhatsApp met ingevuld bericht)
- `404.html` — foutpagina

## Opmaak
- `styles.css` — basisopmaak en lay-out
- `premium.css` — premium thema (antraciet & metaalgoud), geladen ná `styles.css`
- `script.js` — menu, galerijfilters, foto-modal, WhatsApp-formulier

## Logo
- `blinckybill-premium-logo.png` — officieel logo (origineel, witte achtergrond)
- `logo-blinckybill-keukens.webp` — volledig logo, transparant (footer)
- `logo-emblem.webp` / `logo-emblem.png` — embleem (header)
- `favicon-32.png`, `apple-touch-icon.png`, `og-image.jpg` — icoon en deel-afbeelding
- `logo.jpg` — oud logo (bewaard als archief)

## Foto's toevoegen aan Projecten
1. Zet de foto als `.webp` (max. ca. 1400 px breed) in de root.
2. Kopieer in `portfolio.html` een bestaande `<button class="g-item" …>` en pas `data-tag`, `data-title`, `data-desc`, `data-image`, `src` en `alt` aan.

De originele foto's (`img01.png` … `img07.jpg`) blijven als bron bewaard; de site gebruikt geoptimaliseerde `.webp`-kopieën.
