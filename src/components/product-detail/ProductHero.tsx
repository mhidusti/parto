'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getPricing, faNum } from '@/lib/pricing';
import type { Product } from '@/types/product';

interface ProductHeroProps {
  product: Product;
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const categoryLabels: Record<string, string> = {
  RINGS: 'انگشتر',
  NECKLACES: 'گردنبند',
  EARRINGS: 'گوشواره',
  BRACELETS: 'دستبند',
};

function Heart({ filled, className = 'h-5 w-5' }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-[#d9a45e]" aria-label={`${rating} از ۵`} dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill={i <= Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d="m12 2.8 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8 6.6 19.7l1-6.1L3.2 9.3l6.1-.9L12 2.8Z" />
        </svg>
      ))}
    </span>
  );
}

function Chevron({ up }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...stroke}>
      <path d={up ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
    </svg>
  );
}

const benefits = [
  {
    title: 'ارسال رایگان',
    desc: 'برای خرید بالای ۵ میلیون',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
        <circle cx="7" cy="17.5" r="1.7" />
        <circle cx="17" cy="17.5" r="1.7" />
      </svg>
    ),
  },
  {
    title: 'ضمانت اصالت کالا',
    desc: 'با گواهی معتبر',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </svg>
    ),
  },
  {
    title: 'بازگشت',
    desc: 'تا ۷ روز',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
        <path d="M18.5 3v4h-4M5.5 21v-4h4" />
      </svg>
    ),
  },
];

export const ProductHero = ({ product }: ProductHeroProps) => {
  const [materialId, setMaterialId] = useState(product.materials[0]?.id ?? '');
  const [imageIdx, setImageIdx] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  /* با تغییر محصول، stateها reset می‌شوند */
  useEffect(() => {
    setMaterialId(product.materials[0]?.id ?? '');
    setImageIdx(0);
    setThumbStart(0);
    setOptions(
      Object.fromEntries(
        (product.options ?? []).map((o) => [o.key, o.values[Math.min(2, o.values.length - 1)] ?? '']),
      ),
    );
    setAdding(false);
    setFullscreen(false);
  }, [product.slug, product.materials, product.options]);

  const material = useMemo(
    () => product.materials.find((m) => m.id === materialId) ?? product.materials[0],
    [product.materials, materialId],
  );

  const images = material?.images ?? [];
  const current = Math.min(imageIdx, Math.max(images.length - 1, 0));
  const VISIBLE = 4;
  const visibleThumbs = images.slice(thumbStart, thumbStart + VISIBLE);
  const { price, oldPrice, discount } = getPricing(product);
  const code = product.number.split('/')[0].trim();

  const addToCart = () => {
    setAdding(true);
    window.setTimeout(() => setAdding(false), 1200);
  };

  return (
    <section className="relative pb-10 pt-[100px] lg:pt-[120px]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* ============================ اطلاعات (راست) ============================ */}
          <div className="order-2 lg:order-1">
            {/* breadcrumb */}
            <nav aria-label="مسیر" className="mb-6 flex items-center gap-2 text-[12px] text-[#7a5a46] lg:justify-start">
              <Link href="/" className="hover:text-[#3a2418]">خانه</Link>
              <span>/</span>
              <Link href="/product" className="hover:text-[#3a2418]">محصولات</Link>
              <span>/</span>
              <span className="text-[#3a2418]">{categoryLabels[product.category] ?? product.category}</span>
            </nav>

            <span className="inline-flex h-7 items-center rounded-full bg-[#ecd5bd] px-3.5 text-[12px] font-medium text-[#6a4a38] ring-1 ring-white/60">
              {product.name.split(' ')[0]} — {code}
            </span>

            <h1 className="mt-3 text-[30px] font-bold leading-tight text-[#24140d] sm:text-[36px]">{product.name}</h1>

            <div className="mt-2 flex items-center gap-2.5 text-[13px]">
              <Stars rating={product.rating} />
              <span className="font-medium text-[#3a2418]">{faNum(product.rating)}</span>
              <span className="text-[#8a6e5c]">({faNum(product.reviewsCount)} نظر)</span>
            </div>

            {/* قیمت */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="inline-flex items-baseline gap-2 rounded-[22px] bg-gradient-to-l from-[#f6e6d3] to-[#f9eee2] px-5 py-3 shadow-[0_8px_22px_rgba(110,72,46,0.12)] ring-1 ring-white/70">
                <span className="text-[34px] font-bold leading-none tracking-tight text-[#24140d] sm:text-[40px]">{price}</span>
                <span className="text-[15px] text-[#5a3a28]">تومان</span>
              </div>
              {oldPrice && (
                <span className="text-[14px] text-[#8a6e5c] line-through">
                  {oldPrice} تومان
                </span>
              )}
            </div>
            {discount && (
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-full bg-[#e9c9a6] px-3 py-0.5 text-[13px] font-semibold text-[#5a3a28]">-{discount}</span>
                <span className="h-px w-28 bg-gradient-to-l from-[#c8a07c] to-transparent" />
              </div>
            )}

            <p className="mt-5 max-w-[460px] text-[15px] leading-8 text-[#5a3a28]">{product.subTitle}. {product.description.split('.')[0]}.</p>

            <div className="mt-6 h-px w-full bg-gradient-to-l from-[#d9b99a]/70 to-transparent" />

            {/* رنگ طلا */}
            {product.materials.length > 1 && (
              <div className="mt-6 flex items-center gap-4">
                <span className="text-[14px] font-semibold text-[#24140d]">رنگ طلا :</span>
                <div className="flex items-center gap-3">
                  {product.materials.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      title={m.label}
                      aria-label={m.label}
                      aria-pressed={materialId === m.id}
                      onClick={() => {
                        setMaterialId(m.id);
                        setImageIdx(0);
                      }}
                      className={`h-9 w-9 rounded-full p-[3px] transition ${
                        materialId === m.id ? 'ring-2 ring-[#24140d] ring-offset-2 ring-offset-[#f6e9dc]' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className={`block h-full w-full rounded-full bg-gradient-to-br ${m.gradient}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* گزینه‌ها (سایز انگشتر و ...) */}
            {product.options?.map((option) => (
              <div key={option.key} className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-[14px] font-semibold text-[#24140d]">{option.label} :</span>
                <div className="flex flex-wrap items-center gap-3">
                  {option.values.map((v) => {
                    const selected = options[option.key] === v;
                    const wide = v.length > 2;
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setOptions((p) => ({ ...p, [option.key]: v }))}
                        className={`grid h-10 place-items-center rounded-full text-[14px] transition ${wide ? 'px-4' : 'w-10'} ${
                          selected
                            ? 'bg-[#24140d] text-[#f6e6d3] shadow-[0_6px_14px_rgba(36,20,13,0.3)]'
                            : 'bg-[#f3e2d0] text-[#5a3a28] ring-1 ring-white/70 hover:bg-[#ead3bb]'
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
                {option.guideLabel && (
                  <button type="button" className="text-[12px] text-[#8a6e5c] underline underline-offset-4 hover:text-[#3a2418]">
                    {option.guideLabel}
                  </button>
                )}
              </div>
            ))}

            {/* CTA */}
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={addToCart}
                disabled={adding}
                className="flex h-[56px] flex-1 items-center justify-center gap-3 rounded-full bg-gradient-to-l from-[#4a2e20] to-[#24140d] text-[16px] font-medium text-[#f6e6d3] shadow-[0_12px_26px_rgba(36,20,13,0.35)] transition hover:brightness-125 disabled:cursor-wait disabled:opacity-80"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
                  <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
                  <circle cx="9" cy="19" r="1.2" />
                  <circle cx="17" cy="19" r="1.2" />
                </svg>
                {adding ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
              </button>
              <button
                type="button"
                aria-label="افزودن به علاقه‌مندی‌ها"
                aria-pressed={wished}
                onClick={() => setWished((v) => !v)}
                className={`grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full border border-[#c8a07c] bg-white/30 transition hover:bg-white/70 ${
                  wished ? 'text-[#b3433a]' : 'text-[#3a2418]'
                }`}
              >
                <Heart filled={wished} />
              </button>
            </div>

            {/* مزایا */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#d9b99a]/60 pt-6">
              {benefits.map((b, i) => (
                <div key={b.title} className={`flex items-start gap-2.5 ${i === 2 ? 'flex-row-reverse text-left' : ''}`}>
                  <span className="mt-0.5 shrink-0 text-[#6a4a38]">{b.icon}</span>
                  <div className={i === 2 ? 'text-right' : ''}>
                    <div className="text-[13px] font-semibold text-[#24140d]">{b.title}</div>
                    <div className="mt-0.5 text-[11.5px] text-[#8a6e5c]">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================ گالری (چپ) ============================ */}
          <div className="order-1 flex gap-4 lg:order-2">
            {/* تصویر اصلی */}
            <div
              className="group relative aspect-[4/5] flex-1 overflow-hidden rounded-[30px] shadow-[0_24px_60px_rgba(110,72,46,0.25)] ring-1 ring-white/70"
              style={{ background: 'linear-gradient(165deg,#e8cdb2,#f3e1cd 50%,#d6b394)' }}
            >
              {images[current] && (
                <Image
                  key={`${materialId}-${current}`}
                  src={images[current]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}

              <button
                type="button"
                aria-label="افزودن به علاقه‌مندی‌ها"
                aria-pressed={wished}
                onClick={() => setWished((v) => !v)}
                className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#f8ece0]/80 ring-1 ring-white/70 backdrop-blur-md transition hover:bg-white ${
                  wished ? 'text-[#b3433a]' : 'text-[#24140d]'
                }`}
              >
                <Heart filled={wished} className="h-[18px] w-[18px]" />
              </button>

              <button
                type="button"
                aria-label="نمایش تمام‌صفحه"
                onClick={() => setFullscreen(true)}
                className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#24140d]/75 text-[#f6e6d3] backdrop-blur-md transition hover:bg-[#24140d]"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...stroke}>
                  <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                </svg>
              </button>
            </div>

            {/* تامبنیل‌ها */}
            {images.length > 0 && (
              <div className="flex w-[84px] shrink-0 flex-col items-center gap-3">
                <button
                  type="button"
                  aria-label="قبلی"
                  disabled={thumbStart === 0}
                  onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
                  className="text-[#6a4a38] transition hover:text-[#24140d] disabled:opacity-30"
                >
                  <Chevron up />
                </button>
                {visibleThumbs.map((img, i) => {
                  const idx = thumbStart + i;
                  return (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      aria-label={`تصویر ${faNum(idx + 1)}`}
                      aria-current={current === idx}
                      onClick={() => setImageIdx(idx)}
                      className={`relative h-[74px] w-[74px] overflow-hidden rounded-[18px] transition ${
                        current === idx
                          ? 'ring-2 ring-[#c8a07c] ring-offset-2 ring-offset-[#f6e9dc]'
                          : 'opacity-80 ring-1 ring-white/70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  );
                })}
                <button
                  type="button"
                  aria-label="بعدی"
                  disabled={thumbStart + VISIBLE >= images.length}
                  onClick={() => setThumbStart((s) => Math.min(images.length - VISIBLE, s + 1))}
                  className="text-[#6a4a38] transition hover:text-[#24140d] disabled:opacity-30"
                >
                  <Chevron />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* نمایش تمام‌صفحه */}
      {fullscreen && images.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex flex-col bg-[#140b07]/95 p-6 backdrop-blur-xl"
          onClick={() => setFullscreen(false)}
        >
          <div className="flex items-center justify-between text-[#f3dcc4]">
            <span className="text-sm">{faNum(current + 1)} / {faNum(images.length)}</span>
            <button type="button" onClick={() => setFullscreen(false)} className="rounded-full border border-[#e2bf9f]/50 px-4 py-1.5 text-sm hover:bg-[#e2bf9f] hover:text-[#2a1a12]">
              بستن
            </button>
          </div>
          <div className="relative mx-auto my-6 w-full max-w-5xl flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={images[current]} alt={product.name} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex justify-center gap-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setImageIdx((p) => (p + 1) % images.length)} className="rounded-full border border-[#e2bf9f]/50 px-5 py-2 text-sm text-[#f3dcc4] hover:bg-[#e2bf9f] hover:text-[#2a1a12]">بعدی</button>
            <button type="button" onClick={() => setImageIdx((p) => (p - 1 + images.length) % images.length)} className="rounded-full border border-[#e2bf9f]/50 px-5 py-2 text-sm text-[#f3dcc4] hover:bg-[#e2bf9f] hover:text-[#2a1a12]">قبلی</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductHero;
