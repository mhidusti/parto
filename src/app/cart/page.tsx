'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Photo } from '@/components/home/primitives';
import { allProducts } from '@/data/products';
import { faNum } from '@/lib/pricing';
import type { Product } from '@/types/product';

/* -------------------------------------------------------------------------- */
/* تنظیمات سبد                                                                */
/* -------------------------------------------------------------------------- */

const FREE_SHIPPING_FROM = 5_000_000; // ارسال رایگان برای خرید بالای ۵ میلیون
const SHIPPING_FEE = 250_000;
const ORDER_DISCOUNT = 5_000_000; // تخفیف نمونه؛ به کد تخفیف/API واقعی وصل شود

type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number; // تومان
  image: string;
  quantity: number;
  wished: boolean;
};

const bySlug = (slug: string) => allProducts.find((p) => p.slug === slug);
const firstImage = (p?: Product) => p?.materials[0]?.images[0] ?? '';

const initialItems: CartItem[] = [
  {
    id: 'lumiere-ring',
    name: 'انگشتر تک نگین کلاسیک',
    variant: 'طلای سفید | سایز ۱۳',
    price: 28_900_000,
    image: firstImage(bySlug('lumiere-ring')),
    quantity: 1,
    wished: false,
  },
  {
    id: 'solstice-necklace',
    name: 'گردنبند مروارید',
    variant: 'طلای زرد | طول ۴۰ سانتی‌متر',
    price: 23_900_000,
    image: firstImage(bySlug('solstice-necklace')),
    quantity: 1,
    wished: false,
  },
];

const money = (n: number) => `${faNum(n)} تومان`;

const silk = 'linear-gradient(165deg,#e8cdb2,#f3e1cd 50%,#d6b394)';

/* -------------------------------------------------------------------------- */
/* صفحه                                                                       */
/* -------------------------------------------------------------------------- */

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const sliderRef = useRef<HTMLDivElement>(null);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const discount = Math.min(subtotal, subtotal > 0 ? ORDER_DISCOUNT : 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  const total = subtotal - discount + shipping;

  const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  const suggestions = allProducts.filter((p) => !items.some((i) => i.id === p.slug)).slice(0, 8);

  const changeQty = (id: string, d: number) =>
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i)));
  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const toggleWish = (id: string) =>
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, wished: !i.wished } : i)));
  const add = (p: Product) =>
    setItems((cur) => [
      ...cur,
      {
        id: p.slug,
        name: p.name,
        variant: p.materials[0]?.label ?? p.subTitle,
        price: p.rawPrice * 1000,
        image: firstImage(p),
        quantity: 1,
        wished: false,
      },
    ]);

  const scrollSlider = (d: number) => sliderRef.current?.scrollBy({ left: d * 280, behavior: 'smooth' });

  return (
    <main
      dir="rtl"
      className="relative min-h-screen w-full overflow-x-hidden text-[#3a2418]"
      style={{
        background:
          'radial-gradient(70% 30% at 15% 12%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(60% 25% at 90% 55%, rgba(255,255,255,0.4), transparent 70%), linear-gradient(180deg,#f0e1d3 0%,#f6ebe0 35%,#ecd9c7 70%,#f2e4d6 100%)',
      }}
    >
      <Header />

      {/* ------------------------------ هیرو ------------------------------ */}
      <section className="relative h-[300px] w-full overflow-hidden bg-[#2a1a12] lg:h-[330px]">
        <Photo
          src="/images/hero/hero.png"
          gradient="radial-gradient(55% 90% at 22% 55%, #d7b79c 0%, #8d6249 38%, #3b2419 75%, #1c110c 100%)"
          className="absolute inset-0"
          style={{ backgroundPosition: 'left center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/80 via-[#2a1a12]/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1c110c]/80 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1360px] flex-col justify-center px-5 pt-16 text-right sm:px-10">
          <nav aria-label="مسیر" className="mb-3 flex items-center gap-2 text-[12px] text-[#e8d4bf]">
            <Link href="/" className="hover:text-white">خانه</Link>
            <span>/</span>
            <span>سبد خرید</span>
          </nav>
          <h1 className="text-[40px] font-light leading-tight text-[#fbf1e6] sm:text-[52px]">سبد خرید</h1>
          <p className="mt-2 text-[15px] text-[#e8d4bf]">انتخاب‌های شما، با عشق در کنار هم</p>
        </div>

        <div className="hero-wave absolute inset-x-0 bottom-0 h-[70px] bg-[#f2e5d8]" />
      </section>

      {/* ------------------------------ محتوا ------------------------------ */}
      <section className="mx-auto max-w-[1360px] px-5 pb-6 pt-2 sm:px-10">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* ---------- راست: لیست و نوار ارسال رایگان ---------- */}
          <div className="space-y-5">
            <div className="glass-panel overflow-hidden rounded-[26px]">
              {/* سرستون‌ها */}
              <div className="hidden grid-cols-[1fr_140px_150px_230px] items-center border-b border-[#d9b99a]/50 px-7 py-5 text-[14px] font-medium text-[#24140d] lg:grid">
                <span>محصول</span>
                <span className="text-center">قیمت واحد</span>
                <span className="text-center">تعداد</span>
                <span>عملیات</span>
              </div>

              {items.length === 0 ? (
                <div className="px-6 py-20 text-center">
                  <ShoppingBag size={34} strokeWidth={1.2} className="mx-auto text-[#b3865f]" />
                  <h3 className="mt-5 text-[22px] font-bold text-[#24140d]">سبد خرید شما خالی است</h3>
                  <p className="mt-2 text-[14px] text-[#7a5a46]">از مجموعه‌ی ماندگار پرتو دیدن کنید.</p>
                  <Link
                    href="/product"
                    className="btn-gold mt-7 inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-[13px] font-medium"
                  >
                    <ArrowRight size={15} />
                    مشاهده محصولات
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-[#d9b99a]/40">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="grid grid-cols-[96px_1fr] items-center gap-x-4 gap-y-4 px-5 py-5 sm:px-7 lg:grid-cols-[1fr_140px_150px_230px]"
                    >
                      {/* محصول */}
                      <div className="col-span-2 flex items-center gap-4 lg:col-span-1">
                        <div
                          className="relative h-[100px] w-[112px] shrink-0 overflow-hidden rounded-[20px] ring-1 ring-white/70 shadow-[0_8px_20px_rgba(110,72,46,0.18)]"
                          style={{ background: silk }}
                        >
                          {item.image && (
                            <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
                          )}
                          <button
                            type="button"
                            aria-label="علاقه‌مندی"
                            aria-pressed={item.wished}
                            onClick={() => toggleWish(item.id)}
                            className={`absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/75 backdrop-blur transition hover:bg-white ${
                              item.wished ? 'text-[#b3433a]' : 'text-[#5a3a28]'
                            }`}
                          >
                            <Heart size={14} fill={item.wished ? 'currentColor' : 'none'} strokeWidth={1.6} />
                          </button>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[16px] font-bold text-[#24140d]">{item.name}</h3>
                          <p className="mt-1.5 text-[12.5px] text-[#8a6e5c]">{item.variant}</p>
                        </div>
                      </div>

                      {/* قیمت واحد */}
                      <div className="col-span-2 flex items-center justify-between text-[14px] text-[#3a2418] lg:col-span-1 lg:block lg:text-center">
                        <span className="text-[12px] text-[#8a6e5c] lg:hidden">قیمت واحد</span>
                        {money(item.price)}
                      </div>

                      {/* تعداد */}
                      <div className="flex justify-start lg:justify-center">
                        <div className="inline-flex items-center gap-3 rounded-full bg-[#f3e2d0] px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-white/70">
                          <button
                            type="button"
                            aria-label="کاهش تعداد"
                            onClick={() => changeQty(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="grid h-8 w-8 place-items-center rounded-full text-[#3a2418] transition hover:bg-white/70 disabled:opacity-35"
                          >
                            <Minus size={15} />
                          </button>
                          <span className="min-w-5 text-center text-[15px] font-medium">{faNum(item.quantity)}</span>
                          <button
                            type="button"
                            aria-label="افزایش تعداد"
                            onClick={() => changeQty(item.id, 1)}
                            className="grid h-8 w-8 place-items-center rounded-full text-[#3a2418] transition hover:bg-white/70"
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>

                      {/* مبلغ ردیف + حذف */}
                      <div className="flex items-center justify-between gap-4 lg:justify-start">
                        <span className="text-[15px] font-bold text-[#24140d]">{money(item.price * item.quantity)}</span>
                        <button
                          type="button"
                          aria-label={`حذف ${item.name}`}
                          onClick={() => remove(item.id)}
                          className="grid h-9 w-9 place-items-center rounded-full text-[#5a3a28] transition hover:bg-white/70 hover:text-[#b3433a] lg:mr-auto"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* نوار ارسال رایگان */}
            <div className="glass-panel flex items-center gap-5 rounded-[24px] px-6 py-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f6e0c8] to-[#dcb896] text-[#5a3a28] shadow-[0_6px_16px_rgba(110,72,46,0.2)]">
                <Gift size={26} strokeWidth={1.4} />
              </span>
              <div className="flex-1">
                <p className="text-center text-[14px] text-[#3a2418]">
                  {subtotal === 0 ? (
                    'محصولی به سبد اضافه کنید.'
                  ) : remaining > 0 ? (
                    <>
                      فقط <strong className="font-bold text-[#24140d]">{money(remaining)}</strong> تا ارسال رایگان باقی مانده است!
                    </>
                  ) : (
                    'تبریک! ارسال سفارش شما رایگان است.'
                  )}
                </p>
                <div
                  className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#e6d0b9] ring-1 ring-white/60"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-[#24140d] to-[#7a5238] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ---------- چپ: خلاصه سفارش ---------- */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="glass-panel rounded-[26px] p-6">
              <h2 className="text-[20px] font-bold text-[#24140d]">خلاصه سفارش</h2>
              <div className="mt-4 h-px bg-[#d9b99a]/50" />

              <dl className="mt-5 space-y-4 text-[14px]">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#5a3a28]">جمع کل محصولات ({faNum(itemCount)} کالا)</dt>
                  <dd className="text-[#3a2418]">{money(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#5a3a28]">تخفیف</dt>
                  <dd className="font-medium text-[#2f7a46]" dir="ltr">−{money(discount)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-[#5a3a28]">
                    <Truck size={16} strokeWidth={1.5} />
                    هزینه ارسال
                  </dt>
                  <dd className={shipping === 0 ? 'font-bold text-[#2f7a46]' : 'text-[#3a2418]'}>
                    {shipping === 0 ? 'رایگان' : money(shipping)}
                  </dd>
                </div>
              </dl>

              <div className="my-5 h-px bg-gradient-to-l from-[#c8a07c] to-transparent" />

              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] text-[#5a3a28]">مبلغ قابل پرداخت</span>
                <span className="text-[#24140d]">
                  <span className="text-[28px] font-bold tracking-tight">{faNum(total)}</span>
                  <span className="mr-1.5 text-[14px]">تومان</span>
                </span>
              </div>

              <Link
                href="/checkout"
                aria-disabled={items.length === 0}
                className={`mt-6 flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-l from-[#4a2e20] to-[#24140d] text-[16px] font-medium text-[#f6e6d3] shadow-[0_12px_26px_rgba(36,20,13,0.35)] transition hover:brightness-125 ${
                  items.length === 0 ? 'pointer-events-none opacity-40' : ''
                }`}
              >
                ثبت سفارش و ادامه خرید
                <ChevronLeft size={18} />
              </Link>

              <Link
                href="/product"
                className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[#3a2418] transition hover:text-[#b3865f]"
              >
                <ArrowRight size={15} />
                ادامه خرید
              </Link>
            </div>

            <div className="glass-panel flex items-center gap-4 rounded-[22px] px-5 py-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f6e0c8] to-[#e6c9aa] text-[#3a2418]">
                <ShieldCheck size={24} strokeWidth={1.4} />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-[#24140d]">خرید مطمئن از پرتو</p>
                <p className="mt-1 text-[11px] text-[#8a6e5c]">پرداخت امن | ارسال سریع | ضمانت اصالت کالا</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------- شاید دوست داشته باشید ------------------------- */}
      {suggestions.length > 0 && (
        <section className="mx-auto mt-10 max-w-[1360px] px-5 pb-20 sm:px-10">
          <div className="mb-7 flex items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-l from-[#c8a07c]/70 to-transparent" />
            <h2 className="text-[22px] font-bold text-[#24140d]">شاید دوست داشته باشید</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-[#c8a07c]/70 to-transparent" />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="قبلی"
              onClick={() => scrollSlider(1)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#c8a07c]/50 bg-gradient-to-br from-[#f6e0c8] to-[#dcb896] text-[#5a3a28] shadow-[0_4px_12px_rgba(110,72,46,0.2)] transition hover:brightness-105"
            >
              <ChevronRight size={18} />
            </button>

            <div ref={sliderRef} className="no-scrollbar flex flex-1 gap-5 overflow-x-auto py-3">
              {suggestions.map((p) => (
                <article key={p.id} className="glass-panel group relative w-[250px] shrink-0 overflow-hidden rounded-[24px]">
                  <Link href={`/product/${p.slug}`} className="block">
                    <div className="relative aspect-[1/0.62] w-full overflow-hidden" style={{ background: silk }}>
                      {firstImage(p) && (
                        <Image
                          src={firstImage(p)}
                          alt={p.name}
                          fill
                          sizes="250px"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <h3 className="px-4 pt-3 text-center text-[14px] font-semibold text-[#24140d]">{p.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between px-4 pb-4 pt-2.5">
                    <button
                      type="button"
                      aria-label={`افزودن ${p.name} به سبد`}
                      onClick={() => add(p)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#f6e0c8] to-[#dcb896] text-[#3a2418] shadow-[0_4px_10px_rgba(110,72,46,0.25)] transition hover:brightness-105"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="text-[13px] font-medium text-[#3a2418]">{money(p.rawPrice * 1000)}</span>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="بعدی"
              onClick={() => scrollSlider(-1)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#c8a07c]/50 bg-gradient-to-br from-[#f6e0c8] to-[#dcb896] text-[#5a3a28] shadow-[0_4px_12px_rgba(110,72,46,0.2)] transition hover:brightness-105"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </section>
      )}

      {/* موج بالای فوتر */}
      <div aria-hidden className="hero-wave -mb-px h-[70px] w-full bg-[#1c110c]" />
      <Footer />
    </main>
  );
}
