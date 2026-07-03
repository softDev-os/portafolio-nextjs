# Proposal: home-control-room-tuning

## Status

Proposed.

## User Direction

The user chose a stronger visual direction:

> centro de operaciones ia

Interpretation: tune the existing Home hero control-room block so it feels more like an AI operations center, while keeping the change small, scoped, and reviewable.

## Problem

The current `.control-room` block works structurally, but it is visually quieter than the Home concept it represents.

Current strengths:

- clear 2x2 operational grid;
- meaningful stage labels;
- decorative connectors and pulses;
- existing dark-mode and reduced-motion support;
- safe decorative wrapper via `aria-hidden="true"`.

Current gap:

- the panel reads more like a simple card than a distinctive AI operations surface;
- node hierarchy and connector energy can be sharpened;
- mobile spacing can be made more deliberate;
- dark-mode depth can better match the new pipeline/proof-card visual direction.

## Goal

Make the existing control-room feel like a polished AI operations center through CSS-only visual tuning.

The target feel:

- operational;
- premium;
- controlled;
- technical without becoming noisy;
- visually connected to the existing gold/teal/blueprint brand language.

## Proposed Solution

Use **CSS-only polish** in `src/styles/home.css`.

Primary tuning areas:

1. **Panel surface**
   - add subtle layered gradient/depth;
   - preserve current dimensions and card model;
   - make the top accent feel more intentional.

2. **Node hierarchy**
   - slightly improve node depth, border clarity, and scan rhythm;
   - keep existing labels, descriptions, and icons;
   - preserve the 2x2 grid.

3. **Connector/pulse energy**
   - refine connector colors/opacity so the flow feels active;
   - avoid geometry rewrites unless needed;
   - preserve reduced-motion behavior.

4. **Dark-mode parity**
   - tune dark surfaces and node borders to keep the operations-center feel readable.

5. **Small-mobile resilience**
   - tighten `.control-room*` spacing and type only where needed;
   - prevent horizontal overflow at 390px and 360px;
   - avoid changing the layout to one column unless verification proves it necessary.

## Source Scope

Allowed source file:

```txt
src/styles/home.css
```

Allowed selector scope:

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
@media (...) .control-room*
```

`home-hero__right` may only be touched if needed for wrapper-level visual/spacing behavior.

## Non-Goals

This unit MUST NOT:

- edit `src/app/page.tsx`;
- change JSX structure;
- change copy, labels, icons, routes, metadata, or data;
- touch `.home-hero__left`, CTA styling, proof cards, pipeline, sidebar, global primitives, or layout foundation;
- add Tailwind, shadcn, dependencies, canvas, SVG systems, or JS animation;
- alter `openspec/specs/design-responsividad/`;
- turn the decorative panel into semantic content;
- remove `aria-hidden="true"` from the wrapper.

## Review Budget

Preferred source forecast:

```txt
35–75 changed lines
```

Hard source cap:

```txt
100 changed lines
```

Hard unit cap:

```txt
300 changed lines
```

If the design or implementation forecast exceeds 100 source changed lines, stop and ask before continuing.

## Acceptance Criteria

### 1. AI operations-center feel

The panel SHOULD feel more like a premium AI operations surface than a flat card.

This may be achieved with scoped CSS only:

- layered panel background;
- sharper top accent;
- slightly stronger node surfaces;
- refined connector and pulse color treatment;
- improved depth in light and dark themes.

### 2. Markup/content preservation

The implementation MUST NOT change:

- Home JSX;
- control-room labels/descriptions/icons;
- `aria-hidden="true"` decorative wrapper;
- routes or data sources.

### 3. Selector scope

Source changes MUST be limited to:

- `.control-room*` selectors;
- existing `[data-theme="dark"] .control-room*` selectors;
- `.home-hero__right` only if explicitly justified;
- existing responsive wrappers that modify `.control-room*`.

### 4. Responsive behavior

At desktop, tablet, 390px, and 360px:

- the panel remains visible;
- the four nodes remain visible;
- the 2x2 grid remains readable unless Design proves one-column is necessary;
- there is no horizontal overflow;
- connector/pulse elements do not escape the panel.

### 5. Dark mode

Dark mode MUST remain readable and visually cohesive.

Allowed:

- tune `.control-room`, `.control-room::before`, `.control-room__node`, `.control-room__line`, and related dark selectors.

Not allowed:

- global dark-mode file changes;
- unrelated dark-mode changes outside `.control-room*`.

### 6. Reduced motion

Reduced-motion behavior MUST be preserved:

- `.home-hero__right` entrance animation disabled;
- status-dot animation disabled;
- pulses hidden;
- no new animation that bypasses the existing reduced-motion guard.

## Verification Plan

Required automated checks:

```txt
npm run lint
npm run build
git diff --check
```

Required static guards:

```txt
git diff --name-only -- src
```

Expected source file result:

```txt
src/styles/home.css
```

Also verify:

- `git diff -- src/app/page.tsx` is empty;
- no proof-card/pipeline/CTA/global selectors changed;
- no dependency/package changes;
- no `openspec/specs/design-responsividad/` changes.

Recommended smoke checks:

- `/` desktop: control-room panel and four nodes visible;
- `/` at 390px and 360px: no horizontal overflow;
- dark mode: panel/nodes/connectors readable;
- reduced motion: pulses hidden and animated status dots disabled.

## Alternatives Considered

### A. CSS-only operations-center polish — chosen

Best balance of visual impact and review safety.

### B. JSX/content refinement

Rejected for this unit. The control-room is decorative and the current copy is adequate.

### C. Full redesign

Rejected for now. It risks exceeding the unit budget and turning a tuning pass into a layout rebuild.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Visual treatment becomes too noisy | Medium | Keep gradients/subtle shadows low-alpha and scoped. |
| Connector geometry breaks on mobile | Medium | Prefer color/opacity tuning over positional rewrites. |
| Source diff grows past budget | Medium | Hard stop above 100 source changed lines. |
| Dark mode contrast weakens | Medium | Verify dark mode explicitly. |
| Scope creeps into hero/proof/pipeline | High | Static diff guard and selector whitelist. |

## Next Recommended

Proceed to **Spec** for `home-control-room-tuning`.
