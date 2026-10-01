import { createFileRoute, Link } from "@tanstack/react-router";
import loomImage from "@/assets/craft-loom.jpg";
import sareeImage from "@/assets/product-saree.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [
      { title: "Our Craft — Indian Vastra" },
      { name: "description", content: "How Indian Vastra pieces are handwoven by master weavers in Tamil Nadu and across India." },
      { property: "og:title", content: "Our Craft — Indian Vastra" },
      { property: "og:description", content: "Handwoven by master weavers, never rushed." },
    ],
  }),
  component: Craft,
});

const steps = {
  en: [
    ["Silk & yarn", "Mulberry silk and real zari are sourced from certified suppliers in Karnataka and Surat."],
    ["The loom", "Each saree takes three to six weeks on a traditional pit loom, woven by a single family."],
    ["Finishing", "Every piece is hand-checked, steamed and wrapped in muslin before it ships."],
  ],
  ta: [
    ["பட்டும் நூலும்", "கர்நாடகா மற்றும் சூரத்திலிருந்து சான்றளிக்கப்பட்ட பட்டு மற்றும் ஜரிகை."],
    ["தறி", "ஒவ்வொரு புடவையும் பாரம்பரிய தறியில் மூன்று முதல் ஆறு வாரங்கள் நெய்யப்படுகிறது."],
    ["முடித்தல்", "ஒவ்வொரு ஆடையும் கையால் சரிபார்க்கப்பட்டு மஸ்லின் துணியில் சுற்றப்படுகிறது."],
  ],
};

function Craft() {
  const { t, lang } = useI18n();
  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">Indian Vastra</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl">{t("section.craft")}</h1>
          <div className="rule-gold mx-auto mt-6 max-w-40" />
          <p className="mt-6 text-muted-foreground">{t("section.craft.sub")}</p>
        </Reveal>
      </section>
      <Reveal variant="zoom" className="mx-auto max-w-7xl overflow-hidden px-5 sm:px-8">
        <img src={loomImage} alt="Weaver at a handloom" width={1600} height={1008} className="aspect-[16/8] w-full object-cover" />
      </Reveal>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-3">
        {steps[lang].map(([title, text], i) => (
          <Reveal key={title} delay={i * 130}>
            <p className="font-display text-5xl text-gradient-gold">0{i + 1}</p>
            <h2 className="mt-4 font-display text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal variant="left">
          <img src={sareeImage} alt="Ivory silk saree" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-4xl">{t("section.promise")}</h2>
          <div className="rule-gold mt-5 max-w-24" />
          <p className="mt-6 text-muted-foreground">{t("promise.2.text")}</p>
          <Button asChild variant="ink" size="xl" className="mt-8">
            <Link to="/collection">{t("hero.cta")}</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
