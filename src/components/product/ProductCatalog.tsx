'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Photo, HeartButton, GoldButton, ArrowLeft, Chevron } from '@/components/home/primitives';
import {
  ringsCatalog,
  type GoldType,
  type RingKind,
  type RingItem,
  type StoneType,
} from '@/data/ringsCatalog';

const MIN_PRICE = 1_000_000;
const MAX_PRICE = 50_000_000;
const PAGE_SIZE = 8;

const fa = (n: number) => n.toLocaleString('fa-IR');
const faPrice = (n: number) => `${n.toLocaleString('fa-IR').replace(/٬/g, ',')} تومان`;

const kinds: { value: RingKind | 'ALL'; label: string; img: string }[] = [
  { value: 'ALL', label: 'همه محصولات', img: '/images/products/lumiere-ring/rose-gold-1.jpg' },
  { value: 'gold', label: 'انگشتر طلا', img: '/images/products/lumiere-ring/yellow-gold-1.jpg' },
  { value: 'diamond', label: 'انگشتر الماس', img: '/images/products/lumiere-ring/white-gold-1.jpg' },
  { value: 'stone', label: 'انگشتر نگین‌دار', img: '/images/products/lumiere-ring/rose-gold-2.jpg' },
  { value: 'minimal', label: 'انگشتر مینیمال', img: '/images/products/lumiere-ring/white-gold-2.jpg' },
];

const goldTypes: { value: GoldType; label: string; swatch: string }[] = [
  { value: 'white', label: 'طلای سفید', swatch: 'linear-gradient(135deg,#f1f1f1,#a9adb3)' },
  { value: 'yellow', label: 'طلای زرد', swatch: 'linear-gradient(135deg,#f6dc8c,#c79a35)' },
  { value: 'rose', label: 'رزگلد', swatch: 'linear-gradient(135deg,#f3c4ae,#c8866a)' },
];

const stones: { value: StoneType; label: string }[] = [
  { value: 'diamond', label: 'الماس' },
  { value: 'ruby', label: 'یاقوت' },
  { value: 'emerald', label: 'زمرد' },
];

type Sort = 'newest' | 'cheap' | 'expensive';
const sortLabels: Record<Sort, string> = {
  newest: 'جدیدترین',
  cheap: 'ارزان‌ترین',
  expensive: 'گران‌ترین',
};

interface Filters {
  maxPrice: number;
  gold: GoldType[];
  color: GoldType | null;
  stone: StoneType[];
  brand: boolean;
}
const emptyFilters: Filters = { maxPrice: MAX_PRICE, gold: [], color: null, stone: [], brand: false };

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function SectionTitle({ open, onClick, children }: { open: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-expanded={open} className="flex w-full items-center justify-between text-[13px] font-bold text-[#2a1a12]">
      <span>{children}</span>
      <Chevron dir="left" className={`h-3.5 w-3.5 transition ${open ? '-rotate-90' : 'rotate-90'}`} />
    </button>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#5a3a28]">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid h-4 w-4 place-items-center rounded-[4px] border border-[#c8a07c]/70 bg-white/60 peer-checked:border-[#3a2418] peer-checked:bg-[#3a2418]">
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#f3dcc4]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
        )}
      </span>
      {label}
    </label>
  );
}

function FilterIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" /></svg>
  );
}

export const ProductCatalog = () => {
  const [kind, setKind] = useState<RingKind | 'ALL'>('ALL');
  const [sort, setSort] = useState<Sort>('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<Filters>(emptyFilters);
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const [open, setOpen] = useState({ price: true, gold: true, color: true, stone: true, brand: true });
  const [added, setAdded] = useState<Set<string>>(new Set());

  const items = useMemo(() => {
    const list = ringsCatalog.filter((r) => {
      if (kind !== 'ALL' && !r.kinds.includes(kind)) return false;
      if (r.rawPrice > applied.maxPrice) return false;
      if (applied.gold.length && !applied.gold.includes(r.gold)) return false;
      if (applied.color && r.gold !== applied.color) return false;
      if (applied.stone.length && !applied.stone.includes(r.stone)) return false;
      if (applied.brand && r.brand !== 'پرتو') return false;
      return true;
    });
    return [...list].sort((a, b) =>
      sort === 'cheap' ? a.rawPrice - b.rawPrice : sort === 'expensive' ? b.rawPrice - a.rawPrice : b.createdAt - a.createdAt,
    );
  }, [kind, applied, sort]);

  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const addToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setAdded((p) => new Set(p).add(id));
    window.setTimeout(() => setAdded((p) => { const n = new Set(p); n.delete(id); return n; }), 2000);
  };

  const pct = ((draft.maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <section
      className="relative w-full pb-16"
      style={{ background: 'radial-gradient(60% 30% at 20% 10%, rgba(255,255,255,0.55), transparent 70%), linear-gradient(180deg,#f6e9de 0%,#f2e2d4 50%,#f6ebe0 100%)' }}
    >
      <div className="mx-auto max-w-[1360px] px-10">
        {/* نوار دسته‌بندی (روی هیرو) */}
        <div className="glass-cream relative z-10 -mt-[48px] flex items-stretch justify-between rounded-[40px] px-6 py-5">
          {kinds.map((k, i) => {
            const active = kind === k.value;
            return (
              <React.Fragment key={k.value}>
                {i > 0 && <span className="my-3 w-px bg-[#c8a07c]/25" />}
                <button
                  type="button"
                  onClick={() => { setKind(k.value); setPage(1); }}
                  aria-pressed={active}
                  className={`relative flex flex-1 flex-col items-center gap-3 rounded-[24px] px-3 py-2 transition ${active ? 'bg-gradient-to-b from-white/80 to-[#ecd9c6]/70 shadow-[0_8px_22px_rgba(110,72,46,0.18)] ring-1 ring-[#c8a07c]/50' : 'hover:bg-white/40'}`}
                >
                  <Photo src={k.img} gradient="radial-gradient(circle at 35% 30%,#fff,#e7cdb4 60%,#c9a07c)" className="h-[82px] w-[82px] rounded-full ring-2 ring-white/80 shadow-[0_8px_20px_rgba(110,72,46,0.2)]" />
                  <span className={`rounded-full px-5 py-1.5 text-[13px] font-semibold ${active ? 'bg-gradient-to-l from-[#3a2418] to-[#6b4630] text-[#f3dcc4]' : 'text-[#3a2418]'}`}>{k.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* سایدبار + محصولات */}
        <div className="mt-10 flex items-start gap-6">
          {/* محصولات (راست) */}
          <div className="min-w-0 flex-1">
            <div className="mb-5 flex items-center gap-4">
              <h2 className="text-[24px] font-bold text-[#2a1a12]">محصولات انگشتر</h2>
              <span className="h-5 w-px bg-[#c8a07c]/50" />
              <span className="text-[12px] text-[#7a5a46]">{fa(items.length)} محصول</span>

              <div className="mr-auto flex items-center gap-3">
                <label className="relative">
                  <span className="sr-only">مرتب‌سازی</span>
                  <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value as Sort); setPage(1); }}
                    className="glass-cream h-9 cursor-pointer appearance-none rounded-full py-0 pl-8 pr-4 text-[12px] text-[#3a2418] outline-none"
                  >
                    {(Object.keys(sortLabels) as Sort[]).map((s) => (
                      <option key={s} value={s}>مرتب‌سازی: {sortLabels[s]}</option>
                    ))}
                  </select>
                  <Chevron dir="left" className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 -rotate-90 text-[#7a5a46]" />
                </label>
                <div className="glass-cream flex h-9 items-center gap-1 rounded-full p-1">
                  {(['list', 'grid'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-label={v === 'grid' ? 'نمایش شبکه‌ای' : 'نمایش لیستی'}
                      aria-pressed={view === v}
                      onClick={() => setView(v)}
                      className={`grid h-7 w-7 place-items-center rounded-full transition ${view === v ? 'bg-[#3a2418] text-[#f3dcc4]' : 'text-[#7a5a46]'}`}
                    >
                      {v === 'grid' ? (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

           
<div className={view === 'grid' ? 'grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1' : 'flex flex-col gap-5'}>
  {visible.map((r: RingItem) => {
    const href = r.slug ? `/product/${r.slug}` : '/product';
    const isAdded = added.has(r.id);

    return (
      <article
        key={r.id}
        className={`group relative overflow-hidden rounded-[32px] border border-[#fff4e8]/80 bg-[#f9eee4] shadow-[0_12px_35px_rgba(74,43,25,0.13)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(74,43,25,0.2)] ${
          view === 'list'
            ? 'flex items-stretch gap-0 max-sm:flex-col'
            : ''
        }`}
      >
        {/* تصویر محصول */}
        <div
          className={`relative overflow-hidden bg-[#c9a187] ${
            view === 'list'
              ? 'h-[250px] w-[300px] shrink-0 max-sm:w-full'
              : 'h-[270px] w-full'
          }`}
        >
          <Link href={href} className="absolute inset-0 z-[1]">
            <Photo
              src={r.image}
              gradient="radial-gradient(80% 80% at 50% 40%,#fff4ea,#e9cfb7 75%)"
              className="h-full w-full rounded-none transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* لایه نور تصویر */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#3a2418]/15 via-transparent to-white/10" />

          {/* برچسب محصول */}
          <div className="absolute right-5 top-5 z-[3] flex items-center gap-2 rounded-full border border-[#e8c9a9]/60 bg-gradient-to-l from-[#28180f] to-[#543522] px-4 py-2 text-[11px] font-semibold text-[#f7e5d2] shadow-lg">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#e9bd8c]">
              <path d="M12 2 14.8 9.2 22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" />
            </svg>
            کالکشن پرتو
          </div>

          {/* علاقه‌مندی */}
          <div className="absolute left-5 top-5 z-[4]">
            <HeartButton className="!h-12 !w-12 !rounded-full border border-[#f4dfcc]/80 !bg-[#fff2e6]/75 shadow-[0_5px_18px_rgba(60,35,20,0.12)] backdrop-blur-md" />
          </div>

          {/* اطلاعات تصویری پایین */}
          <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-[2] flex justify-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-white bg-white shadow-md" />
            <span className="h-2 w-2 rounded-full border border-white/80 bg-white/40" />
            <span className="h-2 w-2 rounded-full border border-white/80 bg-white/40" />
          </div>
        </div>

        {/* پنل اطلاعات محصول */}
        <div
          className={`relative flex flex-col justify-between gap-5 bg-gradient-to-br from-[#fff7ef] via-[#f8e9dc] to-[#f3dfce] p-5 ${
            view === 'list' ? 'min-w-0 flex-1' : 'min-h-[190px]'
          }`}
        >
          {/* نام و قیمت */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 text-right">
              <Link href={href}>
                <h3 className="text-[16px] font-bold leading-8 text-[#2a1a12] transition-colors group-hover:text-[#966744] max-sm:text-[14px]">
                  {r.name}
                </h3>
              </Link>

              <p className="mt-1 text-[11px] text-[#92745f]">
                زیبایی ماندگار، انتخابی برای لحظه‌های خاص
              </p>
            </div>

            {/* قیمت */}
            <div className="shrink-0 text-left">
              <p className="text-[19px] font-black tracking-tight text-[#2a1a12] max-sm:text-[16px]">
                {fa(r.rawPrice)}
              </p>
              <span className="text-[10px] text-[#80634f]">
                تومان
              </span>
            </div>
          </div>

          {/* خط تزئینی */}
          <div className="h-px w-full bg-gradient-to-l from-transparent via-[#c69b77]/50 to-transparent" />

          {/* دکمه‌ها */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="مقایسه محصول"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d6b89b] bg-white/45 text-[#563824] shadow-[0_3px_10px_rgba(70,40,20,0.06)] transition-all hover:bg-[#3a2418] hover:text-[#f5dfc8]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18M5 7h14M7 7l-4 8h8L7 7Zm10 0-4 8h8l-4-8ZM5 21h14" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="اشتراک‌گذاری محصول"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({
                    title: r.name,
                    url: `${window.location.origin}${href}`,
                  }).catch(() => {});
                } else if (typeof navigator !== 'undefined') {
                  navigator.clipboard?.writeText(
                    `${window.location.origin}${href}`
                  );
                }
              }}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d6b89b] bg-white/45 text-[#563824] shadow-[0_3px_10px_rgba(70,40,20,0.06)] transition-all hover:bg-[#3a2418] hover:text-[#f5dfc8]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.4" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => addToCart(e, r.id)}
              className="flex h-12 min-w-0 flex-1 items-center justify-center gap-3 rounded-full border border-[#9d7554]/40 bg-gradient-to-l from-[#1c110c] via-[#392317] to-[#4a2e1d] px-4 text-[13px] font-bold text-[#f4dfca] shadow-[0_7px_18px_rgba(40,22,12,0.25)] transition-all duration-300 hover:brightness-125 hover:shadow-[0_10px_25px_rgba(40,22,12,0.35)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
                <circle cx="9" cy="19" r="1.2" />
                <circle cx="17" cy="19" r="1.2" />
              </svg>

              <span className="truncate">
                {isAdded ? '✓ افزوده شد' : 'افزودن به سبد خرید'}
              </span>
            </button>
          </div>
        </div>
      </article>
    );
  })}
</div>

            {visible.length === 0 && (
              <div className="glass-cream mt-4 rounded-[28px] py-20 text-center">
                <p className="text-[18px] font-bold text-[#2a1a12]">موردی یافت نشد</p>
                <p className="mt-2 text-[12px] text-[#7a5a46]">فیلترها را تغییر دهید و دوباره امتحان کنید.</p>
              </div>
            )}
          </div>

          {/* سایدبار فیلتر (چپ) */}
          <aside className="glass-cream sticky top-24 w-[270px] shrink-0 rounded-[26px] p-5 text-right">
            <div className="flex items-center justify-between border-b border-[#c8a07c]/25 pb-4">
              <h3 className="text-[15px] font-bold text-[#2a1a12]">فیلتر محصولات</h3>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-[#3a2418]"><FilterIcon /></span>
            </div>

            {/* قیمت */}
            <div className="border-b border-[#c8a07c]/20 py-4">
              <SectionTitle open={open.price} onClick={() => setOpen((o) => ({ ...o, price: !o.price }))}>محدوده قیمت</SectionTitle>
              {open.price && (
                <div className="mt-4">
                  <div className="relative h-5">
                    <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#d8bfa8]" />
                    <div className="absolute right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#2a1a12]" style={{ width: `${pct}%` }} />
                    <input
                      type="range"
                      dir="rtl"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      step={500000}
                      value={draft.maxPrice}
                      onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Number(e.target.value) }))}
                      aria-label="حداکثر قیمت"
                      className="absolute inset-0 h-5 w-full cursor-pointer opacity-0"
                    />
                    <span className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#2a1a12]" />
                    <span className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#2a1a12]" style={{ right: `calc(${pct}% - 7px)` }} />
                  </div>
                  <p className="mt-3 text-center text-[11px] text-[#5a3a28]">
                    {fa(MIN_PRICE)} — {fa(draft.maxPrice)} تومان
                  </p>
                </div>
              )}
            </div>

            {/* نوع طلا */}
            <div className="border-b border-[#c8a07c]/20 py-4">
              <SectionTitle open={open.gold} onClick={() => setOpen((o) => ({ ...o, gold: !o.gold }))}>نوع طلا</SectionTitle>
              {open.gold && (
                <div className="mt-3 space-y-2.5">
                  {goldTypes.map((g) => (
                    <Check key={g.value} label={g.label} checked={draft.gold.includes(g.value)} onChange={() => setDraft((d) => ({ ...d, gold: toggle(d.gold, g.value) }))} />
                  ))}
                </div>
              )}
            </div>

            {/* رنگ طلا */}
            <div className="border-b border-[#c8a07c]/20 py-4">
              <SectionTitle open={open.color} onClick={() => setOpen((o) => ({ ...o, color: !o.color }))}>رنگ طلا</SectionTitle>
              {open.color && (
                <div className="mt-3 flex gap-3">
                  {goldTypes.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      aria-label={g.label}
                      aria-pressed={draft.color === g.value}
                      onClick={() => setDraft((d) => ({ ...d, color: d.color === g.value ? null : g.value }))}
                      className={`h-6 w-6 rounded-full shadow-inner ring-offset-2 ring-offset-[#f6e9de] transition ${draft.color === g.value ? 'ring-2 ring-[#3a2418]' : 'ring-1 ring-white/70'}`}
                      style={{ background: g.swatch }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* سنگ */}
            <div className="border-b border-[#c8a07c]/20 py-4">
              <SectionTitle open={open.stone} onClick={() => setOpen((o) => ({ ...o, stone: !o.stone }))}>نوع سنگ و نگین</SectionTitle>
              {open.stone && (
                <div className="mt-3 space-y-2.5">
                  {stones.map((s) => (
                    <Check key={s.value} label={s.label} checked={draft.stone.includes(s.value)} onChange={() => setDraft((d) => ({ ...d, stone: toggle(d.stone, s.value) }))} />
                  ))}
                </div>
              )}
            </div>

            {/* برند */}
            <div className="py-4">
              <SectionTitle open={open.brand} onClick={() => setOpen((o) => ({ ...o, brand: !o.brand }))}>برند</SectionTitle>
              {open.brand && (
                <div className="mt-3">
                  <Check label="پرتو" checked={draft.brand} onChange={() => setDraft((d) => ({ ...d, brand: !d.brand }))} />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => { setApplied(draft); setPage(1); }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#1c110c] to-[#3d261a] text-[13px] font-semibold text-[#f3dcc4] shadow-[0_8px_20px_rgba(28,17,12,0.35)] transition hover:brightness-125"
            >
              <FilterIcon className="h-4 w-4" />
              اعمال فیلترها
            </button>
            {(applied.gold.length > 0 || applied.stone.length > 0 || applied.color || applied.brand || applied.maxPrice !== MAX_PRICE) && (
              <button type="button" onClick={() => { setDraft(emptyFilters); setApplied(emptyFilters); setPage(1); }} className="mt-3 w-full text-center text-[11px] text-[#7a5a46] underline underline-offset-4">
                حذف همه فیلترها
              </button>
            )}
          </aside>
        </div>

        {/* بنر کالکشن ویژه */}
        <div className="relative mt-10 flex h-[215px] items-center overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(60,36,24,0.3)]">
          <Photo
            src="/images/product-hero/product-hero-model.jpg"
            gradient="radial-gradient(60% 100% at 18% 50%,#a87a58,#3a2418 65%,#1c110c)"
            className="absolute inset-0"
            style={{ backgroundPosition: 'left center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c] via-[#1c110c]/85 to-transparent" />
          <svg className="pointer-events-none absolute left-[38%] top-0 h-full w-[260px] text-[#e2bf9f]/50" viewBox="0 0 260 215" fill="none" stroke="currentColor" strokeWidth="1"><path d="M30 0C-20 80 20 190 150 215" /></svg>
          <div className="relative w-[420px] pr-14 text-right">
            <h2 className="text-[26px] font-bold text-[#f3dcc4]">کالکشن ویژه پرتو</h2>
            <p className="mt-2 text-[13px] text-[#e6d2bf]/90">انتخابی منحصربه‌فرد برای لحظه‌های خاص</p>
            <GoldButton href="/collection" className="mt-6 !px-6">
              مشاهده کالکشن
              <ArrowLeft className="h-4 w-4" />
            </GoldButton>
          </div>
        </div>

        {/* صفحه‌بندی */}
        {pages > 1 && (
          <nav aria-label="صفحه‌بندی" className="mt-8 flex items-center justify-center gap-3 text-[13px] text-[#3a2418]">
            <button type="button" aria-label="صفحه قبل" disabled={current === 1} onClick={() => setPage(current - 1)} className="grid h-7 w-7 place-items-center rounded-full border border-[#c8a07c]/50 transition hover:bg-white/60 disabled:opacity-40">
              <Chevron dir="right" className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button key={p} type="button" onClick={() => setPage(p)} aria-current={p === current} className={`grid h-7 w-7 place-items-center rounded-full font-medium transition ${p === current ? 'bg-[#1c110c] text-[#f3dcc4]' : 'hover:bg-white/60'}`}>
                {fa(p)}
              </button>
            ))}
            <button type="button" aria-label="صفحه بعد" disabled={current === pages} onClick={() => setPage(current + 1)} className="grid h-7 w-7 place-items-center rounded-full border border-[#c8a07c]/50 transition hover:bg-white/60 disabled:opacity-40">
              <Chevron dir="left" className="h-3.5 w-3.5" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
