# Design: Premium Consultant Portfolio

## Technical Approach

Rebuild the current static portfolio as a proof-first consulting funnel without adding backend scope. The source of truth becomes structured case-study content in `src/data/projects.ts`; App Router pages render that content as static Server Components where possible. The homepage and navigation send visitors to proof first, then contact. Unsupported legacy proof surfaces are removed or reframed conservatively.

## Architecture Decisions

| Decision | Alternatives considered | Rationale |
|---|---|---|
| Replace the legacy gallery `Project` model with a `CaseStudy` model in `src/data/projects.ts`. | Add a parallel data file; keep categories/images only. | Existing imports are limited to portfolio, so evolving the existing content module is lower churn and avoids two competing portfolio sources. |
| Make `/portafolio` a static proof page, not a client-side category gallery. | Keep `useState` filters; add dynamic case-study routes. | Specs require exactly three flagship studies first, not browsing by generic categories. Removing client state improves simplicity and enables page metadata. |
| Keep contact static and qualified. | Add lead capture/CRM/server action. | Backend lead capture is out of scope; contact should be a secondary CTA after proof context. |
| Reuse current global CSS/BEM surface with targeted additions. | Full Tailwind/visual-system rewrite; edit both global CSS files. | The app imports `src/styles/globals.css`; `src/app/globals.css` is currently unused Tailwind starter CSS. Avoiding a broad style rewrite protects the 400-line review budget. |
| Hide or neutralize dead blog/detail links. | Implement `/blog/[slug]`. | Blog detail implementation is outside the consultant funnel and would distract from credibility cleanup. |

## Data Flow

```text
src/data/projects.ts
  ├─ getFlagshipCaseStudies() ──→ src/app/page.tsx proof CTA/preview
  └─ getFlagshipCaseStudies() ──→ src/app/portafolio/page.tsx case-study cards
                                      └─ CTA ──→ /contacto
src/data/personal.ts ───────────→ Sidebar, about, contact identity copy
```

`getFlagshipCaseStudies()` must return the three required IDs. If content is incomplete, portfolio renders a conservative incomplete-proof notice instead of claiming a complete flagship set.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/data/projects.ts` | Modify | Replace gallery fields/categories with typed flagship case-study records and helper guards. |
| `src/data/personal.ts` | Modify | Update role, bio, and consultant positioning copy. |
| `src/components/Sidebar.tsx` | Modify | Update role/nav labels; prioritize proof route over contact; keep CV/social links. |
| `src/app/page.tsx` | Modify | Premium Architect / AI Engineer hero, proof-first primary CTA, secondary contact CTA. |
| `src/app/portafolio/page.tsx` | Modify | Remove `use client`, category state, and gallery UI; render three evidence-oriented studies first. |
| `src/app/sobre-mi/page.tsx` | Modify | Replace unverifiable reviews/clients/pricing/counters with credibility boundaries and consulting services. |
| `src/app/contacto/page.tsx` | Modify | Frame contact as qualified next step; keep mail/tel/static form limitations visible or replace form with mailto-oriented CTA. |
| `src/app/blog/page.tsx` | Modify | Remove links to missing `/blog/[slug]` routes or mark blog as unavailable. |
| `src/app/layout.tsx` | Modify | Update default metadata to consultant/AI architecture positioning. |
| `src/styles/globals.css` | Modify | Add targeted BEM classes for case studies and proof CTAs; do not touch unused `src/app/globals.css` unless imports change. |

## Interfaces / Contracts

```ts
const CASE_STUDY_KIND = {
  FLAGSHIP: "flagship",
  SUPPORTING: "supporting",
} as const;

type CaseStudyKind = (typeof CASE_STUDY_KIND)[keyof typeof CASE_STUDY_KIND];

interface CaseStudy {
  id: "whatsapp-lead-intake" | "support-human-handoff" | "agent-memory";
  kind: CaseStudyKind;
  title: string;
  audience: string;
  problem: string;
  solution: string;
  outcomes: string[];
  evidenceNote: string;
  stack: string[];
}
```

Outcomes must be qualitative unless the implementation has public evidence for a metric.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static/data | Exactly three flagship IDs and no missing proof sections. | Small exported helper check during implementation; verify manually if no runner is added. |
| Quality | TypeScript/Next route validity and lint. | `npm run lint`, `npm run build`. |
| Manual | Homepage → portfolio → contact funnel, mobile nav, blog no dead links. | Browser route review after build. |

## Migration / Rollout

No data migration required. Replace legacy placeholder content in one static rollout. Rollback is git restore of modified data, route, component, and CSS files.

## Open Questions

- None blocking. Implementation must only include evidence that can be safely stated publicly.
