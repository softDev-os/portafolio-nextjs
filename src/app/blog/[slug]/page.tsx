import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import articles from "@/data/blog";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Artículo no encontrado" };
  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: `/blog/${article.slug}`,
      publishedTime: article.date,
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <section className="content__page content__blog">
      <article className="blog-article">
        <header className="blog-article__header">
          <Link href="/blog" className="blog-article__back">
            ← Blog
          </Link>
          <span className="blog-article__category">{article.category}</span>
          <h1 className="blog-article__title">{article.title}</h1>
          <time dateTime={article.date} className="blog-article__date">
            {article.dateDisplay}
          </time>
          <div className="blog-article__image-wrapper">
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={370}
              className="blog-article__image"
              priority
            />
          </div>
        </header>

        <div className="blog-article__body">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer
          className="portfolio__next-step"
          aria-label="Siguiente paso después del artículo"
        >
          <p>
            Si querés llevar este tipo de automatización a una operación real,
            empezá por los casos o por una consulta con contexto.
          </p>
          <div className="home-hero__cta">
            <Link
              href="/casos-reales"
              className="home-hero__cta-link home-hero__cta-link--primary"
            >
              Ver casos reales
            </Link>
            <Link
              href="/contacto"
              className="home-hero__cta-link home-hero__cta-link--secondary"
            >
              Consultar por WhatsApp
            </Link>
          </div>
        </footer>
      </article>
    </section>
  );
}
