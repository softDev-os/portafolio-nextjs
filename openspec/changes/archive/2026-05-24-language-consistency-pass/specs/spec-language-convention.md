# Delta Spec: Language Convention Rule

**Change:** language-consistency-pass
**Parent Specs:** consultant-positioning, case-study-portfolio, profile-credentials-ia
**Status:** Draft

## Purpose

Codify the implicit site-wide language rule discovered during exploration: brand/technical terms stay in English, all other content is in Spanish. Establish a glossary of permitted EN-in-ES terms and a decision procedure for new content, so future authors and reviewers have an unambiguous reference.

## Requirements

### R1: Primary Language Rule

The site SHALL use Spanish as the primary content language for all descriptive, narrative, navigational, and instructional copy, with the exception of explicitly permitted English categories defined in this spec.

#### Scenario: Descriptive copy renders in Spanish

- GIVEN a visitor views any page on the site
- WHEN body text, taglines, intros, descriptions, CTAs, or instructional copy is rendered
- THEN the content is in Spanish
- AND it follows standard Spanish orthography (accents, diéresis, inverted punctuation where applicable)

#### Scenario: Page metadata titles respect primary language

- GIVEN a page renders `<title>` or `meta description`
- WHEN the metadata is primarily descriptive (not a brand/role label)
- THEN it is in Spanish

#### Scenario: Navigation labels are in Spanish

- GIVEN a visitor reads the global navigation
- WHEN any navigation item is rendered
- THEN the label text is in Spanish
- AND it does not use English equivalents where a standard Spanish translation exists

#### Scenario: New content follows the language rule

- GIVEN an author introduces new user-facing text
- WHEN the text is descriptive, instructional, or navigational
- THEN the author MUST write it in Spanish
- AND the author MUST check the glossary (R2) before embedding any English term

### R2: Permitted English Categories

The following categories of content SHALL remain in English even when embedded in otherwise Spanish text:

| Category | Examples | Rationale |
|----------|----------|-----------|
| Brand role/title | "Architect / AI Engineer" | Professional brand identity |
| Case study titles | "WhatsApp lead intake and qualification" | Technical/case identifiers |
| Technology names | "Next.js", "TypeScript", "React", "CSS", "n8n", "Vercel", "SQL" | Proper names of technologies |
| Social/brand names | "GitHub", "LinkedIn", "Instagram", "WhatsApp" | Proper brand names |
| Resolved glossary terms | "workflows", "handoff", "intake", "flagship", "set flagship" | Technical terms accepted as EN loanwords (see R3) |
| Acronyms and abbreviations | "API", "CRM", "AI", "ID" | Standard industry acronyms |

#### Scenario: Brand role renders in English

- GIVEN a visitor views the hero section, sidebar, or any identity surface
- WHEN the primary role label renders
- THEN it shows "Architect / AI Engineer" in English
- AND it does not translate to Spanish equivalents

#### Scenario: Technology names preserve case and language

- GIVEN a visitor reads any page
- WHEN a technology name renders in descriptive Spanish text
- THEN the technology name is in English with original casing
- AND it is not translated (e.g., "Next.js" not "Siguiente.js")

#### Scenario: Case study titles remain in English

- GIVEN a visitor opens the portfolio page
- WHEN case study titles render
- THEN they are in English
- AND they are not translated to Spanish

### R3: Glossary of EN-in-ES Technical Terms

The following English technical terms, when embedded in Spanish sentences, SHALL retain their English form as accepted loanwords for this site:

| Term | Context | Usage Examples |
|------|---------|----------------|
| workflows | Automation/operational context | "workflows operativos", "workflows de WhatsApp" |
| handoff | Support/transfer context | "handoff humano", "soporte con handoff humano" |
| intake | Lead/reception context | "intake y calificación", "intake de leads" |
| flagship | Principal/featured case context | "set flagship", "casos flagship" |
| set flagship | Full expression referring to the three-study set | "set flagship" |

#### Scenario: Glossary terms render consistently across all pages

- GIVEN a visitor reads any page with embedded English technical terms
- WHEN glossary terms appear in Spanish sentences
- THEN each term uses exactly the English form specified in the glossary
- AND no file uses a Spanish translation for these terms

#### Scenario: Glossary terms avoid mixed-language compounds

- GIVEN an author adds content using a glossary term
- WHEN the term combines with a Spanish adjective
- THEN the term stays bare English (e.g., "workflows operativos" NOT "workflows operativos")
- AND the adjective follows Spanish agreement rules

### R4: Accent and Orthography Correctness

All Spanish content SHALL use correct orthography, including required accent marks, diéresis, and inverted punctuation.

#### Scenario: Interrogative pronouns carry accents

- GIVEN a visitor reads any Spanish content
- WHEN the words "cómo", "cuándo", "dónde", "qué", or similar interrogative/exclamatory pronouns appear
- THEN they carry the required acute accent on the stressed vowel
- AND this applies even when used in titles and headings

#### Scenario: Orthography reviewer can validate programmatically

- GIVEN a reviewer audits content for language consistency
- WHEN they scan for common Spanish spelling errors
- THEN they find no instances of "como" where "cómo" is required
- AND no instances of other missing accents in standard Spanish words

### R5: Metadata Badge Language Independence

Case study metadata badges (proof-type labels such as "Automatización" or "IA Aplicada") SHALL be treated as independent content elements whose language is not constrained by the adjacent case study title language. This is a deliberate acceptance of visual mixing (EN title + ES badge).

#### Scenario: EN title + ES badge renders correctly

- GIVEN a case study has an English title and a Spanish metadata badge
- WHEN the card renders on the portfolio page
- THEN both the English title and the Spanish badge are displayed with their respective languages
- AND no attempt is made to align both to the same language

#### Scenario: Badge language is not a defect

- GIVEN a reviewer audits the portfolio page for language consistency
- WHEN they find an English case study title with a Spanish metadata badge
- THEN this is NOT flagged as an inconsistency
- AND it is recognized as an accepted visual mix per this spec

## Relationships to Parent Specs

- **consultant-positioning** (Requirement: Claim Safety and Trust Boundaries, Scenario: Flagship narrative scope is enforced): This spec does not change flagship content — it only changes the language of existing flagship content.
- **case-study-portfolio** (Requirement: Evidence-Oriented Case Study Structure): This spec is referenced by `spec-case-study-language.md` which adds a Spanish-language constraint to the same content structure.
- **profile-credentials-ia** (Requirement: Route-Preserving Semantic Reframe): The navigation label change ("Home" → "Inicio") is handled in `spec-content-remediation.md` and aligns with Spanish-first navigation.

## Out of Scope

- Pattern 6 ("Blog" → "Bitácora"): Deferred. "Blog" is treated as a universally accepted borrowed word.
- Pattern 7 (mixed EN+ES "CRM ligero"): Deferred. Partially addressed by glossary R3 ("CRM" is a permitted acronym).
