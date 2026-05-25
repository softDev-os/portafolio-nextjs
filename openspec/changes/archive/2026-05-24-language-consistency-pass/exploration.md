## Exploration: Language Consistency Pass

### Current State

The site follows an implicit rule established in a previous audit: **English for brand/technical terms** (like "Architect / AI Engineer", case study titles, technology names), **Spanish for everything else** (descriptive copy, navigation, CTAs, body text). The `<html lang="es">` declaration confirms Spanish as the primary language.

The codebase is small — 6 pages, 4 data files, 3 components — making a full catalog feasible.

### Rule Reference

| Category | Language | Example |
|----------|----------|---------|
| Brand/title/role | EN | "Architect / AI Engineer" |
| Technical terms | EN | "WhatsApp", "workflows", "n8n", "handoff" |
| Navigation | ES | "Casos reales", "Contacto" |
| Page titles | ES | "Credenciales", "Perfil", "Contacto" |
| Descriptive copy | ES | Body text, taglines, intros |
| CTAs | ES | "Ver casos reales", "Contactar con contexto" |
| Technology names | EN | "Next.js", "TypeScript", "React", "CSS" |
| Social brand names | EN | "GitHub", "LinkedIn", "Instagram" |

---

### Full Catalog

---

#### 1. `src/app/layout.tsx`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| `<html lang="es">` | ES | ✅ | Correct |
| "Juan Fontalvo — Architect / AI Engineer" (title default) | EN | ✅ | Brand/role |
| "%s \| Juan Fontalvo" (title template) | template | ✅ | Template pattern |
| "Consultoría en arquitectura de software, automatización con IA y workflows operativos con prueba real antes del contacto." (description) | ES + EN | ⚠️ | "workflows" is EN embedded in ES |
| `locale: "es_CO"` | ES | ✅ | Correct |

**Inconsistencies**: Minor — "workflows" in ES description.

---

#### 2. `src/app/page.tsx` (Home)

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Juan Fontalvo — Architect / AI Engineer" (metadata title) | EN | ✅ | Brand/role |
| "Consultoría en arquitectura de software y automatización con IA basada en casos reales." (metadata description) | ES | ✅ | |
| "Arquitectura de software + IA aplicada" (eyebrow) | ES | ✅ | |
| "Juan Fontalvo" (h1) | neutral | ✅ | Name |
| "Architect / AI Engineer" (h2) | EN | ✅ | Brand/role |
| "Diseño sistemas para convertir conversaciones, soporte y memoria de agentes en workflows operativos que un equipo puede auditar y escalar." (tagline) | ES + EN | ⚠️ | "workflows" is EN embedded in ES |
| "Casos de prueba principales" (aria-label) | ES | ✅ | |
| "Ver casos reales" (CTA) | ES | ✅ | |
| "Hablar después de ver prueba" (CTA) | ES | ✅ | |

**Inconsistencies**: Minor — "workflows" in ES descriptive text.

---

#### 3. `src/app/portafolio/page.tsx` (Portfolio)

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Casos reales de automatización e IA" (metadata title) | ES | ✅ | |
| "Tres casos de prueba sobre WhatsApp, soporte con handoff humano y memoria persistente para agentes." (metadata description) | ES + EN | ⚠️ | "handoff" is EN in ES sentence |
| "Prueba antes de contacto" (eyebrow) | ES | ✅ | |
| "Casos reales" (h1) | ES | ✅ | |
| "Un resumen conservador de sistemas de automatización e IA aplicados a operaciones reales." (intro) | ES | ✅ | |
| **Notice section** | | | |
| "Prueba incompleta" (h2) | ES | ✅ | |
| "Falta configurar parte del set flagship..." (text) | ES + EN | ❌ | "set flagship" — both words EN in ES sentence |
| **Hardcoded labels** | | | |
| "Caso 1/2/3" | ES | ✅ | |
| "Problema" / "Solución" / "Resultados" (section headings) | ES | ✅ | |
| "Stack del caso" (aria-label) | ES | ✅ | |
| **Case study: "WhatsApp lead intake and qualification"** | | | |
| title | EN | ✅ | Case study titles = brand/technical |
| audience | EN | ❌ | Descriptive copy should be ES |
| problem | EN | ❌ | Descriptive copy should be ES |
| solution | EN | ❌ | Descriptive copy should be ES |
| outcomes (3 items) | EN | ❌ | Descriptive copy should be ES |
| evidenceNote | EN | ❌ | Descriptive copy should be ES |
| stack items | EN | ✅ | Technical terms |
| metadataLabel: "Automatización" | ES | ✅ | |
| **Case study: "Support triage with human handoff"** | | | |
| title | EN | ✅ | |
| audience | EN | ❌ | |
| problem | EN | ❌ | |
| solution | EN | ❌ | |
| outcomes (3 items) | EN | ❌ | |
| evidenceNote | EN | ❌ | |
| stack items | EN | ✅ | |
| metadataLabel: *(none)* | — | — | |
| **Case study: "Persistent memory for agents"** | | | |
| title | EN | ✅ | |
| audience | EN | ❌ | |
| problem | EN | ❌ | |
| solution | EN | ❌ | |
| outcomes (3 items) | EN | ❌ | |
| evidenceNote | EN | ❌ | |
| stack items | EN | ✅ | |
| metadataLabel: "IA Aplicada" | ES | ✅ | |
| **Next step section** | | | |
| "Si estos problemas se parecen a tu operación, el siguiente paso es una conversación calificada." | ES | ✅ | |
| "Contactar con contexto" (CTA) | ES | ✅ | |

**Inconsistencies**: **MAJOR** — All case study body content (audience, problem, solution, outcomes, evidenceNote) is in English but should be Spanish per the rule. Also "set flagship" is English in Spanish sentence.

---

#### 4. `src/app/curriculum/page.tsx` (Curriculum)

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Credenciales" (metadata title) | ES | ✅ | |
| "Credenciales estratégicas de Juan Fontalvo para arquitectura de automatización, IA aplicada y entrega técnica." (metadata description) | ES | ✅ | |
| h1: "Credenciales" | ES | ✅ | |
| "Base técnica" (subtitle) | ES | ✅ | |
| "Trayectoria operativa" (subtitle) | ES | ✅ | |
| "Capacidades aplicadas" (subtitle) | ES | ✅ | |
| "Evidencia formativa" (subtitle) | ES | ✅ | |
| **Education** | | | |
| "Desarrollo web moderno" (title) | ES | ✅ | |
| "Fundamento técnico para construir interfaces, integrar servicios y sostener automatizaciones con criterios de mantenibilidad." (description) | ES | ✅ | |
| **Experience** | | | |
| "Implementación y soporte de soluciones informáticas" (title) | ES | ✅ | |
| "Trabajo directo con necesidades de clientes..." (description) | ES | ✅ | |
| "Continuidad técnica para usuarios finales" (title) | ES | ✅ | |
| "Diagnóstico y resolución de problemas técnicos..." (description) | ES | ✅ | |
| **Capability groups** | | | |
| "Automatización con IA" (title) | ES | ✅ | |
| Evidence items | ES | ✅ | |
| Tools: "Agentes IA", "WhatsApp workflows", "Memoria persistente" | ES + EN | ⚠️ | "WhatsApp workflows" is EN in otherwise ES context |
| "Arquitectura de software" (title) | ES | ✅ | |
| Evidence items | ES | ✅ | |
| Tools: "Next.js", "TypeScript", "Arquitectura modular" | EN + ES | ✅ | Technical terms |
| "Workflows operativos" (title) | ES + EN | ⚠️ | Title uses EN "workflows" + ES "operativos" |
| Evidence items | ES | ✅ | |
| Tools: "n8n", "CRM ligero", "Integraciones API" | EN + ES | ⚠️ | "CRM ligero" — EN acronym + ES adjective |
| "Entrega técnica" (title) | ES | ✅ | |
| Evidence items | ES | ✅ | |
| Tools: "React", "CSS", "Vercel" | EN | ✅ | |
| **Certificates** | | | |
| "Master en PHP, SQL, POO, MVC, +" | ES + EN | ✅ | Technical terms |
| "Master en maquetación Web avanzada" | ES + EN | ✅ | |
| "ID Verificación: {id}" | ES | ✅ | |

**Inconsistencies**: Minor — "Workflows operativos" mixes EN+ES in a section title. Tools list mixes EN acronyms with ES adjectives ("CRM ligero").

---

#### 5. `src/app/contacto/page.tsx` (Contact)

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Contacto" (metadata title) | ES | ✅ | |
| "Contacto calificado para consultas de automatización con IA y arquitectura de software." (metadata description) | ES | ✅ | |
| h1: "Contacto" | ES | ✅ | |
| "Opción principal" / "Canal secundario" (x3) | ES | ✅ | |
| "Ubicación" | ES | ✅ | |
| "Consulta calificada" (section title) | ES | ✅ | |
| Intro paragraph | ES | ✅ | "bot" is EN-derived but universally accepted |
| Inquiry steps (3) | ES | ✅ | |
| "Abrir WhatsApp de ventas" (CTA) | ES | ✅ | |
| "Revisar casos antes" (CTA) | ES | ✅ | |
| Fine print | ES | ✅ | |

**Inconsistencies**: None found — this page is fully consistent.

---

#### 6. `src/app/sobre-mi/page.tsx` (About)

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Perfil" (metadata title) | ES | ✅ | |
| "Perfil profesional de Juan Fontalvo para arquitectura de automatización, IA aplicada y mejora operativa." (metadata description) | ES | ✅ | |
| h1: "Perfil" | ES | ✅ | |
| "Arquitectura de automatización e IA aplicada" (eyebrow) | ES | ✅ | |
| Headline | ES | ✅ | |
| Bio (from personal.ts) — see data file section | ES + EN | ✅ | Per rule, "AI Engineer", "handoff" are technical terms kept EN |
| Summary paragraph | ES | ✅ | |
| "Ver casos reales primero" (CTA) | ES | ✅ | |
| "Conversar con contexto" (CTA) | ES | ✅ | |
| **Method section** | | | |
| "Cómo resuelvo problemas" (title) | ES | ✅ | |
| 3 method steps | ES | ✅ | "handoff" appears as EN in step 2 description — technical term |
| **Capabilities section** | | | |
| "Frentes estratégicos donde puedo intervenir" (title) | ES | ✅ | |
| "Arquitectura de automatización" (capability title) | ES | ✅ | |
| Description | ES | ✅ | |
| "Intake y calificación por WhatsApp" (capability title) | ES + EN | ⚠️ | "Intake" is EN in ES title |
| Description | ES | ✅ | |
| "Soporte con handoff humano" (capability title) | ES + EN | ⚠️ | "handoff" is EN in ES title |
| Description | ES | ✅ | |
| "Memoria persistente para agentes" (capability title) | ES | ✅ | |
| Description | ES | ✅ | |
| **Principles section** | | | |
| "Principios de trabajo" (title) | ES | ✅ | |
| 3 principles | ES | ✅ | |
| **Trust boundaries** | | | |
| "Cómo manejo la confianza" (title) | ES | ✅ | |
| 3 trust items | ES | ✅ | |

**Inconsistencies**: Minor — "Intake" and "handoff" are English words in Spanish capability titles. All body content is in Spanish.

---

#### 7. `src/app/blog/page.tsx` (Blog)

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Blog" (metadata title) | EN | ⚠️ | Borrowed word, universally accepted |
| "Notas públicas de arquitectura y automatización de Juan Fontalvo." (metadata description) | ES | ✅ | |
| h1: "Blog" | EN | ⚠️ | Same as above |
| "Archivo editorial en revisión. Las entradas se muestran como temas pendientes de publicación para evitar enlaces a páginas vacías." (intro) | ES | ✅ | |
| Category: "Desarrollo" | ES | ✅ | |
| "Como aprender a programar en 2023" (article 1 title) | ES | ❌ | Missing accent: should be "Cómo" |
| "Como hacer animaciones en CSS" (article 2 title) | ES | ❌ | Missing accent: should be "Cómo" |
| "Cómo usar el LocalStorage en JS" (article 3 title) | ES + EN | ✅ | Accent correct; "LocalStorage" and "JS" are technical terms |
| "Como maquetar una web desde cero" (article 4 title) | ES | ❌ | Missing accent: should be "Cómo" |
| "Entrada pendiente de publicación." (status) | ES | ✅ | |
| `alt`: "imagen de blog: {title}" | ES | ✅ | |

**Inconsistencies**: 3 of 4 article titles are missing the accent in "Cómo" → Spanish spelling error. "Blog" in title/h1 is an English borrowed word (acceptable but inconsistent with the rule that navigation/titles should be ES).

---

#### 8. `src/data/projects.ts`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| **Case study 1: "WhatsApp lead intake and qualification"** | | | |
| title | EN | ✅ | Brand/technical |
| audience | EN | ❌ | **Should be ES** |
| problem | EN | ❌ | **Should be ES** |
| solution | EN | ❌ | **Should be ES** |
| outcomes (3) | EN | ❌ | **Should be ES** |
| evidenceNote | EN | ❌ | **Should be ES** |
| stack | EN | ✅ | Technical terms |
| metadataLabel: "Automatización" | ES | ✅ | |
| **Case study 2: "Support triage with human handoff"** | | | |
| title | EN | ✅ | |
| audience | EN | ❌ | **Should be ES** |
| problem | EN | ❌ | **Should be ES** |
| solution | EN | ❌ | **Should be ES** |
| outcomes (3) | EN | ❌ | **Should be ES** |
| evidenceNote | EN | ❌ | **Should be ES** |
| stack | EN | ✅ | |
| **Case study 3: "Persistent memory for agents"** | | | |
| title | EN | ✅ | |
| audience | EN | ❌ | **Should be ES** |
| problem | EN | ❌ | **Should be ES** |
| solution | EN | ❌ | **Should be ES** |
| outcomes (3) | EN | ❌ | **Should be ES** |
| evidenceNote | EN | ❌ | **Should be ES** |
| stack | EN | ✅ | |
| metadataLabel: "IA Aplicada" | ES | ✅ | |

**Inconsistencies**: **MAJOR** — All 3 case studies have their body content (audience, problem, solution, outcomes, evidenceNote) entirely in English when they should be Spanish per the established rule.

---

#### 9. `src/data/personal.ts`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| name: "Juan Fontalvo" | neutral | ✅ | |
| job: "Architect / AI Engineer" | EN | ✅ | Brand/role |
| bio: "Arquitecto y AI Engineer enfocado en automatización operativa, flujos de WhatsApp, handoff humano y memoria persistente para equipos que necesitan convertir procesos reales en sistemas confiables." | ES + EN | ✅ | Per rule, technical terms stay EN: "AI Engineer", "WhatsApp", "handoff" |
| country/city | ES | ✅ | |
| primarySalesContact.label: "WhatsApp de ventas" | ES + EN | ✅ | |
| primarySalesContact.message | ES | ✅ | |

**Inconsistencies**: None — this file follows the rule as established.

---

#### 10. `src/data/experience.ts`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Desarrollo web moderno" (education title) | ES | ✅ | |
| Education description | ES | ✅ | |
| Experience titles (2) | ES | ✅ | |
| Experience descriptions (2) | ES | ✅ | |
| "Master en PHP, SQL, POO, MVC, +" (certificate) | ES + EN | ✅ | Technical acronyms |
| "Master en maquetación Web avanzada" (certificate) | ES + EN | ✅ | "Web" is EN |

**Inconsistencies**: None significant.

---

#### 11. `src/data/skills.ts`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Automatización con IA" (capability title) | ES | ✅ | |
| Evidence items | ES | ✅ | |
| Tools: mix of EN and ES | mixed | ✅ | Technical terms |
| "Arquitectura de software" (capability title) | ES | ✅ | |
| Evidence items | ES | ✅ | |
| Tools: "Next.js", "TypeScript", "Arquitectura modular" | mixed | ✅ | |
| "Workflows operativos" (capability title) | ES + EN | ⚠️ | Uses EN "workflows" in a title |
| Evidence items | ES | ✅ | |
| Tools: "n8n", "CRM ligero", "Integraciones API" | mixed | ⚠️ | "CRM ligero" mixes EN acronym + ES adj |
| "Entrega técnica" (capability title) | ES | ✅ | |
| Evidence items | ES | ✅ | |
| Tools: "React", "CSS", "Vercel" | EN | ✅ | |

**Inconsistencies**: Minor — "Workflows operativos" could be "Flujos de trabajo operativos" to be fully Spanish.

---

#### 12. `src/components/Sidebar.tsx`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Home" (nav link) | EN | ❌ | **Should be ES** — every other nav link is ES |
| "Casos reales" (nav link) | ES | ✅ | |
| "Perfil" (nav link) | ES | ✅ | |
| "Credenciales" (nav link) | ES | ✅ | |
| "Blog" (nav link) | EN | ⚠️ | Borrowed word, commonly accepted |
| "Contacto" (nav link) | ES | ✅ | |
| "Foto de perfil de Juan Fontalvo" (image alt) | ES | ✅ | |
| personal.name (sidebar name) | neutral | ✅ | |
| personal.job (sidebar role) | EN | ✅ | Brand/role |
| "GitHub" / "LinkedIn" / "Instagram" (social labels) | EN | ✅ | Brand names |
| "GitHub de Juan Fontalvo" / "LinkedIn de Juan Fontalvo" / "Instagram de Juan Fontalvo" (aria-labels) | ES | ✅ | |
| "© {year} Juan Fontalvo" (copyright) | neutral | ✅ | |

**Inconsistencies**: **Moderate** — "Home" is in English while all other navigation items are in Spanish. Navigation should be Spanish per the rule.

---

#### 13. `src/components/ThemeToggle.tsx`

| Text | Language | Matches Rule? | Notes |
|------|----------|---------------|-------|
| "Cambiar a modo claro" / "Cambiar a modo oscuro" (aria-label) | ES | ✅ | |
| "Cambiar tema" (aria-label fallback) | ES | ✅ | |

**Inconsistencies**: None.

---

#### 14. `src/components/ClientScrollReset.tsx`

No user-facing text — only English console.log debug output. Not relevant.

---

### Pattern Summary

| # | Pattern | Severity | Files Affected |
|---|---------|----------|----------------|
| 1 | **Case study body content entirely in English** (audience, problem, solution, outcomes, evidenceNote) | 🔴 **Major** | `src/data/projects.ts`, `src/app/portafolio/page.tsx` |
| 2 | **"Home" nav link in English** while all other nav items are Spanish | 🟡 Moderate | `src/components/Sidebar.tsx` |
| 3 | **Case study titles in English, metadata badges in Spanish** — creates internal page inconsistency | 🟡 Moderate | `src/app/portafolio/page.tsx` |
| 4 | **English technical terms ("workflows", "handoff", "set flagship", "intake") embedded in Spanish sentences** without consistent treatment | 🟢 Minor | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/portafolio/page.tsx`, `src/app/sobre-mi/page.tsx`, `src/data/skills.ts`, `src/data/personal.ts` |
| 5 | **Blog article titles: accent inconsistency** — 3 of 4 use "Como" instead of "Cómo" | 🟢 Minor | `src/app/blog/page.tsx` |
| 6 | **"Blog" as page title and nav label** — English borrowed word where Spanish alternatives exist ("Bitácora", "Notas") | 🟢 Minor | `src/app/blog/page.tsx`, `src/components/Sidebar.tsx` |
| 7 | **"Workflows operativos" as a section title** — mixes EN+ES; "CRM ligero" mixes EN acronym + ES adjective | 🟢 Minor | `src/data/skills.ts` |

### Risk Assessment

- **Risk 1**: Changing case study content from EN→ES is the biggest effort but also the most visible fix. Since these are displayed on the portfolio page as primary content, any change needs careful copywriting to maintain the professional tone.
- **Risk 2**: The "Home" → "Inicio" nav change is trivial but affects the sidebar component.
- **Risk 3**: Technical terms like "workflows" vs "flujos de trabajo" need a consistent glossary decision — either establish a single term and use it everywhere, or accept technical jargon mixing as intentional.

### Ready for Proposal
Yes — the state is fully cataloged. Six inconsistency patterns identified, with the case study body content being the dominant issue.
