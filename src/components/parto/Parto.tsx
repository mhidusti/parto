'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DiamondLogo, Ico } from './icons';

/* ───────────────────────── ثوابت و مسیرها ───────────────────────── */

export type PartoActive = 'home' | 'products' | 'about' | 'blog' | 'contact' | 'services' | '';

const NAV: { key: PartoActive; label: string; href: string }[] = [
  { key: 'home', label: 'صفحه اصلی', href: '/' },
  { key: 'products', label: 'محصولات', href: '/product' },
  { key: 'about', label: 'درباره ما', href: '/about' },
  { key: 'blog', label: 'بلاگ', href: '/collection' },
  { key: 'contact', label: 'تماس با ما', href: '/contact' },
  { key: 'services', label: 'خدمات مشتریان', href: '/customer-services' },
];

/* تصاویر تم (در پوشه public/images/theme پروژه موجودند) */
export const IMG = {
  silk: '/images/theme/silk.jpg',
  ringHero: '/images/theme/ring-hero.png',
  ringLogin: '/images/theme/ring-login.png',
  ringFlowers: '/images/theme/ring-flowers.png',
  ringBox: '/images/theme/ring-box.jpg',
  giftBox: '/images/theme/gift-box.jpg',
  necklace: '/images/theme/necklace-silk.jpg',
  bracelet: '/images/collection/banner-bracelet.jpg',
  product: '/images/products/lumiere-ring/rose-gold-1.jpg',
};

/** تصویر پس‌زمینه با گرادیانت جایگزین تا اگر فایل نبود، صفحه خالی نماند */
export function Bg({
  src, fallback = 'linear-gradient(135deg,#ecd0b6,#b98d68)', pos = 'center', size = 'cover', className = '', style, children,
}: {
  src: string; fallback?: string; pos?: string; size?: string; className?: string; style?: React.CSSProperties; children?: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ backgroundImage: `url("${src}"), ${fallback}`, backgroundSize: `${size}, cover`, backgroundPosition: `${pos}, center`, backgroundRepeat: 'no-repeat', ...style }}
    >
      {children}
    </div>
  );
}

/* ───────────────────────── لوگو ───────────────────────── */

export function PartoLogo({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <Link href="/" dir="ltr" aria-label="PARTO" className={`inline-flex flex-col items-center leading-none text-[#f3dcc4] ${className}`}>
      <DiamondLogo className={size === 'lg' ? 'h-[30px] w-[36px]' : 'h-[24px] w-[30px]'} />
      <span className={`font-serif tracking-[0.1em] ${size === 'lg' ? 'mt-1 text-[40px]' : 'mt-0.5 text-[28px]'}`}>PARTO</span>
      <span className="mt-0.5 font-serif text-[9px] italic tracking-[0.06em] text-[#d9b48f]">Jewelry for a lifetime</span>
    </Link>
  );
}

/* ───────────────────────── هدر ───────────────────────── */

export function PartoHeader({ active = '', cartCount = 2 }: { active?: PartoActive; cartCount?: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* در صفحه «خدمات مشتریان» ترتیب منو مطابق طراحی است (بدون «بلاگ») */
  const items = active === 'services' ? NAV.filter((n) => n.key !== 'blog') : NAV.filter((n) => n.key !== 'services');
  const ordered = active === 'services'
    ? [...items.filter((n) => n.key !== 'contact' && n.key !== 'services'), items.find((n) => n.key === 'contact')!, items.find((n) => n.key === 'services')!]
    : items;

  return (
    <header className="relative z-30 bg-gradient-to-b from-[#3f2417] via-[#35200f] to-[#2a170e] text-[#f3dcc4] shadow-[0_6px_20px_rgba(30,14,6,0.35)]">
      <div className="mx-auto flex h-[62px] w-full max-w-[1200px] items-center justify-between gap-6 px-5 lg:px-11">
        <PartoLogo className="scale-[.92]" />

        <nav className="hidden items-center gap-10 lg:flex" aria-label="منوی اصلی">
          {ordered.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={active === n.key ? 'page' : undefined}
              className={`relative py-[19px] text-[14px] font-medium transition-colors hover:text-white ${active === n.key ? 'text-white' : 'text-[#ecd9c6]'}`}
            >
              {n.label}
              {active === n.key && <span className="absolute inset-x-0 bottom-[10px] h-[1.5px] rounded bg-[#e8c9aa]" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <label className="flex h-[34px] w-[190px] items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-[#ecd9c6] focus-within:border-[#e8c9aa]/70">
            <Ico name="search" className="h-4 w-4 flex-none" sw={1.6} />
            <input type="search" placeholder="جستجو در محصولات..." className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#ecd9c6]/70" />
          </label>
          <Link href="/login" aria-label="حساب کاربری" className="transition hover:text-white"><Ico name="user" className="h-[22px] w-[22px]" /></Link>
          <Link href="/account" aria-label="علاقه‌مندی‌ها" className="transition hover:text-white"><Ico name="heart" className="h-[22px] w-[22px]" /></Link>
          <Link href="/cart" aria-label="سبد خرید" className="relative transition hover:text-white">
            <Ico name="bag" className="h-[22px] w-[22px]" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-[#d6402e] px-[3px] text-[9px] font-bold leading-none text-white">
                {cartCount.toLocaleString('fa-IR')}
              </span>
            )}
          </Link>
        </div>

        {/* موبایل */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/cart" aria-label="سبد خرید" className="relative">
            <Ico name="bag" className="h-6 w-6" />
            {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-[#d6402e] text-[9px] font-bold text-white">{cartCount.toLocaleString('fa-IR')}</span>}
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'بستن منو' : 'باز کردن منو'} className="grid h-10 w-10 place-items-center">
            <span className="flex w-6 flex-col gap-[6px]">
              <span className={`h-[1.5px] bg-current transition ${open ? 'translate-y-[3.75px] rotate-45' : ''}`} />
              <span className={`h-[1.5px] bg-current transition ${open ? '-translate-y-[3.75px] -rotate-45' : 'w-4'}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#2a170e] px-6 pb-5 pt-2 lg:hidden" aria-label="منوی موبایل">
          {NAV.map((n) => (
            <Link key={n.key} href={n.href} onClick={() => setOpen(false)} className={`block border-b border-white/10 py-4 text-[15px] ${active === n.key ? 'text-white' : 'text-[#ecd9c6]'}`}>
              {n.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-3">
            <Link href="/login" onClick={() => setOpen(false)} className="parto-btn-soft flex-1 rounded-full py-3 text-center text-[14px]">ورود / ثبت‌نام</Link>
            <Link href="/account" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-white/25 py-3 text-center text-[14px]">حساب کاربری</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ───────────────────────── فوتر ───────────────────────── */

const footerCols = [
  {
    title: 'راهنمای خرید',
    links: [
      { label: 'شیوه‌های سفارش', href: '/customer-services#faq' },
      { label: 'روش‌های پرداخت', href: '/customer-services#faq' },
      { label: 'ارسال و تحویل', href: '/customer-services#faq' },
      { label: 'ضمانت اصالت', href: '/about' },
    ],
  },
  {
    title: 'خدمات مشتریان',
    links: [
      { label: 'راهنمای خرید', href: '/customer-services' },
      { label: 'شرایط بازگشت کالا', href: '/customer-services#faq' },
      { label: 'پیگیری سفارش', href: '/customer-services#track' },
      { label: 'پشتیبانی مشتریان', href: '/customer-services#support' },
    ],
  },
  {
    title: 'دسترسی سریع',
    links: [
      { label: 'صفحه اصلی', href: '/' },
      { label: 'محصولات', href: '/product' },
      { label: 'درباره ما', href: '/about' },
      { label: 'خدمات مشتریان', href: '/customer-services' },
      { label: 'تماس با ما', href: '/contact' },
    ],
  },
];

function Social({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a href="#" aria-label={label} className="grid h-[26px] w-[26px] place-items-center text-[#e8c9aa] transition hover:text-white">
      {children}
    </a>
  );
}

export function PartoFooter() {
  return (
    <footer className="relative mt-14 text-[#ecd9c6]">
      {/* لبه موجی بالای فوتر */}
      <div aria-hidden className="parto-footer-wave absolute inset-x-0 -top-[44px] h-[46px] bg-[#2a170e]" />
      <div className="relative bg-gradient-to-b from-[#2a170e] to-[#1c0f08]" style={{ backgroundImage: 'radial-gradient(60% 90% at 90% 0%, rgba(140,90,60,0.28), transparent 65%), linear-gradient(180deg,#2c180f,#1b0e07)' }}>
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-6 pt-9 lg:px-11">
          <div className="grid grid-cols-2 gap-y-8 text-right lg:grid-cols-[1fr_1fr_1fr_1fr_1.15fr]">
            <div className="border-white/15 px-2 lg:border-l lg:px-8 lg:first:pr-0">
              <h3 className="mb-4 text-[15px] font-bold text-[#f3dcc4]">تماس با ما</h3>
              <ul className="space-y-3 text-[13px] text-[#ecd9c6]/90">
                <li className="flex items-center gap-2"><Ico name="phone" className="h-[14px] w-[14px] flex-none text-[#d9b48f]" /><span dir="ltr">۰۲۱-۷۷۴۸۸۴</span></li>
                <li className="flex items-center gap-2"><Ico name="mail" className="h-[14px] w-[14px] flex-none text-[#d9b48f]" /><span dir="ltr">info@parto.com</span></li>
                <li className="flex items-center gap-2"><Ico name="pin" className="h-[14px] w-[14px] flex-none text-[#d9b48f]" />تهران، ایران</li>
              </ul>
            </div>

            {footerCols.map((c) => (
              <div key={c.title} className="border-white/15 px-2 lg:border-l lg:px-8">
                <h3 className="mb-4 text-[15px] font-bold text-[#f3dcc4]">{c.title}</h3>
                <ul className="space-y-2.5 text-[13px] text-[#ecd9c6]/90">
                  {c.links.map((l) => (
                    <li key={l.label}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-1">
              <PartoLogo size="lg" />
              <div className="mt-5 flex items-center gap-3" dir="ltr">
                <Social label="اینستاگرام"><Ico name="instagram" className="h-[22px] w-[22px]" /></Social>
                <Social label="تلگرام"><Ico name="send" className="h-[22px] w-[22px]" /></Social>
                <Social label="واتساپ"><Ico name="whatsapp" className="h-[22px] w-[22px]" /></Social>
                <Social label="ایتا"><Ico name="chat" className="h-[22px] w-[22px]" /></Social>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse items-center justify-between gap-5 border-t border-white/12 pt-5 text-[12px] text-[#ecd9c6]/75 sm:flex-row">
            <div className="flex items-center gap-5" dir="ltr">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="بازگشت به بالا"
                className="grid h-[38px] w-[38px] place-items-center rounded-full border border-[#e8c9aa]/70 text-[#e8c9aa] transition hover:bg-[#e8c9aa] hover:text-[#2a170e]"
              >
                <Ico name="chevU" className="h-[18px] w-[18px]" sw={1.8} />
              </button>
              <span className="relative block h-8 w-[46px]" aria-label="مستر کارت">
                <span className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#e3262e]" />
                <span className="absolute left-[14px] top-0 h-8 w-8 rounded-full bg-[#f79e1b]/95 mix-blend-screen" />
              </span>
              <span className="grid h-[28px] w-[48px] place-items-center rounded-[5px] bg-[#2a5fb0] text-[9px] font-bold text-white" aria-label="شاپرک">سامان</span>
              <span className="grid h-[34px] w-[34px] place-items-center rounded-full border-2 border-[#3a6fd0] font-serif text-[18px] font-bold italic text-[#3a6fd0]" aria-label="نماد اعتماد">e</span>
            </div>
            <p>© کلیه حقوق مادی و معنوی متعلق به پرتو محفوظ است. ۱۴۰۴</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── قالب صفحه ───────────────────────── */

export function PartoPage({ active = '', children, cartCount }: { active?: PartoActive; children: React.ReactNode; cartCount?: number }) {
  return (
    <main className="parto-bg relative min-h-screen w-full overflow-x-hidden font-sans text-[#2a170e]">
      <PartoHeader active={active} cartCount={cartCount} />
      {children}
      <PartoFooter />
    </main>
  );
}

/* ───────────────────────── هیرو ───────────────────────── */

export function PartoHero({
  title, subtitle, crumb, big = false, ring = IMG.ringHero,
}: { title: string; subtitle: string; crumb?: string; big?: boolean; ring?: string }) {
  return (
    <section className="relative isolate h-[230px] overflow-hidden sm:h-[250px] lg:h-[262px]">
      {/* ابریشم + تیرگی از بالا و راست */}
      <Bg src={IMG.silk} fallback="linear-gradient(160deg,#d9b592,#b98d68 45%,#8d6243)" pos="center 30%" className="absolute inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg,rgba(43,23,14,.78) 0%,rgba(70,40,24,.25) 48%,rgba(0,0,0,0) 100%), linear-gradient(270deg,rgba(43,23,14,.72) 0%,rgba(43,23,14,.35) 38%,rgba(0,0,0,0) 62%)' }} />
      {/* حلقه */}
      <Bg
        src={ring}
        fallback="transparent"
        size="contain"
        pos="left center"
        className="pointer-events-none absolute inset-y-2 left-0 hidden w-[52%] sm:block"
      />
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center px-5 pb-8 text-right lg:px-11">
        {crumb && (
          <nav aria-label="مسیر صفحه" className="mb-2 text-[12px] text-[#f0dccb]/90">
            <Link href="/" className="hover:text-white">خانه</Link>
            <span className="mx-1.5">/</span>
            <span>{crumb}</span>
          </nav>
        )}
        <h1 className={`font-bold text-[#fbeee2] drop-shadow-[0_2px_8px_rgba(30,12,4,0.45)] ${big ? 'text-[36px] lg:text-[38px]' : 'text-[32px] lg:text-[34px]'}`}>{title}</h1>
        <p className="mt-2 text-[15px] text-[#f6e4d4]">{subtitle}</p>
        <span aria-hidden className="mt-3 h-px w-[60px] bg-gradient-to-l from-[#f0dccb]/80 to-transparent" />
      </div>
      {/* لبه موجی کرمی */}
      <div aria-hidden className="parto-wave absolute inset-x-0 -bottom-px h-[52px] bg-[#f8e4d5] sm:h-[64px]" />
    </section>
  );
}

/* ───────────────────────── اجزای کوچک مشترک ───────────────────────── */

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 lg:px-11 ${className}`}>{children}</div>;
}

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 text-[#7a4a2c] ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/70 to-transparent" />
      <DiamondLogo className="h-[20px] w-[24px]" />
      <span className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/70 to-transparent" />
    </div>
  );
}

/** نوار چند ستونی با جداکننده عمودی (مزایا) */
export function FeatureStrip({
  items, className = '',
}: { items: { icon: string; title: string; sub: string }[]; className?: string }) {
  return (
    <div className={`parto-card grid grid-cols-2 rounded-[26px] py-5 lg:grid-cols-4 lg:py-6 ${className}`}>
      {items.map((f) => (
        <div key={f.title} className="flex flex-col items-center gap-1 border-[#a67a5c]/35 px-3 py-3 text-center lg:border-l lg:py-0 lg:first:border-l-0">
          {f.icon === 'gem' ? <Ico name="gem" className="h-[34px] w-[34px] text-[#3a2418]" sw={1.2} /> : <Ico name={f.icon} className="h-[34px] w-[34px] text-[#3a2418]" sw={1.2} />}
          <div className="mt-1 text-[15px] font-bold text-[#2a170e]">{f.title}</div>
          <div className="text-[12px] text-[#7a5a48]">{f.sub}</div>
        </div>
      ))}
    </div>
  );
}

export function DarkBtn({
  children, className = '', href, ...rest
}: { children: React.ReactNode; className?: string; href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `parto-btn-dark inline-flex items-center justify-center gap-2.5 rounded-full text-[15px] font-medium ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button {...rest} className={cls}>{children}</button>;
}

export function SoftBtn({
  children, className = '', href, ...rest
}: { children: React.ReactNode; className?: string; href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `parto-btn-soft inline-flex items-center justify-center gap-2 rounded-full text-[13px] font-medium ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button {...rest} className={cls}>{children}</button>;
}

/** فیلد گرد با آیکون سمت راست (RTL) */
export function PField({
  icon, label, as = 'input', rows = 4, className = '', ...rest
}: { icon?: string; label: string; as?: 'input' | 'textarea' | 'select'; rows?: number; className?: string } & Record<string, any>) {
  const base = 'parto-field w-full text-right text-[14px] ' + (as === 'textarea' ? 'rounded-[22px] py-4 pr-[52px] pl-5 resize-none' : 'h-[52px] rounded-full pr-[52px] pl-5');
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      {icon && <span className={`pointer-events-none absolute right-[18px] text-[#3a2418] ${as === 'textarea' ? 'top-[17px]' : 'top-1/2 -translate-y-1/2'}`}><Ico name={icon} className="h-[22px] w-[22px]" sw={1.4} /></span>}
      {as === 'textarea' ? (
        <textarea rows={rows} placeholder={label} className={base} {...rest} />
      ) : as === 'select' ? (
        <>
          <select className={base + ' appearance-none'} {...rest} />
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#3a2418]"><Ico name="chevD" className="h-[18px] w-[18px]" /></span>
        </>
      ) : (
        <input placeholder={label} className={base} {...rest} />
      )}
    </label>
  );
}

export { Ico, Link };
