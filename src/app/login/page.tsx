'use client';

import { FormEvent, useState } from 'react';
import { AuthLayout, AuthHeading, EyeToggle, CheckBox, SocialDivider } from '@/components/parto/Auth';
import { PField, DarkBtn, Ico, Link } from '@/components/parto/Parto';
import { AppleIcon, GoogleIcon } from '@/components/parto/icons';

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: اتصال به API احراز هویت
  };

  return (
    <AuthLayout mode="login">
      <AuthHeading title="خوش برگشتید!" subtitle="برای ادامه، وارد حساب کاربری خود شوید" />

      <form onSubmit={submit} className="mt-7 space-y-4">
        <PField icon="mail" label="شماره موبایل یا ایمیل" name="username" required autoComplete="username" />
        <div className="relative">
          <PField icon="lock" label="رمز عبور" name="password" required type={show ? 'text' : 'password'} autoComplete="current-password" className="[&_input]:pl-[52px]" />
          <EyeToggle shown={show} onToggle={() => setShow((s) => !s)} />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <CheckBox checked={remember} onChange={setRemember}>مرا به خاطر بسپار</CheckBox>
          <Link href="/forgot-password" className="text-[13px] font-bold text-[#2a170e] hover:underline">فراموشی رمز عبور؟</Link>
        </div>

        <DarkBtn type="submit" className="!mt-5 h-[56px] w-full text-[16px]">
          ورود به حساب کاربری <Ico name="arrowL" className="h-[22px] w-[22px]" sw={1.8} />
        </DarkBtn>
      </form>

      <SocialDivider />

      <div className="mt-5 grid grid-cols-2 gap-4">
        <button type="button" className="parto-btn-soft flex h-[48px] items-center justify-center gap-3 rounded-full text-[14px] font-medium">
          <AppleIcon className="h-[22px] w-[22px] text-black" /> ورود با اپل
        </button>
        <button type="button" className="parto-btn-soft flex h-[48px] items-center justify-center gap-3 rounded-full text-[14px] font-medium">
          <GoogleIcon className="h-[22px] w-[22px]" /> ورود با گوگل
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 border-t border-[#a67a5c]/25 pt-5 text-[14px] font-medium text-[#2a170e]">
        حساب کاربری ندارید؟
        <Link href="/signup" className="parto-btn-soft inline-flex h-[34px] items-center gap-2 rounded-full px-5 text-[13px]">
          ثبت نام کنید <Ico name="arrowL" className="h-4 w-4" sw={1.8} />
        </Link>
      </div>
    </AuthLayout>
  );
}
