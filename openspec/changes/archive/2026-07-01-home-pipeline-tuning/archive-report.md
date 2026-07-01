# Archive Report: home-pipeline-tuning

## Status

Archived.

## Executive Summary

Unit `home-pipeline-tuning` completed a CSS-only refinement of the Home pipeline block. The pipeline now has improved multi-line wrapping support, subtle visual connection to the proof-card area, dark-mode surface parity, and preserved reduced-motion behavior.

## Change Summary

| Field | Value |
| --- | --- |
| Change | `home-pipeline-tuning` |
| Source commit | `fa5423e tune(css): refine Home pipeline wrapping` |
| Source files changed | `src/styles/home.css` |
| Source changed lines | 17 |
| JSX changes | None |
| Data changes | None |
| Budget | Under 80 target and 300 unit budget |

## Phase Artifacts Preserved

- explore.md
- proposal.md
- specs/home-pipeline-tuning/spec.md
- design.md
- tasks.md
- apply-progress.md
- verify-report.md
- sync-report.md
- archive-report.md (this file)

## Canonical Spec

- `openspec/specs/home-pipeline-tuning/spec.md` — created and remains in place.

## Verification Summary

- `npm run lint`: PASS.
- `npm run build`: PASS; existing Edge runtime static-generation warning remains.
- `git diff --check`: PASS.
- Playwright smoke: PASS.
- HEAD and `origin/main`: `fa5423e` for source before archive docs commit.

## Scope Compliance

- No JSX changes.
- No data changes.
- No hero/control-room/proof-card/CTA/global changes.
- No responsive foundation or global dark-mode changes.
- No `openspec/specs/design-responsividad/` changes.

## Unrelated Local Work Excluded

The following local items were intentionally excluded from this unit:

- `.gitignore`
- `cv-refactor-scout.md`
- `docs/JUAN-FONTALVO-ROADMAP.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`
