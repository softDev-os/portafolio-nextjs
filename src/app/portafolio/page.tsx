"use client";

import type { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";
import { projects, categories } from "@/data/projects";

export default function Portafolio() {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filtered =
    activeCategory === "Todo"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="content__page content__portfolio">
      <header className="portfolio__header">
        <h1 className="portfolio__title">Portafolio</h1>
      </header>

      <nav className="portfolio__navbar">
        <ul className="portfolio__menu">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`portfolio__option${activeCategory === cat ? " portfolio__option--active" : ""}`}
            >
              <button
                className="portfolio__link"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="portfolio__gallery">
        {filtered.map((project) => (
          <figure key={project.id} className="gallery__item">
            <div className="gallery__container-image">
              <a href={project.url} className="gallery__link">
                <div className="gallery__image-wrapper">
                  <Image
                    src={project.image}
                    className="gallery__image"
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </a>
            </div>
            <figcaption className="gallery__title">{project.title}</figcaption>
            <i className={`gallery__icon ${project.iconClass}`}></i>
            <span className="gallery__category">{project.category}</span>
          </figure>
        ))}
      </section>
    </section>
  );
}
