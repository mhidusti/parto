"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Photo, RoundArrow } from "./primitives";

const categories = [
  { label: "ساعت‌ها", img: "/images/categories/watches.jpg", href: "/product" },
  { label: "دستبندها", img: "/images/products/celesta-bracelet/white-gold-1.jpg", href: "/product" },
  { label: "گوشواره‌ها", img: "/images/products/verite-earrings/white-gold-1.jpg", href: "/product" },
  { label: "گردنبندها", img: "/images/products/solstice-necklace/white-gold-1.jpg", href: "/product" },
  { label: "انگشترها", img: "/images/products/lumiere-ring/rose-gold-1.jpg", href: "/product" },
];

export function Categories() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="relative z-10 mx-auto -mt-10 max-w-[1360px] px-6">
      <div className="glass-cream relative flex items-center gap-8 rounded-[56px] px-12 py-8">
        {/* عنوان (راست) */}
        <div className="w-[170px] shrink-0 text-right">
          <h2 className="text-[22px] font-bold text-[#2a1a12]">دسته‌بندی محصولات</h2>
          <p className="mt-1 text-[11px] leading-5 text-[#7a5a46]">انتخابی خاص برای سلیقه‌های خاص</p>
        </div>

        <div ref={ref} className="no-scrollbar flex flex-1 items-start justify-between gap-6 overflow-x-auto">
          {categories.map((c) => (
            <Link key={c.label} href={c.href} className="group flex w-[130px] shrink-0 flex-col items-center gap-3">
              <span className="grid h-[104px] w-[104px] place-items-center rounded-full bg-gradient-to-br from-white/90 to-[#ecd9c6]/60 shadow-[0_10px_24px_rgba(110,72,46,0.18),inset_0_1px_0_#fff] ring-1 ring-white/80 transition group-hover:-translate-y-1">
                <Photo
                  src={c.img}
                  gradient="radial-gradient(circle at 35% 30%, #fff, #e7cdb4 60%, #c9a07c)"
                  className="h-[84px] w-[84px] rounded-full mix-blend-multiply"
                />
              </span>
              <span className="text-[13px] font-medium text-[#3a2418]">{c.label}</span>
            </Link>
          ))}
        </div>

        <RoundArrow dir="left" dark={false} label="بعدی" onClick={() => ref.current?.scrollBy({ left: -240, behavior: "smooth" })} />
      </div>
    </section>
  );
}

const brands = [
  { name: "Van Cleef & Arpels", cls: "font-serif text-[13px] tracking-[0.08em]" , small: true },
  { name: "Cartier", cls: "font-serif text-[30px] italic" },
  { name: "BVLGARI", cls: "font-serif text-[24px] tracking-[0.18em]" },
  { name: "TIFFANY & CO.", cls: "font-serif text-[19px] tracking-[0.1em]" },
  { name: "Chopard", cls: "font-serif text-[28px] italic" },
  { name: "ROLEX", cls: "font-serif text-[26px] tracking-[0.12em] font-semibold" },
];

export function Brands() {
  return (
    <section className="relative mt-4">
      <div
        className="band-wave relative h-[340px] w-full"
        style={{
          background:
            "radial-gradient(70% 120% at 80% 0%, rgba(160,110,78,0.45), transparent 60%), radial-gradient(60% 100% at 10% 100%, rgba(120,78,52,0.5), transparent 65%), linear-gradient(120deg,#1a0f0a 0%,#33201a 45%,#1a0f0a 100%)",
        }}
      />
      <div className="absolute inset-0 mx-auto flex max-w-[1360px] flex-col justify-center px-12">
        <div className="text-right">
          <h2 className="text-[24px] font-bold text-[#e8c9aa]">برندهای معتبر</h2>
          <p className="mt-1 text-[12px] text-[#d8c2ac]/85">برترین برندهای جهانی در پارتو</p>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <RoundArrow dir="right" label="قبلی" />
          <div className="flex flex-1 items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-5">
            {brands.map((b) => (
              <div
                key={b.name}
                dir="ltr"
                className={`flex h-16 w-[170px] items-center justify-center rounded-full text-center text-[#f0dcc7]/90 ${b.cls}`}
              >
                {b.name}
              </div>
            ))}
          </div>
          <RoundArrow dir="left" label="بعدی" />
        </div>
      </div>
    </section>
  );
}
