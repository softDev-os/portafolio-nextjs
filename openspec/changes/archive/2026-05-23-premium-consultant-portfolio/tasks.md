# Tasks: Premium Consultant Portfolio

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 520–760 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 Data+metadata → PR2 Funnel pages → PR3 Credibility cleanup+styles |
| Delivery strategy | ask-always |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|---|---|---|---|
| 1 | Establish consultant data contracts and metadata baseline | PR 1 | Independent base; includes data guards and lint/build checks |
| 2 | Implement proof-first homepage and portfolio funnel | PR 2 | Depends on PR1 content/types; includes contact CTA sequence |
| 3 | Remove unsupported claims, dead blog assumptions, and finalize styling | PR 3 | Depends on PR2; includes manual funnel verification notes |

## Phase 1: Foundation / Data Contracts

- [x] 1.1 Refactor `src/data/projects.ts` to `CaseStudy`-oriented content with exactly three flagship IDs (`whatsapp-lead-intake`, `support-human-handoff`, `agent-memory`) and conservative outcome language fields.
- [x] 1.2 Add exported guards/helpers in `src/data/projects.ts` (`getFlagshipCaseStudies`, completeness check) so incomplete flagship state can be detected without runtime guessing.
- [x] 1.3 Update `src/data/personal.ts` role/bio to Architect / AI Engineer consultant framing and remove generic portfolio positioning.
- [x] 1.4 Update `src/app/layout.tsx` metadata title/description to consultant outcomes and align with proof-first search/social snippet intent.

## Phase 2: Core Funnel Implementation

- [x] 2.1 Rework `src/app/page.tsx` hero and primary CTA so proof (`/portafolio`) is primary and contact is explicitly secondary.
- [x] 2.2 Rebuild `src/app/portafolio/page.tsx` as a static Server Component (remove client category state) rendering flagship studies first with problem/solution/outcomes sections.
- [x] 2.3 Implement incomplete-proof fallback in `src/app/portafolio/page.tsx` when helper check fails (must not claim complete flagship set).
- [x] 2.4 Update `src/components/Sidebar.tsx` nav order/labels to prioritize proof routes before contact while preserving CV/social actions.

## Phase 3: Credibility Boundaries and Route Safety

- [x] 3.1 Replace unverifiable counters/testimonials/pricing claims in `src/app/sobre-mi/page.tsx` with evidence-safe consultant capability statements.
- [x] 3.2 Reframe `src/app/contacto/page.tsx` as qualified inquiry continuation after proof; keep static limitations explicit (no fake automation claims).
- [x] 3.3 Remove or neutralize dead detail links in `src/app/blog/page.tsx` so surfaced proof-funnel navigation resolves to valid, non-empty pages.

## Phase 4: Styling and Verification

- [x] 4.1 Add only targeted classes in `src/styles/globals.css` for proof CTAs/case-study layout; do not edit `src/app/globals.css` unless import strategy changes.
- [x] 4.2 Run `npm run lint` and `npm run build`; fix violations related to updated routes/data contracts.
- [x] 4.3 Perform manual verification: homepage → portfolio → contact funnel, sidebar/mobile navigation order, and blog links free of dead-end proof routes.

## Phase 5: Implementation Notes for Apply

- [x] 5.1 During apply, map Unit 1/2/3 to separate work-unit commits, each with its own verification evidence in the same commit.
- [x] 5.2 Before apply starts, confirm chain strategy selection (`stacked-to-main` or `feature-branch-chain`, otherwise explicit `size:exception`) due high budget risk.
