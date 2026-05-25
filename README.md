# tech-local.com

Portfolio profesional de **Juan Fontalvo — Architect / AI Engineer**.

Sitio estático generado con Next.js, desplegado en Vercel. Diseñado para convertir visitantes en leads calificados mostrando casos reales de automatización con IA, perfil profesional y credenciales verificables.

**[tech-local.com](https://tech-local.com/)**

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Estilos | CSS global modularizado + variables CSS |
| Tipografía | Poppins (Google Fonts) |
| Iconos | SVG inline |
| Hosting | Vercel |
| Analytics | Vercel Analytics |
| CI/CD | GitHub → Vercel auto-deploy |

## Rutas

| Ruta | Página | Contenido |
|------|--------|-----------|
| `/` | Home | Hero + CTAs |
| `/casos-reales` | Portfolio | 3 casos flagship con screenshots de n8n |
| `/perfil` | Perfil | Bio profesional, stack, servicios |
| `/credenciales` | Credenciales | Formación, experiencia, certificaciones |
| `/blog` | Blog | 3 artículos sobre automatización, IA y handoff |
| `/contacto` | Contacto | WhatsApp bot + canales secundarios |

## Features

- **Dark / light mode** con toggle y detección de preferencia del sistema
- **Open Graph image** dinámica generada en el edge
- **Sitemap + robots.txt** para indexación
- **Custom 404** en español
- **Scrollbar** personalizado marca
- **Lighthouse 100/100/100/100** en las 5 páginas principales
- **CSS variables** para temas, sin colores hardcodeados
- **Diagramas de flujo** SVG + screenshots reales de workflows

## Desarrollo

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # build de producción
pnpm lint        # ESLint
pnpm typecheck   # TypeScript
pnpm test        # Vitest
pnpm test:e2e    # Playwright smoke tests
```

Los artículos del blog se editan en `src/data/blog.ts`. No hay CMS — el contenido es estático y versionado.

## Convenciones

- **Idioma**: español neutro para contenido descriptivo. Inglés para marca, términos técnicos y títulos de caso.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
- **Tono**: conservador, orientado a evidencia, sin claims inflados.

## Estructura

```
src/
├── app/                  # App Router (rutas, layouts, metadata)
│   ├── blog/[slug]/      # Artículos dinámicos (SSG)
│   ├── casos-reales/     # Portfolio
│   ├── contacto/         # Contacto + WhatsApp CTA
│   ├── credenciales/     # Credenciales
│   ├── perfil/           # Perfil profesional
│   ├── layout.tsx        # Root layout (sidebar + footer + theme)
│   ├── not-found.tsx     # 404 custom
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/           # Sidebar, Footer, ThemeToggle, CaseDiagram
├── data/                 # Contenido (blog, personal, projects, skills)
├── styles/               # CSS global modularizado por tema/ruta
└── public/assets/        # Imágenes, fuentes, favicon
```

Ver `docs/css-modularization.md` para el orden de imports, reglas de cascada y plan opcional de split futuro.
