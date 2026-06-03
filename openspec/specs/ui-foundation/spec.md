# UI Foundation Specification

## Purpose

Define the portfolio application shell foundation for controlled raw-CSS UI tuning across desktop, tablet, mobile, and small-mobile breakpoints without changing page-specific responsive behavior or React/data behavior in Unit 1.

## Requirements

### Requirement: Shared Responsive Foundation Ownership

The system MUST centralize shared tablet/mobile application-shell behavior in `responsive-foundation.css`, including the non-desktop shell reset, sidebar-to-sticky-header foundation, bottom-navigation foundation, and responsive overlay suppression. `responsive-tablet.css` and `responsive-mobile.css` MUST retain breakpoint-specific values and existing page-specific responsive rules. The stylesheet import cascade MUST load the shared responsive foundation before breakpoint-specific responsive styles so tablet/mobile overrides continue to win.

#### Scenario: Shared foundation applies before breakpoint overrides

- GIVEN the application styles are loaded for a tablet or mobile viewport
- WHEN the responsive styles are evaluated
- THEN shared shell, sidebar/header, and bottom-nav foundation rules are available before tablet/mobile-specific rules
- AND tablet/mobile-specific spacing, sizing, and page-specific responsive rules can override the shared foundation where needed

#### Scenario: Page-specific responsive behavior is not retuned in Unit 1

- GIVEN existing page-specific responsive blocks for pages such as contact, curriculum, about, services, reviews, prices, portfolio, or blog
- WHEN Unit 1 foundation cleanup is applied
- THEN those page-specific responsive behaviors MUST remain unchanged except for cascade effects required by the shared shell foundation

### Requirement: Safe-Area Foundation Tokens

The system MUST expose `--safe-top` and `--safe-bottom` safe-area CSS custom properties from `variables.css`. Touched foundation safe-area usages MUST use these tokens instead of repeating direct `env(safe-area-inset-*, 0px)` expressions.

#### Scenario: Notched mobile viewport uses foundation tokens

- GIVEN a mobile viewport with non-zero safe-area insets
- WHEN the sticky top header, bottom navigation, or touched home shell padding needs safe-area spacing
- THEN the spacing MUST resolve through `--safe-top` or `--safe-bottom`
- AND the header and bottom navigation MUST remain clear of the viewport safe areas

### Requirement: ThemeToggle Structural Ownership

The system MUST keep `.sidebar__theme-toggle` layout, structure, interaction, focus-visible, hover, sizing, and responsive positioning styles under sidebar ownership in `sidebar.css`. `dark-mode.css` MUST only own dark-mode variables or actual dark-theme visual differences for the ThemeToggle and MUST NOT own its structural placement.

#### Scenario: Theme toggle retains structure across themes

- GIVEN the ThemeToggle is rendered inside the sidebar or responsive header
- WHEN the user switches between light and dark themes
- THEN the button position, hit target, focus-visible behavior, hover behavior, and responsive placement MUST remain governed by sidebar structure
- AND only true dark-theme visual differences MAY come from `dark-mode.css`

### Requirement: Home Shell Scroll Ownership

The system MUST preserve desktop home scroll ownership in `.layout__main` while keeping tablet/mobile home scroll and body behavior correct. Desktop home footer hiding MUST remain unchanged. Home shell ownership changes MUST NOT redesign or retune page component styling in `home.css`.

#### Scenario: Desktop home scroll remains container-owned

- GIVEN a desktop viewport showing the home page
- WHEN home content overflows vertically
- THEN scrolling MUST remain owned by `.layout__main`
- AND the desktop home footer MUST remain hidden as before

#### Scenario: Responsive home shell remains scrollable

- GIVEN a tablet, mobile, or small-mobile viewport showing the home page
- WHEN home content overflows vertically
- THEN body and shell scroll behavior MUST allow the page to remain reachable and readable
- AND responsive home padding MAY remain breakpoint-specific where needed

### Requirement: Reduced-Motion Baseline

The system MUST provide a global reduced-motion baseline in `reset.css` for `prefers-reduced-motion: reduce` that minimizes animation duration, transition duration, animation iteration, and smooth scrolling. Component-specific reduced-motion overrides that alter transforms, overlays, or other non-duration behavior MUST remain where needed.

#### Scenario: Reduced motion preference minimizes global motion

- GIVEN the user has enabled reduced motion at the operating-system or browser level
- WHEN the portfolio UI renders or navigates
- THEN global animations, transitions, repeated animations, and smooth scrolling MUST be minimized
- AND component-specific transform or behavior overrides MUST still apply where required for accessibility or visual stability

### Requirement: Unit 1 Non-Regression Constraints

Unit 1 MUST remain a raw-CSS foundation organization change. It MUST NOT migrate to Tailwind, MUST NOT change React components, routes, data modules, or dark-mode hydration behavior, and MUST NOT intentionally change page-specific responsive behavior. The implementation SHOULD stay within a review budget of 300 changed lines.

#### Scenario: Scope review passes

- GIVEN the Unit 1 implementation diff is reviewed
- WHEN files and changed lines are inspected
- THEN changes MUST be limited to foundation CSS organization and imports
- AND no Tailwind migration, React component changes, route changes, or data changes MUST be present
- AND the changed-line count SHOULD be at or below 300 lines unless a delivery decision approves otherwise

### Requirement: Foundation Verification

The system MUST be verified with `npm run build` and `npm run lint`, and it MUST receive manual checks for desktop, tablet, mobile, and small-mobile viewports. Verification MUST also cover the dark mode toggle, safe-area behavior, reduced-motion behavior, skip link behavior, and `ScrollToTop` behavior.

#### Scenario: Required automated verification succeeds

- GIVEN Unit 1 foundation changes are implemented
- WHEN `npm run build` and `npm run lint` are executed
- THEN both commands MUST exit successfully with no new Unit 1-attributable errors or warnings

#### Scenario: Required manual foundation verification succeeds

- GIVEN Unit 1 foundation changes are implemented
- WHEN desktop, tablet, mobile, and small-mobile viewports are checked manually
- THEN the floating desktop card, tablet/mobile sticky header, fixed bottom navigation, and small-mobile readability MUST remain correct
- AND dark mode toggle, safe-area spacing, reduced motion, skip link reveal, and `ScrollToTop` reset behavior MUST pass their manual checks
