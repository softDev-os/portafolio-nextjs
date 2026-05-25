# Delta Spec: Content Remediation — Nav, Accents, Glossary Fixes

**Change:** language-consistency-pass
**Parent Specs:** consultant-positioning, profile-credentials-ia
**Status:** Draft

## Purpose

Fix three categories of language inconsistency that do not require content creation (translations), only remediation: (1) the "Home" navigation label must be "Inicio", (2) three blog article titles must fix the missing accent in "Como" → "Cómo", and (3) English terms embedded in Spanish sentences across all affected files must follow the resolved glossary from `spec-language-convention.md`.

## Requirements

### R1: Navigation Label — "Home" → "Inicio"

The global sidebar navigation MUST render "Inicio" instead of "Home" for the homepage link entry.

#### Scenario: Sidebar nav shows "Inicio"

- GIVEN a visitor opens any page
- WHEN the sidebar navigation renders
- THEN the first navigation item (homepage) displays "Inicio"
- AND it does not display "Home"

#### Scenario: Nav item links to `/`

- GIVEN a visitor clicks the "Inicio" navigation item
- WHEN the link is activated
- THEN the browser navigates to the root path (`/`)
- AND the behavior is identical to the previous "Home" link

#### Scenario: Language consistency with other nav items

- GIVEN a visitor reads all navigation items
- WHEN the items are displayed
- THEN every item is in Spanish (including "Inicio")
- AND no navigation item uses an English label

### R2: Blog Article Titles — Accent Fix "Como" → "Cómo"

The three blog article titles that currently use unaccented "Como" MUST use accented "Cómo".

#### Scenario: Article 1 title accent is fixed

- GIVEN a visitor opens `/blog`
- WHEN the first article title renders
- THEN it displays "Cómo aprender a programar en 2023"
- AND it does not display "Como aprender a programar en 2023"

#### Scenario: Article 2 title accent is fixed

- GIVEN a visitor opens `/blog`
- WHEN the second article title renders
- THEN it displays "Cómo hacer animaciones en CSS"
- AND it does not display "Como hacer animaciones en CSS"

#### Scenario: Article 3 title accent is validated as already correct

- GIVEN a visitor opens `/blog`
- WHEN the third article title renders
- THEN it continues to display "Cómo usar el LocalStorage en JS"
- AND the existing correct accent is not changed

#### Scenario: Article 4 title accent is fixed

- GIVEN a visitor opens `/blog`
- WHEN the fourth article title renders
- THEN it displays "Cómo maquetar una web desde cero"
- AND it does not display "Como maquetar una web desde cero"

### R3: Glossary-Driven Fix — EN-in-ES Terms

All English terms embedded in Spanish sentences across the affected files SHALL follow the resolved glossary from `spec-language-convention.md` R3. Specifically:

- "workflows" → keep as "workflows" (not "flujos de trabajo")
- "handoff" → keep as "handoff" (not "derivación" / "transferencia")
- "intake" → keep as "intake" (not "captura" / "recepción")
- "flagship" → keep as "flagship" (not "casos principales")
- "set flagship" → keep as "set flagship"

#### Scenario: "workflows" stays English in layout metadata

- GIVEN `src/app/layout.tsx` renders the SEO description
- WHEN the description contains "workflows operativos"
- THEN "workflows" is in English
- AND it is not replaced with "flujos de trabajo"

#### Scenario: "workflows" stays English in homepage tagline

- GIVEN `src/app/page.tsx` renders the hero tagline
- WHEN the tagline mentions "workflows operativos"
- THEN "workflows" is in English

#### Scenario: "handoff" stays English in portfolio metadata

- GIVEN `src/app/portafolio/page.tsx` renders the metadata description
- WHEN the description mentions "handoff humano"
- THEN "handoff" is in English

#### Scenario: "set flagship" is replaced or contextualized

- GIVEN `src/app/portafolio/page.tsx` renders the incomplete-proof notice section
- WHEN the text originally read "Falta configurar parte del set flagship..."
- THEN the phrase is reviewed for glossary compliance
- AND if the viewer-facing version keeps "set flagship", it is in English per glossary

#### Scenario: "intake" stays English in sobre-mi capability title

- GIVEN `src/app/sobre-mi/page.tsx` renders capability section titles
- WHEN the title "Intake y calificación por WhatsApp" appears
- THEN "Intake" keeps its English form (capitalized as it starts the title)

#### Scenario: "Workflows operativos" title is glossary-compliant

- GIVEN `src/data/skills.ts` defines the capability group for operational workflows
- WHEN the group title renders
- THEN it uses "Workflows operativos" (keeps English "workflows")
- AND it does not change to "Flujos de trabajo operativos"

### R4: No Functional Regression

All remediation changes MUST be content-only. Navigation behavior, page routing, data structure, and visual presentation SHALL remain functionally identical after changes.

#### Scenario: Navigation routing is unchanged

- GIVEN a visitor clicks any navigation item after remediation
- WHEN the link activates
- THEN the route resolves to the same URL as before the change
- AND no routing behavior is modified

#### Scenario: Data structure is stable

- GIVEN the build process processes all data files after remediation
- WHEN `npm run build` executes
- THEN it completes with zero errors
- AND no TypeScript compilation errors are introduced

#### Scenario: Visual layout is preserved

- GIVEN a visitor views any affected page after remediation
- WHEN the page renders
- THEN the layout, spacing, and visual presentation are identical to the pre-remediation state
- AND only text content differs (language fixes)

## Relationship to Other Specs

- **spec-language-convention.md** — This spec's R3 depends on the glossary defined in `spec-language-convention.md` R3. All EN-in-ES fixes follow that glossary.
- **spec-case-study-language.md** — Independent. This spec handles the smaller remediation fixes; the case study body translation is handled separately.
- **profile-credentials-ia** (Requirement: Route-Preserving Semantic Reframe) — The "Home" → "Inicio" nav fix aligns with this spec's Spanish-first navigation semantics.

## Affected Files

| File | Change | Spec Reference |
|------|--------|----------------|
| `src/components/Sidebar.tsx` | "Home" → "Inicio" | R1 |
| `src/app/blog/page.tsx` | 3× "Como" → "Cómo" | R2 |
| `src/app/layout.tsx` | Glossary: "workflows" verified | R3 |
| `src/app/page.tsx` | Glossary: "workflows" verified | R3 |
| `src/app/portafolio/page.tsx` | Glossary: "handoff", "set flagship" | R3 |
| `src/app/sobre-mi/page.tsx` | Glossary: "intake", "handoff" | R3 |
| `src/data/skills.ts` | Glossary: "Workflows operativos" | R3 |

## Out of Scope

- Pattern 6 ("Blog" → "Bitácora"): Deferred. "Blog" accepted as a borrowed word.
- Pattern 7 ("CRM ligero"): Deferred. "CRM" is a permitted acronym; the mixed label is out of scope for this change.
- Case study body translations: Covered by `spec-case-study-language.md`.
