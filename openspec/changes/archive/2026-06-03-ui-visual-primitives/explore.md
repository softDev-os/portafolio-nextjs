# Explore — ui-visual-primitives

## Status

Exploration complete. No source app/CSS files were changed.

## Context

Unit 2 follows the verified and archived `ui-foundation-tuning` work. The foundation layer is now stable enough to explore reusable visual primitives before page-by-page tuning.

Current constraints:

- Keep the raw CSS architecture.
- Do not migrate to Tailwind or shadcn.
- Keep SDD interactive and commit per reviewable unit.
- Keep implementation units near the 300 changed-line review budget.
- Do not modify or depend on pre-existing `openspec/specs/design-responsividad/`.
- Do not fix the known `/perfil` 360px horizontal overflow in this unit; record it as follow-up.

## Current-State Inventory

### Buttons and CTAs

Button-like patterns are scattered across page-specific files:

| Primitive | File | Selectors |
| --- | --- | --- |
| Home primary/secondary CTA | `src/styles/home.css` | `.home-hero__cta-link--primary`, `.home-hero__cta-link--secondary` |
| Pricing CTA | `src/styles/pages-pricing.css` | `.prices__btn` |
| Contact submit | `src/styles/contact.css` | `.form__button` |
| Portfolio filter pill | `src/styles/portfolio.css` | `.portfolio__link` |
| Not found link | `src/styles/pages-misc.css` | `.not-found__link` |
| Error buttons | `src/styles/error.css` | `.error-btn-primary`, `.error-btn-secondary` |

Observed duplication:

- Pill/rounded button shapes repeat with inconsistent radii: `2rem`, `3rem`, `3.2rem`, `4rem`, `999px`, `0.8rem`.
- Hover lift repeats with different values: `translateY(-2px)`, `translateY(-3px)`, `translateY(-1rem)`, opacity fades, and shadow changes.
- Explicit `:focus-visible` coverage is incomplete. Several interactive selectors still rely on browser defaults.

### Cards and Panels

Card-like surfaces repeat across almost every page CSS file:

| Primitive | File | Selectors |
| --- | --- | --- |
| Control room / case cards / pipeline | `src/styles/home.css` | `.control-room`, `.case-card`, `.home-pipeline` |
| Profile method/principles | `src/styles/pages-profile.css` | `.method__step`, `.principles__item` |
| Services trust/review cards | `src/styles/pages-services.css` | `.trust__item`, `.reviews__review` |
| Credentials panels/cards | `src/styles/pages-misc.css` | `.curriculum__left`, `.curriculum__right`, `.timelines__timeline`, `.capability-card`, `.certificates__certificate` |
| Portfolio cards/gallery | `src/styles/portfolio.css` | `.portfolio__case-card`, `.gallery__item` |
| Pricing boxes | `src/styles/pages-pricing.css` | `.prices__box` |
| Contact cards | `src/styles/contact.css` | `.contact__data`, `.contact__qualified-box` |

Observed duplication:

- Card surface declarations repeat ~15 times with slight variations:
  - `border: 1px / 0.1rem / 2px solid var(--color-border-reviews)`
  - `border-radius` around `1.2rem`–`2rem`
  - background often `var(--color-principal)` or `var(--background-color-contact)`
  - hover border-color / shadow patterns recur
- Some variations are meaningful page intent; others are accidental drift.

### Section Headers

The dotted underline title decoration is the highest-value consolidation target.

Repeated selectors include:

- `src/styles/pages-headers.css`: `.about__title::after`, `.curriculum__title::after`, `.blog__title::after`, `.contact__title::after`
- `src/styles/pages-profile.css`: `.services__title::after`, `.method__title::after`, `.principles__title::after`, `.reviews__title::after`, `.clients__title::after`, `.prices__title::after`, `.extra__title::after`, `.trust__title::after`
- Related title/header patterns appear in `src/styles/pages-misc.css`.

Observed duplication:

- All use a similar `repeating-radial-gradient` dot pattern with `var(--principal-color)`.
- Only size/position differ slightly (`3rem × 2rem` vs `5rem × 3rem`, etc.).
- This can likely be consolidated with the smallest visual regression risk.

### Badges, Chips, Tags, and Pills

Repeated inline pill/tag patterns exist in:

| File | Selectors |
| --- | --- |
| `src/styles/home.css` | `.case-card__badge`, `.case-card__stack li` |
| `src/styles/portfolio.css` | `.portfolio__case-index`, `.portfolio__metadata-badge`, `.portfolio__case-stack li` |
| `src/styles/blog.css` | `.blog-article__category` |
| `src/styles/pages-misc.css` | `.capability-card__tools li`, `.knowledges__option` |

Observed duplication:

- Most use `border-radius: 999px` and yellow accent backgrounds with slightly different alpha values.
- Some use uppercase + letter-spacing + small font-weight patterns.
- `knowledges__option` is visually related but flatter and probably page-specific.

### Metric, Timeline, and Content Blocks

Some block types are repeated visually but semantically page-specific:

- `.timelines__timeline` in `pages-misc.css`
- `.capability-card` in `pages-misc.css`
- `.extra__info` in `pages-misc.css`
- `.certificates__certificate` in `pages-misc.css`

These are candidates for card surface consolidation, but their internal layout should remain page-owned in Unit 2.

### Surfaces, Shadows, Radii, and Spacing

Surface styling is not yet tokenized beyond existing color variables.

Observed drift:

- Many border-radius values: `0.3rem`, `0.5rem`, `0.8rem`, `1rem`, `1.2rem`, `1.4rem`, `1.5rem`, `1.6rem`, `1.8rem`, `2rem`, `3rem`, `3.2rem`, `4rem`, `999px`, and larger image radii.
- Shadows exist as local one-offs rather than named tokens.
- Spacing is ad hoc with common values around `1rem`, `1.2rem`, `1.4rem`, `1.5rem`, `1.6rem`, `2rem`, `2.4rem`, `3rem`.

This suggests future token work, but Unit 2 should avoid a broad token migration to stay reviewable.

### Hover, Focus, and Reduced Motion

Current hover patterns are inconsistent but functional. Focus-visible support is partial.

Good existing coverage:

- `.nav-float__link:focus-visible`
- `.home-hero__cta-link:focus-visible`
- `.contact__data:focus-visible`
- `.footer__link:focus-visible`
- `.footer__social-link:focus-visible`
- `.sidebar__theme-toggle:focus-visible`
- `.skip-link:focus-visible`

Missing or weak explicit focus-visible coverage:

- `.form__button`
- `.prices__btn`
- `.portfolio__link`
- `.error-btn-primary` / `.error-btn-secondary`
- `.not-found__link`

Reduced motion has a global baseline in `reset.css` from Unit 1. Component-specific overrides remain in multiple files and should generally be preserved unless a primitive directly owns a transition.

### Dark Mode

Current dark-mode architecture:

1. `src/styles/dark-mode.css` owns global theme variable overrides and several component-specific dark overrides.
2. `src/styles/home.css` still contains home-specific `[data-theme="dark"]` blocks for control-room, case cards, and pipeline.

Opportunity:

- If card surfaces become primitive-owned, dark card surface overrides can eventually be centralized.
- Unit 2 should be careful: `dark-mode.css` imports last, so dark primitive overrides must either live there or be designed around existing cascade order.

## Duplication and Opportunity Map

### Highest-Value Targets

1. **Section title dot decoration**
   - Best first target.
   - High duplication, low behavioral risk.
   - Can be consolidated with minimal or no React changes if using grouped selectors, or cleaner React changes if adding a shared class.

2. **Card surface base**
   - High duplication, moderate visual risk.
   - Best handled as additive primitive class plus removal of redundant local declarations.
   - Requires care with cascade because existing page selectors may override primitives.

3. **Badge/tag base**
   - Medium duplication, low-to-moderate risk.
   - Good candidate after card/header primitives.

4. **Button base and focus-visible coverage**
   - Medium duplication, high accessibility value.
   - Riskier because button sizing/shape contributes strongly to page identity.
   - Should be scoped to explicit interactive primitives, not all links.

5. **Dark card surface overrides**
   - Useful only after card primitives exist.
   - Should likely remain in `dark-mode.css` due import order.

## Architecture Options

### Option A — New `src/styles/primitives.css`

Create a dedicated primitive layer imported after reset and before layout:

```css
@import "./variables.css";
@import "./reset.css";
@import "./primitives.css";
@import "./layout.css";
```

Pros:

- Clear design-system layer.
- Keeps reset/tokens/layout responsibilities separate.
- Makes Unit 2 traceable and future-friendly.

Cons:

- Existing page selectors import later and can override primitive declarations.
- Clean use usually requires additive class names in TSX.

### Option B — New `src/styles/components.css`

Pros:

- Familiar name for UI elements.

Cons:

- Ambiguous in a React project: these are not React components.
- Could become a dumping ground for page-specific blocks.

### Option C — Reuse existing page CSS files only

Pros:

- CSS-only; avoids TSX class changes.
- Lowest short-term churn.

Cons:

- Does not create a real primitive layer.
- Duplication remains spread across files.
- Harder to scale into future units.

### Option D — Hybrid

Create `primitives.css`, but limit Unit 2 to one or two low-risk primitives first.

Pros:

- Best balance of architecture and review size.
- Allows the user to visually approve primitive direction before broad migration.
- Keeps changed lines under control.

Cons:

- Does not solve all duplication in one unit.

## Recommended Unit 2 Boundary

Use **Option D: hybrid, first primitive slice**.

Recommended first proposal scope:

1. Create `src/styles/primitives.css`.
2. Import it after `reset.css` and before `layout.css`.
3. Add a small set of visual primitives:
   - section title dot decoration primitive
   - card surface primitive
   - badge/tag primitive
   - button/focus primitive only if line budget permits
4. Migrate only the selectors that are safest and visibly repeated:
   - section header dot decoration across `pages-headers.css` and `pages-profile.css`
   - selected card surfaces where declarations are near-identical
   - selected badge/tag styles where declarations are near-identical
5. Keep page layout, responsive rules, and React structure unchanged except for additive class names if needed.

Estimated first unit:

- `primitives.css`: +90 to +140 lines
- existing CSS cleanup: -80 to -160 lines
- optional TSX additive classes: +10 to +40 lines
- total changed lines: likely 180–300 depending on how many selectors are migrated

## Non-Goals

Unit 2 should not include:

- Tailwind or shadcn migration.
- Full page redesign.
- Page-specific responsive retuning.
- `/perfil` overflow fix.
- Broad spacing-token or shadow-token migration.
- Removing all dark-mode duplication at once.
- Large React refactors.
- Changes to `openspec/specs/design-responsividad/`.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Cascade regressions | Medium | Import primitives early; preserve page-specific overrides; verify visually. |
| Visual regression from normalizing borders/radii | Medium | Migrate only near-identical selectors first; avoid forced radius normalization. |
| Dark-mode override order | Medium | Keep dark primitive overrides in `dark-mode.css` or account for final import order. |
| Accessibility regressions | Medium | Add focus-visible checks for migrated buttons/links. |
| Class naming churn | Medium | Prefer additive classes and small migration scope. |
| Review workload >300 lines | Medium | Start with headers/cards/badges only; defer button migration if needed. |
| Reduced-motion conflicts | Low | Preserve global reset baseline and component-specific transform overrides. |

## Verification Ideas

Automated:

- `npm run lint`
- `npm run build`
- `npm test`
- `npm run test:e2e` if available
- `git diff --check`
- grep checks for duplicated title dot patterns after migration
- grep checks for expected primitive class usage if React classes are added

Manual or browser smoke:

- Routes: `/`, `/perfil`, `/credenciales`, `/contacto`, `/casos-reales`, `/blog`
- Viewports: desktop, tablet, mobile, small mobile
- Dark mode toggle on representative pages
- Keyboard focus checks on migrated buttons/links
- Reduced-motion smoke for migrated hover/transition primitives
- Screenshot comparison for section headers, cards, and badges

## Follow-Ups Outside Unit 2

1. `/perfil` 360px horizontal overflow
   - Known exploratory warning from Unit 1 Verify.
   - Should be a focused page-specific responsive bugfix, not part of visual primitives.

2. Spacing token extraction
   - Many ad hoc spacing values exist, but a token migration would be broader than Unit 2.

3. Shadow token extraction
   - Several shadow values repeat but need visual design decisions.

4. Border-width/radius normalization
   - Useful later, but risky if bundled with primitives.

5. Move home dark-mode overrides
   - `home.css` still owns page-specific dark overrides. This can move later if card primitives stabilize.

6. Reduced-motion deduplication
   - Global baseline exists; remaining component blocks can be audited after primitives land.

## Recommendation

Proceed to Proposal for `ui-visual-primitives` with a narrow first work unit:

- create `src/styles/primitives.css`
- introduce section-title decoration, card surface, and badge/tag primitives
- only include button/focus primitive if the proposal can keep the changed-line budget under 300
- preserve page-specific layout and responsive behavior
- treat `/perfil` overflow as a separate follow-up
