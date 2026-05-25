"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "Inicio",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="nav-float__icon"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    href: "/casos-reales",
    label: "Casos reales",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="nav-float__icon"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.99 16.54 2 14.7 2c-1.05 0-1.96.54-2.57 1.32L12 3.9l-.13-.59C11.26 2.54 10.35 2 9.3 2 7.46 2 6 2.99 6 4.7c0 .44.1.86.18 1.3H4C2.9 6 2 6.9 2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    href: "/perfil",
    label: "Perfil",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="nav-float__icon"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
  {
    href: "/credenciales",
    label: "Credenciales",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="nav-float__icon"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
  {
    href: "/blog",
    label: "Blog",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="nav-float__icon"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  {
    href: "/contacto",
    label: "Contacto",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="nav-float__icon"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
] as const;

export default function NavFloat() {
  const pathname = usePathname();

  return (
    <nav className="nav-float" aria-label="Navegación principal">
      <ul className="nav-float__list">
        {navLinks.map(({ href, label, icon }) => (
          <li key={href} className="nav-float__item">
            <span className="nav-float__overlay">{label}</span>
            <Link
              href={href}
              aria-label={label}
              aria-current={pathname === href ? "page" : undefined}
              className={`nav-float__link ${pathname === href ? "nav-float__link--active" : ""}`}
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
