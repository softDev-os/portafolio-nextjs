import type { Metadata } from "next";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctame para proyectos web y consultas profesionales.",
};

export default function Contacto() {
  return (
    <section className="content__page content__contact">
      <header className="contact__header">
        <h1 className="contact__title">Contacto</h1>
      </header>

      <div className="contact__container">
        {/* Info de contacto */}
        <section className="contact__info">
          <div className="contact__data">
            <i className="contact__icon fa-solid fa-location-dot"></i>
            <h2 className="contact__subtitle">{personal.city}</h2>
          </div>
          <a href={`tel:+57${personal.phone}`} className="contact__data">
            <i className="contact__icon fa-solid fa-phone"></i>
            <span className="contact__subtitle">
              +57 {personal.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
            </span>
          </a>
          <a href={`mailto:${personal.email}`} className="contact__data">
            <i className="contact__icon fa-solid fa-envelope"></i>
            <span className="contact__subtitle">{personal.email}</span>
          </a>
          <div className="contact__data">
            <i className="contact__icon fa-solid fa-circle-check"></i>
            <h2 className="contact__subtitle">Desarrollador Freelance</h2>
          </div>
        </section>

        {/* Formulario */}
        <section className="contact__form-box">
          <div className="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127176.58090830856!2d-74.24771!3d4.6482839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
              title="Ubicación en Bogotá"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <header className="contact__form-header">
            <h3 className="form-header__title">
              ¿Como puedo <span className="title__color">ayudarte?</span>
            </h3>
          </header>

          <form action="#" className="contact__form">
            <div className="form__container">
              <section className="form__left">
                <div className="form__form-group">
                  <input
                    type="text"
                    className="form__input"
                    autoComplete="off"
                    name="name"
                    required
                    placeholder=" "
                    id="name"
                  />
                  <label htmlFor="name" className="form__label">
                    Nombre
                  </label>
                </div>
                <div className="form__form-group">
                  <input
                    type="email"
                    className="form__input"
                    autoComplete="off"
                    name="email"
                    required
                    placeholder=" "
                    id="email"
                  />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                </div>
                <div className="form__form-group">
                  <input
                    type="text"
                    className="form__input"
                    autoComplete="off"
                    name="subject"
                    required
                    placeholder=" "
                    id="subject"
                  />
                  <label htmlFor="subject" className="form__label">
                    Asunto
                  </label>
                </div>
              </section>
              <section className="form__right">
                <div className="form__form-group form__group--textarea">
                  <textarea
                    className="form__input form__input--textarea"
                    autoComplete="off"
                    name="message"
                    required
                    placeholder=" "
                    id="message"
                  />
                  <label htmlFor="message" className="form__label">
                    Mensaje
                  </label>
                </div>
              </section>
            </div>
            <input
              type="submit"
              className="form__button"
              value="Enviar Mensaje"
            />
          </form>
        </section>
      </div>
    </section>
  );
}
