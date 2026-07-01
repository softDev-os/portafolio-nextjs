# Tasks: home-pipeline-tuning

## Review Workload Forecast

| Field | Value |
| --- | --- |
| Estimated source diff | 10–25 changed lines |
| Allowed source file | `src/styles/home.css` only |
| 300-line budget risk | Low |
| Chained PRs recommended | No |
| Decision needed before Apply | No, unless scope expands |

## Tasks

### 0. Pre-apply safety

- [x] T0.1 Check `git status --short` before source edits. Expected unrelated local work may include `.gitignore`, CV artifacts, and `openspec/specs/design-responsividad/`; do not touch or stage them.
- [x] T0.2 Run baseline `npm run lint` and `npm run build` if feasible; record pre-existing Edge runtime warning if present.
- [x] T0.3 Reconfirm source forecast: only `src/styles/home.css`, only `.home-pipeline*` selectors, expected 10–25 changed lines. Stop if plan expands.
- [x] T0.4 Record current `.home-pipeline*` CSS baseline in `apply-progress.md`.

### 1. CSS implementation in `src/styles/home.css`

- [x] T1.1 Update base `.home-pipeline` only:
  - add `row-gap: 0.75rem;`
  - change background from plain `var(--color-principal)` to a subtle gradient:

    ```css
    background: linear-gradient(
      135deg,
      var(--color-principal),
      rgba(247, 185, 53, 0.06)
    );
    ```

  - keep position, z-index, display, alignment, justify-content, width, flex-wrap, opacity, and animation unchanged.
- [x] T1.2 Update `.home-pipeline__step` only:
  - add `min-width: 0;`
- [x] T1.3 Update `.home-pipeline__arrow` only:
  - add `flex-shrink: 0;`
- [x] T1.4 Update `[data-theme="dark"] .home-pipeline` only:
  - preserve border color;
  - change background to matching dark gradient:

    ```css
    background: linear-gradient(
      135deg,
      var(--color-principal),
      rgba(247, 185, 53, 0.08)
    );
    ```

- [x] T1.5 Update only the existing `max-width: 480px` `.home-pipeline__label` rule:
  - keep existing font-size;
  - add `white-space: normal;`
  - add `text-align: left;`
- [x] T1.6 Do not modify JSX, `.home-hero*`, `.control-room*`, `.home-proof*`, `.case-card*`, `.home-hero__cta*`, `.btn*`, global links/buttons, responsive foundation files, dark-mode global files, or `openspec/specs/design-responsividad/`.

### 2. Verification

- [x] T2.1 Run `npm run lint`.
- [x] T2.2 Run `npm run build`.
- [x] T2.3 Run `git diff --check`.
- [x] T2.4 Static scope guards:
  - `git diff --name-only -- src` must show only `src/styles/home.css`.
  - `git diff -- src/app/page.tsx` must be empty.
  - `git diff -- src/styles/home.css` must show only `.home-pipeline*` and `[data-theme="dark"] .home-pipeline` changes.
  - no `home-hero`, `control-room`, `home-proof`, `case-card`, CTA, global primitive, responsive foundation, or `design-responsividad` changes.
- [x] T2.5 Playwright/manual Home smoke:
  - `/` renders the pipeline.
  - four labels remain visible.
  - three arrows remain visible.
  - desktop remains compact.
  - 390px and 360px have no horizontal overflow.
  - dark mode remains readable.
  - reduced motion suppresses pipeline entrance animation.

### 3. Fresh review / Judgment Day before commit

- [x] T3.1 Review final diff against `proposal.md`, `spec.md`, and `design.md`.
- [x] T3.2 Confirm only `src/styles/home.css` changed under source.
- [x] T3.3 Confirm changed lines are below 80 and under the 300-line unit budget.
- [x] T3.4 Confirm unrelated local work remains unstaged/out of scope.

### 4. Commit strategy

- [x] T4.1 If verification and review pass, commit as one focused source commit. Suggested message: `tune(css): refine Home pipeline wrapping`.
- [x] T4.2 Do not stage unrelated `.gitignore`, CV artifacts, private CV SDD, or `design-responsividad`.

### 5. Rollback

- [ ] T5.1 Roll back by restoring only `src/styles/home.css`.
- [ ] T5.2 Re-run lint/build/diff-check and Home smoke after rollback.
