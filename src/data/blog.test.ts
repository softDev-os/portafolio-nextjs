import { describe, expect, it } from "vitest";
import { getArticleBySlug, getArticles } from "./blog";

describe("blog content accessors", () => {
  it("returns the published articles with stable slugs", () => {
    const articles = getArticles();

    expect(articles).toHaveLength(3);
    expect(articles.map((article) => article.slug)).toEqual([
      "automatizacion-whatsapp-n8n-calificacion-leads",
      "memoria-persistente-agentes-ia-engram",
      "handoff-humano-automatizacion-cuando-como",
    ]);
  });

  it("finds an article by slug", () => {
    const article = getArticleBySlug("memoria-persistente-agentes-ia-engram");

    expect(article?.title).toBe(
      "Memoria persistente para agentes de IA: por qué importa y cómo la armé",
    );
  });

  it("returns undefined for an unknown slug", () => {
    expect(getArticleBySlug("no-existe")).toBeUndefined();
  });
});
