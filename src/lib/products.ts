import saree from "@/assets/product-saree.jpg";
import lehenga from "@/assets/product-lehenga.jpg";
import sherwani from "@/assets/product-sherwani.jpg";
import kurta from "@/assets/product-kurta.jpg";
import anarkali from "@/assets/product-anarkali.jpg";
import nehru from "@/assets/product-nehru.jpg";

export type Gender = "women" | "men";

export type Product = {
  id: string;
  name: string;
  nameTa: string;
  category: string;
  categoryTa: string;
  gender: Gender;
  /** Base price in INR — all currencies are converted from this. */
  priceInr: number;
  image: string;
  fabric: string;
  fabricTa: string;
  description: string;
  descriptionTa: string;
  weightKg: number;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "kanjivaram-ivory-saree",
    name: "Ivory Kanjivaram Silk Saree",
    nameTa: "தந்த நிற காஞ்சிபுரம் பட்டுப் புடவை",
    category: "Sarees",
    categoryTa: "புடவைகள்",
    gender: "women",
    priceInr: 32500,
    image: saree,
    fabric: "Pure mulberry silk, gold zari",
    fabricTa: "தூய பட்டு, தங்க ஜரிகை",
    description:
      "Handwoven over six weeks in Kanchipuram, this ivory saree carries a broad gold zari border and scattered buttas across the drape. Finished with a contrast pallu and unstitched blouse piece.",
    descriptionTa:
      "காஞ்சிபுரத்தில் ஆறு வாரங்கள் கைத்தறியில் நெய்யப்பட்டது. அகன்ற தங்க ஜரிகை கரையும், முழுவதும் சிறிய பூட்டாக்களும் கொண்டது. தைக்கப்படாத ரவிக்கைத் துணியுடன்.",
    weightKg: 0.9,
    sizes: ["Free size"],
  },
  {
    id: "midnight-bridal-lehenga",
    name: "Midnight Bridal Lehenga",
    nameTa: "இரவு நிற திருமண லெஹங்கா",
    category: "Lehengas",
    categoryTa: "லெஹங்காக்கள்",
    gender: "women",
    priceInr: 68000,
    image: lehenga,
    fabric: "Raw silk, zardozi hand embroidery",
    fabricTa: "பச்சைப் பட்டு, ஜர்தோசி கைவேலை",
    description:
      "A black raw silk lehenga with dense antique-gold zardozi florals, a sculpted blouse and a sheer embroidered dupatta. Made to order with bridal fitting notes.",
    descriptionTa:
      "பழமையான தங்க ஜர்தோசி பூவேலைப்பாடுகள் நிறைந்த கருப்பு பச்சைப் பட்டு லெஹங்கா. வடிவமைக்கப்பட்ட ரவிக்கை மற்றும் மெல்லிய துப்பட்டாவுடன்.",
    weightKg: 2.4,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "ivory-georgette-anarkali",
    name: "Ivory Georgette Anarkali",
    nameTa: "தந்த நிற ஜார்ஜெட் அனார்கலி",
    category: "Anarkali",
    categoryTa: "அனார்கலி",
    gender: "women",
    priceInr: 21500,
    image: anarkali,
    fabric: "Georgette, fine gold thread work",
    fabricTa: "ஜார்ஜெட், மெல்லிய தங்க நூல் வேலை",
    description:
      "A floor-sweeping anarkali in soft georgette with fine gold thread buttis, a scalloped hem and a matching embroidered dupatta. Light enough for long celebrations.",
    descriptionTa:
      "மென்மையான ஜார்ஜெட்டில் தரை வரை நீளும் அனார்கலி. மெல்லிய தங்க நூல் பூட்டிகள், அலங்கார விளிம்பு மற்றும் பொருந்தும் துப்பட்டாவுடன்.",
    weightKg: 1.1,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "ivory-silk-sherwani",
    name: "Ivory Silk Sherwani",
    nameTa: "தந்த நிற பட்டு ஷெர்வானி",
    category: "Sherwani",
    categoryTa: "ஷெர்வானி",
    gender: "men",
    priceInr: 54000,
    image: sherwani,
    fabric: "Tussar silk, tonal embroidery",
    fabricTa: "துசார் பட்டு, ஒரே நிற எம்ப்ராய்டரி",
    description:
      "A wedding sherwani in cream tussar silk with tonal thread motifs, a structured mandarin collar and hand-finished dome buttons. Includes churidar.",
    descriptionTa:
      "கிரீம் துசார் பட்டில் திருமண ஷெர்வானி. ஒரே நிற நூல் வடிவங்கள், நேர்த்தியான காலர் மற்றும் கை முடிக்கப்பட்ட பொத்தான்கள். சுரிதாருடன்.",
    weightKg: 2.1,
    sizes: ["38", "40", "42", "44", "46"],
  },
  {
    id: "onyx-kurta-set",
    name: "Onyx Cotton-Silk Kurta Set",
    nameTa: "கருப்பு பருத்தி-பட்டு குர்தா செட்",
    category: "Kurta Sets",
    categoryTa: "குர்தா செட்",
    gender: "men",
    priceInr: 12800,
    image: kurta,
    fabric: "Cotton-silk blend",
    fabricTa: "பருத்தி-பட்டு கலவை",
    description:
      "An everyday-festive kurta in black cotton-silk with a slim gold-embroidered collar band, side slits and a straight pyjama.",
    descriptionTa:
      "கருப்பு பருத்தி-பட்டில் பண்டிகை குர்தா. மெல்லிய தங்க எம்ப்ராய்டரி காலர், பக்க கீறல்கள் மற்றும் நேரான பைஜாமாவுடன்.",
    weightKg: 0.8,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "black-nehru-jacket",
    name: "Black Raw Silk Nehru Jacket",
    nameTa: "கருப்பு பச்சைப் பட்டு நேரு ஜாக்கெட்",
    category: "Jackets",
    categoryTa: "ஜாக்கெட்டுகள்",
    gender: "men",
    priceInr: 16400,
    image: nehru,
    fabric: "Raw silk, brass buttons",
    fabricTa: "பச்சைப் பட்டு, பித்தளை பொத்தான்கள்",
    description:
      "A tailored Nehru jacket in black raw silk with engraved brass buttons and a welt pocket. Layers over any kurta in the collection.",
    descriptionTa:
      "கருப்பு பச்சைப் பட்டில் தையல் நேரு ஜாக்கெட். செதுக்கப்பட்ட பித்தளை பொத்தான்கள் மற்றும் பாக்கெட்டுடன்.",
    weightKg: 0.7,
    sizes: ["38", "40", "42", "44", "46"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
