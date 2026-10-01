import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Indian Vastra" },
      { name: "description", content: "Get in touch with Indian Vastra for sizing, custom orders and shipping questions." },
      { property: "og:title", content: "Contact — Indian Vastra" },
      { property: "og:description", content: "Sizing, custom orders and shipping help." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2">
      <Reveal>
        <h1 className="font-display text-5xl">{t("contact.title")}</h1>
        <div className="rule-gold mt-5 max-w-24" />
        <ul className="mt-10 space-y-5 text-sm text-muted-foreground">
          <li className="flex gap-3"><Mail className="size-4 text-gold" strokeWidth={1.4} /> hello@indianvastra.com</li>
          <li className="flex gap-3"><Phone className="size-4 text-gold" strokeWidth={1.4} /> +91 98765 43210</li>
          <li className="flex gap-3"><MapPin className="size-4 text-gold" strokeWidth={1.4} /> Kanchipuram, Tamil Nadu, India</li>
        </ul>
      </Reveal>
      <Reveal delay={120}>
        {sent ? (
          <p className="border border-gold/50 p-6 text-sm animate-fade-in">{t("contact.sent")}</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
            <div className="space-y-2"><Label className="eyebrow" htmlFor="cn">{t("checkout.name")}</Label><Input id="cn" required className="h-11 rounded-none" /></div>
            <div className="space-y-2"><Label className="eyebrow" htmlFor="ce">{t("checkout.email")}</Label><Input id="ce" type="email" required className="h-11 rounded-none" /></div>
            <div className="space-y-2"><Label className="eyebrow" htmlFor="cm">{t("contact.message")}</Label><Textarea id="cm" required rows={5} className="rounded-none" /></div>
            <Button type="submit" variant="ink" size="xl">{t("contact.send")}</Button>
          </form>
        )}
      </Reveal>
    </div>
  );
}
