"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/home/primitives";

const columns = [
  {
    title: "دسترسی سریع",
    links: [
      { label: "صفحه اصلی", href: "/" },
      { label: "محصولات", href: "/product" },
      { label: "درباره ما", href: "/about" },
      { label: "خدمات مشتریان", href: "/customer-services" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "راهنمای خرید", href: "#" },
      { label: "شرایط بازگشت کالا", href: "#" },
      { label: "پیگیری سفارش", href: "/account" },
      { label: "پشتیبانی مشتریان", href: "/customer-services#support" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      { label: "شیوه ثبت سفارش", href: "#" },
      { label: "روش‌های پرداخت", href: "#" },
      { label: "ارسال و تحویل", href: "#" },
      { label: "ضمانت اصالت", href: "#" },
    ],
  },
];

function Social({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <a href="#" aria-label={label} className="grid h-8 w-8 place-items-center rounded-full border border-[#c8a07c]/40 text-[#e2bf9f] transition hover:bg-[#e2bf9f] hover:text-[#2a1a12]">
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="relative w-full text-[#eadccd]"
      style={{ background: "radial-gradient(60% 80% at 85% 0%, rgba(120,78,52,0.35), transparent 60%), linear-gradient(180deg,#1c110c,#120a07)" }}
    >
      <div className="mx-auto max-w-[1360px] px-5 pb-8 pt-12 sm:px-10 sm:pt-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-right md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          {/* تماس با ما + لوگو (راست) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo className="!items-start" />
            <div className="mt-6 flex gap-2.5">
              <Social label="اینستاگرام">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></svg>
              </Social>
              <Social label="تلگرام">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M21 4 3 11l5.5 2L10 19l3-3.5 4.5 3.5L21 4Z" /></svg>
              </Social>
              <Social label="واتساپ">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" /></svg>
              </Social>
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="mb-4 text-[14px] font-bold text-[#e8c9aa]">{c.title}</h3>
              <ul className="space-y-2.5 text-[12px] text-[#eadccd]/80">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition hover:text-[#f3dcc4]">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-[14px] font-bold text-[#e8c9aa]">تماس با ما</h3>
            <ul className="space-y-2.5 text-[12px] text-[#eadccd]/80">
              <li dir="ltr" className="text-right">۰۲۱-۷۷۷۶۴۹۸۸</li>
              <li dir="ltr" className="text-right">info@parto.com</li>
              <li>تهران، ایران</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 border-t border-white/10 pt-6 text-center text-[11px] text-[#eadccd]/60 md:mt-12 md:flex-row md:justify-between md:text-right">
          <p>کلیه حقوق مادی و معنوی متعلق به پارتو محفوظ است © ۲۰۲۶</p>
          <div className="flex items-center gap-3" dir="ltr">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-white/90 text-[9px] font-bold text-[#2a1a12]">نماد</span>
            <span className="grid h-9 w-12 place-items-center rounded-md bg-white/90 text-[9px] font-bold text-[#2a1a12]">زرین‌پال</span>
            <span className="relative h-8 w-12">
              <span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-[#d9442a]" />
              <span className="absolute left-5 top-1 h-6 w-6 rounded-full bg-[#f2a33a]/90" />
            </span>
            <button
              onClick={() => {
                const l = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
                if (l) l.scrollTo(0, { duration: 1.6 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="بازگشت به بالا"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#e2bf9f]/70 text-[#e2bf9f] transition duration-300 hover:-translate-y-1 hover:bg-[#e2bf9f] hover:text-[#2a1a12]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
