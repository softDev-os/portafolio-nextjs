# Agent skill usage for `portafolio-nextjs`

This project can be worked from two runtimes:

- **Pi local**: `/home/softdev/work/portafolio-nextjs`
- **Hermes VPS**: `/home/admin_allpc/hermes-workspace/portafolio-nextjs`

Project-scoped skills are versioned in `.agents/skills/` and are available in both runtimes after `git pull`.

## Primary project skills

Use these first for normal work in this repo:

| Work type | Skills to load |
| --- | --- |
| Next.js routes, metadata, sitemap, images, fonts, RSC boundaries | `.agents/skills/next-best-practices/SKILL.md` |
| React/Next performance, bundle size, client boundary reduction | `.agents/skills/react-best-practices/SKILL.md` |
| SEO, canonical, robots, Open Graph, structured data, sitemap | `.agents/skills/seo/SKILL.md` |
| Accessibility, keyboard/focus, semantic headings, ARIA | `.agents/skills/accessibility/SKILL.md` |
| UI/design polish without redesigning blindly | `.agents/skills/frontend-design/SKILL.md` |
| Component API/refactor patterns | `.agents/skills/composition-patterns/SKILL.md` |
| Type-heavy data/content modeling | `.agents/skills/typescript-advanced-types/SKILL.md` |

## Conditional project skills

Use only when the task really calls for them:

| Work type | Skills to load | Notes |
| --- | --- | --- |
| Cache Components / PPR / `use cache` | `.agents/skills/next-cache-components/SKILL.md` | Not default; current site is mostly static. |
| Next.js version upgrades | `.agents/skills/next-upgrade/SKILL.md` | Use only for framework upgrades. |
| Tailwind migration or Tailwind utilities | `.agents/skills/tailwind-css-patterns/SKILL.md` | Current UI uses modular CSS, not Tailwind classes. |
| API routes / backend / webhooks | `.agents/skills/nodejs-backend-patterns/SKILL.md`, `.agents/skills/nodejs-best-practices/SKILL.md` | Current site has no backend. |

## Runtime-specific helper skills

### Pi local

Useful Pi-local skills/tools:

| Work type | Skill |
| --- | --- |
| Delegation / reviewer / worker flows | `pi-subagents` |
| LSP diagnostics and symbol navigation | `lsp-navigation` |
| AST-aware searches/replacements | `ast-grep` |
| Commits | `commit-work`, `work-unit-commits` |
| PRs | `branch-pr`, `github-pr` |
| Debugging | `systematic-debugging`, `diagnose` |
| VPS access | `vps-ssh` |
| Playwright test authoring | `playwright` |

### Hermes VPS

Useful Hermes-side skills discovered on the VPS:

| Work type | Skill |
| --- | --- |
| Codebase inspection | `codebase-inspection` |
| Website audit | `website-audit` |
| PRD handoff / requirements | `prd-discovery-and-handoff`, `product-requirements-document` |
| Planning | `plan`, `writing-plans`, `spike` |
| TDD / debugging | `test-driven-development`, `systematic-debugging`, `diagnose` |
| GitHub work | `github-code-review`, `github-pr-workflow`, `github-issues`, `github-repo-management` |
| Hermes agent work | `hermes-agent`, `subagent-driven-development` |
| Research | `research-brief`, `llm-wiki` |

Hermes also sees the project-scoped `.agents/skills/*` inside `/home/admin_allpc/hermes-workspace/portafolio-nextjs`, so project skills should be preferred over generic/global skills when both match.

## Recommended skill combinations

| Task | Load these skills |
| --- | --- |
| SEO change | `next-best-practices`, `seo` |
| Accessibility pass | `accessibility`, `react-best-practices` |
| Component/refactor work | `react-best-practices`, `composition-patterns`, `next-best-practices` |
| CSS/UI polish | `frontend-design`, `accessibility`, `react-best-practices` |
| Content/data model | `typescript-advanced-types`, `next-best-practices` |
| Tests | `playwright` plus project code context |
| Large feature | SDD skills / OpenSpec flow first, then project skills above |

## Validation commands

From Pi local:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

From Hermes VPS:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 22
cd ~/hermes-workspace/portafolio-nextjs
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Run `corepack pnpm test:e2e` on the VPS only if Playwright Chromium is installed there.

## Guardrails

- Do not treat the PRD/audit docs as truth without verifying production and source.
- Do not redesign the site from scratch unless explicitly approved.
- Prefer small, reviewable commits.
- Keep project skills versioned; do not edit upstream skill content just to fix whitespace.
- Prefer project `.agents/skills` over user/global skills when they overlap.
