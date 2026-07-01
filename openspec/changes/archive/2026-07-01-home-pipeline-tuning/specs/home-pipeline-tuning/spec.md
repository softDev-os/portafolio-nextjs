# Home Pipeline Tuning Specification

## Purpose

Define accepted behavior for a small CSS-only tuning pass on the Home page decorative pipeline block so it remains compact, readable, and visually coherent with the surrounding Home composition across desktop, dark mode, reduced motion, and narrow mobile viewports.

## Requirements

### Requirement: Pipeline Source Scope

The home pipeline tuning MUST remain CSS-only and MUST limit source changes to `src/styles/home.css`. The existing `.home-pipeline` JSX in `src/app/page.tsx` MUST remain unchanged.

#### Scenario: Only Home CSS changes

- GIVEN the implementation diff is reviewed
- WHEN changed source files are inspected
- THEN `src/styles/home.css` MUST be the only changed source file
- AND `src/app/page.tsx` MUST remain unchanged

#### Scenario: Pipeline remains decorative

- GIVEN the Home route renders the pipeline block
- WHEN the DOM is inspected
- THEN the existing `aria-hidden="true"` behavior MUST remain unchanged
- AND no new interactive behavior, data dependency, route behavior, or content source MUST be introduced

#### Scenario: Unrelated Home sections remain untouched

- GIVEN the implementation diff is reviewed
- WHEN changed CSS selectors are inspected
- THEN changes MUST be limited to `.home-pipeline*` selectors and directly related Home-local dark/reduced-motion/responsive wrappers
- AND hero, control-room, proof cards, CTA, global primitives, and responsive foundation selectors MUST remain unchanged

### Requirement: Pipeline Readability and Wrapping

The Home pipeline MUST remain readable across desktop, tablet, mobile, and small-mobile viewports. Labels MUST NOT clip or cause horizontal overflow at narrow widths, and arrows SHOULD remain visually associated with the flow.

#### Scenario: Desktop pipeline remains compact

- GIVEN a desktop viewport renders `/`
- WHEN the pipeline is inspected
- THEN all four labels (`Mensaje entrante`, `Clasificación IA`, `Decisión segura`, `Humano informado`) MUST remain visible
- AND the pipeline MUST remain visually compact within its container

#### Scenario: Small-mobile labels do not overflow

- GIVEN 390px and 360px mobile viewports render `/`
- WHEN the pipeline is inspected
- THEN labels MUST remain readable without clipping
- AND no horizontal page overflow attributable to the pipeline MUST be introduced

#### Scenario: Arrows remain coherent on wrap

- GIVEN the pipeline wraps across multiple visual rows
- WHEN arrows and steps are inspected
- THEN arrows SHOULD remain visible and not create confusing orphaned layout
- AND any wrapping behavior MUST preserve the intended left-to-right flow concept

### Requirement: Visual Cohesion With Home Proof Area

The pipeline MAY receive subtle CSS refinements that make it feel more connected to the Home proof cards, but it MUST NOT become a new proof-card component, metrics strip, or redesigned content block.

#### Scenario: Visual bridge is subtle

- GIVEN the pipeline surface is tuned
- WHEN it is compared to the proof-card section
- THEN the styling MAY echo proof-card tones or accents subtly
- AND it MUST NOT duplicate the proof-card outcome surface in a way that makes the pipeline appear as another evidence card

#### Scenario: Existing content remains unchanged

- GIVEN the implementation diff is reviewed
- WHEN pipeline labels/icons/arrows are inspected
- THEN no pipeline text, icon, or arrow content MUST change
- AND no new labels or headings MUST be introduced in JSX

### Requirement: Dark Mode and Reduced Motion Preservation

Pipeline tuning MUST preserve dark-mode readability and existing reduced-motion behavior. It MUST NOT migrate dark-mode ownership or introduce new motion.

#### Scenario: Dark mode remains readable

- GIVEN dark mode is active on `/`
- WHEN the pipeline is viewed
- THEN the pipeline surface, border, icons, arrows, and labels MUST remain readable with acceptable contrast
- AND any dark-mode adjustment MUST remain scoped to Home pipeline selectors

#### Scenario: Reduced motion remains respected

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the Home route renders
- THEN the existing Home reduced-motion behavior for `.home-pipeline` MUST remain effective
- AND no new pipeline animation or transform motion MUST be introduced

#### Scenario: Entrance animation is preserved outside reduced motion

- GIVEN normal motion preferences are active
- WHEN the Home route renders
- THEN the existing pipeline entrance animation behavior SHOULD remain recognizable
- AND tuning MUST NOT remove the current Home page reveal rhythm unless explicitly approved later

### Requirement: Non-Goals and Guardrails

This change MUST remain a small pipeline CSS tuning unit. It MUST NOT change routes, data, JSX, global primitives, Tailwind/shadcn setup, responsive foundation files, or `openspec/specs/design-responsividad/`.

#### Scenario: No broader Home redesign

- GIVEN the implementation diff is reviewed
- WHEN Home selectors are inspected
- THEN hero, control-room, proof cards, CTA, page shell, and legacy section selectors MUST remain unchanged
- AND only pipeline-specific CSS changes MAY be present

#### Scenario: No global framework or design-system changes

- GIVEN changed files are inspected
- WHEN global styles, dependencies, or framework setup are reviewed
- THEN no Tailwind utilities, shadcn/ui imports, new dependencies, global primitive changes, or responsive foundation changes MUST be present

#### Scenario: Design-responsividad remains untouched

- GIVEN changed paths are inspected
- WHEN OpenSpec specs are reviewed
- THEN no files under `openspec/specs/design-responsividad/` MUST be modified

### Requirement: Verification Gates

The implementation MUST pass automated checks and Home route smoke checks before commit. The source diff SHOULD remain below 80 changed lines and MUST remain below the unit review budget of 300 changed lines unless explicitly approved.

#### Scenario: Automated verification passes

- GIVEN the implementation is complete
- WHEN `npm run lint`, `npm run build`, and `git diff --check` are executed
- THEN all commands MUST pass with no new attributable errors or whitespace issues

#### Scenario: Home pipeline smoke passes

- GIVEN the implementation is complete
- WHEN `/` is smoke-tested
- THEN the pipeline MUST render with four visible steps and arrows
- AND desktop, dark-mode, reduced-motion, 390px, and 360px checks MUST pass

#### Scenario: Review budget is enforced

- GIVEN the source diff is measured
- WHEN changed lines are counted
- THEN the source diff SHOULD remain under 80 changed lines
- AND the total unit diff MUST remain under 300 changed lines unless explicitly approved
