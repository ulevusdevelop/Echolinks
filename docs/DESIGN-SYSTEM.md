# Echolink Solutions — Design System

Scanned directly from the live codebase (`tailwind.config.js`, `styles/globals.css`, and component usage patterns) — this reflects what's actually implemented and running, not an aspirational spec. Where the Tailwind config had stale/unused values that don't match what's actually rendered, the real value (from CSS variables) is called out.

---

## 1. Color Palette

### Brand colors (source of truth: official Brand Guidelines §3.1)

| Token | Hex | Use |
|---|---|---|
| **Purple** | `#16003B` | Primary brand color — dark sections, primary text on light backgrounds |
| **Orange** | `#FF6100` | Accent — CTAs, highlights, active states |
| **White** | `#FFFFFF` | Light sections, text on dark backgrounds |
| **Black** | `#000000` | Rare — used deliberately in one gradient (`NotACryptoPlay`'s vignette) where brown was previously used incorrectly |

The site alternates **deep purple and white** section backgrounds as its core rhythm — not multiple shades of the same color stacked together. Two consecutive same-toned sections is treated as a bug to fix, not a stylistic choice, with one accepted exception: a closing CTA sitting directly before the (also dark) global footer.

### Derived/elevation tokens (CSS variables in `:root`)

| Variable | Hex | Use |
|---|---|---|
| `--bg-page` / `--bg-section` | `#180F39` | Actual dark section background (a hair lighter than pure brand purple — this specific shade is what's used for `.section`/`.section--page`, distinct from `#16003B` used elsewhere) |
| `--bg-card` | `#383054` | Card elevation (legacy — most cards now use solid white, see below) |
| `--accent-light` | `#FF7A26` / `#FF7B26` | Hover states, lighter orange text |
| `--accent-soft` | `rgba(255,96,0,0.14)` | Pill/badge backgrounds |

### Text colors

| Context | Color | Contrast |
|---|---|---|
| Primary text, dark bg | `#EAF1FA` | — |
| Secondary text, dark bg | `#ABB8C3` | 8.90:1 on `#16003B` |
| Muted text, dark bg | `#6B7C99` / `#8B93A0` | — |
| Primary text, light bg | `#16003B` | — |
| Body text, light bg | `#434343` | 8.94:1+ |
| Secondary text, light bg | `#665A7D` (light bg only — fails on dark) | 6.32:1 |
| Muted text, light bg | `#707070` | 4.95:1 (upgraded from `#8A8A8A`'s 3.45:1, which failed AA) |

### Special-case gradients

Two named gradients exist for specific "hero moment" sections, both deliberately restored after a stricter no-gradient pass, on direct request ("I LOVE THE GRADIENT"):

- **`WhoWeServe`**: `linear-gradient(135deg, #16003B 0%, #FF6100 100%)` — a clean two-stop purple→orange blend (a muddy invented brown midpoint was removed).
- **`NotACryptoPlay`**: `linear-gradient(135deg, #000000 0%, #16003B 60%)` — a black→purple vignette (same muddy-brown problem fixed the same way, using real black instead).
- **`--flame-from` / `--flame-to`** (`#16003B` → `#8B3A0F`): the "2,000 careers" highlight card gradient. The lighter stop is a deliberately chosen ember orange, not the brand's bright `#FF6100` — that bright a stop only manages 3.02:1 contrast against white text (fails for body copy); `#8B3A0F` holds 7.75:1.

---

## 2. Typography

**Font families**: Syne (headings *and* body — per official brand guidelines §4.1/4.2, Syne is used throughout, not paired with a separate body face) via `next/font/local`; JetBrains Mono for small monospace UI labels (eyebrows, tags, buttons).

### Type scale (4-6 sizes, tiered by semantic heading level)

| Element | Mobile | Desktop | Weight | Line-height |
|---|---|---|---|---|
| H1 | 40px | 60px (clamp) | **800** | 1.15 |
| H2 (`.sec-title`) | 30px | 40px (clamp) | **700** | 1.25 |
| H3 / H4-H6 | 24px | 28px (clamp) | **600** | 1.3 |
| Large paragraph / intro (`.sec-sub`) | 17px | 19px (clamp) | 400 | 1.7 |
| Body | 16px | 16px | 400 | default |
| Buttons | 14px | 14px | 600 | — |
| Nav links | 14px | 14px | 500 | — |
| Caption / eyebrow / tags (`.tag-mono`, `.eyebrow*`) | 12-13px | 12-13px | 400-700 (varies by variant) | — |

Weight is enforced at the **tag level** (`h1`, `h2`, `h3` selectors, not utility classes) with `!important`, specifically so Tailwind's `font-bold`/`font-semibold` utilities scattered across 36+ files can't silently flatten the hierarchy. Classes with higher CSS specificity than a bare tag (like `.sec-title`) needed their own matching values rather than relying on the cascade, and a compound selector (`h1.sec-title`) exists specifically to give real `<h1>` elements H1 treatment even where `.sec-title`'s own H2-tier values would otherwise win.

**Paragraph width**: capped at 700px (`.sec-sub`) or a browser-wide 68ch fallback for any paragraph with no explicit width, both inside the commonly-recommended 60-75-character reading measure.

---

## 3. Layout & Spacing

- **Page max-width**: 1720px (`.wrap`), horizontal padding 32px.
- **Dominant content-section padding**: `py-[50px] lg:py-[100px]` — used by the large majority of sections sitewide. Treated as the standard; one-off variants get corrected to match rather than accumulating drift.
- **Page-top hero padding**: `pt-28` (112px) — clears the fixed header (44px logo + 16px×2 nav padding ≈ 76px at desktop) with intentional breathing room. This is a real, load-bearing value: there's no global header-offset anywhere in the app (checked `_app.tsx` and `Layout` directly), so every page-top section clears the header itself, and using anything less than ~76px causes actual content overlap, not just tightness.
- **Breakpoints**: standard Tailwind (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px) for component-level responsive classes; a couple of custom raw-CSS breakpoints (545px, 922px) exist specifically for the button padding scale.
- **Border radius**: **0px everywhere** (`--radius-card: 0`, `.btn { border-radius: 0 }`) except fully-round pills (`border-radius: pill` = 999px, used for tag/badge chips) — sharp rectangular shapes are a deliberate, explicit brand requirement, not a default.

---

## 4. Components

### Cards
- **Base `.card`**: solid white background, 1px `rgba(22,0,59,0.12)` border, sharp corners, 32px/36px padding (24px on mobile). This works on *any* section background (dark or light) because of a scoped override system — `.card` automatically flips nested `text-white`, `text-ink_text-secondary`, etc. to dark-on-white equivalents, so the same component markup renders correctly regardless of what section it's dropped into.
- **`.card--highlight`**: the one card variant with a dark background (the flame gradient) instead of white — its own separate override set flips nested text back to light-on-dark.

### Buttons
All share one base (`.btn`: JetBrains Mono, 14px, weight 600, uppercase, sharp corners, responsive padding), with variants for context:

| Variant | Look | Used for |
|---|---|---|
| `.btn--primary` | Solid orange fill, white text | Primary CTAs |
| `.btn--primary-inverse` | Solid dark-purple fill, orange text | Primary CTA on a light/orange-adjacent section |
| `.btn--ghost` | Transparent, white border/text | Secondary CTA on dark sections |
| `.btn--ghost-dark` | Transparent, navy border/text | Secondary CTA on light sections |
| `.btn--ghost-accent` | Transparent, orange border, navy text, fills orange on hover | Header nav CTAs specifically |
| `.btn--on-accent` | Transparent, white border, inverts to white fill on hover | Ghost button sitting on a solid-orange background |

Nav links additionally get a hand-drawn SVG rectangle that traces itself around the label on hover (`.nav-draw`), stroked in brand purple.

### Tags / Eyebrows / Badges
- **`.eyebrow`**: pill-shaped, translucent orange background, orange text, JetBrains Mono, 12px uppercase.
- **`.eyebrow-plain` / `.eyebrow-plain--dark`**: no pill background, just uppercase mono text (orange on dark bg / rust `#B24300` on light bg).
- **`.tag-mono` / `.tag-mono--accent`**: general-purpose small mono labels (muted gray / orange), used for metadata, status labels, step counters.

### Interactive patterns
- **Expand/collapse rows**: a consistent `+`/`−` toggle pattern for "click to reveal more" content (Who We Serve segments, Agent Grid roles, Solutions We Handle categories) — click target is the whole row, not just the icon.
- **Numbered step badges** (`.number-badge`): circular/square numbered markers for ordered lists (checklists, verified-journey steps).
- **Scroll-reveal animation**: every section-level component (21 of them, plus the original 4) fades and slides up into view on scroll, via a dependency-free `RevealOnScroll` component (`IntersectionObserver` + CSS `transition`, no animation library). Multi-block sections stagger successive blocks with increasing delay (150ms/250ms/350ms) rather than animating in all at once.

---

## 5. Accessibility

- Visible `:focus-visible` outline (2px solid orange) applied broadly to every interactive element type, filling a gap where at least one control (the Services dropdown trigger) had explicitly stripped its own outline with nothing to replace it.
- Color combinations are contrast-checked against WCAG AA (4.5:1 for normal text) rather than assumed — several fixes in the system exist specifically because a color read fine visually but measured below threshold (e.g., `#8A8A8A` at 3.45:1 → `#707070` at 4.95:1, found in 9 files sitewide from one initial catch).

---

## 6. Known inconsistencies worth knowing about

- `tailwind.config.js` still defines a `wrap: '1240px'` maxWidth token that nothing actually uses — the real value (1720px) lives in a CSS custom property instead. Harmless (dead code), but worth not trusting that specific config entry at face value.
- A small number of components intentionally deviate from the "always alternate dark/white" and "one page-top padding standard" rules where a specific reference source called for it — these are documented per-instance in code comments rather than being silent exceptions.
