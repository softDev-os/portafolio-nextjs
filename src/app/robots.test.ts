import { afterEach, describe, expect, it, vi } from "vitest";

describe("robots", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("points crawlers to the canonical sitemap", async () => {
		const { default: robots } = await import("./robots");

		expect(robots().sitemap).toBe("https://tech-local.com/sitemap.xml");
	});

	it("normalizes the configured site URL before building the sitemap URL", async () => {
		vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com///");
		vi.resetModules();

		const { default: robots } = await import("./robots");

		expect(robots().sitemap).toBe("https://example.com/sitemap.xml");
	});
});
