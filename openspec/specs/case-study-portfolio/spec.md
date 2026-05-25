# case-study-portfolio Specification

## Purpose

Define the case-study content contract and portfolio behavior that prove real consulting outcomes before contact.

## Requirements

### Requirement: Flagship Case Study Set

The system MUST present exactly three flagship case studies as first-class portfolio proof: WhatsApp lead intake and qualification, support with human handoff, and persistent memory for agents.

#### Scenario: Portfolio shows required flagship studies first

- GIVEN a visitor opens the portfolio page
- WHEN flagship cards/listings render
- THEN all three required case studies are present
- AND they appear before non-flagship or generic projects

#### Scenario: Missing flagship entry is treated as invalid content state

- GIVEN one required flagship case study is absent from configured content
- WHEN the portfolio page renders
- THEN the page MUST NOT claim a complete flagship proof set

### Requirement: Evidence-Oriented Case Study Structure

Each flagship case study MUST include problem context, implemented solution summary, and evidence-oriented outcomes language that is conservative and verifiable.

#### Scenario: Case study contains minimum proof sections

- GIVEN a visitor opens a flagship case study summary
- WHEN details are rendered
- THEN they can read problem, solution, and outcome sections
- AND outcomes avoid exaggerated or unverifiable wording

#### Scenario: Evidence labeling is explicit when needed

- GIVEN an outcome cannot be quantified publicly
- WHEN the outcome text is displayed
- THEN it is framed qualitatively with clear conservative wording

### Requirement: Credible Funnel Continuation

The system SHOULD provide a clear next-step CTA from case-study context to qualified contact without interrupting proof consumption.

#### Scenario: Contact CTA appears after proof context

- GIVEN a visitor is reading case-study content
- WHEN a conversion CTA is shown
- THEN the CTA is framed as a qualified business inquiry next step

#### Scenario: Dead-end navigation is prevented for proof routes

- GIVEN a visitor navigates through proof-first routes
- WHEN they use surfaced navigation links
- THEN links MUST resolve to valid, non-empty pages for this funnel

### Requirement: Case-Card Section Scan Anchors

Case study cards MUST display visible section labels for Problema, Solución, and Resultados that enable rapid visual scanning. These labels SHALL be visually distinct from body text via typographic treatment (uppercase, color, weight) and MUST NOT expand the base card height beyond their natural flow.

#### Scenario: Section labels are visually distinct

- GIVEN a visitor opens `/portafolio` on any viewport width
- WHEN a case card renders with `.portfolio__case-grid` sections
- THEN each `<h3>` heading inside `.portfolio__case-grid` SHALL use uppercase, a distinct color, and heavier weight than body paragraph text
- AND a label (e.g., "Problema", "Solución", "Resultados") is immediately readable without reading surrounding content

#### Scenario: Labels do not expand card height artificially

- GIVEN the same card rendering
- WHEN section headings and content render
- THEN no heading or section wrapper applies a fixed `min-height` or empty padding that adds height beyond content-driven flow

### Requirement: Case-Card Spacing Rhythm

The `.portfolio__case-list` MUST apply a consistent gap between case cards across all breakpoints. The gap SHALL be controlled by a single `gap` property on the grid container, not by individual card margins.

#### Scenario: Consistent inter-card gap on desktop

- GIVEN a visitor opens `/portafolio` on a viewport ≥ 1024px wide
- WHEN multiple case cards render
- THEN each `.portfolio__case-card` has equal vertical spacing to its adjacent cards
- AND the gap is driven by `.portfolio__case-list` `gap`, not by `margin-top` or `margin-bottom` on individual cards

#### Scenario: Vertical stacking on narrow viewports

- GIVEN a viewport ≤ 767px wide
- WHEN the case grid stacks to a single column
- THEN `.portfolio__case-card` elements maintain the same gap value driven by the container
- AND the gap provides adequate breathing room between cards

### Requirement: Evidence Metadata Labels

Case studies MAY display optional metadata labels (e.g., proof-type indicators such as "Automatización" or "IA Aplicada") as lightweight inline visual badges. When present, they MUST render without adding card height beyond the badge's own inline flow. When absent, they MUST cause no layout shift.

#### Scenario: Metadata label renders inline

- GIVEN a case study with an optional metadata label present in the data model
- WHEN the card renders
- THEN the label appears as an inline badge (e.g., a small rounded pill)
- AND it flows naturally within the card without fixed positioning or extra container padding

#### Scenario: Absent metadata causes no shift

- GIVEN a case study with no optional metadata label
- WHEN the card renders
- THEN no empty placeholder or hidden element occupies space for the absent label
- AND the adjacent content rendering is identical to a card that has no label data

### Requirement: Case Study Body Fields Are Spanish

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

### Requirement: Technical English Terms Preserved in Spanish Body

Embedded technical English terms — per the glossary in the Language Convention spec R3 and the permitted categories in R2 — SHALL remain in English when they appear inside Spanish body text.

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

### Requirement: Spanish Translations Maintain Conservative Evidence Tone

The Spanish translations of case study body fields SHALL match the evidence-oriented, conservative tone required by the Evidence-Oriented Case Study Structure requirement.

#### Scenario: Outcomes language is conservative in Spanish

- GIVEN a visitor reads a case study outcome that cannot be quantified publicly
- WHEN the outcome renders in Spanish
- THEN it uses conservative, qualitative wording
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
- AND it does not soften the evidence boundary

### Requirement: Case Study Titles and Stack Remain Unchanged

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

### Requirement: Translation Quality — Human Spanish, Not Machine

The Spanish translations SHALL read as human-quality, natural Spanish that a fluent Spanish-speaking professional would write. They SHALL NOT exhibit machine-translation artifacts.

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
