'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'DELIVERED' | 'IN TRANSIT' | 'PROCESSING' | 'CANCELLED';
  price: string;
  itemCount: number;
  image: string;
  itemsSummary: string;
}

const allOrders: OrderItem[] = [
  {
    id: '1',
    orderNumber: '#AU-10024',
    date: '۲۳ فروردین ۱۴۰۵',
    status: 'DELIVERED',
    price: '۴,۸۵۰,۰۰۰ تومان',
    itemCount: 1,
    image: '/images/account/recentorder.jpg',
    itemsSummary: 'آویز معماری لومن',
  },
  {
    id: '2',
    orderNumber: '#AU-10023',
    date: '۸ فروردین ۱۴۰۵',
    status: 'DELIVERED',
    price: '۳,۲۰۰,۰۰۰ تومان',
    itemCount: 1,
    image: '/images/account/recentorder2.jpg',
    itemsSummary: 'چراغ دیواری شکست نور اپتیکال',
  },
  {
    id: '3',
    orderNumber: '#AU-10021',
    date: '۲۵ بهمن ۱۴۰۴',
    status: 'IN TRANSIT',
    price: '۵,۷۶۰,۰۰۰ تومان',
    itemCount: 2,
    image: '/images/account/recentorder3.jpg',
    itemsSummary: 'ستون زمینی یکپارچه (۲ عدد)',
  },
  {
    id: '4',
    orderNumber: '#AU-10018',
    date: '۱۵ دی ۱۴۰۴',
    status: 'DELIVERED',
    price: '۲,۱۰۰,۰۰۰ تومان',
    itemCount: 1,
    image: '/images/account/recentorder.jpg',
    itemsSummary: 'دیمر حلقه برنجی پرتو',
  },
];

export const OrdersList: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'DELIVERED' | 'IN TRANSIT'>('ALL');

  const filteredOrders = allOrders.filter((order) => {
    if (filter === 'ALL') return true;
    return order.status === filter;
  });

  const getStatusLabel = (status: OrderItem['status']) => {
    switch (status) {
      case 'DELIVERED':
        return 'تحویل‌شده';
      case 'IN TRANSIT':
        return 'در حال ارسال';
      case 'PROCESSING':
        return 'در حال پردازش';
      case 'CANCELLED':
        return 'لغو شده';
    }
  };

  const getFilterLabel = (status: 'ALL' | 'DELIVERED' | 'IN TRANSIT') => {
    switch (status) {
      case 'ALL':
        return 'همه';
      case 'DELIVERED':
        return 'تحویل‌شده';
      case 'IN TRANSIT':
        return 'در حال ارسال';
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d9bfa6]/60">
        <div>
          <h2 className="font-serif text-xl font-light tracking-wide text-[#2a1a12]">
            تاریخچه سفارش‌ها
          </h2>
          <p className="font-sans text-xs text-[#7a6252] mt-1">
            مشاهده و پیگیری خریدهای قبلی.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-white/50 p-1 rounded-lg border border-[#d9bfa6]/60">
          {(['ALL', 'DELIVERED', 'IN TRANSIT'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-md font-sans text-xs tracking-wider transition-all ${
                filter === status
                  ? 'bg-white/50 text-[#9a6b47]'
                  : 'text-[#7a6252] hover:text-[#2a1a12]'
              }`}
            >
              {getFilterLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS CARDS */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="group bg-white/50 border border-[#d9bfa6]/60 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#c8a07c]/50 transition-all duration-300 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#d9bfa6]/60 bg-white/40 flex-none">
                <img
                  src={order.image}
                  alt={order.orderNumber}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#2a1a12] group-hover:text-[#b3865f] transition-colors" dir="ltr">
                    {order.orderNumber}
                  </span>
                  <span
                    className={`text-[10px] font-sans px-2.5 py-0.5 rounded-full border ${
                      order.status === 'DELIVERED'
                        ? 'border-[#bcd3b0] text-[#3f6b3a] bg-[#dfead7]'
                        : 'border-[#e6cc95] text-[#8a5a14] bg-[#f6e6c6]'
                    }`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <p className="font-serif text-xs text-[#6b4f3e] mt-1">{order.itemsSummary}</p>
                <p className="font-sans text-[11px] text-[#8a7261] mt-0.5">{order.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#d9bfa6]/40">
              <div className="text-right">
                <div className="font-serif text-base text-[#2a1a12]">{order.price}</div>
                <div className="font-sans text-[11px] text-[#8a7261]">
                  {order.itemCount} {order.itemCount > 1 ? 'محصول' : 'محصول'}
                </div>
              </div>

              <span className="text-[#7a6252] group-hover:-translate-x-1 group-hover:text-[#b3865f] transition-all">
                ←
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;