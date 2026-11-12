'use client';

import React from 'react';

import { useLenis } from '@/hooks/useLenis';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { ProductHero } from '@/components/product-detail/ProductHero';
import { ProductTabs } from '@/components/product-detail/ProductTabs';
import { RelatedProducts } from '@/components/product-detail/RelatedProducts';

import type { Product } from '@/types/product';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  useLenis();

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden text-[#3a2418]"
      style={{
        background:
          'radial-gradient(70% 30% at 15% 12%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(60% 25% at 90% 55%, rgba(255,255,255,0.4), transparent 70%), linear-gradient(180deg,#f0e1d3 0%,#f6ebe0 35%,#ecd9c7 70%,#f2e4d6 100%)',
      }}
    >
      {/* باند تیره بالا با لبه موجی */}
      <div
        aria-hidden
        className="top-band-wave absolute inset-x-0 top-0 h-[110px] lg:h-[130px]"
        style={{
          background:
            'radial-gradient(50% 120% at 80% 0%, rgba(150,100,70,0.45), transparent 70%), linear-gradient(120deg,#1a0f0a,#34211a 55%,#1a0f0a)',
        }}
      />

      <Header />

      <ProductHero product={product} />
      <ProductTabs product={product} />
      <RelatedProducts product={product} />

      {/* موج بالای فوتر */}
      <div aria-hidden className="hero-wave -mb-px h-[70px] w-full bg-[#1c110c]" />
      <Footer />
    </main>
  );
}
