'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { RoundArrow } from '@/components/home/primitives';
import { allProducts } from '@/data/products';
import { getPricing } from '@/lib/pricing';
import type { Product } from '@/types/product';

function MiniCard({ product }: { product: Product }) {
  const [wished, setWished] = React.useState(false);
  const { price } = getPricing(product);
  return (
    <article className="glass-panel group relative w-[250px] shrink-0 overflow-hidden rounded-[26px]">
      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        aria-pressed={wished}
        onClick={() => setWished((v) => !v)}
        className={`absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/70 backdrop-blur transition hover:bg-white ${
          wished ? 'text-[#b3433a]' : 'text-[#5a3a28]'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
        </svg>
      </button>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[1/0.85] w-full overflow-hidden" style={{ background: 'linear-gradient(165deg,#e8cdb2,#f3e1cd 50%,#d6b394)' }}>
          {product.materials[0]?.images[0] && (
            <Image
              src={product.materials[0].images[0]}
              alt={product.name}
              fill
              sizes="250px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          )}
        </div>
        <div className="px-4 pb-4 pt-3 text-center">
          <h3 className="text-[14px] font-semibold text-[#24140d]">{product.name}</h3>
          <p className="mt-1.5 text-[13px] font-medium text-[#5a3a28]">{price} تومان</p>
        </div>
      </Link>
    </article>
  );
}

export const RelatedProducts = ({ product }: { product: Product }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 280, behavior: 'smooth' });

  const related = [
    ...allProducts.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...allProducts.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 8);

  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-5 pb-20 sm:px-10">
      <div className="mb-8 flex items-center gap-5">
        <span className="h-px flex-1 bg-gradient-to-l from-[#c8a07c]/70 to-transparent" />
        <h2 className="text-[26px] font-bold text-[#24140d]">محصولات مرتبط</h2>
        <span className="h-px flex-1 bg-gradient-to-r from-[#c8a07c]/70 to-transparent" />
      </div>

      <div className="flex items-center gap-3">
        <RoundArrow dir="right" dark={false} label="قبلی" onClick={() => scroll(1)} />
        <div ref={ref} className="no-scrollbar flex flex-1 gap-5 overflow-x-auto py-3">
          {related.map((p) => (
            <MiniCard key={p.id} product={p} />
          ))}
        </div>
        <RoundArrow dir="left" dark={false} label="بعدی" onClick={() => scroll(-1)} />
      </div>
    </section>
  );
};

export default RelatedProducts;
