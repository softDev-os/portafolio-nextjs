# Tasks: Profile and Credentials Reframe

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 420-620 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 data contracts + Credenciales; PR 2 Perfil + sidebar/CSS + verification |
| Delivery strategy | ask-always |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|---|---|---|---|
| 1 | Replace CV-style data contracts and build Credenciales rendering | PR 1 | Base main; include lint/build + static-string checks |
| 2 | Reframe Perfil, remove CV CTA/nav debt, cleanup CSS and run full verification | PR 2 | Base PR 1 branch (if chained) or main (if approved single PR) |

## Phase 1: Foundation / Data Contracts

- [x] 1.1 Refactor `src/data/skills.ts` to capability groups (`CAPABILITY_GROUP` const + `CapabilityGroup` flat interface), removing `percentage` and `className` fields.
- [x] 1.2 Refactor `src/data/experience.ts` so certificate verification `id` is optional/removed and education/experience descriptions read as consultant credibility evidence.
- [x] 1.3 Refactor `src/data/personal.ts` to remove `cv` and limit identity-page surface fields; keep only contact fields still required by social/contact routes.

## Phase 2: Core Route Reframe

- [x] 2.1 Update `src/app/curriculum/page.tsx` metadata/title/heading to `Credenciales` and replace skill progress bars with capability-group evidence cards.
- [x] 2.2 In `src/app/curriculum/page.tsx`, conditionally render certificate verification IDs only when non-placeholder and non-empty.
- [x] 2.3 Update `src/app/sobre-mi/page.tsx` metadata/title/heading to `Perfil` and remove `Edad`/`Municipio`/raw-personal-data list UI.
- [x] 2.4 In `src/app/sobre-mi/page.tsx`, keep consultant narrative (principles, capability themes, trust boundaries) and avoid candidate/job-seeker wording.

## Phase 3: Integration / Navigation and Styling

- [x] 3.1 Update `src/components/Sidebar.tsx`: relabel `/curriculum` from `CV` to `Credenciales` and keep `/sobre-mi` as `Perfil`.
- [x] 3.2 Remove the `Descargar CV` anchor block and `personal.cv` dependency from `src/components/Sidebar.tsx`.
- [x] 3.3 Update `src/styles/globals.css` to remove or stop using `.sidebar__cv-btn`, `.skills__number`, and `.skills__percentage*`; add minimal styles for capability/evidence layout used by `Credenciales`.

## Phase 4: Verification

- [x] 4.1 Run `npm run lint` and `npm run build`; fix any Next/React/TypeScript regressions from contract and route changes.
- [x] 4.2 Perform manual route checks on `/`, `/sobre-mi`, `/curriculum`, `/portafolio`, `/contacto` for nav active state and proof-first CTA order.
- [x] 4.3 Verify rendered/static content excludes: `Descargar CV`, nav label `CV`, `%` skill UI, `ID Verificación: XXXXXX`, `Edad`, and `Municipio` on identity surfaces.

## Phase 5: Documentation / Apply Handoff

- [x] 5.1 Record apply notes in `openspec/changes/profile-and-credentials-reframe/` with evidence from lint/build/manual checks and any copy adjustments made for consultant framing.
