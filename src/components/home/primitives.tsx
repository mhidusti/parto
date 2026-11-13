import React from "react";
import Link from "next/link";

/* تصویر پس‌زمینه با گرادیانت جایگزین؛ اگر فایل تصویر نبود، گرادیانت دیده می‌شود */
export function Photo({
  src,
  gradient = "linear-gradient(135deg,#e9d6c3,#c9a888)",
  className = "",
  style,
  children,
}: {
  src?: string;
  gradient?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const bg = src ? `url("${src}"), ${gradient}` : gradient;
  return (
    <div
      className={className}
      style={{ backgroundImage: bg, backgroundSize: "cover", backgroundPosition: "center", ...style }}
    >
      {children}
    </div>
  );
}

export function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
      <path d="M12 3h24l10 12-22 22L2 15 12 3Z" />
      <path d="M2 15h44M17 3l-5 12 12 22 12-22-5-12M24 3l-5 12M24 3l5 12" />
    </svg>
  );
}

export function Logo({ className = "", light = true }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex flex-col items-center leading-none ${className}`} dir="ltr">
      <DiamondIcon className="h-[18px] w-6 text-[#e2bf9f]" />
      <span className={`font-serif text-[30px] tracking-[0.12em] ${light ? "text-[#f3dcc4]" : "text-[#3a2418]"}`}>PARTO</span>
      <span className="mt-1 font-serif text-[9px] italic tracking-[0.12em] text-[#c8a07c]">Jewelry for a lifetime</span>
    </Link>
  );
}

export function GoldButton({
  href,
  children,
  className = "",
  onClick,
  type,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = `btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-2.5 text-[13px] font-medium transition ${className}`;
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function ArrowLeft({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Chevron({ dir, className = "h-4 w-4" }: { dir: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export function RoundArrow({ dir, onClick, dark = true, label }: { dir: "left" | "right"; onClick?: () => void; dark?: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${
        dark
          ? "border-[#d9b391]/60 bg-[#1c110c]/60 text-[#e8c9aa] hover:bg-[#d9b391] hover:text-[#2a1a12]"
          : "border-[#c8a07c]/50 bg-white/50 text-[#7a5238] hover:bg-[#c8a07c] hover:text-white"
      }`}
    >
      <Chevron dir={dir} />
    </button>
  );
}

/* عنوان بخش: عنوان راست، لینک «مشاهده همه» چپ */
export function SectionHeading({
  title,
  subtitle,
  href,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className={`text-[22px] font-bold leading-tight sm:text-[26px] ${dark ? "text-[#e8c9aa]" : "text-[#2a1a12]"}`}>{title}</h2>
        {subtitle && <p className={`mt-1 text-[12px] ${dark ? "text-[#d8c2ac]/80" : "text-[#7a5a46]"}`}>{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className={`group inline-flex shrink-0 items-center gap-1.5 text-[12px] font-medium transition hover:opacity-80 ${dark ? "text-[#e8c9aa]" : "text-[#3a2418]"}`}
        >
          مشاهده همه
          <ArrowLeft className="h-3.5 w-3.5 transition duration-300 group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function HeartButton({ className = "" }: { className?: string }) {
  const [on, setOn] = React.useState(false);
  return (
    <button
      type="button"
      aria-label="افزودن به علاقه‌مندی‌ها"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className={`grid h-8 w-8 place-items-center rounded-full bg-white/70 text-[#5a3a28] backdrop-blur transition hover:bg-white ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={on ? "#b3865f" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
      </svg>
    </button>
  );
}
