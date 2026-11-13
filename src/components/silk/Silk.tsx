'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DiamondIcon } from '@/components/home/primitives';

/* ───────── آیکون‌ها ───────── */
const P: Record<string, React.ReactNode> = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" /></>,
  userPlus: <><circle cx="10" cy="8" r="3.6" /><path d="M3 20c1.3-3.6 3.8-5 7-5s5.7 1.4 7 5M19 6v6M16 9h6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
  bag: <><path d="M4 8h16l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3L4 8Z" /><path d="M8.5 8V7a3.5 3.5 0 0 1 7 0v1" /></>,
  card: <><rect x="2.5" y="5" width="19" height="14" rx="3" /><path d="M2.5 10h19M6 15h3" /></>,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="3" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5v.01M18 14.5v.01" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  trash: <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></>,
  send: <path d="M21 4 3 11l5.5 2L10 19l3-3.5 4.5 3.5L21 4ZM8.5 13 21 4" />,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.4 3 7.6 7 9.5 4-1.9 7-5.1 7-9.5V6l-7-3Z" /><path d="m8.8 12 2.4 2.4 4.2-4.4" /></>,
  truck: <><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /><path d="M1 9h3M0 12h3" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevD: <path d="m6 9 6 6 6-6" />,
  chevL: <path d="m15 6-6 6 6 6" />,
  chevR: <path d="m9 6 6 6-6 6" />,
  arrowL: <path d="M19 12H5M11 6l-6 6 6 6" />,
  eye: <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M2 12s3.6-6.5 10-6.5c2 0 3.7.6 5.2 1.5M22 12s-3.6 6.5-10 6.5c-2 0-3.7-.6-5.2-1.5" /><path d="m4 4 16 16M9.8 9.8a3 3 0 0 0 4.4 4.4" /></>,
  heart: <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />,
  cart: <><path d="M3 4h2l2.2 11h10.6L20 7H6.2" /><circle cx="9" cy="19" r="1.2" /><circle cx="17" cy="19" r="1.2" /></>,
  tag: <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8ZM14 6v12" />,
  sparkle: <path d="M12 2c.6 4.8 2.2 7.4 5 8.4-2.8 1-4.4 3.6-5 8.4-.6-4.8-2.2-7.4-5-8.4C9.8 9.4 11.4 6.8 12 2Z" />,
  login: <path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3M4 12h11M11 8l4 4-4 4" />,
  gift: <><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M12 9v11M3 13h18M12 9c-3 0-5-1-5-3s3-2.5 5 3c2-5.500 5-5 5-3s-2 3-5 3Z" /></>,
};

export function Icon({ name, className = 'h-5 w-5', sw = 1.5 }: { name: keyof typeof P | string; className?: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {P[name]}
    </svg>
  );
}

/* ───────── تصویر پس‌زمینه‌ای با fallback ───────── */
export function Img({ src, className = '', style, children, pos = 'center' }: { src: string; className?: string; style?: React.CSSProperties; children?: React.ReactNode; pos?: string }) {
  return (
    <div className={className} style={{ backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: pos, ...style }}>
      {children}
    </div>
  );
}

/* ───────── خط تزئینی با الماس ───────── */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-[#3a2418] ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-l from-[#3a2418]/60 to-transparent" />
      <DiamondIcon className="h-5 w-6" />
      <span className="h-px flex-1 bg-gradient-to-r from-[#3a2418]/60 to-transparent" />
    </div>
  );
}

/* ───────── فیلد گرد شیشه‌ای ───────── */
export function Field({
  icon, label, className = '', as = 'input', rows = 4, ...rest
}: { icon?: string; label: string; className?: string; as?: 'input' | 'textarea' | 'select'; rows?: number } & Record<string, any>) {
  const base = 'field-silk w-full text-[15px] ' + (as === 'textarea' ? 'rounded-[26px] py-4' : 'h-[58px] rounded-full') + ' pr-14 pl-5 text-right';
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      {icon && <span className="pointer-events-none absolute right-5 top-[17px] text-[#3a2418]"><Icon name={icon} className="h-6 w-6" /></span>}
      {as === 'textarea' ? (
        <textarea rows={rows} placeholder={label} className={base + ' resize-none'} {...rest} />
      ) : as === 'select' ? (
        <>
          <select className={base + ' appearance-none'} {...rest} />
          <span className="pointer-events-none absolute left-5 top-[19px] text-[#3a2418]"><Icon name="chevD" className="h-5 w-5" /></span>
        </>
      ) : (
        <input placeholder={label} className={base} {...rest} />
      )}
    </label>
  );
}

/* ───────── صفحه با پس‌زمینه ابریشمی + هدر + فوتر ───────── */
export function SilkPage({ children, footer = true }: { children: React.ReactNode; footer?: boolean }) {
  return (
    <main className="silk-bg relative min-h-screen w-full overflow-x-hidden font-sans text-[#2a1a12]">
      <Header />
      {children}
      {footer && (
        <div className="mx-auto mt-16 w-full max-w-[1500px] overflow-hidden rounded-t-[40px]">
          <Footer />
        </div>
      )}
    </main>
  );
}

/* ───────── هیرو صفحات داخلی ───────── */
export function SilkHero({
  title, subtitle, image, height = 'h-[340px]', ornament = true,
}: { title: string; subtitle?: string; image?: string; height?: string; ornament?: boolean }) {
  return (
    <section className={`relative mx-auto w-full max-w-[1360px] px-10 pt-[88px] ${height}`}>
      {image && <Img src={image} className="pointer-events-none absolute bottom-0 left-6 top-[70px] w-[46%] bg-contain bg-left bg-no-repeat" style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center' }} />}
      <div className="relative ml-auto flex h-full w-[420px] max-w-full flex-col items-center justify-center text-center">
        {ornament && <Ornament className="mb-4 w-[300px]" />}
        <h1 className="text-[40px] font-bold leading-tight text-[#3a2418]">{title}</h1>
        {subtitle && <p className="mt-3 text-[16px] text-[#5a3a28]">{subtitle}</p>}
      </div>
    </section>
  );
}

/* ───────── نوار مزایا ───────── */
export const trustItems = [
  { icon: 'diamond', title: 'کیفیت تضمینی', sub: 'زیبایی ماندگار' },
  { icon: 'shield', title: 'پرداخت امن', sub: 'با خیال راحت خرید کنید' },
  { icon: 'truck', title: 'ارسال به سراسر کشور', sub: 'سریع و مطمئن' },
];

export function TrustIcon({ name, className = 'h-10 w-10' }: { name: string; className?: string }) {
  return name === 'diamond' ? <DiamondIcon className={className} /> : <Icon name={name} className={className} sw={1.3} />;
}

export function DarkButton({ children, className = '', ...r }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...r} className={`btn-dark inline-flex items-center justify-center gap-3 rounded-full text-[18px] font-medium transition ${className}`}>{children}</button>;
}

export { Link };
