# Tasks: Language Consistency Pass

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~20 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | PR | Notes |
|------|------|----|-------|
| 1 | All patterns in one PR | PR 1 | ~20 lines, single commit or two logical commits |

## Phase 1: Case Study Body Translations (Pattern 1)

- [ ] 1.1 Translate `audience`, `problem`, `solution`, `outcomes[]`, `evidenceNote` for "WhatsApp lead intake and qualification" in `src/data/projects.ts` — preserve glossary terms (intake, workflows, handoff), technology names (n8n, WhatsApp, AI), and conservative tone
- [ ] 1.2 Translate same 5 fields for "Support triage with human handoff" in `src/data/projects.ts`
- [ ] 1.3 Translate same 5 fields for "Persistent memory for agents" in `src/data/projects.ts`
- [ ] 1.4 Verify: all 15 fields are in natural Spanish, glossary terms preserved, technology names unchanged, conservative qualitative tone maintained

## Phase 2: Glossary Verification and Fix (Pattern 4)

- [ ] 2.1 Fix `src/data/personal.ts` bio: replace "flujos de WhatsApp" with "workflows de WhatsApp" per glossary
- [ ] 2.2 Verify `src/data/skills.ts` — "Workflows operativos" title and all evidence/tools already comply with glossary
- [ ] 2.3 Verify `src/app/layout.tsx` — "workflows operativos" in SEO description already complies
- [ ] 2.4 Verify `src/app/page.tsx` — "workflows operativos" in tagline already complies
- [ ] 2.5 Verify `src/app/portafolio/page.tsx` — "handoff humano" in description and "set flagship" in notice already comply
- [ ] 2.6 Verify `src/app/sobre-mi/page.tsx` — "Intake y calificación", "Soporte con handoff humano", "handoff" in principles already comply

## Phase 3: Nav Label and Accent Fixes (Patterns 2 & 5)

- [ ] 3.1 `src/components/Sidebar.tsx`: change `label: "Home"` to `label: "Inicio"` (line 12)
- [ ] 3.2 `src/app/blog/page.tsx`: fix `title: "Como aprender a programar en 2023"` → `"Cómo..."` (line 15)
- [ ] 3.3 `src/app/blog/page.tsx`: fix `title: "Como hacer animaciones en CSS"` → `"Cómo..."` (line 23)
- [ ] 3.4 `src/app/blog/page.tsx`: fix `title: "Como maquetar una web desde cero"` → `"Cómo..."` (line 39)
- [ ] 3.5 `src/app/blog/page.tsx`: verify article 3 title ("Cómo usar el LocalStorage en JS") already correct and unchanged (line 31)

## Phase 4: Build and Visual Verification

- [ ] 4.1 Run `npm run build` — must pass with zero errors
- [ ] 4.2 Visual review of all affected pages (/, /portafolio, /sobre-mi, /blog, nav sidebar) — confirm no awkward EN↔ES mixing, translations read as professional Spanish, "Inicio" renders in nav
