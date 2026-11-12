import React from "react";
import { GoldButton, Photo, DiamondIcon } from "./primitives";

export function BrandStory() {
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-10">
      <div className="relative flex h-[250px] items-center overflow-hidden rounded-[40px]">
        <Photo
          src="/images/about/about 1.jpg"
          gradient="linear-gradient(100deg,#d9b9a0,#ecd8c6 55%,#f4e7da)"
          className="absolute inset-0"
          style={{ backgroundPosition: "left center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#f4e7da] via-[#f4e7da]/85 to-transparent" />
        <DiamondIcon className="pointer-events-none absolute left-16 top-1/2 h-40 w-48 -translate-y-1/2 text-[#c8a07c]/30" />
        <div className="relative max-w-[470px] pr-14 text-right">
          <h2 className="text-[24px] font-bold text-[#2a1a12]">داستان برند پارتو</h2>
          <p className="mt-3 text-[12.5px] leading-7 text-[#5a3a28]">
            ما در پارتو با عشق به جزئیات خلق می‌کنیم. جواهراتی ماندگار برای نسل‌های آینده؛ ساخته‌شده از بهترین مواد و با دقتی که تنها هنرمندان باتجربه می‌توانند به آن برسند.
          </p>
          <GoldButton href="/about" className="mt-5 !bg-[#3a2418] !bg-none !text-[#f3dcc4] !shadow-none">
            بیشتر بدانید
          </GoldButton>
        </div>
      </div>
    </section>
  );
}

const collections = [
  { title: "کالکشن کلاسیک", sub: "جاودانه و خاص", img: "/images/products/lumiere-ring/yellow-gold-1.jpg" },
  { title: "کالکشن عشق", sub: "هم‌پای ساده برای همیشه", img: "/images/products/solstice-necklace/rose-gold-1.jpg" },
  { title: "کالکشن مروارید", sub: "زیبایی در سادگی", img: "/images/products/celesta-bracelet/white-gold-1.jpg" },
];

export function SpecialCollections() {
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-10">
      <div className="mb-6 text-right">
        <h2 className="text-[26px] font-bold text-[#2a1a12]">کالکشن‌های ویژه</h2>
        <p className="mt-1 text-[12px] text-[#7a5a46]">مجموعه‌های منتخب؛ فرد و خاص</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {collections.map((c) => (
          <article key={c.title} className="relative h-[270px] overflow-hidden rounded-[34px] shadow-[0_18px_40px_rgba(60,36,24,0.3)]">
            <Photo
              src={c.img}
              gradient="radial-gradient(70% 90% at 30% 30%, #8a6046, #2a1a12 80%)"
              className="absolute inset-0"
              style={{ backgroundPosition: "left center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/90 via-[#1c110c]/55 to-[#1c110c]/10" />
            <div className="absolute inset-y-0 right-0 flex w-[58%] flex-col justify-center p-7 text-right">
              <h3 className="text-[20px] font-bold text-[#f3dcc4]">{c.title}</h3>
              <p className="mt-1 text-[12px] text-[#e6d2bf]/85">{c.sub}</p>
              <div className="mt-5">
                <GoldButton href="/collection" className="!px-5 !py-2 !text-[12px]">مشاهده مجموعه</GoldButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
