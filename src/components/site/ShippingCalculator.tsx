import { useState } from "react";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { regionList, regions, useRegion, type RegionCode } from "@/lib/region";
import { quoteShipping, shippingTable, type ShipMethodId } from "@/lib/shipping";

type Props = {
  subtotalInr: number;
  weightKg: number;
  onQuote: (q: { costInr: number; regionCode: RegionCode; methodId: ShipMethodId }) => void;
};

export function ShippingCalculator({ subtotalInr, weightKg, onQuote }: Props) {
  const { t, lang } = useI18n();
  const { region, setRegion, formatIn } = useRegion();
  const [methodId, setMethodId] = useState<ShipMethodId>("standard");
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<ReturnType<typeof quoteShipping> | null>(null);

  const methods = shippingTable[region.code];

  const calculate = () => {
    const quote = quoteShipping({
      regionCode: region.code,
      methodId,
      weightKg: Math.max(weightKg, 0.5),
      subtotalInr,
      postcode,
    });
    setResult(quote);
    onQuote({ costInr: quote.costInr, regionCode: region.code, methodId });
  };

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Truck className="size-4 text-gold" strokeWidth={1.5} />
        <h3 className="font-display text-xl">{t("ship.title")}</h3>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="eyebrow">{t("ship.region")}</Label>
          <Select
            value={region.code}
            onValueChange={(v) => {
              setRegion(v as RegionCode);
              setResult(null);
            }}
          >
            <SelectTrigger className="h-10 rounded-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regionList.map((r) => (
                <SelectItem key={r.code} value={r.code}>
                  {lang === "ta" ? r.countryTa : r.country} · {r.currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="eyebrow" htmlFor="ship-postcode">
            {region.postcodeLabel}
          </Label>
          <Input
            id="ship-postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder={region.code === "IN" ? "600001" : "10001"}
            className="h-10 rounded-none"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label className="eyebrow">{t("ship.method")}</Label>
          <Select
            value={methodId}
            onValueChange={(v) => {
              setMethodId(v as ShipMethodId);
              setResult(null);
            }}
          >
            <SelectTrigger className="h-10 rounded-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {methods.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {lang === "ta" ? m.labelTa : m.label} · {m.minDays}–{m.maxDays}{" "}
                  {t("ship.days")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button variant="goldOutline" size="xl" className="mt-5 w-full" onClick={calculate}>
        {t("ship.calculate")}
      </Button>

      {result && (
        <div className="mt-5 animate-fade-in border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {lang === "ta" ? result.method.labelTa : result.method.label}
            </span>
            <span className="font-medium">
              {result.free ? t("ship.free") : formatIn(result.costInr, region.code)}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("ship.result")}: {result.minDays}–{result.maxDays} {t("ship.days")}
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        {t("ship.freeNote")} {formatIn(regions[region.code].freeShippingInr, region.code)}.
      </p>
    </div>
  );
}
