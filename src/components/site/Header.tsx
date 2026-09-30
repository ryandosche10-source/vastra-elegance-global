import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { regionList, useRegion, type RegionCode } from "@/lib/region";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { region, setRegion } = useRegion();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/collection", label: t("nav.shop") },
    { to: "/craft", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl tracking-[0.2em] uppercase">
            Indian <span className="text-gradient-gold">Vastra</span>
          </span>
          <span className="eyebrow mt-1 hidden text-[0.6rem] sm:block">
            {t("brand.tagline")}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative py-1 text-[0.78rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-foreground after:w-full" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <Select value={lang} onValueChange={(v) => setLang(v as "en" | "ta")}>
              <SelectTrigger
                aria-label={t("lang.label")}
                className="h-9 w-[104px] rounded-none border-border/70 text-xs tracking-[0.12em] uppercase"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region.code} onValueChange={(v) => setRegion(v as RegionCode)}>
              <SelectTrigger
                aria-label={t("currency.label")}
                className="h-9 w-[124px] rounded-none border-border/70 text-xs tracking-[0.12em] uppercase"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regionList.map((r) => (
                  <SelectItem key={r.code} value={r.code}>
                    {r.code} · {r.currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Link to="/cart" aria-label={t("nav.cart")} className="relative p-2">
            <ShoppingBag className="size-5" strokeWidth={1.4} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gold text-[0.6rem] font-medium text-gold-foreground">
                {count}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.4} /> : <Menu strokeWidth={1.4} />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex gap-2">
            <Select value={lang} onValueChange={(v) => setLang(v as "en" | "ta")}>
              <SelectTrigger className="h-9 flex-1 rounded-none text-xs uppercase">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region.code} onValueChange={(v) => setRegion(v as RegionCode)}>
              <SelectTrigger className="h-9 flex-1 rounded-none text-xs uppercase">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regionList.map((r) => (
                  <SelectItem key={r.code} value={r.code}>
                    {r.code} · {r.currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </header>
  );
}
