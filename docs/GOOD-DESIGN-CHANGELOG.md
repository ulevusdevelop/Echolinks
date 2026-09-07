# Good Design Alignment — Changelog

This pass compared the homepage against `Good Design.pdf` / `Good Design1.html`
(the real, live Echolink site's actual visual system) and fixed every
confirmed mismatch. Every fix below was verified with `tsc --noEmit` and a
full `next build` after applying it — not just written and assumed correct.

## Round 1 — Section rhythm
- **`ThreeSteps`** was sitting on a dark background; Good Design clearly
  shows this content ("How does it work?") on a light/cream band, same as
  the section right before it. Added a reusable `.section--light` /
  `.sec-title--dark` / `.sec-sub--dark` / `.eyebrow--dark` system to
  `globals.css` and converted `ThreeSteps` to use it.

## Round 2 — Site-wide color correction
Found that **9 files** used an invented light-section color, `#F7F3EC`,
that appears nowhere in the real site's CSS. Traced the actual sourced
value from the site's own Astra theme variables
(`--ast-global-color-6`, labeled "subtle/alternate background") = `#F2F5F7`.
A 10th file (`ProjectControls`) used a third, different value (`bg-white`)
for the same purpose. Corrected all 10 to the one real, consistent color:

`globals.css`, `CapabilitiesIntro`, `WhoWeServe`, `WhyDecentralized`,
`TrustBand`, `Insights`, `WholeStack`, `ProjectControls`, `StatsBar`

## Round 3 — Header buttons
Zoomed directly into the Good Design screenshot's header (not working from
memory) and confirmed both header buttons ("Become a Member" / "Get
Started") are outlined with an **orange** border and navy text on
transparent fill — not a solid-filled button. The current header used
`.btn--primary` (solid orange) for one button and `.btn--ghost-dark`
(navy border) for the other — neither matched. Added `.btn--ghost-accent`
to `globals.css` and updated both header CTAs in `components/Layout` to
use it.

## Round 4 — Section rhythm rebalance + full audit
- Converted **`SixWays`** from dark to light — it was the middle of three
  dark sections in a row (`TwoIdeas` → `SixWays` → `Traceability`), and had
  no dark-dependent visuals, making it a clean, low-risk candidate to
  break up the run.
- Audited the remaining 7 previously-unchecked sections (`Layer`,
  `CoreServices`, `EverythingWeConnect`, `AgentGrid`, `Training`,
  `TrustedToBuildTrust`, `OneScan`) for the same class of invented-color
  bug found in Round 2. **Clean** — no further fixes needed there.

## Round 5 — Hero and Footer, pixel-precise pass
Zoomed directly into high-resolution crops of both sections in
`gooddesign-1.png` / `gooddesign-2.png` (not working from memory) and
fixed every confirmed mismatch:

**Hero:**
- Removed the eyebrow tag above the headline — confirmed the reference
  has no pill/label there, the heading starts immediately.
- Button copy corrected: "Contact us" → "Book a working session →"
  (exact match). "See the layer" was already correct.
- Removed the bottom system-tags caption line ("EDI · API · ERP...") —
  confirmed it does not exist in the reference; the section ends in
  empty space instead.
- Adjusted photo-collage slot proportions to more closely match (top
  slot squared up, bottom slot shortened).
- **Not done, flagged instead of faked:** the reference uses real
  photography in the collage. Stock-photo search results came back as
  unverifiable AI-generated/stock previews with no confirmable
  commercial license — hotlinking those into a production codebase would
  be a real legal risk, not a cosmetic shortcut, so the illustrated
  placeholder stays until real (owned or licensed) photos are supplied.

**Footer — structural rebuild, not just restyling:**
Good Design's actual footer has no CTA card, no tagline text, 5 columns
(not 2), and a single button (not two) — a bigger mismatch than color or
spacing.
- Extracted the "Let's wire your first verifiable workflow" CTA card into
  its own new **`ClosingCTA`** component, content and styling unchanged,
  now rendered as its own section right before the footer on the
  homepage — matching where "Start Your New Experience" sits in the
  reference, rather than deleting that content to force a footer match.
- Rebuilt `Footer` itself: bare logo icon only (no wordmark/tagline text),
  regrouped the site's **existing** links into 4 columns + Contact
  (matching the reference's 5-column count — no new content invented,
  nothing reverted to the old site's dead links), single "Get started →"
  button using the same `.btn--ghost-accent` style as the corrected
  header, and added Privacy Policy / Terms of Use links plus a
  back-to-top button to the bottom bar (both present in the reference,
  missing before).

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.


```
Hero(D) → CapabilitiesIntro(L) → Layer(D) → ThreeSteps(L) → CoreServices(D)
→ WhoWeServe(L) → EverythingWeConnect(D) → AgentGrid(D) → WhyDecentralized(L)
→ TwoIdeas(D) → SixWays(L) → Traceability(D) → ProjectControls(L) → Training(D)
→ TrustedToBuildTrust(D) → OneScan(D) → TrustBand(L) → StatsBar(L) → Insights(L)
```

## What was checked and found to already be correct
- **Hero** — dark band, photo-collage layout, fonts already matched Good
  Design; no changes needed.
- **Footer** — structure (logo/tagline column, link columns, copyright bar
  with social icons) already closely matches Good Design. Column labels
  differ intentionally (new sitemap), not a design flaw.
- **WhoWeServe** — initially flagged as a possible layout mismatch against
  Good Design's "Industries" list, but on inspection serves different
  content (persona segments vs. industry verticals) — correctly a
  different layout, not a bug.

## Known open item — not fixed, flagged for a visual pass
No further sourced evidence exists to check the remaining section-by-section
layout/spacing details beyond what's covered above — the reference
(Good Design) only shows 8 sections total, and this homepage has 19. The
11 sections without a direct equivalent were checked for palette/font
consistency only, not pixel-level layout, since there's nothing in the
source to compare their *layout* against. Recommend a real browser
render/screenshot pass once deployed to catch anything only visible at
that level.

## Round 6 — Footer reverted, Hero photos made real
Per direct feedback after Round 5:

- **Footer reverted** to the pre-Good-Design version: CTA card, tagline,
  description, and the EXPLORE / SEE IT two-column layout are all back
  exactly as they were before Round 5's rebuild. The `ClosingCTA`
  component created in Round 5 was removed from the homepage and deleted,
  since its content now lives back inside `Footer` again — keeping both
  would have duplicated the CTA on the page.
- **Hero photo slots replaced.** The illustrated icon-motif placeholders
  (connected-nodes SVG, checkmark-shield SVG) are gone. In their place:
  real placeholder photography via Picsum (a legitimate, widely-used
  placeholder-image service — actual photos, not fabricated icons, and
  not hotlinked from an unverifiable stock/AI-generated source). A
  grayscale filter on the top photo and a warm color-overlay on the
  bottom photo approximate Good Design's duotone treatment. `next.config.js`
  updated to allow the `picsum.photos` image domain. Swap the seed URLs
  in `PlaceholderPhoto` for real company photography whenever it's
  available — nothing else in the component needs to change.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 7 — Hero photo-collage geometry, pixel-measured fix

Prior rounds got the Hero's photo/square treatment conceptually right but
never measured it precisely. This round zoomed into a high-resolution
crop of the reference collage and measured every element in pixels.

**Bug found:** the bottom photo was positioned with `bottom-0` inside a
fixed 460px-tall container, while the top photo sat at `top-0`. Since the
top photo is only 190px tall, this left an unintended ~150px dead gap
between the two photos — they should sit flush against each other,
stacked directly, with no gap. The 460px container height was itself a
symptom of this bug (padding out space for a gap that shouldn't exist).

**Fix applied to `components/Hero/index.tsx`:**
- Bottom photo repositioned from `bottom-0` to `top-[190px]` — now sits
  immediately under the top photo, matching the reference exactly.
- Container height corrected from `460` to `390`, matching the real
  measured collage height (left column: 190+120=310px; right/orange
  column: 190+190=380px, plus a small margin).
- `ArrowLines` SVG `viewBox` height corrected from 460 to 390 and its
  path coordinates rescaled proportionally, so the decorative connector
  lines still track correctly against the corrected photo/square
  positions instead of being stretched into the old, taller box.
- The orange square's position (`top-[190px] right-0`, 190×190) was
  already correct from Round 5 and is unchanged.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes (same
route count as Round 6, only Hero's internal layout changed).

## Round 8 — Content audit against Sample.pdf, word-for-word

Prior rounds fixed visual style (color, rhythm, geometry). This round
went component-by-component and diffed every piece of copy against
Sample.pdf's actual text (reading high-res crops directly, not from
memory), independent of the visual styling work. Found a consistent
pattern: many components had been quietly trimmed to shorter versions
of the source copy at some point, losing real content, not just words.

**Real bugs fixed:**
- `CoreServices` — "Why Decentralized" panel was solid orange
  (`#FF6000`); reference shows it as a muted card matching the rest of
  the design system. Restyled to `bg-ink-700`. Also restored a dropped
  clause in the flagship description.
- `EverythingWeConnect` — corrected a misleading code comment; the 10
  category counts were already exactly correct (verified against a
  high-res crop), not "TEMP guesses" as the comment claimed.
- `SixWays` — subhead was missing its closing sentence.
- `Traceability` — two body sentences and two pillar descriptions
  trimmed mid-thought.
- `ProjectControls` — **a full list item was missing** ("Schedule
  development," originally first of 6 capability cards, silently cut to
  5). Plus a dropped subhead sentence, two trimmed paragraphs, a dropped
  closing line, and four trimmed metric descriptions.
- `Training` — heaviest trimming found: a full two-sentence passage
  missing from the track-record paragraph, a shortened subhead, a
  trimmed "class is the build" paragraph, two trimmed card descriptions,
  a dropped caption fragment.
- `TrustedToBuildTrust` — all 4 client case-study descriptions cut
  short (Oando's was missing everything after the colon).
- `OneScan` — dropped closing sentence.
- `Insights` — all 3 fallback post excerpts trimmed mid-sentence.
- `Footer` — EXPLORE column was missing its 6th link ("Business
  models") and mislabeled its 3rd link "How it works" (duplicating SEE
  IT's first item) instead of "How we work". SEE IT column was missing
  "Live demo".

**Checked and confirmed already correct, no changes:** `Layer`,
`ThreeSteps`, `WhoWeServe`, `AgentGrid`, `WhyDecentralized`, `TrustBand`,
`StatsBar`, `TwoIdeas`, `Hero` (geometry from Round 7 intact).

**Also confirmed:** `NotACryptoPlay`, `SoftwareThatActs`, and
`WholeStack` are not orphaned — they're rendered on `/layer`, just not
the homepage. No action needed.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 9 — /layer components audited against the original source HTML

Round 8 audited the 19 homepage sections. This round covered the 3
components that render on `/layer` instead: `NotACryptoPlay`,
`SoftwareThatActs`, `WholeStack`. Sample.pdf doesn't include this
content, so these were checked against
`Echolink_Solutions___The_Verifiable_Integration_Layer.html` — the
original source document — reading the actual markup directly instead
of a screenshot transcription.

**`NotACryptoPlay`** — checked, already word-for-word exact. No changes.

**`SoftwareThatActs`** — this component's own code comments admitted the
right-hand panel had been transcribed from a zoomed screenshot with some
values "partly illegible." With the real source text available, found:
- Eyebrow label was wrong: "SOFTWARE THAT ACTS" → corrected to
  "DECENTRALIZED AI AGENTS" (the section's actual eyebrow).
- Step 1 ("Sees") description had drifted from the source wording.
- Step 2 ("Decides") had "no single provider is a single point of
  failure" (awkward double "single") → corrected to source's "no one
  provider is a single point of failure."
- Right panel header was "AGENT GUARDRAILS" → source says "POLICY
  CONTROL".
- **A full row was missing from the panel**: "Spend authority — up to
  $25,000" wasn't there at all, leaving 3 rows instead of the real 4.
- Panel row "Off-vendor action" → corrected to source's "Off-policy
  action".
- EDI exchange agent description was actually wrong on a domain detail:
  said "initiates the ship acknowledgement" → corrected to source's
  "returns the 855 acknowledgement" (855 is the real EDI document type
  for a purchase order acknowledgement — this was a factual error, not
  just phrasing).
- Clinical assist agent description dropped "FHIR" and "build" →
  restored: "grounded in live FHIR patient context and your hospital's
  own build documentation."

**`WholeStack`** — found real drift here too:
- Eyebrow "THE CATEGORY OF ONE" → source says "The category we own",
  corrected.
- Enterprise integration row listed "EDI, API, ERP, WMS, SCADA, IoT, and
  more" — dropped "MES" and "HL7/FHIR" from the source list and invented
  "IoT, and more" which isn't in the source. Corrected to the exact
  source list: "EDI, APIs, ERP, WMS, MES, SCADA, HL7/FHIR."
- The other 3 row values had all drifted from their source wording
  (paraphrased rather than exact) — corrected to match verbatim.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 10 — Closing CTA card checked, and a self-correction

Checked the closing CTA card ("Let's wire your first verifiable
workflow.") against the original standalone HTML mockup
(`Echolink_Solutions___The_Verifiable_Integration_Layer.html`), since
that's what Round 9 had been using as the reference for content not
covered by Sample.pdf. The mockup's CTA buttons differ from the current
code: "Book a working session" (mailto to support@echolinksolutions.com)
+ a phone number, vs. the code's "info@echolinksolutions.com" + "See
what we deliver."

That fix was applied, then reverted in the same session. Reason:
Sample.pdf — the reference this whole homepage audit (Rounds 8-9) has
been verified against — includes this exact card, and shows the
buttons matching what the code already had. The standalone HTML mockup
is an older draft; Sample.pdf is the current, more authoritative source
for homepage content specifically. Round 9 was correct to fall back to
the mockup for `/layer`'s content (`SoftwareThatActs`, `WholeStack`,
`NotACryptoPlay`), since Sample.pdf doesn't cover that page at all — but
for anything Sample.pdf does cover, Sample.pdf wins.

Heading and body paragraph on this card were already exact against
Sample.pdf — no changes needed there.

**Net change this round: none** — reverted back to the pre-Round-10
state after confirming it was already correct.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 11 — Closing CTA card layout fix (structure, not just copy)

Round 10 checked this card's text and buttons but missed that the
*layout* itself was wrong — checked copy only, not structure.

**Bug:** the card was a 2-column grid (heading+paragraph on the left,
both buttons stacked in a column on the right, side by side with the
text). Direct crops of Sample.pdf show a single centered column instead:
heading, then the paragraph below it, then both buttons side by side on
their own row underneath — everything horizontally centered in the
card, not split left/right.

**Fix:** `components/Footer/index.tsx` — replaced the
`grid md:grid-cols-[1fr_auto]` layout with a centered flex-column
(`text-center`, headline and paragraph given `mx-auto` + max-width, both
buttons in a `justify-center` row below).

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 12 — Insights section, same blind spot as Round 11

Same pattern as the closing CTA card: Round 8 checked this section's
copy (the 3 excerpt trims) but never checked its layout or color
against the reference. Direct crop of Sample.pdf shows three real
mismatches:

1. **Background was light** (`bg-[#F2F5F7]`) — reference has this
   section on the site's standard dark background, not a light band.
2. **Header was split left/right** (eyebrow+title on the left, subhead
   paragraph on the right in a flex row) — reference shows all three
   (eyebrow, title, subhead) stacked and centered in one column, same
   `sec-header` pattern used by most other dark sections on the page.
3. **Posts were a horizontal list** (rows with divider lines, tag in a
   narrow left column, "Read →" in a right column) — reference shows a
   3-column grid of standard dark `.card` boxes, each with a pill-shaped
   tag badge (reused the existing `.eyebrow` pill styling at a smaller
   size), bold title, description, and "Read →" at the bottom.

Rebuilt `components/Insights/index.tsx` to match all three. The
click-to-expand modal (not present in the static reference, an
interactive addition) was left as its own light reading panel — a
reasonable independent choice not contradicted by anything in the
source, so no reason to force it dark just because the section
background changed.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 13 — Trusted to Build Trust, caption alignment

Small, targeted fix: the closing caption ("Aetna engagement delivered.
DFO Retail, Oando, and Western Beef prototypes shown with permission.")
had no centering class, so it sat left-aligned at full section width
while everything else in the section (header, cards) is centered.
Added `text-center` to match.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 14 — One Scan, phone frame

Targeted fix, scope-limited to just the outer frame per direct
feedback: it was a plain rounded-corner box (`rounded-[2rem]` +
border), not an actual phone shape. Checked against a zoomed crop of
Sample.pdf, which shows a real phone silhouette — thick dark bezel, a
notch cut into the top of the screen, small side-button details on the
frame edges.

Rebuilt `components/OneScan/index.tsx`'s frame only: thick border
(`border-[10px] border-ink-600`), a 9:19.5 phone aspect ratio, a notch
(small centered pill at the top, `rounded-b-2xl`), and 3 side-button
marks on the frame edges. The QR icon, caption text, and verified-
journey content inside the screen are unchanged, as scoped.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 15 — Two Ideas, drawn simply — full structural rebuild

Full review of this section against direct crops of Sample.pdf, checking
structure this time, not just text (per the pattern caught in Rounds 11
and 12). Found the biggest structural bug of the whole audit:

**Diagram 2 was using the wrong shape entirely.** It shared the same
component as Diagram 1 (a sequential vertical chain: node, arrow, node,
arrow...). The reference shows Diagram 2 as a fundamentally different
structure: 6 systems in PARALLEL, each with its own small "AI" badge,
all converging into one shared "BLOCKCHAIN" node, then down into
"Shared Decision Network" — a many-to-one funnel, not a chain. Split
`InteractiveDiagram` into two purpose-built components:
`TrustChainDiagram` (diagram 1, unchanged shape) and
`SharedNetworkDiagram` (diagram 2, new — parallel rows with AI badges,
each converging via a decorative trunk line into a Blockchain node and
then a Shared Decision Network box).

**Three smaller fixes alongside it:**
- Diagram 1's "verify" steps were full-width pill buttons; reference
  shows a small rotated-square cube icon with a "verify" label beside
  it. Restyled to match.
- The empty-state hint text was the same generic string
  ("Tap any box to see what it does") on both diagrams. Reference uses
  different wording per diagram — diagram 2 says "Tap any system to see
  what it does." Made configurable per diagram via a new `hint` prop.
- There were two separate footer captions, one duplicated inside each
  card. Reference has exactly one, shared, centered below both cards.
  Removed the per-card footers and added one shared caption at the
  section level instead.
- Top diagram's "Blockchain" icon had 2 overlapping cube shapes;
  reference shows 3 forming a small stacked cluster. Added the third.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.

## Round 16 — Two Ideas, second pass: color/fill accuracy

Asked to review this section again after Round 15's structural rebuild.
Zoomed to extreme close-up crops of individual elements (a single verify
cube, the BLOCKCHAIN box) rather than the whole-section crop used in
Round 15, and found a consistent pattern missed at that zoom level: key
elements were translucent/outlined (`bg-accent-soft` + `border-accent`)
when the reference actually shows them solid-filled.

**Fixes in `components/TwoIdeas/index.tsx`:**
- Diagram 1's "verify" cube was a translucent outlined diamond, stacked
  above its label. Reference shows a solid two-tone filled cube (a
  lighter top facet, darker bottom facet, giving real 3D depth),
  positioned beside its label horizontally, not stacked above it.
  Rebuilt using two overlapping solid shapes (a solid `bg-accent`
  diamond plus a `bg-black/25` clipped overlay for the shaded facet),
  laid out in a horizontal row with the "verify" text.
- Added dotted vertical connector segments between chain nodes — the
  reference shows a short dotted line linking each rectangle to the
  cube below it; there was no connector at all before.
- Diagram 2's "AI" badges were translucent outlined circles; reference
  shows solid orange fill with dark text. Corrected to `bg-accent` with
  `text-ink` (dark navy, matching the page background color token).
- Diagram 2's "BLOCKCHAIN" node had the same translucent/outlined
  treatment; reference shows a solid orange pill with dark bold text.
  Corrected the same way.

Verified: `tsc --noEmit` clean, full `next build` — 19 routes.
