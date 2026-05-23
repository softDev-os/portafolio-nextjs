import type { Metadata } from 'next'
import Image from 'next/image'
import { education, experience, certificates } from '@/data/experience'
import { capabilityGroups } from '@/data/skills'

export const metadata: Metadata = {
  title: 'Credenciales',
  description:
    'Credenciales y señales de autoridad de Juan Fontalvo como Architect / AI Engineer consultor.',
}

function hasVerifiableCertificateId(id: string | undefined) {
  return Boolean(id && id.trim() !== '' && !id.includes('XXXXXX'))
}

export default function Curriculum() {
  return (
    <section className="content__page content__curriculum">
      <header className="curriculum__header">
        <h1 className="curriculum__title">Credenciales</h1>
      </header>

      <div className="curriculum__container">
        {/* Columna izquierda — Formación y experiencia */}
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

        {/* Columna derecha — Capacidades */}
        <section className="curriculum__right">
          <header className="curriculum__subheader">
            <h2 className="curriculum__subtitle">Capacidades</h2>
          </header>
          <div className="curriculum__capabilities">
            {capabilityGroups.map((group) => (
              <article key={group.id} className="capability-card">
                <h3 className="capability-card__title">{group.title}</h3>
                <ul className="capability-card__evidence">
                  {group.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul className="capability-card__tools">
                  {group.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            ))}
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
                  {hasVerifiableCertificateId(cert.id) ? (
                    <span className="certificate__id">ID Verificación: {cert.id}</span>
                  ) : null}
                  <span className="certificate__date">{cert.date}</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  )
}
