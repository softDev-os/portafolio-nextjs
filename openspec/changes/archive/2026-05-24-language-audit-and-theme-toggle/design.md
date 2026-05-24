# Design: Language Audit & Theme Toggle

## Technical Approach

CSS variable override via `[data-theme="dark"]` selector on `:root` (Approach 1 from exploration). Zero new JS dependencies. The existing ~20 `--color-*` and `--sidebar-*` tokens on `:root` get dark-mode values in a single override block. A blocking inline `<script>` in `<head>` reads `localStorage` (or `prefers-color-scheme`) and sets `data-theme` before first paint. A lightweight `ThemeToggle` client component in the Sidebar handles toggling.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|-------------|-----------|
| Dark mode mechanism | `[data-theme="dark"]` attribute selectors | Tailwind dark: prefix, CSS custom properties in JS | Zero invasiveness to the existing 3123-line CSS. No refactor of any existing selector. |
| Flash prevention | Synchronous inline `<script>` in `<head>` | `next/script` `beforeInteractive`, Server Component cookie read | `beforeInteractive` runs AFTER hydration — too late. Cookie read needs server round-trip. Inline script is the only way to guarantee no flash. |
| Icon rendering | Inline SVG in component | lucide-react, react-icons | Zero additional deps. Sun/moon SVGs are ~20 LOC total. |
| Toggle placement | Sidebar, between social links and copyright | Nav-float, floating button | Sidebar has whitespace at the bottom; toggle feels native there. |

## Data Flow

```
── PAGE LOAD ──────────────────────────────────────
  Browser parses <head>
    → blocking script reads localStorage.theme
    → fallback: matchMedia('(prefers-color-scheme:dark)')
    → sets document.documentElement.dataset.theme
    → CSS [data-theme="dark"] applies before first paint

── USER TOGGLE ────────────────────────────────────
  User clicks sun/moon icon
    → ThemeToggle.onClick()
    → flip document.documentElement.dataset.theme
    → localStorage.setItem('theme', newValue)
    → CSS overrides react instantly (inheritance, no reflow)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/ThemeToggle.tsx` | **Create** | Client component with sun/moon SVG icons, toggle + persistence logic |
| `src/styles/globals.css` | Modify | Add `[data-theme="dark"] { ... }` block with variable overrides |
| `src/components/Sidebar.tsx` | Modify | Import and render `<ThemeToggle />` after social section |
| `src/app/layout.tsx` | Modify | Add `<head>` with blocking inline `<script>` |

## Interfaces

```typescript
// ThemeToggle — no props, self-contained
// Reads/writes localStorage.theme ("light" | "dark")
// Falls back to prefers-color-scheme on first visit
```

## CSS Variable Overrides (Dark Palette)

All changes live in a single `[data-theme="dark"]` block. Core tokens:

| Token | Light (current) | Dark |
|-------|----------------|------|
| `--color-principal` | `#ffffff` | `#1a1b30` |
| `--color-background` | `#f2f7f9` | `#0f1023` |
| `--terciario-color` | `#0c0d1c` | `#e2e2ec` |
| `--color-titles` | `#222222` | `#e2e2ec` |
| `--color-texts` | `#555555` | `#a8a8c0` |
| `--color-subtitles` | `#888888` | `#8a8aa0` |
| `--color-border-reviews` | `#e5e6e7` | `#2a2b42` |
| `--color-company-reviews` | `#a5a6a7` | `#7a7a90` |
| `--background-color-contact` | `#fcfcfc` | `#1a1b30` |
| `--backgroud-color-certificate` | `#f5f5f5` | `#1a1b30` |
| `--color-icon` | `#b5b6b7` | `#6a6a80` |
| `--sidebar-surface` | gold gradient | dark navy gradient |
| `--sidebar-shadow-bar` | light shadow | `rgba(0,0,0,0.5)` |
| `--sidebar-highlight-top` | white inset | `rgba(255,255,255,0.05)` |
| `--sidebar-edge` | `rgba(12,13,28,0.07)` | `rgba(255,255,255,0.06)` |

`--principal-color` (#f7b935 gold) is preserved — it establishes brand consistency across both modes.

Sidebar text that uses `--color-principal` (currently white) needs explicit overrides so it stays light against the dark navy sidebar surface:
```css
[data-theme="dark"] .sidebar,
[data-theme="dark"] .sidebar__name { color: #e2e2ec; }
```

Body background image hidden:
```css
[data-theme="dark"] body { background-image: none; }
```

## Blocking Script

IIFE pattern inside `<head>` for sync execution:

```html
<script>!function(){try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}}()</script>
```

No flash. Safely handles missing/empty localStorage and disabled storage.

## Testing Strategy

No test runner configured. Verification is manual:
- Toggle theme → reload → theme persists
- First visit with system dark mode → dark theme applied without flash
- Hard-refresh in light mode → no flicker
- Invalid localStorage value → silently defaults to light

## Migration / Rollout

No migration required. Toggle is purely presentational. Toggling does not affect data, routing, or server state. Rollback: revert the 4 files.

## Open Questions

None — all decisions are resolved in the spec and proposal.
