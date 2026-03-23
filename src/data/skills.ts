export type Skill = {
  name: string
  percentage: number
  className: string
}

export const designSkills: Skill[] = [
  { name: 'Diseño Web', percentage: 95, className: 'skills__percentage--p1' },
  { name: 'Diseño Mockups', percentage: 70, className: 'skills__percentage--p2' },
  { name: 'Diseño de Logos', percentage: 60, className: 'skills__percentage--p3' },
  { name: 'Diseño Banners', percentage: 80, className: 'skills__percentage--p4' },
]

export const codeSkills: Skill[] = [
  { name: 'HTML/CSS', percentage: 97, className: 'skills__percentage--p5' },
  { name: 'JavaScript', percentage: 85, className: 'skills__percentage--p6' },
  { name: 'React', percentage: 80, className: 'skills__percentage--p7' },
  { name: 'PHP', percentage: 92, className: 'skills__percentage--p8' },
  { name: 'Laravel', percentage: 81, className: 'skills__percentage--p9' },
]

export const competences: string[] = [
  'Programación',
  'Desarrollo Web',
  'Diseño Web',
  'Redes Sociales',
  'Comunicación',
  'Edición de Videos',
  'Formación',
]
