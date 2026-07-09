# Private CV Specification

## Purpose

Define a private, redacted CV workflow that produces a locally generated one-page CV without associating sensitive personal resume material with the public portfolio or tracked repository artifacts.

## Requirements

### Requirement: Private Artifact Handling and Git Safety

The system MUST keep private CV source files, drafts, generated HTML, and generated PDF outputs inside the ignored local `.private-cv/` workspace only. The system MUST NOT expose the private CV through public routes, public assets, sitemap entries, robots metadata, navigation links, or portfolio content.

#### Scenario: Private workspace is ignored

- GIVEN private CV source files or generated outputs exist in `.private-cv/`
- WHEN repository status and ignore rules are checked
- THEN `.private-cv/` MUST be reported as ignored
- AND private CV files MUST NOT appear as tracked or untracked public repository files.

#### Scenario: CV is not associated with public portfolio

- GIVEN the private CV workflow is implemented
- WHEN public portfolio routes, navigation, sitemap, robots configuration, and public assets are reviewed
- THEN the private CV MUST NOT be linked, routed, indexed, copied to `public/`, or otherwise presented as part of the public portfolio.

### Requirement: Redacted Planning Artifacts

The system MUST keep OpenSpec and other tracked planning artifacts redacted. Tracked artifacts MUST NOT contain raw phone numbers, exact addresses, age, identification numbers, full private CV text, family reference details, certificate screenshots, or other sensitive values.

#### Scenario: OpenSpec artifact remains safe to track

- GIVEN an OpenSpec artifact describes the private CV workflow
- WHEN the artifact is reviewed for sensitive content
- THEN it MUST use generic or redacted descriptions for private personal data
- AND it MUST NOT include raw sensitive values from private source files.

### Requirement: CV Content Positioning and Defensible Claims

The private CV MUST position the user with a technical-strong tone for AI-oriented companies, centered on infrastructure IT, automation, applied generative AI/LLM work, data integration, and operational DevOps. The CV MUST NOT claim custom model training, unsupported seniority, unapproved metrics, or outcomes that have not been approved by the user.

#### Scenario: AI-oriented headline is defensible

- GIVEN the CV headline and professional summary are drafted
- WHEN claims about AI and automation are reviewed
- THEN they MUST describe applied generative AI/LLM usage, data integration, and operational DevOps in interview-defensible terms
- AND they MUST NOT state custom model training unless later approved by the user.

#### Scenario: Unverified achievements are excluded

- GIVEN a project or experience statement lacks user-approved evidence
- WHEN final CV content is prepared
- THEN the statement MUST be omitted, softened, or marked for user correction before PDF generation.

### Requirement: One-Page Private CV Structure

The first private CV version MUST be optimized as a one-page document with aggressive recruiter scanning and only the strongest supporting evidence. The CV MAY use a Spanish-first style with English technical keywords or headings where useful.

#### Scenario: First version uses one page

- GIVEN the private CV content has been field-reviewed
- WHEN the final private CV layout is generated
- THEN it MUST target one A4 page
- AND it SHOULD prioritize headline, contact header, profile, core skills, most relevant experience, selected projects, strongest certifications, languages, and references note.

#### Scenario: Supporting evidence is compressed

- GIVEN projects, certifications, languages, and references need to be represented
- WHEN the one-page layout is prepared
- THEN it MUST organize supporting evidence concisely without expanding into a public portfolio-style case study
- AND lower-priority details SHOULD be condensed or omitted rather than shrinking text below readable size.

### Requirement: Contact Header Privacy Decisions

The private CV header MUST include city/country, phone, email, GitHub, LinkedIn, and portfolio link using private approved values in local-only artifacts. The header MUST NOT include age, Instagram, or exact address.

#### Scenario: Header includes approved contact categories

- GIVEN the user has approved private contact fields for the final CV
- WHEN the header is generated in the local HTML or PDF
- THEN it MUST include city/country, phone, email, GitHub, LinkedIn, and portfolio link
- AND those raw values MUST remain only in ignored local artifacts.

#### Scenario: Header excludes disallowed personal fields

- GIVEN source material contains additional personal details
- WHEN the CV header is reviewed
- THEN age, Instagram, and exact address MUST NOT appear in the CV header.

### Requirement: Experience, Project, Certification, Language, and Reference Decisions

The private CV MUST reflect the approved content decisions: the current role merges independent consulting, TechLocal, and related implementation work; JC Computadores and New Technology are fused into a short premium-hardware support block; Armada is brief; Madevidrios is removed. The CV MUST keep the four approved project groups: WhatsApp intake, support handoff, persistent memory for agents, and TechLocal services. Certifications MUST be grouped into main and additional categories. Languages MUST list Spanish as native and English as A2 technical reading/documentation, and MUST remove Portuguese. The main CV MUST state that references are available upon request, while full family or professional reference details remain private backup only.

#### Scenario: Experience entries follow approved structure

- GIVEN the experience section is drafted from public and private sources
- WHEN it is prepared for the final CV
- THEN independent consulting, TechLocal, and related implementation work MUST be merged into the current role
- AND JC Computadores plus New Technology MUST be fused into a short premium-hardware support block
- AND Armada MUST be brief
- AND Madevidrios MUST be removed.

#### Scenario: Project groups are retained

- GIVEN the projects section is prepared
- WHEN the final CV content is reviewed
- THEN it MUST include the WhatsApp intake, support handoff, persistent memory for agents, and TechLocal services project groups.

#### Scenario: Certifications and languages follow approved grouping

- GIVEN certifications and languages are drafted
- WHEN the final CV content is reviewed
- THEN main certifications MUST include GNU/Linux administration, Responsive Web Design, PHP/SQL/POO/MVC, and HTML/CSS
- AND additional certifications MUST include Intro to Programming and Advanced Web Layout
- AND languages MUST include Spanish native and English A2 technical reading/documentation
- AND Portuguese MUST NOT be included.

#### Scenario: References are private backup only

- GIVEN reference information exists in private source material
- WHEN the main CV is generated
- THEN it MUST state references are available upon request
- AND full family or professional reference details MUST remain only in private backup material, not in tracked artifacts or the main CV body.

### Requirement: Local-Only HTML and PDF Generation

The system MUST generate the private CV HTML and PDF locally inside `.private-cv/`. Generated outputs MUST NOT be written to public application folders or committed unless the user explicitly approves a separate future workflow after privacy review.

#### Scenario: HTML and PDF are generated locally

- GIVEN the user has approved the field-reviewed CV content
- WHEN HTML and PDF outputs are generated
- THEN both outputs MUST be written inside `.private-cv/`
- AND no generated CV output MUST be written to `public/`, application route folders, or other tracked source locations.

#### Scenario: Public source data remains read-only by default

- GIVEN existing public portfolio data is used as source material
- WHEN the private CV is generated
- THEN public `src/data/*` files and public pages SHOULD remain unchanged unless the user explicitly approves public portfolio changes later.

### Requirement: Cleanup After Final PDF Delivery

The workflow MUST include cleanup guidance to remove private generated artifacts from the repository folder after the final PDF is copied, delivered, or no longer needed there, unless the user explicitly asks to keep local ignored copies.

#### Scenario: Final PDF has been delivered elsewhere

- GIVEN the final private PDF has been copied or sent outside the repository folder
- WHEN cleanup is performed
- THEN generated private HTML/PDF outputs SHOULD be removed from `.private-cv/` unless the user asks to keep them
- AND repository status MUST be checked again to confirm no sensitive files are tracked or untracked.

### Requirement: Validation Gates

The workflow MUST require validation gates before final delivery: privacy checks for ignored local files, redaction checks for tracked artifacts, user approval of final CV content, and local inspection of generated HTML/PDF. If tracked changes exceed the 200 changed-line review budget, the workflow MUST pause for user approval before continuing.

#### Scenario: Privacy validation passes before delivery

- GIVEN private source files and generated outputs exist during the workflow
- WHEN validation is run before final delivery
- THEN ignore checks MUST confirm `.private-cv/` files are ignored
- AND repository status MUST confirm no sensitive CV files are staged, tracked, or publicly untracked.

#### Scenario: Redaction validation passes for tracked artifacts

- GIVEN tracked OpenSpec or planning files are ready for review
- WHEN redaction validation is performed
- THEN those files MUST contain only redacted or generic descriptions
- AND they MUST NOT contain raw sensitive values.

#### Scenario: User approval gates PDF generation

- GIVEN a private CV draft has been prepared
- WHEN the workflow reaches final HTML/PDF generation
- THEN the user MUST approve the final content first
- AND unresolved field corrections MUST block final PDF generation.

#### Scenario: Review budget is respected

- GIVEN tracked source changes are prepared
- WHEN the changed-line count is expected to exceed 200 lines
- THEN the workflow MUST pause and request user approval before continuing.
