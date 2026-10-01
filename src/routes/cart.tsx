import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ShippingCalculator } from "@/components/site/ShippingCalculator";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { useRegion } from "@/lib/region";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Indian Vastra" },
      { name: "description", content: "Review your pieces and calculate shipping to India, USA, Canada or Australia." },
      { property: "og:title", content: "Your Cart — Indian Vastra" },
      { property: "og:description", content: "Review your pieces and calculate shipping." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, lang } = useI18n();
  const { format, region } = useRegion();
  const { detailed, setQty, remove, subtotalInr, weightKg } = useCart();
  const [shippingInr, setShippingInr] = useState<number | null>(null);

  const taxInr = subtotalInr * region.taxRate;
  const totalInr = subtotalInr + taxInr + (shippingInr ?? 0);

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl">{t("cart.title")}</h1>
        <div className="rule-gold mx-auto mt-6 max-w-32" />
        <p className="mt-6 text-muted-foreground">{t("cart.empty")}</p>
        <Button asChild variant="ink" size="xl" className="mt-8">
          <Link to="/collection">{t("cart.continue")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal>
        <h1 className="font-display text-5xl">{t("cart.title")}</h1>
        <div className="rule-gold mt-5 max-w-32" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="divide-y divide-border border-y border-border">
          {detailed.map(({ line, product }) => (
            <div key={line.id} className="flex gap-5 py-6">
              <img src={product.image} alt={product.name} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-24 object-cover sm:w-28" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">{lang === "ta" ? product.nameTa : product.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{line.size}</p>
                  </div>
                  <button onClick={() => remove(line.id)} aria-label={t("cart.remove")} className="text-muted-foreground hover:text-foreground">
                    <X className="size-4" strokeWidth={1.4} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button className="p-2" aria-label="-" onClick={() => setQty(line.id, line.qty - 1)}><Minus className="size-3" /></button>
                    <span className="w-8 text-center text-sm">{line.qty}</span>
                    <button className="p-2" aria-label="+" onClick={() => setQty(line.id, line.qty + 1)}><Plus className="size-3" /></button>
                  </div>
                  <span className="text-sm">{format(product.priceInr * line.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <ShippingCalculator subtotalInr={subtotalInr} weightKg={weightKg} onQuote={(q) => setShippingInr(q.costInr)} />

          <div className="border border-border bg-card p-6 text-sm">
            <Row label={t("cart.subtotal")} value={format(subtotalInr)} />
            <Row label={t("cart.shipping")} value={shippingInr === null ? "—" : shippingInr === 0 ? t("ship.free") : format(shippingInr)} />
            <Row label={`${t("cart.tax")} (${region.taxLabel})`} value={format(taxInr)} />
            <div className="rule-gold my-4" />
            <Row label={t("cart.total")} value={format(totalInr)} strong />
            <Button asChild variant="ink" size="xl" className="mt-6 w-full">
              <Link to="/checkout">{t("cart.checkout")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between py-1.5 ${strong ? "text-base font-medium" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
