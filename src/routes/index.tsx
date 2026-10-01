import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, RefreshCcw, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-saree.jpg";
import loomImage from "@/assets/craft-loom.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, useParallax } from "@/components/site/Reveal";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indian Vastra — Handwoven Sarees, Lehengas & Sherwanis" },
      {
        name: "description",
        content:
          "Premium handloom Indian traditional wear for women and men. Shop sarees, lehengas, anarkalis, sherwanis and kurta sets with shipping to India, USA, Canada and Australia.",
      },
      {
        property: "og:title",
        content: "Indian Vastra — Handwoven Sarees, Lehengas & Sherwanis",
      },
      {
        property: "og:description",
        content:
          "Premium handloom Indian traditional wear for women and men, delivered worldwide.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const parallax = useParallax(0.08);

  const women = products.filter((p) => p.gender === "women");
  const men = products.filter((p) => p.gender === "men");

  const promises = [
    { icon: Globe2, key: "1" },
    { icon: Sparkles, key: "2" },
    { icon: RefreshCcw, key: "3" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
          <div ref={parallax} className="absolute inset-0 -top-[8%] h-[116%] will-change-transform">
            <img
              src={heroImage}
              alt="Woman in an ivory and gold Kanjivaram silk saree"
              width={1920}
              height={1200}
              className="size-full object-cover object-right"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <Reveal className="max-w-xl" variant="left">
                <p className="eyebrow">{t("hero.eyebrow")}</p>
                <div className="rule-gold mt-5 max-w-24" />
                <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  {t("hero.title")}
                </h1>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {t("hero.sub")}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button asChild variant="ink" size="xl">
                    <Link to="/collection">{t("hero.cta")}</Link>
                  </Button>
                  <Button asChild variant="goldOutline" size="xl">
                    <Link to="/craft">{t("hero.cta2")}</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{t("section.featured")}</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            {t("section.featured.sub")}
          </h2>
          <div className="rule-gold mx-auto mt-6 max-w-40" />
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* Craft band with parallax image */}
      <section className="relative overflow-hidden border-y border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
          <Reveal variant="zoom" className="overflow-hidden">
            <img
              src={loomImage}
              alt="Hands weaving gold zari thread on a wooden handloom"
              loading="lazy"
              width={1600}
              height={1008}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="eyebrow">{t("nav.about")}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {t("section.craft")}
            </h2>
            <div className="rule-gold mt-6 max-w-24" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("section.craft.sub")}
            </p>
            <Link
              to="/craft"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:text-gold"
            >
              {t("hero.cta2")} <ArrowRight className="size-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* For her / For him */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t("section.women")}</p>
          <div className="rule-gold mt-4 max-w-24" />
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {women.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 110} />
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="eyebrow">{t("section.men")}</p>
          <div className="rule-gold mt-4 max-w-24" />
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {men.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 110} />
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl">{t("section.promise")}</h2>
            <div className="rule-gold mx-auto mt-5 max-w-32" />
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {promises.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={i * 130} className="text-center">
                <Icon className="mx-auto size-6 text-gold" strokeWidth={1.3} />
                <h3 className="mt-5 font-display text-2xl">{t(`promise.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`promise.${key}.text`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl">
            {lang === "ta" ? "உங்கள் ஆடையைத் தேர்ந்தெடுங்கள்" : "Find your piece"}
          </h2>
          <p className="mt-5 text-muted-foreground">{t("hero.sub")}</p>
          <Button asChild variant="ink" size="xl" className="mt-9">
            <Link to="/collection">{t("hero.cta")}</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
