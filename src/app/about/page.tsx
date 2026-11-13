import { PartoPage, PartoHero, Container, Bg, Ico, DarkBtn, Ornament, IMG } from '@/components/parto/Parto';

const stats = [
  { icon: 'gem', value: '+۱۰', unit: 'سال', sub: 'تجربه درخشان' },
  { icon: 'ring', value: '+۵۰,۰۰۰', unit: '', sub: 'مشتری وفادار' },
  { icon: 'shieldCheck', value: '+۱۰۰٪', unit: '', sub: 'ضمانت اصالت کالا' },
  { icon: 'truck', value: 'ارسال سراسری', unit: '', sub: 'به سراسر ایران' },
];

const why = [
  { icon: 'gem', title: 'کیفیت بی‌نظیر', sub: 'استفاده از بهترین متریال‌ها' },
  { icon: 'shieldCheck', title: 'ضمانت اصالت', sub: 'با خیال راحت خرید کنید' },
  { icon: 'headset', title: 'پشتیبانی حرفه‌ای', sub: 'همیشه در کنار شما هستیم' },
  { icon: 'gift', title: 'بسته‌بندی لوکس', sub: 'هدیه‌ای خاص برای شما' },
];

export const metadata = {
  title: 'درباره ما | PARTO',
  description: 'داستانی از عشق، زیبایی و اعتماد؛ با پرتو و جواهرات ماندگار آشنا شوید.',
};

export default function AboutPage() {
  return (
    <PartoPage active="about">
      <PartoHero title="درباره ما" subtitle="داستانی از عشق، زیبایی و اعتماد" crumb="درباره ما" />

      <Container className="-mt-2 space-y-5">
        {/* معرفی + ویدیو */}
        <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-10">
          <div className="text-center lg:px-4">
            <Ornament className="mx-auto mb-6 w-full max-w-[420px]" />
            <h2 className="text-[26px] font-bold text-[#2a170e]">پرتو؛ درخشش ماندگار زیبایی</h2>
            <p className="mx-auto mt-5 max-w-[470px] text-[14px] leading-[2.2] text-[#4a2f20]">
              ما در پرتو باور داریم که زیورآلات، تنها یک اکسسوری نیستند؛
              <br />
              بلکه داستانی از عشق، زیبایی و اعتماد هستند.
              <br />
              با بیش از چندین سال تجربه در طراحی و عرضه جواهرات خاص و باکیفیت،
              <br />
              همواره در تلاشیم تا درخشش لحظه‌های خاص زندگی شما باشیم.
            </p>
            <DarkBtn href="/product" className="mt-6 h-[46px] px-9">
              بیشتر بدانید <Ico name="arrowL" className="h-[18px] w-[18px]" sw={1.8} />
            </DarkBtn>
          </div>

          <figure className="relative overflow-hidden rounded-[26px] border border-white/70 shadow-[0_14px_34px_rgba(110,72,46,0.22)]">
            <Bg src={IMG.ringBox} className="aspect-[1.95/1] w-full min-h-[220px]" />
            <button
              type="button"
              aria-label="پخش ویدیو معرفی پرتو"
              className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[2.5px] border-white/90 bg-black/25 text-white backdrop-blur-[2px] transition hover:scale-105 hover:bg-black/40"
            >
              <Ico name="play" className="h-[28px] w-[28px] fill-current" sw={1} />
            </button>
          </figure>
        </section>

        {/* آمار */}
        <ul className="parto-card grid grid-cols-2 rounded-[26px] py-6 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.sub} className="flex flex-col items-center gap-1 border-[#a67a5c]/35 px-3 py-3 text-center lg:border-l lg:py-0 lg:first:border-l-0">
              <Ico name={s.icon} className="h-[34px] w-[34px] text-[#3a2418]" sw={1.2} />
              <div className="mt-1 text-[20px] font-bold text-[#2a170e]">{s.value}{s.unit && <span className="mr-1.5">{s.unit}</span>}</div>
              <div className="text-[12px] text-[#7a5a48]">{s.sub}</div>
            </li>
          ))}
        </ul>

        {/* چرا پرتو؟ */}
        <section aria-labelledby="why-title">
          <div className="flex items-center gap-4 py-2">
            <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/55 to-transparent" />
            <h2 id="why-title" className="text-[22px] font-bold text-[#2a170e]">چرا پرتو؟</h2>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/55 to-transparent" />
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {why.map((w) => (
              <li key={w.title} className="parto-card flex flex-col items-center rounded-[22px] px-4 pb-6 pt-6 text-center">
                <Ico name={w.icon} className="h-[34px] w-[34px] text-[#3a2418]" sw={1.2} />
                <h3 className="mt-3 text-[16px] font-bold text-[#2a170e]">{w.title}</h3>
                <p className="mt-1.5 text-[12px] text-[#7a5a48]">{w.sub}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* رویای ما */}
        <section className="parto-card relative overflow-hidden rounded-[26px]">
          <Bg
            src={IMG.bracelet}
            fallback="linear-gradient(135deg,#f3d5bd,#d6a783)"
            pos="right center"
            className="absolute inset-y-0 right-0 w-full opacity-90 lg:w-[60%]"
            style={{ WebkitMaskImage: 'linear-gradient(to left,#000 55%,transparent)', maskImage: 'linear-gradient(to left,#000 55%,transparent)' }}
          />
          <div className="relative px-6 py-10 text-center sm:px-10 lg:mr-auto lg:w-[46%] lg:py-12">
            <h2 className="text-[24px] font-bold text-[#2a170e]">رویای ما، درخشش شماست...</h2>
            <p className="mx-auto mt-3 max-w-[380px] text-[13px] leading-8 text-[#4a2f20]">
              در پرتو: هر قطعه جواهر با دقت و عشق انتخاب می‌شود
              <br />
              تا بخشی از زیباترین لحظات زندگی شما باشد.
            </p>
            <Ornament className="mx-auto mt-5 w-full max-w-[330px]" />
          </div>
        </section>
      </Container>
    </PartoPage>
  );
}
