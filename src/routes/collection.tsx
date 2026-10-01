import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Search = { gender?: "women" | "men" | undefined };

export const Route = createFileRoute("/collection")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    gender: search["gender"] === "women" || search["gender"] === "men" ? search["gender"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "The Collection — Indian Vastra" },
      {
        name: "description",
        content:
          "Browse handwoven sarees, lehengas, anarkalis, sherwanis, kurta sets and Nehru jackets from Indian Vastra.",
      },
      { property: "og:title", content: "The Collection — Indian Vastra" },
      {
        property: "og:description",
        content: "Handwoven Indian traditional wear for women and men.",
      },
    ],
  }),
  component: Collection,
});

function Collection() {
  const { t } = useI18n();
  const { gender } = Route.useSearch();
  const navigate = useNavigate({ from: "/collection" });
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const list = useMemo(() => {
    const filtered = gender ? products.filter((p) => p.gender === gender) : products;
    const sorted = [...filtered];
    if (sort === "low") sorted.sort((a, b) => a.priceInr - b.priceInr);
    if (sort === "high") sorted.sort((a, b) => b.priceInr - a.priceInr);
    return sorted;
  }, [gender, sort]);

  const tabs = [
    { value: undefined, label: t("shop.all") },
    { value: "women" as const, label: t("shop.women") },
    { value: "men" as const, label: t("shop.men") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal className="text-center">
        <p className="eyebrow">Indian Vastra</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl">{t("shop.title")}</h1>
        <div className="rule-gold mx-auto mt-6 max-w-40" />
      </Reveal>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => navigate({ search: { gender: tab.value } })}
              className={cn(
                "relative py-1 text-xs uppercase tracking-[0.22em] transition-colors",
                gender === tab.value
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {list.length} {t("shop.count")}
          </span>
          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="h-9 w-[210px] rounded-none text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">{t("shop.sort.featured")}</SelectItem>
              <SelectItem value="low">{t("shop.sort.low")}</SelectItem>
              <SelectItem value="high">{t("shop.sort.high")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} delay={(i % 3) * 110} />
        ))}
      </div>
    </div>
  );
}
