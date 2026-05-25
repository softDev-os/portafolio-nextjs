# CSS modularization plan

The site currently uses ordered global CSS files under `src/styles/`. This is intentional: selectors were preserved and split by concern to reduce regression risk without redesigning the site.

## Current import order

`src/app/layout.tsx` owns the global cascade:

```ts
import "@/styles/variables.css";
import "@/styles/reset.css";
import "@/styles/layout.css";
import "@/styles/sidebar.css";
import "@/styles/home.css";
import "@/styles/portfolio.css";
import "@/styles/blog.css";
import "@/styles/contact.css";
import "@/styles/pages.css";
import "@/styles/footer.css";
import "@/styles/responsive.css";
import "@/styles/dark-mode.css";
```

## Cascade rules

- Keep `variables.css` first: it defines tokens used everywhere else.
- Keep `reset.css` second: it establishes base element behavior and accessibility helpers.
- Keep route/component files before responsive and dark-mode overrides.
- Keep `responsive.css` near the end: it intentionally overrides many route/component rules.
- Keep `dark-mode.css` last: it overrides theme tokens and selected component styles.
- Do not rename selectors as part of a split unless there is a separate refactor plan.

## File responsibilities

| File | Responsibility |
| --- | --- |
| `variables.css` | design tokens, light theme variables |
| `reset.css` | reset/base styles, skip link, global focus behavior |
| `layout.css` | app shell, main content, generic page layout |
| `sidebar.css` | sidebar, nav, theme toggle, floating nav |
| `home.css` | home hero and home section styles |
| `portfolio.css` | case studies and workflow diagrams |
| `blog.css` | blog index and article detail styles |
| `contact.css` | contact page and contact cards/map styles |
| `pages.css` | shared interior-page scaffolding plus profile/credentials blocks |
| `footer.css` | footer |
| `responsive.css` | cross-route breakpoint overrides |
| `dark-mode.css` | dark theme token and selector overrides |

## Current status

The original monolithic global stylesheet has already been replaced by topic-based CSS files. The planning goal is satisfied for the current project scale.

The two remaining broad files are:

- `responsive.css`: broad by design because it centralizes breakpoint overrides.
- `pages.css`: still mixes shared page scaffolding with profile/about and credentials/curriculum sections.

## Optional next split

Only do this if `pages.css` becomes hard to review:

1. Keep existing imports through `contact.css` unchanged.
2. Keep shared page header/scaffolding rules in `pages.css`.
3. Move profile/about-specific blocks into `profile.css`.
4. Move curriculum/credentials-specific blocks into `credentials.css`.
5. Import both immediately after `pages.css` and before `footer.css`.
6. Leave `responsive.css` and `dark-mode.css` untouched until there is a specific regression or maintenance need.

Suggested order if this split happens:

```ts
import "@/styles/pages.css";
import "@/styles/profile.css";
import "@/styles/credentials.css";
import "@/styles/footer.css";
import "@/styles/responsive.css";
import "@/styles/dark-mode.css";
```

## Validation

Run after CSS changes:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For visual changes, also run:

```bash
pnpm test:e2e
```

Manual smoke targets:

- `/`
- `/perfil`
- `/credenciales`
- `/casos-reales`
- `/blog`
- `/contacto`

Check desktop, tablet, mobile, light mode, and dark mode.
