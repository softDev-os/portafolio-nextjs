# Proposal: home-pipeline-tuning

## Problem Statement and Motivation

The Home page pipeline block is a decorative flow diagram at the bottom of the "AI Operations Control Room" composition:

```txt
Mensaje entrante → Clasificación IA → Decisión segura → Humano informado
```

It works visually, but has two small tension points:

1. **Label wrapping at small widths feels accidental**: labels use `white-space: nowrap` and the container has `flex-wrap: wrap`, but when items wrap, arrows can visually detach from their preceding step.
2. **Visual connection to proof cards is absent**: the pipeline surfaces use a plain white card background while the proof cards above it have richer visual treatment (gold-tinted outcome surface). A subtle visual bridge would make the Home feel more cohesive.

The motivation is to make this small decorative block feel better integrated with the rest of the Home composition without adding content, complexity, or JSX changes.

## Intent

CSS-only tuning pass for the Home pipeline block:

- allow pipeline labels to wrap naturally when needed at narrow widths,
- optionally connect the pipeline's visual tone to the proof card section above it,
- preserve existing `aria-hidden`, dark-mode, reduced-motion, and entrance animation behavior,
- keep the unit small and reviewable.

## Recommended Scope

### In Scope

- CSS adjustments only in `src/styles/home.css` targeting `.home-pipeline*` selectors.
- Remove or relax `white-space: nowrap` on `.home-pipeline__label` at narrow breakpoints to improve wrapping.
- Optionally adjust pipeline background or border tone to echo the proof card outcome surface (gold-tinted).
- Keep `.home-pipeline__arrow` visually paired with its preceding step regardless of wrap.
- Preserve the existing three breakpoints: 1023px, 767px, 480px.
- Preserve dark-mode, reduced-motion, and entrance animation behavior.
- Keep `aria-hidden="true"` on the pipeline container.

### CSS Adjustments to Consider

| Selector | Possible change | Constraint |
| --- | --- | --- |
| `.home-pipeline__label` at `max-width: 480px` | Remove `white-space: nowrap` or add `white-space: normal` to prevent overflow. | Keep labels compact; avoid breaking mid-word. |
| `.home-pipeline__arrow` at narrow widths | Use gap-based alignment so arrows stay attached to preceding steps. May need `flex` adjustments or `align-self: center`. | Keep arrows visible; prefer `display: none` only if truly broken. |
| `.home-pipeline` background | Optionally change to match proof section visual tone, e.g., subtle gold-tinted background. | Do not copy outcome surface exactly; use a softer variant. |
| `.home-pipeline` dark mode | Add a dark-mode refinement only if background changes. | Keep within existing `[data-theme="dark"] .home-pipeline` block. |

### Out of Scope

- No JSX changes.
- No new content, labels, or copy.
- No hero/control-room/proof-cards/CTA changes.
- No route/data/control-flow changes.
- No global primitives or responsive foundation changes.
- No global dark-mode migration.
- No Tailwind/shadcn.
- No `design-responsividad` changes.

## Non-goals

- No pipeline redesign.
- No changing what the pipeline communicates.
- No making the pipeline non-decorative.
- No animations beyond what already exists.

## Candidate Affected Files

| File | Expected responsibility |
| --- | --- |
| `src/styles/home.css` | Primary target: `.home-pipeline*` refinements only. |
| `src/app/page.tsx` | Read-only; no JSX changes. |

## Success Criteria

- Pipeline renders correctly on desktop, tablet, mobile, and small-mobile.
- Labels do not overflow or clip at any breakpoint.
- Arrows remain visually connected to their preceding step.
- Dark mode and reduced-motion behavior unchanged.
- Entrance animation preserved.
- Only `src/styles/home.css` source changes.
- Total source diff under 80 changed lines.

## Review Workload Forecast

Expected implementation forecast:

```txt
15–40 changed source lines
```

Only `src/styles/home.css`. Under preferred fail-stop and well under 300-line unit budget.

## Verification Plan

1. `npm run lint`
2. `npm run build`
3. `git diff --check`
4. Static guards: only `src/styles/home.css` changed.
5. Playwright/manual smoke on `/`:
   - pipeline renders with four steps and arrows,
   - labels readable at desktop and mobile widths,
   - no horizontal overflow on 390px and 360px,
   - dark mode readable,
   - reduced-motion suppresses entrance animation.

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| `white-space: normal` causes labels to wrap mid-word on small mobile | Medium | Low | Test at 390px and 360px; use break-word or min-width on steps if needed. |
| Pipeline tone change feels disconnected from proof cards | Low | Low | Use a very subtle tint; do not copy the outcome surface exactly. |
| Arrow visibility breaks on wrap | Medium | Low | Keep arrows with `flex-shrink: 0` and allow wrapping only at narrow widths. |

## Rollback Plan

If pipeline wrap behavior causes visual issues:

1. Restore `white-space: nowrap` on labels.
2. Revert any background/border tone changes.
3. Preserve existing `flex-wrap: wrap` on the container.
4. Re-run lint/build and Home smoke.

## Recommendation for Spec

Proceed to **Spec** for `home-pipeline-tuning`.

The Spec should cover:
- pipeline label wrapping behavior across breakpoints,
- arrow consistency on wrap,
- optional visual bridge to proof section,
- dark-mode/reduced-motion/animation preservation,
- strict no-JSX/no-data/no-global scope.
