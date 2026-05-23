# Delta for consultant-positioning

## MODIFIED Requirements

### Requirement: Premium Role Positioning

The system MUST present the primary role as Architect / AI Engineer consultant for companies and service clients across homepage and global identity surfaces, including `Perfil` and `Credenciales` content.
(Previously: Positioning consistency was required on homepage/key entry points but not explicitly extended to identity pages.)

#### Scenario: Role appears consistently on key entry points

- GIVEN a visitor opens the homepage
- WHEN primary hero and profile identity render
- THEN the page shows consultant-oriented role positioning
- AND it avoids generic “web developer portfolio” framing

#### Scenario: Metadata aligns with consultant positioning

- GIVEN a visitor previews the site in search/social snippet contexts
- WHEN metadata title and description are generated
- THEN they reflect Architect / AI Engineer consulting outcomes

#### Scenario: Identity routes keep consultant framing

- GIVEN a visitor opens `/sobre-mi` or `/curriculum`
- WHEN identity page headings and role narrative render
- THEN both routes keep consultant-oriented framing
- AND they avoid candidate/job-seeker language

### Requirement: Proof-First Conversion Order

The system MUST prioritize verified proof review before contact actions in primary navigation and above-the-fold CTAs, and identity surfaces MUST NOT introduce CV-download or similar shortcuts that bypass proof-first flow.
(Previously: Proof-first order covered homepage/navigation actions but did not explicitly prohibit CV-download shortcuts on identity surfaces.)

#### Scenario: Primary CTA routes to proof

- GIVEN a visitor lands on homepage
- WHEN they use the primary conversion CTA
- THEN the CTA sends them to flagship case studies or portfolio proof

#### Scenario: Contact remains secondary

- GIVEN a visitor has not reviewed proof content yet
- WHEN they browse primary homepage/navigation actions
- THEN contact is shown as a secondary next step, not the primary action

#### Scenario: Identity pages do not bypass proof-first order

- GIVEN a visitor navigates identity routes before reviewing proof
- WHEN identity-page actions are rendered
- THEN no CV download action is offered as a primary shortcut
- AND proof-first navigation remains the dominant conversion path
