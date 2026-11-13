'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useLenis } from '@/hooks/useLenis';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Photo, ArrowLeft, DiamondIcon } from '@/components/home/primitives';
import { ProductCardView } from '@/components/product/ProductCard';
import { getPricing } from '@/lib/pricing';
import { Icon } from '@/components/silk/Silk';
import { allProducts } from '@/data/products';
import type { Product } from '@/types/product';

const wave = (d: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'><path d='${d}' fill='black'/></svg>")`;
const maskStyle = (img: string): React.CSSProperties => ({ WebkitMaskImage: img, maskImage: img, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' });

const fa = (n: number) => n.toLocaleString('fa-IR').replace(/٬/g, ',');
const MIN = 1_000_000;
const MAX = 50_000_000;
const priceOf = (p: Product) => p.rawPrice * 1000;
const imgOf = (p: Product) => p.materials[0]?.images[0] ?? '';

const golds = [
  { id: 'white-gold', label: 'طلای سفید' },
  { id: 'yellow-gold', label: 'طلای زرد' },
  { id: 'rose-gold', label: 'رزگلد' },
];

const categories = [
  { cat: 'RINGS', label: 'انگشترها', image: '/images/collection/cat-rings.jpg' },
  { cat: 'NECKLACES', label: 'گردنبندها', image: '/images/collection/cat-necklaces.jpg' },
  { cat: 'EARRINGS', label: 'گوشواره‌ها', image: '/images/collection/cat-earrings.jpg' },
];

const suggested = [
  { title: 'کالکشن عشق', sub: 'زیبایی در لوح احساس', image: '/images/collection/love.jpg' },
  { title: 'کالکشن مروارید', sub: 'ظرافتی اصیل و ماندگار', image: '/images/collection/pearl.jpg' },
];

/* کارت محصول — دقیقاً همان کارت کاتالوگ محصولات */
function ClassicCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false);
  const { price, oldPrice, discount } = getPricing(p);
  const images = (p.materials[0]?.images ?? []).slice(0, 3);
  return (
    <ProductCardView
      name={p.name}
      subTitle={p.subTitle}
      href={`/product/${p.slug}`}
      images={images}
      price={price}
      oldPrice={oldPrice}
      discount={discount}
      rating={p.rating}
      reviewsCount={p.reviewsCount}
      badge={p.isNew ? 'جدید' : p.isBestSeller ? 'پرفروش‌ترین' : null}
      added={added}
      onAddToCart={(e) => {
        e.preventDefault();
        setAdded(true);
        window.setTimeout(() => setAdded(false), 2000);
      }}
    />
  );
}

/* داده‌های سکشن‌های جدید */
const features = [
  { title: 'اصالت و گواهی', sub: 'گواهی معتبر الماس و طلا', d: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4' },
  { title: 'ارسال رایگان', sub: 'ارسال بیمه‌شده به سراسر کشور', d: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3Zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3Z' },
  { title: 'بازگشت ۷ روزه', sub: 'ضمانت بازگشت بدون دغدغه', d: 'M4 12a8 8 0 1 0 3-6.2M4 4v4h4' },
  { title: 'بسته‌بندی هدیه', sub: 'جعبه لوکس مخصوص پرتو', d: 'M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0' },
];

const goldCards = [
  { id: 'white-gold', label: 'طلای سفید', en: 'White Gold', sub: 'درخششی خنک و مدرن', swatch: 'linear-gradient(135deg,#fafafa,#a9adb3)' },
  { id: 'yellow-gold', label: 'طلای زرد', en: 'Yellow Gold', sub: 'گرمای اصیل و ماندگار', swatch: 'linear-gradient(135deg,#f9e29c,#c79a35)' },
  { id: 'rose-gold', label: 'رزگلد', en: 'Rose Gold', sub: 'لطافتی عاشقانه و نرم', swatch: 'linear-gradient(135deg,#f6cdb9,#c8866a)' },
];

const steps = [
  { n: '۰۱', title: 'طراحی', sub: 'ایده‌پردازی و طراحی دستی هر قطعه' },
  { n: '۰۲', title: 'انتخاب مواد', sub: 'طلای ۱۸ عیار و الماس‌های منتخب' },
  { n: '۰۳', title: 'ساخت و نگین‌نشانی', sub: 'دست‌ساز توسط استادکاران ماهر' },
  { n: '۰۴', title: 'کنترل کیفیت', sub: 'بررسی نهایی و صدور گواهی' },
];

const reviews = [
  { name: 'سارا م.', text: 'کیفیت ساخت و بسته‌بندی فوق‌العاده بود؛ دقیقاً همان چیزی که در تصاویر می‌دیدم.', rate: 5 },
  { name: 'نیلوفر ک.', text: 'هدیه سالگرد بود و همسرم عاشقش شد. ظرافت قطعه واقعاً بی‌نظیره.', rate: 5 },
  { name: 'محمد ر.', text: 'مشاوره عالی و ارسال سریع. قطعه‌های کالکشن کلاسیک همیشه مد روز می‌مانند.', rate: 5 },
];

const faqs = [
  { q: 'آیا محصولات گواهی اصالت دارند؟', a: 'بله، تمام قطعات کالکشن کلاسیک همراه با گواهی اصالت طلا و الماس ارسال می‌شوند.' },
  { q: 'امکان تغییر سایز انگشتر وجود دارد؟', a: 'تا ۷ روز پس از دریافت، تغییر سایز برای انگشترها رایگان انجام می‌شود.' },
  { q: 'ارسال چند روز طول می‌کشد؟', a: 'سفارش‌های تهران ۱ تا ۲ روز کاری و سایر شهرها ۲ تا ۴ روز کاری تحویل داده می‌شوند.' },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-[#d9a45e]" aria-label={`${n} از ۵`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="m12 2.8 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8 6.6 19.7l1-6.1L3.2 9.3l6.1-.9L12 2.8Z" /></svg>
      ))}
    </div>
  );
}

function SectionTitle({ en, title, sub }: { en: string; title: string; sub?: string }) {
  return (
    <div className="mb-7 flex flex-col items-center text-center">
      <span className="font-serif text-[12px] italic tracking-[0.28em] text-[#b3865f]" dir="ltr">{en}</span>
      <h2 className="mt-1 text-[26px] font-bold">{title}</h2>
      {sub && <p className="mt-1 text-[13px] text-[#7a5a46]">{sub}</p>}
      <div aria-hidden className="mt-3 flex w-full max-w-[260px] items-center gap-3 text-[#b3865f]">
        <span className="h-px flex-1 bg-gradient-to-l from-[#b3865f]/70 to-transparent" />
        <DiamondIcon className="h-[14px] w-[18px]" />
        <span className="h-px flex-1 bg-gradient-to-r from-[#b3865f]/70 to-transparent" />
      </div>
    </div>
  );
}

export default function ClassicCollectionPage() {
  useLenis();
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [gold, setGold] = useState<string[]>([]);
  const [slide, setSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pickGold = (id: string) => {
    setGold([id]);
    document.getElementById('all')?.scrollIntoView({ behavior: 'smooth' });
  };
  const slides = [
    { title: 'کالکشن کلاسیک', sub: 'زیبایی فراتر از زمان' },
    { title: 'درخشش بی‌زمان', sub: 'طراحی‌های ماندگار برای لحظه‌های خاص' },
    { title: 'ظرافت در جزئیات', sub: 'الماس و طلای ناب، در کنار شما' },
  ];

  const selected = useMemo(() => allProducts.filter((p) => p.isBestSeller || p.isNew).concat(allProducts).filter((p, i, a) => a.indexOf(p) === i).slice(0, 4), []);
  const filtered = useMemo(
    () =>
      allProducts.filter((p) => priceOf(p) <= maxPrice && (gold.length === 0 || p.materials.some((m) => gold.includes(m.id)))),
    [maxPrice, gold],
  );
  const pct = ((maxPrice - MIN) / (MAX - MIN)) * 100;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f6e9de] font-sans text-[#2a1a12]">
      <Header />

      {/* هیرو */}
      <section className="relative h-[430px] w-full overflow-hidden bg-[#2a1a12] isolate">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/collection/classic-hero.jpg"), radial-gradient(60% 90% at 25% 45%, #d9b595 0%, #946648 40%, #3b2419 78%, #1c110c 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/80 via-[#2a1a12]/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1c110c]/80 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-10 pt-14">
          <div className="w-[440px] max-w-full text-right">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-[#e8c9aa]" dir="ltr">COLLECTION <span className="h-px w-10 bg-[#e8c9aa]/70" /> 01</div>
            <h1 className="mt-4 text-[40px] font-bold text-[#fbf1e6]">{slides[slide].title}</h1>
            <p className="mt-1 text-[20px] text-[#eadccd]">{slides[slide].sub}</p>
            <p className="mt-4 text-[13px] leading-7 text-[#eadccd]/90">مجموعه‌ای از طراحی‌های جاودانه و ظریف<br />برای لحظات خاص زندگی شما.</p>
            <a href="#all" className="btn-gold mt-6 inline-flex h-11 items-center gap-3 rounded-full px-8 text-[14px] font-medium"><ArrowLeft /> کشف مجموعه</a>
          </div>
        </div>
        <div className="absolute bottom-16 left-10 z-10 flex items-center gap-2" dir="ltr">
          <button type="button" aria-label="قبلی" onClick={() => setSlide((s) => (s + slides.length - 1) % slides.length)} className="grid h-8 w-8 place-items-center rounded-full border border-[#e8c9aa]/60 text-[#e8c9aa] hover:bg-[#e8c9aa] hover:text-[#2a1a12]"><Icon name="chevL" className="h-4 w-4" /></button>
          <button type="button" aria-label="بعدی" onClick={() => setSlide((s) => (s + 1) % slides.length)} className="grid h-8 w-8 place-items-center rounded-full border border-[#e8c9aa]/60 text-[#e8c9aa] hover:bg-[#e8c9aa] hover:text-[#2a1a12]"><Icon name="chevR" className="h-4 w-4" /></button>
          {slides.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-[#e8c9aa]' : 'w-1.5 bg-[#e8c9aa]/50'}`} />)}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[56px] bg-[#f6e9de]" style={maskStyle(wave('M0 60V38C260 6 520 18 760 34C1040 52 1260 26 1440 0V60Z'))} />
      </section>

      <div className="mx-auto w-full max-w-[1360px] space-y-9 px-6 pb-14 pt-2 lg:px-10">
        {/* داستان کالکشن */}
        <section className="relative flex min-h-[220px] items-center overflow-hidden rounded-[28px] border border-white/60 shadow-[0_14px_36px_rgba(110,72,46,0.18)]">
          <Photo src="/images/collection/story-necklace.jpg" gradient="linear-gradient(120deg,#d9b595,#f1d9c3)" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#f8ece0]/95 via-[#f8ece0]/70 to-transparent" />
          <DiamondIcon className="absolute left-6 top-1/2 hidden h-32 w-36 -translate-y-1/2 text-[#c8a07c]/40 lg:block" />
          <div className="relative mr-0 w-full px-8 py-8 text-right lg:w-[48%]">
            <h2 className="flex items-center gap-4 text-[22px] font-bold">داستان کالکشن <span className="h-px w-24 bg-[#c8a07c]" /></h2>
            <p className="mt-4 text-[14px] leading-8 text-[#4a2f20]">
              کالکشن کلاسیک، الهام‌گرفته از اصالت و زیبایی بی‌پایان است. طراحی‌هایی ماندگار که با درخشش خالص الماس و طلای ناب، همیشه در کنار شما خواهند بود.
            </p>
            <Link href="/about" className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-[#3a2418] hover:opacity-70">بیشتر بدانید <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </section>

        {/* نوار مزایا */}
        <section className="glass-cream grid grid-cols-2 gap-y-6 rounded-[28px] px-6 py-6 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={f.title} className={`flex items-center gap-4 px-3 ${i > 0 ? 'lg:border-r lg:border-[#c8a07c]/30' : ''}`}>
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-gradient-to-br from-[#f1d3b6] to-[#d9a47e] text-[#3a2418] shadow">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={f.d} /></svg>
              </span>
              <div className="text-right">
                <div className="text-[14px] font-bold">{f.title}</div>
                <div className="mt-0.5 text-[11.5px] leading-5 text-[#7a5a46]">{f.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* دسته‌ها */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.cat} href={`/product?category=${c.cat}`} className="group relative block h-[130px] overflow-hidden rounded-[22px] border border-white/60 shadow-[0_10px_26px_rgba(110,72,46,0.16)]">
              <Photo src={c.image} gradient="linear-gradient(135deg,#ecd2ba,#c9a07c)" className="absolute inset-0 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#f3dcc4]/95 to-[#f3dcc4]/50 px-4 py-2.5 backdrop-blur-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#c8a07c] text-white"><ArrowLeft className="h-3.5 w-3.5" /></span>
                <span className="text-[16px] font-bold">{c.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* محصولات منتخب */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <Link href="/product" className="inline-flex items-center gap-2 text-[13px] text-[#4a2f20] hover:opacity-70"><ArrowLeft className="h-4 w-4" /> مشاهده همه</Link>
            <h2 className="text-[22px] font-bold">محصولات منتخب کالکشن</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{selected.map((p) => <ClassicCard key={p.id} p={p} />)}</div>
        </section>

        {/* انتخاب بر اساس رنگ طلا */}
        <section>
          <SectionTitle en="CHOOSE YOUR GOLD" title="رنگ طلای خودت را انتخاب کن" sub="با یک کلیک، محصولات همان رنگ را ببین" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {goldCards.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => pickGold(g.id)}
                className="group relative overflow-hidden rounded-[26px] border border-white/60 bg-gradient-to-b from-[#fbf1e6] to-[#f0dcc6] p-6 text-right shadow-[0_14px_34px_rgba(110,72,46,0.16)] transition hover:-translate-y-1"
              >
                <span className="absolute -left-10 -top-10 h-36 w-36 rounded-full opacity-70 blur-2xl transition group-hover:opacity-100" style={{ background: g.swatch }} />
                <span className="relative block h-16 w-16 rounded-full shadow-[inset_0_-6px_12px_rgba(0,0,0,0.18),0_10px_20px_rgba(110,72,46,0.3)] ring-2 ring-white/80" style={{ background: g.swatch }} />
                <span className="relative mt-4 block text-[18px] font-bold">{g.label}</span>
                <span className="relative block font-serif text-[12px] italic tracking-[0.14em] text-[#b3865f]" dir="ltr">{g.en}</span>
                <span className="relative mt-2 block text-[12.5px] text-[#6b4f3e]">{g.sub}</span>
                <span className="relative mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium text-[#3a2418]">مشاهده محصولات <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-1" /></span>
              </button>
            ))}
          </div>
        </section>

        {/* بنر */}
        <section className="relative flex h-[190px] items-center overflow-hidden rounded-[28px] bg-[#1c110c] shadow-[0_18px_44px_rgba(36,20,13,0.35)]">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("/images/collection/banner-bracelet.jpg"), radial-gradient(50% 120% at 30% 50%, #7a523a 0%, #3b2419 55%, #1c110c 100%)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/75 via-transparent to-transparent" />
          <div className="relative w-full px-10 text-right lg:w-[46%]">
            <h2 className="text-[24px] font-bold text-[#fbf1e6]">هر قطعه، روایتی از زیبایی بی‌زمان</h2>
            <p className="mt-2 text-[13px] text-[#eadccd]">با کالکشن کلاسیک، ماندگار باشید...</p>
            <a href="#all" className="btn-gold mt-4 inline-flex h-10 items-center gap-3 rounded-full px-6 text-[13px] font-medium"><ArrowLeft /> مشاهده تمام محصولات</a>
          </div>
        </section>

        {/* همه محصولات + فیلتر */}
        <section id="all" className="scroll-mt-24">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-[12px] text-[#7a5a46]">({fa(filtered.length)} محصول)</span>
            <h2 className="text-[22px] font-bold">تمام محصولات کالکشن</h2>
          </div>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_270px]">
            <div>
              {filtered.length === 0 ? (
                <div className="glass-cream rounded-[24px] py-16 text-center text-[#6b4f3e]">محصولی با این فیلتر پیدا نشد.</div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((p) => <ClassicCard key={p.id} p={p} />)}</div>
              )}
            </div>

            <aside className="glass-cream rounded-[24px] p-5 lg:sticky lg:top-24">
              <h3 className="flex items-center justify-between text-[16px] font-bold">فیلتر محصولات <Icon name="chevD" className="h-4 w-4" /></h3>
              <div className="mt-4 border-t border-[#d9bfa6]/60 pt-4">
                <div className="text-[14px] font-bold">محدوده قیمت</div>
                <input
                  type="range" min={MIN} max={MAX} step={500000} value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                  aria-label="حداکثر قیمت"
                  className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full accent-[#3a2418]"
                  style={{ background: `linear-gradient(to left,#3a2418 ${pct}%,#d9bfa6 ${pct}%)` }}
                />
                <p className="mt-3 text-center text-[11px] text-[#6b4f3e]">{fa(MIN)} — {fa(maxPrice)} تومان</p>
              </div>
              <div className="mt-4 border-t border-[#d9bfa6]/60 pt-4">
                <div className="text-[14px] font-bold">نوع طلا</div>
                <ul className="mt-3 space-y-2.5">
                  {golds.map((g) => (
                    <li key={g.id}>
                      <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-[#4a2f20]">
                        <input type="checkbox" className="h-4 w-4 accent-[#3a2418]" checked={gold.includes(g.id)} onChange={() => setGold((s) => (s.includes(g.id) ? s.filter((x) => x !== g.id) : [...s, g.id]))} />
                        {g.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* مراحل ساخت */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#1c110c] px-6 py-12 shadow-[0_18px_44px_rgba(36,20,13,0.35)] lg:px-12">
          <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(60% 120% at 85% 0%, rgba(190,140,100,0.35), transparent 65%), radial-gradient(50% 100% at 5% 100%, rgba(120,78,52,0.5), transparent 65%)' }} />
          <div className="relative">
            <div className="mb-9 flex flex-col items-center text-center">
              <span className="font-serif text-[12px] italic tracking-[0.28em] text-[#c8a07c]" dir="ltr">THE CRAFT</span>
              <h2 className="mt-1 text-[26px] font-bold text-[#e8c9aa]">از ایده تا درخشش</h2>
              <p className="mt-1 text-[13px] text-[#d8c2ac]/85">مسیر ساخت هر قطعه کالکشن کلاسیک</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((st) => (
                <div key={st.n} className="relative rounded-[22px] border border-[#e2bf9f]/20 bg-white/[0.04] p-5 text-right backdrop-blur-sm">
                  <span className="font-serif text-[34px] leading-none text-[#c8a07c]/80">{st.n}</span>
                  <h3 className="mt-3 text-[16px] font-bold text-[#f3dcc4]">{st.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-6 text-[#d8c2ac]/85">{st.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* نظرات مشتریان */}
        <section>
          <SectionTitle en="TESTIMONIALS" title="نظر مشتریان" sub="تجربه کسانی که کالکشن کلاسیک را انتخاب کردند" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="glass-cream relative rounded-[24px] p-6 text-right">
                <span aria-hidden className="absolute left-5 top-3 font-serif text-[56px] leading-none text-[#c8a07c]/40">“</span>
                <Stars n={r.rate} />
                <blockquote className="mt-3 text-[13.5px] leading-7 text-[#4a2f20]">{r.text}</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#f1d3b6] to-[#d9a47e] text-[13px] font-bold text-[#3a2418]">{r.name[0]}</span>
                  <span className="text-[13px] font-medium">{r.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* سوالات متداول */}
        <section className="mx-auto w-full max-w-[860px]">
          <SectionTitle en="FAQ" title="سوالات متداول" />
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const on = openFaq === i;
              return (
                <div key={f.q} className="glass-cream overflow-hidden rounded-[20px]">
                  <button type="button" aria-expanded={on} onClick={() => setOpenFaq(on ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right text-[14px] font-bold">
                    <span>{f.q}</span>
                    <Icon name="chevD" className={`h-4 w-4 flex-none transition ${on ? 'rotate-180' : ''}`} />
                  </button>
                  {on && <p className="px-5 pb-4 text-[13px] leading-7 text-[#5a3a28]">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* مشاوره */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-l from-[#ecd2ba] via-[#f6e3d0] to-[#f8ece0] px-8 py-9 shadow-[0_14px_36px_rgba(110,72,46,0.18)]">
          <DiamondIcon className="absolute left-8 top-1/2 hidden h-28 w-32 -translate-y-1/2 text-[#c8a07c]/40 lg:block" />
          <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="text-right">
              <h2 className="text-[22px] font-bold">مشاوره رایگان خرید جواهر</h2>
              <p className="mt-1.5 text-[13px] text-[#5a3a28]">کارشناسان پرتو در انتخاب بهترین قطعه، کنارتان هستند.</p>
            </div>
            <Link href="/contact" className="btn-gold inline-flex h-11 items-center gap-3 rounded-full px-8 text-[14px] font-medium"><ArrowLeft /> تماس با ما</Link>
          </div>
        </section>

        {/* کالکشن‌های پیشنهادی */}
        <section>
          <h2 className="mb-4 text-[22px] font-bold">کالکشن‌های پیشنهادی</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {suggested.map((s) => (
              <Link key={s.title} href="/collection" className="group relative flex h-[130px] items-center overflow-hidden rounded-[22px] border border-white/60 shadow-[0_10px_26px_rgba(110,72,46,0.16)]">
                <Photo src={s.image} gradient="linear-gradient(135deg,#ecd2ba,#c9a07c)" className="absolute inset-0 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#f8ece0]/90 via-[#f8ece0]/50 to-transparent" />
                <div className="relative flex-1 px-7 text-right">
                  <div className="text-[18px] font-bold">{s.title}</div>
                  <div className="mt-1 text-[12px] text-[#5a3a28]">{s.sub}</div>
                </div>
                <span className="relative ml-5 grid h-8 w-8 place-items-center rounded-full bg-[#c8a07c] text-white"><ArrowLeft className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="-mb-px h-[60px] w-full bg-[#1c110c]" style={maskStyle(wave('M0 60V30C220 8 470 2 720 22C1000 44 1230 30 1440 6V60Z'))} />
      <Footer />
    </main>
  );
}
