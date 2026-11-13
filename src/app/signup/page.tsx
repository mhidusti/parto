'use client';

import { FormEvent, useState } from 'react';
import { AuthLayout, AuthHeading, EyeToggle, CheckBox, SocialDivider } from '@/components/parto/Auth';
import { PField, DarkBtn, Ico, Link } from '@/components/parto/Parto';
import { AppleIcon, GoogleIcon } from '@/components/parto/icons';

function PasswordField({ label, name }: { label: string; name: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <PField icon="lock" label={label} name={name} required minLength={6} type={show ? 'text' : 'password'} autoComplete="new-password" className="[&_input]:pl-[52px]" />
      <EyeToggle shown={show} onToggle={() => setShow((s) => !s)} />
    </div>
  );
}

export default function SignupPage() {
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get('password') !== f.get('confirm')) return setError('رمز عبور و تکرار آن یکسان نیست');
    if (!terms) return setError('لطفاً قوانین و مقررات را بپذیرید');
    setError('');
    // TODO: اتصال به API ثبت‌نام
  };

  return (
    <AuthLayout mode="signup" tagline="زیبایی را با ما آغاز کنید...">
      <AuthHeading title="حساب جدید بسازید" subtitle="برای شروع، اطلاعات خود را وارد کنید" />

      <form onSubmit={submit} className="mt-6 space-y-3.5">
        <PField icon="user" label="نام و نام خانوادگی" name="name" required autoComplete="name" />
        <PField icon="phone" label="شماره موبایل" name="phone" required type="tel" inputMode="tel" autoComplete="tel" />
        <PField icon="mail" label="ایمیل (اختیاری)" name="email" type="email" autoComplete="email" />
        <PasswordField label="رمز عبور" name="password" />
        <PasswordField label="تکرار رمز عبور" name="confirm" />

        <div className="pt-1">
          <CheckBox checked={terms} onChange={setTerms}>
            <Link href="/customer-services" className="font-bold underline underline-offset-4">قوانین و مقررات</Link> پرتو را می‌پذیرم
          </CheckBox>
        </div>

        {error && <p role="alert" className="text-center text-[13px] font-medium text-[#b4472f]">{error}</p>}

        <DarkBtn type="submit" className="!mt-4 h-[56px] w-full text-[16px]">
          ساخت حساب کاربری <Ico name="arrowL" className="h-[22px] w-[22px]" sw={1.8} />
        </DarkBtn>
      </form>

      <SocialDivider />

      <div className="mt-5 grid grid-cols-2 gap-4">
        <button type="button" className="parto-btn-soft flex h-[48px] items-center justify-center gap-3 rounded-full text-[14px] font-medium">
          <AppleIcon className="h-[22px] w-[22px] text-black" /> ثبت‌نام با اپل
        </button>
        <button type="button" className="parto-btn-soft flex h-[48px] items-center justify-center gap-3 rounded-full text-[14px] font-medium">
          <GoogleIcon className="h-[22px] w-[22px]" /> ثبت‌نام با گوگل
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 border-t border-[#a67a5c]/25 pt-4 text-[14px] font-medium text-[#2a170e]">
        حساب کاربری دارید؟
        <Link href="/login" className="parto-btn-soft inline-flex h-[34px] items-center gap-2 rounded-full px-5 text-[13px]">
          وارد شوید <Ico name="arrowL" className="h-4 w-4" sw={1.8} />
        </Link>
      </div>
    </AuthLayout>
  );
}
