import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { regionList } from "@/lib/region";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl uppercase tracking-[0.2em]">
            Indian <span className="text-gradient-gold">Vastra</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("footer.regions")}
          </p>
          <div className="rule-gold mt-6 max-w-xs" />
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {regionList.map((r) => `${r.country} (${r.currency})`).join("  ·  ")}
          </p>
        </div>

        <div>
          <p className="eyebrow">{t("footer.shop")}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/collection" className="transition-colors hover:text-foreground">
                {t("nav.shop")}
              </Link>
            </li>
            <li>
              <Link
                to="/collection"
                search={{ gender: "women" as const }}
                className="transition-colors hover:text-foreground"
              >
                {t("nav.women")}
              </Link>
            </li>
            <li>
              <Link
                to="/collection"
                search={{ gender: "men" as const }}
                className="transition-colors hover:text-foreground"
              >
                {t("nav.men")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{t("footer.help")}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/craft" className="transition-colors hover:text-foreground">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                {t("nav.contact")}
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition-colors hover:text-foreground">
                {t("ship.title")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs tracking-[0.14em] text-muted-foreground uppercase">
        © {new Date().getFullYear()} Indian Vastra · {t("footer.rights")}
      </div>
    </footer>
  );
}
