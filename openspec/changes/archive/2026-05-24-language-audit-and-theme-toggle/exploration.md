## Exploration: language-audit-and-theme-toggle

### Current State

The site is a Next.js 16.2 App Router portfolio (React 19) targeting Colombian/Spanish-speaking prospects (`es_CO` locale, `html lang="es"`). Two unrelated concerns were explored:

**Language**: Every page and component is authored in Spanish except case-study data (titles, audience, problem/solution/outcomes, evidence notes, stack) which is in English — intentional for international technical audience. The navbar has one English label (`"Home"`). All metadata, CTAs, sections, and editorial body copy are Spanish.

**Theming**: The CSS system uses a flat `:root` variable set with ~20 color tokens. All are light-mode only. No `[data-theme]`, `.dark`, or `prefers-color-scheme` overrides exist (the unused `src/app/globals.css` has a `prefers-color-scheme: dark` block but it's not imported). A background image (`fondo.png`) is used on `body`. The sidebar uses a complex gold gradient (`--sidebar-surface`). The main stylesheet is 3114 lines.

### Language Audit — Full Inventory

#### Global / Layout
| Text | Source | Language | Classification |
|------|--------|----------|----------------|
| `<html lang="es">` | `layout.tsx` | ES | Document language |
| `Juan Fontalvo — Architect / AI Engineer` | metadata.title | ES/EN | Brand title — keep EN for title |
| `Consultoría en arquitectura de software...` | metadata.description | ES | Editorial — Spanish |
| `locale: es_CO` | layout.tsx | ES | Locale metadata |

#### Sidebar (`src/components/Sidebar.tsx`)
| Text | Language | Verdict |
|------|----------|---------|
| `Home` (nav) | EN | Keep as standard nav label for root |
| `Casos reales` (nav) | ES | Stay Spanish |
| `Perfil` (nav → `/sobre-mi`) | ES | Stay Spanish |
| `Credenciales` (nav → `/curriculum`) | ES | Stay Spanish |
| `Blog` (nav) | Neutral | Stay as is |
| `Contacto` (nav) | ES | Stay Spanish |
| `Juan Fontalvo` (sidebar name) | Proper name | Stay |
| `Architect / AI Engineer` (sidebar role) | EN | Brand title — keep EN |
| `GitHub`, `LinkedIn`, `Instagram` | EN | Brand names — keep |
| `© {year} Juan Fontalvo` | ES | Copyright — fine as is |

#### Homepage (`/`)
| Text | Language | Verdict |
|------|----------|---------|
| `Arquitectura de software + IA aplicada` | ES | Stay |
| `Juan Fontalvo` / `Architect / AI Engineer` | EN/ES | Stay |
| Hero tagline (full paragraph) | ES | Stay |
| Case study titles (from data) | EN | Keep EN (international) |
| `Ver casos reales` (CTA) | ES | Stay |
| `Hablar después de ver prueba` (CTA) | ES | Stay |

#### Portafolio (`/portafolio`)
| Text | Language | Verdict |
|------|----------|---------|
| Page title, eyebrow, intro | ES | Stay |
| `Problema`, `Solución`, `Resultados` (grid headers) | ES | Stay |
| Case study titles, audience, problem, solution, outcomes, evidenceNote | EN | Keep EN (international case content) |
| Stack items (n8n, Engram, etc.) | EN | Tech names — keep |
| `Automatización`, `IA Aplicada` (metadata badges) | ES | Stay |
| `Caso {n}` (index) | ES | Stay |
| Next-step CTA + link text | ES | Stay |

#### Sobre Mí (`/sobre-mi`)
| Text | Language | Verdict |
|------|----------|---------|
| All headings, descriptions, principles, trust boundaries | ES | Stay |
| Method steps (3 items) | ES | Stay |
| Capability titles & descriptions (4 items) | ES | Stay |
| `Ver casos reales primero`, `Conversar con contexto` | ES | Stay |

#### Curriculum (`/curriculum`)
| Text | Language | Verdict |
|------|----------|---------|
| All section titles, descriptions | ES | Stay |
| Education/experience descriptions | ES | Stay |
| Capability group titles & evidence | ES | Stay |
| Tool names inside cards | EN | Tech names — keep |
| Certificate titles & dates | ES | Stay |
| `ID Verificación: {id}` | ES | Stay |

#### Blog (`/blog`)
| Text | Language | Verdict |
|------|----------|---------|
| All blog titles, descriptions, status | ES | Stay |
| Article categories | ES | Stay |

#### Contacto (`/contacto`)
| Text | Language | Verdict |
|------|----------|---------|
| All labels, CTAs, fine print | ES | Stay |
| Inquiry steps (voseo: `Compartí`, `Incluí`) | ES | Stay (matches Colombian audience) |
| WhatsApp URLs, phone numbers | EN/ES | Data — stay |

**Summary**: Only three items are in English and SHOULD stay:
1. **`Home`** — conventional nav label for root
2. **`Architect / AI Engineer`** — brand job title
3. **Case study data** (titles, audience, problem, solution, outcomes, evidence note, stack) — intentional for international technical audience

No items need to be converted between languages. The current split is intentional and correct.

---

### CSS Theme Assessment

#### Existing Variables (`:root` in `src/styles/globals.css`)

| Variable | Current (Light) Value | Dark Mode Needed |
|----------|----------------------|-------------------|
| `--principal-color` | `#f7b935` (gold) | Keep or slight dim |
| `--secundario-color` | `#50b1b1` (teal) | Keep |
| `--terciario-color` | `#0c0d1c` (dark navy) | **Invert** — needs light value |
| `--cuaternario-color` | `#99b47a` (sage) | Keep or remove (unused) |
| `--a-color` | `#e6ad2e` (dark gold) | Keep |
| `--color-principal` | `#ffffff` (white) | **→ dark surface** (`#1a1a2e`?) |
| `--color-secundary` | `#04b4e0` (cyan) | Keep |
| `--color-background` | `#f2f7f9` (light gray-blue) | **→ dark bg** (`#0f0f23`?) |
| `--color-icon` | `#b5b6b7` | **→ lighter** for dark bg |
| `--color-titles` | `#222222` | **→ light** (`#e0e0e0`?) |
| `--color-subtitles` | `#888` | **→ lighter/muted** |
| `--color-texts` | `#555` | **→ light gray** |
| `--color-border-reviews` | `#e5e6e7` | **→ dark border** (`#2a2a3e`?) |
| `--color-company-reviews` | `#a5a6a7` | **→ lighter** |
| `--backgroud-color-certificate` | `#f5f5f5` | **→ dark card bg** |
| `--background-color-contact` | `#fcfcfc` | **→ dark card bg** |
| `--sidebar-surface` | Gold gradient (light) | Needs dark variant |
| `--sidebar-shadow-bar` | Light shadow | Keep or adjust |
| `--sidebar-highlight-top` | White inset | Adjust for dark |
| `--sidebar-edge` | `rgba(12,13,28,0.07)` | **→ lighter edge** |

#### Additional concerns
- **Background image**: `body` uses `url("/assets/img/fondo.png")` — will need removal/dimming in dark mode
- **Nav-float overlay**: hardcoded `background-color: var(--color-principal)` (white) — would auto-switch with variable
- **Nav-float active**: `background-color: rgba(247, 185, 53, 0.14)` — fine
- **Card backgrounds**: `.profile__hero`, `.capability-card`, `.contact__qualified-box` use hardcoded or variable backgrounds
- No `@media (prefers-color-scheme)` usage anywhere in the imported CSS

#### Unused Tailwind setup
- `src/app/globals.css` is NOT imported in `layout.tsx` — it's dead code
- It has a `prefers-color-scheme: dark` block but it's never activated
- Tailwind v4 is installed but `globals.css` only uses it for `@theme inline` — no utility classes are used in components

#### Proposed approach for theme toggle

**Minimum viable approach**: Add a `[data-theme="dark"]` block in `src/styles/globals.css` that overrides all `--color-*` and `--sidebar-*` variables. Add a small React toggle component (sun/moon icon) in the sidebar or nav. Use `localStorage` + a state effect in a `"use client"` wrapper. The toggle sets a `data-theme` attribute on `<html>`. CSS does the rest.

**Effort estimate**:
- ~20 CSS variable overrides in a `[data-theme="dark"]` block
- ~1 new React component (toggle button)
- ~1 modified layout or sidebar (insert toggle)
- ~30 min to author, ~1h to polish dark color palette

### Approaches

1. **CSS-variable-only with `[data-theme]` selector** — recommended
   - Add `[data-theme="dark"]` overrides in `globals.css` for all color variables
   - Add a small client toggle component in the sidebar
   - Store preference in `localStorage`, initial value from `prefers-color-scheme`
   - Pros: No dependencies, pure CSS, works before JS loads (with SSR flash guard via `<script>` in `<head>`)
   - Cons: Need to manually author ~20 dark color values
   - Effort: Low

2. **Tailwind dark mode utility classes**
   - Switch the site to use Tailwind `dark:` variants throughout
   - Pros: Systematic
   - Cons: Major refactor of 3114 lines of CSS; current code doesn't use Tailwind utilities at all
   - Effort: Very High

3. **CSS custom properties + `prefers-color-scheme` only (no toggle)**
   - Just add `@media (prefers-color-scheme: dark)` overrides
   - Pros: Simplest code
   - Cons: No user toggle, no override for light-mode-on-dark-OS or vice versa
   - Effort: Low but incomplete

### Recommendation

**Approach 1** (CSS-variable-only with `[data-theme]` selector + toggle component):
- It's the right balance of effort vs result
- The CSS is already variable-driven — ~20 variables to override
- The sidebar/nav already has a `"use client"` component (Sidebar.tsx) to host the toggle
- Add a `<script>` in layout's head to apply saved theme before paint (prevents flash)
- Use a sun/moon SVG toggle, placed in the sidebar or as a floating button
- Dark palette inspiration: deep navy/charcoal surfaces, warm gold accent kept, muted text

### Risks
- **Flash of wrong theme** if the JS toggle runs after paint — mitigated by a blocking inline `<script>` in `<head>` that reads `localStorage` and sets `data-theme` before the body renders
- **Background image** in dark mode — needs either removal or a dark-mode replacement
- **Sidebar gradient** — the gold gradient may still work in dark mode or need a deeper variant
- **Accessibility**: contrast ratios for gold-on-dark need verification
- **CSS file size increase**: ~40 lines for variable overrides — negligible

### Ready for Proposal
Yes.

### Affected Areas
- `src/styles/globals.css` — add `[data-theme="dark"]` variable overrides (~40 lines)
- `src/components/Sidebar.tsx` — add theme toggle button
- `src/app/layout.tsx` — add blocking theme script in `<head>`
- `src/data/projects.ts` — no changes needed (intentional EN content)
- Every `.tsx` page — no language changes needed (current split is correct)
