# Proposal: profile-mobile-overflow

## Problem statement and motivation

The `/perfil` route has a small but deterministic horizontal document overflow on narrow mobile viewports. At 360px and 375px widths, the page reports a 6px overflow and can be programmatically scrolled horizontally, while the same route is clean at 414px and comparison routes (`/` and `/contacto`) are clean at all checked widths.

This matters because small-mobile overflow is a user-visible polish and accessibility issue: it can create unexpected sideways movement, clipped focus/visual affordances, and noisy regression signals for future responsive work. The goal is to remove the overflow at the confirmed source without redesigning the profile page or retuning the responsive system.

## Intent

Apply a narrow raw-CSS fix for the confirmed small-breakpoint title decoration overflow on `/perfil`, preserving the existing dotted title decoration style and keeping the deterministic overflow script as the regression loop for Apply and Verify.

## Confirmed root cause and evidence summary

Exploration confirmed that the overflow is caused by generated title decoration pseudo-elements at the small breakpoint, not by profile layout, text wrapping, flex, or grid content.

Evidence from `openspec/changes/profile-mobile-overflow/overflow-report.json`:

| Route | 360px | 375px | 414px |
| --- | --- | --- | --- |
| `/perfil` | overflow 6px, `scrollX=6` | overflow 6px, `scrollX=6` | OK |
| `/` | OK | OK | OK |
| `/contacto` | OK | OK | OK |

Diagnostic probes from Explore:

- DOM scan found zero normal overflowing elements, which is consistent with pseudo-element overflow not visible through regular element `getBoundingClientRect()` scanning.
- Disabling all `::after` pseudo-elements removed the overflow.
- Disabling only the profile title dot pseudo-elements removed the overflow.
- Forcing the relevant title `::after` decorations to `right: 0` removed the overflow.
- Clipping the profile header also removed the symptom, but clipping is less direct than fixing the decoration offset.

The relevant small-breakpoint rule is in `src/styles/responsive-small.css`:

```css
.about__title::after,
.curriculum__title::after,
.services__title::after,
.reviews__title::after,
.clients__title::after,
.prices__title::after {
	right: -1.5rem;
	width: 3rem;
	height: 2rem;
}
```

At `html { font-size: 50% }`, the negative right offset allows generated dotted decorations to extend past the document width on `/perfil`. Moving the small-breakpoint offset inside the viewport resolves the measured overflow while retaining the decoration.

## Proposed narrow scope

### In scope

- Update the small-breakpoint title decoration offset in `src/styles/responsive-small.css` so generated `::after` decorations do not increase document width on `/perfil` at 360px and 375px.
- Keep the dotted title decorations visible and visually consistent with the current portfolio design.
- Prefer changing the offset/positioning of the existing small-breakpoint decoration rule over hiding overflow or hiding the decoration.
- Keep `openspec/changes/profile-mobile-overflow/overflow-check.mjs` as the deterministic verification tool for Apply and Verify.
- Verify `/perfil`, `/`, and `/contacto` at 360px, 375px, and 414px using the overflow script.

### Exact non-goals

- No profile redesign.
- No foundation or primitives source change unless a later phase proves `responsive-small.css` cannot solve the issue.
- No broad responsive retuning.
- No TSX, route, or data changes.
- No Tailwind or shadcn migration.
- No `openspec/specs/design-responsividad/` changes or dependency.
- No dark-mode architecture changes.
- No layout, reset, or responsive foundation changes.
- No text/content rewrite.

## Candidate affected files and expected responsibility

| Candidate file | Expected responsibility |
| --- | --- |
| `src/styles/responsive-small.css` | Primary and likely only source file for Apply. Owns the small-breakpoint title decoration override whose negative right offset is confirmed to cause the overflow. |
| `openspec/changes/profile-mobile-overflow/overflow-check.mjs` | Existing deterministic regression script. Should remain available as the verification tool; no change expected unless Spec/Tasks require stricter assertions. |
| `openspec/changes/profile-mobile-overflow/overflow-report.json` | Existing diagnostic evidence. May be regenerated during verification to document pass/fail results. |
| `src/styles/primitives.css` | Not expected to change. Only consider if later evidence proves the base title decoration primitive cannot be safely corrected through the small-breakpoint override. |
| `src/styles/pages-profile.css` | Not expected to change. Profile title consumers should remain unchanged if the responsive override is fixed. |

## Review workload forecast

Target review workload for source changes: **≤25 changed source lines**, plus OpenSpec artifacts.

Expected Apply footprint:

- `src/styles/responsive-small.css`: approximately 1–10 changed lines for the title decoration offset rule.
- OpenSpec artifacts: proposal/spec/design/tasks/verification output as required by SDD phases.

If implementation forecasting grows beyond this narrow CSS-only footprint, pause before Apply and request a delivery decision.

## Success criteria

- `/perfil` reports no horizontal overflow at 360px, 375px, and 414px.
- `/` and `/contacto` remain free of horizontal overflow at 360px, 375px, and 414px.
- The dotted title decorations remain visible on small mobile and visually consistent with the existing design.
- The fix is CSS-only and limited to the confirmed small-breakpoint decoration behavior.
- No TSX, route, data, Tailwind/shadcn, foundation/layout/reset/dark-mode, or `design-responsividad` changes are present.
- Source review workload remains at or below 25 changed lines unless explicitly approved otherwise.
- `npm run lint` and `npm run build` pass in later verification phases with no new attributable errors.

## Verification plan

Automated checks for Apply/Verify:

1. Start the local app and run:
   ```bash
   node openspec/changes/profile-mobile-overflow/overflow-check.mjs
   ```
2. Confirm `overflow <= 0` and `scrollX === 0` for `/perfil`, `/`, and `/contacto` at 360px, 375px, and 414px.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Optionally run `git diff --check` if shell access is used in later phases.

Manual smoke checks for Apply/Verify:

- Inspect `/perfil` at 360px, 375px, and 414px in light mode: no horizontal scroll; title dots remain visible.
- Toggle dark mode on `/perfil` at 360px: no visual regression in title decorations or profile sections.
- Keyboard-tab through `/perfil` at 360px: focus indicators are visible and not clipped unexpectedly.
- Spot-check `/`, `/contacto`, and one additional decorated-heading route if touched by the shared selector grouping.

## Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Dotted title decorations move too far inward or appear visually different | Low | Medium | Use the smallest offset change that removes document overflow; manually compare `/perfil` headings at small widths. |
| Shared selector grouping affects other pages with decorated titles | Medium | Low | Verify `/`, `/contacto`, and any routes covered by the same small-breakpoint selector group; keep the change scoped to the confirmed rule. |
| A clipping workaround hides rather than fixes overflow | Low | Medium | Prefer offset correction over `overflow-x: hidden` or hiding pseudo-elements. |
| Root cause shifts if later CSS has changed since Explore | Low | Medium | Re-run the overflow script before and after Apply; if probes no longer match, pause and re-diagnose before broadening scope. |

## Rollback plan

Rollback is straightforward:

1. Revert the small-breakpoint title decoration offset change in `src/styles/responsive-small.css`.
2. Re-run the overflow script to confirm the prior behavior is restored if needed.
3. Re-run lint/build if rollback occurs after implementation.

Because the proposed fix is narrow and CSS-only, no data, route, component, or migration rollback should be required.

## Recommendation for next phase

Proceed to **Spec** for `profile-mobile-overflow`.

The Spec should convert this proposal into RFC 2119 requirements and Given/When/Then scenarios for:

- small-breakpoint title decoration containment,
- preservation of visible dotted title decorations,
- strict non-goal enforcement,
- regression-script verification across `/perfil`, `/`, and `/contacto`,
- source review budget enforcement.
