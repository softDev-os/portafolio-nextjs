# Proposal: Language Audit & Theme Toggle

## Intent

Language audit is complete — the current ES/EN split is correct (Spanish for editorial/CTAs, English for case-study data and brand titles). No migration needed.

The UX gap is lack of dark/light theme toggle. The CSS is already variable-driven (~20 `--color-*` tokens on `:root`), making it cheap to add dark overrides. Implement a toggle in the sidebar.

## Scope

### In Scope
- `[data-theme="dark"]` CSS variable overrides in `src/styles/globals.css` (~40 lines)
- Theme-toggle React component (sun/moon icon) inside Sidebar
- Blocking inline `<script>` in `layout.tsx` `<head>` to prevent flash
- `localStorage` persistence + `prefers-color-scheme` initial value

### Out of Scope
- Language migration (none needed — audit confirmed current split)
- Tailwind dark-mode refactor (too invasive for 3114-line CSS)
- Gradient sidebar tuning beyond variable overrides
- Contrast ratio audit (deferred to visual QA)

## Capabilities

### New Capabilities
None — theme toggle is a UI infrastructure change, not a spec-level capability.

### Modified Capabilities
None — no existing spec changes behavior. Theme switching is purely presentational.

## Approach

Approach 1 from exploration: CSS variable override via `[data-theme="dark"]` selector.

1. Add `[data-theme="dark"]` block in `globals.css` overriding `--color-*` and `--sidebar-*` variables with dark values (deep navy surfaces, warm gold accent kept, muted text)
2. Create `ThemeToggle` client component (sun/moon SVG icons, toggle `data-theme` on `<html>`, read/write `localStorage`)
3. Insert `ThemeToggle` in `Sidebar.tsx` below the navigation links
4. Add blocking `<script>` at top of `<head>` in `layout.tsx` to restore saved theme before first paint
5. Handle background image: hide `fondo.png` in dark mode via `[data-theme="dark"] body { background-image: none }`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/globals.css` | Modified | Add `[data-theme="dark"]` with ~20 variable overrides |
| `src/components/Sidebar.tsx` | Modified | Import and render `<ThemeToggle />` |
| `src/app/layout.tsx` | Modified | Add blocking inline theme script in `<head>` |
| `src/components/ThemeToggle.tsx` | **New** | Client component with sun/moon icon + localStorage logic |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Flash of wrong theme | Low | Blocking `<script>` before `<body>` renders |
| Gold-on-dark contrast fails a11y | Medium | Keep gold accent, darken background enough for WCAG AA — defer audit to QA |
| Sidebar gradient looks off in dark | Low | Gradient uses vars; dark overrides can tone it down |
| `fondo.png` clashes with dark mode | Low | Remove background image in `[data-theme="dark"]` |

## Rollback Plan

Revert the four affected files via `git checkout`. No data loss risk — this is purely presentational.

## Dependencies

None. Pure CSS + React — no new packages or build config changes.

## Success Criteria

- [ ] Toggle switches between light/dark themes and persists across reload
- [ ] No flash of wrong theme on initial load (blocking script works)
- [ ] All text remains readable in both modes (visual check)
- [ ] Background image hidden in dark mode
- [ ] Toggle icon updates to indicate current mode (sun for dark, moon for light)
