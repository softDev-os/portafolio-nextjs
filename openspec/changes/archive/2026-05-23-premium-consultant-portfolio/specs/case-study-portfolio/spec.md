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
