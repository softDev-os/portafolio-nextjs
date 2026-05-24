"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ClientScrollReset({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector(".layout__main") as HTMLElement | null;
    const layout = document.querySelector(".layout") as HTMLElement | null;

    const reset = () => {
      if (!main) return;
      main.style.scrollBehavior = "auto";
      main.scrollTop = 0;
    };

    // Debug: log layout metrics on every route change
    console.log("[ClientScrollReset]", {
      route: pathname,
      layoutOffsetTop: layout?.offsetTop,
      layoutHeight: layout?.offsetHeight,
      layoutRectTop: layout?.getBoundingClientRect().top,
      layoutRectBottom: layout?.getBoundingClientRect().bottom,
      main: main ? {
        scrollTop: main.scrollTop,
        offsetHeight: main.offsetHeight,
      } : null,
      bodyHeight: document.body.offsetHeight,
      viewportHeight: window.innerHeight,
    });

    // immediate attempt
    reset();

    // after browser paint + layout
    const raf1 = requestAnimationFrame(reset);

    // one more frame for late-settling content (images, fonts)
    const raf2 = requestAnimationFrame(() => {
      requestAnimationFrame(reset);
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return <>{children}</>;
}
