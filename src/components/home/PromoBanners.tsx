import React from "react";
import Link from "next/link";
import { Photo, ArrowLeft } from "./primitives";

type Banner = {
  title: string;
  sub: string;
  cta: string;
  href: string;
  img: string;
  gradient: string;
  tone: "dark" | "light";
  imgPos?: string;
  extra?: React.ReactNode;
};

function PromoCard({ b }: { b: Banner }) {
  const dark = b.tone === "dark";
  return (
    <article
      className={`group relative isolate min-h-[190px] overflow-hidden rounded-[28px] border shadow-[0_16px_36px_rgba(70,40,24,0.25)] ${
        dark ? "border-[#e8c9aa]/20 text-[#fbeee2]" : "border-white/70 text-[#2a1a12]"
      }`}
    >
      {/* تصویر سمت چپ، محو شونده به سمت متن (راست) */}
      <Photo
        src={b.img}
        gradient={b.gradient}
        className="absolute inset-y-0 left-0 -z-10 w-[72%] transition duration-700 group-hover:scale-105"
        style={{
          backgroundPosition: b.imgPos ?? "center",
          WebkitMaskImage: "linear-gradient(to right,#000 55%,transparent)",
          maskImage: "linear-gradient(to right,#000 55%,transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background: dark
            ? "radial-gradient(80% 120% at 90% 0%, rgba(120,78,52,0.5), transparent 60%), linear-gradient(120deg,#1c110c,#33201a)"
            : "linear-gradient(120deg,#f1d9c3,#e7c4a5)",
        }}
      />
      <div className="relative flex h-full min-h-[190px] flex-col items-start justify-center px-8 py-7 text-right sm:w-[56%]">
        <h3 className="text-[24px] font-bold leading-tight">{b.title}</h3>
        <p className={`mt-2 text-[13px] ${dark ? "text-[#e6d2bf]" : "text-[#5a3a28]"}`}>{b.sub}</p>
        <div className="mt-5 flex items-center gap-3">
          {b.extra}
          <Link
            href={b.href}
            className="btn-gold inline-flex h-10 items-center gap-2 rounded-full px-6 text-[13px] font-bold transition hover:-translate-y-0.5"
          >
            {b.cta}
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Grid({ items, label }: { items: Banner[]; label: string }) {
  return (
    <section aria-label={label} className="mx-auto mt-10 max-w-[1360px] px-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {items.map((b) => (
          <PromoCard key={b.title} b={b} />
        ))}
      </div>
    </section>
  );
}

/* دو بنر اول (بعد از دسته‌بندی‌ها) — راست: دستبندها، چپ: راهنمای هدیه */
const top: Banner[] = [
  {
    title: "مجموعه دستبندها",
    sub: "زیبایی در سادگی",
    cta: "مشاهده مجموعه",
    href: "/product",
    img: "/images/collection/banner-bracelet.jpg",
    gradient: "linear-gradient(135deg,#e9cdb2,#b98d68)",
    tone: "light",
  },
  {
    title: "راهنمای خرید هدیه",
    sub: "انتخابی خاص برای لحظه‌های ماندگار",
    cta: "مشاهده راهنما",
    href: "/customer-services",
    img: "/images/products/lumiere-ring/rose-gold-2.jpg",
    gradient: "linear-gradient(135deg,#5a3a28,#2a1a12)",
    tone: "dark",
  },
];

/* دو بنر آخر (قبل از مزایا و خبرنامه) — راست: تجربه مشتریان، چپ: مجله جواهرات */
const bottom: Banner[] = [
  {
    title: "تجربه مشتریان",
    sub: "نظر شما، افتخار ماست",
    cta: "مشاهده نظرات",
    href: "/about",
    img: "/images/theme/gift-box.jpg",
    gradient: "linear-gradient(135deg,#f1d9c3,#d9b08c)",
    tone: "light",
    extra: (
      <span aria-hidden className="flex -space-x-2 space-x-reverse">
        {["#5a3a28", "#8a5a3c", "#2a1a12"].map((c) => (
          <span key={c} className="h-8 w-8 rounded-full border-2 border-[#f1d9c3]" style={{ background: c }} />
        ))}
      </span>
    ),
  },
  {
    title: "مجله جواهرات",
    sub: "راهنمای انتخاب و نگهداری",
    cta: "مطالعه مقالات",
    href: "/collection",
    img: "/images/theme/necklace-silk.jpg",
    gradient: "linear-gradient(135deg,#d9b08c,#8d6243)",
    tone: "light",
  },
];

export function TopBanners() {
  return <Grid items={top} label="پیشنهادهای ویژه" />;
}

export function BottomBanners() {
  return <Grid items={bottom} label="مجله و نظرات مشتریان" />;
}
