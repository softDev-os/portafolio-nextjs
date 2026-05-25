import Link from "next/link";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/casos-reales", label: "Casos reales" },
  { href: "/perfil", label: "Perfil" },
  { href: "/credenciales", label: "Credenciales" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const socialLinks = [
  {
    href: "https://github.com/softDev-os",
    label: "GitHub",
    icon: "fa-brands fa-github",
  },
  {
    href: "https://www.linkedin.com/in/juan-fontalvo-softdev",
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin",
  },
  {
    href: "https://www.instagram.com/__softdev__/",
    label: "Instagram",
    icon: "fa-brands fa-instagram",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer__social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={link.label}
            >
              <i className={link.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Juan Fontalvo. Architect / AI Engineer.</p>
      </div>
    </footer>
  );
}
