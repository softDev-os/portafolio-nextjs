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
      'Fundamento técnico para construir interfaces, integrar servicios y sostener automatizaciones con criterios de mantenibilidad.',
  },
]

export const experience: TimelineItem[] = [
  {
    year: '2022-Actualidad',
    company: 'Allpc21',
    title: 'Implementación y soporte de soluciones informáticas',
    description:
      'Trabajo directo con necesidades de clientes, instalación de soluciones informáticas y traducción de requerimientos en entregas concretas.',
  },
  {
    year: '2021-2022',
    company: 'New Tecnology',
    title: 'Continuidad técnica para usuarios finales',
    description:
      'Diagnóstico y resolución de problemas técnicos con foco en continuidad operativa para usuarios finales.',
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
