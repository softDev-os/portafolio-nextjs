# profile-credentials-ia Specification

## Purpose

Define a route-preserving information architecture where `/sobre-mi` is `Perfil` and `/curriculum` is `Credenciales`, aligned with premium consultant positioning.

## Requirements

### Requirement: Route-Preserving Semantic Reframe

The system MUST keep existing identity routes while reframing their rendered semantics to `Perfil` and `Credenciales`.

#### Scenario: Perfil semantics on existing `/sobre-mi` route

- GIVEN a visitor opens `/sobre-mi`
- WHEN the page renders title, heading, and introductory copy
- THEN the page presents a strategic consultant profile (`Perfil`)
- AND it avoids personal-CV framing

#### Scenario: Credenciales semantics on existing `/curriculum` route

- GIVEN a visitor opens `/curriculum`
- WHEN the page renders title, heading, and introductory copy
- THEN the page presents supporting authority credentials (`Credenciales`)
- AND it avoids job-application CV framing

### Requirement: Identity Navigation and CTA Contract

The system MUST expose `Perfil` and `Credenciales` labels in identity navigation and MUST NOT expose a downloadable CV action.

#### Scenario: Sidebar labels follow new IA

- GIVEN a visitor reads the global sidebar identity links
- WHEN identity entries are rendered
- THEN labels are shown as `Perfil` and `Credenciales`

#### Scenario: Download CV behavior is removed

- GIVEN a visitor reviews sidebar identity actions
- WHEN actionable links and buttons are displayed
- THEN no downloadable CV CTA is available

### Requirement: Evidence-Safe Credential Presentation

The system SHALL present credentials with conservative, verifiable signals and SHALL NOT render skill percentages, placeholder certificate IDs, or raw personal-data fields used as CV fillers.

#### Scenario: Skills avoid fake precision

- GIVEN credential and capability sections are rendered
- WHEN skills are displayed
- THEN skills appear as evidence-safe capability groups
- AND no percentage-based proficiency UI is shown

#### Scenario: Placeholder and raw-personal fillers are excluded

- GIVEN profile and credentials pages are rendered
- WHEN certificates and personal-information blocks are displayed
- THEN placeholder verification IDs are omitted
- AND age/municipality-style raw personal fields are omitted
