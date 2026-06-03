# profile-mobile-overflow Specification

## Purpose

Define requirements for removing horizontal document overflow on the `/perfil` route at small-mobile viewport widths (360px and 375px) while preserving the existing dotted title decoration visual style, maintaining zero overflow on comparison routes (`/` and `/contacto`), and staying within a narrow CSS-only scope.

## Requirements

### Requirement: Small-Mobile Profile Overflow Containment

The system MUST ensure that `/perfil` reports zero horizontal document overflow at small-mobile viewport widths (`360px`, `375px`, and `414px`).

#### Scenario: No overflow at 360px

- GIVEN the application is rendered at a 360px viewport width
- WHEN the `/perfil` route is loaded and measured with the overflow detection script (`overflow-check.mjs`)
- THEN `document.documentElement.scrollWidth` MUST be less than or equal to `window.innerWidth`
- AND `document.body.scrollWidth` MUST be less than or equal to `window.innerWidth`
- AND `window.scrollX` after a programmatic `scrollTo(9999, 0)` MUST equal `0`

#### Scenario: No overflow at 375px

- GIVEN the application is rendered at a 375px viewport width
- WHEN the `/perfil` route is loaded and measured
- THEN `scrollWidth <= innerWidth` for both `documentElement` and `body`
- AND `scrollX === 0` after horizontal scroll attempt

#### Scenario: No overflow at 414px (no regression)

- GIVEN the application is rendered at a 414px viewport width
- WHEN the `/perfil` route is loaded and measured
- THEN `scrollWidth <= innerWidth` for both `documentElement` and `body`
- AND `scrollX === 0` after horizontal scroll attempt
- AND the existing zero-overflow behavior at 414px MUST be preserved (no regression from the fix)

### Requirement: Title Decoration Preservation

The system MUST preserve the visible dotted title decoration pattern on section headings at small-mobile widths. The fix MUST NOT hide, disable, or remove the generated `::after` pseudo-element decorations.

#### Scenario: Title decoration remains visible after fix

- GIVEN the `/perfil` route is rendered at 360px viewport width
- WHEN the small-breakpoint title decoration fix is applied
- THEN section title heading elements on the profile page (`.about__title`, `.services__title`, `.method__title`, `.principles__title`, `.trust__title`) MUST still display their `::after` dotted decoration
- AND the decoration pattern (`repeating-radial-gradient` with `var(--principal-color)` dots) MUST remain unchanged

#### Scenario: Fix uses offset adjustment, not decoration hiding

- GIVEN the implementation fix for the `/perfil` overflow
- WHEN the source diff in `src/styles/responsive-small.css` is reviewed
- THEN the fix MUST NOT use `display: none` on any `::after` pseudo-element
- THEN the fix MUST NOT use `overflow-x: hidden` as the primary overflow remediation
- THEN the fix SHOULD adjust the `right` offset, `width`, `padding-right`, or a combination of these on the affected small-breakpoint title decoration rule to contain the pseudo-element within the document width

#### Scenario: Visual consistency of title decorations

- GIVEN the `/perfil` route is rendered at 360px viewport width after the fix
- WHEN the title decorations are visually compared against the current (pre-fix) appearance at the same viewport
- THEN the dotted decoration SHOULD remain visually similar in position, size, and opacity
- AND any position change MUST be minimal and constrained to what is necessary to eliminate the overflow

### Requirement: Cross-Route Non-Regression

The system MUST ensure that comparison routes (`/` and `/contacto`) remain free of horizontal document overflow at small-mobile widths, and that shared selector changes do not introduce regressions on other routes with decorated titles.

#### Scenario: `/` route remains overflow-free at small widths

- GIVEN the application is rendered at 360px viewport width
- WHEN the `/` route is loaded and measured with the overflow detection script
- THEN `scrollWidth <= innerWidth` and `scrollX === 0`

#### Scenario: `/contacto` route remains overflow-free at small widths

- GIVEN the application is rendered at 360px viewport width
- WHEN the `/contacto` route is loaded and measured with the overflow detection script
- THEN `scrollWidth <= innerWidth` and `scrollX === 0`

#### Scenario: Shared selector group does not cause regressions

- GIVEN the small-breakpoint title decoration selector group in `responsive-small.css` targets `.about__title::after`, `.curriculum__title::after`, `.services__title::after`, `.reviews__title::after`, `.clients__title::after`, and `.prices__title::after`
- WHEN the decoration offset is adjusted to fix the `/perfil` overflow
- THEN routes that use these shared selectors (e.g., curriculum, services, reviews, clients, prices pages) MUST NOT exhibit new horizontal overflow at small-mobile widths
- AND any route-specific decoration adjustments already present for those pages MUST be preserved

### Requirement: Scope and Non-Goal Enforcement

The system MUST limit the fix to raw CSS in the confirmed affected file (`src/styles/responsive-small.css`). The fix MUST NOT touch foundation, primitives, layout, reset, dark-mode, TSX components, routes, or data modules.

#### Scenario: CSS-only fix

- GIVEN the implementation diff for the overflow fix is reviewed
- WHEN changed files are inspected
- THEN all source changes MUST be limited to CSS files
- AND no `.tsx`, `.ts`, `.js`, `.mjs`, or `.json` source files (excluding OpenSpec artifacts and the verification script) MUST be modified

#### Scenario: No layout or foundation changes

- GIVEN the implementation diff is reviewed
- WHEN the touched files are inspected
- THEN `src/styles/responsive-foundation.css`, `src/styles/responsive-tablet.css`, `src/styles/responsive-mobile.css`, `src/styles/layout.css`, `src/styles/sidebar.css`, `src/styles/nav-float.css`, `src/styles/reset.css`, and `src/styles/dark-mode.css` MUST NOT be modified

#### Scenario: No primitives changes unless proven necessary

- GIVEN the implementation diff is reviewed
- WHEN touched files are inspected
- THEN `src/styles/primitives.css` MUST NOT be modified unless a later verification phase demonstrates that the small-breakpoint override in `responsive-small.css` cannot resolve the overflow without changing the base primitive
- AND if `primitives.css` must be touched, the changed-line count for the primitive change MUST be minimal and the reason documented in the Apply notes

#### Scenario: No page redesign or broad responsive retuning

- GIVEN the implementation diff is reviewed
- WHEN the responsive-small.css changes are inspected
- THEN only the small-breakpoint title decoration rule (lines targeting `::after` decorations on title selectors) MAY be modified
- AND no other responsive breakpoint values, layout adjustments, font-size changes, grid-template-columns changes, flex-basis changes, or padding changes unrelated to the title decoration overflow MUST be present
- AND `openspec/specs/design-responsividad/` MUST remain untouched

#### Scenario: No TSX, route, or data changes

- GIVEN the implementation diff is reviewed
- WHEN all changed files are inspected
- THEN no files under `src/app/`, `src/components/`, `src/data/`, or `src/lib/` MUST be modified
- AND no route handler, page component, layout component, middleware, or metadata file MUST be changed

### Requirement: Verification

The system MUST pass automated overflow detection, lint, and build checks. The review budget for source changes MUST stay at or below 25 changed source lines unless an explicit approval is obtained.

#### Scenario: Overflow detection script passes

- GIVEN the fix is applied and the dev server is running
- WHEN `node openspec/changes/profile-mobile-overflow/overflow-check.mjs` is executed
- THEN all nine combinations of route (`/perfil`, `/`, `/contacto`) × viewport (`360px`, `375px`, `414px`) MUST report `overflow <= 0` and `scrollX === 0`
- AND the script MUST exit successfully

#### Scenario: Lint passes

- GIVEN the fix is applied
- WHEN `npm run lint` is executed
- THEN the command MUST exit successfully
- AND no new lint violations attributable to the profile-mobile-overflow change MUST be present

#### Scenario: Build passes

- GIVEN the fix is applied
- WHEN `npm run build` is executed
- THEN the command MUST exit successfully
- AND no new build warnings attributable to the profile-mobile-overflow change MUST be present

#### Scenario: Review budget is enforced

- GIVEN the implementation diff is reviewed
- WHEN source changed lines are counted (excluding OpenSpec artifacts and the unchanged `overflow-check.mjs` script)
- THEN the count MUST be at or below 25 changed source lines
- OR an explicit delivery decision from the user MUST approve exceeding the budget

#### Scenario: Git diff check passes (if shell available)

- GIVEN a shell environment is available during verification
- WHEN `git diff --check` is executed
- THEN the command MUST report no whitespace errors in the diff
