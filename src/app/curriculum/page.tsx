import type { Metadata } from 'next'
import Image from 'next/image'
import { education, experience, certificates } from '@/data/experience'
import { designSkills, codeSkills, competences } from '@/data/skills'

export const metadata: Metadata = {
  title: 'Curriculum',
  description: 'Formación, experiencia laboral y habilidades de Juan Fontalvo.',
}

export default function Curriculum() {
  return (
    <section className="content__page content__curriculum">
      <header className="curriculum__header">
        <h1 className="curriculum__title">Curriculum</h1>
      </header>

      <div className="curriculum__container">
        {/* Columna izquierda — Formación y Experiencia */}
        <section className="curriculum__left">
          <header className="curriculum__subheader">
            <h2 className="curriculum__subtitle">Formación</h2>
          </header>
          <div className="curriculum__timelines">
            {education.map((item, index) => (
              <article key={index} className="timelines__timeline">
                <header className="timeline__header">
                  <h4 className="timeline__year">{item.year}</h4>
                  <span className="timeline__company">{item.company}</span>
                </header>
                <div className="timeline__divider"></div>
                <div className="timeline__description-container">
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <header className="curriculum__subheader">
            <h2 className="curriculum__subtitle">Experiencia</h2>
          </header>
          <div className="curriculum__timelines">
            {experience.map((item, index) => (
              <article key={index} className="timelines__timeline">
                <header className="timeline__header">
                  <h4 className="timeline__year">{item.year}</h4>
                  <span className="timeline__company">{item.company}</span>
                </header>
                <div className="timeline__divider"></div>
                <div className="timeline__description-container">
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Columna derecha — Habilidades y Competencias */}
        <section className="curriculum__right">
          <header className="curriculum__subheader">
            <h2 className="curriculum__subtitle">
              Habilidades de <span className="subtitles__color">Diseño</span>
            </h2>
          </header>
          <div className="curriculum__skills">
            {designSkills.map((skill) => (
              <div key={skill.name}>
                <article className="skills__title">
                  <h4 className="skills__text">{skill.name}</h4>
                  <span className="skills__number">{skill.percentage}%</span>
                </article>
                <div className="skills__progressbar">
                  <div className={`skills__percentage ${skill.className}`}></div>
                </div>
              </div>
            ))}
          </div>

          <header className="curriculum__subheader">
            <h2 className="curriculum__subtitle">
              Habilidades de <span className="subtitles__color">Código</span>
            </h2>
          </header>
          <div className="curriculum__skills">
            {codeSkills.map((skill) => (
              <div key={skill.name}>
                <article className="skills__title">
                  <h4 className="skills__text">{skill.name}</h4>
                  <span className="skills__number">{skill.percentage}%</span>
                </article>
                <div className="skills__progressbar">
                  <div className={`skills__percentage ${skill.className}`}></div>
                </div>
              </div>
            ))}
          </div>

          <header className="curriculum__subheader">
            <h2 className="curriculum__subtitle">Competencias</h2>
          </header>
          <div className="curriculum__knowledges">
            <ul className="knowledges__list">
              {competences.map((item) => (
                <li key={item} className="knowledges__option">{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Certificados */}
      <div className="curriculum__certificates">
        <header className="curriculum__subheader">
          <h2 className="curriculum__subtitle">Certificados</h2>
        </header>
        <section className="certificates__container">
          {certificates.map((cert, index) => (
            <article key={index} className="certificates__certificate">
              <div className="certificate__logo">
                <Image
                  src={cert.image}
                  className="certificate__image"
                  alt="Certificado"
                  width={100}
                  height={100}
                />
              </div>
              <div className="certificate__content">
                <h4 className="certificate__title">{cert.title}</h4>
                <span className="certificate__id">ID Verificación: {cert.id}</span>
                <span className="certificate__date">{cert.date}</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  )
}
