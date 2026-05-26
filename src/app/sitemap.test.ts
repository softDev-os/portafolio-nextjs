import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("includes the static commercial routes and blog articles", () => {
		const entries = sitemap();
		const urls = entries.map((entry) => entry.url);

		expect(urls).toEqual([
			"https://tech-local.com",
			"https://tech-local.com/casos-reales",
			"https://tech-local.com/perfil",
			"https://tech-local.com/credenciales",
			"https://tech-local.com/blog",
			"https://tech-local.com/contacto",
			"https://tech-local.com/blog/automatizacion-whatsapp-n8n-calificacion-leads",
			"https://tech-local.com/blog/memoria-persistente-agentes-ia-engram",
			"https://tech-local.com/blog/handoff-humano-automatizacion-cuando-como",
		]);
	});

	it("uses stable lastModified dates instead of the current date", () => {
		const entries = sitemap();

		expect(entries[0]?.lastModified).toEqual(new Date("2026-05-20"));
		expect(
			entries.find((entry) =>
				entry.url.endsWith("/blog/memoria-persistente-agentes-ia-engram"),
			)?.lastModified,
		).toEqual(new Date("2026-05-15"));
	});

	it("normalizes the configured site URL before building sitemap entries", async () => {
		vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com///");
		vi.resetModules();

		const { default: sitemapWithEnv } = await import("./sitemap");
		const entries = sitemapWithEnv();

		expect(entries.map((entry) => entry.url)).toContain(
			"https://example.com/casos-reales",
		);
		expect(entries.map((entry) => entry.url)).not.toContain(
			"https://example.com//casos-reales",
		);
	});
});
