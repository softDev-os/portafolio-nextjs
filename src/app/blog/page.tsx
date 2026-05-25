import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import articles from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas sobre automatización con IA, arquitectura de software y workflows operativos.",
};

export default function Blog() {
  return (
    <section className="content__page content__blog">
      <header className="blog__header">
        <h1 className="blog__title">Blog</h1>
        <p className="blog__intro">
          Notas sobre automatización con IA, workflows operativos y patrones de
          arquitectura que aplico en proyectos reales.
        </p>
      </header>

      <section className="blog__articles">
        {articles.map((article) => (
          <article key={article.slug} className="articles__article">
            <div className="article__top">
              <div className="article__category">{article.category}</div>
              <Link
                href={`/blog/${article.slug}`}
                className="article__image-link"
              >
                <div className="article__mask">
                  <Image
                    src={article.image}
                    className="article__image"
                    alt={article.title}
                    width={400}
                    height={185}
                  />
                </div>
                <div className="article__logo">
                  <i className="article__icon fa-solid fa-book"></i>
                </div>
              </Link>
            </div>
            <div className="article__bottom">
              <time dateTime={article.date} className="article__date">
                {article.dateDisplay}
              </time>
              <h2 className="article__title">
                <Link
                  href={`/blog/${article.slug}`}
                  className="article__link"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="article__summary">{article.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
