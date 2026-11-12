'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccountSidebar, AccountTab } from '@/components/account/AccountSidebar';
import { ProfileInfo } from '@/components/account/ProfileInfo';
import { RecentOrders } from '@/components/account/RecentOrders';
import { WishlistCarousel } from '@/components/account/WishlistCarousel';
import { OrdersList } from '@/components/account/OrdersList';
import { AddressesList } from '@/components/account/AddressesList';
import { WishlistList } from '@/components/account/WishlistList';
import { PaymentMethodsList } from '@/components/account/PaymentMethodsList';
import { ExclusiveAccessBanner } from '@/components/account/ExclusiveAccessBanner';
import type { UserProfileData } from '@/components/account/EditProfileModal';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const waveCream =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'><path d='M0 60V38C260 6 520 18 760 34C1040 52 1260 26 1440 0V60Z' fill='black'/></svg>\")";
const waveDark =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'><path d='M0 60V30C220 8 470 2 720 22C1000 44 1230 30 1440 6V60Z' fill='black'/></svg>\")";

const maskStyle = (img: string): React.CSSProperties => ({
  WebkitMaskImage: img,
  maskImage: img,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
});

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfileData>({
    firstName: 'سیده',
    lastName: 'نژاد',
    email: 's.najafii@gmail.com',
    phone: '۰۹۱۲ ۳۴۵ ۶۷۸۹',
    address: 'تهران، خیابان آزادی، پلاک ۱۲۳',
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen w-full bg-[#f6ebe0]" />;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f6e9de] font-sans text-[#2a1a12]">
      <Header />

      {/* هیرو */}
      <section className="relative h-[300px] w-full overflow-hidden bg-[#2a1a12] isolate">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("/images/product-hero/product-hero-model.jpg"), radial-gradient(60% 90% at 25% 45%, #d9b595 0%, #946648 40%, #3b2419 78%, #1c110c 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/80 via-[#2a1a12]/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1c110c]/80 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1360px] items-center justify-start px-10 pt-14">
          <div className="text-right">
            <h1 className="text-[36px] font-bold leading-[1.4] text-[#fbf1e6]">حساب کاربری</h1>
            <p className="mt-1 text-[14px] text-[#eadccd]">به دنیای درخشان پارتو خوش آمدید</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[56px] bg-[#f6e9de]" style={maskStyle(waveCream)} />
      </section>

      {/* محتوا */}
      <main className="relative mx-auto w-full max-w-[1360px] px-4 pb-14 pt-2 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* ستون اصلی (راست) */}
          <section className="space-y-6 lg:col-span-8 xl:col-span-9">
            {activeTab === 'profile' && (
              <>
                <ProfileInfo user={user} onSave={setUser} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                <RecentOrders />
                <WishlistCarousel onViewAll={() => setActiveTab('wishlist')} />
              </>
            )}
            {activeTab === 'orders' && <OrdersList />}
            {activeTab === 'wishlist' && <WishlistList />}
            {activeTab === 'addresses' && <AddressesList />}
            {activeTab === 'account' && (
              <>
                <ProfileInfo user={user} onSave={setUser} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                <PaymentMethodsList />
              </>
            )}
          </section>

          {/* سایدبار (چپ) */}
          <div className="space-y-6 lg:col-span-4 xl:col-span-3">
            <AccountSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
              avatarUrl={user.avatarUrl}
              onEditProfile={() => {
                setActiveTab('profile');
                setModalOpen(true);
              }}
              onLogout={() => (window.location.href = '/login')}
            />
            <ExclusiveAccessBanner />
          </div>
        </div>
      </main>

      {/* موج گذار به فوتر */}
      <div className="-mb-px h-[60px] w-full bg-[#1c110c]" style={maskStyle(waveDark)} />
      <Footer />
    </div>
  );
}
