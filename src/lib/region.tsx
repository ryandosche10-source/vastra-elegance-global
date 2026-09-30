import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type RegionCode = "IN" | "US" | "CA" | "AU";

export type Region = {
  code: RegionCode;
  country: string;
  countryTa: string;
  currency: string;
  locale: string;
  /** Multiplier applied to the INR base price. */
  rate: number;
  /** Free standard shipping above this amount, in INR. */
  freeShippingInr: number;
  taxRate: number;
  taxLabel: string;
  postcodeLabel: string;
};

export const regions: Record<RegionCode, Region> = {
  IN: {
    code: "IN",
    country: "India",
    countryTa: "இந்தியா",
    currency: "INR",
    locale: "en-IN",
    rate: 1,
    freeShippingInr: 15000,
    taxRate: 0.05,
    taxLabel: "GST 5%",
    postcodeLabel: "PIN code",
  },
  US: {
    code: "US",
    country: "United States",
    countryTa: "அமெரிக்கா",
    currency: "USD",
    locale: "en-US",
    rate: 0.0116,
    freeShippingInr: 40000,
    taxRate: 0.07,
    taxLabel: "Sales tax 7%",
    postcodeLabel: "ZIP code",
  },
  CA: {
    code: "CA",
    country: "Canada",
    countryTa: "கனடா",
    currency: "CAD",
    locale: "en-CA",
    rate: 0.0159,
    freeShippingInr: 40000,
    taxRate: 0.13,
    taxLabel: "HST 13%",
    postcodeLabel: "Postal code",
  },
  AU: {
    code: "AU",
    country: "Australia",
    countryTa: "ஆஸ்திரேலியா",
    currency: "AUD",
    locale: "en-AU",
    rate: 0.0177,
    freeShippingInr: 40000,
    taxRate: 0.1,
    taxLabel: "GST 10%",
    postcodeLabel: "Postcode",
  },
};

export const regionList = Object.values(regions);

type RegionValue = {
  region: Region;
  setRegion: (code: RegionCode) => void;
  /** Convert an INR base amount into the active currency and format it. */
  format: (inr: number) => string;
  formatIn: (inr: number, code: RegionCode) => string;
  convert: (inr: number) => number;
};

const RegionContext = createContext<RegionValue | null>(null);

function formatAmount(inr: number, r: Region) {
  const value = inr * r.rate;
  return new Intl.NumberFormat(r.locale, {
    style: "currency",
    currency: r.currency,
    maximumFractionDigits: r.code === "IN" ? 0 : 2,
  }).format(value);
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<RegionCode>("IN");

  useEffect(() => {
    const saved = localStorage.getItem("iv-region") as RegionCode | null;
    if (saved && regions[saved]) {
      setCode(saved);
      return;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const guess: RegionCode = tz.startsWith("America/Toronto")
      ? "CA"
      : tz.startsWith("Australia")
        ? "AU"
        : tz.startsWith("America")
          ? "US"
          : "IN";
    setCode(guess);
  }, []);

  const setRegion = useCallback((next: RegionCode) => {
    setCode(next);
    localStorage.setItem("iv-region", next);
  }, []);

  const value = useMemo<RegionValue>(() => {
    const region = regions[code];
    return {
      region,
      setRegion,
      format: (inr: number) => formatAmount(inr, region),
      formatIn: (inr: number, c: RegionCode) => formatAmount(inr, regions[c]),
      convert: (inr: number) => inr * region.rate,
    };
  }, [code, setRegion]);

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used inside RegionProvider");
  return ctx;
}
