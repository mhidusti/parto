"use client";

import React, { useState } from "react";
import { Photo } from "./primitives";

const ic = "h-9 w-9 text-[#b3865f]";
const features = [
  {
    title: "ضمانت اصالت کالا",
    sub: "و گواهی معتبر",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6L12 3Z" />
        <path d="m8.8 12 2.4 2.4 4-4.4" />
      </svg>
    ),
  },
  {
    title: "پشتیبانی حرفه‌ای",
    sub: "در تمام مراحل خرید",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="14" width="4" height="6" rx="1.5" />
        <rect x="17" y="14" width="4" height="6" rx="1.5" />
        <path d="M19 20c0 1-2 1.5-5 1.5" />
      </svg>
    ),
  },
  {
    title: "ارسال سریع",
    sub: "به سراسر کشور",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7h12v9H2zM14 10h4l3 3v3h-7" />
        <circle cx="6.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "بسته‌بندی لوکس",
    sub: "هدیه‌ای ماندگار",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 3h6l4 5-10 13L2 8l4-5h6Z" />
        <path d="M2 8h20M9 3l3 5 3-5M12 8v13" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-10">
      <div className="glass-cream grid grid-cols-4 rounded-[36px] px-6 py-7">
        {features.map((f, i) => (
          <div key={f.title} className={`flex items-center justify-center gap-4 ${i > 0 ? "border-r border-[#c8a07c]/25" : ""}`}>
            {f.icon}
            <div className="text-right">
              <h3 className="text-[14px] font-semibold text-[#2a1a12]">{f.title}</h3>
              <p className="mt-0.5 text-[11px] text-[#7a5a46]">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto mt-10 max-w-[1360px] px-10 pb-16">
      <div className="relative flex h-[190px] items-center overflow-hidden rounded-[40px] bg-[#1c110c]">
        <Photo
          src="/images/collection/newsletter-bg.png"
          gradient="radial-gradient(60% 120% at 15% 50%, #a97a58, #3a2418 60%, #1c110c)"
          className="absolute inset-0"
          style={{ backgroundPosition: "left center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c] via-[#1c110c]/80 to-transparent" />
        <div className="relative flex w-full items-center justify-between gap-8 px-14">
          <div className="max-w-[360px] text-right">
            <h2 className="text-[22px] font-bold text-[#f3dcc4]">عضویت در خبرنامه</h2>
            <p className="mt-2 text-[12px] leading-6 text-[#e6d2bf]/85">
              برای دریافت جدیدترین محصولات و پیشنهادهای ویژه، در خبرنامه عضو شوید.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
            className="flex h-[52px] w-[460px] items-center rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="آدرس ایمیل"
              className="h-full flex-1 bg-transparent px-5 text-[13px] text-[#f3dcc4] outline-none placeholder:text-[#e6d2bf]/60"
            />
            <button type="submit" className="btn-gold h-full rounded-full px-8 text-[13px] font-semibold">
              {done ? "ثبت شد ✓" : "عضویت"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
