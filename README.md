# BlinckyBill Keukens — website (GitHub Pages)

Statische website op **https://blinckybillkeukens.nl** (zie `CNAME`), gepubliceerd vanaf de `main`-branch, map `/ (root)`.

## Pagina's
- `index.html` — Home
- `diensten.html` — Diensten
- `keukens-kopen.html` — Keukens kopen
- `portfolio.html` — Projecten (galerij met filters en vergroting)
- `over-ons.html` — Over ons
- `badkamermeubels.html` — Badkamermeubels
- `contact.html` — Contact & offerteformulier (opent WhatsApp met ingevuld bericht)
- `privacyverklaring.html` — Privacyverklaring
- `404.html` — foutpagina

## Opmaak
- `styles.css` — basisopmaak en lay-out
- `premium.css` — premium thema (antraciet & metaalgoud), geladen ná `styles.css`
- `script.js` — menu, galerijfilters, foto-modal, WhatsApp-formulier
- `analytics-config.js` — GA4 Measurement ID (plak hier het echte Meet-ID, vorm `G-XXXXXXXXXX`)
- `cookie-consent.js` — cookiebanner en Google Consent Mode v2 (Analytics laadt pas ná toestemming)

## Google Analytics
1. Maak een GA4-property en webstream voor https://blinckybillkeukens.nl.
2. Kopieer het Meet-ID (Beheer → Gegevensstreams → Meet-ID).
3. Plak het in `analytics-config.js` in de constante `GA_MEASUREMENT_ID`, in plaats van de placeholder `G-XXXXXXXXXX`.
4. Merge deze wijziging naar `main` om hem live te zetten. Zonder een echt Meet-ID wordt Analytics niet geladen.

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
