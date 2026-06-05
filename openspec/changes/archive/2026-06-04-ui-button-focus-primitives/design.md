# Design: ui-button-focus-primitives

## 1. Architecture Overview

This change adds a narrow raw-CSS button and keyboard-focus primitive slice centered on `src/styles/primitives.css`.

### `primitives.css` ownership

`primitives.css` is already imported after `reset.css` and before layout/page styles:

```css
variables → reset → primitives → layout → sidebar → home → portfolio → blog → contact → pages-* → footer → error → responsive-* → dark-mode
```

That location is the correct owner for reusable visual primitives because:

- `reset.css` still owns base element resets and the global reduced-motion baseline.
- `primitives.css` can define reusable `.btn` and shared `:focus-visible` treatments before page CSS loads.
- Later page stylesheets can intentionally override primitive defaults for local sizing, color, hover, active, and responsive behavior.
- `dark-mode.css` remains last and continues to own true dark-theme visual differences.

### Interaction with page CSS

The `.btn` primitive is additive and low-specificity. Existing page classes remain on every element. Where `.btn` and a page selector set the same property, the later page stylesheet wins. This is intentional: the primitive provides a fallback/default shape, while page CSS preserves current product-specific differences.

Page-owned behavior that must remain page-owned:

- hover transforms, hover fills, hover opacity, and hover shadows,
- font-size and font-weight,
- local padding/radius exceptions where they differ from the default button shape,
- active states such as `.portfolio__option--active .portfolio__link`,
- responsive sizing adjustments,
- dark-mode overrides.

### Interaction with `sidebar.css`

The current shared gold-ring grouping lives in `sidebar.css` even though it covers non-sidebar selectors. The implementation should move that grouped rule into `primitives.css` and extend it there. Sidebar-specific focus remains in `sidebar.css`.

`sidebar.css` must continue to own `.sidebar__theme-toggle`, including its existing white focus outline:

```css
.sidebar__theme-toggle:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
```

Do not include `.sidebar__theme-toggle` in the gold-ring grouping.

### Interaction with `dark-mode.css`

No new `[data-theme="dark"]` rules should be added for this change. `.btn` base should not set dark-mode-specific colors. Variants may set light/dark token-based defaults, but any true dark-theme visual difference remains owned by `dark-mode.css` or existing page dark blocks.

## 2. `.btn` API and Property Contract

### Base class: `.btn`

| Property | Value | Ownership reason |
| --- | --- | --- |
| `display` | `inline-flex` | Shared button/link-button layout. |
| `align-items` | `center` | Vertically centers inline content/icons. |
| `justify-content` | `center` | Safe default for button content alignment. |
| `gap` | `0.6rem` | Matches current hero CTA icon/text spacing. |
| `padding` | `1rem 2.4rem` | Default CTA pill padding; page exceptions may override. |
| `border-radius` | `3.2rem` | Default pill shape matching current hero CTA; page exceptions may override. |
| `text-decoration` | `none` | Shared link-button affordance. |
| `cursor` | `pointer` | Explicit button/link-button affordance. |
| `transition` | `transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease, opacity 0.2s ease` | Provides a default transition baseline covered by global reduced motion. |

### Variants

| Variant | Create/defer | Exact responsibility | Notes |
| --- | --- | --- | --- |
| `.btn--primary` | **Create** | `background: var(--principal-color)`, `color: #0c0d1c`, `border: 0`. | Used additively on hero primary CTAs, error primary, and not-found link. Later page selectors may override text color. |
| `.btn--outline` | **Create** | `background: transparent`, `border: 2px solid var(--terciario-color)`, `color: var(--terciario-color)`. | Used additively on hero secondary CTAs and error secondary. Later page selectors may override border/color. |
| `.btn--subtle` | **Defer** | No implementation in this slice. | Existing “subtle” behavior is not a stable variant: error/not-found use opacity hover, blog back is a text link, and portfolio filters have active/filter semantics. Creating this now would imply hover/visual normalization, which is out of scope. |

### `.btn` and variants must NOT set

| Do not set | Reason |
| --- | --- |
| global `a`/`button` styles | No global restyle of links/buttons. |
| hover rules | Hover normalization is explicitly out of scope. |
| active/current state rules | Page components own active states. |
| `font-size` / `font-weight` | Current elements intentionally vary. |
| `margin`, layout width, grid/flex parent behavior | Page layout remains page-owned. |
| responsive breakpoints | No broad responsive retuning. |
| dark-mode selector blocks | `dark-mode.css` imports last and owns theme differences. |
| route/content/data behavior | TSX changes are class-name-only. |

## 3. Focus-Visible Grouping Plan

### Shared gold-ring rule in `primitives.css`

Move the current sidebar grouped focus rule into `primitives.css`, extend it, and use the established gold-ring style:

```css
.btn:focus-visible,
.nav-float__link:focus-visible,
.home-hero__cta-link:focus-visible,
.contact__data:focus-visible,
.footer__link:focus-visible,
.footer__social-link:focus-visible,
.form__button:focus-visible,
.error-btn-primary:focus-visible,
.error-btn-secondary:focus-visible,
.not-found__link:focus-visible,
.portfolio__link:focus-visible,
.blog-article__back:focus-visible,
.article__link:focus-visible {
  outline: 0.3rem solid var(--principal-color);
  outline-offset: 0.35rem;
  box-shadow: 0 0 0 0.6rem rgba(247, 185, 53, 0.18);
}
```

### Move vs duplicate decision

**Move, do not duplicate.** Remove the existing grouped rule from `sidebar.css` after adding the extended rule to `primitives.css`. This avoids split ownership and keeps shared keyboard focus in the primitive layer.

### Sidebar theme toggle exception

Keep `.sidebar__theme-toggle:focus-visible` exactly under `sidebar.css` ownership and do not add it to the gold-ring group. Its white outline is intentional because the control sits on the sidebar surface.

### Notes on later page focus rules

Some page selectors already group `:hover` and `:focus-visible`, especially `.home-hero__cta-link--primary` and `.home-hero__cta-link--secondary`. This design does not normalize those hover/focus effects. The shared ring supplies the keyboard-visible outline/glow, while page CSS may continue to supply page-specific focus transforms/color/shadow where already present.

## 4. TSX Additive Class Plan

All TSX changes in Apply must be class-name-only. No JSX structure, content, data, control flow, route, metadata, or component extraction changes.

### Add `.btn` / variants

| File | Element(s) | New class additions |
| --- | --- | --- |
| `src/app/page.tsx` | `/casos-reales` hero CTA | `btn btn--primary` |
| `src/app/page.tsx` | `/contacto` hero CTA | `btn btn--outline` |
| `src/app/perfil/page.tsx` | primary hero CTA | `btn btn--primary` |
| `src/app/perfil/page.tsx` | secondary hero CTA | `btn btn--outline` |
| `src/app/contacto/page.tsx` | external WhatsApp CTA | `btn btn--primary` |
| `src/app/contacto/page.tsx` | cases CTA | `btn btn--outline` |
| `src/app/blog/page.tsx` | primary CTA | `btn btn--primary` |
| `src/app/blog/page.tsx` | secondary CTA | `btn btn--outline` |
| `src/app/blog/[slug]/page.tsx` | primary CTA | `btn btn--primary` |
| `src/app/blog/[slug]/page.tsx` | secondary CTA | `btn btn--outline` |
| `src/app/casos-reales/page.tsx` | contact CTA | `btn btn--outline` |
| `src/app/error.tsx` | retry button | `btn btn--primary` |
| `src/app/error.tsx` | home recovery link | `btn btn--outline` |
| `src/app/not-found.tsx` | home recovery link | `btn btn--primary` |

Recommended class string shape: append the primitive classes to existing class strings, for example:

```tsx
className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"
```

Class order inside the string is not the cascade mechanism; stylesheet import order is. Appending keeps the diff easy to review.

### No `.btn` adoption

| Selector | Reason |
| --- | --- |
| `.article__link` | It is an inline text link inside an article heading, not a button-shaped control. Focus ring only. |
| `.blog-article__back` | It is a text back link. Focus ring only. |
| `.portfolio__link` | CSS exists, but no current TSX usage was found in `src/app/casos-reales/page.tsx`; focus rule still covers the selector for legacy/future use. |
| `.form__button` | CSS exists, but no current form submit element was found in `src/app/contacto/page.tsx`; focus rule still covers the selector for legacy/future use. |
| `.contact__data`, `.footer__link`, `.footer__social-link`, `.nav-float__link` | Already-covered focus targets; not button primitive adopters in this slice. |

## 5. CSS Migration Plan by File

| File | Planned source change in Apply | What remains page-owned |
| --- | --- | --- |
| `src/styles/primitives.css` | Add `.btn`, `.btn--primary`, `.btn--outline`; defer `.btn--subtle`; add the extended shared gold-ring `:focus-visible` group. | No page layout, no responsive rules, no dark-mode blocks, no hover normalization. |
| `src/styles/sidebar.css` | Remove the old shared grouped focus rule after it is moved to `primitives.css`. Keep `.sidebar__theme-toggle:focus-visible` unchanged. | Sidebar layout, nav-float structure/hover, theme-toggle structure and white focus outline. |
| `src/styles/home.css` | Optionally reduce duplicated hero CTA base/variant declarations only where `.btn`, `.btn--primary`, and `.btn--outline` exactly replace them without visual drift. Keep this conservative. | CTA font-size/font-weight, hover transform/shadow/fill, responsive CTA sizing, reduced-motion block, dark-mode page details. |
| `src/styles/contact.css` | No local focus rule required if the primitive grouped rule includes `.form__button:focus-visible`. Do not remove `.form__button` styles because the TSX element is not currently present. | Contact card layout, form/button local sizing, form input focus, hover fill, reduced-motion block. |
| `src/styles/error.css` | No local focus rule required if the primitive grouped rule includes `.error-btn-primary` and `.error-btn-secondary`. Keep local radius, font, color, border, and opacity hover. | Recovery button visual weight and opacity hover. |
| `src/styles/pages-misc.css` | No local focus rule required if the primitive grouped rule includes `.not-found__link`. Keep local margin, typography, color, radius, and opacity hover. | Not-found layout and recovery-link visual treatment. |
| `src/styles/portfolio.css` | No local focus rule required if the primitive grouped rule includes `.portfolio__link`. Do not add `.btn` unless a current TSX usage reappears and sizing is rechecked. | Filter link sizing, active state, hover fill/lift, reduced-motion block. |
| `src/styles/blog.css` | No local focus rule required if the primitive grouped rule includes `.blog-article__back` and `.article__link`. Do not add `.btn` to text links. | Article-link typography, title hover color, back-link underline hover. |
| `src/styles/dark-mode.css` | No change. | All true dark-theme visual differences. |
| responsive CSS files | No change. | Existing responsive behavior. |

## 6. Accessibility Design

### Keyboard Tab matrix

| Route/state | In-scope keyboard targets | Expected focus result |
| --- | --- | --- |
| `/` | primary and secondary hero CTAs | Visible gold ring via `:focus-visible`; no ring from mouse click alone. |
| `/perfil` | primary and secondary CTAs | Visible gold ring; existing hover behavior unchanged. |
| `/contacto` | contact data links, WhatsApp CTA, cases CTA; `.form__button` if reintroduced | Existing contact data ring retained; CTA/form selector ring normalized. |
| `/casos-reales` | contact CTA; `.portfolio__link` if filter links are present in a future/legacy state | CTA ring visible; filter active state preserved if filters exist. |
| `/blog` | article title links, primary CTA, secondary CTA | Article links receive ring; CTA links retain ring. |
| `/blog/[slug]` | back link, primary CTA, secondary CTA | Back link and CTAs receive ring. |
| `/not-found` | recovery link | Recovery link receives ring. |
| Error boundary | retry button and home recovery link | Both recovery actions receive ring. |

### WCAG 2.4.7 focus visible

The shared rule uses `:focus-visible` and the established high-visibility gold outline/glow:

- `outline: 0.3rem solid var(--principal-color)`
- `outline-offset: 0.35rem`
- `box-shadow: 0 0 0 0.6rem rgba(247, 185, 53, 0.18)`

This satisfies the focus-visible intent for keyboard users without broad global selectors.

### No mouse-only focus ring

Do not add `:focus` focus-ring rules. All normalized rings must use `:focus-visible`, so mouse/touch activation does not show a keyboard focus ring by click alone.

## 7. Dark Mode and Reduced Motion Strategy

### Dark mode

- Do not add dark-mode selectors to `primitives.css`.
- Use existing tokens such as `var(--principal-color)` and `var(--terciario-color)`.
- Because `dark-mode.css` imports last, token and dark-theme overrides continue to win.
- Manually smoke test the gold ring on dark backgrounds.

### Reduced motion

- Keep the existing global reduced-motion baseline in `reset.css` as the source of truth.
- `.btn` may define transitions, but they are covered by:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Do not add a primitive-specific reduced-motion block unless Apply introduces a new transform/opacity behavior not already present. This design introduces no new hover transform or animation.

## 8. Review Workload Forecast and Fail-Stop

Target budget: **≤300 changed lines**.

| File | Forecast |
| --- | ---: |
| `src/styles/primitives.css` | +35 to +50 |
| `src/styles/sidebar.css` | -5 to -8 |
| `src/styles/home.css` | 0 to -15, depending on conservative dedupe |
| `src/styles/contact.css` | 0 |
| `src/styles/error.css` | 0 |
| `src/styles/pages-misc.css` | 0 |
| `src/styles/portfolio.css` | 0 |
| `src/styles/blog.css` | 0 |
| TSX class additions across listed files | +14 to +25 changed lines |
| **Expected total** | **~55 to 95 changed lines** |

Fail-stop rule for Tasks/Apply: if the pre-apply forecast exceeds **300 changed lines**, stop and request a delivery decision before implementation.

## 9. Risks, Tradeoffs, and Rollback

| Risk/tradeoff | Impact | Mitigation |
| --- | --- | --- |
| Primitive defaults cause visual drift | Medium | Keep existing page classes; page CSS imports later; only dedupe where values match exactly. |
| `.btn--subtle` is underdefined | Medium | Defer it; do not create a variant that would normalize hover/opacity behavior. |
| Focus group moves earlier in the cascade than sidebar | Low | The old sidebar group already loaded before most page CSS; verify nav/contact/footer/home focus after move. |
| Home CTA page `:focus-visible` rules may continue to add page-specific shadow/fill | Low | Preserve existing behavior; the shared ring still provides visible outline. |
| TSX churn across several pages | Medium | Restrict to additive class strings only. |
| Legacy CSS selectors are currently unused (`.form__button`, `.portfolio__link`) | Low | Keep focus coverage in the primitive group to satisfy the spec and protect future reintroduction. |

Rollback is straightforward:

1. Remove `.btn`, `.btn--primary`, `.btn--outline`, and the extended focus group from `primitives.css`.
2. Restore the old grouped focus rule in `sidebar.css` if it was removed.
3. Restore any hero CTA declarations removed during conservative dedupe.
4. Remove additive `btn` / variant class names from TSX files.
5. Re-run lint/build and keyboard smoke checks.

## 10. Recommendation for Tasks

Proceed to Tasks with one implementation unit under the 300-line budget:

1. Add `.btn`, `.btn--primary`, and `.btn--outline` in `primitives.css`; explicitly defer `.btn--subtle`.
2. Move and extend the shared gold-ring `:focus-visible` group from `sidebar.css` to `primitives.css`.
3. Preserve `.sidebar__theme-toggle:focus-visible` in `sidebar.css`.
4. Add `.btn`/variant classes to the exact TSX elements listed above, class-name-only.
5. Perform only conservative CSS dedupe in `home.css` if values are exactly replaced by primitives.
6. Verify with `npm run lint`, `npm run build`, route keyboard checks, dark-mode smoke checks, reduced-motion smoke checks, and a diff audit for non-goals.
