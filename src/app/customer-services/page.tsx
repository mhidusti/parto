'use client';

import { FormEvent, useState } from 'react';
import { PartoPage, PartoHero, Container, Bg, Ico, DarkBtn, SoftBtn, FeatureStrip, Ornament, IMG } from '@/components/parto/Parto';
import { DiamondLogo } from '@/components/parto/icons';

const features = [
  { icon: 'gift', title: 'بسته‌بندی لوکس', sub: 'هدیه‌ای خاص برای شما' },
  { icon: 'truck', title: 'ارسال سریع و مطمئن', sub: 'در کمترین زمان به دست شما می‌رسد' },
  { icon: 'gem', title: 'ضمانت اصالت کالا', sub: 'با خیال راحت خرید کنید' },
  { icon: 'headset', title: 'پشتیبانی ۲۴ ساعته', sub: 'همیشه پاسخگوی شما هستیم' },
];

const faqs = [
  { q: 'چگونه می‌توانم سفارشم را پیگیری کنم؟', a: 'با وارد کردن شماره سفارش در بخش «پیگیری سفارش» همین صفحه یا از طریق حساب کاربری، وضعیت سفارش خود را لحظه‌ای مشاهده کنید.' },
  { q: 'آیا امکان بازگشت کالا وجود دارد؟', a: 'بله، تا ۷ روز پس از تحویل، در صورت سالم بودن کالا و بسته‌بندی اصلی، امکان بازگشت و استرداد وجود دارد.' },
  { q: 'مدت زمان ارسال چقدر است؟', a: 'سفارش‌های تهران ۱ تا ۲ روز کاری و سایر شهرها ۲ تا ۵ روز کاری پس از ثبت سفارش تحویل داده می‌شوند.' },
  { q: 'آیا محصولات دارای ضمانت هستند؟', a: 'تمامی محصولات پرتو با فاکتور معتبر و ضمانت اصالت کالا عرضه می‌شوند.' },
  { q: 'روش‌های پرداخت کدامند؟', a: 'پرداخت آنلاین با کارت‌های بانکی، پرداخت از درگاه امن و پرداخت در محل (برای سفارش‌های منتخب) در دسترس است.' },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="parto-card scroll-mt-6 rounded-[24px] p-5 sm:p-6" aria-labelledby="faq-title">
      <h2 id="faq-title" className="mb-4 flex items-center gap-3 text-[17px] font-bold text-[#2a170e]">
        <DiamondLogo className="h-[26px] w-[32px] text-[#3a2418]" /> سوالات متداول
      </h2>
      <ul className="space-y-2.5">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <li key={f.q} className="parto-field overflow-hidden rounded-[16px]">
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-3 text-right text-[14px] font-medium text-[#2a170e]"
              >
                <span>{f.q}</span>
                <Ico name={on ? 'minus' : 'plus'} className="h-[18px] w-[18px] flex-none text-[#5a3a28]" sw={1.6} />
              </button>
              <div id={`faq-a-${i}`} role="region" hidden={!on} className="px-5 pb-4 text-[13px] leading-7 text-[#5a3a28]">{f.a}</div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex justify-center">
        <SoftBtn href="#faq" className="h-[38px] px-7 !text-[13px] !font-bold">
          <Ico name="arrowL" className="h-4 w-4" sw={1.8} /> مشاهده همه سوالات
        </SoftBtn>
      </div>
    </section>
  );
}

export default function CustomerServicesPage() {
  const [order, setOrder] = useState('');
  const [status, setStatus] = useState('');

  const track = (e: FormEvent) => {
    e.preventDefault();
    // TODO: اتصال به API پیگیری سفارش
    setStatus(order.trim() ? `سفارش ${order.trim()} در حال پردازش است.` : 'لطفاً شماره سفارش را وارد کنید.');
  };

  return (
    <PartoPage active="services">
      <PartoHero title="خدمات مشتریان" subtitle="همیشه در کنار شما هستیم" crumb="خدمات مشتریان" />

      <Container className="-mt-3 space-y-5">
        <FeatureStrip items={features} />

        {/* سوالات متداول + بنر */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.12fr]">
          <Faq />

          <section className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/70 shadow-[0_14px_34px_rgba(110,72,46,0.22)] lg:min-h-[333px]" aria-label="پشتیبانی پرتو">
            <Bg src={IMG.giftBox} className="absolute inset-0" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2a170e]/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-7 text-right text-[#fbeee2]">
              <p className="text-[22px] font-bold">هر سوالی دارید؟</p>
              <p className="mt-1 text-[17px]">ما اینجاییم تا کمکتون کنیم...</p>
              <Ornament className="mt-4 w-[220px] !text-[#f0dccb]" />
            </div>
          </section>
        </div>

        {/* سه کارت خدمات */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* ارسال تیکت */}
          <section id="ticket" className="parto-card flex flex-col rounded-[22px] p-6 text-right">
            <h2 className="flex items-center gap-3 text-[17px] font-bold text-[#2a170e]"><Ico name="mail" className="h-[34px] w-[34px]" sw={1.2} /> ارسال تیکت پشتیبانی</h2>
            <p className="mt-4 flex-1 text-[13px] text-[#5a3a28]">در صورت بروز مشکل، تیکت پشتیبانی ارسال کنید.</p>
            <SoftBtn href="/contact" className="mx-auto mt-6 h-[50px] w-full max-w-[260px] !text-[14px]">
              <Ico name="send" className="h-[19px] w-[19px]" /> ارسال تیکت
            </SoftBtn>
          </section>

          {/* ارتباط با پشتیبانی */}
          <section id="support" className="parto-card scroll-mt-6 rounded-[22px] p-6 text-right">
            <h2 className="flex items-center gap-3 text-[17px] font-bold text-[#2a170e]"><Ico name="headset" className="h-[34px] w-[34px]" sw={1.2} /> ارتباط با پشتیبانی</h2>
            <p className="mt-3 text-[13px] text-[#5a3a28]">برای دریافت راهنمایی و مشاوره، با ما در ارتباط باشید.</p>
            <div className="mt-4 space-y-2.5">
              <a href="tel:+982177774444" dir="ltr" className="parto-field flex h-[40px] items-center justify-center gap-3 rounded-full text-[15px] font-bold">
                <Ico name="phone" className="h-[18px] w-[18px]" sw={2} /> ۰۲۱-۷۷۷۴۴۴۴
              </a>
              <a href="https://wa.me/982177774444" target="_blank" rel="noopener noreferrer" className="parto-field flex h-[40px] items-center justify-center gap-3 rounded-full text-[13px]">
                <Ico name="whatsapp" className="h-[19px] w-[19px]" /> پشتیبانی آنلاین در واتساپ
              </a>
              <DarkBtn href="/contact" className="h-[44px] w-[75%] mx-auto !flex !text-[14px]">
                <Ico name="chatDots" className="h-[19px] w-[19px]" sw={1.8} /> شروع گفتگو
              </DarkBtn>
            </div>
          </section>

          {/* پیگیری سفارش */}
          <section id="track" className="parto-card scroll-mt-6 rounded-[22px] p-6 text-right">
            <h2 className="flex items-center gap-3 text-[17px] font-bold text-[#2a170e]"><Ico name="box" className="h-[34px] w-[34px]" sw={1.2} /> پیگیری سفارش</h2>
            <p className="mt-3 text-[13px] leading-6 text-[#5a3a28]">برای پیگیری وضعیت سفارش خود شماره سفارش را وارد کنید..</p>
            <form onSubmit={track} className="mt-4 space-y-3">
              <label className="parto-field relative flex h-[44px] items-center rounded-full">
                <span className="sr-only">شماره سفارش</span>
                <input
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="شماره سفارش..."
                  inputMode="numeric"
                  className="h-full w-full rounded-full bg-transparent pr-5 pl-12 text-right text-[13px] outline-none placeholder:text-[#9a7c68]"
                />
                <Ico name="search" className="pointer-events-none absolute left-4 h-[20px] w-[20px] text-[#3a2418]" sw={1.6} />
              </label>
              <DarkBtn type="submit" className="h-[46px] w-[80%] mx-auto !flex !text-[14px]">
                <Ico name="arrowL" className="h-[18px] w-[18px]" sw={1.8} /> مشاهده وضعیت سفارش
              </DarkBtn>
              {status && <p role="status" className="text-center text-[12px] text-[#5a3a28]">{status}</p>}
            </form>
          </section>
        </div>
      </Container>
    </PartoPage>
  );
}
