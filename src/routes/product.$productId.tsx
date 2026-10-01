import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { useRegion } from "@/lib/region";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece unavailable — Indian Vastra" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Indian Vastra`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const { format } = useRegion();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "Free size");

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link
        to="/collection"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" strokeWidth={1.4} /> {t("product.back")}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <Reveal variant="zoom" className="overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>

        <Reveal delay={100} className="lg:py-6">
          <p className="eyebrow">{lang === "ta" ? product.categoryTa : product.category}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {lang === "ta" ? product.nameTa : product.name}
          </h1>
          <div className="rule-gold mt-6 max-w-24" />
          <p className="mt-6 text-2xl font-light">{format(product.priceInr)}</p>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {lang === "ta" ? product.descriptionTa : product.description}
          </p>

          <div className="mt-8">
            <p className="eyebrow">{t("product.size")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300",
                    size === s
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-gold/60",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="ink"
            size="xl"
            className="mt-8 w-full sm:w-auto"
            onClick={() => {
              add(product.id, size);
              toast.success(t("product.added"), {
                description: `${lang === "ta" ? product.nameTa : product.name} · ${size}`,
              });
            }}
          >
            {t("product.addToCart")}
          </Button>

          <dl className="mt-10 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-muted-foreground">{t("product.fabric")}</dt>
              <dd>{lang === "ta" ? product.fabricTa : product.fabric}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-muted-foreground">{t("product.details")}</dt>
              <dd className="flex items-center gap-2">
                <Check className="size-4 text-gold" strokeWidth={1.5} />
                {t("product.shippingNote")}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <div className="mt-28 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p, i) => (
          <ProductCard key={p.id} product={p} delay={i * 110} />
        ))}
      </div>
    </div>
  );
}
