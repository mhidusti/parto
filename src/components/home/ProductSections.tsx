"use client";

import React, { useRef } from "react";
import { RoundArrow, SectionHeading } from "./primitives";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { allProducts } from "@/data/products";

/* جدیدترین محصولات: محصولات isNew، و در صورت کمبود، بقیه محصولات */
const newest = [
  ...allProducts.filter((p) => p.isNew),
  ...allProducts.filter((p) => !p.isNew),
].slice(0, 4);

/* پرفروش‌ترین‌ها */
const bestSellers = [
  ...allProducts.filter((p) => p.isBestSeller),
  ...allProducts.filter((p) => !p.isBestSeller),
].slice(0, 6);

export function NewestProducts() {
  return (
    <section className="mx-auto mt-12 max-w-[1360px] px-5 sm:mt-14 sm:px-10">
      <Reveal>
        <SectionHeading title="جدیدترین محصولات" subtitle="جدیدترین انتخاب‌ها برای شما" href="/product" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {newest.map((p, i) => (
          <Reveal key={p.id} delay={i * 110} className="h-full">
            <ProductCard product={p} badge={p.isNew ? "جدید" : null} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BestSellers() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <section className="relative mt-12 py-16 sm:mt-14 sm:py-24">
      <div
        className="band-wave absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 90% at 30% 20%, rgba(190,140,100,0.35), transparent 65%), radial-gradient(60% 90% at 85% 90%, rgba(120,78,52,0.5), transparent 65%), linear-gradient(120deg,#1a0f0a,#34211a 50%,#1a0f0a)",
        }}
      />
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-10">
        <Reveal>
          <SectionHeading title="پرفروش‌ترین‌ها" subtitle="انتخاب محبوب مشتریان ما" href="/product" dark />
        </Reveal>
        <Reveal variant="fade" delay={120}>
          <div className="flex items-center gap-4">
            <div className="hidden md:block"><RoundArrow dir="right" label="قبلی" onClick={() => scroll(1)} /></div>
            <div
              ref={ref}
              className="no-scrollbar -mx-5 flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-4 sm:mx-0 sm:gap-6 sm:px-0"
            >
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} badge="پرفروش‌ترین" className="w-[270px] shrink-0 snap-center sm:w-[310px]" />
              ))}
            </div>
            <div className="hidden md:block"><RoundArrow dir="left" label="بعدی" onClick={() => scroll(-1)} /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
