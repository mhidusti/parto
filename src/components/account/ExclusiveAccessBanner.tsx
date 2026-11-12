'use client';

import React from 'react';
import { DiamondIcon } from '@/components/home/primitives';

export const ExclusiveAccessBanner: React.FC = () => {
  return (
    <aside
      dir="rtl"
      className="relative overflow-hidden rounded-[22px] border border-white/60 px-6 py-7 text-center shadow-[0_14px_40px_rgba(110,72,46,0.14)]"
      style={{
        background:
          'radial-gradient(90% 120% at 20% 0%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(160deg,#f1d3bb,#e3b89a 55%,#ecc9ae)',
      }}
    >
      <DiamondIcon className="mx-auto h-6 w-7 text-[#b3865f]" />
      <h3 className="mt-3 text-[16px] font-bold text-[#3a2418]">همیشه در کنار شما</h3>
      <p className="mt-2 text-[12px] text-[#5a3a28]">پارتو، انتخابی برای تمام لحظه‌ها</p>
    </aside>
  );
};

export default ExclusiveAccessBanner;
