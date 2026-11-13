"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/home/primitives";

const navItems = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/product" },
  { label: "درباره ما", href: "/about" },
  { label: "خدمات مشتریان", href: "/customer-services", caret: true },
  { label: "وبلاگ", href: "/collection" },
  { label: "تماس با ما", href: "/contact" },
];

const iconCls = "h-[18px] w-[18px]";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8a4 4 0 0 1 8 0" />
      <rect x="5" y="8" width="14" height="12" rx="3" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* دسکتاپ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-500 lg:block ${
          scrolled
            ? "bg-[#1c110c]/85 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "bg-gradient-to-b from-[#1c110c]/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[88px] max-w-[1360px] items-center justify-between px-10">
          {/* راست: لوگو */}
          <Logo />

          {/* ناوبری */}
          <nav className="flex items-center gap-9">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative inline-flex items-center gap-1 pb-1.5 text-[13px] font-medium transition-colors ${
                    active ? "text-[#f3dcc4]" : "text-[#eadccd]/85 hover:text-[#f3dcc4]"
                  }`}
                >
                  {item.label}
                  {item.caret && (
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                  {active && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[#e2bf9f]" />}
                </Link>
              );
            })}
          </nav>

          {/* چپ: جستجو و آیکون‌ها */}
          <div className="flex items-center gap-5 text-[#f3dcc4]">
            <label className="flex h-10 w-[210px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-[#eadccd] backdrop-blur-md focus-within:border-[#e2bf9f]/70">
              <SearchIcon />
              <input
                type="search"
                placeholder="جستجو در محصولات..."
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#eadccd]/70"
              />
            </label>
            <Link href="/account" aria-label="علاقه‌مندی‌ها" className="transition hover:text-white"><HeartIcon /></Link>
            <Link href="/login" aria-label="حساب کاربری" className="transition hover:text-white"><UserIcon /></Link>
            <Link href="/cart" aria-label="سبد خرید" className="relative transition hover:text-white">
              <CartIcon />
              <span className="absolute -right-1.5 -top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#e2bf9f] text-[8px] font-bold text-[#2a1a12]">0</span>
            </Link>
          </div>
        </div>
      </header>

      {/* موبایل */}
      <div className="lg:hidden">
        <div className="fixed inset-x-0 top-0 z-[70] flex h-[68px] items-center justify-between bg-[#1c110c]/90 px-5 text-[#f3dcc4] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center"
          >
            <span className="flex w-6 flex-col gap-[6px]">
              <span className={`h-[1.5px] bg-current transition ${menuOpen ? "translate-y-[3.75px] rotate-45" : ""}`} />
              <span className={`h-[1.5px] bg-current transition ${menuOpen ? "-translate-y-[3.75px] -rotate-45" : "w-4"}`} />
            </span>
          </button>
          <div className="scale-75"><Logo /></div>
          <Link href="/cart" aria-label="سبد خرید"><CartIcon /></Link>
        </div>

        <div
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-[65] bg-[#1c110c] px-8 pb-10 pt-24 text-[#f3dcc4] transition-all duration-500 ${
            menuOpen ? "visible opacity-100" : "invisible -translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-lg hover:text-[#e2bf9f]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex gap-3">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-gold flex-1 rounded-full py-3 text-center text-sm font-medium">ورود / ثبت‌نام</Link>
            <Link href="/account" onClick={() => setMenuOpen(false)} className="flex-1 rounded-full border border-white/25 py-3 text-center text-sm">حساب کاربری</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
