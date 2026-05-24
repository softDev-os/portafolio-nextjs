"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "dark",
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage disabled — noop */
    }
  }

  return (
    <button
      onClick={toggle}
      className="sidebar__theme-toggle"
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {dark ? (
        /* Sun icon — shown when dark, click to go light */
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM3.55 4.96l1.41-1.41 1.79 1.8-1.41 1.4-1.79-1.79zm16.49.01-1.79 1.79-1.41-1.41 1.79-1.79-1.41-1.41L18.05 3.55l1.99 1.42zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.55 19.04l1.41 1.41 1.79-1.8-1.41-1.4-1.79 1.79zm16.49.01-1.79-1.79 1.41-1.41 1.79 1.79-1.41 1.41zM1 11h3v2H1v-2zm19 0h3v2h-3v-2z" />
        </svg>
      ) : (
        /* Moon icon — shown when light, click to go dark */
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-5.4-5.4c0-2.1 1.2-3.92 2.94-4.8A8.96 8.96 0 0 0 12 3z" />
        </svg>
      )}
    </button>
  );
}
