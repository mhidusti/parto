import React from "react";
import { GoldButton, Photo, DiamondIcon, ArrowLeft } from "./primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="mx-auto mt-12 max-w-[1360px] px-5 sm:mt-14 sm:px-10">
      <Reveal variant="scale">
        <div className="relative flex min-h-[300px] items-center overflow-hidden rounded-[28px] shadow-[0_18px_44px_rgba(110,72,46,0.16)] md:h-[250px] md:min-h-0 md:rounded-[40px]">
          <Parallax speed={0.1} className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
            <Photo
              src="/images/about/about 1.jpg"
              gradient="linear-gradient(100deg,#d9b9a0,#ecd8c6 55%,#f4e7da)"
              className="absolute inset-0"
              style={{ backgroundPosition: "left center" }}
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4e7da] via-[#f4e7da]/90 to-[#f4e7da]/40 md:bg-gradient-to-l md:from-[#f4e7da] md:via-[#f4e7da]/85 md:to-transparent" />
          <DiamondIcon className="anim-float pointer-events-none absolute left-6 top-6 h-20 w-24 text-[#c8a07c]/30 md:left-16 md:top-1/2 md:h-40 md:w-48 md:-translate-y-1/2" />
          <div className="relative max-w-[470px] px-6 py-9 text-right md:py-0 md:pl-0 md:pr-14">
            <h2 className="text-[22px] font-bold text-[#2a1a12] sm:text-[24px]">داستان برند پارتو</h2>
            <p className="mt-3 text-[13px] leading-7 text-[#5a3a28] sm:text-[12.5px]">
              ما در پارتو با عشق به جزئیات خلق می‌کنیم. جواهراتی ماندگار برای نسل‌های آینده؛ ساخته‌شده از بهترین مواد و با دقتی که تنها هنرمندان باتجربه می‌توانند به آن برسند.
            </p>
            <GoldButton href="/about" className="mt-5 !bg-[#3a2418] !bg-none !text-[#f3dcc4] !shadow-none">
              بیشتر بدانید
            </GoldButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const collections = [
  { title: "کالکشن کلاسیک", sub: "جاودانه و خاص", img: "/images/products/lumiere-ring/yellow-gold-1.jpg", href: "/collection/classic" },
  { title: "کالکشن عشق", sub: "هم‌پای ساده برای همیشه", img: "/images/products/solstice-necklace/rose-gold-1.jpg", href: "/collection" },
  { title: "کالکشن مروارید", sub: "زیبایی در سادگی", img: "/images/products/celesta-bracelet/white-gold-1.jpg", href: "/collection" },
];

export function SpecialCollections() {
  return (
    <section className="mx-auto mt-12 max-w-[1360px] px-5 sm:mt-14 sm:px-10">
      <Reveal>
        <div className="mb-6 text-right">
          <h2 className="text-[22px] font-bold text-[#2a1a12] sm:text-[26px]">کالکشن‌های ویژه</h2>
          <p className="mt-1 text-[12px] text-[#7a5a46]">مجموعه‌های منتخب؛ فرد و خاص</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {collections.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 120}
            className="md:[&:nth-child(3)]:col-span-2 lg:[&:nth-child(3)]:col-span-1"
          >
            <Link
              href={c.href}
              className="group lift relative block h-[220px] overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(60,36,24,0.28)] hover:shadow-[0_26px_54px_rgba(60,36,24,0.38)] sm:h-[250px] sm:rounded-[34px] lg:h-[270px]"
            >
              <Photo
                src={c.img}
                gradient="radial-gradient(70% 90% at 30% 30%, #8a6046, #2a1a12 80%)"
                className="absolute inset-0 transition duration-[1200ms] ease-out group-hover:scale-110"
                style={{ backgroundPosition: "left center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/90 via-[#1c110c]/55 to-[#1c110c]/10 transition duration-700 group-hover:from-[#1c110c]/95" />
              <span aria-hidden className="absolute inset-3 rounded-[22px] border border-[#e8c9aa]/0 transition duration-700 group-hover:border-[#e8c9aa]/40 sm:rounded-[26px]" />
              <div className="absolute inset-y-0 right-0 flex w-[66%] flex-col justify-center p-6 text-right sm:w-[58%] sm:p-7">
                <h3 className="text-[19px] font-bold text-[#f3dcc4] sm:text-[20px]">{c.title}</h3>
                <p className="mt-1 text-[12px] text-[#e6d2bf]/85">{c.sub}</p>
                <span className="btn-gold mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-[12px] font-medium">
                  مشاهده مجموعه
                  <ArrowLeft className="h-3.5 w-3.5 transition duration-500 group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
