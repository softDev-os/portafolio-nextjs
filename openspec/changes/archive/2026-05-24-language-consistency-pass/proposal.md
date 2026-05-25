# Proposal: Language Consistency Pass

## Intent

Enforce the established site language rule (EN for brand/technical terms, ES for everything else) by fixing 7 inconsistency patterns found across 8 files. The site declares `<html lang="es">` but has case study body content entirely in English, a mixed-language nav link, Spanish accent errors, and inconsistent handling of embedded EN terms in ES text.

## Scope

### In Scope
- **Pattern 1** (🔴): Translate case study body fields (`audience`, `problem`, `solution`, `outcomes`, `evidenceNote` ×3 flagship studies) to human-quality Spanish in `src/data/projects.ts`.
- **Pattern 2** (🟡): "Home" → "Inicio" in `src/components/Sidebar.tsx`.
- **Pattern 3** (🟡): EN titles + ES metadata badges is correct per rule. No content change. Flag as visual acceptance decision for the user.
- **Pattern 4** (🟢): Glossary-driven fix for EN-in-ES terms across `personal.ts`, `skills.ts`, `layout.tsx`, `page.tsx`, `portafolio/page.tsx`, `sobre-mi/page.tsx`.
- **Pattern 5** (🟢): Fix 3 blog article titles: `"Como"` → `"Cómo"`.

### Out of Scope
- **Pattern 6** ("Blog" → "Bitácora"): Deferred. "Blog" is widely accepted as a borrowed word in Spanish. Revisit if editorial content grows.
- **Pattern 7** (mixed EN+ES label "CRM ligero"): Deferred. Partially addressed by glossary in pattern 4.

## Capabilities

**New capabilities**: None — content fix, no new behavioral specs.

**Modified capabilities**: None — no spec-level behavior changes. The existing language convention is reinforced, not redefined.

## Approach

1. **Resolve glossary first**: Decide each contested EN term before touching code.
2. **Translate case study body**: Human-quality ES translations preserving technical terms (n8n, WhatsApp, AI, Engram). Match the evidence-oriented, conservative tone required by existing specs.
3. **Apply glossary across all files**: Single pass replacing EN-in-ES terms per resolved glossary.
4. **Fix nav + accents**: Trivial label/character changes.

## Decision Points

| Term | Question | Options |
|------|----------|---------|
| "handoff" | Keep EN or translate? | EN (technical term) / "derivación" / "transferencia" |
| "workflows" | Keep EN or translate? | EN / "flujos de trabajo" |
| "intake" | Keep EN or translate? | EN / "captura" / "recepción" |
| "flagship" / "set flagship" | Keep EN or translate? | EN / "casos principales" / "principales" |
| Pattern 3 acceptance | OK that titles render EN and badges ES? | Accept visual mix / align both to EN |

## Affected Areas

| Area | Impact | Change |
|------|--------|--------|
| `src/data/projects.ts` | Modified | ~15 fields translated to ES (audience, problem, solution, outcomes, evidenceNote ×3) |
| `src/components/Sidebar.tsx` | Modified | "Home" → "Inicio" |
| `src/app/blog/page.tsx` | Modified | 3 titles: "Como" → "Cómo" |
| `src/data/personal.ts` | Modified | Glossary applied in bio |
| `src/data/skills.ts` | Modified | Glossary in capability titles + tools |
| `src/app/layout.tsx` | Modified | Glossary in SEO description |
| `src/app/page.tsx` | Modified | Glossary in tagline |
| `src/app/sobre-mi/page.tsx` | Modified | Glossary in capability section titles |
| `src/app/portafolio/page.tsx` | Modified | Glossary in notice + aria-label |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Translations lose evidence-oriented conservative tone | Medium | Review translations against spec's "conservative wording" requirement |
| EN tech terms in ES sentences create awkward grammar | Medium | Resolve glossary first; review all output |
| Regression from touching shared data files | Low | `npm run build` + visual review of all affected pages |

## Rollback Plan

Two commits: (1) glossary+accents+nav, (2) case study translations. Revert per commit with `git revert`. Content-only changes — no structural or behavioral risk.

## Dependencies

None.

## Success Criteria

- [ ] All 3 case study body fields are in Spanish, preserving technical EN terms
- [ ] "Inicio" renders in nav, not "Home"
- [ ] Blog titles use "Cómo" not "Como"
- [ ] All EN-in-ES terms follow the resolved glossary
- [ ] `npm run build` passes without errors
- [ ] Visual review: no awkward EN↔ES mixing on any page
