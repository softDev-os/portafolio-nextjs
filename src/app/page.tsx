import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Juan Fontalvo — Desarrollador Web',
  description: 'Portafolio de Juan Fontalvo, Desarrollador Web.',
}

export default function Home() {
  return (
    <section className="content__page">
      <h1 className="page__name">Juan Fontalvo</h1>
      <h2 className="page__job">Desarrollador Web</h2>
    </section>
  )
}
