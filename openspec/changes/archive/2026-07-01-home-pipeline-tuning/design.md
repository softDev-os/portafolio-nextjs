# Design: home-pipeline-tuning

## Status

Design complete for a small CSS-only pipeline tuning slice.

## Architecture Overview

The Home pipeline is a decorative component rendered by `src/app/page.tsx` and styled by `src/styles/home.css`.

Current markup stays unchanged:

```tsx
<div className="home-pipeline" aria-hidden="true">...</div>
```

This unit does not need JSX. The pipeline is intentionally decorative, and the existing text/icon sequence is already adequate. The issue is CSS presentation: mobile wrapping, compactness, and visual cohesion with the proof-card area.

## CSS Ownership

Allowed source file:

```txt
src/styles/home.css
```

Allowed selector families:

```txt
.home-pipeline
.home-pipeline__step
.home-pipeline__icon
.home-pipeline__label
.home-pipeline__arrow
[data-theme="dark"] .home-pipeline
@media (...) .home-pipeline*
```

Read-only / out of scope:

- `src/app/page.tsx`
- hero selectors: `.home-hero*`
- control-room selectors: `.control-room*`
- proof-card selectors: `.home-proof*`, `.case-card*`
- CTA selectors: `.home-hero__cta*`
- global primitives, responsive foundation, global dark-mode files
- `openspec/specs/design-responsividad/`

## Exact CSS Design

### Base `.home-pipeline`

Current base is good and should stay mostly intact:

- flex container
- centered alignment
- wrapping enabled
- card surface
- entrance animation

Recommended base refinement:

```css
.home-pipeline {
  row-gap: 0.75rem;
  background: linear-gradient(
    135deg,
    var(--color-principal),
    rgba(247, 185, 53, 0.06)
  );
}
```

Rationale:

- `row-gap` improves multi-line wrapping without affecting desktop too much.
- subtle gold-tinted gradient visually connects the pipeline to the proof-card outcome surface without making it another card.

Do not change:

- `position`
- `z-index`
- `display`
- `align-items`
- `justify-content`
- `width`
- `flex-wrap`
- `opacity`
- animation behavior

### `.home-pipeline__step`

Add narrow-layout resilience:

```css
.home-pipeline__step {
  min-width: 0;
}
```

Rationale: protects text from forcing overflow inside wrapped flex lines.

Do not change the icon/label DOM structure.

### `.home-pipeline__label`

Base stays `white-space: nowrap` for desktop/tablet compactness. Relax only at the small breakpoint.

At `max-width: 480px`:

```css
.home-pipeline__label {
  white-space: normal;
  text-align: left;
}
```

Rationale:

- desktop stays compact;
- small-mobile can wrap labels if necessary;
- avoids horizontal overflow.

Do not use `overflow: hidden` or `text-overflow: ellipsis`; this is content, not a decorative icon label.

### `.home-pipeline__arrow`

Base arrow is fine. Add stability:

```css
.home-pipeline__arrow {
  flex-shrink: 0;
}
```

At `max-width: 480px`, keep the existing smaller font size. Do not hide arrows unless verification finds orphaned layout. Initial design keeps them visible.

### Dark Mode

If base background becomes a gradient, update dark rule to preserve readable surface:

```css
[data-theme="dark"] .home-pipeline {
  background: linear-gradient(
    135deg,
    var(--color-principal),
    rgba(247, 185, 53, 0.08)
  );
  border-color: #333656;
}
```

Keep dark change scoped to existing `[data-theme="dark"] .home-pipeline` selector. Do not touch `src/styles/dark-mode.css`.

### Responsive Rules

Existing responsive rules remain:

- `max-width: 1023px`: gap/padding tighten.
- `max-width: 767px`: label/icon font sizes reduce.
- `max-width: 480px`: gap/padding/label/arrow reduce.

Add only the small-label wrap in `max-width: 480px`.

No new breakpoints.

### Reduced Motion

No new animations or transitions. The existing reduced-motion block includes `.home-pipeline`, so no changes needed.

## Implementation Plan

Expected source changes:

1. Add `row-gap` and subtle gradient background to `.home-pipeline`.
2. Add `min-width: 0` to `.home-pipeline__step`.
3. Add `flex-shrink: 0` to `.home-pipeline__arrow`.
4. Update `[data-theme="dark"] .home-pipeline` background to matching dark gradient.
5. Add `white-space: normal` and `text-align: left` to `.home-pipeline__label` at `max-width: 480px`.

Expected source diff:

```txt
10–25 changed lines
```

## Verification Design

Automated:

- `npm run lint`
- `npm run build`
- `git diff --check`

Static guards:

- only `src/styles/home.css` changed;
- `src/app/page.tsx` unchanged;
- changed selectors limited to `.home-pipeline*` and existing dark/responsive wrappers;
- no `home-hero`, `control-room`, `home-proof`, `case-card`, `CTA`, global primitive, responsive foundation, or `design-responsividad` changes.

Smoke checks:

- `/` renders pipeline with four visible labels and three arrows;
- desktop pipeline remains compact;
- 390px and 360px have no horizontal overflow;
- labels readable on small mobile;
- dark mode readable;
- reduced-motion still suppresses pipeline entrance animation.

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Gradient feels too visually heavy | Use very low alpha gold tint; rollback to plain `var(--color-principal)` if it competes with proof cards. |
| Label wrapping increases pipeline height | Only relax wrapping at `max-width: 480px`; verify 360px and 390px. |
| Arrows become orphaned on wrap | Keep arrows visible with `flex-shrink: 0`; review visually after smoke. |
| Scope creep into proof/hero sections | Static diff guard: only `.home-pipeline*` selectors. |

## Rollback

Rollback is a one-file CSS revert:

1. Restore `.home-pipeline` background to `var(--color-principal)` and remove `row-gap` if needed.
2. Remove `min-width: 0`, `flex-shrink: 0`, and small-label wrap rules if they cause layout issues.
3. Restore dark pipeline background to `var(--color-principal)`.
4. Re-run lint/build/smoke.

## Recommendation for Tasks

Proceed to **Tasks** with a source forecast of `10–25` changed lines and strict source scope of `src/styles/home.css` only.
