import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ta";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.women": "Women",
  "nav.men": "Men",
  "nav.shop": "Collection",
  "nav.about": "Our Craft",
  "nav.contact": "Contact",
  "nav.cart": "Cart",
  "brand.tagline": "Handwoven Indian couture",
  "hero.eyebrow": "Since 1974 · Kanchipuram",
  "hero.title": "Heirloom weaves, quietly modern",
  "hero.sub":
    "Handloom sarees, lehengas, sherwanis and kurtas made by master weavers in India — delivered to India, the USA, Canada and Australia.",
  "hero.cta": "Shop the collection",
  "hero.cta2": "Discover our craft",
  "section.featured": "Featured pieces",
  "section.featured.sub": "A small edit of the season's most requested weaves.",
  "section.women": "For her",
  "section.men": "For him",
  "section.craft": "Woven by hand, never rushed",
  "section.craft.sub":
    "Every piece begins on a wooden handloom in Tamil Nadu. Our weavers are paid per piece, not per metre, so the work is never hurried.",
  "section.promise": "The Indian Vastra promise",
  "promise.1.title": "Worldwide delivery",
  "promise.1.text": "Tracked shipping to India, USA, Canada and Australia with duties made clear at checkout.",
  "promise.2.title": "Authentic handloom",
  "promise.2.text": "Silk mark certified weaves sourced directly from weaving families.",
  "promise.3.title": "Easy returns",
  "promise.3.text": "14 days to return unworn pieces, free within India.",
  "shop.title": "The collection",
  "shop.all": "All",
  "shop.women": "Women",
  "shop.men": "Men",
  "shop.sort": "Sort",
  "shop.sort.featured": "Featured",
  "shop.sort.low": "Price: low to high",
  "shop.sort.high": "Price: high to low",
  "shop.count": "pieces",
  "product.addToCart": "Add to cart",
  "product.added": "Added to your cart",
  "product.size": "Size",
  "product.fabric": "Fabric",
  "product.details": "Details",
  "product.shippingNote": "Ships in 3–5 days · Free standard shipping over the threshold shown at checkout",
  "product.back": "Back to collection",
  "cart.title": "Your cart",
  "cart.empty": "Your cart is empty.",
  "cart.continue": "Continue shopping",
  "cart.remove": "Remove",
  "cart.qty": "Qty",
  "cart.subtotal": "Subtotal",
  "cart.shipping": "Shipping",
  "cart.tax": "Estimated tax",
  "cart.total": "Total",
  "cart.checkout": "Proceed to checkout",
  "ship.title": "Shipping calculator",
  "ship.region": "Destination",
  "ship.postcode": "Postal / ZIP code",
  "ship.method": "Method",
  "ship.calculate": "Calculate shipping",
  "ship.free": "Free",
  "ship.days": "days",
  "ship.result": "Estimated delivery",
  "ship.freeNote": "Free standard shipping on orders above",
  "checkout.title": "Checkout",
  "checkout.contact": "Contact",
  "checkout.delivery": "Delivery address",
  "checkout.payment": "Payment",
  "checkout.name": "Full name",
  "checkout.email": "Email",
  "checkout.phone": "Phone",
  "checkout.address": "Address",
  "checkout.city": "City",
  "checkout.state": "State / Province",
  "checkout.postcode": "Postal / ZIP code",
  "checkout.country": "Country",
  "checkout.card": "Card number",
  "checkout.expiry": "Expiry",
  "checkout.cvc": "CVC",
  "checkout.place": "Place order",
  "checkout.summary": "Order summary",
  "checkout.success": "Thank you — your order is confirmed",
  "checkout.successSub": "A confirmation has been sent to your email. Your order number is",
  "checkout.keepShopping": "Keep shopping",
  "about.title": "Our craft",
  "contact.title": "Contact us",
  "contact.send": "Send message",
  "contact.message": "Message",
  "contact.sent": "Thank you — we'll reply within one business day.",
  "footer.rights": "All rights reserved.",
  "footer.shop": "Shop",
  "footer.help": "Help",
  "footer.regions": "We ship to India, USA, Canada and Australia.",
  "lang.label": "Language",
  "currency.label": "Region & currency",
};

const ta: Dict = {
  "nav.home": "முகப்பு",
  "nav.women": "பெண்கள்",
  "nav.men": "ஆண்கள்",
  "nav.shop": "தொகுப்பு",
  "nav.about": "எங்கள் கைவினை",
  "nav.contact": "தொடர்பு",
  "nav.cart": "கூடை",
  "brand.tagline": "கைத்தறி இந்திய ஆடைகள்",
  "hero.eyebrow": "1974 முதல் · காஞ்சிபுரம்",
  "hero.title": "பாரம்பரிய நெசவு, நவீன நேர்த்தி",
  "hero.sub":
    "இந்தியாவின் திறமையான நெசவாளர்களால் உருவாக்கப்பட்ட கைத்தறி புடவைகள், லெஹங்காக்கள், ஷெர்வானிகள் மற்றும் குர்தாக்கள் — இந்தியா, அமெரிக்கா, கனடா மற்றும் ஆஸ்திரேலியாவுக்கு அனுப்பப்படும்.",
  "hero.cta": "தொகுப்பைக் காண",
  "hero.cta2": "எங்கள் கைவினை",
  "section.featured": "சிறப்பு ஆடைகள்",
  "section.featured.sub": "இந்த பருவத்தில் அதிகம் விரும்பப்பட்ட நெசவுகள்.",
  "section.women": "அவளுக்காக",
  "section.men": "அவனுக்காக",
  "section.craft": "கையால் நெய்யப்பட்டது, அவசரம் இல்லை",
  "section.craft.sub":
    "ஒவ்வொரு ஆடையும் தமிழ்நாட்டின் மரத் தறியில் தொடங்குகிறது. எங்கள் நெசவாளர்களுக்கு மீட்டர் அல்ல, ஆடை அடிப்படையில் ஊதியம் வழங்கப்படுகிறது.",
  "section.promise": "இந்தியன் வஸ்திரா உறுதி",
  "promise.1.title": "உலகளாவிய விநியோகம்",
  "promise.1.text": "இந்தியா, அமெரிக்கா, கனடா மற்றும் ஆஸ்திரேலியாவுக்கு கண்காணிக்கப்படும் அனுப்புதல்.",
  "promise.2.title": "உண்மையான கைத்தறி",
  "promise.2.text": "சில்க் மார்க் சான்றளிக்கப்பட்ட நெசவுகள், நேரடியாக நெசவாளர் குடும்பங்களிடமிருந்து.",
  "promise.3.title": "எளிய திருப்பி அனுப்புதல்",
  "promise.3.text": "அணியாத ஆடைகளை 14 நாட்களுக்குள் திருப்பலாம்; இந்தியாவில் இலவசம்.",
  "shop.title": "தொகுப்பு",
  "shop.all": "அனைத்தும்",
  "shop.women": "பெண்கள்",
  "shop.men": "ஆண்கள்",
  "shop.sort": "வரிசை",
  "shop.sort.featured": "சிறப்பு",
  "shop.sort.low": "விலை: குறைவு முதல் அதிகம்",
  "shop.sort.high": "விலை: அதிகம் முதல் குறைவு",
  "shop.count": "ஆடைகள்",
  "product.addToCart": "கூடையில் சேர்",
  "product.added": "கூடையில் சேர்க்கப்பட்டது",
  "product.size": "அளவு",
  "product.fabric": "துணி",
  "product.details": "விவரங்கள்",
  "product.shippingNote": "3–5 நாட்களில் அனுப்பப்படும் · குறிப்பிட்ட தொகைக்கு மேல் இலவச அனுப்புதல்",
  "product.back": "தொகுப்புக்குத் திரும்பு",
  "cart.title": "உங்கள் கூடை",
  "cart.empty": "உங்கள் கூடை காலியாக உள்ளது.",
  "cart.continue": "வாங்குதலைத் தொடர",
  "cart.remove": "நீக்கு",
  "cart.qty": "எண்ணிக்கை",
  "cart.subtotal": "மொத்தம்",
  "cart.shipping": "அனுப்புதல்",
  "cart.tax": "மதிப்பிடப்பட்ட வரி",
  "cart.total": "இறுதித் தொகை",
  "cart.checkout": "பணம் செலுத்த செல்",
  "ship.title": "அனுப்புதல் கணக்கீடு",
  "ship.region": "சேருமிடம்",
  "ship.postcode": "அஞ்சல் குறியீடு",
  "ship.method": "முறை",
  "ship.calculate": "கட்டணத்தைக் கணக்கிடு",
  "ship.free": "இலவசம்",
  "ship.days": "நாட்கள்",
  "ship.result": "மதிப்பிடப்பட்ட வருகை",
  "ship.freeNote": "இதற்கு மேல் உள்ள ஆர்டர்களுக்கு இலவச அனுப்புதல்",
  "checkout.title": "பணம் செலுத்துதல்",
  "checkout.contact": "தொடர்பு",
  "checkout.delivery": "விநியோக முகவரி",
  "checkout.payment": "கட்டணம்",
  "checkout.name": "முழுப் பெயர்",
  "checkout.email": "மின்னஞ்சல்",
  "checkout.phone": "தொலைபேசி",
  "checkout.address": "முகவரி",
  "checkout.city": "நகரம்",
  "checkout.state": "மாநிலம்",
  "checkout.postcode": "அஞ்சல் குறியீடு",
  "checkout.country": "நாடு",
  "checkout.card": "அட்டை எண்",
  "checkout.expiry": "காலாவதி",
  "checkout.cvc": "CVC",
  "checkout.place": "ஆர்டர் செய்",
  "checkout.summary": "ஆர்டர் சுருக்கம்",
  "checkout.success": "நன்றி — உங்கள் ஆர்டர் உறுதி செய்யப்பட்டது",
  "checkout.successSub": "உறுதிப்படுத்தல் மின்னஞ்சல் அனுப்பப்பட்டது. உங்கள் ஆர்டர் எண்",
  "checkout.keepShopping": "மேலும் பார்க்க",
  "about.title": "எங்கள் கைவினை",
  "contact.title": "எங்களைத் தொடர்பு கொள்ள",
  "contact.send": "செய்தி அனுப்பு",
  "contact.message": "செய்தி",
  "contact.sent": "நன்றி — ஒரு வேலை நாளுக்குள் பதிலளிப்போம்.",
  "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  "footer.shop": "வாங்க",
  "footer.help": "உதவி",
  "footer.regions": "இந்தியா, அமெரிக்கா, கனடா மற்றும் ஆஸ்திரேலியாவுக்கு அனுப்புகிறோம்.",
  "lang.label": "மொழி",
  "currency.label": "பகுதி & நாணயம்",
};

const dicts: Record<Lang, Dict> = { en, ta };

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("iv-lang");
    if (saved === "ta" || saved === "en") setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("iv-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: string) => dicts[lang][key] ?? dicts.en[key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
