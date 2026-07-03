# Explore: home-control-room-tuning

## Status

Exploration complete.

## Goal

Tune the Home hero `control-room` visual block as the next small SDD unit after `home-pipeline-tuning`, preserving the existing raw CSS architecture and keeping the change reviewable.

## Context

The Home page has already been tuned in small units:

- `ui-foundation-tuning`
- `ui-visual-primitives`
- `ui-button-focus-primitives`
- `home-page-tuning`
- `home-proof-cards-tuning`
- `home-pipeline-tuning`

The current candidate block is the right-side hero visual:

```tsx
<div className="home-hero__right" aria-hidden="true">
  <div className="control-room">...</div>
</div>
```

It is decorative and currently hidden from assistive technologies via `aria-hidden="true"` at the wrapper level.

## Discovery Method

- Initialized CodeGraph for this repository because no `.codegraph/` index existed.
- CodeGraph MCP exploration timed out, so exploration fell back to targeted file reads only.
- Files read:
  - `src/app/page.tsx`
  - targeted `.control-room*`, dark-mode, reduced-motion, and responsive sections of `src/styles/home.css`
  - previous `home-pipeline-tuning` archive report for continuity

No source edits were made.

## Current Markup

Source file:

```txt
src/app/page.tsx
```

The control-room block contains:

- wrapper: `.home-hero__right` with `aria-hidden="true"`
- surface: `.control-room`
- label: `.control-room__label` — `Flujo operativo`
- grid: `.control-room__grid`
- four nodes:
  - `.control-room__node--intake`
  - `.control-room__node--triage`
  - `.control-room__node--handoff`
  - `.control-room__node--audit`
- node internals:
  - `.control-room__icon`
  - `.control-room__node-label`
  - `.control-room__node-desc`
- decorative connectors:
  - `.control-room__line--h1`
  - `.control-room__line--v1`
  - `.control-room__line--h2`
- decorative pulses:
  - `.control-room__pulse--h1`
  - `.control-room__pulse--v1`
  - `.control-room__pulse--h2`
- footer: `.control-room__footer`

Current labels:

- `Intake` / `Mensaje entrante`
- `AI Triage` / `Clasificación automática`
- `Human Handoff` / `Decisión con contexto`
- `Audit Trail` / `Memoria persistente`
- footer: `Control humano en cada decisión crítica`

## Current CSS Ownership

Primary source file:

```txt
src/styles/home.css
```

Relevant selector families:

```txt
.home-hero__right
.control-room
.control-room::before
.control-room__label
.control-room__grid
.control-room__node
.control-room__node--intake
.control-room__node--triage
.control-room__node--handoff
.control-room__node--audit
.control-room__icon
.control-room__node-label
.control-room__node-desc
.control-room__node::after
.control-room__line*
.control-room__pulse*
.control-room__footer
[data-theme="dark"] .control-room*
@media (max-width: 767px) .control-room*
```

## Existing Behavior

### Base

- `.home-hero__right` is a flex container and fades in with `homeHeroIn`.
- `.control-room` is a card-like surface with `max-width: 34rem`, white/brand surface, border radius, padding, and shadow.
- `.control-room::before` renders a top accent gradient.
- `.control-room__grid` is a two-column grid.
- `.control-room__node` cards use column layout, local background, borders, and status dots.
- intake/triage use gold accents; handoff/audit use darker/tertiary accents.
- lines and pulses are absolute-positioned inside the grid.

### Reduced Motion

Existing reduced-motion behavior is already good:

- `.home-hero__right` animation is disabled.
- `.control-room__node::after` animation is disabled.
- `.control-room__pulse` is hidden.

This should be preserved.

### Dark Mode

Existing dark-mode coverage is present:

- `.control-room` background/border/shadow adjusted.
- top accent opacity adjusted.
- nodes receive dark background and border.
- node handoff/audit accent switches to `var(--secundario-color)`.
- footer border and line color adjusted.

Potential issue: base handoff/audit uses `var(--terciario-color)`, while dark mode uses `var(--secundario-color)`. This may be intentional for contrast, but should be treated carefully.

### Responsive

At `max-width: 1023px`:

- `.home-hero` becomes single-column.
- `.home-hero__right` moves above text using `order: -1`.

At `max-width: 767px`:

- `.control-room` padding becomes `1.5rem` and `max-width: 100%`.
- `.control-room__grid` gap becomes `0.8rem`.

No current small-mobile-specific `.control-room*` rules exist at `max-width: 480px`.

## Opportunities

The block already works structurally. The next tuning unit should be a visual refinement, not a redesign.

Possible improvements:

1. **Surface depth and cohesion**
   - Add a subtle gradient/background treatment similar in restraint to the newly tuned `.home-pipeline`.
   - Keep the panel from feeling flatter than proof cards/pipeline.

2. **Node hierarchy**
   - Improve node contrast and spacing so labels/descriptions scan faster.
   - Avoid changing the content model or introducing new labels.

3. **Connector clarity**
   - Lines/pulses are visually interesting but potentially fragile due to absolute `calc()` positioning.
   - A small tuning could make connector color/opacity more cohesive without changing geometry.

4. **Mobile compactness**
   - At `≤767px`, node text and padding may benefit from slight tightening.
   - At `≤480px`, a small node padding/font adjustment may prevent visual crowding.
   - Avoid changing the grid to one column unless visual verification proves overflow/crowding; a 2x2 grid is part of the control-room metaphor.

5. **Dark-mode parity**
   - Dark panel and node surfaces can be made slightly more layered while keeping existing token usage.

## Recommended Scope

Recommended change name:

```txt
home-control-room-tuning
```

Recommended source scope:

```txt
src/styles/home.css
```

Recommended selector scope:

```txt
.home-hero__right
.control-room*
[data-theme="dark"] .control-room*
@media (...) .control-room*
```

Recommended non-goals:

- No JSX changes unless Proposal decides a tiny semantic/content change is absolutely necessary.
- No changes to hero text, CTA, proof cards, pipeline, global primitives, sidebar, route metadata, or data files.
- No Tailwind/shadcn migration.
- No changes to `openspec/specs/design-responsividad/`.
- No new dependencies.
- No replacing CSS animations with JS.

## Implementation Direction Options

### Option A — CSS-only polish (recommended)

Make small visual refinements only:

- panel surface gradient/shadow tuning;
- node surface and border accent refinements;
- connector/pulse color opacity tuning;
- mobile spacing/text sizing for `.control-room*` only.

Expected source diff:

```txt
25–60 changed lines
```

Pros:

- Best match for component-by-component tuning.
- Low risk.
- Keeps review small.
- Preserves decorative `aria-hidden` wrapper and current markup.

Cons:

- Does not solve deeper storytelling/content concerns if those exist.

### Option B — Tiny JSX + CSS narrative refinement

Adjust a label or add a small internal visual affordance, then style it.

Expected source diff:

```txt
40–90 changed lines
```

Pros:

- Could improve narrative clarity if the control-room copy is weak.

Cons:

- Higher risk and not obviously needed.
- Current block is decorative; content does not need semantic expansion.

### Option C — Full control-room redesign

Rebuild the visual metaphor and connector layout.

Expected source diff:

```txt
120–250+ changed lines
```

Pros:

- More visual impact.

Cons:

- Too large for the current review budget and component-by-component flow.
- Higher risk of responsive regressions.
- Not justified by the current state.

## Recommendation

Proceed with **Option A — CSS-only polish**.

Suggested Proposal scope:

- source file: `src/styles/home.css` only;
- source selectors: `.control-room*`, existing `[data-theme="dark"] .control-room*`, and existing responsive wrappers;
- no JSX changes;
- no content changes;
- preserve `aria-hidden="true"`;
- preserve reduced-motion behavior;
- hard source budget: under 100 changed lines;
- preferred source forecast: 25–60 changed lines.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Connector lines are fragile due to absolute positioning | Medium | Avoid geometry changes in the first slice; tune color/opacity only unless needed. |
| Mobile 2x2 grid can become crowded | Medium | Tune padding/font/gap first; only change layout if verification proves it necessary. |
| Dark-mode accents can lose contrast | Medium | Keep existing dark selectors and verify readable contrast visually/static smoke. |
| Scope creep into hero/proof/pipeline | High | Restrict changes to `.control-room*` selectors and existing wrapper `.home-hero__right` only if needed. |
| Animation changes could violate reduced-motion expectations | Medium | Do not add new animations; preserve existing reduced-motion block. |

## Verification Ideas

For later Apply/Verify:

- `npm run lint`
- `npm run build`
- `git diff --check`
- static guard: source diff under `src/` must show only `src/styles/home.css`
- static guard: `src/app/page.tsx` unchanged
- static guard: changed selectors limited to `.control-room*`, `[data-theme="dark"] .control-room*`, and optional `.home-hero__right`
- Home smoke at desktop, 390px, 360px:
  - panel visible;
  - four nodes visible;
  - no horizontal overflow;
  - connector/pulse elements do not escape the panel;
  - dark mode readable;
  - reduced motion hides pulses and disables status-dot animation.

## Next Recommended

Proceed to **Proposal** for `home-control-room-tuning`, using the CSS-only polish option unless the user explicitly asks for a larger redesign.
