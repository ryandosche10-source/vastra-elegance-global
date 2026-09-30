import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "./products";

export type CartLine = {
  id: string;
  productId: string;
  size: string;
  qty: number;
};

type CartValue = {
  lines: CartLine[];
  detailed: { line: CartLine; product: Product }[];
  add: (productId: string, size: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotalInr: number;
  weightKg: number;
};

const CartContext = createContext<CartValue | null>(null);

const KEY = "iv-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((productId: string, size: string, qty = 1) => {
    setLines((prev) => {
      const id = `${productId}__${size}`;
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { id, productId, size, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (id: string) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const detailed = lines
      .map((line) => ({ line, product: getProduct(line.productId) }))
      .filter((x): x is { line: CartLine; product: Product } => Boolean(x.product));

    return {
      lines,
      detailed,
      add,
      setQty,
      remove,
      clear,
      count: detailed.reduce((n, d) => n + d.line.qty, 0),
      subtotalInr: detailed.reduce((n, d) => n + d.product.priceInr * d.line.qty, 0),
      weightKg: detailed.reduce((n, d) => n + d.product.weightKg * d.line.qty, 0),
    };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
