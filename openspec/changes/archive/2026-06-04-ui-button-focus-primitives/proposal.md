# Proposal: ui-button-focus-primitives

## Problem statement and motivation

The current raw-CSS portfolio UI has two related gaps in its interactive elements:

1. **Focus-visible WCAG gap:** Several keyboard-accessible buttons and link-buttons do not have explicit `:focus-visible` styling. This affects form submission, recovery actions on error/not-found states, portfolio filters, article links, and blog back navigation. Because these controls can receive keyboard focus, missing visible focus treatment creates a WCAG 2.4.7 Level AA risk.
2. **Button duplication:** Button-like CTAs repeat the same base shape across page-owned stylesheets: inline pill/button display, centered content, rounded corners, padding, text decoration removal, cursor affordance, and transition setup. The duplicated shape makes future button tuning inconsistent and increases the chance that new interactive elements miss the established focus ring.

The motivation for this change is to fix the accessibility gap while taking the smallest useful step toward a reusable button primitive. The implementation should preserve page-specific visual intent and avoid a redesign: hover behavior, local sizing exceptions, color choices, route/data behavior, and responsive tuning remain page-owned.

## Intent

Add a minimal, raw-CSS button/focus primitive slice that builds on the existing `visual-primitives` layer:

- introduce a `.btn` base primitive and minimal variants in `src/styles/primitives.css`,
- add `.btn` to existing button/CTA/link-button elements only where safe and additive,
- normalize focus-visible treatment for the known missing interactive selectors,
- keep the change reviewable under the 300 changed-line budget.

## Recommended scope

Use the Explore recommendation: **Option C — Hybrid Minimal First Slice**.

### In scope

- Add a `.btn` base shape primitive in `src/styles/primitives.css`.
- Add minimal button variants such as `.btn--primary`, `.btn--outline`, and, if justified by existing patterns, `.btn--subtle`.
- Add additive `.btn` / variant class names to existing TSX elements when the CSS cascade has been checked and the change is class-name-only.
- Consolidate the shared gold-ring `:focus-visible` treatment into `primitives.css` for `.btn` and the known interactive selectors that need it.
- Preserve existing page-specific hover behavior and page-specific sizing/color where needed.
- Keep existing dark-mode architecture intact: `dark-mode.css` continues to import last and own true dark-theme visual differences.
- Preserve the existing global reduced-motion baseline from `reset.css`; do not introduce motion that fights it.

### Exact in-scope candidates

The first slice should evaluate and, where safe, cover these selectors:

- `.form__button`
- `.error-btn-primary`
- `.error-btn-secondary`
- `.not-found__link`
- `.portfolio__link`
- `.blog-article__back`
- `.article__link`
- existing `.home-hero__cta-link` instances, if cascade review confirms `.btn` is safely additive

These are candidates for either additive `.btn` class adoption, consolidated `:focus-visible` coverage, or both. The Spec/Tasks phases should keep the final list narrow if any selector shows visual-regression risk.

## Non-goals

- No global restyle of all links or all buttons.
- No hover normalization across button types.
- No page redesign.
- No responsive retuning or broad viewport behavior changes.
- No route, data, metadata, or content changes.
- No React component refactors, control-flow changes, or component extraction.
- No Tailwind or shadcn migration.
- No broad token migration for spacing, shadows, radii, borders, or colors.
- No new dark-mode architecture or dark-mode hydration changes.
- No `openspec/specs/design-responsividad/` changes.

## Candidate affected files and responsibilities

| Candidate file | Expected responsibility |
| --- | --- |
| `src/styles/primitives.css` | Own `.btn` base, minimal `.btn--primary` / `.btn--outline` / possible `.btn--subtle` variants, and the shared focus-visible ring for `.btn` plus explicitly listed interactive selectors. It must not own page layout, responsive breakpoints, or page-specific hover redesign. |
| `src/styles/home.css` | Keep hero CTA page-specific colors, hover lift/shadow, and any sizing that should remain local. May reduce duplicated base shape declarations only where `.btn` replaces them without visual drift. |
| `src/styles/contact.css` | Preserve contact form layout and hover behavior. Add or rely on normalized `:focus-visible` for `.form__button`; optionally adopt `.btn` additively for the submit button if safe. |
| `src/styles/error.css` | Preserve error action visual intent and opacity hover. Add focus-visible coverage for `.error-btn-primary` and `.error-btn-secondary`; optionally adopt `.btn` with local radius/color retained as needed. |
| `src/styles/pages-misc.css` | Preserve not-found page layout and opacity hover. Add focus-visible coverage for `.not-found__link`; optionally adopt `.btn` if the pill shape remains unchanged. |
| `src/styles/portfolio.css` | Preserve portfolio filter layout, active state, and hover fill/lift. Add focus-visible coverage for `.portfolio__link`; adopt `.btn` only if it does not retune filter sizing or spacing. |
| `src/styles/blog.css` | Preserve article card/back-link typography and hover behavior. Add focus-visible coverage for `.blog-article__back` and `.article__link`; adopt `.btn` only for elements whose shape matches the primitive. |
| `src/styles/sidebar.css` | If the existing grouped focus-visible rule includes selectors now owned by primitives, simplify or move only the shared focus-visible selectors while preserving sidebar-owned theme-toggle focus behavior. |
| `src/app/page.tsx` | Candidate for additive `.btn` / variant class names on home hero CTA links only. |
| `src/app/perfil/page.tsx` | Candidate for additive `.btn` / variant class names on CTA links only. |
| `src/app/contacto/page.tsx` | Candidate for additive `.btn` / variant class names on CTA links and the submit button only. |
| `src/app/blog/page.tsx` | Candidate for additive `.btn` / variant class names on CTA links only. |
| `src/app/blog/[slug]/page.tsx` | Candidate for additive `.btn` / variant class names on CTA links and safe back/article navigation elements only. |
| `src/app/casos-reales/page.tsx` | Candidate for additive `.btn` / variant class names on the existing CTA and portfolio filter links only. |
| `src/app/error.tsx` | Candidate for additive `.btn` / variant class names on error recovery buttons only. |
| `src/app/not-found.tsx` | Candidate for additive `.btn` / variant class names on the not-found recovery link only. |

TSX file changes are allowed only as additive `className` string changes. No source implementation should be done during this Proposal phase.

## Review workload forecast

Target review budget: **≤300 changed lines**.

Expected implementation forecast for the recommended first slice:

- `src/styles/primitives.css`: approximately +25 to +45 lines for `.btn`, variants, and focus-visible grouping.
- Existing CSS files: approximately +20 to +45 lines net for missing focus-visible rules and small deduplication/simplification.
- TSX files: approximately +10 to +25 lines for additive class-name changes across existing CTA/button/link elements.
- Total expected review workload: approximately **70 to 120 changed lines**, with the Explore estimate around **85 changed lines**.

This is comfortably under the 300-line review budget, but there is one known churn risk: additive TSX class names may touch several pages. To keep review focused, the Spec/Tasks phases should require TSX diffs to be class-name-only and should pause before Apply if the forecast grows beyond 300 changed lines or requires non-additive TSX work.

## Success criteria

- Known missing keyboard focus indicators are fixed for `.form__button`, `.error-btn-primary`, `.error-btn-secondary`, `.not-found__link`, `.portfolio__link`, `.blog-article__back`, and `.article__link`.
- `.home-hero__cta-link` keeps its existing visual behavior while gaining or retaining normalized focus-visible treatment through the primitive layer if safe.
- `src/styles/primitives.css` owns a minimal `.btn` base and variants without taking over page layout, responsive behavior, or hover normalization.
- Page-specific hover behavior, active states, colors, sizing exceptions, and dark-mode behavior remain intact.
- TSX changes, if any, are additive class-name changes only.
- No Tailwind/shadcn, redesign, route/data/content, broad responsive retuning, or `openspec/specs/design-responsividad/` changes are present.
- The implementation remains at or below 300 changed lines unless the user explicitly approves a different delivery decision.

## Verification plan

Automated checks for later Apply/Verify phases:

1. `npm run lint` must pass with no new attributable violations.
2. `npm run build` must pass with no new attributable build errors or warnings.
3. If feasible in the available environment, run a Playwright/manual-browser smoke pass for representative routes; if Playwright is not configured, document manual keyboard and visual checks instead.

Manual smoke checks for later Apply/Verify phases:

- Keyboard Tab/focus-visible:
  - `/` — hero primary and secondary CTAs.
  - `/perfil` — CTA links.
  - `/contacto` — CTA links and form submit button.
  - `/casos-reales` — CTA and portfolio filter links.
  - `/blog` — CTA links and article links.
  - `/blog/[slug]` — CTA links, article/back navigation as present.
  - `/not-found` — recovery link.
  - Error boundary state — primary and secondary recovery buttons if feasible to trigger.
- Confirm focus rings appear for keyboard focus and are not shown as hover normalization or broad link restyling.
- Confirm dark mode still preserves button/link contrast and the focus ring remains visible against dark surfaces.
- Confirm `prefers-reduced-motion: reduce` continues to minimize transitions through the existing global baseline.
- Check representative desktop, tablet, mobile, and small-mobile viewports for touched routes, without retuning responsive layout.
- Diff audit: no non-additive TSX changes; no data/routes/content edits; no `openspec/specs/design-responsividad/` edits.

## Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Cascade/specificity conflict between `.btn` and existing page selectors | Medium | Medium | Keep `.btn` low-specificity and limited to shared base properties; let page selectors override colors, sizing, hover, and local differences. |
| Visual regression from over-normalizing button shapes | Medium | Medium | Apply `.btn` only to exact in-scope candidates after selector review; keep error/not-found/portfolio differences local where needed. |
| Focus-visible ring changes visual behavior | Low | High | Treat visible keyboard focus as the intended accessibility improvement; use the already established gold-ring pattern for consistency. |
| TSX class churn across several routes conflicts with in-flight work | Medium | Medium | Keep all TSX edits class-name-only and additive; avoid logic, content, structure, or route changes. |
| Hover normalization accidentally redesigns interactions | Low | Medium | Make hover normalization an explicit non-goal; page styles continue to own hover lift, opacity, fill, and shadow choices. |
| Dark-mode contrast regression | Low | Medium | Do not put dark-mode overrides in `primitives.css`; manually check light/dark on touched routes. |
| Review workload exceeds the budget due to broader cleanup | Low | Medium | Keep the first slice to `.btn` base/variants and listed focus selectors; pause before Apply if forecast exceeds 300 changed lines. |

## Rollback plan

Rollback should be straightforward because this is a small CSS primitive plus optional additive class-name adoption:

1. Remove the `.btn` and `.btn--*` definitions and consolidated focus-visible grouping from `src/styles/primitives.css`.
2. Restore any previous local focus-visible selector grouping in `src/styles/sidebar.css` if it was moved.
3. Restore local `:focus-visible` rules or page-owned declarations from version control where they were deduplicated.
4. Remove additive `.btn` / variant class names from TSX files.
5. Re-run `npm run lint`, `npm run build`, and the keyboard focus smoke checks to confirm the previous state is restored.

## Proposal question round

No interactive UI question round was available before writing this artifact, so these product/PRD questions should be reviewed before Spec finalization. They are intended to uncover business rules, impact, edge cases, and product tradeoffs rather than delivery mechanics.

1. Should keyboard focus treatment be considered a portfolio-wide quality bar for all future interactive elements, or only for currently known CTA/button-like controls?
2. Should the button primitive prioritize visual consistency across recovery, contact, hero, and filter actions, or should page-specific shape differences remain acceptable when they communicate different action types?
3. Are portfolio filter links (`.portfolio__link`) productively treated as buttons for visual/focus primitives, or should they remain more navigation-like to avoid implying form-control behavior?
4. If a `.btn` primitive causes a tiny visual drift on a low-traffic recovery state, should the first slice favor consolidation or preserve pixel-level current appearance?
5. Are there any support, accessibility, or brand expectations that require the focus ring color/style to differ from the current established gold-ring treatment?

Current proposal assumptions: focus-visible consistency is a mandatory accessibility improvement; visual/button-shape consolidation should be conservative; page-specific hover behavior remains part of the product feel; and first-slice scope should stop at the exact candidate list above unless the user explicitly broadens it.

## Recommendation for Spec

Proceed to **Spec** for `ui-button-focus-primitives`.

The Spec should convert this proposal into RFC 2119 requirements and Given/When/Then scenarios for:

- `.btn` primitive ownership, import/cascade behavior, and low-specificity additive use,
- exact in-scope selector coverage for focus-visible normalization,
- TSX class-name-only constraints,
- preservation of page-specific hover, color, sizing, active state, dark-mode, and responsive behavior,
- non-goal enforcement, especially no global link/button restyle and no `design-responsividad` changes,
- review-budget enforcement with pause-before-Apply if the forecast exceeds 300 changed lines,
- verification expectations for lint/build, keyboard focus, dark mode, reduced motion, Playwright/manual route smoke checks, and diff audit.
