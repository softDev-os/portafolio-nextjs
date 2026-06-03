# Proposal: ui-visual-primitives

## Problem statement and motivation

After `ui-foundation-tuning`, the portfolio has a stable raw-CSS application foundation, but reusable visual patterns are still duplicated across page styles. Section title decorations, card-like surfaces, badges/tags, and button/focus treatments repeat with small local variations. This makes visual tuning slower and riskier because each future page polish can accidentally drift borders, radii, focus visibility, hover behavior, or dark-mode treatment.

The motivation for Unit 2 is to introduce a small, reviewable visual primitive layer that preserves the existing design language while making repeated patterns easier to maintain. The work should stay intentionally narrow: build the primitive layer and migrate only the safest repeated patterns before any page-by-page redesign or responsive retuning.

## Intent

Create the first slice of a raw-CSS visual primitive layer for common portfolio UI treatments without changing page content, route behavior, layout architecture, or responsive page-specific tuning.

This change should establish `primitives.css` as a design-system-style layer between reset/tokens and layout/page styles, then prove the layer with low-risk primitives:

1. section title decoration,
2. card surface,
3. badge/tag,
4. button/focus primitive only if implementation forecasting remains safely within the 300 changed-line review budget.

## Recommended Unit 2 scope

Use the Explore recommendation: **Option D — hybrid, first primitive slice**.

### In scope

- Create `src/styles/primitives.css`.
- Import `primitives.css` from `src/styles/index.css` after `reset.css` and before `layout.css`, preserving the existing global CSS cascade model documented by Next.js App Router global styles.
- Add a reusable section title decoration primitive for the dotted underline/mark pattern.
- Add a reusable card surface primitive for near-identical panel/card shells only.
- Add a reusable badge/tag primitive for near-identical inline pills/chips only.
- Optionally add a minimal button/focus primitive only if the Tasks/Apply forecast shows the total implementation can remain comfortably under 300 changed lines.
- Prefer additive primitive class names where that is safer than selector grouping, but keep React/TSX edits minimal and purely class-name additive.
- Preserve page-owned internal layout, spacing, responsive behavior, content, data, and component structure.

### Button/focus recommendation

The base header/card/badge slice is expected to consume most of the review budget. A full button primitive can easily add another 45–90 changed lines because button-like CTAs differ in size, radius, hover lift, and visual weight.

Recommendation: **defer the full button shape primitive by default** unless the next Spec/Tasks forecast leaves at least a ~50-line buffer under the 300 changed-line budget. If included, limit it to explicit focus-visible normalization for migrated interactive selectors; do not normalize all button sizes, radii, or hover motion in Unit 2.

## Non-goals

- No Tailwind migration.
- No shadcn migration.
- No full page redesign.
- No page-specific responsive retuning.
- No `/perfil` overflow fix.
- No broad spacing token migration.
- No broad shadow token migration.
- No broad radius token migration.
- No broad border-width normalization.
- No large React refactors.
- No route, data, metadata, or dark-mode hydration behavior changes.
- No `openspec/specs/design-responsividad/` changes.

## Candidate affected files and expected responsibility

| Candidate file | Expected responsibility in Unit 2 |
| --- | --- |
| `src/styles/index.css` | Import `primitives.css` after `reset.css` and before `layout.css` so primitives are available before layout/page selectors and later page styles can still override intentionally. |
| `src/styles/primitives.css` | New owner for primitive class definitions: section title decoration, card surface, badge/tag, and optional minimal button/focus primitive. Should not contain page-specific layout rules. |
| `src/styles/pages-headers.css` | Remove or reduce duplicated section title `::after` decoration declarations for top-level page headings when safely replaced by the primitive. Keep page header layout/spacing ownership. |
| `src/styles/pages-profile.css` | Remove or reduce duplicated dotted section title decorations and selected near-identical card surfaces for profile sections. Keep profile-specific grids, copy layout, and responsive behavior. |
| `src/styles/home.css` | Candidate for selected card and badge/tag migration only where declarations are near-identical (`case-card`, stack pills, badges). Keep home hero, control-room layout, pipeline layout, and home-specific dark/animation behavior unless explicitly primitive-owned later. |
| `src/styles/portfolio.css` | Candidate for selected card and badge/tag migration for case cards, metadata badges, and stack pills. Keep portfolio layout, gallery layout, and filter/page behavior. |
| `src/styles/blog.css` | Candidate for badge/tag migration for article category pills. Keep article/page typography and layout. |
| `src/styles/pages-misc.css` | Candidate for selected credential/card/tag surfaces where declarations match the primitive. Keep timeline, certificate, capability-card internals, and miscellaneous page-specific structure. |
| `src/styles/pages-services.css` | Candidate for selected card surfaces such as trust/review cards if they are near-identical. Keep services/reviews section layout. |
| `src/styles/pages-pricing.css` | Candidate for card surface migration for pricing boxes. Button styling should be deferred unless budget remains safe. |
| `src/styles/contact.css` | Candidate for selected contact card surfaces. Contact submit/focus primitive should be deferred unless budget remains safe. |
| `src/styles/dark-mode.css` | Only touched if primitive dark visual overrides are required due final import order. It should keep dark-theme visual differences, not structural primitive layout. |
| `src/app/page.tsx`, `src/app/perfil/page.tsx`, `src/app/credenciales/page.tsx`, `src/app/contacto/page.tsx`, `src/app/casos-reales/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx` | Candidate only for additive class names such as primitive utility classes. No content, data, control flow, component extraction, or route behavior changes. |

## Review workload forecast

Target review budget: **≤300 changed lines**.

Recommended base slice estimate:

- `src/styles/primitives.css`: +80 to +130 lines.
- `src/styles/index.css`: +1 line.
- CSS cleanup in existing files: -70 to -140 lines, with some replacement selectors/classes.
- Optional additive TSX class names for safe primitive adoption: +0 to +35 lines.

Expected base net review workload: **170–285 changed lines** depending on how many selectors are migrated.

Button/focus primitive estimate:

- Minimal focus-visible grouping only: +15 to +35 changed lines.
- Full button shape/hover primitive: +45 to +90 changed lines.

Because the base slice can already approach 300 changed lines, the proposal recommends **deferring the full button primitive** unless Spec/Tasks can prove the final implementation remains safely below budget. If the forecast exceeds 300 changed lines, pause before Apply and request a delivery decision.

## Success criteria

- `src/styles/primitives.css` exists and is imported after reset and before layout in `src/styles/index.css`.
- The primitive layer owns reusable visual treatments only; page-specific layout and responsive rules remain page-owned.
- Section title dot decoration duplication is reduced for the safest repeated headings.
- Selected near-identical card surfaces use the new card primitive without normalizing intentionally different page treatments.
- Selected near-identical badge/tag/pill treatments use the new badge/tag primitive without changing semantic markup.
- Button/focus work is either kept within budget as a minimal focus-visible primitive or explicitly deferred to a later unit.
- No Tailwind/shadcn, route/data, full redesign, `/perfil` overflow, broad token migration, or `openspec/specs/design-responsividad/` changes are present.
- The implementation remains at or below the 300 changed-line review budget unless an explicit delivery decision approves otherwise.

## Verification plan

Automated checks for the Apply/Verify phases:

1. `npm run lint` must exit successfully with no new lint violations attributable to Unit 2.
2. `npm run build` must exit successfully with no new build errors or warnings attributable to Unit 2.
3. If shell access is used in later phases, run `git diff --check` to catch whitespace/conflict-marker issues.

Manual smoke checks for the Apply/Verify phases:

- Routes: `/`, `/perfil`, `/credenciales`, `/contacto`, `/casos-reales`, `/blog`, and representative blog detail/error/not-found states if touched.
- Viewports: desktop, tablet, mobile, and small mobile.
- Light and dark theme checks for migrated card surfaces, badges, and decorated headings.
- Keyboard focus checks for any migrated interactive elements, especially if the optional focus primitive is included.
- Reduced-motion smoke check to confirm migrated primitive transitions do not fight the global reduced-motion baseline.
- Visual comparison of section title decorations, card surfaces, and badges before/after to confirm the primitive layer consolidates styles without redesigning pages.

## Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Cascade regressions because `primitives.css` imports before page styles | Medium | Medium | Keep primitives additive and low-specificity; preserve page-specific overrides; manually verify representative routes. |
| Visual regression from normalizing borders, radii, or shadows | Medium | Medium | Migrate only near-identical selectors first; avoid broad radius/shadow/border token migration. |
| Dark-mode differences change because `dark-mode.css` imports last | Medium | Medium | Keep dark visual overrides in `dark-mode.css` when needed; do not move structural ownership into dark mode. |
| Review workload exceeds 300 changed lines | Medium | Medium | Start with section titles, cards, and badges; defer full button primitive if the forecast approaches the budget. |
| Accessibility regression in button/link focus states | Low | High | Do not remove existing focus-visible rules; if optional focus work is included, verify keyboard navigation manually. |
| Primitive class churn touches too many TSX files | Medium | Medium | Prefer the smallest additive class set; use grouped CSS selectors where safer and clearer. |
| Reduced-motion behavior conflicts with primitive transitions | Low | Medium | Preserve Unit 1 global reduced-motion baseline and add primitive-specific reduced-motion only where necessary. |

## Rollback plan

Rollback should be straightforward because Unit 2 is intended to be a small CSS primitive layer with optional additive class names:

1. Remove the `@import "./primitives.css";` line from `src/styles/index.css`.
2. Remove `src/styles/primitives.css`.
3. Restore pre-change local section title decoration, card surface, and badge/tag declarations in page CSS files from version control.
4. Remove any additive primitive class names from TSX files if they were introduced.
5. Revert any dark-mode primitive visual overrides if they were added.
6. Re-run lint/build and the representative manual smoke checks to confirm the pre-Unit 2 visual state is restored.

## Recommendation for next phase

Proceed to **Spec** for `ui-visual-primitives`.

The Spec should convert this proposal into RFC 2119 requirements and Given/When/Then scenarios for:

- primitive layer import order and ownership,
- section title decoration primitive behavior,
- card surface primitive behavior,
- badge/tag primitive behavior,
- budget-gated button/focus primitive behavior or explicit deferral,
- non-goal enforcement,
- verification expectations.
