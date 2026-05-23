# Proposal: Profile and Credentials Reframe

## Intent

Reframe legacy personal/CV areas into premium consultant IA: `/sobre-mi` becomes strategic `Perfil`; `/curriculum` becomes supporting `Credenciales`. Remove weak job-seeker signals: CV download, raw personal data, placeholder verification, skill percentages, and candidate copy.

## Scope

### In Scope
- Rework `/sobre-mi` into strategic `Perfil` aligned with proof-first positioning.
- Rework `/curriculum` into secondary `Credenciales` without CV framing.
- Update sidebar labels and remove downloadable CV CTA.
- Remove/reduce age, municipality, raw data, percentages, placeholder IDs.

### Out of Scope
- Bilingual support or locale architecture.
- Creating `/credenciales` or redirecting `/curriculum`.
- Major redesign, animations, or new case studies.
- Adding unverifiable metrics, testimonials, logos, pricing, or claims.

## Capabilities

### New Capabilities
- `profile-credentials-ia`: Route-preserving `Perfil` + `Credenciales`, sidebar semantics, no CV download, evidence-safe content.

### Modified Capabilities
- `consultant-positioning`: Extends premium positioning to identity pages and removes job-seeker signals competing with proof-first flow.

## Approach

Keep current URLs to minimize routing/SEO risk. Reshape titles, metadata, sections, and data so `Perfil` explains how Juan works and `Credenciales` supports authority. Present certificates and skills as supporting evidence, not fake precision.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/sobre-mi/page.tsx` | Modified | `Perfil` semantics; remove personal-data block; strengthen strategic narrative. |
| `src/app/curriculum/page.tsx` | Modified | `Credenciales` title/metadata/sections; remove percentages and placeholder IDs. |
| `src/components/Sidebar.tsx` | Modified/Removed | `CV` → `Credenciales`; remove `Descargar CV` and `personal.cv` dependency. |
| `src/data/personal.ts` | Modified | Remove CV URL usage and raw personal UI fields. |
| `src/data/experience.ts` | Modified | Prune/reword credential copy for consultant authority. |
| `src/data/skills.ts` | Modified | Replace percentage skill model with evidence-safe capability groups. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Content becomes abstract | Medium | Tie claims to flagship case-study themes and trust boundaries. |
| `/curriculum` URL remains legacy | Medium | Use `Credenciales` labels/copy now; defer route migration. |
| Certificates with placeholders weaken credibility | High | Remove verification-ID display unless real IDs exist. |

## Rollback Plan

Revert touched route, sidebar, and data files. Routes are preserved; rollback is a normal git revert.

## Dependencies

- Existing consultant positioning and case-study proof contract.
- Existing Next.js App Router route structure.

## Success Criteria

- [ ] Sidebar shows `Perfil` and `Credenciales`, with no downloadable CV CTA.
- [ ] `/sobre-mi` reads as strategic consultant profile, not personal-data/CV page.
- [ ] `/curriculum` reads as supporting credentials, not a job application CV.
- [ ] Raw personal data, skill percentages, and placeholder certificate IDs are removed from rendered UI.
- [ ] Existing proof-first positioning remains intact and no unsupported claims are introduced.
