# Rishikesh Learning Residency — website

Static two-page site for the **Rishikesh Learning Residency** (working name): a 30-day self-directed learning residency in Rishikesh.

- `index.html` — landing page  
- `apply.html` — multi-step interest form  
- `css/styles.css` — shared styles  
- `js/config.js` — Formspree endpoint (empty until you set it)  
- `js/apply.js` — form behaviour  

No build step. No payments. English only for v1.

## Run locally

From this folder:

```bash
npx --yes serve .
```

Then open the URL shown (usually `http://localhost:3000`).

Any static server works (`python3 -m http.server`, Netlify Drop, GitHub Pages, etc.).

## Connect Formspree (required before real submissions)

1. Create a form at [formspree.io](https://formspree.io).
2. Copy the endpoint, e.g. `https://formspree.io/f/xxxxxxxx`.
3. Paste it into `js/config.js`:

```js
window.RESIDENCY_CONFIG = {
  formspreeEndpoint: "https://formspree.io/f/xxxxxxxx"
};
```

4. Refresh the site.

Until that value is set, `/apply` shows an honest notice. Submitting does **not** claim success — it states that nothing was sent. Personal answers stay in memory for the open tab only (not localStorage).

After a real submission, the success copy mentions that you’ll usually follow up on WhatsApp. The site does **not** publish a WhatsApp number.

## Content rules

Do not invent cohort dates, venue address, testimonials, alumni counts, partnerships, or final prices. Pricing and optional activities are planning estimates until suppliers confirm. See `docs/` and `PRODUCT.md`.

## Imagery

v1 uses a CSS atmosphere (river / stone / paper) — no stock photos. If you add photos later, use licensed assets and record credit here.

## Spec

Design: `docs/superpowers/specs/2026-10-27-rishikesh-learning-residency-website-design.md`
