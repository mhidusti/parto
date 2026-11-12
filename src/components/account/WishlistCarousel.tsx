'use client';

import React, { useRef, useState } from 'react';
import { Photo } from '@/components/home/primitives';
import { AccountCard, ArrowLink } from './ui';

const items = [
  { id: 'c1', title: 'انگشتر سولیتر رزگلد', image: '/images/products/lumiere-ring/rose-gold-1.jpg' },
  { id: 'c2', title: 'گوشواره قطره‌ای', image: '/images/products/verite-earrings/rose-gold-1.jpg' },
  { id: 'c3', title: 'انگشتر تک‌نگین', image: '/images/products/lumiere-ring/rose-gold-2.jpg' },
  { id: 'c4', title: 'گردنبند قطره‌ای', image: '/images/products/solstice-necklace/rose-gold-1.jpg' },
  { id: 'c5', title: 'دستبند تنیس', image: '/images/products/celesta-bracelet/white-gold-1.jpg' },
];

const Chev = ({ dir }: { dir: 'l' | 'r' }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === 'l' ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} />
  </svg>
);

export const WishlistCarousel: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>(() => Object.fromEntries(items.map((i) => [i.id, true])));

  const scroll = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: 'smooth' });

  return (
    <AccountCard title="علاقه‌مندی‌های من" action={<ArrowLink onClick={onViewAll}>مشاهده همه</ArrowLink>}>
      <div className="relative px-5 py-6" dir="rtl">
        <div ref={ref} className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth px-4">
          {items.map((it) => (
            <div key={it.id} className="relative h-[168px] w-[174px] flex-none overflow-hidden rounded-2xl border border-white/70 shadow-[0_8px_20px_rgba(110,72,46,0.18)]">
              <Photo src={it.image} gradient="linear-gradient(135deg,#f3e1cf,#d9b595)" className="h-full w-full" />
              <button
                type="button"
                aria-label={liked[it.id] ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
                onClick={() => setLiked((s) => ({ ...s, [it.id]: !s[it.id] }))}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-[#3a2418] backdrop-blur transition hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill={liked[it.id] ? '#c0674a' : 'none'} stroke={liked[it.id] ? '#c0674a' : 'currentColor'} strokeWidth="1.6" strokeLinejoin="round">
                  <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button type="button" aria-label="قبلی" onClick={() => scroll(300)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[#e8c9aa] text-[#3a2418] shadow-md transition hover:brightness-105">
          <Chev dir="r" />
        </button>
        <button type="button" aria-label="بعدی" onClick={() => scroll(-300)} className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[#e8c9aa] text-[#3a2418] shadow-md transition hover:brightness-105">
          <Chev dir="l" />
        </button>
      </div>
    </AccountCard>
  );
};

export default WishlistCarousel;
