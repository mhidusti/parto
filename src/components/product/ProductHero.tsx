'use client';

import React from 'react';
import Link from 'next/link';

export const ProductHero = () => {
  return (
    <section className="relative h-[440px] w-full overflow-hidden bg-[#2a1a12] isolate">
      {/* تصویر ابریشم و انگشتر (سمت چپ) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("/images/product-hero/product-hero-model.jpg"), radial-gradient(60% 90% at 25% 45%, #d9b595 0%, #946648 40%, #3b2419 78%, #1c110c 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/80 via-[#2a1a12]/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1c110c]/80 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1360px] items-center justify-start px-10 pt-14">
        <div className="w-[420px] text-right">
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[12px] text-[#eadccd]/90">
            <Link href="/" className="transition hover:text-white">خانه</Link>
            <span className="text-[#eadccd]/60">/</span>
            <span>محصولات</span>
          </nav>

          <h1 className="mt-4 text-[34px] font-bold leading-[1.4] text-[#fbf1e6]">
            مجموعه انگشترهای پرتو
          </h1>
          <p className="mt-2 text-[14px] text-[#eadccd]">
            زیبایی در جزئیات، اصالت در انتخاب
          </p>
          <span className="mt-6 block h-px w-[300px] bg-gradient-to-l from-[#e2bf9f] to-transparent" />
        </div>
      </div>

      {/* لبه موجی کرمی پایین */}
      <div
        className="absolute inset-x-0 bottom-0 h-[44px] bg-[#f6e9de]"
        style={{
          WebkitMaskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 44' preserveAspectRatio='none'><path d='M0 44V26C260 4 520 14 760 24C1040 36 1260 18 1440 0V44Z' fill='black'/></svg>\")",
          maskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 44' preserveAspectRatio='none'><path d='M0 44V26C260 4 520 14 760 24C1040 36 1260 18 1440 0V44Z' fill='black'/></svg>\")",
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      />
    </section>
  );
};

export default ProductHero;
