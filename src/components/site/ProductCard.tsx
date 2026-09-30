import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useRegion } from "@/lib/region";
import type { Product } from "@/lib/products";
import { Reveal } from "./Reveal";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { lang } = useI18n();
  const { format } = useRegion();

  return (
    <Reveal delay={delay}>
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="group block"
      >
        <div className="relative overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-background/90 py-3 text-center text-[0.7rem] uppercase tracking-[0.24em] transition-transform duration-500 group-hover:translate-y-0">
            {lang === "ta" ? "விவரங்கள்" : "View piece"}
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="eyebrow">{lang === "ta" ? product.categoryTa : product.category}</p>
          <h3 className="font-display text-xl leading-snug">
            {lang === "ta" ? product.nameTa : product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{format(product.priceInr)}</p>
        </div>
      </Link>
    </Reveal>
  );
}
