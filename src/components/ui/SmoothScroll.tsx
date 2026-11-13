"use client";

import React, { useEffect, useRef } from "react";
import { useLenis } from "@/hooks/useLenis";

/* اسکرول نرم + نوار پیشرفت اسکرول بالای صفحه */
export function SmoothScroll() {
  useLenis();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]">
      <div
        ref={bar}
        className="h-full origin-right bg-gradient-to-l from-[#f3dcc4] via-[#c8a07c] to-[#b3865f] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

export default SmoothScroll;
