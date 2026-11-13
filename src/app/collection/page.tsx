'use client';

import Link from 'next/link';
import { useLenis } from '@/hooks/useLenis';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Photo, ArrowLeft } from '@/components/home/primitives';
import { TrustIcon } from '@/components/silk/Silk';

const wave = (h: number, d: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 ${h}' preserveAspectRatio='none'><path d='${d}' fill='black'/></svg>")`;
const maskStyle = (img: string): React.CSSProperties => ({ WebkitMaskImage: img, maskImage: img, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' });

const collections = [
  { slug: 'minimal', title: 'کالکشن مینیمال', sub: 'سادگی، زیباترین انتخاب', image: '/images/collection/minimal.jpg' },
  { slug: 'love', title: 'کالکشن عشق', sub: 'احساسی به قدمت یک عمر', image: '/images/collection/love.jpg' },
  { slug: 'classic', title: 'کالکشن کلاسیک', sub: 'زیبایی فراتر از زمان', image: '/images/collection/classic.jpg' },
  { slug: 'pearl', title: 'کالکشن مروارید', sub: 'ظرافتی اصیل و ماندگار', image: '/images/collection/pearl.jpg' },
];

const why = [
  { icon: 'diamond', title: 'طراحی منحصربه‌فرد', sub: 'با الهام از زیبایی جاودانه' },
  { icon: 'truck', title: 'ارسال سریع و مطمئن', sub: 'به سراسر کشور' },
  { icon: 'shield', title: 'ضمانت اصالت کالا', sub: 'با خیال آسوده خرید کنید' },
  { icon: 'headset', title: 'پشتیبانی اختصاصی', sub: 'در تمام مراحل خرید' },
];

export default function CollectionPage() {
  useLenis();

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f6e9de] font-sans text-[#2a1a12]">
      <Header />

      {/* هیرو */}
      <section className="relative h-[440px] w-full overflow-hidden bg-[#2a1a12] isolate">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/collection/hero-necklace.jpg"), radial-gradient(60% 90% at 30% 45%, #d9b595 0%, #946648 40%, #3b2419 78%, #1c110c 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/80 via-[#2a1a12]/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1c110c]/80 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-10 pt-14">
          <div className="w-[460px] max-w-full text-right">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-[#e8c9aa]" dir="ltr">
              <span className="h-px w-16 bg-[#e8c9aa]/70" />OUR COLLECTIONS
            </div>
            <h1 className="mt-5 text-[40px] font-bold text-[#fbf1e6]">کالکشن‌های پرتو</h1>
            <p className="mt-2 text-[18px] text-[#eadccd]">مجموعه‌ای از زیبایی‌های ماندگار</p>
            <Link href="/collection/classic" className="btn-gold mt-7 inline-flex h-12 items-center gap-3 rounded-full px-8 text-[14px] font-medium">
              <ArrowLeft /> مشاهده همه کالکشن‌ها
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[56px] bg-[#f6e9de]" style={maskStyle(wave(60, 'M0 60V38C260 6 520 18 760 34C1040 52 1260 26 1440 0V60Z'))} />
      </section>

      <div className="mx-auto w-full max-w-[1360px] space-y-10 px-6 pb-14 pt-4 lg:px-10">
        {/* کارت کالکشن‌ها */}
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {collections.map((c) => (
            <Link key={c.slug} href={c.slug === 'classic' ? '/collection/classic' : '/collection'} className="group relative block h-[290px] overflow-hidden rounded-[26px] border border-white/60 shadow-[0_14px_36px_rgba(110,72,46,0.2)]">
              <Photo src={c.image} gradient="linear-gradient(160deg,#ecd2ba,#c9a07c)" className="absolute inset-0 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center rounded-t-[26px] bg-gradient-to-b from-[#f6e6d6]/70 to-[#efd6bf]/90 px-4 pb-4 pt-4 text-center backdrop-blur-md">
                <h3 className="text-[16px] font-bold text-[#2a1a12]">{c.title}</h3>
                <p className="mt-1 text-[12px] text-[#6b4f3e]">{c.sub}</p>
                <span className="mt-3 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#c8a07c] to-[#a97c58] text-white shadow-md transition group-hover:-translate-x-1">
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* بنر تیره */}
        <section className="relative flex h-[210px] items-center overflow-hidden rounded-[30px] bg-[#1c110c] shadow-[0_18px_44px_rgba(36,20,13,0.35)]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/images/collection/banner-bracelet.jpg"), radial-gradient(50% 120% at 70% 50%, #7a523a 0%, #3b2419 55%, #1c110c 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/70 via-transparent to-[#1c110c]/70" />
          <div className="relative mr-auto w-full max-w-[420px] px-10 text-right lg:mr-0 lg:ml-auto lg:pl-0">
            <h2 className="text-[26px] font-bold text-[#fbf1e6]">هر کالکشن، یک داستان از زیبایی</h2>
            <p className="mt-2 text-[14px] text-[#eadccd]">با پرتو، زیبایی را متفاوت تجربه کنید..</p>
            <Link href="/about" className="btn-gold mt-5 inline-flex h-11 items-center gap-3 rounded-full px-7 text-[14px] font-medium">
              <ArrowLeft /> کشف دنیای پرتو
            </Link>
          </div>
        </section>

        {/* چرا پرتو؟ */}
        <section>
          <div className="flex items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-l from-[#c8a07c] to-transparent" />
            <h2 className="text-[28px] font-bold text-[#2a1a12]">چرا پرتو؟</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-[#c8a07c] to-transparent" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="flex flex-col items-center border-[#c8a07c]/40 px-4 text-center lg:border-l lg:last:border-l-0">
                <TrustIcon name={w.icon} className="h-12 w-12 text-[#3a2418]" />
                <div className="mt-3 text-[17px] font-bold">{w.title}</div>
                <div className="mt-1 text-[13px] text-[#6b4f3e]">{w.sub}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="-mb-px h-[60px] w-full bg-[#1c110c]" style={maskStyle(wave(60, 'M0 60V30C220 8 470 2 720 22C1000 44 1230 30 1440 6V60Z'))} />
      <Footer />
    </main>
  );
}
