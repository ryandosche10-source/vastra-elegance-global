import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/site/Reveal";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { useRegion } from "@/lib/region";
import { tierFor, WHOLESALE_MIN_PIECES, wholesaleTiers, wholesaleUnit } from "@/lib/wholesale";

export const Route = createFileRoute("/wholesale")({
  validateSearch: (s: Record<string, unknown>): { product?: string } =>
    typeof s.product === "string" ? { product: s.product } : {},
  head: () => ({
    meta: [
      { title: "Wholesale — Indian Vastra" },
      { name: "description", content: "Wholesale Indian traditional wear for boutiques and stores. Tiered pricing from 10 pieces." },
      { property: "og:title", content: "Wholesale — Indian Vastra" },
      { property: "og:description", content: "Tiered wholesale pricing on handwoven sarees, lehengas and sherwanis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Wholesale,
});

function Wholesale() {
  const { product: preselect } = Route.useSearch();
  const { t, lang } = useI18n();
  const { format, region } = useRegion();
  const [qty, setQty] = useState<Record<string, number>>(() =>
    preselect ? { [preselect]: WHOLESALE_MIN_PIECES } : {},
  );
  const [ref, setRef] = useState<string | null>(null);

  const set = (id: string, n: number) => setQty((q) => ({ ...q, [id]: Math.max(0, n) }));
  const pieces = Object.values(qty).reduce((a, b) => a + b, 0);
  const retail = products.reduce((s, p) => s + p.priceInr * (qty[p.id] ?? 0), 0);
  const tier = tierFor(pieces);
  const estimate = tier
    ? products.reduce((s, p) => s + wholesaleUnit(p.priceInr, tier.discount) * (qty[p.id] ?? 0), 0)
    : retail;
  const ok = pieces >= WHOLESALE_MIN_PIECES;

  if (ref) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-5xl">{t("ws.title")}</h1>
        <div className="rule-gold mx-auto mt-5 max-w-24" />
        <p className="mt-8 text-muted-foreground">{t("ws.sent")}</p>
        <p className="mt-6 eyebrow">{t("ws.ref")}: {ref}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal>
        <h1 className="font-display text-5xl">{t("ws.title")}</h1>
        <div className="rule-gold mt-5 max-w-24" />
        <p className="mt-6 max-w-2xl text-muted-foreground">{t("ws.sub")}</p>
        <ul className="mt-8 flex flex-wrap gap-3 text-xs">
          {wholesaleTiers.map((tr) => (
            <li key={tr.min} className="border border-gold/50 px-4 py-2 uppercase tracking-[0.16em]">
              {tr.min}+ {t("ws.pieces")} · {Math.round(tr.discount * 100)}% {t("ws.off")}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {products.map((p) => {
            const n = qty[p.id] ?? 0;
            return (
              <li key={p.id} className="flex items-center gap-4 py-4">
                <img src={p.image} alt={p.name} width={64} height={80} className="h-20 w-16 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg">{lang === "ta" ? p.nameTa : p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("ws.retail")}: {format(p.priceInr)}
                    {tier && <> · <span className="text-foreground">{format(wholesaleUnit(p.priceInr, tier.discount))}</span></>}
                  </p>
                </div>
                <div className="flex items-center border border-border">
                  <button aria-label="Decrease" className="p-2" onClick={() => set(p.id, n - 1)}><Minus className="size-3" /></button>
                  <input
                    aria-label={`${t("ws.qty")} ${p.name}`}
                    value={n}
                    onChange={(e) => set(p.id, Number(e.target.value.replace(/\D/g, "")) || 0)}
                    className="w-12 bg-transparent text-center text-sm outline-none"
                  />
                  <button aria-label="Increase" className="p-2" onClick={() => set(p.id, n + 1)}><Plus className="size-3" /></button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit space-y-6 border border-border p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">{t("ws.summary")}</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>{t("ws.totalPieces")}</dt><dd>{pieces}</dd></div>
            <div className="flex justify-between text-muted-foreground"><dt>{t("ws.retailTotal")}</dt><dd className={tier ? "line-through" : ""}>{format(retail)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 text-base"><dt>{t("ws.estimate")}</dt><dd>{format(estimate)}</dd></div>
          </dl>
          {!ok && <p className="text-xs text-gold">{t("ws.needMore")} {WHOLESALE_MIN_PIECES - pieces}</p>}
          <p className="text-xs text-muted-foreground">{t("ws.shipNote")}</p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ok) return;
              setRef(`IVW-${Date.now().toString(36).toUpperCase().slice(-6)}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="space-y-1"><Label className="eyebrow" htmlFor="wb">{t("ws.business")}</Label><Input id="wb" required className="rounded-none" /></div>
            <div className="space-y-1"><Label className="eyebrow" htmlFor="wn">{t("checkout.name")}</Label><Input id="wn" required className="rounded-none" /></div>
            <div className="space-y-1"><Label className="eyebrow" htmlFor="we">{t("checkout.email")}</Label><Input id="we" type="email" required className="rounded-none" /></div>
            <div className="space-y-1"><Label className="eyebrow" htmlFor="wp">{t("ws.phone")}</Label><Input id="wp" type="tel" className="rounded-none" /></div>
            <div className="space-y-1"><Label className="eyebrow" htmlFor="wc">{t("ws.country")}</Label><Input id="wc" defaultValue={region.name} className="rounded-none" /></div>
            <div className="space-y-1"><Label className="eyebrow" htmlFor="wt">{t("ws.notes")}</Label><Textarea id="wt" rows={3} className="rounded-none" /></div>
            <Button type="submit" variant="ink" size="xl" className="w-full" disabled={!ok}>{t("ws.submit")}</Button>
          </form>
        </aside>
      </div>
    </div>
  );
}
