import type { Product } from '@/types/product';

const DISCOUNT_PERCENT = 12;

export const faNum = (n: number) =>
  n.toLocaleString('fa-IR').replace(/٬/g, ',');

export interface ProductPricing {
  price: string;
  oldPrice: string | null;
  discount: string | null;
}

/*
 * rawPrice بر حسب هزار تومان است.
 * برای محصولاتی که isDiscount دارند، قیمت قبل از تخفیف از روی درصد تخفیف محاسبه می‌شود.
 */
export function getPricing(product: Product): ProductPricing {
  const price = product.rawPrice * 1000;

  if (!product.isDiscount) {
    return { price: faNum(price), oldPrice: null, discount: null };
  }

  const old =
    Math.round(price / (1 - DISCOUNT_PERCENT / 100) / 10000) * 10000;

  return {
    price: faNum(price),
    oldPrice: faNum(old),
    discount: `${faNum(DISCOUNT_PERCENT)}٪`,
  };
}
