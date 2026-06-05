# Explore: home-page-tuning

## Status

Exploration complete for the root Home page `/` after the recently archived foundation, visual primitive, profile overflow, and button/focus primitive units.

## Executive Summary

The Home page is already a strong “AI Operations Control Room” composition. The next slice should be a **tuning pass**, not another redesign. The best candidate scope is CSS-only refinement of Home-specific ownership now that `.btn` and shared focus primitives exist:

- reduce duplicated CTA primitive declarations in `home.css` where `.btn` now owns the same behavior,
- preserve Home-owned typography, hover, and hero-specific visual emphasis,
- tighten responsive composition around the control-room preview, proof cards, and pipeline,
- audit dark-mode hardcoded colors in Home-specific blocks,
- preserve keyboard focus behavior from the shared primitive layer.

No route, data, content, control-flow, or structural JSX change is recommended for the first slice.

## Current Home Structure

Source file: `src/app/page.tsx`.

The Home page renders one page section:

```txt
.content__page.content__page--home
├─ .home-hero
│  ├─ header.home-hero__left
│  │  ├─ eyebrow
│  │  ├─ h1.page__name.home-hero__name
│  │  ├─ role
│  │  ├─ divider
│  │  ├─ tagline
│  │  └─ .home-hero__cta
│  │     ├─ /casos-reales Link: home-hero__cta-link ... btn btn--primary
│  │     └─ /contacto Link: home-hero__cta-link ... btn btn--outline
│  ├─ .home-hero__right[aria-hidden="true"]
│  │  └─ .control-room CSS-only workflow preview
├─ section.home-proof[aria-label="Casos de estudio"]
│  └─ .home-proof__grid
│     └─ article.case-card[] from flagshipCaseStudies
└─ .home-pipeline[aria-hidden="true"]
```

The control-room preview and pipeline are decorative/diagrammatic and intentionally hidden from the accessibility tree with `aria-hidden="true"`. No blocking JSX accessibility problem was found during Explore.

## CSS Ownership Map

Primary Home CSS file:

- `src/styles/home.css`

Relevant shared layers:

- `src/styles/primitives.css` — now owns `.btn`, `.btn--primary`, `.btn--outline`, and shared gold-ring `:focus-visible`.
- `src/styles/responsive-foundation.css` / `responsive-*.css` — own layout shell and page-level mobile/tablet behavior.
- `src/styles/dark-mode.css` — global dark tokens and cross-page dark overrides.
- `src/styles/layout.css` — main shell/scroll ownership.
- `src/styles/index.css` — cascade order.

Observed cascade order keeps `home.css` after `primitives.css`, so Home selectors override `.btn` where they intentionally set the same property.

## Findings

### 1. CTA primitive duplication is now the cleanest first tuning target

The Home CTA links now use both:

```txt
home-hero__cta-link home-hero__cta-link--primary btn btn--primary
home-hero__cta-link home-hero__cta-link--secondary btn btn--outline
```

`home.css` still duplicates several `.btn` base declarations:

- `display: inline-flex`
- `align-items: center`
- `gap: 0.6rem`
- `padding: 1rem 2.4rem`
- `border-radius: 3.2rem`
- `text-decoration: none`
- transition pieces now also present in `.btn`

This is not currently broken, but it creates split ownership after Unit 4. A conservative cleanup should let `.btn` own shared shape defaults while `home.css` keeps Home-specific typography and hover emphasis.

Recommended first-slice direction:

- Keep `.home-hero__cta-link` for Home-specific typography and any Home-specific refinements.
- Remove only exact duplicate declarations that `.btn` now owns, if visual parity is confirmed.
- Keep `.home-hero__cta-link--primary` and `--secondary` because they own Home-specific hover/focus visual states.

### 2. Focus ring is shared but Home variants still add visual focus effects

`primitives.css` supplies the gold `:focus-visible` ring. Home variant selectors still group `:hover` and `:focus-visible`:

```css
.home-hero__cta-link--primary:hover,
.home-hero__cta-link--primary:focus-visible { ... }

.home-hero__cta-link--secondary:hover,
.home-hero__cta-link--secondary:focus-visible { ... }
```

This is acceptable if intentional: keyboard users get both the shared ring and the same lift/fill affordance as hover. However, the first Unit 4 smoke showed that `box-shadow` is transitioned, so automated focus assertions must wait for transition completion before reading computed shadow.

Recommended first-slice direction:

- Preserve shared primitive focus ownership.
- Do not introduce global focus rules.
- If tuning Home focus, keep it additive and class-scoped.

### 3. Dark-mode Home block is local and functional, but has hardcoded dark colors

`home.css` contains a Home-specific dark-mode section for:

- `.control-room`
- `.control-room__node`
- `.control-room__line`
- `.case-card`
- `.home-pipeline`
- Home decorative pseudo-elements

Several colors are hardcoded (`#1a1b30`, `#22253a`, `#333656`, `#50b1b1`, `#e2e2ec`) rather than tokens. This is not necessarily wrong, but it is a tuning candidate because the global dark theme already defines many equivalent tokens.

Recommended first-slice direction:

- Prefer small dark-mode normalization only if it improves consistency without changing the visual identity.
- Do not move all Home dark-mode styling into `dark-mode.css` during this slice; that would expand scope.

### 4. Reduced-motion coverage exists and should be preserved

`home.css` has a Home-specific reduced-motion block that disables entrance animations, divider animation, node pulse animation, data pulse display, and CTA/card transitions. `reset.css` also provides a global reduced-motion baseline.

Recommended first-slice direction:

- Preserve this block.
- If CTA transition declarations are deduplicated, verify reduced-motion still results in no visible motion for CTAs.

### 5. Responsive composition is split between Home and responsive files

Home component-level responsive rules live in `home.css`:

- `max-width: 1023px`: hero collapses to one column; control-room moves above text; proof grid becomes two columns; pipeline tightens.
- `max-width: 767px`: centered hero, smaller control-room, proof grid one column.
- `max-width: 480px`: smaller CTA, heading, and pipeline typography.

Page-level padding/overflow/min-height is intentionally owned by `responsive-tablet.css` and `responsive-mobile.css`. This split is documented in comments and should remain.

Potential tuning targets:

- Small-screen pipeline may remain visually busy because it preserves arrows and nowrap labels.
- Control-room and proof grid spacing may need a pass after CTA primitive cleanup.
- Avoid broad responsive retuning; keep Home-specific component refinements only.

### 6. Structural/JSX observations are non-blocking

No blocking semantic problem was found. The decorative control-room and pipeline are hidden from the accessibility tree, which is consistent with their visual-only role. Case cards are real content and use semantic `article`/heading/list patterns.

Potential future note:

- If the control-room diagram ever needs to communicate unique information not repeated in text, it should stop being `aria-hidden` and receive a text alternative. That is out of scope for this CSS tuning pass.

## Candidate Proposal Scope

Recommended change name:

```txt
home-page-tuning
```

Recommended first slice:

1. Conservative CTA CSS ownership cleanup in `home.css` after `.btn` adoption.
2. Home-only responsive composition refinements for control-room/proof/pipeline where needed.
3. Home-only dark-mode normalization where it reduces hardcoded drift without broad theme migration.
4. Preserve shared focus-visible primitive behavior.
5. Add verification covering lint/build, Playwright route smoke, keyboard focus on Home CTAs, dark mode, reduced motion, and mobile viewport smoke.

## Out of Scope

- Full Home redesign.
- Route/data/content/control-flow changes.
- Rewriting the control-room markup.
- Changing case study data or copy.
- Global primitive changes unless a strict bug is found.
- Global dark-mode architecture migration.
- Broad responsive retuning outside Home component rules.
- Tailwind/shadcn migration.
- Changes to `openspec/specs/design-responsividad/`.
- Hover normalization across the site.

## Likely Files

Expected Apply files:

| File | Expected role |
| --- | --- |
| `src/styles/home.css` | Primary tuning target: CTA dedup, Home composition, local dark/reduced-motion/responsive refinements. |
| `src/app/page.tsx` | Read-only unless a blocking accessibility issue appears; no recommended first-slice change. |
| `src/styles/primitives.css` | Read-only; only touch if a primitive bug is proven. |
| `src/styles/responsive-mobile.css` | Prefer read-only; page-level ownership should remain stable. |
| `src/styles/responsive-tablet.css` | Prefer read-only; page-level ownership should remain stable. |
| `src/styles/dark-mode.css` | Prefer read-only; Home-specific dark blocks currently live in `home.css`. |

## Review Budget Forecast

Estimated Apply diff if scoped correctly:

```txt
30–120 changed lines
```

Risk of exceeding 300 lines: low, unless the unit expands into a broader Home redesign or cross-file responsive/theme migration.

Fail-stop recommendation:

- Stop before Apply if Proposal/Design wants to touch more than `home.css` plus optional tiny verification artifacts.
- Stop if expected source diff exceeds 150 lines without explicit user approval.

## Verification Recommendations

Later Verify should require:

- `npm run lint`
- `npm run build`
- `git diff --check`
- Static checks:
  - no route/data/content changes,
  - no `openspec/specs/design-responsividad/` changes,
  - no global `a`/`button` restyle,
  - `.btn`/focus primitive behavior remains intact.
- Playwright smoke:
  - `/` renders expected heading and CTAs,
  - Home CTA `.btn` controls are reachable by keyboard and show visible focus,
  - dark-mode context still renders Home CTAs/control-room/proof cards,
  - reduced-motion context suppresses Home entrance/pulse motion,
  - mobile viewport does not introduce horizontal overflow.

## Risks and Unknowns

- Visual judgment is required: the Home page may already be “good enough,” so Proposal should avoid inventing changes.
- CTA dedup can be safe only if declarations are exact duplicates or page-specific overrides remain explicit.
- Dark-mode hardcode normalization can accidentally reduce contrast if done mechanically.
- Pipeline mobile tuning may become design-heavy; keep it bounded.
- Automated focus tests need to wait for transition completion before asserting `box-shadow`.

## Next Recommended

Proceed to `sdd-proposal` for `home-page-tuning`, with a narrow CSS-first proposal centered on Home ownership cleanup and responsive/dark/focus smoke criteria.

## Skill Resolution

`paths-injected` intended. Parent/subagent workflow attempted injected skill loading, but child Explore runs were paused/timed out before artifact completion, so this parent-authored artifact used the already selected project skills and existing session context.
