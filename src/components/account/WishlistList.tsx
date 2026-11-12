'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface WishlistItem {
  id: string;
  title: string;
  category: string;
  price: string;
  inStock: boolean;
  image: string;
}

const mockWishlist: WishlistItem[] = [
  {
    id: 'w1',
    title: 'دیمر حلقه برنجی پرتو',
    category: 'کنترل‌کننده‌های روشنایی',
    price: '۲,۱۰۰,۰۰۰ تومان',
    inStock: true,
    image: '/images/account/recentorder.jpg',
  },
  {
    id: 'w2',
    title: 'صفحه دیواری مرمرین مجسمه‌وار',
    category: 'یراق‌آلات معماری',
    price: '۱,۴۵۰,۰۰۰ تومان',
    inStock: true,
    image: '/images/account/recentorder2.jpg',
  },
  {
    id: 'w3',
    title: 'آویز خطی مینیمالیست',
    category: 'روشنایی آویز',
    price: '۳,۸۰۰,۰۰۰ تومان',
    inStock: false,
    image: '/images/account/recentorder3.jpg',
  },
];

export const WishlistList: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>(mockWishlist);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 border-b border-[#d9bfa6]/60">
        <div>
          <h2 className="font-serif text-xl font-light tracking-wide text-[#2a1a12]">
            علاقه‌مندی‌ها
          </h2>
          <p className="font-sans text-xs text-[#7a6252] mt-1">
            مجموعه برگزیده از اقلام ذخیره‌شده شما.
          </p>
        </div>
        <span className="font-mono text-xs text-[#9a6b47]" dir="ltr">
          {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      {/* WISHLIST ITEMS */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-white/50 border border-[#d9bfa6]/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#c8a07c]/40 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#d9bfa6]/60 bg-white/40 flex-none relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-wider text-[#9a6b47]">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-light text-[#2a1a12] mt-0.5">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-serif text-sm text-[#2a1a12]">{item.price}</span>
                  <span
                    className={`font-sans text-[10px] tracking-wider px-2.5 py-0.5 rounded-full border ${
                      item.inStock
                        ? 'border-[#bcd3b0] text-[#3f6b3a] bg-[#dfead7]'
                        : 'border-[#d9bfa6]/60 text-[#8a7261]'
                    }`}
                  >
                    {item.inStock ? 'موجود در انبار' : 'پیش‌خرید'}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#d9bfa6]/40">
              <button
                disabled={!item.inStock}
                className={`px-4 py-2.5 rounded-full font-sans text-xs tracking-wider transition-all duration-300 ${
                  item.inStock
                    ? 'border border-[#c8a07c]/40 bg-[#e8c9aa]/10 text-[#9a6b47] hover:bg-[#e8c9aa] hover:text-[#2a1a12]'
                    : 'border border-[#d9bfa6]/60 text-[#8a7261] cursor-not-allowed opacity-50'
                }`}
              >
                {item.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
              </button>

              <button
                onClick={() => handleRemove(item.id)}
                className="w-8 h-8 rounded-full border border-[#d9bfa6]/60 flex items-center justify-center text-[#7a6252] hover:text-[#b4472f] hover:border-[#b4472f]/40 transition-all text-xs"
                title="حذف کالا"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 border border-dashed border-[#d9bfa6]/60 rounded-2xl">
            <p className="font-sans text-xs text-[#7a6252]">لیست علاقه‌مندی‌های شما در حال حاضر خالی است.</p>
            <Link
              href="/collection"
              className="inline-block mt-3 font-sans text-xs tracking-wider text-[#9a6b47] underline"
            >
              مشاهده مجموعه آثار
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistList;