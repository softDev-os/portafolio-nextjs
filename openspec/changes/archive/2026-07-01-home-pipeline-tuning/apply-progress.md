# Apply Progress: home-pipeline-tuning

## Status

Applied; not committed.

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

Implemented CSS-only pipeline tuning:

- `.home-pipeline`
  - added `row-gap: 0.75rem;`
  - changed plain background to a subtle gold-tinted gradient:
    `linear-gradient(135deg, var(--color-principal), rgba(247, 185, 53, 0.06))`
- `.home-pipeline__step`
  - added `min-width: 0;`
- `.home-pipeline__arrow`
  - added `flex-shrink: 0;`
- `[data-theme="dark"] .home-pipeline`
  - changed plain background to matching dark subtle gradient:
    `linear-gradient(135deg, var(--color-principal), rgba(247, 185, 53, 0.08))`
- `@media (max-width: 480px) .home-pipeline__label`
  - added `white-space: normal;`
  - added `text-align: left;`

No JSX changes were made.

## Changed Files

```text
src/styles/home.css
openspec/changes/home-pipeline-tuning/apply-progress.md
```

Source diff stat:

```text
src/styles/home.css | 17 +++++++++++++++--
1 file changed, 15 insertions(+), 2 deletions(-)
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
| Changed selectors limited to `.home-pipeline*` and `[data-theme="dark"] .home-pipeline` | PASS |
| No hero/control-room/proof-card/CTA/global primitive/responsive foundation changes | PASS |
| No `openspec/specs/design-responsividad/` changes | PASS |

### Playwright Home smoke

A temporary Playwright spec `tests/e2e/home-pipeline-tuning-smoke.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Smoke covered:

- desktop pipeline renders four labels and three arrows;
- dark + reduced-motion pipeline remains readable and animation is suppressed;
- `390px` and `360px` mobile widths have no horizontal overflow;
- all pipeline labels remain visible.

Result:

```text
4 passed
```

## Deviations

None. Implementation matches Design and Tasks.

## Risks / Follow-ups

- The subtle gradient is intentionally low-impact; final visual taste review can still judge whether it should be even softer.
- Label wrapping is only relaxed at `max-width: 480px`; if future labels get longer, revisit small-mobile smoke.

## Next Recommended

Run fresh review / Judgment Day before committing. If clean, commit source as a focused unit.
