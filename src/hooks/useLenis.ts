"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LenisWindow = Window & { __lenis?: Lenis };

/* اسکرول نرم (Lenis) — روی لمس موبایل اسکرول بومی می‌ماند و فقط چرخ ماوس/تاچ‌پد نرم می‌شود */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.085, // هرچه کمتر، حرکت نرم‌تر و روان‌تر
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });
    (window as LenisWindow).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as LenisWindow).__lenis;
    };
  }, []);
}
