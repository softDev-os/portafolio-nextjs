# Tasks: home-hero-message-tuning

## Review Workload Forecast

| Field | Value |
| --- | --- |
| Happy-path source diff | 8–18 changed lines |
| Fallback source diff | 18–30 changed lines |
| Hard source cap | 80 changed lines |
| Happy-path source file | `src/app/page.tsx` only |
| Fallback source file | `src/styles/home.css` only if verification requires it |
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
- [x] T0.4 Reconfirm happy-path source scope:
  - only `src/app/page.tsx`;
  - no CSS unless verification proves it necessary;
  - no proof/control-room/pipeline/data/roadmap/global/foundation changes.

### 1. JSX microcopy update in `src/app/page.tsx`

- [x] T1.1 Update `.home-hero__eyebrow` text:
  - from `Arquitectura de software + IA aplicada`
  - to `Tecnología práctica + IA aplicada`.
- [x] T1.2 Update `.home-hero__role` text:
  - from `Arquitecto de software / Ingeniero IA`
  - to `Creador tech / Software / IA aplicada`.
- [x] T1.3 Update `.home-hero__tagline` text:
  - from the current AI operations-only sentence
  - to `Ayudo a personas y negocios a comprar, reparar, automatizar y aprovechar mejor su tecnología — desde PCs y laptops hasta software y sistemas con IA.`
- [x] T1.4 Keep primary CTA unchanged:
  - text `Ver casos reales`;
  - href `/casos-reales`.
- [x] T1.5 Update secondary CTA text only:
  - from `Diseñar un workflow conmigo`
  - to `Hablemos de tu solución`;
  - keep href `/contacto`.
- [x] T1.6 Do not change `Juan Fontalvo`, `home-hero__name`, proof cards, control-room, pipeline, data, metadata, routes, or imports.

### 2. Optional CSS fallback only if needed

- [x] T2.1 Run smoke/static checks after JSX change before touching CSS.
- [ ] T2.2 If tagline overflows or CTA wraps poorly at 390px/360px, add the smallest possible CSS fix in `src/styles/home.css`.
- [ ] T2.3 Fallback CSS, if needed, must be limited to:
  - `.home-hero__tagline`
  - `.home-hero__cta-link`
  - `@media (max-width: 480px)` rules for those selectors.
- [ ] T2.4 If fallback CSS is added, record the reason in `apply-progress.md`.
- [x] T2.5 If no CSS is needed, record that the happy path remained JSX-only.

### 3. Scope guards

- [x] T3.1 Confirm `git diff --name-only -- src` returns only:
  - `src/app/page.tsx`
  - or `src/app/page.tsx` + `src/styles/home.css` only if fallback CSS was needed.
- [x] T3.2 Confirm source diff does not touch:
  - proof-card markup/selectors/data;
  - control-room markup/selectors;
  - pipeline markup/selectors;
  - global primitives;
  - layout foundation;
  - package/dependency files;
  - `docs/JUAN-FONTALVO-ROADMAP.md`;
  - `openspec/specs/design-responsividad/`.
- [x] T3.3 Confirm source changed lines remain below 80.

### 4. Verification

- [x] T4.1 Run `npm run lint`.
- [x] T4.2 Run `npm run build`.
- [x] T4.3 Run `git diff --check`.
- [x] T4.4 Run or manually perform Home smoke:
  - desktop `/`: updated eyebrow visible;
  - updated role visible;
  - updated tagline visible;
  - primary CTA visible with href `/casos-reales`;
  - secondary CTA visible with href `/contacto`;
  - control-room still renders;
  - proof cards still render;
  - pipeline still renders;
  - 390px no horizontal overflow;
  - 360px no horizontal overflow.

### 5. Fresh review before commit

- [x] T5.1 Review final source diff against Proposal, Spec, Design, and Tasks.
- [x] T5.2 For a JSX-only copy diff under 30 source lines, inline review is acceptable; otherwise use `review-readability`.
- [x] T5.3 Confirm unrelated local work remains unstaged/out of scope.

### 6. Commit strategy

- [x] T6.1 If Apply/Verify/Review pass, commit source as one focused commit. Suggested message:
  - `tune(home): broaden hero brand message`
- [ ] T6.2 Then Sync/Archive OpenSpec artifacts as a separate docs commit.
- [x] T6.3 Do not stage unrelated `.gitignore`, CV artifacts, roadmap, private CV SDD, or `design-responsividad`.

### 7. Rollback

- [ ] T7.1 Roll back by restoring only `src/app/page.tsx`.
- [ ] T7.2 If fallback CSS was added, restore only the relevant `src/styles/home.css` hero rules.
- [ ] T7.3 Re-run lint/build/diff-check and Home smoke after rollback.
