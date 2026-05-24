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
    const reset = () => {
      const main = document.querySelector(
        ".layout__main",
      ) as HTMLElement | null;
      if (!main) return;
      main.style.scrollBehavior = "auto";
      main.scrollTop = 0;
    };

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
