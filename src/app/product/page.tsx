"use client";
import { useLenis } from "@/hooks/useLenis";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ProductPage() {
  useLenis();

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f6ebe0]">
      <Header />
      <ProductHero />
      <ProductCatalog />
      <Footer />
    </main>
  );
}
