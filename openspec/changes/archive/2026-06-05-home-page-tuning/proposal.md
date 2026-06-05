# Proposal: home-page-tuning

## Problem Statement and Motivation

The Home page `/` was already redesigned into an “AI Operations Control Room” composition. Since then, the project added shared foundation, visual, and button/focus primitives. The Home page now needs a small post-primitive tuning pass so it keeps its visual identity while aligning with the newer CSS ownership model.

The main issue is not a broken page; it is **ownership drift after primitives were introduced**:

1. **CTA duplication:** Home CTA links now use `.btn` / `.btn--primary` / `.btn--outline`, but `home.css` still repeats several `.btn` base declarations such as inline-flex layout, gap, padding, radius, text decoration, and transition setup.
2. **Responsive composition needs a light check:** the control-room preview, case proof grid, and pipeline are visually dense areas that should be smoke-tested and tuned only if they produce cramped mobile/tablet composition.
3. **Dark-mode local hardcodes:** Home-specific dark-mode blocks are functional but use several hardcoded colors. They may be acceptable, but they should be reviewed for token consistency and contrast without doing a broad theme migration.
4. **Focus/reduced-motion preservation:** Unit 4 established shared keyboard focus behavior. Home tuning must preserve that behavior and avoid reintroducing local focus drift.

The motivation is to stabilize the root page as the canonical first impression before moving deeper into `/casos-reales` and other pages.

## Intent

Tune the Home page with a small CSS-first slice that:

- keeps the current “AI Operations Control Room” direction,
- removes or reduces clear post-primitive duplication where safe,
- preserves Home-specific visual feel and hero emphasis,
- keeps the diff reviewable under the 300 changed-line budget,
- avoids content, route, data, and structural JSX churn.

## Recommended Scope

Use the Explore recommendation: **CSS-only Home tuning, above-the-fold first, with supporting checks for proof/pipeline composition**.

### In Scope

- Conservative CTA CSS ownership cleanup in `src/styles/home.css` now that `.btn` exists.
- Preserve Home-specific CTA typography, hover/focus lift, primary glow, and secondary fill behavior.
- Review and tune Home-only responsive composition for:
  - `.home-hero`,
  - `.control-room`,
  - `.home-proof__grid`,
  - `.home-pipeline`.
- Review Home-specific dark-mode declarations and normalize only small, safe hardcoded drift if it improves consistency.
- Preserve the existing Home reduced-motion strategy.
- Preserve shared focus-visible behavior from `src/styles/primitives.css`.
- Add/update OpenSpec artifacts only for this change.

### Candidate CSS areas

| Area | Candidate tuning |
| --- | --- |
| `.home-hero__cta-link` | Remove exact duplicate base declarations now owned by `.btn`, if visual parity remains. |
| `.home-hero__cta-link--primary` / `--secondary` | Keep Home-specific colors, hover/focus lift, and shadow/fill behavior. |
| `.control-room` | Check responsive density and dark-mode contrast; tune only locally if needed. |
| `.home-proof__grid` / `.case-card` | Check card density and mobile/tablet readability; tune only locally if needed. |
| `.home-pipeline` | Check small-mobile wrap/overflow/density; tune only locally if needed. |
| Home dark-mode section | Prefer token-compatible values where safe; do not migrate global theme architecture. |
| Home reduced-motion block | Preserve or adjust only to match any CTA transition dedup. |

## Non-goals

- No full Home redesign.
- No change to the “AI Operations Control Room” concept.
- No route, data, content, metadata, or control-flow changes.
- No JSX structure changes unless a blocking accessibility issue is proven in later phases.
- No case-study data changes.
- No global primitive redesign.
- No global dark-mode architecture migration.
- No broad responsive retuning outside Home component rules.
- No Tailwind/shadcn migration.
- No hover normalization across the site.
- No changes to `openspec/specs/design-responsividad/`.

## Candidate Affected Files and Responsibilities

| Candidate file | Expected responsibility |
| --- | --- |
| `src/styles/home.css` | Primary implementation target for Home CTA ownership cleanup, local composition tuning, Home dark-mode/reduced-motion preservation. |
| `src/app/page.tsx` | Read-only by default; only change if a blocking accessibility issue is proven and explicitly approved in Design/Tasks. |
| `src/styles/primitives.css` | Read-only; shared `.btn` and focus primitives must remain stable. |
| `src/styles/responsive-mobile.css` | Read-only by default; owns page-level mobile padding/overflow. |
| `src/styles/responsive-tablet.css` | Read-only by default; owns page-level tablet padding/overflow. |
| `src/styles/dark-mode.css` | Read-only by default; Home-specific dark overrides currently live in `home.css`. |

## Success Criteria

- Home CTAs keep their existing visual intent while reducing clear `.btn` duplication where safe.
- Home remains visually stable in desktop, tablet, mobile, and small-mobile contexts.
- `.btn` / focus-visible behavior from Unit 4 remains intact.
- Keyboard users can tab to Home CTAs and see the shared visible focus treatment.
- Dark mode keeps adequate contrast for the hero, control-room preview, proof cards, and pipeline.
- Reduced-motion mode still suppresses Home entrance/pulse motion.
- No source changes outside approved Home tuning scope.
- No `openspec/specs/design-responsividad/` changes.
- Implementation remains below 300 changed lines, with a preferred target below 150 source changed lines.

## Review Workload Forecast

Target review budget: **≤300 changed lines**.

Expected first-slice implementation:

```txt
30–120 changed lines
```

Preferred fail-stop:

```txt
Stop before Apply if source forecast exceeds 150 changed lines without explicit user approval.
```

Expected diff profile:

- `src/styles/home.css`: likely the only source file, with small CSS removals/refinements and possibly a few local additions.
- OpenSpec artifacts: proposal/spec/design/tasks/verify/archive artifacts as the unit progresses.

Chained PRs are not recommended for this unit unless scope expands beyond Home CSS.

## Verification Plan

Later Apply/Verify phases should require:

1. `npm run lint`
2. `npm run build`
3. `git diff --check`
4. Static diff audit:
   - no route/data/content/control-flow changes,
   - no JSX structure changes unless explicitly approved,
   - no global `a`/`button` restyle,
   - no changes to `openspec/specs/design-responsividad/`,
   - no unrelated responsive/dark-mode file changes unless approved.
5. Playwright/manual smoke for `/`:
   - root route renders expected heading and CTAs,
   - Home CTAs have `.btn` classes and remain reachable by keyboard,
   - focus-visible ring appears after Tab,
   - dark-mode context renders hero/control-room/proof/pipeline acceptably,
   - reduced-motion context suppresses Home entrance and pulse motion,
   - mobile/small-mobile viewport has no horizontal overflow.

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Removing CTA duplicated declarations causes visual drift | Medium | Medium | Remove only declarations exactly owned by `.btn`; keep Home-specific typography and variants. |
| Responsive tuning expands into redesign | Medium | Medium | Limit changes to component-level Home rules; fail-stop over 150 source changed lines. |
| Dark-mode normalization reduces contrast | Low | Medium | Prefer preserving current values unless a clear contrast/consistency improvement is identified. |
| Focus ring assertions are flaky due transitions | Medium | Low | Verification should wait for transition completion before reading computed `box-shadow`. |
| Subagent phase work stalls again | Medium | Low | Parent may author small artifacts directly when phase scope is bounded and evidence is available. |

## Rollback Plan

If the tuning causes visual drift:

1. Revert `src/styles/home.css` to the previous commit.
2. Keep Unit 4 primitives unchanged unless a primitive bug is proven.
3. Re-run lint/build and Home smoke.
4. Keep OpenSpec artifacts documenting the rollback decision if the unit has already reached Apply.

## Proposal Assumptions

The user approved the recommended direction verbally:

- CSS-only first slice.
- Above-the-fold/Home-first tuning.
- Keep the “AI Operations Control Room” direction.
- Keep the diff small.

No additional product question round is required before Spec unless the user wants to revisit visual direction.

## Recommendation for Spec

Proceed to **Spec** for `home-page-tuning`.

The Spec should define requirements and scenarios for:

- Home CTA ownership after `.btn` adoption,
- preservation of Home-specific hover/focus/typography behavior,
- Home responsive composition constraints,
- Home dark-mode/reduced-motion preservation,
- strict non-goals around route/data/content/JSX/global primitive changes,
- verification expectations for lint/build, keyboard focus, dark mode, reduced motion, and mobile overflow.
