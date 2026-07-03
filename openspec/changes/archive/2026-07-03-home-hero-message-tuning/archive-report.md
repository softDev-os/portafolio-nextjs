# Archive Report: home-hero-message-tuning

## Status

Archived.

## Executive Summary

Unit `home-hero-message-tuning` completed a JSX-only microcopy update to broaden the Home hero from AI-business-only positioning into the wider Juan Fontalvo practical tech brand. The change preserves the name, proof-first primary CTA, control-room, proof cards, pipeline, and all CSS.

## Change Summary

| Field | Value |
| --- | --- |
| Change | `home-hero-message-tuning` |
| Source commit | `84d6495 tune(home): broaden hero brand message` |
| Source files changed | `src/app/page.tsx` |
| Source changed lines | 12 |
| CSS changes | None |
| Data changes | None |
| Budget | Under 80-line hard cap |

## Phase Artifacts Preserved

- explore.md
- proposal.md
- specs/home-hero-message-tuning/spec.md
- design.md
- tasks.md
- apply-progress.md
- verify-report.md
- sync-report.md
- archive-report.md (this file)

## Canonical Spec

- `openspec/specs/home-hero-message-tuning/spec.md` — created and remains in place.

## Verification Summary

- `npm run lint`: PASS.
- `npm run build`: PASS; existing Edge runtime static-generation warning remains.
- `git diff --check`: PASS.
- Playwright smoke: PASS, 3 tests.
- Fresh review: `review-readability` No findings.
- HEAD and `origin/main`: `84d6495` for source before archive docs commit.

## Scope Compliance

- JSX-only.
- No CSS fallback needed.
- No proof/control-room/pipeline changes.
- No data/global/foundation changes.
- No `docs/JUAN-FONTALVO-ROADMAP.md` changes.
- No `openspec/specs/design-responsividad/` changes.

## Unrelated Local Work Excluded

The following local items were intentionally excluded from this unit:

- `.gitignore`
- `cv-refactor-scout.md`
- `docs/JUAN-FONTALVO-ROADMAP.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`
