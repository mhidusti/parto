"use client";

import React, { useEffect, useRef, useState } from "react";

type Variant = "up" | "fade" | "left" | "right" | "scale";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** تأخیر به میلی‌ثانیه (برای ورود پله‌ای آیتم‌ها) */
  delay?: number;
  variant?: Variant;
}

const hidden: Record<Variant, string> = {
  up: "translate3d(0,28px,0)",
  fade: "none",
  left: "translate3d(-36px,0,0)",
  right: "translate3d(36px,0,0)",
  scale: "scale(0.94)",
};

export function Reveal({ children, className = "", delay = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-revealed={isVisible}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : hidden[variant],
        transition: `opacity 900ms ease ${delay}ms, transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;
