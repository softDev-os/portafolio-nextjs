# Apply Progress: home-control-room-tuning

## Status

Applied; not yet committed.

## Baseline Before Source Edits

Workspace included unrelated local work out of scope:

```text
 M .gitignore
?? cv-refactor-scout.md
?? docs/JUAN-FONTALVO-ROADMAP.md
?? openspec/changes/private-cv-redesign/
?? openspec/specs/design-responsividad/
```

Baseline commands before source edits:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |

## Source Changes

Only `src/styles/home.css` was changed.

Implemented CSS-only AI operations-center polish for `.control-room*`:

- `.control-room`
  - added layered radial + linear background;
  - tuned border color and depth shadow;
  - added `overflow: hidden` and `isolation: isolate` to contain visual layers.
- `.control-room::before`
  - strengthened top rail height, gradient midpoint, and glow.
- `.control-room__node`
  - added `min-width: 0`;
  - added layered node background, stronger border, and low-noise shadow/inset highlight.
- `.control-room__node::after`
  - added primary and secondary low-alpha status glow rings.
- `.control-room__node-desc`
  - tuned line-height to `1.4`.
- `.control-room__line`
  - changed connector line to low-alpha gold/teal gradient with subtle glow.
- `.control-room__pulse`
  - added glow while preserving existing animation geometry/timing.
- `.control-room__footer`
  - added status-line surface treatment.
- `[data-theme="dark"] .control-room*`
  - mirrored layered panel/node/footer treatment for dark mode.
- Responsive `.control-room*`
  - added compact node typography/spacing at `max-width: 767px`;
  - added small-mobile compact rules at `max-width: 480px`.

Implementation deliberately removed optional label/icon micro-glows after the first diff came in at `104` source changed lines. Final source diff is under the hard cap:

```text
src/styles/home.css | 99 +++++++++++++++++++++++++++++++++++++++++++----------
1 file changed, 81 insertions(+), 18 deletions(-)
```

## Changed Files

```text
src/styles/home.css
openspec/changes/home-control-room-tuning/apply-progress.md
```

## Verification Evidence

### Automated checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |

### Static guards

| Guard | Result |
| --- | --- |
| `git diff --name-only -- src` shows only `src/styles/home.css` | PASS |
| `git diff -- src/app/page.tsx` is empty | PASS |
| No proof-card/pipeline/CTA/global/foundation/data/package selectors changed | PASS |
| Source changed lines stay below 100 | PASS — 99 source changed lines |
| No `openspec/specs/design-responsividad/` changes | PASS |

### Playwright Home smoke

A temporary Playwright spec `tests/e2e/home-control-room-tuning-smoke.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Smoke covered:

- desktop control-room visible;
- four nodes visible;
- three connector lines present;
- three pulses present;
- connector/pulse elements contained inside panel;
- dark-mode panel/node backgrounds and borders applied;
- reduced-motion hides pulses and disables status-dot animation;
- 390px and 360px mobile widths have no horizontal overflow.

Result:

```text
5 passed
```

## Deviations

- Optional `.control-room__label` color and icon `text-shadow` refinements from Design were omitted to keep final source diff under the 100-line hard cap.
- `.control-room__grid { isolation: isolate; }` was also omitted for the same budget reason; panel-level isolation remains in place.

These omissions do not violate the Spec because they are optional micro-polish, while the core operations-center visual treatment remains implemented.


## Review Exception

After the first fresh review, `review-reliability` flagged two blockers:

1. OpenSpec artifacts exceed the nominal 300-line unit budget.
2. The Playwright smoke test was temporary rather than persistent.

User-approved resolution:

- Keep full OpenSpec artifacts for traceability.
- Treat the strict changed-line budget as applying to source code for this unit.
- Accept the temporary Playwright smoke as verification evidence because it is recorded here and matches the previous small CSS-unit workflow.

Source remains within the hard source cap:

```text
81	18	src/styles/home.css
```


## Fresh Review Results

After documenting the user-approved review exception, two fresh review lenses were re-run:

| Review lens | Result |
| --- | --- |
| `review-readability` | CLEAN |
| `review-reliability` | No findings |

Review task IDs:

```text
subtask_review-readability_1783081204427_9ccd3587
subtask_review-reliability_1783081204429_8cc2edb7
```

## Risks / Follow-ups

- Final diff lands at 99 source changed lines, so future tweaks should happen in a separate unit unless a tiny correction is required.
- Visual taste review may choose to soften panel/node depth later, but verification passed.

## Next Recommended

Run fresh review before committing. If clean, commit source as:

```text
tune(css): enhance Home control room visual
```
