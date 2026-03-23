"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" className="nav-float__icon">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    href: "/sobre-mi",
    label: "Sobre mí",
    icon: (
      <svg viewBox="0 0 24 24" className="nav-float__icon">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
  {
    href: "/curriculum",
    label: "Curriculum",
    icon: (
      <svg viewBox="0 0 24 24" className="nav-float__icon">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
  {
    href: "/portafolio",
    label: "Portafolio",
    icon: (
      <svg viewBox="0 0 24 24" className="nav-float__icon">
        <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.99 16.54 2 14.7 2c-1.05 0-1.96.54-2.57 1.32L12 3.9l-.13-.59C11.26 2.54 10.35 2 9.3 2 7.46 2 6 2.99 6 4.7c0 .44.1.86.18 1.3H4C2.9 6 2 6.9 2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    href: "/blog",
    label: "Blog",
    icon: (
      <svg viewBox="0 0 24 24" className="nav-float__icon">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  {
    href: "/contacto",
    label: "Contacto",
    icon: (
      <svg viewBox="0 0 24 24" className="nav-float__icon">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__profile">
          <div className="sidebar__avatar-wrapper">
            <Image
              src="/assets/img/foto-user.png"
              alt="Foto de perfil de Juan Fontalvo"
              width={180}
              height={180}
              className="sidebar__avatar"
              priority
            />
          </div>
          <h1 className="sidebar__name">Juan Fontalvo</h1>
          <p className="sidebar__role">Desarrollador Web</p>
        </div>

        <div className="sidebar__social">
          <a
            href="https://github.com/softDev-os"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-item"
          >
            <span className="sidebar__social-link">
              <svg viewBox="0 0 24 24" className="sidebar__social-icon">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.8 1.3 3.48.99.1-.77.41-1.3.75-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </span>
            <span className="sidebar__social-name">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/juan-fontalvo-softdev"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-item sidebar__social-item--linkedin"
          >
            <span className="sidebar__social-link">
              <svg viewBox="0 0 24 24" className="sidebar__social-icon">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </span>
            <span className="sidebar__social-name">LinkedIn</span>
          </a>

          <a
            href="https://www.instagram.com/__softdev__/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-item"
          >
            <span className="sidebar__social-link">
              <svg viewBox="0 0 24 24" className="sidebar__social-icon">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </span>
            <span className="sidebar__social-name">Instagram</span>
          </a>
        </div>

        <div className="user-info__buttons">
          <a
            href="/CV_Juan_Fontalvo_IT_Specialist.pdf"
            download
            className="sidebar__cv-btn"
            aria-label="Descargar currículum en PDF"
          >
            Descargar CV
          </a>
        </div>

        <p className="sidebar__copy">
          © {new Date().getFullYear()} Juan Fontalvo
        </p>
      </aside>

      {/* Nav flotante */}
      <nav className="nav-float">
        <ul className="nav-float__list">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href} className="nav-float__item">
              <span className="nav-float__overlay">{label}</span>
              <Link
                href={href}
                className={`nav-float__link ${pathname === href ? "nav-float__link--active" : ""}`}
                title={label}
              >
                {icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
