import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ۱. تنظیم فونت Serif انگلیسی برای اعداد و برند
// فونت‌ها به‌صورت لوکال از src/fonts سرو می‌شوند؛ هیچ درخواست شبکه‌ای در زمان build/dev انجام نمی‌شود
const cormorant = localFont({
  src: "../fonts/CormorantGaramond-latin-var.woff2",
  weight: "300 500",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
});

// ۲. تنظیم فونت فارسی لوکس، نرم و مدرن (وزیرمتن) — فونت متغیر زیرمجموعه عربی/فارسی
const vazirmatn = localFont({
  src: "../fonts/Vazirmatn-arabic-var.woff2",
  weight: "200 600",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PARTO — Jewelry for a lifetime",
  description: "پارتو؛ جواهرات ماندگار و بی‌نظیر با زیبایی، اصالت و اعتماد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${cormorant.variable} ${vazirmatn.variable}`}
    >
      <body className="font-sans bg-[#0a0a0a] text-[#F7F5F0] antialiased selection:bg-[#D8C2A8] selection:text-[#060605]">
        {children}
      </body>
    </html>
  );
}