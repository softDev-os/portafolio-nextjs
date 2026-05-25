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

The system MUST expose `Perfil` and `Credenciales` labels in identity navigation and MUST NOT expose a downloadable CV action. The homepage navigation link MUST render as "Inicio".

#### Scenario: Sidebar labels follow new IA

- GIVEN a visitor reads the global sidebar identity links
- WHEN identity entries are rendered
- THEN labels are shown as `Perfil` and `Credenciales`

#### Scenario: Download CV behavior is removed

- GIVEN a visitor reviews sidebar identity actions
- WHEN actionable links and buttons are displayed
- THEN no downloadable CV CTA is available

#### Scenario: Homepage nav label is "Inicio"

- GIVEN a visitor opens any page
- WHEN the sidebar navigation renders
- THEN the first navigation item (homepage) displays "Inicio"
- AND it does not display "Home"

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

### Requirement: Narrow-Viewport Timeline Stacking

On viewports ≤ 480px wide, the credentials timeline MUST render the year/company header and the title/description content as a vertical stack, not a left-right horizontal split. The existing divider line SHALL remain visible as a left-aligned visual guide.

#### Scenario: Timeline stacks vertically on narrow mobile

- GIVEN a visitor opens `/curriculum` on a viewport ≤ 480px wide
- WHEN timeline items render
- THEN each `.timelines__timeline` element arranges `.timeline__header` above `.timeline__description-container`
- AND neither column uses `flex-basis` or fixed widths that create narrow text columns

#### Scenario: Timeline divider remains accessible

- GIVEN the same narrow viewport
- WHEN the timeline renders
- THEN the `.timeline__divider` vertical line SHALL be visible as a left-aligned guide
- AND it SHALL NOT overlap or clip description text

### Requirement: Card Spacing Rhythm

Capability cards and certificate cards MUST use a consistent gap spacing across all breakpoints. No per-card margin overrides SHOULD exist; spacing SHALL be driven by a single gap or grid-gap property per container.

#### Scenario: Consistent card gaps at desktop

- GIVEN a visitor opens `/curriculum` on a viewport ≥ 1024px wide
- WHEN capability cards and certificate sections render
- THEN `.curriculum__capabilities` and `.certificates__container` each define a single `gap` value
- AND adjacent card borders maintain equal spacing

#### Scenario: Consistent card gaps on narrow viewport

- GIVEN a visitor opens `/curriculum` on a viewport ≤ 767px wide
- WHEN the same containers render
- THEN the gap value adjusts responsively but remains uniform within each container

### Requirement: Certificate Card Visual Grouping

Certificate cards MUST present a visually consistent shape: uniform padding, border radius, border color, and logo-to-content alignment across all responsive states.

#### Scenario: Certificates share uniform padding

- GIVEN certificate cards are rendered at any viewport width
- WHEN comparing any two `.certificates__certificate` elements
- THEN they share identical `padding`, `border-radius`, and `border` values
- AND `.certificate__logo` area maintains consistent dimensions per layout row

#### Scenario: Certificate logo handles narrow space

- GIVEN a viewport ≤ 767px wide
- WHEN certificate cards stack vertically
- THEN `.certificate__logo` occupies full card width
- AND the logo image does not overflow or distort its container
