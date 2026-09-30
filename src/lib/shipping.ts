import type { RegionCode } from "./region";
import { regions } from "./region";

export type ShipMethodId = "standard" | "express";

export type ShipMethod = {
  id: ShipMethodId;
  label: string;
  labelTa: string;
  /** Base cost in INR. */
  baseInr: number;
  /** Extra INR per kg above the first kilo. */
  perKgInr: number;
  minDays: number;
  maxDays: number;
};

export const shippingTable: Record<RegionCode, ShipMethod[]> = {
  IN: [
    {
      id: "standard",
      label: "Standard courier",
      labelTa: "வழக்கமான கூரியர்",
      baseInr: 250,
      perKgInr: 80,
      minDays: 3,
      maxDays: 6,
    },
    {
      id: "express",
      label: "Express next-day",
      labelTa: "விரைவு அனுப்புதல்",
      baseInr: 750,
      perKgInr: 150,
      minDays: 1,
      maxDays: 2,
    },
  ],
  US: [
    {
      id: "standard",
      label: "Standard international",
      labelTa: "சர்வதேச வழக்கமான",
      baseInr: 2100,
      perKgInr: 700,
      minDays: 6,
      maxDays: 10,
    },
    {
      id: "express",
      label: "Express (DHL)",
      labelTa: "விரைவு (DHL)",
      baseInr: 5400,
      perKgInr: 1400,
      minDays: 3,
      maxDays: 5,
    },
  ],
  CA: [
    {
      id: "standard",
      label: "Standard international",
      labelTa: "சர்வதேச வழக்கமான",
      baseInr: 2400,
      perKgInr: 750,
      minDays: 7,
      maxDays: 12,
    },
    {
      id: "express",
      label: "Express (DHL)",
      labelTa: "விரைவு (DHL)",
      baseInr: 5900,
      perKgInr: 1500,
      minDays: 3,
      maxDays: 5,
    },
  ],
  AU: [
    {
      id: "standard",
      label: "Standard international",
      labelTa: "சர்வதேச வழக்கமான",
      baseInr: 2200,
      perKgInr: 720,
      minDays: 7,
      maxDays: 12,
    },
    {
      id: "express",
      label: "Express (DHL)",
      labelTa: "விரைவு (DHL)",
      baseInr: 5600,
      perKgInr: 1450,
      minDays: 3,
      maxDays: 5,
    },
  ],
};

export type ShippingQuote = {
  costInr: number;
  free: boolean;
  minDays: number;
  maxDays: number;
  method: ShipMethod;
};

export function quoteShipping(args: {
  regionCode: RegionCode;
  methodId: ShipMethodId;
  weightKg: number;
  subtotalInr: number;
  postcode?: string;
}): ShippingQuote {
  const { regionCode, methodId, weightKg, subtotalInr, postcode } = args;
  const methods = shippingTable[regionCode];
  const method = methods.find((m) => m.id === methodId) ?? methods[0];
  const billableKg = Math.max(0, Math.ceil(weightKg) - 1);
  let costInr = method.baseInr + billableKg * method.perKgInr;

  // Remote / regional postcodes carry a small surcharge.
  const remote = isRemote(regionCode, postcode);
  if (remote) costInr += Math.round(method.baseInr * 0.2);

  const free =
    methodId === "standard" && subtotalInr >= regions[regionCode].freeShippingInr;
  if (free) costInr = 0;

  const extra = remote ? 2 : 0;
  return {
    costInr,
    free,
    minDays: method.minDays + extra,
    maxDays: method.maxDays + extra,
    method,
  };
}

function isRemote(regionCode: RegionCode, postcode?: string) {
  if (!postcode) return false;
  const p = postcode.trim().toUpperCase();
  if (regionCode === "IN") return /^(19|79|78)/.test(p);
  if (regionCode === "US") return /^(99|96)/.test(p);
  if (regionCode === "CA") return /^(X|Y)/.test(p);
  if (regionCode === "AU") return /^(08|07)/.test(p);
  return false;
}
