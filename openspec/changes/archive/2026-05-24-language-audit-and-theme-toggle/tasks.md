# Tasks: Language Audit & Theme Toggle

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~95 (35 new + 60 modified) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Full implementation | Single PR | ~95 lines across 4 files — fits well within the 400-line budget. No chaining needed. |

## Phase 1: ThemeToggle Component

- [x] 1.1 Create `src/components/ThemeToggle.tsx` — `"use client"` component with sun/moon inline SVGs, click handler that flips `document.documentElement.dataset.theme` and persists to `localStorage`

## Phase 2: CSS Dark Mode Overrides

- [x] 2.1 Add `[data-theme="dark"] { ... }` block to `src/styles/globals.css` with ~20 `--color-*` and `--sidebar-*` variable overrides, explicit `.sidebar`/`.sidebar__name` color overrides, and `body { background-image: none }`

## Phase 3: Integration & Wiring

- [x] 3.1 In `src/components/Sidebar.tsx`, import `<ThemeToggle />` and render it between the social links section and the copyright line
- [x] 3.2 In `src/app/layout.tsx`, add blocking inline `<script>` in `<head>` that reads `localStorage.theme` (fallback `prefers-color-scheme`) and sets `document.documentElement.dataset.theme` before first paint

## Phase 4: Verification

- [x] 4.1 Manual verification: toggle theme → reload → theme persists; first visit with system dark → dark without flash; `localStorage` with invalid value → defaults to light; hard-refresh → no flicker; light mode background image unaffected
