# Delta Spec: Case Study Body Language — Spanish

**Change:** language-consistency-pass
**Parent Spec:** case-study-portfolio
**Status:** Draft

## Purpose

Require all body/descriptive fields of the three flagship case studies — `audience`, `problem`, `solution`, `outcomes` (3 items each), and `evidenceNote` — to be rendered in human-quality Spanish, while preserving technical English terms per the glossary defined in `spec-language-convention.md`. This brings the case study data model in line with the site-wide language rule (`<html lang="es">`).

## Requirements

### R1: Case Study Body Fields Are Spanish

All descriptive fields in each flagship case study object in `src/data/projects.ts` — `audience`, `problem`, `solution`, `outcomes[]`, and `evidenceNote` — MUST contain Spanish text.

#### Scenario: WhatsApp lead intake and qualification — body is Spanish

- GIVEN the case study "WhatsApp lead intake and qualification" is loaded from `src/data/projects.ts`
- WHEN its `audience`, `problem`, `solution`, `outcomes`, and `evidenceNote` fields are read
- THEN each field value is in Spanish
- AND the content matches the field's semantic purpose (audience describes who it serves, problem describes the operational issue, solution describes the implemented approach, outcomes describe measurable results, evidenceNote describes evidence caveats)

#### Scenario: Support triage with human handoff — body is Spanish

- GIVEN the case study "Support triage with human handoff" is loaded from `src/data/projects.ts`
- WHEN its body fields are accessed
- THEN every body field is in Spanish

#### Scenario: Persistent memory for agents — body is Spanish

- GIVEN the case study "Persistent memory for agents" is loaded from `src/data/projects.ts`
- WHEN its body fields are accessed
- THEN every body field is in Spanish

### R2: Technical English Terms Preserved in Spanish Body

Embedded technical English terms — per the glossary in `spec-language-convention.md` R3 and the permitted categories in R2 — SHALL remain in English when they appear inside Spanish body text.

#### Scenario: Glossary terms survive translation

- GIVEN a case study field is translated to Spanish
- WHEN the original English text contained a glossary term (e.g., "workflows", "handoff", "intake", "flagship")
- THEN the Spanish translation retains the English glossary term unchanged
- AND the term is not translated to Spanish

#### Scenario: Technology names remain in English

- GIVEN a case study field contains technology names (e.g., "n8n", "WhatsApp", "API")
- WHEN the field is translated to Spanish
- THEN the technology names remain in English with original casing

#### Scenario: Acronyms are not expanded

- GIVEN a case study field contains standard acronyms (e.g., "AI", "CRM", "API")
- WHEN the field is translated to Spanish
- THEN the acronym remains in its standard English form
- AND it is not expanded to its full Spanish or English meaning

### R3: Spanish Translations Maintain Conservative Evidence Tone

The Spanish translations of case study body fields SHALL match the evidence-oriented, conservative tone required by the parent spec `case-study-portfolio` (Evidence-Oriented Case Study Structure requirement).

#### Scenario: Outcomes language is conservative in Spanish

- GIVEN a visitor reads a case study outcome that cannot be quantified publicly
- WHEN the outcome renders in Spanish
- THEN it uses conservative, qualitative wording (matching "conservative wording" requirement from parent spec)
- AND it avoids exaggerated or unverifiable claims in Spanish

#### Scenario: Problem and solution sections avoid marketing language

- GIVEN a visitor reads the problem and solution sections of any case study
- WHEN they render in Spanish
- THEN the text describes operational realities with concrete technical details
- AND it avoids boaster adjectives, superlatives without evidence, or vague marketing claims

#### Scenario: Evidence notes preserve caveat framing

- GIVEN a visitor reads an `evidenceNote` field
- WHEN it renders in Spanish
- THEN it preserves the caveat/qualifier function of the original English
- AND it does not soften the evidence boundary (e.g., still explains why evidence is partial or limited)

### R4: Case Study Titles and Stack Remain Unchanged

Case study `title` fields and `stack` (technology list) fields SHALL NOT be modified. Titles are technical identifiers and remain in English. Stack items are technology names and remain in English.

#### Scenario: Title remains in English

- GIVEN any flagship case study is loaded
- WHEN the `title` field is read
- THEN it is unchanged from its current English form
- AND no translation is applied

#### Scenario: Stack items remain in English

- GIVEN any flagship case study is loaded
- WHEN the `stack` array is read
- THEN each item is in its original English form
- AND no stack items are translated

### R5: Translation Quality — Human Spanis, Not Machine

The Spanish translations SHALL read as human-quality, natural Spanish that a fluent Spanish-speaking professional would write. They SHALL NOT exhibit machine-translation artifacts (e.g., overly literal phrasing, unnatural word order, wrong false-cognate choices).

#### Scenario: Translations are idiomatic

- GIVEN a reviewer reads any case study body field
- WHEN evaluating naturalness
- THEN the phrasing reads as natural Spanish
- AND it avoids calques (direct literal translations from English sentence structure)

#### Scenario: Terminology is consistent across all three case studies

- GIVEN a specific domain concept appears in multiple case studies
- WHEN the concept is translated
- THEN the same Spanish term is used consistently across all case studies
- AND the same glossary English terms are used consistently

## Relationships to Parent Specs

- **case-study-portfolio** (Requirement: Flagship Case Study Set, Evidence-Oriented Case Study Structure): This delta spec adds a language constraint on top of the existing content structure requirements. The body fields MUST still satisfy all parent requirements (problem context, solution summary, conservative outcomes) — the language is changed, not the semantics.
- **spec-language-convention.md** (R1, R2, R3): This spec depends on the language convention rule and glossary defined in the companion delta spec.

## Affected Data Model

File: `src/data/projects.ts`

```typescript
interface CaseStudy {
  // Fields NOT changed (remain English):
  id: string;
  title: string;
  metadataLabel?: string;
  stack: string[];

  // Fields CHANGED: content becomes Spanish:
  audience: string;       // EN → ES
  problem: string;        // EN → ES
  solution: string;       // EN → ES
  outcomes: string[];     // EN → ES (3 items)
  evidenceNote?: string;  // EN → ES
}
```

## Out of Scope

- Visual presentation of case studies (card layout, spacing, section labels "Problema/Solución/Resultados") — already in Spanish per `case-study-portfolio` spec.
- Case study `title` and `stack` — explicitly excluded by R4.
- Non-flagship case studies or future case studies — only the three existing flagship studies are affected.
