/* کاتالوگ انگشترها برای صفحه محصولات.
 * rawPrice به تومان است. برای هر آیتم می‌توانید slug واقعی محصول را بگذارید تا لینک به صفحه جزئیات برود. */
export type GoldType = 'white' | 'yellow' | 'rose';
export type StoneType = 'diamond' | 'ruby' | 'emerald' | 'none';
export type RingKind = 'gold' | 'diamond' | 'stone' | 'minimal';

export interface RingItem {
  id: string;
  name: string;
  rawPrice: number;
  gold: GoldType;
  stone: StoneType;
  kinds: RingKind[];
  brand: string;
  image: string;
  slug?: string;
  createdAt: number;
  /* اختیاری برای کارت */
  subTitle?: string;
  images?: string[];
  oldPrice?: number;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
}

const img = (n: string) => `/images/products/lumiere-ring/${n}.jpg`;

export const ringsCatalog: RingItem[] = [
  { id: 'r1', name: 'انگشتر تمام نگین', rawPrice: 32200000, gold: 'rose', stone: 'diamond', kinds: ['gold', 'diamond', 'stone'], brand: 'پرتو', image: img('rose-gold-1'), createdAt: 8, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.6, reviewsCount: 57 },
  { id: 'r2', name: 'انگشتر برگ‌دار ظریف', rawPrice: 27900000, gold: 'rose', stone: 'diamond', kinds: ['gold', 'diamond', 'stone'], brand: 'پرتو', image: img('rose-gold-2'), createdAt: 7, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.7, reviewsCount: 74 },
  { id: 'r3', name: 'انگشتر تک نگین الماس', rawPrice: 28500000, oldPrice: 32390000, badge: 'پرفروش‌ترین', gold: 'white', stone: 'diamond', kinds: ['diamond', 'minimal'], brand: 'پرتو', image: img('white-gold-1'), slug: 'lumiere-ring', createdAt: 6, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.8, reviewsCount: 91 },
  { id: 'r4', name: 'انگشتر جواهر کلاسیک', rawPrice: 29800000, gold: 'rose', stone: 'diamond', kinds: ['gold', 'diamond', 'stone'], brand: 'پرتو', image: img('rose-gold-3'), createdAt: 5, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.9, reviewsCount: 108 },
  { id: 'r5', name: 'انگشتر گل‌دار لطیف', rawPrice: 28900000, gold: 'rose', stone: 'diamond', kinds: ['gold', 'stone'], brand: 'پرتو', image: img('rose-gold-4'), createdAt: 4, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.5, reviewsCount: 125 },
  { id: 'r6', name: 'انگشتر مینیمال شعله', rawPrice: 24500000, gold: 'rose', stone: 'diamond', kinds: ['gold', 'minimal'], brand: 'پرتو', image: img('yellow-gold-1'), createdAt: 3, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.6, reviewsCount: 142 },
  { id: 'r7', name: 'انگشتر کلاسیک هاله‌ای', rawPrice: 36900000, gold: 'yellow', stone: 'diamond', kinds: ['gold', 'diamond', 'stone'], brand: 'پرتو', image: img('yellow-gold-2'), slug: 'imperial-ring', createdAt: 2, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.7, reviewsCount: 159 },
  { id: 'r8', name: 'انگشتر رزگلد خاص', rawPrice: 31700000, gold: 'rose', stone: 'ruby', kinds: ['gold', 'stone'], brand: 'پرتو', image: img('white-gold-2'), createdAt: 1, subTitle: 'ترکیبی از ظرافت و درخشش بی‌نظیر', rating: 4.8, reviewsCount: 176 },
];
