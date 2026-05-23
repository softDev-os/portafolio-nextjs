# consultant-positioning Specification

## Purpose

Define premium consultant messaging and conversion boundaries so the site presents verified credibility before lead capture.

## Requirements

### Requirement: Premium Role Positioning

The system MUST present the primary role as Architect / AI Engineer consultant for companies and service clients across homepage and global identity surfaces.

#### Scenario: Role appears consistently on key entry points

- GIVEN a visitor opens the homepage
- WHEN primary hero and profile identity render
- THEN the page shows consultant-oriented role positioning
- AND it avoids generic “web developer portfolio” framing

#### Scenario: Metadata aligns with consultant positioning

- GIVEN a visitor previews the site in search/social snippet contexts
- WHEN metadata title and description are generated
- THEN they reflect Architect / AI Engineer consulting outcomes

### Requirement: Proof-First Conversion Order

The system MUST prioritize verified proof review before contact actions in primary navigation and above-the-fold CTAs.

#### Scenario: Primary CTA routes to proof

- GIVEN a visitor lands on homepage
- WHEN they use the primary conversion CTA
- THEN the CTA sends them to flagship case studies or portfolio proof

#### Scenario: Contact remains secondary

- GIVEN a visitor has not reviewed proof content yet
- WHEN they browse primary homepage/navigation actions
- THEN contact is shown as a secondary next step, not the primary action

### Requirement: Claim Safety and Trust Boundaries

The system SHALL only present central claims backed by verified evidence and SHALL NOT make voice automation or reservation systems central claims for this change.

#### Scenario: Unsupported central claims are excluded

- GIVEN site credibility sections are rendered
- WHEN claim blocks are displayed
- THEN unverifiable testimonials/counters/pricing are removed or reduced
- AND unsupported central claims are not presented as delivered outcomes

#### Scenario: Flagship narrative scope is enforced

- GIVEN flagship case-study links are highlighted
- WHEN users review the promoted solution themes
- THEN emphasis stays on WhatsApp intake, support handoff, and persistent memory
