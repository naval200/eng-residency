# Rishikesh Learning Residency Website — Implementation Plan

> **For agentic workers:** Execute inline in this session (user requested implement). Spec: `docs/superpowers/specs/2026-10-27-rishikesh-learning-residency-website-design.md`

**Goal:** Ship a two-page static English site that explains the residency and collects interest via a multi-step Formspree-ready form.

**Architecture:** Plain `index.html` + `apply.html`, shared `css/styles.css`, `js/config.js` + `js/apply.js`. No build step.

**Tech Stack:** HTML5, CSS3, vanilla JS, Formspree (optional endpoint).

## Global Constraints

- No invented dates, venues, testimonials, partners, final prices, or public WhatsApp number.
- Form never fakes success when Formspree is unconfigured.
- No localStorage of personal data; no payments; English only.

---

### Task 1: Landing page + shared styles

**Files:** Create `index.html`, `css/styles.css`, `PRODUCT.md` (done)

- [x] Build all landing sections from spec with hero CTAs to `apply.html`
- [x] Shared nav/footer patterns and responsive CSS

### Task 2: Apply form

**Files:** Create `apply.html`, `js/config.js`, `js/apply.js`

- [x] Three steps + review, validation, Formspree adapter, honest unconfigured state

### Task 3: README + verify

**Files:** Create `README.md`

- [x] Document local serve + Formspree setup; visual check desktop/mobile
