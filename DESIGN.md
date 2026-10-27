# Design system — Rishikesh Learning Residency

Recorded from the shipped static site (2026-10-27).

## World

Calm outdoors editorial: cool stone-paper ground, forest ink, river-teal actions. Quiet enough for people between jobs; distinct from SaaS bootcamp landings.

## Palette

| Token | Value | Role |
|-------|--------|------|
| `--paper` | `#e6ebe8` | Page ground |
| `--ink` | `#17201c` | Primary text |
| `--ink-soft` | `#3a4a43` | Body secondary |
| `--muted` | `#5c6b64` | Hints / footer |
| `--river` | `#246b66` | Primary CTA / accent |
| `--river-deep` | `#1a524e` | Hover / links |
| `--forest` | `#2f4a38` | Brand display |
| `--warm` | `#c9b8a0` | Soft secondary (sparse) |
| `--danger` | `#8b3a2f` | Errors / unconfigured banner |

Light mode only — daytime reading / café scene.

## Typography

- **Display:** Alegreya (Google Fonts) — residency name, section titles, hero headline
- **Body:** Source Sans 3 — UI, paragraphs, form controls
- Body measure ~40rem; display capped for mobile wrap

## Components

- Text links and square-ish CTAs (`--radius: 2px`), not pill buttons
- Sticky translucent header; primary nav CTA in river fill
- Numbered how-it-works as a 3-column list on desktop (not icon cards)
- Form: step progress underline, choice rows, inline field errors
- Optional costs via `<details>`, not price cards

## Motion

Short panel rise on form step change; button press translate. Disabled under `prefers-reduced-motion`.

## Surfaces

- `index.html` — Persuade landing
- `apply.html` — Operate interest form (same tokens)
