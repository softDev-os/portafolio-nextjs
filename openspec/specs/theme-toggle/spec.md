# Theme Toggle Specification

## Purpose

Support light/dark theme switching driven by `[data-theme="dark"]` on `<html>`. The theme MUST persist across sessions via `localStorage` and MUST initialize from saved preference before first paint to avoid flash. The toggle is purely presentational — no data or routing changes.

## Requirements

### Requirement: Theme Persistence

The system MUST persist the user's theme choice in `localStorage` under key `theme`, and MUST respect the saved value on subsequent visits. On first visit (no saved value), the system MUST fall back to `prefers-color-scheme: dark`.

#### Scenario: Saved theme survives reload

- GIVEN the user has selected the dark theme
- WHEN they reload the page
- THEN the dark theme is applied on first paint
- AND the toggle icon shows the sun (indicating dark mode)

#### Scenario: First visit respects system preference

- GIVEN a first-time visitor with no `localStorage` entry
- WHEN the page loads
- THEN the theme matches `prefers-color-scheme: dark` (dark) or its absence (light)

### Requirement: Flash Prevention

The system MUST place a blocking inline `<script>` in `<head>` that reads `localStorage` and sets `data-theme` on `<html>` before the first paint. No user-visible flash of the wrong theme is acceptable.

#### Scenario: Blocking script runs before render

- GIVEN the page is being served
- WHEN the browser processes `<head>`
- THEN the inline script MUST execute synchronously
- AND `<html data-theme="dark">` MUST be set before any CSS or DOM nodes render

#### Scenario: Invalid localStorage value

- GIVEN `localStorage.theme` contains an unexpected value (e.g. `"blue"`)
- WHEN the blocking script runs
- THEN it MUST silently default to light mode
- AND no broken theme state is visible

### Requirement: Theme Toggle Component

A `ThemeToggle` client component MUST render inside the `Sidebar` with sun and moon SVG icons. Clicking the icon MUST toggle the theme and update `localStorage`.

#### Scenario: Toggle switches from light to dark

- GIVEN the sidebar is visible and current theme is light
- WHEN the user clicks the toggle
- THEN `data-theme` on `<html>` changes to `"dark"`
- AND `localStorage.theme` is set to `"dark"`
- AND the icon changes from moon to sun

#### Scenario: Toggle switches from dark to light

- GIVEN the sidebar is visible and current theme is dark
- WHEN the user clicks the toggle
- THEN `data-theme` on `<html>` changes to `"light"`
- AND `localStorage.theme` is set to `"light"`
- AND the icon changes from sun to moon

### Requirement: Dark Mode CSS Overrides

A `[data-theme="dark"]` selector block in `globals.css` MUST override `--color-*` and `--sidebar-*` CSS variables with dark-mode values. The block MUST also hide the `fondo.png` background image.

#### Scenario: Dark mode renders correctly

- GIVEN `data-theme="dark"` is set on `<html>`
- WHEN the page renders
- THEN the background uses deep navy (`--sidebar-bg`) with the warm gold accent preserved
- AND no `fondo.png` background image is visible

#### Scenario: Light mode unaffected

- GIVEN `data-theme` is absent or `"light"` on `<html>`
- WHEN the page renders
- THEN all CSS variable values match the existing light-mode defaults
- AND `fondo.png` background image is visible on the body
