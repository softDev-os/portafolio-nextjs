export type TimelineItem = {
  year: string
  company: string
  title: string
  description: string
}

export type Certificate = {
  image: string
  title: string
  id?: string
  date: string
}

export const education: TimelineItem[] = [
  {
    year: '2023',
    company: 'Udemy',
    title: 'Desarrollo web moderno',
    description:
      'Base técnica para construir interfaces, integrar servicios y sostener automatizaciones con criterios de mantenibilidad.',
  },
  {
    year: '2019',
    company: 'Armada Nacional De Colombia',
    title: 'Servicio Militar',
    description:
      'Experiencia en entornos con disciplina operativa, registro de información y soporte a sistemas internos.',
  },
]

export const experience: TimelineItem[] = [
  {
    year: '2022-Actualidad',
    company: 'Allpc21',
    title: 'Venta e instalación de sistemas informáticos',
    description:
      'Trabajo directo con necesidades de clientes, instalación de soluciones informáticas y traducción de requerimientos en entregas concretas.',
  },
  {
    year: '2021-2022',
    company: 'New Tecnology',
    title: 'Técnico en mantenimiento de computadoras',
    description:
      'Diagnóstico y resolución de problemas técnicos con foco en continuidad operativa para usuarios finales.',
  },
  {
    year: '2019-2020',
    company: 'Armada Nacional De Colombia',
    title: 'Servicio Militar',
    description:
      'Apoyo técnico en sistemas de información dentro de un contexto institucional y operativo.',
  },
]

export const certificates: Certificate[] = [
  {
    image: '/assets/img/certificado-1.png',
    title: 'Master en PHP, SQL, POO, MVC, +',
    date: '10 de junio 2023',
  },
  {
    image: '/assets/img/certificado-1.png',
    title: 'Master en maquetación Web avanzada',
    date: '10 de agosto 2023',
  },
]
