import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { HeroSection } from "@/components/home/HeroSection";
import { Categories, Brands } from "@/components/home/CategoriesBrands";
import { NewestProducts, BestSellers } from "@/components/home/ProductSections";
import { BrandStory, SpecialCollections } from "@/components/home/StoryCollections";
import { TopBanners, BottomBanners } from "@/components/home/PromoBanners";
import { Features, Newsletter } from "@/components/home/FeaturesNewsletter";

export default function Home() {
  return (
    <main
      className="relative w-full overflow-x-hidden text-[#3a2418]"
      style={{
        background:
          "radial-gradient(70% 30% at 15% 12%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(60% 25% at 90% 55%, rgba(255,255,255,0.4), transparent 70%), linear-gradient(180deg,#f0e1d3 0%,#f6ebe0 35%,#ecd9c7 70%,#f2e4d6 100%)",
      }}
    >
      <SmoothScroll />
      <Header />
      <HeroSection />
      <Categories />
      <TopBanners />
      <Brands />
      <NewestProducts />
      <BestSellers />
      <BrandStory />
      <SpecialCollections />
      <BottomBanners />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  );
}
