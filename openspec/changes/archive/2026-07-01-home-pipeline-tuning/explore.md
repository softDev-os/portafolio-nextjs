# Explore: home-pipeline-tuning

## Status

Explore complete for the Home pipeline decorative block. Pipeline is a simple component already visible in earlier reads; inline exploration follows.

## Executive Summary

The Home pipeline is a small flex-based decorative block at the bottom of the Home page: four steps with icons, connected by arrow characters, wrapped in a card-style container. It is intentionally `aria-hidden="true"` because the control-room diagram conveys the same concept visually above.

The pipeline works but feels dense at small widths due to four nowrap labels, and its connection to the rest of the Home ("AI Operations Control Room") could be stronger. Recommended direction: light CSS tuning to keep it readable on mobile and optionally connect its visual tone more clearly to the proof cards above it.

Micro JSX is not necessary for this component. CSS-only is sufficient.

## Current JSX Structure

Source: `src/app/page.tsx`.

Current block:

```tsx
<div className="home-pipeline" aria-hidden="true">
  <div className="home-pipeline__step">
    <span className="home-pipeline__icon">◉</span>
    <span className="home-pipeline__label">Mensaje entrante</span>
  </div>
  <div className="home-pipeline__arrow">→</div>
  <div className="home-pipeline__step">
    <span className="home-pipeline__icon">◇</span>
    <span className="home-pipeline__label">Clasificación IA</span>
  </div>
  <div className="home-pipeline__arrow">→</div>
  <div className="home-pipeline__step">
    <span className="home-pipeline__icon">▣</span>
    <span className="home-pipeline__label">Decisión segura</span>
  </div>
  <div className="home-pipeline__arrow">→</div>
  <div className="home-pipeline__step">
    <span className="home-pipeline__icon">◈</span>
    <span className="home-pipeline__label">Humano informado</span>
  </div>
</div>
```

No data source. Static markup.

## Current CSS Ownership

All in `src/styles/home.css`:

- `.home-pipeline` — flex container, card surface, rounded, entrance animation, already has `flex-wrap`.
- `.home-pipeline__step` — flex row for icon + label.
- `.home-pipeline__icon` — gold icon, fixed size.
- `.home-pipeline__label` — nowrap label, text color.
- `.home-pipeline__arrow` — secondary color arrow.

Responsive breakpoints:

- `max-width: 1023px` — tighter gap and padding.
- `max-width: 767px` — smaller label and icon font sizes.
- `max-width: 480px` — tighter gap/padding, smaller label and arrow.

Dark mode:

- `[data-theme="dark"] .home-pipeline` — dark surface, border.

Reduced motion:

- `.home-pipeline` is covered in the Home `prefers-reduced-motion: reduce` block: `animation: none; opacity: 1`.

## Findings

### 1. Pipeline works but feels detached

The pipeline sits as the last block on the Home page without a clear relationship to the proof cards above it. It could benefit from a subtle visual connection, such as a softer surface tone or a compact header/label like `Cadena operativa`.

### 2. Small-mobile density is cramped but functional

At 480px and below, the pipeline already reduces gap, padding, and font sizes. Four nowrap labels can still break across lines because `flex-wrap: wrap` is present. This is acceptable but not a graceful wrap. A small improvement could be allowing labels to wrap naturally at very narrow widths.

### 3. No micro JSX needed

The pipeline is decorative (`aria-hidden`). All tuning can be CSS: adjust gap/wrap behavior, connect visual tone to proof cards, fine-tune dark contrast, adjust reduced-motion if needed.

### 4. Visual connection to proof cards is missing

The pipeline uses `background: var(--color-principal)` (white in light mode) while the proof card outcome surface uses a gold-tinted background. Slightly aligning the pipeline's visual weight with the proof section could make it feel like a coherent flow.

## Candidate First Slice

Change name:

```txt
home-pipeline-tuning
```

Projected scope:

- CSS-only tuning of `.home-pipeline` and children in `src/styles/home.css`.
- No JSX changes.
- Small responsive adjustments for label wrapping at narrow widths.
- Optional subtle background/label to connect it to the proof section.
- Preserve `aria-hidden`, reduced-motion, dark-mode.
- Preserve entrance animation.

## Likely Files

| File | Expected role |
| --- | --- |
| `src/styles/home.css` | Primary target: `.home-pipeline*` CSS refinements. |
| `src/app/page.tsx` | Read-only. |

## Review Budget Forecast

Expected source diff:

```txt
15–40 changed lines
```

Only `src/styles/home.css`. Under preferred fail-stop and well under 300-line unit budget.

## Out of Scope

- No JSX changes.
- No hero/control-room/proof-cards/CTA changes.
- No route/data/content/control-flow changes.
- No global primitives or responsive foundation changes.
- No global dark-mode migration.
- No Tailwind/shadcn.
- No `design-responsividad`.

## Verification Recommendations

- `npm run lint`, `npm run build`, `git diff --check`.
- Static guards: only `src/styles/home.css` changed.
- Playwright/manual smoke on `/`: pipeline renders, labels are readable, no horizontal overflow on mobile at 390px/360px, dark-mode readable, reduced-motion suppresses animation.

## Risks and Unknowns

- Any label wrapping change could increase vertical height; ensure pipeline remains compact.
- Small widow/orphan arrows on wrap should be avoided; keep arrow visibility on right step only with CSS gap.
- Dark connection to proof cards must not pull in unrelated selectors.

## Next Recommended

Proceed to `sdd-proposal` for `home-pipeline-tuning` as a CSS-only small refinement unit.
