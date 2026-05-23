import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notas públicas de arquitectura y automatización de Juan Fontalvo.',
}

const articles = [
  {
    slug: 'como-aprender-a-programar-en-2023',
    category: 'Desarrollo',
    date: '2023-07-23',
    dateDisplay: '23/07/2023',
    title: 'Como aprender a programar en 2023',
    image: '/assets/img/articulo-1.jpg',
  },
  {
    slug: 'como-hacer-animaciones-en-css',
    category: 'Desarrollo',
    date: '2023-07-10',
    dateDisplay: '10/07/2023',
    title: 'Como hacer animaciones en CSS',
    image: '/assets/img/articulo-2.jpg',
  },
  {
    slug: 'como-usar-el-localstorage-en-js',
    category: 'Desarrollo',
    date: '2023-06-17',
    dateDisplay: '17/06/2023',
    title: 'Cómo usar el LocalStorage en JS',
    image: '/assets/img/articulo-3.jpg',
  },
  {
    slug: 'como-maquetar-una-web-desde-cero',
    category: 'Desarrollo',
    date: '2023-05-05',
    dateDisplay: '05/05/2023',
    title: 'Como maquetar una web desde cero',
    image: '/assets/img/articulo-4.jpg',
  },
]

export default function Blog() {
  return (
    <section className="content__page content__blog">
      <header className="blog__header">
        <h1 className="blog__title">Blog</h1>
        <p className="blog__intro">
          Archivo editorial en revisión. Las entradas se muestran como temas
          pendientes de publicación para evitar enlaces a páginas vacías.
        </p>
      </header>

      <section className="blog__articles">
        {articles.map((article) => (
          <article key={article.slug} className="articles__article">
            <div className="article__top">
              <div className="article__category">{article.category}</div>
              <div className="article__image-link article__image-link--disabled">
                <div className="article__mask">
                  <Image
                    src={article.image}
                    className="article__image"
                    alt={`imagen de blog: ${article.title}`}
                    width={400}
                    height={185}
                  />
                </div>
                <div className="article__logo">
                  <i className="article__icon fa-solid fa-book"></i>
                </div>
              </div>
            </div>
            <div className="article__bottom">
              <time dateTime={article.date} className="article__date">
                {article.dateDisplay}
              </time>
              <h2 className="article__title">{article.title}</h2>
              <p className="article__status">Entrada pendiente de publicación.</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}
