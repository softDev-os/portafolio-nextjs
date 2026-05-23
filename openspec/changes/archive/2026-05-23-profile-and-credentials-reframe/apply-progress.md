# Apply Progress: Profile and Credentials Reframe

## Change

`profile-and-credentials-reframe`

## Mode

Standard mode. Strict TDD is disabled in `openspec/config.yaml`, and no test runner is configured.

## Workload / PR Boundary

- Mode: stacked PR slice (`stacked-to-main`)
- Completed slices: Unit 1 — foundational identity and credentials slice; Unit 2 — `Perfil` narrative and manual route verification
- Unit 1 boundary: data contracts, `/curriculum` Credenciales rendering, minimal `/sobre-mi` metadata/heading cleanup required by removed personal fields, sidebar CV removal, and targeted CSS cleanup
- Unit 2 boundary: full `/sobre-mi` strategic profile narrative, proof-first Perfil CTAs, scoped CSS for new Perfil sections, and manual route checks for the assigned routes
- Deferred: broader route migration, bilingual support, and any new public claims not backed by visible evidence

## Completed Tasks

- [x] 1.1 Refactored `src/data/skills.ts` to capability groups with `CAPABILITY_GROUP`, `CapabilityGroupId`, and flat `CapabilityGroup` interface; removed percentage/className skill data.
- [x] 1.2 Refactored `src/data/experience.ts` so certificate verification `id` is optional and placeholder IDs are removed; adjusted education/experience copy toward credibility evidence.
- [x] 1.3 Refactored `src/data/personal.ts` to remove `cv` while keeping contact/location fields still used by contact/social routes.
- [x] 2.1 Updated `/curriculum` metadata/title/heading to `Credenciales` and replaced progress bars with capability evidence cards.
- [x] 2.2 Added conditional certificate ID rendering so missing/placeholder IDs do not render.
- [x] 2.3 Updated `/sobre-mi` metadata/title/heading to `Perfil` and removed the raw personal-data list UI.
- [x] 2.4 Reworked `/sobre-mi` into a strategic consultant profile with method steps, capability themes, principles, trust boundaries, and proof-first CTAs; avoided candidate/job-seeker wording.
- [x] 3.1 Relabeled `/curriculum` sidebar navigation from `CV` to `Credenciales`.
- [x] 3.2 Removed the `Descargar CV` anchor block and `personal.cv` dependency from the sidebar.
- [x] 3.3 Removed/stopped using CV button and skill-percentage CSS; added compact capability-card styles for `Credenciales`.
- [x] 4.1 Ran `npm run lint` and `npm run build` successfully.
- [x] 4.2 Performed manual browser route checks on `/`, `/sobre-mi`, `/curriculum`, `/portafolio`, and `/contacto` for active nav state and proof-first CTA order.
- [x] 4.3 Checked source and built app output for excluded legacy strings/classes.
- [x] 5.1 Recorded this apply-progress artifact.

## Verification Evidence

| Check | Result | Notes |
|---|---:|---|
| `npm run lint` | Pass | ESLint completed with no reported issues. |
| `npm run build` | Pass | Next.js 16.2.0 production build and TypeScript completed successfully; routes prerendered as static content. |
| Manual `/` browser check | Pass | Active nav was `/`; primary CTA remains `/portafolio` (`Ver casos reales`). |
| Manual `/sobre-mi` browser check | Pass | Active nav was `/sobre-mi`; title/heading `Perfil`; primary profile CTA points to `/portafolio`, secondary to `/contacto`; no legacy CV/raw-field strings found in rendered text. |
| Manual `/curriculum` browser check | Pass | Active nav was `/curriculum`; heading `Credenciales`; no `CV`, `%`, placeholder certificate ID, `Edad`, or `Municipio` strings found in rendered text. |
| Manual `/portafolio` browser check | Pass | Active nav was `/portafolio`; proof page remains the route before contact, with next step linking to `/contacto`. |
| Manual `/contacto` browser check | Pass | Active nav was `/contacto`; contact page keeps a secondary `Revisar casos antes` link to `/portafolio`. |
| Static source grep | Pass | No matches in `src` for `personal.cv`, `sidebar__cv-btn`, `skills__percentage`, `skills__number`, `Descargar CV`, `ID Verificación: XXXXXX`, nav label `CV`, or `personal.age`. |
| Production build output grep | Pass | No matches in `.next/server` or `.next/static` for legacy CV/download/raw-filler/skill-percentage strings checked. |

## Files Changed

| File | Action | What Was Done |
|---|---|---|
| `src/data/skills.ts` | Modified | Replaced percentage skill arrays with evidence-safe capability groups. |
| `src/data/experience.ts` | Modified | Made certificate ID optional, removed placeholders, and reframed descriptions as credibility evidence. |
| `src/data/personal.ts` | Modified | Removed CV file reference while preserving contact/social fields still in use. |
| `src/app/curriculum/page.tsx` | Modified | Reframed route as `Credenciales`, rendered capability cards, and omitted non-verifiable certificate IDs. |
| `src/app/sobre-mi/page.tsx` | Modified | Reframed title/heading as `Perfil` and removed raw personal-data list UI. |
| `src/components/Sidebar.tsx` | Modified | Replaced `CV` nav label with `Credenciales` and removed downloadable CV CTA. |
| `src/styles/globals.css` | Modified | Removed obsolete CV/skill-percentage styles and added capability card styles. |
| `openspec/changes/profile-and-credentials-reframe/tasks.md` | Modified | Recorded stacked-to-main chain strategy and marked completed Unit 1 tasks/checks. |
| `openspec/changes/profile-and-credentials-reframe/apply-progress.md` | Created | Captured implementation and verification evidence for this slice. |
| `src/app/sobre-mi/page.tsx` | Modified | Completed the Unit 2 profile narrative with method, principles, trust boundaries, and proof-first CTAs. |
| `src/styles/globals.css` | Modified | Added scoped Perfil hero, method, and principles styles with responsive behavior. |
| `openspec/changes/profile-and-credentials-reframe/tasks.md` | Modified | Marked Unit 2 tasks 2.4 and 4.2 complete. |
| `openspec/changes/profile-and-credentials-reframe/apply-progress.md` | Modified | Merged prior Unit 1 evidence with Unit 2 progress and verification. |

## Deviations from Design

None materially. Unit 2 stayed within the assigned `/sobre-mi` narrative and manual route verification boundary; no route migration, bilingual support, or broader content-system changes were introduced.

## Issues Found

- `openspec/config.yaml` mixes a mapping and a list item under `rules.apply`; the effective instructions were still clear from the orchestrator and artifact content.
- `src/app/contacto/page.tsx` still uses `personal.city` and `personal.country`, so those fields were preserved instead of removing all location data from `personal`.
- `.next/dev` can contain stale development chunks with removed strings/classes; production verification should check `.next/server` and `.next/static` after `npm run build`.
- No blocking implementation issues were found during Unit 2 verification.

## Remaining Tasks

- None in the active task list for this change.

## Status

14/14 tasks complete. Ready for SDD verify.
