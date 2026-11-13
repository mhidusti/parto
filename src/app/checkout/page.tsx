'use client';

import { useMemo, useState, type FormEvent, type ChangeEvent } from 'react';
import {
  PartoPage, PartoHero, Container, Bg, Ico, Link, DarkBtn, PField, IMG,
} from '@/components/parto/Parto';

type Pay = 'online' | 'gateway' | 'cod';

const SHIPPING = 50_000;
const DISCOUNT = 1_000_000;
const UNIT_PRICE = 28_500_000;

const faN = (n: number) => Math.round(n).toLocaleString('fa-IR').replace(/٬/g, ',');

const payMethods: { id: Pay; title: string; sub?: string; icon: string }[] = [
  { id: 'online', title: 'پرداخت آنلاین (کارت به کارت)', sub: 'پرداخت امن و سریع با کلیه کارت‌های بانکی', icon: '' },
  { id: 'gateway', title: 'پرداخت از درگاه پرداخت', icon: 'secureCard' },
  { id: 'cod', title: 'پرداخت در محل', icon: 'cash' },
];

const steps = ['اطلاعات ارسال', 'شیوه پرداخت', 'تأیید و پرداخت'];

const cities: Record<string, string[]> = {
  تهران: ['تهران', 'شمیرانات', 'ری', 'اسلامشهر', 'کرج'],
  اصفهان: ['اصفهان', 'کاشان', 'نجف‌آباد'],
  فارس: ['شیراز', 'مرودشت', 'کازرون'],
  'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار'],
  'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند'],
  گیلان: ['رشت', 'انزلی', 'لاهیجان'],
  مازندران: ['ساری', 'بابل', 'آمل'],
  خوزستان: ['اهواز', 'آبادان', 'دزفول'],
};

type Info = { name: string; phone: string; email: string; province: string; city: string; postal: string; address: string };
type Errors = Partial<Record<keyof Info, string>>;

/* تبدیل ارقام فارسی/عربی به انگلیسی برای اعتبارسنجی */
const toEn = (v: string) => v.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));

function validate(i: Info): Errors {
  const e: Errors = {};
  if (i.name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = 'نام و نام خانوادگی را کامل وارد کنید';
  if (!/^09\d{9}$/.test(toEn(i.phone).replace(/\s|-/g, ''))) e.phone = 'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷)';
  if (i.email.trim() && !/^\S+@\S+\.\S+$/.test(i.email.trim())) e.email = 'ایمیل معتبر نیست';
  if (!i.province) e.province = 'استان را انتخاب کنید';
  if (!i.city) e.city = 'شهر را انتخاب کنید';
  if (!/^\d{10}$/.test(toEn(i.postal).replace(/\s|-/g, ''))) e.postal = 'کد پستی باید ۱۰ رقم باشد';
  if (i.address.trim().length < 10) e.address = 'آدرس کامل (خیابان، پلاک، واحد) را وارد کنید';
  return e;
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? <p id={id} role="alert" className="mt-1.5 pr-4 text-[12px] font-medium text-[#b4472f]">{msg}</p> : null;
}

const bottomFeatures = [
  { icon: 'truck', title: 'ارسال سریع به سراسر کشور', sub: '' },
  { icon: 'gem', title: 'ضمانت اصالت کالا', sub: 'با فاکتور معتبر' },
  { icon: 'gift', title: 'بسته‌بندی لوکس', sub: 'و مناسب هدیه' },
  { icon: 'headset', title: 'پشتیبانی ۲۴ ساعته', sub: 'در تمام مراحل خرید' },
];

function Stepper({ current }: { current: number }) {
  return (
    <ol className="parto-card mx-auto flex items-center rounded-[28px] px-5 py-4 sm:px-9" aria-label="مراحل خرید">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none" aria-current={active ? 'step' : undefined}>
            <div className="flex items-center gap-3">
              <span
                className={`grid h-[38px] w-[38px] flex-none place-items-center rounded-full border text-[16px] font-bold ${
                  active ? 'parto-btn-dark border-transparent' : done ? 'border-[#a67a5c] bg-[#fbeadc] text-[#3a2418]' : 'border-[#a67a5c] bg-transparent text-[#3a2418]'
                }`}
              >
                {done ? <Ico name="check" className="h-[18px] w-[18px]" sw={2} /> : n.toLocaleString('fa-IR')}
              </span>
              <span className={`hidden text-[14px] sm:block ${active ? 'font-bold text-[#2a170e]' : 'text-[#5a3a28]'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <span aria-hidden className="mx-4 h-px flex-1 bg-gradient-to-l from-[#b08060]/70 to-[#b08060]/30" />}
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [qty, setQty] = useState(1);
  const [pay, setPay] = useState<Pay>('online');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const [info, setInfo] = useState<Info>({ name: '', phone: '', email: '', province: '', city: '', postal: '', address: '' });
  const [errors, setErrors] = useState<Errors>({});

  const subtotal = useMemo(() => UNIT_PRICE * qty, [qty]);
  const shipping = qty > 0 ? SHIPPING : 0;
  const discount = qty > 0 ? DISCOUNT : 0;
  const total = subtotal + shipping - discount;

  const set = (k: keyof Info) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setInfo((p) => (k === 'province' ? { ...p, province: v, city: '' } : { ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const goTo = (n: 1 | 2 | 3) => {
    setStep(n);
    if (typeof window !== 'undefined') window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const submitInfo = (e: FormEvent) => {
    e.preventDefault();
    const err = validate(info);
    setErrors(err);
    if (Object.keys(err).length === 0) goTo(2);
    else {
      const first = Object.keys(err)[0];
      document.getElementById(`f-${first}`)?.focus();
    }
  };

  const submitPay = (e: FormEvent) => {
    e.preventDefault();
    if (qty > 0) goTo(3);
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (qty === 0) return;
    // TODO: ارسال سفارش به API (info, pay, note, qty)
    setDone(true);
  };

  const payTitle = payMethods.find((m) => m.id === pay)?.title;

  const summary = (
    <section className="parto-card rounded-[26px] p-5 sm:p-6" aria-labelledby="sum-title">
      <h2 id="sum-title" className="mb-4 flex items-center gap-3 text-[18px] font-bold text-[#2a170e]">
        <Ico name="bag" className="h-[26px] w-[26px]" sw={1.3} /> خلاصه سفارش
      </h2>

      <div className="parto-field flex flex-row items-center gap-4 rounded-[22px] p-3">
        <Bg src={IMG.product} className="h-[110px] w-[110px] flex-none rounded-[18px] border border-white/70 shadow-md" />
        <div className="min-w-0 flex-1 text-right">
          <div className="text-[16px] font-bold text-[#2a170e]">انگشتر تک نگین کلاسیک</div>
          <div className="mt-1 text-[12px] text-[#7a5a48]">طلای سفید | سایز ۱۳</div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="text-[15px] font-bold text-[#2a170e]">{faN(UNIT_PRICE)} <span className="text-[12px] font-medium">تومان</span></div>
            <div className="flex items-center gap-2">
              <div className="parto-field flex h-[34px] items-center rounded-full px-1" role="group" aria-label="تعداد">
                <button type="button" aria-label="افزایش" onClick={() => setQty((q) => Math.min(q + 1, 9))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/60"><Ico name="plus" className="h-4 w-4" /></button>
                <span className="w-6 text-center text-[14px] font-bold">{qty.toLocaleString('fa-IR')}</span>
                <button type="button" aria-label="کاهش" onClick={() => setQty((q) => Math.max(q - 1, 0))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/60"><Ico name="minus" className="h-4 w-4" /></button>
              </div>
              <button type="button" aria-label="حذف محصول" onClick={() => setQty(0)} className="text-[#3a2418] transition hover:text-[#b4472f]"><Ico name="trash" className="h-[22px] w-[22px]" sw={1.4} /></button>
            </div>
          </div>
        </div>
      </div>
      {qty === 0 && <p className="py-3 text-center text-[13px] text-[#7a5a48]">سبد خرید شما خالی است. <Link href="/product" className="underline">بازگشت به محصولات</Link></p>}

      <dl className="mt-4 divide-y divide-[#a67a5c]/20 px-2 text-[14px] text-[#2a170e]">
        <div className="flex items-center justify-between py-3"><dt className="text-[#5a3a28]">جمع محصولات</dt><dd className="text-[16px] font-bold">{faN(subtotal)} <span className="text-[12px] font-medium">تومان</span></dd></div>
        <div className="flex items-center justify-between py-3"><dt className="text-[#5a3a28]">هزینه ارسال</dt><dd className="text-[15px] font-medium">{faN(shipping)} <span className="text-[12px]">تومان</span></dd></div>
        <div className="flex items-center justify-between py-3"><dt className="text-[#5a3a28]">تخفیف</dt><dd className="text-[15px] font-medium text-[#3f8a4c]" dir="rtl">{discount ? `${faN(discount)}-` : '۰'} <span className="text-[12px]">تومان</span></dd></div>
      </dl>

      <div className="mt-2 flex items-center justify-between rounded-[18px] bg-gradient-to-l from-[#f2c9a8] to-[#f6d6bb] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
        <span className="text-[15px] font-bold text-[#2a170e]">مبلغ قابل پرداخت</span>
        <span className="text-[26px] font-bold leading-none text-[#2a170e]">{faN(total)} <span className="text-[13px] font-medium">تومان</span></span>
      </div>

      <ul className="mt-5 grid grid-cols-3 text-center">
        {[
          { icon: 'shieldCheck', t: 'پرداخت امن', s: '' },
          { icon: 'medal', t: 'بازگشت کالا', s: 'تا ۷ روز' },
          { icon: 'secureCard', t: 'پرداخت امن', s: '' },
        ].map((x, i) => (
          <li key={i} className="flex flex-col items-center gap-1 border-[#a67a5c]/30 px-2 py-2 [&:not(:last-child)]:border-l">
            <Ico name={x.icon} className="h-[30px] w-[30px] text-[#3a2418]" sw={1.2} />
            <span className="text-[12px] text-[#3a2418]">{x.t}</span>
            {x.s && <span className="-mt-1 text-[11px] text-[#7a5a48]">{x.s}</span>}
          </li>
        ))}
      </ul>
    </section>
  );

  const backBtn = (to: 1 | 2, label: string) => (
    <button type="button" onClick={() => goTo(to)} className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#5a3a28]/70 px-7 text-[14px] font-medium text-[#2a170e] transition hover:bg-white/40">
      <Ico name="chevR" className="h-[18px] w-[18px]" sw={1.8} /> {label}
    </button>
  );

  return (
    <PartoPage active="home">
      <PartoHero title="تکمیل خرید" subtitle="لطفاً اطلاعات خود را بررسی و سفارش خود را نهایی کنید" big />

      <Container className="-mt-3">
        <Stepper current={done ? 4 : step} />

        {done ? (
          <section className="parto-card mx-auto mt-6 max-w-[560px] rounded-[28px] p-10 text-center" role="status">
            <span className="parto-btn-dark mx-auto grid h-16 w-16 place-items-center rounded-full"><Ico name="check" className="h-8 w-8" sw={2} /></span>
            <h2 className="mt-5 text-[24px] font-bold text-[#2a170e]">سفارش شما ثبت شد</h2>
            <p className="mt-2 text-[14px] leading-7 text-[#6b4a38]">
              {info.name.trim()} عزیز، از اعتماد شما سپاسگزاریم. سفارش شما به نشانی «{info.province}، {info.city}» ارسال خواهد شد و جزئیات آن در حساب کاربری شما در دسترس است.
            </p>
            <DarkBtn href="/account" className="mt-6 h-12 px-8">مشاهده سفارش‌ها</DarkBtn>
          </section>
        ) : (
          <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-[485px_1fr]">
            {summary}

            {/* ───── مرحله ۱: اطلاعات مشتری و آدرس ───── */}
            {step === 1 && (
              <form onSubmit={submitInfo} noValidate className="parto-card rounded-[26px] p-5 sm:p-6" aria-labelledby="info-title">
                <h2 id="info-title" className="mb-1 flex items-center gap-3 text-[18px] font-bold text-[#2a170e]">
                  <Ico name="pin" className="h-[26px] w-[26px]" sw={1.3} /> اطلاعات مشتری و آدرس ارسال
                </h2>
                <p className="mb-5 text-[12px] text-[#7a5a48]">فیلدهای ستاره‌دار الزامی هستند.</p>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <PField icon="user" label="نام و نام خانوادگی *" id="f-name" name="name" value={info.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="e-name" />
                      <FieldError id="e-name" msg={errors.name} />
                    </div>
                    <div>
                      <PField icon="phone" label="شماره موبایل *" id="f-phone" name="phone" type="tel" inputMode="tel" dir="rtl" value={info.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby="e-phone" />
                      <FieldError id="e-phone" msg={errors.phone} />
                    </div>
                  </div>

                  <div>
                    <PField icon="mail" label="ایمیل (اختیاری)" id="f-email" name="email" type="email" value={info.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="e-email" />
                    <FieldError id="e-email" msg={errors.email} />
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <PField as="select" icon="pin" label="استان *" id="f-province" name="province" value={info.province} onChange={set('province')} aria-invalid={!!errors.province} aria-describedby="e-province">
                        <option value="">استان *</option>
                        {Object.keys(cities).map((p) => <option key={p} value={p}>{p}</option>)}
                      </PField>
                      <FieldError id="e-province" msg={errors.province} />
                    </div>
                    <div>
                      <PField as="select" icon="pin" label="شهر *" id="f-city" name="city" value={info.city} onChange={set('city')} disabled={!info.province} aria-invalid={!!errors.city} aria-describedby="e-city">
                        <option value="">شهر *</option>
                        {(cities[info.province] ?? []).map((c) => <option key={c} value={c}>{c}</option>)}
                      </PField>
                      <FieldError id="e-city" msg={errors.city} />
                    </div>
                  </div>

                  <div>
                    <PField icon="pin" label="کد پستی (۱۰ رقم) *" id="f-postal" name="postal" inputMode="numeric" dir="rtl" maxLength={10} value={info.postal} onChange={set('postal')} autoComplete="postal-code" aria-invalid={!!errors.postal} aria-describedby="e-postal" />
                    <FieldError id="e-postal" msg={errors.postal} />
                  </div>

                  <div>
                    <PField as="textarea" rows={3} icon="pin" label="آدرس کامل (خیابان، پلاک، واحد) *" id="f-address" name="address" value={info.address} onChange={set('address')} autoComplete="street-address" aria-invalid={!!errors.address} aria-describedby="e-address" />
                    <FieldError id="e-address" msg={errors.address} />
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link href="/cart" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#5a3a28]/70 px-7 text-[14px] font-medium text-[#2a170e] transition hover:bg-white/40">
                    <Ico name="chevR" className="h-[18px] w-[18px]" sw={1.8} /> بازگشت به سبد خرید
                  </Link>
                  <DarkBtn type="submit" disabled={qty === 0} className="h-[58px] w-full text-[16px] sm:w-[315px]">
                    ادامه و انتخاب شیوه پرداخت <Ico name="arrowL" className="h-[20px] w-[20px]" sw={1.8} />
                  </DarkBtn>
                </div>
              </form>
            )}

            {/* ───── مرحله ۲: شیوه پرداخت ───── */}
            {step === 2 && (
              <form onSubmit={submitPay} className="space-y-4">
                <fieldset className="parto-card rounded-[26px] p-5 sm:p-6">
                  <legend className="sr-only">شیوه پرداخت</legend>
                  <h2 className="mb-4 text-[18px] font-bold text-[#2a170e]" aria-hidden>شیوه پرداخت</h2>
                  <div className="space-y-3">
                    {payMethods.map((m) => {
                      const on = pay === m.id;
                      return (
                        <label key={m.id} className={`parto-field flex min-h-[60px] cursor-pointer items-center gap-4 rounded-[22px] px-5 py-3 transition ${on ? '!border-[#c8a07c]' : ''}`}>
                          <input type="radio" name="pay" value={m.id} checked={on} onChange={() => setPay(m.id)} className="peer sr-only" />
                          <span className={`grid h-[26px] w-[26px] flex-none place-items-center rounded-full border-[1.5px] ${on ? 'border-[#3a2418]' : 'border-[#c9a07c]'} peer-focus-visible:ring-2 peer-focus-visible:ring-[#c8a07c]`}>
                            {on && <span className="h-3 w-3 rounded-full bg-[#2a170e]" />}
                          </span>
                          <span className="flex-1 text-right">
                            <span className="block text-[15px] font-medium text-[#2a170e]">{m.title}</span>
                            {m.sub && <span className="mt-0.5 block text-[12px] text-[#7a5a48]">{m.sub}</span>}
                          </span>
                          {m.icon && <Ico name={m.icon} className="h-[30px] w-[30px] flex-none text-[#3a2418]" sw={1.3} />}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <section className="parto-card rounded-[26px] p-5 sm:p-6">
                  <label htmlFor="order-note" className="mb-3 flex items-center gap-3 text-[16px] font-bold text-[#2a170e]">
                    <Ico name="pencil" className="h-[24px] w-[24px] text-[#7a4a2c]" sw={1.4} />
                    <span>توضیحات سفارش <span className="text-[13px] font-medium text-[#5a3a28]">(اختیاری)</span></span>
                  </label>
                  <textarea id="order-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="در صورت نیاز، توضیحات بیشتری درباره سفارش خود بنویسید..." className="parto-field w-full resize-none rounded-[20px] px-5 py-4 text-right text-[14px]" />
                </section>

                <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {backBtn(1, 'بازگشت به آدرس')}
                  <DarkBtn type="submit" disabled={qty === 0} className="h-[58px] w-full text-[16px] sm:w-[315px]">
                    ادامه و تأیید نهایی <Ico name="arrowL" className="h-[20px] w-[20px]" sw={1.8} />
                  </DarkBtn>
                </div>
              </form>
            )}

            {/* ───── مرحله ۳: تأیید و پرداخت ───── */}
            {step === 3 && (
              <form onSubmit={placeOrder} className="space-y-4">
                <section className="parto-card rounded-[26px] p-5 sm:p-6" aria-labelledby="rev-title">
                  <h2 id="rev-title" className="mb-4 flex items-center justify-between text-[18px] font-bold text-[#2a170e]">
                    <span className="flex items-center gap-3"><Ico name="pin" className="h-[24px] w-[24px]" sw={1.3} /> اطلاعات گیرنده و آدرس</span>
                    <button type="button" onClick={() => goTo(1)} className="text-[13px] font-bold underline underline-offset-4">ویرایش</button>
                  </h2>
                  <dl className="parto-field space-y-2.5 rounded-[20px] px-5 py-4 text-[14px]">
                    <div className="flex gap-3"><dt className="w-[96px] flex-none text-[#7a5a48]">گیرنده</dt><dd className="font-medium">{info.name}</dd></div>
                    <div className="flex gap-3"><dt className="w-[96px] flex-none text-[#7a5a48]">موبایل</dt><dd className="font-medium">{info.phone}</dd></div>
                    {info.email && <div className="flex gap-3"><dt className="w-[96px] flex-none text-[#7a5a48]">ایمیل</dt><dd className="font-medium" dir="ltr">{info.email}</dd></div>}
                    <div className="flex gap-3"><dt className="w-[96px] flex-none text-[#7a5a48]">آدرس</dt><dd className="font-medium leading-7">{info.province}، {info.city}، {info.address}</dd></div>
                    <div className="flex gap-3"><dt className="w-[96px] flex-none text-[#7a5a48]">کد پستی</dt><dd className="font-medium">{info.postal}</dd></div>
                  </dl>
                </section>

                <section className="parto-card rounded-[26px] p-5 sm:p-6">
                  <h2 className="mb-4 flex items-center justify-between text-[18px] font-bold text-[#2a170e]">
                    <span className="flex items-center gap-3"><Ico name="card" className="h-[24px] w-[24px]" sw={1.3} /> شیوه پرداخت</span>
                    <button type="button" onClick={() => goTo(2)} className="text-[13px] font-bold underline underline-offset-4">ویرایش</button>
                  </h2>
                  <p className="parto-field rounded-[20px] px-5 py-4 text-[14px] font-medium">{payTitle}</p>
                  {note.trim() && <p className="parto-field mt-3 rounded-[20px] px-5 py-4 text-[13px] leading-7 text-[#5a3a28]"><b className="text-[#2a170e]">توضیحات: </b>{note}</p>}
                </section>

                <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {backBtn(2, 'بازگشت به پرداخت')}
                  <DarkBtn type="submit" disabled={qty === 0} className="h-[58px] w-full text-[16px] sm:w-[315px]">
                    <Ico name="lock" className="h-[20px] w-[20px]" /> پرداخت و ثبت سفارش
                  </DarkBtn>
                </div>
              </form>
            )}
          </div>
        )}

        {/* نوار مزایا */}
        <ul className="parto-card mt-6 grid grid-cols-2 rounded-[26px] py-5 lg:grid-cols-4">
          {bottomFeatures.map((f) => (
            <li key={f.title} className="flex flex-col items-center gap-1 border-[#a67a5c]/35 px-3 py-3 text-center lg:border-l lg:py-1 lg:first:border-l-0">
              <Ico name={f.icon} className="h-[32px] w-[32px] text-[#3a2418]" sw={1.2} />
              <span className="mt-1 text-[13px] font-medium text-[#2a170e]">{f.title}</span>
              {f.sub && <span className="text-[11px] text-[#7a5a48]">{f.sub}</span>}
            </li>
          ))}
        </ul>
      </Container>
    </PartoPage>
  );
}
