"use client";

import React, { useState } from "react";
import { GoldButton, ArrowLeft, Chevron, Photo } from "./primitives";

const slides = [
  { eyebrow: "درخشش خاص شما", title: "با جواهراتی ماندگار و بی‌نظیر", sub: "زیبایی، اصالت، اعتماد", href: "/collection" },
  { eyebrow: "مجموعه جدید", title: "نگین‌هایی که داستان می‌گویند", sub: "ساخته‌شده با دقت و عشق", href: "/collection" },
  { eyebrow: "هدیه‌ای ماندگار", title: "لحظه‌های ناب را درخشان کنید", sub: "ضمانت اصالت و کیفیت", href: "/product" },
];

export function HeroSection() {
  const [i, setI] = useState(0);
  const s = slides[i];
  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative h-[660px] w-full overflow-hidden bg-[#2a1a12]">
      <Photo
        src="/images/hero/hero.png"
        gradient="radial-gradient(60% 80% at 22% 40%, #d7b79c 0%, #8d6249 38%, #3b2419 75%, #1c110c 100%)"
        className="absolute inset-0"
        style={{ backgroundPosition: "left center" }}
      />
      {/* سایه تیره سمت راست برای خوانایی متن */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/85 via-[#2a1a12]/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1c110c]/70 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-10 pt-16">
        <div className="max-w-[460px] text-right">
          <p key={`e${i}`} className="text-[15px] font-medium text-[#f0d8c0]">{s.eyebrow}</p>
          <h1 key={`t${i}`} className="mt-4 text-[44px] font-bold leading-[1.45] text-[#fbf1e6]">{s.title}</h1>
          <p className="mt-3 text-[15px] text-[#e8d4bf]">{s.sub}</p>
          <GoldButton href={s.href} className="mt-8 !px-9 !py-3 !text-[14px]">
            مشاهده مجموعه
            <ArrowLeft className="h-4 w-4" />
          </GoldButton>
        </div>

        {/* شمارنده و فلش‌ها */}
        <div className="absolute bottom-[110px] right-1/2 hidden translate-x-1/2 items-center gap-3 text-[11px] text-[#f0d8c0] lg:flex" dir="ltr">
          <span>{pad(i + 1)}</span>
          <span className="h-px w-10 bg-[#f0d8c0]/60" />
          <span>{pad(slides.length)}</span>
        </div>
        <div className="absolute bottom-[100px] left-10 flex items-center gap-3" dir="ltr">
          <button onClick={() => go(-1)} aria-label="اسلاید قبلی" className="grid h-8 w-8 place-items-center rounded-full border border-[#f0d8c0]/60 text-[#f0d8c0] transition hover:bg-[#f0d8c0] hover:text-[#2a1a12]">
            <Chevron dir="left" className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => go(1)} aria-label="اسلاید بعدی" className="grid h-8 w-8 place-items-center rounded-full bg-[#e2bf9f] text-[#2a1a12] transition hover:brightness-110">
            <Chevron dir="right" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* لبه موجی کرمی */}
      <div className="hero-wave absolute inset-x-0 bottom-0 h-[70px] bg-[#f2e5d8]" />
    </section>
  );
}
