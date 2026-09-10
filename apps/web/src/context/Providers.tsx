"use client";

import { CartProvider } from "./CartContext";
import { OrdersProvider } from "./OrdersContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <OrdersProvider>{children}</OrdersProvider>
    </CartProvider>
  );
}
