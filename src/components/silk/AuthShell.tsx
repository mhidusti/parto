'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/home/primitives';
import { Icon, Img, Ornament } from '@/components/silk/Silk';

/* قالب صفحات ورود/ثبت‌نام: پس‌زمینه ابریشمی، حلقه بالای کارت شیشه‌ای */
export function AuthShell({
  image,
  imagePos = 'center',
  children,
}: {
  image: string;
  imagePos?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="silk-bg relative min-h-screen w-full overflow-x-hidden font-sans text-[#2a1a12]">
      {/* نوار بالا: لوگو راست، سبد و علاقه‌مندی چپ */}
      <div className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1100px] items-start justify-between px-6 pt-6">
        <Logo />
        <div className="flex items-center gap-4 text-[#f3dcc4]">
          <Link href="/cart" aria-label="سبد خرید"><Icon name="bag" className="h-8 w-8" sw={1.3} /></Link>
          <span className="h-9 w-px bg-[#f3dcc4]/50" />
          <Link href="/account" aria-label="علاقه‌مندی‌ها"><Icon name="heart" className="h-8 w-8" sw={1.3} /></Link>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1100px] flex-col items-center px-5 pb-16">
        <Img
          src={image}
          pos={imagePos}
          className="pointer-events-none h-[300px] w-full max-w-[720px] sm:h-[380px]"
          style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: imagePos, marginTop: 90 }}
        />
        <section className="glass-silk relative -mt-10 w-full max-w-[800px] rounded-[44px] px-6 pb-10 pt-8 sm:px-[60px]">
          {children}
        </section>
      </div>
    </main>
  );
}

export function AuthHeading({ title, subtitle, ornament = false }: { title: string; subtitle: string; ornament?: boolean }) {
  return (
    <div className="text-center">
      {ornament ? <Ornament className="mx-auto mb-3 max-w-[420px]" /> : null}
      <h1 className="text-[30px] font-bold text-[#3a2418]">{title}</h1>
      <p className="mt-3 text-[17px] text-[#4a2f20]">{subtitle}</p>
    </div>
  );
}

export function SocialRow() {
  const cls = 'field-silk grid h-[60px] w-[60px] place-items-center rounded-full text-[#3a2418] transition hover:brightness-110';
  return (
    <div className="mt-7">
      <div className="flex items-center gap-4 text-[16px] text-[#3a2418]">
        <span className="h-px flex-1 bg-gradient-to-l from-[#3a2418]/50 to-transparent" />
        یا ورود با
        <span className="h-px flex-1 bg-gradient-to-r from-[#3a2418]/50 to-transparent" />
      </div>
      <div className="mt-5 flex items-center justify-center gap-5" dir="ltr">
        <button type="button" aria-label="Google" className={cls}>
          <span className="text-[28px] font-bold">G</span>
        </button>
        <button type="button" aria-label="Apple" className={cls}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>
        </button>
        <button type="button" aria-label="Telegram" className={cls}>
          <Icon name="send" className="h-7 w-7" sw={1.5} />
        </button>
      </div>
    </div>
  );
}
