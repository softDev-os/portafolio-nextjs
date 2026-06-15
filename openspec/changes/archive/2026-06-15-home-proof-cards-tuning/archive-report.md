# Archive Report: home-proof-cards-tuning

## Status

Archived.

## Executive Summary

Unit `home-proof-cards-tuning` completed a focused Home proof-card hierarchy improvement. The Home `Casos reales` cards now expose explicit `Problema`, `Resultado observado`, and `Stack` sections using existing case-study data only. The change preserved data, card order, no-fallback badge behavior, and scoped CSS to the Home proof card selectors.

## Change Summary

| Field | Value |
| --- | --- |
| Change | `home-proof-cards-tuning` |
| Source commit | `0c0ce35 feat(home): tune proof card hierarchy` |
| Source files changed | `src/app/page.tsx`, `src/styles/home.css` |
| Source changed lines | 100 |
| Route/page | `/` Home proof cards |
| Data changes | None |
| JSX changes | Bounded to `.home-proof` card internals |
| CSS changes | Bounded to `.case-card*` and Home-local dark wrappers |
| Budget | Under 150 preferred fail-stop and 300 unit budget |

## Phase Artifacts Preserved

- explore.md
- proposal.md
- specs/home-proof-cards-tuning/spec.md
- design.md
- tasks.md
- apply-progress.md
- verify-report.md
- sync-report.md
- archive-report.md (this file)

## Canonical Spec

- `openspec/specs/home-proof-cards-tuning/spec.md` — created and remains in place.

## Verification Summary

- Judgment Day dual review: CLEAN.
- `npm run lint`: PASS.
- `npm run build`: PASS; existing Edge runtime static-generation warning remains.
- `git diff --check`: PASS.
- Playwright verification smoke: PASS.
- HEAD and `origin/main`: `0c0ce35` for source before archive docs commit.

## Scope Compliance

- No `src/data/projects.ts` changes.
- No fallback metadata badge.
- No case order/count changes.
- No hero/control-room/pipeline/CTA changes.
- No global primitive/responsive/dark-mode architecture changes.
- No Tailwind/shadcn/dependency changes.
- No `openspec/specs/design-responsividad/` changes.

## Unrelated Local Work Excluded

The following local items were intentionally excluded from this unit:

- `.gitignore`
- `cv-refactor-scout.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`
