"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Address, CartItem, Order } from "@nimbus/catalog";
import { makeOrderId, makePaymentRef } from "@/lib/format";
import { loadJSON, saveJSON } from "@/lib/storage";

const STORAGE_KEY = "nimbus.orders.v1";
const SHIPPING_NGN = 2500;

type OrdersContextValue = {
  orders: Order[];
  hydrated: boolean;
  placeOrder: (items: CartItem[], address: Address, subtotalNGN: number) => Order;
  getOrderById: (id: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrders(loadJSON<Order[]>(STORAGE_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveJSON(STORAGE_KEY, orders);
  }, [orders, hydrated]);

  const placeOrder = useCallback(
    (items: CartItem[], address: Address, subtotalNGN: number) => {
      const shippingNGN = subtotalNGN >= 75000 ? 0 : SHIPPING_NGN;
      const order: Order = {
        id: makeOrderId(),
        createdAt: new Date().toISOString(),
        items: items.map((i) => ({ ...i })),
        address: { ...address },
        subtotalNGN,
        shippingNGN,
        totalNGN: subtotalNGN + shippingNGN,
        paymentRef: makePaymentRef(),
        status: "Confirmed",
      };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const value = useMemo(
    () => ({ orders, hydrated, placeOrder, getOrderById }),
    [orders, hydrated, placeOrder, getOrderById]
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
