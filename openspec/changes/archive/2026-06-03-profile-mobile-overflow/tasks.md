# Tasks — profile-mobile-overflow

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 1 (source) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low
```

**Source lines modified:** 1 (`right: -1.5rem` → `right: 0` in `src/styles/responsive-small.css`).  
**Source lines added:** 0.  
**Source lines removed:** 0.  
**Total changed source lines:** 1.

---

## Task Dependency Graph

```
T1 (safety) ──→ T2 (impl) ──→ T3 (verify) ──→ T4 (review) ──→ T5 (commit)
                    ↑
T0 (read) ──────────┘
                                    └── T6 (rollback — conditional)
```

---

## T0 — Pre-read: Understand the chosen design

**Context:** Read before any editing.

- [ ] Confirm the design decision: **Candidate A** — change `right: -1.5rem` to `right: 0` in the small-breakpoint title decoration rule in `src/styles/responsive-small.css`.
- [ ] Confirm the scope boundaries:
  - Only `src/styles/responsive-small.css` may be changed.
  - No changes to `primitives.css`, `reset.css`, `responsive-foundation.css`, `responsive-mobile.css`, `layout.css`, `sidebar.css`, `nav-float.css`, `dark-mode.css`, or `pages-profile.css`.
  - No changes to `.tsx`, `.ts`, `.js`, `.mjs` (except the verification script is read-only), or `.json` source files.
  - No changes to `openspec/specs/design-responsividad/`.
- [ ] Confirm the exact target: **Line 64** of `src/styles/responsive-small.css` — the `right: -1.5rem` property inside the grouped selector block for `.about__title::after`, `.curriculum__title::after`, `.services__title::after`, `.reviews__title::after`, `.clients__title::after`, `.prices__title::after`.
- [ ] No Tailwind, shadcn, TSX, route, or data changes.

**Verification:** Read the decision log in `openspec/changes/profile-mobile-overflow/design.md` — the chosen design is documented in §3 (Candidate A).

---

## T1 — Pre-apply safety checks (do before any edit)

**Dependencies:** T0 (read)

- [ ] **Git status check:** Run `git status` to confirm the working tree is clean (no dirty files unrelated to this change).
- [ ] **Baseline overflow reproduction:**
  1. Start dev server: `npm run dev &`
  2. Wait for server: `npx wait-on http://localhost:3000 --timeout 30000`
  3. Run overflow check: `node openspec/changes/profile-mobile-overflow/overflow-check.mjs`
  4. **Expected** — the script exits with non-zero status and reports:
     - `/perfil @ 360px`: ❌ OVERFLOW (overflow=6, scrollX=6)
     - `/perfil @ 375px`: ❌ OVERFLOW (overflow=6, scrollX=6)
     - `/perfil @ 414px`: ✅ OK
     - `/ @ 360px`: ✅ OK (and all other `/`, `/contacto` combos OK)
  5. **Pass criteria:** All 9 combos report as expected above. If the baseline differs, pause and diagnose before proceeding.
- [ ] **Non-goal verification:** Run `grep -rn "design-responsividad" openspec/changes/profile-mobile-overflow/` — should show zero matches for modified files in this change.
- [ ] **Target line confirmation:** Run `grep -n "right: -1.5rem" src/styles/responsive-small.css` — confirm it shows line 64 with the correct context (`.about__title::after` etc. block).

**Fail-stop:** If any check fails, stop and document before proceeding.

---

## T2 — Implementation: edit `right: -1.5rem` → `right: 0`

**Dependencies:** T1 (pre-apply safety)

- [ ] Edit `src/styles/responsive-small.css` **line 64**, changing:
  ```
  right: -1.5rem;
  ```
  to:
  ```
  right: 0;
  ```
- [ ] **Do NOT modify** any other property in the same rule block (`width: 3rem`, `height: 2rem` remain unchanged).
- [ ] **Do NOT modify** any other file, selector, or breakpoint.

**Verification after edit:**
- Run `grep -n "right:" src/styles/responsive-small.css` and confirm the title decoration block now shows `right: 0`.
- Run `grep -n "right: -1.5rem" src/styles/responsive-small.css` — must return zero matches.
- Run `git diff` to confirm exactly **1 line changed** in exactly **1 file** (`src/styles/responsive-small.css`).

---

## T3 — Verification

**Dependencies:** T2 (implementation)

### T3.1 — Overflow detection script

- [ ] Dev server must be running (from T1).
- [ ] Run: `node openspec/changes/profile-mobile-overflow/overflow-check.mjs`
- [ ] **Expected:** All 9 route/viewport combinations report `✅ OK`:
  - `/perfil` @ 360px: overflow=0, scrollX=0
  - `/perfil` @ 375px: overflow=0, scrollX=0
  - `/perfil` @ 414px: overflow=0, scrollX=0
  - `/` @ 360px: overflow=0, scrollX=0 (and all other `/`, `/contacto` combos)
- [ ] Script exits with **exit code 0**.
- [ ] If the script produces `⚠️  Overflow detected`, stop and investigate before proceeding.

### T3.2 — Lint

- [ ] Run: `npm run lint`
- [ ] **Expected:** exits successfully with no new violations attributable to this change.

### T3.3 — Build

- [ ] Run: `npm run build`
- [ ] **Expected:** exits successfully with no new warnings or errors attributable to this change.
- [ ] Note: if the build produces pre-existing warnings (unrelated to this change), confirm they are not new.

### T3.4 — Git whitespace check

- [ ] Run: `git diff --check`
- [ ] **Expected:** no whitespace errors.

### T3.5 — No hiding/clipping enforcement

- [ ] Run: `grep -n "overflow-x: hidden" src/styles/responsive-small.css` — must return zero matches (the fix must NOT rely on clipping).
- [ ] Run: `grep -n "display: none" src/styles/responsive-small.css` — verify no `::after` pseudo-elements are hidden in the small-breakpoint title decoration block (the fix must NOT hide title dots).

### T3.6 — Scope enforcement

- [ ] Run `git diff --name-only` and confirm only `src/styles/responsive-small.css` appears in the source diff.
- [ ] Run `git diff -- src/styles/primitives.css` — must show no differences.
- [ ] Run `git diff -- src/styles/reset.css` — must show no differences.
- [ ] Run `git diff -- src/styles/responsive-foundation.css` — must show no differences.
- [ ] Run `git diff -- src/styles/responsive-mobile.css` — must show no differences.
- [ ] Run `git diff -- src/styles/layout.css` — must show no differences.
- [ ] Run `git diff -- src/styles/dark-mode.css` — must show no differences.
- [ ] Run `git diff -- src/app/` — must show no differences.
- [ ] Run `git diff -- src/components/` — must show no differences.

### T3.7 — Manual/browser smoke check (if feasible)

- [ ] Open `/perfil` at 360px viewport width in a browser (DevTools device emulation).
- [ ] Visually confirm:
  - No horizontal scrollbar appears.
  - Title dotted decorations (::after) are **visible** on sections: About, Method, Services, Principles, Trust.
  - Title dots are positioned near the right edge of the title text (not floating far to the right, not hidden).
  - The decoration pattern (`repeating-radial-gradient` dots) looks correct.
- [ ] Check `/perfil` at 375px and 414px — same visual checks.
- [ ] Check `/` and `/contacto` at 360px — no regression (pages remain scroll-free horizontally, decorations visible if present).
- [ ] Toggle dark mode on `/perfil` at 360px — title decorations remain visible with correct dark-mode coloring.
- [ ] Larger viewports: 768px, 1024px, 1440px — no regression on title decoration positioning.

### T3.8 — Budget enforcement

- [ ] Count source changed lines in `git diff -- src/styles/responsive-small.css | grep '^[+-]' | grep -v '^[+-]{3}' | wc -l`
- [ ] **Expected:** exactly **1 changed source line**.
- [ ] **Fail-stop:** if count exceeds 25, pause and request a delivery decision before proceeding.

---

## T4 — Review / Judgment Day

**Dependencies:** T3 (verification passed)

- [ ] Present the diff for human review:
  ```
  diff --git a/src/styles/responsive-small.css b/src/styles/responsive-small.css
  --- a/src/styles/responsive-small.css
  +++ b/src/styles/responsive-small.css
  @@ -61,7 +61,7 @@
     .reviews__title::after,
     .clients__title::after,
     .prices__title::after {
  -     right: -1.5rem;
  +     right: 0;
       width: 3rem;
       height: 2rem;
     }
  ```
- [ ] Confirm against non-goals:
  - [ ] No `primitives.css` change.
  - [ ] No `overflow-x: hidden` as primary fix.
  - [ ] No `display: none` on `::after`.
  - [ ] No TSX, route, data, or `design-responsividad` changes.
  - [ ] Only 1 source line changed.
- [ ] Request reviewer approval before proceeding to commit.

**Blocking:** Do NOT proceed to T5 (commit) without explicit approval.

---

## T5 — Commit

**Dependencies:** T4 (review approved)

- [ ] Stage: `git add src/styles/responsive-small.css`
- [ ] Commit with message:
  ```
  fix(perfil): eliminate 6px horizontal overflow at 360/375px viewports

  Set small-breakpoint title decoration `right` to `0` instead of
  `-1.5rem` to prevent `::after` pseudo-elements from extending past
  the document width. Matches base primitive positioning in
  primitives.css.

  Verified with overflow-check.mjs: all 9 route/viewport combinations
  report zero overflow. Title dots remain visible at small widths.

  Scope: CSS-only, 1 source line changed in responsive-small.css.
  ```
- [ ] Run `git log --oneline -1` to confirm the commit is correct.

**Note:** Archive phase will happen after review of the full unit cycle.

---

## T6 — Rollback (conditional — only if any step fails)

**Dependencies:** Any earlier step that fails critically.

### If rollback is needed before commit:

- [ ] Run: `git checkout -- src/styles/responsive-small.css`
- [ ] Confirm clean: `git diff --stat` shows zero changes.
- [ ] Re-run overflow script to confirm prior behavior is restored:
  ```
  node openspec/changes/profile-mobile-overflow/overflow-check.mjs
  ```
  Expected: `/perfil` @ 360px shows overflow=6, scrollX=6 again.

### If rollback is needed after commit (but before next branch push):

- [ ] Run: `git revert HEAD --no-edit`
- [ ] Confirm revert diff is the exact opposite: `right: 0` → `right: -1.5rem` in `responsive-small.css`.
- [ ] Re-run overflow script to confirm baseline behavior is restored.
- [ ] Run `npm run lint` — no new violations.
- [ ] Run `npm run build` — passes.

### No cascading rollback needed

The fix is isolated to one CSS property value in one file. No data, route, component, or migration rollback is required.

---

## Summary of commands for the execution session

```bash
# T1: Pre-apply
git status
npm run dev &
npx wait-on http://localhost:3000 --timeout 30000
node openspec/changes/profile-mobile-overflow/overflow-check.mjs
grep -n "right: -1.5rem" src/styles/responsive-small.css

# T2: Implement
# Edit line 64: right: -1.5rem → right: 0

# T3: Verify
node openspec/changes/profile-mobile-overflow/overflow-check.mjs
npm run lint
npm run build
git diff --check
git diff --name-only
git diff -- src/styles/responsive-small.css | grep '^[+-]' | grep -v '^[+-]{3}' | wc -l
grep -n "overflow-x: hidden" src/styles/responsive-small.css
grep -n "display: none" src/styles/responsive-small.css

# T4: Review (show diff)
git diff

# T5: Commit
git add src/styles/responsive-small.css
git commit -m "fix(perfil): eliminate 6px horizontal overflow at 360/375px viewports

Set small-breakpoint title decoration \`right\` to \`0\` instead of
\`-1.5rem\` to prevent ::after pseudo-elements from extending past
the document width. Matches base primitive positioning in
primitives.css.

Verified with overflow-check.mjs: all 9 route/viewport combinations
report zero overflow. Title dots remain visible at small widths.

Scope: CSS-only, 1 source line changed in responsive-small.css."

# T6: Rollback (if needed)
git checkout -- src/styles/responsive-small.css
# or after commit:
git revert HEAD --no-edit
```
