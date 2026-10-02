/** Wholesale rules. Discounts apply to the total number of pieces in a quote. */
export const WHOLESALE_MIN_PIECES = 10;

export const wholesaleTiers = [
  { min: 10, discount: 0.2 },
  { min: 25, discount: 0.3 },
  { min: 50, discount: 0.4 },
] as const;

export function tierFor(pieces: number) {
  let tier: (typeof wholesaleTiers)[number] | null = null;
  for (const t of wholesaleTiers) if (pieces >= t.min) tier = t;
  return tier;
}

export function wholesaleUnit(retailInr: number, discount: number) {
  return Math.round(retailInr * (1 - discount));
}

export const bestWholesaleDiscount = wholesaleTiers[wholesaleTiers.length - 1].discount;
