'use client';

import React, { useState } from 'react';
import { EditProfileModal, UserProfileData } from './EditProfileModal';
import { AccountCard, EditButton } from './ui';

interface ProfileInfoProps {
  user: UserProfileData;
  onSave: (data: UserProfileData) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function Field({ label, value, ltr, big }: { label: string; value: string; ltr?: boolean; big?: boolean }) {
  return (
    <div className="px-8 py-5">
      <span className="block text-[13px] text-[#6b4f3e]">{label}</span>
      <span
        dir={ltr ? 'ltr' : undefined}
        className={`mt-2 block text-right text-[#2a1a12] ${big ? 'text-[22px] font-semibold' : 'text-[15px] font-medium'}`}
      >
        {value}
      </span>
    </div>
  );
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onSave, modalOpen, setModalOpen }) => {
  return (
    <>
      <EditProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} userData={user} onSave={onSave} />

      <AccountCard title="اطلاعات کاربری" action={<EditButton onClick={() => setModalOpen(true)}>ویرایش اطلاعات</EditButton>}>
        <div className="flex items-stretch" dir="rtl">
          {/* آواتار */}
          <div className="grid w-[230px] flex-none place-items-center py-6">
            <div className="relative h-[130px] w-[130px]">
              <div className="grid h-full w-full place-items-center overflow-hidden rounded-full border border-[#e6c9ae] bg-gradient-to-br from-[#fbefe2] to-[#f0d9c3] shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),0_8px_20px_rgba(120,78,48,0.15)]">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.firstName} className="h-full w-full object-cover" />
                ) : (
                  <svg viewBox="0 0 24 24" className="h-16 w-16 text-[#2a1a12]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" />
                  </svg>
                )}
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label="تغییر تصویر"
                className="absolute bottom-1 left-1 grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf1e6] bg-gradient-to-br from-[#f0c8a8] to-[#d9a47e] text-[#2a1a12] shadow-md transition hover:brightness-105"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* فیلدها */}
          <div className="grid flex-1 grid-cols-2 grid-rows-2">
            <div className="border-b border-l border-[#d9bfa6]/50"><Field label="نام و نام خانوادگی" value={`${user.firstName} ${user.lastName}`} big /></div>
            <div className="border-b border-[#d9bfa6]/50"><Field label="شماره موبایل" value={user.phone} ltr big /></div>
            <div className="border-l border-[#d9bfa6]/50"><Field label="آدرس پیش‌فرض" value={user.address ?? '—'} /></div>
            <div><Field label="ایمیل" value={user.email} ltr /></div>
          </div>
        </div>
      </AccountCard>
    </>
  );
};

export default ProfileInfo;
