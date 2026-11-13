'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getPricing, faNum } from '@/lib/pricing';
import type { Product } from '@/types/product';

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...iconProps} fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...iconProps}>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...iconProps}>
      <path d="M12 4v16M8 20h8M4 7h16" />
      <path d="m6.5 7-3 6.5a3.5 3.2 0 0 0 6 0L6.5 7ZM17.5 7l-3 6.5a3.5 3.2 0 0 0 6 0L17.5 7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...iconProps}>
      <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
      <circle cx="9" cy="19" r="1.2" />
      <circle cx="17" cy="19" r="1.2" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2c.6 4.8 2.2 7.4 5 8.4-2.8 1-4.4 3.6-5 8.4-.6-4.8-2.2-7.4-5-8.4C9.8 9.4 11.4 6.8 12 2Z" />
      <path d="M19 15c.3 2 1 3 2.2 3.5-1.2.5-1.9 1.5-2.2 3.5-.3-2-1-3-2.2-3.5C18 18 18.7 17 19 15Z" opacity=".7" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-[#d9a45e]" fill="currentColor">
      <path d="m12 2.8 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8 6.6 19.7l1-6.1L3.2 9.3l6.1-.9L12 2.8Z" />
    </svg>
  );
}

export interface ProductCardViewProps {
  name: string;
  subTitle?: string;
  href: string;
  images: string[];
  price: string;
  oldPrice?: string | null;
  discount?: string | null;
  rating?: number;
  reviewsCount?: number;
  badge?: string | null;
  added?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
  className?: string;
}

/* کارت محصول (نمای خالص) — هم برای ProductCard و هم برای کاتالوگ انگشترها */
export function ProductCardView({
  name, subTitle, href, images, price, oldPrice, discount, rating, reviewsCount,
  badge: label, added, onAddToCart, className = '',
}: ProductCardViewProps) {
  const [wished, setWished] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[34px] border border-white/60 shadow-[0_24px_60px_rgba(110,72,46,0.22)] ${className}`}
      style={{
        background:
          'linear-gradient(165deg,#e8cdb2 0%,#f3e1cd 45%,#d6b394 100%)',
      }}
    >
      {/* ------------------------------ تصویر ------------------------------ */}
      <div className="relative aspect-[1/1] w-full overflow-hidden">
        <Link href={href} aria-label={name} className="absolute inset-0 block">
          {images[active] && (
            <Image
              key={images[active]}
              src={images[active]}
              alt={name}
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
        </Link>

        {label && (
          <span className="absolute left-4 top-4 z-10 inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-l from-[#4a2e20] to-[#24140d] px-4 text-[13px] font-medium text-[#f6e6d3] shadow-[0_6px_16px_rgba(36,20,13,0.35)] ring-1 ring-[#e2bf9f]/30">
            <span className="text-[#e8c9aa]"><SparkIcon /></span>
            {label}
          </span>
        )}

        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className={`absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-[18px] bg-[#f8ece0]/85 shadow-[0_6px_16px_rgba(110,72,46,0.2)] ring-1 ring-white/70 backdrop-blur-md transition hover:bg-white ${
            wished ? 'text-[#b3433a]' : 'text-[#24140d]'
          }`}
        >
          <HeartIcon filled={wished} />
        </button>

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-[52px] z-10 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-black/15 px-3 py-1.5 backdrop-blur-sm" dir="ltr">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  aria-label={`تصویر ${faNum(i + 1)}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${
                    i === active ? 'h-3 w-3 bg-white' : 'h-2.5 w-2.5 bg-[#d9b99a] hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------ اطلاعات ------------------------------ */}
      <div className="relative z-10 -mt-10 mx-3 mb-3 rounded-[28px] bg-gradient-to-b from-[#fbf1e6] to-[#f4e3d2] p-4 shadow-[0_-8px_24px_rgba(110,72,46,0.12)] ring-1 ring-white/70">
        <Link href={href} className="block">
          <h3 className="text-[16px] font-bold leading-snug text-[#24140d]">{name}</h3>
        </Link>
        {subTitle && <p className="mt-1 line-clamp-1 text-[12.5px] text-[#8a6e5c]">{subTitle}</p>}

        <div className="mt-2.5 flex items-center justify-between">
          {rating !== undefined ? (
            <div className="flex items-center gap-1.5 text-[12.5px] text-[#5a3a28]">
              <StarIcon />
              <span className="font-medium">{faNum(rating)}</span>
              {reviewsCount !== undefined && <span className="text-[#8a6e5c]">({faNum(reviewsCount)} نظر)</span>}
            </div>
          ) : <span />}

          {oldPrice && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#8a6e5c] line-through decoration-[#8a6e5c]/70">{oldPrice}</span>
              <span className="rounded-full bg-[#f1cfa8] px-2.5 py-0.5 text-[12px] font-medium text-[#5a3a28]">
                -{discount}
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-1.5 text-[#24140d]">
          <span className="text-[24px] font-bold leading-none tracking-tight">{price}</span>
          <span className="text-[13px] text-[#6a4a38]">تومان</span>
        </div>

        <div className="mt-3.5 flex items-center gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-l from-[#4a2e20] to-[#24140d] px-2 text-[13px] font-medium text-[#f6e6d3] shadow-[0_8px_18px_rgba(36,20,13,0.3)] transition hover:brightness-125"
          >
            <CartIcon />
            {added ? '✓ افزوده شد' : 'افزودن به سبد خرید'}
          </button>
          <button
            type="button"
            aria-label="اشتراک‌گذاری"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d9b99a] bg-white/40 text-[#3a2418] transition hover:bg-white"
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            aria-label="مقایسه"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d9b99a] bg-white/40 text-[#3a2418] transition hover:bg-white"
          >
            <CompareIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

export interface ProductCardProps {
  product: Product;
  /** برچسب بالای کارت؛ پیش‌فرض: «پرفروش‌ترین» برای محصولات پرفروش */
  badge?: string | null;
  className?: string;
}

export function ProductCard({ product, badge, className = '' }: ProductCardProps) {
  const images = useMemo(() => (product.materials[0]?.images ?? []).slice(0, 3), [product.materials]);
  const { price, oldPrice, discount } = getPricing(product);
  return (
    <ProductCardView
      name={product.name}
      subTitle={product.subTitle}
      href={`/product/${product.slug}`}
      images={images}
      price={price}
      oldPrice={oldPrice}
      discount={discount}
      rating={product.rating}
      reviewsCount={product.reviewsCount}
      badge={badge === undefined ? (product.isBestSeller ? 'پرفروش‌ترین' : null) : badge}
      className={className}
    />
  );
}

export default ProductCard;
