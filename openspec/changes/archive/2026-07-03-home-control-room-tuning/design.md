# Design: home-control-room-tuning

## Status

Design complete for a CSS-only Home control-room tuning slice.

## Decision

Use a scoped **AI operations-center polish** on the existing `.control-room` block.

This is not a redesign. The DOM, copy, symbols, 2x2 grid, reduced-motion behavior, and decorative `aria-hidden="true"` wrapper stay unchanged.

## Source Scope

Allowed source file:

```txt
src/styles/home.css
```

Allowed selector families:

```txt
.control-room
.control-room::before
.control-room__label
.control-room__grid
.control-room__node
.control-room__node::after
.control-room__icon
.control-room__node-label
.control-room__node-desc
.control-room__line
.control-room__pulse
.control-room__footer
[data-theme="dark"] .control-room*
@media (max-width: 767px) .control-room*
@media (max-width: 480px) .control-room*
```

Do not touch JSX or content.

## Visual Direction

The block should feel like a controlled AI operations surface:

- layered panel, not a flat card;
- stronger operational rail/accent;
- nodes with clearer depth and status affordance;
- connectors that read as active data flow;
- dark mode with the same premium feel;
- mobile compactness without changing the 2x2 grid.

## Concrete CSS Plan

### 1. Panel surface: `.control-room`

Keep the current size model:

- `width: 100%`
- `max-width: 34rem`
- `border-radius: 1.6rem`
- `padding: 2rem`
- `position: relative`

Refine surface depth:

```css
.control-room {
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 15% 0%, rgba(247, 185, 53, 0.16), transparent 34%),
    linear-gradient(145deg, var(--color-principal), rgba(255, 255, 255, 0.76));
  border-color: rgba(247, 185, 53, 0.16);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 16px 42px rgba(12, 13, 28, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.78);
}
```

Rationale:

- `overflow: hidden` contains connector/pulse glow.
- `isolation: isolate` keeps layered effects predictable.
- layered background gives the operations-center feeling without new markup.

### 2. Top rail: `.control-room::before`

Make the existing rail feel intentional:

```css
.control-room::before {
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--principal-color),
    #f5c84a 45%,
    var(--secundario-color)
  );
  box-shadow: 0 0 22px rgba(247, 185, 53, 0.35);
}
```

Keep existing left/right positioning and border radius.

### 3. Section label: `.control-room__label`

Slightly sharpen the control-room heading:

```css
.control-room__label {
  color: var(--terciario-color);
}
```

Do not add pseudo content. No copy changes.

### 4. Grid: `.control-room__grid`

Keep the 2x2 grid. Add local stacking context for lines/pulses:

```css
.control-room__grid {
  isolation: isolate;
}
```

No layout geometry rewrite.

### 5. Nodes: `.control-room__node`

Tune node depth and scan rhythm:

```css
.control-room__node {
  min-width: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), var(--color-background));
  border-color: rgba(12, 13, 28, 0.08);
  box-shadow:
    0 10px 28px rgba(12, 13, 28, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
```

Rationale:

- `min-width: 0` protects the 2x2 grid from text overflow.
- subtle shadow distinguishes nodes from the panel.
- no hover states; block is decorative.

### 6. Status dots: `.control-room__node::after`

Make the active state more legible:

```css
.control-room__node::after {
  box-shadow: 0 0 0 0.35rem rgba(247, 185, 53, 0.12);
}

.control-room__node--handoff::after,
.control-room__node--audit::after {
  box-shadow: 0 0 0 0.35rem rgba(91, 200, 175, 0.12);
}
```

No animation changes. Existing reduced-motion rule still disables animation.

### 7. Icons and text

Small hierarchy refinements only:

```css
.control-room__icon {
  text-shadow: 0 0 18px rgba(247, 185, 53, 0.22);
}

.control-room__node--handoff .control-room__icon,
.control-room__node--audit .control-room__icon {
  text-shadow: 0 0 18px rgba(91, 200, 175, 0.2);
}

.control-room__node-desc {
  line-height: 1.4;
}
```

Do not change copy or font families.

### 8. Connectors and pulses

Tune energy without changing geometry:

```css
.control-room__line {
  background: linear-gradient(90deg, rgba(247, 185, 53, 0.18), rgba(91, 200, 175, 0.22));
  box-shadow: 0 0 14px rgba(247, 185, 53, 0.12);
}

.control-room__pulse {
  box-shadow: 0 0 14px rgba(247, 185, 53, 0.5);
}
```

For the vertical connector, a horizontal gradient is acceptable because the element is tiny; do not add special-case geometry unless visual verification demands it.

### 9. Footer: `.control-room__footer`

Make footer feel like an operational status line:

```css
.control-room__footer {
  background: rgba(247, 185, 53, 0.06);
  border-radius: 0.8rem;
  border-top-color: rgba(247, 185, 53, 0.16);
}
```

Keep text unchanged.

## Dark Mode Design

Dark mode should mirror the same premium layered model.

### `.control-room`

```css
[data-theme="dark"] .control-room {
  background:
    radial-gradient(circle at 15% 0%, rgba(247, 185, 53, 0.16), transparent 34%),
    linear-gradient(145deg, var(--color-principal), #1c1f32);
  border-color: rgba(247, 185, 53, 0.16);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.24),
    0 18px 48px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

### `.control-room__node`

```css
[data-theme="dark"] .control-room__node {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), #22253a);
  border-color: rgba(247, 185, 53, 0.12);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.035);
}
```

### `.control-room__footer`

```css
[data-theme="dark"] .control-room__footer {
  background: rgba(247, 185, 53, 0.08);
  border-top-color: rgba(247, 185, 53, 0.14);
}
```

Keep existing dark-mode color roles for handoff/audit using `var(--secundario-color)` unless visual verification proves it is wrong.

## Responsive Design

### Existing `max-width: 767px`

Keep existing:

- `.control-room { padding: 1.5rem; max-width: 100%; }`
- `.control-room__grid { gap: 0.8rem; }`

Add compact node tuning:

```css
.control-room__node {
  padding: 1rem 0.85rem;
}

.control-room__node-label {
  font-size: 1.05rem;
}

.control-room__node-desc {
  font-size: 0.95rem;
}
```

### New `max-width: 480px` rules

Add small-mobile control-room-only rules:

```css
.control-room {
  padding: 1.2rem;
}

.control-room__label {
  margin-bottom: 1.2rem;
}

.control-room__grid {
  gap: 0.7rem;
}

.control-room__node {
  padding: 0.9rem 0.75rem;
}

.control-room__icon {
  font-size: 1.35rem;
}

.control-room__node-label {
  font-size: 1rem;
}

.control-room__node-desc {
  font-size: 0.9rem;
}
```

Do not switch to one column in this slice.

## Reduced Motion Design

No new animations.

Existing reduced-motion block already covers:

- `.home-hero__right`
- `.control-room__node::after`
- `.control-room__pulse`

No change required unless implementation introduces transitions; this design avoids new transitions.

## Implementation Forecast

Expected source diff:

```txt
55–85 changed lines
```

Hard stop:

```txt
100 source changed lines
```

If implementation exceeds the hard stop, pause and ask before continuing.

## Verification Design

Automated:

```txt
npm run lint
npm run build
git diff --check
```

Static guards:

```txt
git diff --name-only -- src
```

Expected result:

```txt
src/styles/home.css
```

Additional static guards:

- `git diff -- src/app/page.tsx` is empty.
- No changes to proof cards, pipeline, CTAs, global primitives, layout foundation, data files, package files, or `openspec/specs/design-responsividad/`.
- Source changed lines stay below 100.

Smoke checks:

- desktop `/`: `.control-room` visible with four nodes;
- desktop `/`: connector lines and pulses remain visually inside the panel;
- `390px` and `360px`: no horizontal overflow;
- dark mode: panel, nodes, connectors, and footer readable;
- reduced motion: pulses hidden and status-dot animation disabled.

## Rollback Plan

Rollback is a one-file revert:

```txt
src/styles/home.css
```

Remove the layered surface, node shadows, connector glow, footer background, and mobile compact rules if visual verification fails.

## Next Recommended

Proceed to **Tasks** with this CSS-only plan.
