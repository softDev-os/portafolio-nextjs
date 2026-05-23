import type { Metadata } from "next";
import Link from "next/link";
import {
  checkFlagshipCompleteness,
  getFlagshipCaseStudies,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Casos reales de automatización e IA",
  description:
    "Tres casos de prueba sobre WhatsApp, soporte con handoff humano y memoria persistente para agentes.",
};

export default function Portafolio() {
  const flagshipCaseStudies = getFlagshipCaseStudies();
  const completeness = checkFlagshipCompleteness(flagshipCaseStudies);

  return (
    <section className="content__page content__portfolio">
      <header className="portfolio__header">
        <p className="portfolio__eyebrow">Prueba antes de contacto</p>
        <h1 className="portfolio__title">Casos reales</h1>
        <p className="portfolio__intro">
          Un resumen conservador de sistemas de automatización e IA aplicados a operaciones reales.
        </p>
      </header>

      {!completeness.isComplete ? (
        <section className="portfolio__notice" aria-live="polite">
          <h2>Prueba incompleta</h2>
          <p>
            Falta configurar parte del set flagship, así que esta página no afirma un conjunto completo de casos.
          </p>
        </section>
      ) : (
        <section className="portfolio__case-list" aria-label="Casos flagship">
          {flagshipCaseStudies.map((caseStudy, index) => (
            <article key={caseStudy.id} className="portfolio__case-card">
              <p className="portfolio__case-index">Caso {index + 1}</p>
              <p className="portfolio__case-audience">{caseStudy.audience}</p>
              <h2 className="portfolio__case-title">{caseStudy.title}</h2>
              <div className="portfolio__case-grid">
                <section>
                  <h3>Problema</h3>
                  <p>{caseStudy.problem}</p>
                </section>
                <section>
                  <h3>Solución</h3>
                  <p>{caseStudy.solution}</p>
                </section>
                <section>
                  <h3>Resultados</h3>
                  <ul>
                    {caseStudy.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </section>
              </div>
              <ul className="portfolio__case-stack" aria-label="Stack del caso">
                {caseStudy.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <p className="portfolio__case-note">{caseStudy.evidenceNote}</p>
            </article>
          ))}
        </section>
      )}

      <div className="portfolio__next-step">
        <p>Si estos problemas se parecen a tu operación, el siguiente paso es una conversación calificada.</p>
        <Link href="/contacto" className="home-hero__cta-link home-hero__cta-link--secondary">
          Contactar con contexto
        </Link>
      </div>
    </section>
  );
}
