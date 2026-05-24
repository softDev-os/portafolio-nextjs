"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ClientScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector(".layout__main");
    if (main) {
      main.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
