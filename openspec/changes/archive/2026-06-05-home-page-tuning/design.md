# Design: home-page-tuning

## 1. Architecture Overview

This change is a narrow raw-CSS tuning pass for the Home route `/`. It should stabilize Home CSS ownership after the shared button/focus primitive unit, not redesign the page.

### Cascade and layer ownership

Current stylesheet order is:

```txt
variables → reset → primitives → layout → sidebar → home → portfolio/blog/contact/pages/footer/error → responsive-* → dark-mode
```

The design uses that order intentionally:

| Layer | Owner responsibility for this change |
| --- | --- |
| `src/styles/primitives.css` | Shared `.btn`, `.btn--primary`, `.btn--outline`, and shared gold `:focus-visible` primitive. Read-only unless a primitive bug is proven. |
| `src/styles/home.css` | Primary owner of Home-specific composition, CTA typography/visual emphasis, control-room/proof/pipeline styling, Home-local dark details, Home-local reduced-motion suppressions, and Home component breakpoints. |
| `src/styles/responsive-tablet.css`, `responsive-mobile.css`, `responsive-small.css` | Page shell and breakpoint-wide layout values: body/layout scroll, safe-area padding, shell padding, sidebar/nav breakpoint behavior, and non-Home page responsive rules. These should remain read-only for this unit. |
| `src/styles/dark-mode.css` | Global dark theme tokens and cross-page dark overrides. It imports last and should not become the place for Home-only decorative panel tuning in this slice. |
| `src/styles/index.css` | Import order. Read-only because the current order already supports primitive-before-page ownership and global dark overrides last. |

### Why `src/app/page.tsx` remains read-only

`src/app/page.tsx` already has the required structural state for this tuning pass:

- Home CTAs already carry `home-hero__cta-link`, Home variant classes, `.btn`, and the relevant `.btn--*` variant.
- The control-room preview and pipeline are decorative and intentionally `aria-hidden="true"`.
- Case-study cards use semantic `article`, heading, paragraph, and list markup.
- No blocking accessibility issue was found in Explore or Design.

Therefore, Apply should not change JSX, route metadata, data loading, content strings, content order, control flow, or imports. A JSX change would require a newly documented blocking accessibility issue and explicit approval before Apply.

## 2. CTA Ownership Contract

The Home CTA links intentionally combine shared primitives and Home-owned visual emphasis:

```txt
home-hero__cta-link home-hero__cta-link--primary btn btn--primary
home-hero__cta-link home-hero__cta-link--secondary btn btn--outline
```

### Exact CTA ownership table

| Declaration / behavior | Current owner(s) | Apply decision | Rationale |
| --- | --- | --- | --- |
| `display: inline-flex` | `.home-hero__cta-link` and `.btn` | Remove from `.home-hero__cta-link` if visual parity holds | Exact duplicate; shared button layout belongs to `.btn`. |
| `align-items: center` | `.home-hero__cta-link` and `.btn` | Remove from `.home-hero__cta-link` if visual parity holds | Exact duplicate; shared vertical centering belongs to `.btn`. |
| `gap: 0.6rem` | `.home-hero__cta-link` and `.btn` | Remove from `.home-hero__cta-link` if visual parity holds | Exact duplicate; shared CTA internal gap belongs to `.btn`. |
| `padding: 1rem 2.4rem` | `.home-hero__cta-link` and `.btn` | Remove desktop/base declaration from `.home-hero__cta-link` if visual parity holds | Exact duplicate at base size. Keep small-screen override because it is Home responsive sizing. |
| `border-radius: 3.2rem` | `.home-hero__cta-link` and `.btn` | Remove from `.home-hero__cta-link` if visual parity holds | Exact duplicate; shared pill shape belongs to `.btn`. |
| `text-decoration: none` | `.home-hero__cta-link`, `.btn`, and reset/link defaults | Remove from `.home-hero__cta-link` if visual parity holds | Exact duplicate of `.btn`; no need for page-local restatement. |
| `transition: transform/box-shadow/background/color ...` | `.home-hero__cta-link` and `.btn` | Prefer removing local base transition from `.home-hero__cta-link` | Not an exact text duplicate because `.btn` also includes `border-color` and `opacity`, but keeping both creates split transition ownership. Let `.btn` own the base transition unless a visual regression is found. |
| `font-size: 1.3rem` | `.home-hero__cta-link` | Keep | `.btn` intentionally does not own typography. |
| `font-weight: 500` | `.home-hero__cta-link` | Keep | Home-specific hero visual weight. |
| Small breakpoint `padding: 0.9rem 2rem` | `.home-hero__cta-link` inside `max-width: 480px` | Keep | Home-specific responsive sizing override; `.btn` has no breakpoints. |
| Small breakpoint `font-size: 1.2rem` | `.home-hero__cta-link` inside `max-width: 480px` | Keep | Home-specific responsive typography. |
| Primary base `background`, `color`, `box-shadow` | `.home-hero__cta-link--primary` plus `.btn--primary` | Keep Home primary `box-shadow`; keep color/background only if needed for explicit local parity | `.btn--primary` provides the same filled color contract, but Home still owns hero glow. Removing exact background/color duplicates is optional only after visual parity confirmation. |
| Primary `:hover` / `:focus-visible` lift and glow | `.home-hero__cta-link--primary` | Keep | Home hero emphasis; primitives intentionally do not own hover/focus lift. |
| Secondary base `border`, `color`, `background` | `.home-hero__cta-link--secondary` plus `.btn--outline` | Keep or remove exact duplicates only after parity check | `.btn--outline` already owns the outline baseline, but keeping explicit Home values is acceptable if it documents variant intent. Do not change visual state. |
| Secondary `:hover` / `:focus-visible` lift and fill | `.home-hero__cta-link--secondary` | Keep | Home-specific outline-to-fill behavior. |

### Transition decision and reduced motion

Recommended Apply behavior:

1. Remove the base `.home-hero__cta-link` transition so `.btn` owns the default transition baseline.
2. Do not add a Home-specific replacement transition unless a visual parity check identifies a reason.
3. Keep the existing Home reduced-motion selector:

```css
@media (prefers-reduced-motion: reduce) {
  .home-hero__cta-link,
  .case-card {
    transition: none;
  }
}
```

Even after the local transition declaration is removed, this reduced-motion rule remains useful because `home.css` imports after `primitives.css`; it can explicitly suppress `.btn` transitions for Home CTAs in addition to the global reset baseline.

## 3. Responsive Composition Strategy

Responsive tuning must stay inside Home component rules in `home.css`. Do not move page-shell ownership into `home.css`, and do not move Home component layout into the global responsive files.

### Selectors and rules to consider in `home.css`

| Area | Selectors | Rules to inspect/tune if smoke reveals density or overflow |
| --- | --- | --- |
| Hero collapse | `.home-hero`, `.home-hero__right`, `.home-hero__left`, `.home-hero__cta` | Preserve desktop `grid-template-columns: 1fr 1fr`; preserve `max-width: 1023px` one-column collapse and `order: -1` for the visual preview; tune only gap/alignment if cramped. |
| Control-room container | `.control-room` | Preserve max desktop width and card identity. At mobile, consider only local sizing/padding refinements such as `max-width: 100%`, lower padding, or `overflow: hidden` if decorative internals create overflow. |
| Control-room grid | `.control-room__grid`, `.control-room__node`, `.control-room__node-label`, `.control-room__node-desc`, `.control-room__line*`, `.control-room__pulse*` | If mobile overflow appears, prefer `grid-template-columns: repeat(2, minmax(0, 1fr))`, `min-width: 0` on nodes, smaller gap, or text wrapping on node text. Do not rewrite the diagram or JSX. |
| Proof grid | `.home-proof__grid`, `.case-card`, `.case-card__stack`, `.case-card__stack li` | Keep desktop three columns, tablet two columns, mobile one column. If long text or pills overflow, prefer `minmax(0, 1fr)`, `min-width: 0`, and wrapping on stack pills. |
| Pipeline wrapper | `.home-pipeline` | Keep decorative compact architecture flow. If small-mobile density fails, tune `gap`, `row-gap`, `padding`, `justify-content`, or flex basis locally. |
| Pipeline items | `.home-pipeline__step`, `.home-pipeline__label`, `.home-pipeline__arrow`, `.home-pipeline__icon` | Current labels use `white-space: nowrap`; if overflow appears at small widths, consider scoped small-breakpoint wrapping for labels or flex-basis for steps. Hiding/de-emphasizing arrows is acceptable only if needed because the pipeline is decorative (`aria-hidden`). |
| CTA small sizing | `.home-hero__cta-link` inside `max-width: 480px` | Keep local padding/font-size overrides because `.btn` has no responsive contract. |

### What not to move from responsive files

Do not move or duplicate these rules from responsive files into `home.css`:

- `body:has(.content__page--home)` scroll behavior.
- `.layout:has(.content__page--home)` height/min-height/overflow/grid-row behavior.
- `.layout__main` breakpoint padding and overflow.
- `.content__page--home` page-shell padding using `--safe-bottom`.
- Sidebar/header and bottom navigation responsive behavior.
- Non-Home page responsive rules.

`home.css` may keep and tune component-level breakpoints for Home internals only.

## 4. Dark-Mode Strategy

Dark-mode tuning should remain conservative and Home-local. The current Home dark section is functional and may stay in `home.css` because it styles Home-only decorative components.

### Hardcoded dark values: keep vs optionally normalize

| Current value / selector family | Decision | Notes |
| --- | --- | --- |
| `#1a1b30` on `.control-room`, `.case-card`, `.home-pipeline` | Optionally normalize to `var(--color-principal)` inside `[data-theme="dark"]` | In dark mode, `--color-principal` is currently `#1a1b30`. This is a safe readability/consistency cleanup if visual diff is nil. |
| `#50b1b1` on control-room handoff/audit accents | Optionally normalize to `var(--secundario-color)` | Exact semantic token exists and matches the current value. |
| `#e2e2ec` on `.control-room__node-label` | Optionally normalize to `var(--color-titles)` or `var(--terciario-color)` | Both resolve to `#e2e2ec` in the current dark theme. Prefer `--color-titles` for text. |
| `#22253a` on `.control-room__node` | Keep unless a token-equivalent is introduced in a separate theme-token change | It creates a Home-specific raised node surface; no exact global token exists. |
| `#333656` on node/card/pipeline borders and stack borders | Keep unless contrast testing motivates a tiny local adjustment | It is a Home-specific stronger divider than `--color-border-reviews`; changing it mechanically could reduce contrast. |
| `#f5c84a` in gradients | Keep | Gradient highlight is decorative and intentionally warmer than the main principal color. |
| Existing rgba shadows and gold overlays | Keep | They encode Home depth/glow and do not imply global token migration. |

Do not migrate Home dark rules wholesale to `dark-mode.css`. Do not redesign global dark variables. Do not normalize every hardcoded color just for token purity.

## 5. Reduced-Motion and Focus-Visible Strategy

### Reduced motion

The project already has two layers of reduced-motion protection:

1. `reset.css` globally minimizes animation/transition duration and scroll behavior under `prefers-reduced-motion: reduce`.
2. `home.css` explicitly disables Home entrance animations, divider animation, control-room node pulse animation, data pulses, and CTA/card transitions.

Apply must preserve the Home block. If CTA transition dedup removes the base `.home-hero__cta-link` transition, keep the reduced-motion selector anyway so Home CTAs explicitly suppress `.btn` transitions in reduced-motion contexts.

### Focus visible

Shared keyboard focus ownership remains in `primitives.css` through the gold-ring group that includes both `.btn:focus-visible` and `.home-hero__cta-link:focus-visible`.

Apply must:

- preserve the shared `outline` and `outline-offset` from the primitive layer;
- not add `outline: none` or global `a:focus-visible` / `button:focus-visible` rules;
- keep Home variant `:focus-visible` effects additive and class-scoped;
- preserve mouse/touch behavior by relying on `:focus-visible`, not `:focus`.

Note for verification: the primary CTA's Home variant also sets `box-shadow` on `:focus-visible`, and `home.css` imports after `primitives.css`. Automated tests should assert the visible focus outline and, if reading computed `box-shadow`, wait for the 250ms transition to finish and account for the Home primary glow overriding the primitive box-shadow.

## 6. Implementation File Plan

| File | Expected Apply status | Planned responsibility |
| --- | --- | --- |
| `src/styles/home.css` | Primary source file | CTA base dedup, optional tiny Home-local responsive/dark refinements, preserve reduced-motion and focus-compatible variant behavior. |
| `src/app/page.tsx` | Read-only | No JSX, metadata, imports, data, content, route, or control-flow change unless a blocking a11y issue is later documented and approved. None is currently identified. |
| `src/styles/primitives.css` | Read-only | `.btn`, variants, and shared focus ring already exist. Do not redesign primitives. |
| `src/styles/responsive-mobile.css` | Read-only | Owns mobile page-shell padding/overflow/safe-area behavior. |
| `src/styles/responsive-tablet.css` | Read-only | Owns tablet page-shell padding/overflow/safe-area behavior. |
| `src/styles/responsive-small.css` | Read-only | Owns global small-breakpoint shell and non-Home page tuning. |
| `src/styles/dark-mode.css` | Read-only | Owns global dark tokens/cross-page overrides. No Home-specific migration. |
| `src/styles/index.css` | Read-only | Import order is already correct. |

Expected source diff if scoped correctly: `src/styles/home.css` only.

## 7. Verification Design

Later Verify should include automated and smoke checks.

### Automated commands

- `npm run lint`
- `npm run build`
- `git diff --check`

### Static diff audit

Confirm:

- no `src/app/page.tsx` change;
- no route/data/content/metadata/control-flow change;
- no global `a`/`button` restyle;
- no `.btn`/focus primitive redesign;
- no Tailwind/shadcn introduction;
- no `openspec/specs/design-responsividad/` changes;
- expected source change is limited to `src/styles/home.css` unless an approved exception exists.

### Playwright or manual smoke matrix

| Context | Checks |
| --- | --- |
| Desktop `/` | Expected heading and CTAs render; two-column hero remains recognizable; proof grid remains three columns; no unexpected CTA visual drift. |
| Keyboard focus | Tab to both Home CTAs; visible focus outline appears; Enter activates links; mouse click does not force keyboard-only focus styling. Wait at least 300ms before computed `box-shadow` assertions. |
| Dark mode | Hero text, CTAs, control-room, proof cards, and pipeline remain readable; decorative dark surfaces retain adequate contrast. |
| Reduced motion | Home entrance animations, divider animation, control-room pulses, data pulses, CTA/card transitions are suppressed or minimized. |
| Tablet/mobile/small mobile | One-column hero remains readable; control-room, proof cards, and pipeline do not clip or create horizontal page overflow. |

Suggested manual viewport set: desktop wide, `1024px`, `768px`, `390px`, and `360px` widths.

## 8. Review Workload Forecast and Fail-Stop

Target review budget from session preflight: **≤300 changed lines per unit**.

Expected source diff:

```txt
30–120 changed lines, likely only src/styles/home.css
```

Fail-stop before Apply:

- Stop if the Apply forecast exceeds **150 source changed lines** without explicit user approval.
- Stop if Design/Tasks expands beyond Home CSS into JSX, route/data/content, global primitives, global responsive architecture, or global dark-mode migration.
- Stop if the implementation plan touches `openspec/specs/design-responsividad/`.

No chained PR split is recommended unless scope expands unexpectedly.

## 9. Risks, Tradeoffs, and Rollback

| Risk / tradeoff | Mitigation |
| --- | --- |
| Removing CTA declarations causes subtle visual drift | Remove only exact duplicates first; visually compare before/after; keep Home typography, responsive sizing, and variant effects. |
| Removing local transition changes interaction timing | Let `.btn` own the same 250ms baseline; keep reduced-motion override; smoke hover/focus. |
| Focus box-shadow assertions are misleading | Assert outline and visible focus; wait for transition completion before computed style reads; account for Home primary focus glow overriding primitive box-shadow. |
| Responsive tuning grows into redesign | Limit to control-room/proof/pipeline component selectors in `home.css`; fail-stop above 150 source lines. |
| Dark normalization reduces contrast | Normalize only exact token aliases or leave current hardcoded values; do not mechanically replace stronger local dark borders. |
| Pipeline small-mobile readability is subjective | Treat pipeline as decorative; prefer minimal wrap/gap tweaks, not content or JSX changes. |

Rollback is straightforward: revert `src/styles/home.css` to the previous commit and re-run lint/build plus Home smoke. Shared primitives should not be reverted unless a separate primitive bug is proven.

## 10. Recommendation for Tasks

Proceed to Tasks with a small, session-completable plan:

1. Audit current `.home-hero__cta-link` declarations against `.btn` and remove safe base duplicates in `home.css` only.
2. Preserve Home CTA typography, small-breakpoint sizing, and variant hover/focus effects.
3. Run focused local smoke for responsive control-room/proof/pipeline and apply only tiny Home CSS refinements if overflow/density is observed.
4. Optionally normalize exact Home dark-mode token aliases only when visual diff is nil; otherwise leave dark values unchanged.
5. Verify lint, build, diff cleanliness, Home keyboard focus, dark mode, reduced motion, and mobile overflow.
