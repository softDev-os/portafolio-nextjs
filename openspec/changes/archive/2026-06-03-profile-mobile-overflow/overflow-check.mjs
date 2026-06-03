/**
 * Overflow Detection Script for /perfil at small-mobile viewports.
 *
 * Usage:
 *   1. Start dev server: npm run dev &
 *   2. Wait for server:  npx wait-on http://localhost:3000 --timeout 30000
 *   3. Run:              node openspec/changes/profile-mobile-overflow/overflow-check.mjs
 *
 * Outputs:
 *   - Console: per-route/viewport pass/fail with top culprit elements
 *   - File:    openspec/changes/profile-mobile-overflow/overflow-report.json
 */
import { chromium } from "@playwright/test";
import fs from "fs";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const ROUTES = ["/perfil", "/", "/contacto"];
const VIEWPORTS = [
	{ width: 360, height: 800, label: "360px" },
	{ width: 375, height: 800, label: "375px" },
	{ width: 414, height: 800, label: "414px" },
];

async function checkOverflow(page, route, viewport) {
	await page.setViewportSize({
		width: viewport.width,
		height: viewport.height,
	});
	await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

	const metrics = await page.evaluate(() => {
		const docWidth = document.documentElement.scrollWidth;
		const bodyWidth = document.body.scrollWidth;
		const viewportWidth = window.innerWidth;
		const overflow = Math.max(docWidth, bodyWidth) - viewportWidth;

		// Find elements whose bounding box exceeds the viewport
		const culprits = [];
		const allElements = document.querySelectorAll("*");
		for (const el of allElements) {
			const rect = el.getBoundingClientRect();
			const rightOverflow = rect.right - viewportWidth;
			const leftOverflow = -rect.left;
			if (rightOverflow > 1 || leftOverflow > 1) {
				culprits.push({
					tag: el.tagName.toLowerCase(),
					id: el.id || undefined,
					classes: el.className.toString().slice(0, 100),
					left: Math.round(rect.left),
					right: Math.round(rect.right),
					width: Math.round(rect.width),
					rightOverflow: Math.round(rightOverflow),
					leftOverflow: Math.round(leftOverflow),
				});
			}
		}

		// Sort by max overflow descending
		culprits.sort(
			(a, b) =>
				Math.max(b.rightOverflow, b.leftOverflow) -
				Math.max(a.rightOverflow, a.leftOverflow),
		);

		// Horizontal scroll test
		window.scrollTo(9999, 0);
		const scrollX = window.scrollX;
		window.scrollTo(0, 0);

		return {
			docWidth,
			bodyWidth,
			viewportWidth,
			overflow,
			scrollX,
			culpritCount: culprits.length,
			topCulprits: culprits.slice(0, 10),
		};
	});

	return { route, viewport: viewport.label, ...metrics };
}

async function main() {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	const results = [];
	let hasFailure = false;

	console.log(`\nOverflow check — ${BASE_URL}\n`);

	for (const route of ROUTES) {
		for (const viewport of VIEWPORTS) {
			const result = await checkOverflow(page, route, viewport);
			results.push(result);

			const status = result.overflow > 0 ? "❌ OVERFLOW" : "✅ OK";
			if (result.overflow > 0) hasFailure = true;

			console.log(
				`${status} ${route} @ ${viewport.label}: ` +
					`overflow=${result.overflow}px, ` +
					`scrollX=${result.scrollX}, ` +
					`culprits=${result.culpritCount}`,
			);

			if (result.topCulprits.length > 0) {
				console.log("  Top culprits:");
				for (const c of result.topCulprits.slice(0, 5)) {
					const id = c.id ? `#${c.id}` : "";
					console.log(
						`    <${c.tag}${id} class="${c.classes}"> ` +
							`w=${c.width}px right=${c.right} overflow=${c.rightOverflow}px`,
					);
				}
			}
		}
		console.log(""); // blank line between routes
	}

	await browser.close();

	// Write JSON report
	const reportPath =
		"openspec/changes/profile-mobile-overflow/overflow-report.json";
	fs.mkdirSync("openspec/changes/profile-mobile-overflow", { recursive: true });
	fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
	console.log(`Report written to ${reportPath}`);

	if (hasFailure) {
		console.log("\n⚠️  Overflow detected on one or more routes.");
		process.exit(1);
	} else {
		console.log("\n✅ No overflow detected on any route/viewport.");
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
