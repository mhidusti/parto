'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { productSchemas } from '@/data/productSchemas';
import { faNum } from '@/lib/pricing';
import type { Product } from '@/types/product';

const specLabels: Record<string, string> = {
  centerStone: 'نگین مرکزی',
  caratWeight: 'وزن قیراط',
  cut: 'تراش',
  color: 'رنگ',
  clarity: 'خلوص',
  metal: 'جنس فلز',
  braceletStyle: 'مدل دستبند',
  clasp: 'نوع قفل',
  closure: 'نوع قفل',
  chainLength: 'طول زنجیر',
  style: 'مدل',
};

const tabs = [
  { id: 'desc', label: 'توضیحات' },
  { id: 'specs', label: 'مشخصات فنی' },
  { id: 'reviews', label: 'نظرات کاربران' },
] as const;

type TabId = (typeof tabs)[number]['id'];

function DiamondDivider() {
  return (
    <div className="mt-6 flex items-center justify-center gap-3 text-[#c8a07c]" aria-hidden>
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#c8a07c]" />
      <svg viewBox="0 0 48 40" className="h-5 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 3h24l10 12-22 22L2 15 12 3Z" />
        <path d="M2 15h44M17 3l-5 12 12 22 12-22-5-12" />
      </svg>
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#c8a07c]" />
    </div>
  );
}

export const ProductTabs = ({ product }: { product: Product }) => {
  const [tab, setTab] = useState<TabId>('desc');

  const fields = productSchemas[product.category].filter((f) => product.details[f.key]);
  const image = product.detailImages[0] ?? product.materials[0]?.images[0];

  return (
    <section className="mx-auto mt-6 max-w-[1360px] px-5 sm:px-10">
      <div className="glass-panel relative overflow-hidden rounded-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          {/* متن و تب‌ها (راست) */}
          <div className="order-2 px-6 pb-8 pt-6 sm:px-10 lg:order-1">
            <div role="tablist" className="flex items-center gap-8 border-b border-[#d9b99a]/50">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`relative -mb-px pb-3 text-[15px] transition ${
                    tab === t.id ? 'font-semibold text-[#24140d]' : 'text-[#7a5a46] hover:text-[#24140d]'
                  }`}
                >
                  {t.label}
                  {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[#c8a07c]" />}
                </button>
              ))}
            </div>

            <div className="min-h-[190px] pt-6" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              {tab === 'desc' && (
                <p className="max-w-[560px] text-[15px] leading-9 text-[#5a3a28]">
                  <strong className="font-bold text-[#24140d]">{product.name}</strong> با طراحی بی‌نظیر و استفاده از بهترین متریال، جلوه‌ای بی‌همتا به دستان شما می‌بخشد. {product.description}
                </p>
              )}

              {tab === 'specs' && (
                <dl className="max-w-[560px] divide-y divide-[#d9b99a]/50 text-[14px]">
                  {fields.map((f) => (
                    <div key={f.key} className="flex items-center justify-between gap-6 py-3">
                      <dt className="text-[#8a6e5c]">{specLabels[f.key] ?? f.label}</dt>
                      <dd className="font-medium text-[#24140d]">{product.details[f.key]}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {tab === 'reviews' && (
                <div className="max-w-[560px]">
                  <div className="flex items-center gap-3 text-[#24140d]">
                    <span className="text-[32px] font-bold">{faNum(product.rating)}</span>
                    <div className="text-[13px] text-[#7a5a46]">
                      از ۵ بر اساس {faNum(product.reviewsCount)} نظر کاربران
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] leading-8 text-[#5a3a28]">
                    هنوز متن نظری برای نمایش در این بخش ثبت نشده است.
                  </p>
                </div>
              )}
            </div>

            <DiamondDivider />
          </div>

          {/* تصویر (چپ) */}
          <div className="relative order-1 min-h-[260px] lg:order-2 lg:min-h-[340px]">
            {image && (
              <Image
                src={image}
                alt={`${product.name} — جزئیات`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{ background: 'linear-gradient(to right, transparent 60%, rgba(248,238,228,0.85))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
