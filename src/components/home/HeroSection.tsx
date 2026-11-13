"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GoldButton, ArrowLeft, Chevron, Photo } from "./primitives";
import { Parallax } from "@/components/ui/Parallax";

const slides = [
  { eyebrow: "درخشش خاص شما", title: "با جواهراتی ماندگار و بی‌نظیر", sub: "زیبایی، اصالت، اعتماد", href: "/collection" },
  { eyebrow: "مجموعه جدید", title: "نگین‌هایی که داستان می‌گویند", sub: "ساخته‌شده با دقت و عشق", href: "/collection" },
  { eyebrow: "هدیه‌ای ماندگار", title: "لحظه‌های ناب را درخشان کنید", sub: "ضمانت اصالت و کیفیت", href: "/product" },
];

const AUTOPLAY = 6500;

/* جرقه‌های شناور (موقعیت ثابت تا با SSR ناسازگار نشود) */
const sparkles = [
  { top: "22%", left: "12%", s: 10, d: "0s" },
  { top: "62%", left: "26%", s: 7, d: "1.2s" },
  { top: "30%", left: "40%", s: 12, d: "2.1s" },
  { top: "74%", left: "48%", s: 8, d: "0.6s" },
  { top: "18%", left: "58%", s: 6, d: "1.7s" },
  { top: "48%", left: "8%", s: 8, d: "2.6s" },
];

export function HeroSection() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = slides[i];
  const go = useCallback((d: number) => setI((v) => (v + d + slides.length) % slides.length), []);
  const pad = (n: number) => String(n).padStart(2, "0");

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY);
    return () => window.clearTimeout(t);
  }, [i, paused, go]);

  return (
    <section
      className="relative h-[600px] w-full overflow-hidden bg-[#2a1a12] sm:h-[640px] lg:h-[660px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Parallax speed={0.14} className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
        <Photo
          src="/images/hero/hero.png"
          gradient="radial-gradient(60% 80% at 22% 40%, #d7b79c 0%, #8d6249 38%, #3b2419 75%, #1c110c 100%)"
          className="anim-kenburns absolute inset-0"
          style={{ backgroundPosition: "left center" }}
        />
      </Parallax>

      {/* سایه برای خوانایی متن: موبایل از پایین، دسکتاپ از راست */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c110c]/90 via-[#2a1a12]/45 to-[#1c110c]/20 lg:bg-gradient-to-l lg:from-[#1c110c]/85 lg:via-[#2a1a12]/35 lg:to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1c110c]/70 to-transparent" />

      {/* جرقه‌ها */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {sparkles.map((sp, k) => (
          <span
            key={k}
            className="anim-twinkle absolute rotate-45 bg-gradient-to-br from-[#fff4e4] to-[#e2bf9f]"
            style={{ top: sp.top, left: sp.left, width: sp.s, height: sp.s, animationDelay: sp.d }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex h-full max-w-[1360px] items-end px-5 pb-28 pt-20 sm:px-10 lg:items-center lg:pb-0 lg:pt-16">
        <div className="w-full max-w-[460px] text-right">
          <p key={`e${i}`} className="anim-up text-[13px] font-medium text-[#f0d8c0] sm:text-[15px]">
            <span className="ml-3 inline-block h-px w-8 bg-[#e2bf9f]/80 align-middle" />
            {s.eyebrow}
          </p>
          <h1 key={`t${i}`} className="anim-up mt-3 text-[30px] font-bold leading-[1.5] text-[#fbf1e6] sm:mt-4 sm:text-[38px] lg:text-[44px]" style={{ animationDelay: "120ms" }}>
            {s.title}
          </h1>
          <p key={`s${i}`} className="anim-up mt-3 text-[14px] text-[#e8d4bf] sm:text-[15px]" style={{ animationDelay: "240ms" }}>
            {s.sub}
          </p>
          <div key={`b${i}`} className="anim-up" style={{ animationDelay: "360ms" }}>
            <GoldButton href={s.href} className="mt-6 !px-8 !py-3 !text-[14px] sm:mt-8 sm:!px-9">
              مشاهده مجموعه
              <ArrowLeft className="h-4 w-4" />
            </GoldButton>
          </div>
        </div>

        {/* شمارنده و نوار پیشرفت */}
        <div className="absolute bottom-[104px] right-1/2 hidden w-[200px] translate-x-1/2 items-center gap-3 text-[11px] text-[#f0d8c0] lg:flex" dir="ltr">
          <span>{pad(i + 1)}</span>
          <span className="relative h-px flex-1 overflow-hidden bg-[#f0d8c0]/30">
            <span
              key={`p${i}`}
              className="anim-progress absolute inset-0 bg-[#f0d8c0]"
              style={{ animationDuration: `${AUTOPLAY}ms`, animationPlayState: paused ? "paused" : "running", transformOrigin: "left" }}
            />
          </span>
          <span>{pad(slides.length)}</span>
        </div>

        {/* فلش‌ها و نقطه‌ها */}
        <div className="absolute bottom-[84px] left-5 flex items-center gap-3 sm:left-10 lg:bottom-[100px]" dir="ltr">
          <button onClick={() => go(-1)} aria-label="اسلاید قبلی" className="grid h-9 w-9 place-items-center rounded-full border border-[#f0d8c0]/60 text-[#f0d8c0] transition duration-300 hover:scale-110 hover:bg-[#f0d8c0] hover:text-[#2a1a12]">
            <Chevron dir="left" className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => go(1)} aria-label="اسلاید بعدی" className="anim-pulse grid h-9 w-9 place-items-center rounded-full bg-[#e2bf9f] text-[#2a1a12] transition duration-300 hover:scale-110 hover:brightness-110">
            <Chevron dir="right" className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="absolute bottom-[96px] right-5 flex items-center gap-1.5 sm:right-10 lg:hidden" dir="ltr">
          {slides.map((_, k) => (
            <span key={k} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-[#e2bf9f]" : "w-1.5 bg-[#e2bf9f]/45"}`} />
          ))}
        </div>
      </div>

      {/* لبه موجی کرمی */}
      <div className="hero-wave absolute inset-x-0 bottom-0 h-[44px] bg-[#f2e5d8] sm:h-[70px]" />
    </section>
  );
}
