'use client';

import React from 'react';
import Link from 'next/link';

/* کارت شیشه‌ای کرمی با نوار عنوان — مطابق طراحی صفحه حساب کاربری */
export function AccountCard({
  title,
  action,
  children,
  className = '',
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section dir="rtl" className={`glass-cream overflow-hidden rounded-[20px] ${className}`}>
      <header className="flex items-center justify-between bg-[#ecd5c0]/55 px-7 py-4">
        <h2 className="text-[17px] font-bold text-[#2a1a12]">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

const arrowLeft = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export function ArrowLink({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  const cls = 'inline-flex items-center gap-2 text-[12px] text-[#4a2f20] transition hover:text-[#b3865f]';
  return href ? (
    <Link href={href} className={cls}>{arrowLeft}{children}</Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>{arrowLeft}{children}</button>
  );
}

export function EditButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-[#c8a07c]/60 bg-white/30 px-5 py-2 text-[12px] text-[#5a3a28] transition hover:bg-[#f3dcc4]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
      </svg>
      {children}
    </button>
  );
}
