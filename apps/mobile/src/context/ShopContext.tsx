import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "@nimbus/catalog";
import { colorName } from "../utils/catalog";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  colorId: string;
  colorName: string;
  size: string;
  sku: string;
  unitPriceNGN: number;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "paid";
  lines: CartLine[];
  subtotalNGN: number;
  guestEmail: string;
  guestName: string;
};

type ShopContextValue = {
  cart: CartLine[];
  orders: Order[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (args: {
    product: Product;
    colorId: string;
    size: string;
    qty?: number;
  }) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  placeOrder: (guest: { email: string; name: string }) => Order;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function lineKey(productId: string, colorId: string, size: string) {
  return `${productId}:${colorId}:${size}`;
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = useCallback(
    ({
      product,
      colorId,
      size,
      qty = 1,
    }: {
      product: Product;
      colorId: string;
      size: string;
      qty?: number;
    }) => {
      const variant = product.variants.find(
        (v) => v.colorId === colorId && v.size === size
      );
      if (!variant || variant.inventory <= 0) return;
      const key = lineKey(product.id, colorId, size);
      setCart((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: l.qty + qty } : l
          );
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            colorId,
            colorName: colorName(product, colorId),
            size,
            sku: variant.sku,
            unitPriceNGN: product.priceNGN,
            qty,
          },
        ];
      });
    },
    []
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((l) => l.key !== key);
      return prev.map((l) => (l.key === key ? { ...l, qty } : l));
    });
  }, []);

  const removeLine = useCallback((key: string) => {
    setCart((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback(
    (guest: { email: string; name: string }) => {
      const subtotalNGN = cart.reduce(
        (sum, l) => sum + l.unitPriceNGN * l.qty,
        0
      );
      const order: Order = {
        id: `ord-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
        status: "paid",
        lines: cart,
        subtotalNGN,
        guestEmail: guest.email,
        guestName: guest.name,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((n, l) => n + l.qty, 0),
    [cart]
  );
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, l) => sum + l.unitPriceNGN * l.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      orders,
      cartCount,
      cartSubtotal,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      placeOrder,
    }),
    [
      cart,
      orders,
      cartCount,
      cartSubtotal,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      placeOrder,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
