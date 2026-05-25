import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "Juan Fontalvo" },
  { path: "/casos-reales", heading: "Casos reales" },
  { path: "/blog", heading: "Blog" },
  { path: "/contacto", heading: "Contacto" },
] as const;

test.describe("Public site smoke tests", () => {
  for (const route of routes) {
    test(
      `${route.path} renders the expected page`,
      { tag: ["@critical", "@e2e", "@public-site"] },
      async ({ page }) => {
        await page.goto(route.path);

        await expect(page).toHaveURL(route.path === "/" ? "/" : route.path);
        await expect(
          page.getByRole("heading", { name: route.heading, level: 1 }),
        ).toBeVisible();
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          `https://tech-local.com${route.path === "/" ? "" : route.path}`,
        );
      },
    );
  }

  test(
    "sitemap exposes all public routes",
    { tag: ["@critical", "@e2e", "@seo"] },
    async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      const body = await response?.text();

      expect(response?.ok()).toBe(true);
      expect(body).toContain("https://tech-local.com/casos-reales");
      expect(body).toContain(
        "https://tech-local.com/blog/automatizacion-whatsapp-n8n-calificacion-leads",
      );
      expect(body).toContain("2026-05-15T00:00:00.000Z");
    },
  );
});
