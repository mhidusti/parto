"use client";

import React from "react";
import Link from "next/link";
import { Photo, RoundArrow, DiamondIcon, Chevron } from "./primitives";

const categories = [
  { label: "ساعت‌ها", en: "Watches", img: "/images/categories/watches.jpg", href: "/product" },
  { label: "دستبندها", en: "Bracelets", img: "/images/products/celesta-bracelet/white-gold-1.jpg", href: "/product" },
  { label: "گوشواره‌ها", en: "Earrings", img: "/images/products/verite-earrings/white-gold-1.jpg", href: "/product" },
  { label: "گردنبندها", en: "Necklaces", img: "/images/products/solstice-necklace/white-gold-1.jpg", href: "/product" },
  { label: "انگشترها", en: "Rings", img: "/images/products/lumiere-ring/rose-gold-1.jpg", href: "/product" },
];

export function Categories() {
  return (
    <section className="relative z-10 mx-auto mt-14 max-w-[1360px] px-6 pb-6" aria-labelledby="cat-title">
      {/* درخشش نرم پشت بخش (بدون باکس) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-[420px]"
        style={{ background: "radial-gradient(50% 55% at 50% 50%, rgba(255,246,236,0.9), transparent 72%)" }}
      />

      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <span className="font-serif text-[13px] italic tracking-[0.28em] text-[#b3865f]">COLLECTIONS</span>
        <h2 id="cat-title" className="mt-1 text-[30px] font-bold text-[#2a1a12]">دسته‌بندی محصولات</h2>
        <p className="mt-1.5 text-[13px] text-[#7a5a46]">انتخابی خاص برای سلیقه‌های خاص</p>
        <div aria-hidden className="mt-4 flex w-full max-w-[320px] items-center gap-3 text-[#b3865f]">
          <span className="h-px flex-1 bg-gradient-to-l from-[#b3865f]/70 to-transparent" />
          <DiamondIcon className="h-[16px] w-[20px]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#b3865f]/70 to-transparent" />
        </div>
      </div>

      <ul className="no-scrollbar mt-12 flex snap-x gap-7 overflow-x-auto px-2 pb-12 pt-3 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:px-0">
        {categories.map((c) => (
          <li
            key={c.label}
            className="w-[190px] shrink-0 snap-center transition-transform duration-500 lg:w-auto"
          >
            <Link href={c.href} className="group relative block" aria-label={`مشاهده ${c.label}`}>
              {/* قاب قوسی بیرونی که با هاور باز می‌شود */}
              <span
                aria-hidden
                className="absolute -inset-2 rounded-t-[999px] rounded-b-[34px] border border-[#c8a07c]/55 transition-all duration-500 group-hover:-inset-3 group-hover:border-[#b3865f]"
              />
              <span aria-hidden className="absolute -inset-5 -z-10 rounded-[999px] bg-[#e9c9a8]/0 blur-2xl transition duration-500 group-hover:bg-[#e9c9a8]/55" />

              <span className="relative block aspect-[3/4.1] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-[#e9d3be] shadow-[0_22px_40px_-10px_rgba(90,56,34,0.45)] ring-1 ring-white/70">
                <Photo
                  src={c.img}
                  gradient="radial-gradient(circle at 35% 30%, #fff, #e7cdb4 60%, #c9a07c)"
                  className="absolute inset-0 transition duration-700 ease-out group-hover:scale-110"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#24130b]/55 via-transparent to-white/15" />
                {/* بازتاب نور */}
                <span aria-hidden className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-700 group-hover:left-[130%] group-hover:opacity-100" />
              </span>

              {/* برچسب شناور روی لبه‌ی پایین */}
              <span className="absolute inset-x-3 -bottom-6 flex items-center justify-between gap-2 rounded-full border border-white/90 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] py-2 pr-5 pl-2 shadow-[0_12px_24px_rgba(90,56,34,0.22)] transition duration-500 group-hover:-translate-y-1">
                <span className="flex flex-col leading-tight">
                  <span className="text-[15px] font-bold text-[#2a1a12]">{c.label}</span>
                  <span dir="ltr" className="font-serif text-[11px] italic tracking-[0.12em] text-[#b3865f]">{c.en}</span>
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] transition group-hover:from-[#c8a07c] group-hover:to-[#a87a56] group-hover:text-[#2a1a12]">
                  <Chevron dir="left" className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
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
