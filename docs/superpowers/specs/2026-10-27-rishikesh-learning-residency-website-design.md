# Rishikesh Learning Residency — Website Design

**Date:** 2026-10-27  
**Status:** Approved for implementation planning  
**Source brief:** `docs/cursor_initial_website_prompt.txt`, `docs/rishikesh_learning_residency_business_plan.docx`

## Goal

Ship a tiny English-only static website that (1) explains the 30-day self-directed learning residency clearly, and (2) collects interest so Naval can follow up on WhatsApp for a short discussion. No payments, no invented dates/venue/testimonials, no fake form success.

## Audience

Software engineers and technology professionals between jobs (and others taking a deliberate learning break) who want a month to learn something difficult with peers in Rishikesh.

## Positioning (must stay true)

- Self-directed residency: participants bring their own goals and learning materials.
- Not a bootcamp, job-placement service, fixed curriculum, formal yoga retreat, or workation package.
- Product: place to focus, community, accountability, coordination, optional local experiences.
- Pricing and optional activities are planning estimates until suppliers confirm.

## Approach

**Two-page plain HTML / CSS / JS site** (no framework, no build step).

| Page | Role |
|------|------|
| `index.html` | Editorial one-pager with all marketing sections |
| `apply.html` | Multi-step interest form → Formspree when configured |

Internal links use `apply.html` (works on any static host). Optional hosting rewrite from `/apply` → `apply.html` can be added later; not required for v1.

WhatsApp: soft mention only (“I’ll usually follow up on WhatsApp”) — no public number or `wa.me` link.

Language: English only for v1.

## Landing page structure

Light sticky nav with in-page anchors. Sections in order:

1. **Hero** — Working name as brand signal; headline; short subhead; CTAs: Express interest → `apply.html`, How it works → `#how-it-works`
2. **What it is** — 30-day self-directed residency; especially for people between jobs; own focus and resources; clear not-bootcamp / not-placement / not-fixed-curriculum
3. **How it works** — Three steps: Create your track ([studycoach.diy](https://studycoach.diy)); Work alongside peers (≥20 hrs/week); Use the month well. Link example project to [ai-study](https://github.com/naval200/ai-study)
4. **Optional activities** — Kayaking / yoga / kirtan as optional; mark unconfirmed arrangements clearly. Kayaking: slow 7-day course over ~10 weekdays (NIM beach → paddling/swimming; last day easy grade-1); Team4Adventure denser courses as alternate option only
5. **Where** — Rishikesh, Uttarakhand; Tapovan being explored; no exact venue
6. **About Naval** — First-person bio from brief; links: CV, AI learning track, Studycoach (new tab)
7. **Community** — Welcoming description without unverified size/outcome claims
8. **Costs** — Working estimate ₹62,000–66,000 / 30 days shared room; 15% coordination fee disclosed; optional costs expandable and marked unconfirmed
9. **FAQ** — Short answers from the brief
10. **Footer** — Working name; “Rishikesh, Uttarakhand — venue and dates to be confirmed”; CV / Studycoach / GitHub; soft WhatsApp follow-up line

### Suggested hero copy

- **Headline:** A month to learn something difficult, with good people around you.
- **Subheading:** A self-directed learning residency in Rishikesh for people between jobs and others taking a deliberate learning break. Choose what to study, make a plan, and work on it alongside people doing the same.

## Apply form

Interest and planning form — not a booking or admission promise.

### Flow

Progress indicator → Step 1 → Step 2 → Step 3 → Review summary → Submit.

Users can go Back and edit. State lives in memory only for the open tab (no localStorage of personal data).

### Steps (fields from product brief)

**Step 1 — About you:** name, email, LinkedIn (optional URL), situation, role/experience, years of experience, GitHub/portfolio (optional).

**Step 2 — What do you want to learn?** focus area, specifics, current experience with topic, meaningful 30-day progress, existing course/plan (optional + link), Studycoach link nearby, ≥20 hrs/week commitment (if no: realistic expectation).

**Step 3 — Can the residency work for you?** availability (free text; no invented dates), core budget bands (note planning estimate), optional-activity budget, accommodation preference, food preference, dietary preference, allergies (optional), facilities multi-select (preferences, not confirmed amenities), optional activities multi-select, worthwhile-month note, non-negotiables, how heard, required consent checkbox.

### Submission adapter

- Single config point: `js/config.js` → Formspree endpoint URL (or empty).
- **Unconfigured:** banner before fill; on submit, honest “nothing was sent” — never a fake success.
- **Configured:** POST to Formspree; on success: thanks + soft WhatsApp follow-up line.
- No online payments. Do not ask for salary, employer secrets, or documents.

## Visual design

Mode: **Persuade** (landing) + calm **Operate** feel on the form.

- Calm, tactile, editorial, outdoors-oriented — not SaaS.
- Palette inspired by river water, stone, forest, warm paper; muted teal/river accent for links/CTAs.
- One display serif + one readable sans.
- Hero: brand first, one headline, one subhead, CTA group, CSS atmosphere (no unlicensed/hotlinked photos). Prefer CSS treatment over blocking on imagery.
- Generous whitespace; short paragraphs; almost no cards; no purple gradients, badge clutter, or decorative icon grids.
- Subtle enter motion + focus states; honor `prefers-reduced-motion`.
- Mobile intentionally designed (hierarchy, tap targets, full-width form steps).

## File layout

```
index.html
apply.html
css/styles.css
js/config.js      # Formspree endpoint; empty until set
js/apply.js       # multi-step UI, validation, submit adapter
README.md         # local serve, Formspree setup, any image credits
docs/…            # existing product docs + this spec
```

## Non-goals (v1)

- Framework / SSR / build pipeline
- Database, auth, analytics SDKs, payments
- Public WhatsApp number
- Hindi / bilingual UI
- Confirmed venue, dates, testimonials, partner claims, final prices
- Storing personal data in localStorage or unapproved third parties (except Formspree when configured)

## Acceptance criteria

1. Concept understood in under a minute; self-directed + between-jobs audience clear.
2. About Naval includes CV, GitHub ai-study, and Studycoach links.
3. Pricing provisional; 15% fee disclosed; optional activities not presented as confirmed.
4. Express interest opens multi-step `apply.html` with validation; no false success when unconfigured.
5. No invented dates, venues, testimonials, partners, or outcomes.
6. Polished desktop and mobile; easy to revise after supplier quotes.
7. README documents Formspree connection steps.

## Open setup (owner, not blockers for code)

- Create Formspree form and paste endpoint into `js/config.js` before treating the site as “live for submissions.”
- Host on any static host (GitHub Pages, Netlify, or local `npx serve`).
