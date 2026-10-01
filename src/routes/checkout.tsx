import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { regionList, useRegion, type RegionCode } from "@/lib/region";
import { quoteShipping, shippingTable, type ShipMethodId } from "@/lib/shipping";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Indian Vastra" },
      { name: "description", content: "Secure checkout for your Indian Vastra order." },
      { property: "og:title", content: "Checkout — Indian Vastra" },
      { property: "og:description", content: "Secure checkout for your Indian Vastra order." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { t, lang } = useI18n();
  const { region, setRegion, format } = useRegion();
  const { detailed, subtotalInr, weightKg, clear } = useCart();
  const [methodId, setMethodId] = useState<ShipMethodId>("standard");
  const [postcode, setPostcode] = useState("");
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const quote = useMemo(
    () => quoteShipping({ regionCode: region.code, methodId, weightKg: Math.max(weightKg, 0.5), subtotalInr, postcode }),
    [region.code, methodId, weightKg, subtotalInr, postcode],
  );
  const taxInr = subtotalInr * region.taxRate;
  const totalInr = subtotalInr + taxInr + quote.costInr;

  if (orderNo) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center animate-fade-in">
        <CheckCircle2 className="mx-auto size-10 text-gold" strokeWidth={1.2} />
        <h1 className="mt-6 font-display text-4xl">{t("checkout.success")}</h1>
        <p className="mt-4 text-muted-foreground">
          {t("checkout.successSub")} <span className="font-medium text-foreground">{orderNo}</span>
        </p>
        <Button asChild variant="ink" size="xl" className="mt-8">
          <Link to="/collection">{t("checkout.keepShopping")}</Link>
        </Button>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <p className="text-muted-foreground">{t("cart.empty")}</p>
        <Button asChild variant="ink" size="xl" className="mt-8">
          <Link to="/collection">{t("cart.continue")}</Link>
        </Button>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNo(`IV-${Date.now().toString().slice(-7)}`);
    clear();
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal>
        <h1 className="font-display text-5xl">{t("checkout.title")}</h1>
        <div className="rule-gold mt-5 max-w-32" />
      </Reveal>

      <form onSubmit={submit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          <Section title={t("checkout.contact")}>
            <Field id="name" label={t("checkout.name")} required />
            <Field id="email" type="email" label={t("checkout.email")} required />
            <Field id="phone" type="tel" label={t("checkout.phone")} required className="sm:col-span-2" />
          </Section>

          <Section title={t("checkout.delivery")}>
            <div className="space-y-2 sm:col-span-2">
              <Label className="eyebrow">{t("checkout.country")}</Label>
              <Select value={region.code} onValueChange={(v) => setRegion(v as RegionCode)}>
                <SelectTrigger className="h-11 rounded-none"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {regionList.map((r) => (
                    <SelectItem key={r.code} value={r.code}>{lang === "ta" ? r.countryTa : r.country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Field id="address" label={t("checkout.address")} required className="sm:col-span-2" />
            <Field id="city" label={t("checkout.city")} required />
            <Field id="state" label={t("checkout.state")} required />
            <div className="space-y-2">
              <Label className="eyebrow" htmlFor="postcode">{region.postcodeLabel}</Label>
              <Input id="postcode" required value={postcode} onChange={(e) => setPostcode(e.target.value)} className="h-11 rounded-none" />
            </div>
          </Section>

          <div>
            <h2 className="font-display text-2xl">{t("ship.method")}</h2>
            <RadioGroup value={methodId} onValueChange={(v) => setMethodId(v as ShipMethodId)} className="mt-4 gap-3">
              {shippingTable[region.code].map((m) => {
                const q = quoteShipping({ regionCode: region.code, methodId: m.id, weightKg: Math.max(weightKg, 0.5), subtotalInr, postcode });
                return (
                  <Label key={m.id} htmlFor={`m-${m.id}`} className="flex cursor-pointer items-center gap-3 border border-border p-4 has-[[data-state=checked]]:border-gold">
                    <RadioGroupItem id={`m-${m.id}`} value={m.id} />
                    <span className="flex-1 font-normal">
                      {lang === "ta" ? m.labelTa : m.label}
                      <span className="block text-xs text-muted-foreground">{q.minDays}–{q.maxDays} {t("ship.days")}</span>
                    </span>
                    <span>{q.free ? t("ship.free") : format(q.costInr)}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          <Section title={t("checkout.payment")}>
            <Field id="card" label={t("checkout.card")} placeholder="4242 4242 4242 4242" required className="sm:col-span-2" />
            <Field id="exp" label={t("checkout.expiry")} placeholder="MM / YY" required />
            <Field id="cvc" label={t("checkout.cvc")} placeholder="123" required />
          </Section>
        </div>

        <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">{t("checkout.summary")}</h2>
          <div className="mt-5 space-y-4">
            {detailed.map(({ line, product }) => (
              <div key={line.id} className="flex gap-3 text-sm">
                <img src={product.image} alt="" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-14 object-cover" />
                <div className="flex-1">
                  <p>{lang === "ta" ? product.nameTa : product.name}</p>
                  <p className="text-xs text-muted-foreground">{line.size} · ×{line.qty}</p>
                </div>
                <span>{format(product.priceInr * line.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <Line label={t("cart.subtotal")} value={format(subtotalInr)} />
            <Line label={t("cart.shipping")} value={quote.free ? t("ship.free") : format(quote.costInr)} />
            <Line label={`${t("cart.tax")} (${region.taxLabel})`} value={format(taxInr)} />
          </div>
          <div className="rule-gold my-4" />
          <Line label={t("cart.total")} value={format(totalInr)} strong />
          <Button type="submit" variant="ink" size="xl" className="mt-6 w-full">
            <Lock /> {t("checkout.place")}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ id, label, className, ...rest }: { id: string; label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label className="eyebrow" htmlFor={id}>{label}</Label>
      <Input id={id} name={id} className="h-11 rounded-none" {...rest} />
    </div>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-base font-medium" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
