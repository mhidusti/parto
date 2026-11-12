'use client';

import React from 'react';
import Link from 'next/link';
import { Photo } from '@/components/home/primitives';
import { AccountCard, ArrowLink } from './ui';

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'DELIVERED' | 'IN TRANSIT' | 'PROCESSING';
  image: string;
}

const mockOrders: OrderItem[] = [
  { id: '1', orderNumber: '#۳۵۶۷۸', date: '۱۴۰۴/۰۶/۲۱', status: 'DELIVERED', image: '/images/products/lumiere-ring/rose-gold-1.jpg' },
];

const statusMap = {
  DELIVERED: { label: 'تحویل داده شد', cls: 'bg-[#dfead7] text-[#3f6b3a] border-[#bcd3b0]', icon: true },
  'IN TRANSIT': { label: 'در حال ارسال', cls: 'bg-[#f6e6c6] text-[#8a5a14] border-[#e6cc95]', icon: false },
  PROCESSING: { label: 'در حال پردازش', cls: 'bg-[#f1e0d0] text-[#6b4f3e] border-[#d9bfa6]', icon: false },
} as const;

export const RecentOrders: React.FC = () => (
  <AccountCard title="آخرین سفارش‌ها" action={<ArrowLink href="/account/orders">مشاهده همه سفارش‌ها</ArrowLink>}>
    <div>
      {mockOrders.map((o, i) => {
        const st = statusMap[o.status];
        return (
          <div key={o.id} className={`flex items-center gap-6 px-8 py-6 ${i ? 'border-t border-[#d9bfa6]/50' : ''}`} dir="rtl">
            <Photo
              src={o.image}
              gradient="linear-gradient(135deg,#f3e1cf,#d9b595)"
              className="h-[88px] w-[154px] flex-none rounded-xl border border-white/70 shadow-[0_6px_16px_rgba(110,72,46,0.18)]"
            />
            <div className="flex-1">
              <div className="text-[16px] font-semibold text-[#2a1a12]">سفارش شماره <span dir="ltr" className="inline-block">{o.orderNumber}</span></div>
              <div className="mt-2 text-[13px] text-[#6b4f3e]">{o.date}</div>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13px] ${st.cls}`}>
              {st.icon && (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <circle cx="12" cy="12" r="10" fill="currentColor" opacity=".9" />
                  <path d="m7.5 12.3 3 3 6-6.3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {st.label}
            </span>
            <Link
              href={`/account/orders/${o.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#c8a07c]/60 bg-white/30 px-6 py-3 text-[13px] text-[#4a2f20] transition hover:bg-[#f3dcc4]"
            >
              جزئیات سفارش
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            </Link>
          </div>
        );
      })}
    </div>
  </AccountCard>
);

export default RecentOrders;
