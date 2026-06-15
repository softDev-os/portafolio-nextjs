# Tasks: home-proof-cards-tuning

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 80-130 source lines, expected below 150 preferred fail-stop |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR / single implementation unit |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Source Forecast and Guardrails

- Allowed source files: `src/app/page.tsx`, `src/styles/home.css`.
- Read-only source context: `src/data/projects.ts`.
- Hard out of scope: `openspec/specs/design-responsividad/`, Home hero/control-room/pipeline/CTA selectors, global primitives, route metadata, data modules, Tailwind/shadcn.
- Preferred fail-stop: pause before or during Apply if the forecast/actual source diff exceeds 150 changed lines or requires source changes outside the two allowed files.
- Unit budget: stay under 300 changed source lines; current forecast is comfortably below budget.

## Tasks

### 0. Pre-apply safety

- [x] T0.1 Check `git status --short` before source edits. Expected state confirmed: untracked OpenSpec artifacts under `openspec/changes/home-proof-cards-tuning/` plus known out-of-scope `openspec/specs/design-responsividad/` only.
- [x] T0.2 Run baseline verification from repo root: `npm run lint` PASS and `npm run build` PASS; existing Edge runtime static-generation warning noted.
- [x] T0.3 Confirm source scope forecast remains `80-130` changed lines and only targets `src/app/page.tsx` / `src/styles/home.css`.
- [x] T0.4 Record the current `.home-proof` card JSX snippet and `.case-card*` CSS snippet in Apply notes; baseline captured from reads before editing.

### 1. JSX implementation in `src/app/page.tsx`

- [x] T1.1 Modify only the internals of the `.home-proof` `.case-card` articles in `src/app/page.tsx`; imports, metadata, route structure, hero/control-room/pipeline/CTA JSX, data fetching, and card map order unchanged.
- [x] T1.2 Replace the card wrapper `<div className="case-card__meta">` with `<header className="case-card__header">`; metadata badge remains exactly conditional on `study.metadataLabel`.
- [x] T1.3 Wrap `study.problem` in `<div className="case-card__section">` with visible label `<span className="case-card__section-label">Problema</span>` and keep `<p className="case-card__problem">{study.problem}</p>`.
- [x] T1.4 Wrap the first outcome in the existing `study.outcomes.length > 0` condition using `<div className="case-card__section case-card__section--outcome">`, visible label `Resultado observado`, and `<p className="case-card__outcome">{study.outcomes[0]}</p>`.
- [x] T1.5 Wrap the stack list in `<div className="case-card__section case-card__section--stack">`, add visible label `Stack`, and preserve `<ul className="case-card__stack" aria-label="Tecnologías utilizadas">` plus `study.stack.slice(0, 3).map(...)` unchanged.
- [x] T1.6 Verify no data mutation or content/order change occurred: `study.title`, `study.problem`, `study.outcomes[0]`, `study.stack.slice(0, 3)`, and optional `study.metadataLabel` behavior preserved; no fallback metadata badge added.

Planned JSX structure:

```tsx
<article key={study.id} className="case-card">
  <header className="case-card__header">
    {study.metadataLabel && (
      <span className="case-card__badge">{study.metadataLabel}</span>
    )}
    <h3 className="case-card__title">{study.title}</h3>
  </header>

  <div className="case-card__section">
    <span className="case-card__section-label">Problema</span>
    <p className="case-card__problem">{study.problem}</p>
  </div>

  {study.outcomes.length > 0 && (
    <div className="case-card__section case-card__section--outcome">
      <span className="case-card__section-label">Resultado observado</span>
      <p className="case-card__outcome">{study.outcomes[0]}</p>
    </div>
  )}

  <div className="case-card__section case-card__section--stack">
    <span className="case-card__section-label">Stack</span>
    <ul className="case-card__stack" aria-label="Tecnologías utilizadas">
      {study.stack.slice(0, 3).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
</article>
```

### 2. CSS implementation in `src/styles/home.css`

- [x] T2.1 Rename the `.case-card__meta` rule to `.case-card__header` and use header-owned flex column spacing; old `.case-card__meta` dependency removed.
- [x] T2.2 Adjust `.case-card` spacing for labeled sections with a small vertical `gap`, while preserving background, border, radius, padding, hover, animation, and transition ownership.
- [x] T2.3 Add `.case-card__section` and `.case-card__section-label` for visible compact labels using existing Home tokens.
- [x] T2.4 Add `.case-card__section--outcome` as a subtle observed-evidence surface with gold-tinted background/border and left accent; qualitative and restrained.
- [x] T2.5 Add `.case-card__section--stack` and move bottom-alignment behavior there, so `.case-card__stack` remains a wrapped list of compact pills without owning `margin-top: auto`.
- [x] T2.6 Tune `.case-card__problem` and `.case-card__outcome` spacing/weight: paragraph-owned bottom margins removed, problem remains readable, outcome is non-footnote-like with stronger scannability.
- [x] T2.7 Preserve existing `.home-proof__grid` responsive behavior: 3 columns desktop, 2 columns at `max-width: 1023px`, 1 column at `max-width: 767px`.
- [x] T2.8 Add dark-mode support only for new `.case-card__section*` and outcome-surface needs inside existing Home-local `[data-theme="dark"]` patterns; global dark-mode files unchanged.
- [x] T2.9 Preserve reduced-motion: `.case-card` remains covered by the existing `@media (prefers-reduced-motion: reduce)` block and no new proof-card animations/transform motion introduced.
- [x] T2.10 Do not modify selectors for `.content__page--home*`, `.home-hero*`, `.control-room*`, `.home-pipeline*`, `.home-hero__cta*`, `.section*`, `.btn*`, global links/buttons, or responsive foundation files.

### 3. Verification

- [x] T3.1 Run `npm run lint` and `npm run build`; both PASS with existing Edge runtime static-generation warning only.
- [x] T3.2 Run `git diff --check`; PASS.
- [x] T3.3 Run static scope guards: only `src/app/page.tsx` and `src/styles/home.css` changed under `src`; `src/data/projects.ts` and `openspec/specs/design-responsividad/` unchanged.
- [x] T3.4 Review `git diff -- src/app/page.tsx`: JSX changes confined to `.home-proof` card internals; no imports, metadata, route behavior, card count, card order, or source data access changed.
- [x] T3.5 Review `git diff -- src/styles/home.css`: changed selectors limited to `.case-card*` and necessary Home-local dark wrappers for those selectors.
- [x] T3.6 Playwright Home smoke on `/`: “Casos reales” section renders exactly 3 cards, and each card visibly shows `Problema`, `Resultado observado`, and `Stack`.
- [x] T3.7 Playwright data smoke on `/`: each card renders the same title, problem, first outcome, and first three stack values from `src/data/projects.ts`; card without `metadataLabel` has no fallback badge.
- [x] T3.8 Playwright environment smoke on `/`: dark mode/reduced-motion context stable; 390px/360px mobile viewports pass with no horizontal overflow or clipped card content.

### 4. Fresh review / Judgment Day before commit

- [x] T4.1 Re-read `proposal.md`, `spec.md`, and `design.md` against the final diff.
- [x] T4.2 Perform reviewer-style rejection pass: diff does not overclaim evidence, invent data, change unrelated Home sections, exceed 150 changed source lines, or touch files outside `src/app/page.tsx` / `src/styles/home.css`.
- [x] T4.3 Confirm final `git diff --numstat -- src/app/page.tsx src/styles/home.css` is 100 changed source lines, under the preferred 150 fail-stop and 300-line unit budget.

### 5. Commit strategy

- [ ] T5.1 If verification and Judgment Day pass and the source diff remains under budget, commit as one focused unit. Suggested message: `feat(home): tune proof card hierarchy`.
- [ ] T5.2 Do not commit `openspec/specs/design-responsividad/` or unrelated local/untracked files. Include only approved source changes and the relevant `openspec/changes/home-proof-cards-tuning/` artifacts if the repository workflow expects SDD artifacts in the same unit commit.

### 6. Rollback

- [ ] T6.1 Before commit, rollback by restoring only `src/app/page.tsx` and `src/styles/home.css` to the recorded baseline; keep `src/data/projects.ts` untouched.
- [ ] T6.2 After commit, rollback with a revert of the focused unit commit or by reverting the two source files, then rerun `npm run lint`, `npm run build`, `git diff --check`, and the Home smoke checks.
- [ ] T6.3 Rollback criteria: mobile overflow, dark-mode unreadability, result surface overclaiming, data/order mutation, or source scope creep outside the approved files.
