export type TimelineItem = {
  year: string
  company: string
  title: string
  description: string
}

export type Certificate = {
  image: string
  title: string
  id: string
  date: string
}

export const education: TimelineItem[] = [
  {
    year: '2023',
    company: 'Udemy',
    title: 'Desarrollo Web',
    description:
      'Formación completa en desarrollo web moderno incluyendo HTML, CSS, JavaScript, React, PHP y más.',
  },
  {
    year: '2019',
    company: 'Armada Nacional De Colombia',
    title: 'Servicio Militar',
    description:
      'Servicio militar prestado en la Armada Nacional de Colombia con apoyo en sistemas de información.',
  },
]

export const experience: TimelineItem[] = [
  {
    year: '2022-Actualidad',
    company: 'Allpc21',
    title: 'Venta e Instalacion de sistemas informaticos',
    description:
      'Responsable de la venta, instalación y configuración de sistemas informáticos para clientes corporativos y particulares.',
  },
  {
    year: '2021-2022',
    company: 'New Tecnology',
    title: 'Tecnico en mantenimiento de computadoras',
    description:
      'Técnico especializado en mantenimiento preventivo y correctivo de equipos de cómputo.',
  },
  {
    year: '2019-2020',
    company: 'Armada Nacional De Colombia',
    title: 'Servicio Militar',
    description:
      'Apoyo técnico en sistemas de información durante el servicio militar.',
  },
]

export const certificates: Certificate[] = [
  {
    image: '/assets/img/certificado-1.png',
    title: 'Master en PHP, SQL, POO, MVC, +',
    id: 'XXXXXX',
    date: '10 de junio 2023',
  },
  {
    image: '/assets/img/certificado-1.png',
    title: 'Master en maquetación Web avanzada',
    id: 'XXXXXX',
    date: '10 de agosto 2023',
  },
]
