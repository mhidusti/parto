'use client';

import { FormEvent, useState } from 'react';
import { PartoPage, PartoHero, Container, Bg, Ico, DarkBtn, SoftBtn, PField, IMG } from '@/components/parto/Parto';
import { DiamondLogo } from '@/components/parto/icons';

const channels = [
  { icon: 'pin', title: 'آدرس فروشگاه', lines: ['تهران، خیابان ایران، پلاک ۱۲۲'], cta: 'مشاهده نقشه', href: '#map' },
  { icon: 'phone', title: 'تلفن تماس', lines: ['۰۲۱-۷۷۷۴۸۴۶'], cta: 'تماس بگیرید', href: 'tel:+982177774846', ltr: true },
  { icon: 'mail', title: 'ایمیل ما', lines: ['info@parto.com'], cta: 'ارسال ایمیل', href: 'mailto:info@parto.com', ltr: true },
  { icon: 'headset', title: 'پشتیبانی آنلاین', lines: ['همه روزه، ۹ صبح تا ۱۲ شب'], cta: 'شروع گفتگو', href: '/customer-services#support' },
];

const subjects = ['سوال درباره محصولات', 'پیگیری سفارش', 'مرجوعی و ضمانت', 'پیشنهاد و انتقاد', 'همکاری', 'سایر موارد'];

/* نقشه‌ی شماتیک خیابان‌ها (جایگزین نقشه واقعی؛ در صورت نیاز با iframe نقشه عوض شود) */
function MapArt() {
  return (
    <svg viewBox="0 0 560 190" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="560" height="190" fill="#e9dccd" />
      <g fill="#d3e0b8" opacity=".85"><rect x="30" y="18" width="60" height="42" rx="4" /><rect x="395" y="112" width="70" height="46" rx="4" /><rect x="238" y="150" width="46" height="34" rx="4" /></g>
      <g stroke="#fbf6ef" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M-10 70 L570 40" /><path d="M-10 128 L570 104" /><path d="M-10 175 L570 160" />
        <path d="M110 -10 L132 200" /><path d="M250 -10 L262 200" /><path d="M392 -10 L384 200" /><path d="M500 -10 L510 200" />
      </g>
      <g stroke="#fbf6ef" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity=".9">
        <path d="M-10 20 L570 6" /><path d="M-10 98 L570 76" /><path d="M180 -10 L196 200" /><path d="M320 -10 L318 200" /><path d="M440 -10 L452 200" /><path d="M50 -10 L70 200" />
      </g>
    </svg>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [zoom, setZoom] = useState(1);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: اتصال به API ارسال پیام
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <PartoPage active="contact">
      <PartoHero title="تماس با ما" subtitle="همیشه در کنار شما هستیم" crumb="تماس با ما" />

      <Container className="-mt-3 space-y-5">
        {/* کارت‌های راه ارتباطی */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <li key={c.title} className="parto-card flex flex-col items-center rounded-[22px] px-4 pb-5 pt-5 text-center">
              <Ico name={c.icon} className="h-[32px] w-[32px] text-[#3a2418]" sw={c.icon === 'phone' || c.icon === 'pin' ? 1.8 : 1.3} />
              <h2 className="mt-2 text-[16px] font-bold text-[#2a170e]">{c.title}</h2>
              {c.lines.map((l) => (
                <p key={l} dir={c.ltr ? 'ltr' : undefined} className="mt-1 text-[12px] text-[#6b4a38]">{l}</p>
              ))}
              <SoftBtn href={c.href} className="mt-4 h-[34px] px-5">
                <Ico name="arrowL" className="h-[15px] w-[15px]" sw={1.8} /> {c.cta}
              </SoftBtn>
            </li>
          ))}
        </ul>

        {/* نقشه + فرم */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.09fr_1fr]">
          {/* راست: نقشه و ساعات کاری */}
          <div className="space-y-4">
            <section id="map" className="parto-card relative overflow-hidden rounded-[22px] p-0" aria-label="نقشه فروشگاه">
              <div className="relative h-[190px] w-full overflow-hidden">
                <div className="absolute inset-0 origin-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
                  <MapArt />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[78%] text-center">
                    <span className="mb-1 block rounded-[10px] bg-[#2a170e] px-4 py-1 text-[13px] font-medium text-[#f6e6d3] shadow-lg">پرتو</span>
                    <Ico name="pin" className="mx-auto h-[38px] w-[38px] fill-[#3a2013] text-[#3a2013]" sw={1.2} />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex flex-col overflow-hidden rounded-[10px] bg-white/90 shadow">
                  <button type="button" aria-label="بزرگ‌نمایی" onClick={() => setZoom((z) => Math.min(z + 0.25, 2))} className="grid h-8 w-8 place-items-center text-[#3a2418] hover:bg-[#f3dfcf]"><Ico name="plus" className="h-4 w-4" sw={2} /></button>
                  <span className="h-px bg-[#d9c3b0]" />
                  <button type="button" aria-label="کوچک‌نمایی" onClick={() => setZoom((z) => Math.max(z - 0.25, 1))} className="grid h-8 w-8 place-items-center text-[#3a2418] hover:bg-[#f3dfcf]"><Ico name="minus" className="h-4 w-4" sw={2} /></button>
                </div>
              </div>
            </section>

            <section className="parto-card relative overflow-hidden rounded-[22px]">
              <Bg
                src={IMG.ringBox}
                fallback="linear-gradient(135deg,#f3d5bd,#d6a783)"
                pos="right center"
                className="absolute inset-y-0 right-0 w-[56%]"
                style={{ WebkitMaskImage: 'linear-gradient(to left,#000 60%,transparent)', maskImage: 'linear-gradient(to left,#000 60%,transparent)' }}
              />
              <div className="relative px-6 py-6 sm:mr-auto sm:w-[46%]">
                <h2 className="flex items-center gap-2.5 text-[16px] font-bold text-[#2a170e]"><Ico name="clock" className="h-[22px] w-[22px]" sw={1.4} /> ساعات کاری</h2>
                <dl className="mt-4 space-y-3 text-[14px] text-[#3a2418]">
                  <div><dt className="inline">شنبه تا چهارشنبه: </dt><dd className="inline">۹ صبح تا ۸ شب</dd></div>
                  <div><dt className="inline">پنجشنبه و جمعه: </dt><dd className="inline">۹ صبح تا ۱۲ شب</dd></div>
                </dl>
              </div>
              <div className="h-[110px] sm:hidden" />
            </section>
          </div>

          {/* چپ: فرم */}
          <section className="parto-card rounded-[22px] p-5 sm:p-6" aria-labelledby="msg-title">
            <h2 id="msg-title" className="flex items-center gap-2.5 text-[20px] font-bold text-[#2a170e]">
              <Ico name="pencil" className="h-[24px] w-[24px] text-[#7a4a2c]" sw={1.4} /> ارسال پیام
            </h2>
            <p className="mt-1 text-[13px] text-[#6b4a38]">سوالات، پیشنهادات و نظرات خود را برای ما ارسال کنید.</p>

            {sent ? (
              <div role="status" className="mt-6 rounded-[20px] bg-white/50 px-6 py-10 text-center">
                <span className="parto-btn-dark mx-auto grid h-14 w-14 place-items-center rounded-full"><Ico name="check" className="h-7 w-7" sw={2} /></span>
                <p className="mt-4 text-[16px] font-bold text-[#2a170e]">پیام شما ارسال شد</p>
                <p className="mt-1 text-[13px] text-[#6b4a38]">همکاران ما در اسرع وقت با شما تماس می‌گیرند.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-5 text-[13px] font-bold underline underline-offset-4">ارسال پیام جدید</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <PField icon="user" label="نام شما *" name="name" required autoComplete="name" />
                  <PField icon="phone" label="شماره تماس *" name="phone" required type="tel" inputMode="tel" autoComplete="tel" />
                </div>
                <PField as="select" icon="chatDots" label="موضوع پیام" name="subject" required defaultValue="">
                  <option value="" disabled>موضوع پیام</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </PField>
                <PField as="textarea" rows={4} icon="mail" label="متن پیام شما..." name="message" required />
                <DarkBtn type="submit" className="!mt-4 h-[52px] w-full text-[15px]">
                  ارسال پیام <Ico name="send" className="h-[20px] w-[20px]" />
                </DarkBtn>
              </form>
            )}
          </section>
        </div>

        {/* پرسش‌های متداول */}
        <section className="parto-card flex flex-col items-center gap-4 rounded-[22px] px-6 py-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <Ico name="doc" className="h-[38px] w-[38px] flex-none text-[#3a2418]" sw={1.2} />
            <div>
              <h2 className="text-[17px] font-bold text-[#2a170e]">پرسش‌های متداول</h2>
              <p className="mt-0.5 text-[12px] text-[#6b4a38]">پاسخ سوالات رایج خود را در بخش سوالات متداول پیدا کنید.</p>
            </div>
          </div>
          <DiamondLogo className="hidden h-[28px] w-[34px] text-[#b3865f] sm:block" />
          <SoftBtn href="/customer-services#faq" className="h-[40px] px-6 !text-[13px] !font-bold">
            مشاهده سوالات متداول <Ico name="chevL" className="h-4 w-4" sw={1.8} />
          </SoftBtn>
        </section>
      </Container>
    </PartoPage>
  );
}
