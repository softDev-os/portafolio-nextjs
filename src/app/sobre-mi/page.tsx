import type { Metadata } from 'next'
import Image from 'next/image'
import { personal } from '@/data/personal'

export const metadata: Metadata = {
  title: 'Sobre Mí',
  description: 'Información personal y profesional de Juan Fontalvo, Desarrollador Web.',
}

export default function SobreMi() {
  return (
    <section className="content__page content__about">
      <header className="about__header">
        <h1 className="about__title">
          Sobre <span className="title__color">Mi</span>
        </h1>
      </header>

      {/* Información personal */}
      <section className="about__personal-info">
        <article className="personal-info__bio">
          <p className="personal-info__description">{personal.bio}</p>
        </article>
        <div className="personal-info__data">
          <ul className="personal-info__list">
            <li className="personal-info__option">
              <span className="personal-info__title">Edad</span>
              <span className="personal-info__value">{personal.age}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">País</span>
              <span className="personal-info__value">{personal.country}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">Dirección</span>
              <span className="personal-info__value">{personal.address}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">Municipio</span>
              <span className="personal-info__value">{personal.city}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">Correo</span>
              <span className="personal-info__value">{personal.email}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">Teléfono</span>
              <span className="personal-info__value">{personal.phone}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Lo que hago */}
      <section className="about__services">
        <header className="services__header">
          <h2 className="services__title">
            Lo que <span className="title__color">hago</span>
          </h2>
        </header>
        <div className="services__container">
          <article className="services__service">
            <div className="service__icons">
              <i className="service__icon fa-solid fa-code"></i>
            </div>
            <div className="service__content">
              <h3 className="service__title">Programación</h3>
              <p className="service__description">
                Desarrollo de aplicaciones web y soluciones tecnológicas a medida con las
                mejores prácticas del sector.
              </p>
            </div>
          </article>
          <article className="services__service">
            <div className="service__icons">
              <i className="service__icon fa-solid fa-chalkboard-user"></i>
            </div>
            <div className="service__content">
              <h3 className="service__title">Formación</h3>
              <p className="service__description">
                Enseñanza de programación y desarrollo web a estudiantes y profesionales
                que quieren crecer en el área tecnológica.
              </p>
            </div>
          </article>
          <article className="services__service">
            <div className="service__icons">
              <i className="service__icon fa-solid fa-computer"></i>
            </div>
            <div className="service__content">
              <h3 className="service__title">Desarrollo Web</h3>
              <p className="service__description">
                Creación de sitios web modernos, responsivos y optimizados usando
                tecnologías actuales como React, Next.js y más.
              </p>
            </div>
          </article>
          <article className="services__service">
            <div className="service__icons">
              <i className="service__icon fa-solid fa-terminal"></i>
            </div>
            <div className="service__content">
              <h3 className="service__title">Administración</h3>
              <p className="service__description">
                Gestión y mantenimiento de sistemas informáticos, redes y servidores
                para empresas y particulares.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Reseñas */}
      <section className="about__reviews">
        <header className="reviews__header">
          <h2 className="reviews__title">Reseñas</h2>
        </header>
        <div className="reviews__containers">
          <article className="reviews__review">
            <div className="review__image-container">
              <Image
                src="/assets/img/testimonio1.jpg"
                className="review__image"
                alt="Imagen de Testimonio"
                width={90}
                height={90}
              />
            </div>
            <div className="review__description">
              <p className="review__text">
                Excelente profesional, entregó el proyecto a tiempo y con una calidad
                excepcional. Muy recomendado.
              </p>
            </div>
            <div className="review__author">
              <div className="review__author-info">
                <h4 className="review__name">Anna Lopez</h4>
                <h5 className="review__company">Developers S.A</h5>
              </div>
              <div className="review__author-icon">
                <i className="review__icon fa-solid fa-quote-right"></i>
              </div>
            </div>
          </article>
          <article className="reviews__review">
            <div className="review__image-container">
              <Image
                src="/assets/img/testimonio2.jpg"
                className="review__image"
                alt="Imagen de Testimonio"
                width={90}
                height={90}
              />
            </div>
            <div className="review__description">
              <p className="review__text">
                Gran desarrollador, con mucho conocimiento técnico y excelente comunicación
                durante todo el proceso.
              </p>
            </div>
            <div className="review__author">
              <div className="review__author-info">
                <h4 className="review__name">Ruben Martinez</h4>
                <h5 className="review__company">Full Stack S.A.S</h5>
              </div>
              <div className="review__author-icon">
                <i className="review__icon fa-solid fa-quote-right"></i>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Clientes */}
      <section className="about__clients">
        <header className="clients__header">
          <h2 className="clients__title">Clientes</h2>
        </header>
        <div className="clients__container">
          {[1, 2, 3, 4, 5].map((n) => (
            <article key={n} className="clients__item">
              <a href="#" className="clients__link" target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/assets/img/cliente-${n}.png`}
                  className="clients__image"
                  alt={`Logo Cliente ${n}`}
                  width={140}
                  height={80}
                />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Precios */}
      <section className="about__prices">
        <header className="prices__header">
          <h2 className="prices__title">Precios</h2>
        </header>
        <div className="prices__container">
          <article className="prices__box">
            <div className="prices__subtitle">
              <span className="prices__text">Normal</span>
            </div>
            <div className="prices__price">
              <span className="prices__number">$90.000</span>
              <small className="prices__advice">Al mes</small>
            </div>
            <div className="prices__buy">
              <a href="#" className="prices__btn">Prueba Gratis</a>
            </div>
            <div className="prices__reward">Un curso de desarrollo Web</div>
            <div className="prices__reward">Soporte a preguntas y dudas</div>
            <div className="prices__reward">Certificado de finalización</div>
          </article>
          <article className="prices__box">
            <div className="prices__subtitle">
              <span className="prices__text">Premium</span>
            </div>
            <div className="prices__price">
              <span className="prices__number">$140.000</span>
              <small className="prices__advice">Al mes</small>
            </div>
            <div className="prices__buy">
              <a href="#" className="prices__btn">Prueba Gratis</a>
            </div>
            <div className="prices__reward">Cinco cursos de desarrollo Web</div>
            <div className="prices__reward">Soporte a preguntas y dudas</div>
            <div className="prices__reward">Certificado de finalización</div>
          </article>
        </div>
      </section>

      {/* Información Extra */}
      <section className="about__extra">
        <header className="extra__header">
          <h2 className="extra__title">
            Información <span className="title__color">Extra</span>
          </h2>
        </header>
        <div className="extra__container">
          <article className="extra__info">
            <i className="extra__icon fa-solid fa-heart"></i>
            <h4 className="extra__subtitle">Alumnos Contentos</h4>
            <span className="extra__quantity">375.000</span>
          </article>
          <article className="extra__info">
            <i className="extra__icon fa-solid fa-clock"></i>
            <h4 className="extra__subtitle">Horas de contenido</h4>
            <span className="extra__quantity">800</span>
          </article>
          <article className="extra__info">
            <i className="extra__icon fa-solid fa-star"></i>
            <h4 className="extra__subtitle">Puntos</h4>
            <span className="extra__quantity">10</span>
          </article>
        </div>
      </section>
    </section>
  )
}
