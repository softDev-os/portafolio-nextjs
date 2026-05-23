import type { Metadata } from "next";
import Link from "next/link";
import { getFlagshipCaseStudies } from "@/data/projects";

export const metadata: Metadata = {
  title: "Juan Fontalvo — Architect / AI Engineer",
  description:
    "Consultoría en arquitectura de software y automatización con IA basada en casos reales.",
};

export default function Home() {
  const flagshipCaseStudies = getFlagshipCaseStudies();

  return (
    <section className="content__page content__page--home">
      <header className="home-hero">
        <p className="home-hero__eyebrow">Arquitectura de software + IA aplicada</p>
        <h1 className="page__name home-hero__name">
          Juan <span className="home-hero__name-highlight">Fontalvo</span>
        </h1>
        <div className="home-hero__rule" aria-hidden="true" />
        <h2 className="page__job home-hero__job">Architect / AI Engineer</h2>
        <p className="home-hero__tagline">
          Diseño sistemas para convertir conversaciones, soporte y memoria de agentes en workflows operativos que un equipo puede auditar y escalar.
        </p>
        <ul className="home-hero__proof-list" aria-label="Casos de prueba principales">
          {flagshipCaseStudies.map((caseStudy) => (
            <li key={caseStudy.id}>{caseStudy.title}</li>
          ))}
        </ul>
        <div className="home-hero__cta">
          <Link href="/portafolio" className="home-hero__cta-link home-hero__cta-link--primary">
            Ver casos reales
          </Link>
          <Link href="/contacto" className="home-hero__cta-link home-hero__cta-link--secondary">
            Hablar después de ver prueba
          </Link>
        </div>
      </header>
    </section>
  );
}
