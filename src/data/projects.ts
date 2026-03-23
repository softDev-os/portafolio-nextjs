export type Project = {
  id: string
  title: string
  image: string
  category: string
  iconClass: string
  url: string
}

export const projects: Project[] = [
  {
    id: 'produccion-video',
    title: 'Producción de video',
    image: '/assets/img/galeria-1.jpg',
    category: 'Videos',
    iconClass: 'fa-solid fa-video',
    url: '#',
  },
  {
    id: 'master-javascript',
    title: 'Master Javascript',
    image: '/assets/img/galeria-2.jpg',
    category: 'Cursos',
    iconClass: 'fa-solid fa-code',
    url: '#',
  },
  {
    id: 'master-react',
    title: 'Master en React',
    image: '/assets/img/galeria-3.jpg',
    category: 'Cursos',
    iconClass: 'fa-solid fa-code',
    url: '#',
  },
  {
    id: 'red-social-twitter',
    title: 'Red social tipo Twitter',
    image: '/assets/img/galeria-4.jpg',
    category: 'Web',
    iconClass: 'fa-brands fa-twitter',
    url: '#',
  },
  {
    id: 'master-logica',
    title: 'Master en logica de Programación',
    image: '/assets/img/galeria-5.jpg',
    category: 'Cursos',
    iconClass: 'fa-solid fa-code',
    url: '#',
  },
  {
    id: 'galeria-imagenes',
    title: 'Galleria de imagenes',
    image: '/assets/img/galeria-6.jpg',
    category: 'Proyecto',
    iconClass: 'fa-solid fa-image',
    url: '#',
  },
]

export const categories: string[] = [
  'Todo',
  'Cursos',
  'Web',
  'Redes Sociales',
  'Videos',
  'Proyectos',
]
