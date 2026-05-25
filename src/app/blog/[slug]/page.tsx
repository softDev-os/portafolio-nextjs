import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import articles from "@/data/blog";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Artículo no encontrado" };
  return {
    title: article.title,
    description: article.summary,
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
      </article>
    </section>
  );
}
