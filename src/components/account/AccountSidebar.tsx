'use client';

import React from 'react';
import { Photo } from '@/components/home/primitives';

export type AccountTab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'account';

interface AccountSidebarProps {
  activeTab: AccountTab;
  setActiveTab: (tab: AccountTab) => void;
  name: string;
  email: string;
  avatarUrl?: string;
  onEditProfile: () => void;
  onLogout?: () => void;
}

const ic = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const icons: Record<string, React.ReactNode> = {
  profile: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...ic}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...ic}>
      <path d="M4 8h16l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3L4 8Z" />
      <path d="M8.5 8V7a3.5 3.5 0 0 1 7 0v1" />
    </svg>
  ),
  wishlist: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...ic}>
      <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
    </svg>
  ),
  addresses: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...ic}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  ),
  account: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...ic}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 14a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...ic}>
      <path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3" />
      <path d="M4 12h11M8 8l-4 4 4 4" />
    </svg>
  ),
};

const items: { id: AccountTab | 'logout'; label: string }[] = [
  { id: 'profile', label: 'داشبورد حساب کاربری' },
  { id: 'orders', label: 'سفارش‌های من' },
  { id: 'wishlist', label: 'علاقه‌مندی‌ها' },
  { id: 'addresses', label: 'آدرس‌های من' },
  { id: 'account', label: 'اطلاعات حساب' },
  { id: 'logout', label: 'خروج از حساب' },
];

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeTab,
  setActiveTab,
  name,
  email,
  avatarUrl,
  onEditProfile,
  onLogout,
}) => {
  return (
    <aside className="glass-cream rounded-[22px] p-5 text-center" dir="rtl">
      {/* آواتار */}
      <div className="mx-auto mt-2 h-[150px] w-[150px] rounded-full bg-gradient-to-br from-[#f3dcc4] to-[#c8a07c] p-[3px] shadow-[0_8px_24px_rgba(120,78,48,0.25)]">
        <div className="h-full w-full rounded-full border-[3px] border-[#fbf1e6] bg-[#fbf1e6] overflow-hidden">
          <Photo
            src={avatarUrl ?? '/images/account/avatar.jpg'}
            gradient="linear-gradient(160deg,#ead2bb,#c8a07c)"
            className="grid h-full w-full place-items-center text-[#7a523a]"
          >
            <svg viewBox="0 0 24 24" className="h-14 w-14 opacity-40" {...ic}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" />
            </svg>
          </Photo>
        </div>
      </div>

      <h2 className="mt-4 text-[20px] font-bold text-[#3a2418]">{name}</h2>
      <p className="mt-1 text-[12px] text-[#7a6252]" dir="ltr">{email}</p>

      <button
        type="button"
        onClick={onEditProfile}
        className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-[#c8a07c]/60 bg-white/30 px-6 py-2 text-[12px] text-[#5a3a28] transition hover:bg-[#f3dcc4]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" {...ic}>
          <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
          <path d="m13.5 6.5 4 4" />
        </svg>
        ویرایش پروفایل
      </button>

      <div className="mx-2 mt-5 h-px bg-gradient-to-l from-transparent via-[#c8a07c]/50 to-transparent" />

      <nav className="mt-3 flex flex-col gap-1.5 text-right">
        {items.map((item) => {
          const active = item.id === activeTab;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => (item.id === 'logout' ? onLogout?.() : setActiveTab(item.id))}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] transition ${
                active
                  ? 'bg-gradient-to-l from-[#f1cdb0] to-[#f6dfca] text-[#3a2418] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                  : 'text-[#4a2f20] hover:bg-white/40'
              }`}
            >
              <span className={active ? 'text-[#3a2418]' : 'text-[#5a3a28]'}>{icons[item.id]}</span>
              <span className="flex-1">{item.label}</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#8a6a54] transition group-hover:-translate-x-0.5" {...ic}>
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AccountSidebar;
