# Tasks: home-section-flow-tuning

## Review Workload Forecast

| Field | Value |
| --- | --- |
| Estimated source diff | 12–25 changed lines |
| Hard source cap | 80 changed lines |
| Allowed source file | `src/styles/home.css` only |
| Allowed source selectors | `.home-proof`, `.home-proof__heading`, `.home-proof__grid`, `.home-pipeline`, Home-local responsive rules for those selectors |
| 300-line unit budget risk | Low |
| Chained PRs recommended | No |
| Decision needed before Apply | No |

## Tasks

### 0. Pre-apply safety

- [x] T0.1 Check `git status --short` before source edits.
- [x] T0.2 Confirm unrelated local work remains out of scope and unstaged:
  - `.gitignore`
  - `cv-refactor-scout.md`
  - `docs/JUAN-FONTALVO-ROADMAP.md`
  - `openspec/changes/private-cv-redesign/`
  - `openspec/specs/design-responsividad/`
- [x] T0.3 Run baseline `npm run lint` and `npm run build`; record existing Edge runtime warning if present.
- [x] T0.4 Reconfirm source scope:
  - only `src/styles/home.css`;
  - no JSX;
  - no copy;
  - no proof-card/control-room/pipeline internals;
  - no global responsive/dark/foundation files.

### 1. CSS implementation in `src/styles/home.css`

- [x] T1.1 Update `.home-proof` only:
  - add `padding-top: 0.25rem;`.
- [x] T1.2 Update `.home-proof__heading` only:
  - change `margin-bottom` from `1.6rem` to `1.8rem`.
- [x] T1.3 Update `.home-proof__grid` only:
  - change `gap` from `1.4rem` to `1.5rem`.
- [x] T1.4 Update base `.home-pipeline` only:
  - add `margin-top: 0.25rem;`.
- [x] T1.5 Do not change:
  - `.content__page--home` gap;
  - `.home-hero*`;
  - `.case-card*`;
  - `.control-room*`;
  - `.home-pipeline__*` internals.

### 2. Responsive rhythm

- [x] T2.1 In existing `@media (max-width: 1023px)`, add or update `.home-proof` only:
  - set `padding-top: 0;`.
- [x] T2.2 In existing `@media (max-width: 1023px)`, update `.home-pipeline` only:
  - keep existing `gap` and `padding`;
  - add `margin-top: 0;`.
- [x] T2.3 In existing `@media (max-width: 767px)`, update `.home-proof__grid` only:
  - keep `grid-template-columns: 1fr;`;
  - add `gap: 1.1rem;`.
- [x] T2.4 In existing `@media (max-width: 480px)`, update `.home-proof__heading` only:
  - keep existing `font-size: 1.05rem;`;
  - add or set `margin-bottom: 1.2rem;`.
- [x] T2.5 Do not create new breakpoints.

### 3. Scope guards

- [x] T3.1 Confirm `git diff --name-only -- src` returns only:
  - `src/styles/home.css`.
- [x] T3.2 Confirm `git diff -- src/app/page.tsx` is empty.
- [x] T3.3 Confirm source diff does not touch:
  - `.home-hero*`;
  - `.case-card*`;
  - `.control-room*`;
  - `.home-pipeline__step`;
  - `.home-pipeline__label`;
  - `.home-pipeline__icon`;
  - `.home-pipeline__arrow`;
  - data files;
  - package/dependency files;
  - global responsive/dark/foundation files;
  - `docs/JUAN-FONTALVO-ROADMAP.md`;
  - `openspec/specs/design-responsividad/`.
- [x] T3.4 Confirm source changed lines remain below 80.

### 4. Verification

- [x] T4.1 Run `npm run lint`.
- [x] T4.2 Run `npm run build`.
- [x] T4.3 Run `git diff --check`.
- [x] T4.4 Run or manually perform Home smoke:
  - desktop `/`: hero, proof, and pipeline render in order;
  - desktop rhythm remains readable;
  - 390px no horizontal overflow;
  - 360px no horizontal overflow;
  - dark mode remains readable;
  - reduced-motion behavior remains unchanged.

### 5. Fresh review before commit

- [x] T5.1 Review final source diff against Proposal, Spec, Design, and Tasks.
- [x] T5.2 For a small CSS-only section-flow diff under 30 source lines, inline review is acceptable; use `review-readability` if diff expands or rhythm feels subjective.
- [x] T5.3 Confirm unrelated local work remains unstaged/out of scope.

### 6. Commit strategy

- [x] T6.1 If Apply/Verify/Review pass, commit source as one focused commit. Suggested message:
  - `tune(css): refine Home section rhythm`
- [ ] T6.2 Then Sync/Archive OpenSpec artifacts as a separate docs commit.
- [x] T6.3 Do not stage unrelated `.gitignore`, CV artifacts, roadmap, private CV SDD, or `design-responsividad`.

### 7. Rollback

- [ ] T7.1 Roll back by restoring only `src/styles/home.css`.
- [ ] T7.2 Re-run lint/build/diff-check and Home smoke after rollback.
