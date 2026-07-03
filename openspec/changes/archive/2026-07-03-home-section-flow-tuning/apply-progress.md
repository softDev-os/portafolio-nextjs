# Apply Progress: home-section-flow-tuning

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

Implemented CSS-only local section rhythm tuning:

- `.home-proof`
  - added `padding-top: 0.25rem;`.
- `.home-proof__heading`
  - changed `margin-bottom` from `1.6rem` to `1.8rem`.
- `.home-proof__grid`
  - changed desktop `gap` from `1.4rem` to `1.5rem`.
- `.home-pipeline`
  - added `margin-top: 0.25rem;`.
- `@media (max-width: 1023px)`
  - reset `.home-proof { padding-top: 0; }`;
  - reset `.home-pipeline { margin-top: 0; }`.
- `@media (max-width: 767px)`
  - added `.home-proof__grid { gap: 1.1rem; }` for one-column mobile rhythm.
- `@media (max-width: 480px)`
  - added `.home-proof__heading { margin-bottom: 1.2rem; }`.

No JSX changes were made.

## Changed Files

```text
src/styles/home.css
openspec/changes/home-section-flow-tuning/apply-progress.md
```

Source diff stat:

```text
src/styles/home.css | 13 +++++++++++--
1 file changed, 11 insertions(+), 2 deletions(-)
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
| No `.home-hero*`, `.case-card*`, `.control-room*`, or `.home-pipeline__*` internals changed | PASS |
| No `content__page--home` parent gap changed | PASS |
| Source changed lines under 80 | PASS — 13 changed lines |
| No `docs/JUAN-FONTALVO-ROADMAP.md` changes | PASS |
| No `openspec/specs/design-responsividad/` changes | PASS |

### Playwright Home smoke

A temporary Playwright spec `tests/e2e/home-section-flow-tuning-smoke.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Smoke covered:

- desktop hero, proof, and pipeline render in order;
- proof cards still render;
- control-room still renders;
- dark mode preserves section readability;
- reduced motion keeps sections visible and pipeline animation disabled;
- `390px` and `360px` mobile widths have no horizontal overflow.

Result:

```text
5 passed
```

## Deviations

None. Implementation matched Design and stayed smaller than forecast.


## Fresh Review Results

Fresh review passed:

| Review lens | Result |
| --- | --- |
| `review-readability` | No findings |

Review task ID:

```text
subtask_review-readability_1783107605550_57d84ab5
```

## Risks / Follow-ups

- This is intentionally subtle rhythm tuning. Larger page-flow changes should be a future unit if visual review asks for it.

## Next Recommended

Run fresh review before committing. If clean, commit source as:

```text
tune(css): refine Home section rhythm
```
