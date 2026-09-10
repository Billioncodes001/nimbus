"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Order } from "@nimbus/catalog";
import { Button } from "@/components/Button";
import { useOrders } from "@/context/OrdersContext";
import { formatNGN } from "@/lib/format";

export default function OrderDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getOrderById, hydrated } = useOrders();
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    if (hydrated) setOrder(getOrderById(id));
  }, [hydrated, getOrderById, id]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[800px] px-5 py-16 text-muted md:px-8">
        Loading…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-[800px] px-5 py-20 text-center md:px-8">
        <h1 className="text-[28px] font-semibold text-ink">Order not found</h1>
        <Link href="/orders" className="mt-6 inline-block">
          <Button variant="secondary">Back to orders</Button>
        </Link>
      </div>
    );
  }

  const date = new Date(order.createdAt).toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-[800px] px-5 py-10 md:px-8 md:py-14">
      <Link
        href="/orders"
        className="text-[13px] font-medium text-muted hover:text-ink"
      >
        ← All orders
      </Link>
      <h1 className="mt-3 text-[32px] font-semibold text-ink">{order.id}</h1>
      <p className="mt-1 text-[14px] text-muted">
        {date} WAT · <span className="text-accent">{order.status}</span>
      </p>

      <div className="mt-8 space-y-4">
        {order.items.map((item) => (
          <div
            key={item.key}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-xl bg-[#EDEAE5]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <div className="flex flex-1 justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="mt-1 text-[13px] text-muted">
                  {item.colorName} · {item.size} · Qty {item.quantity}
                </p>
                <p className="mt-1 text-[12px] text-muted">SKU {item.sku}</p>
              </div>
              <p className="font-semibold text-ink">
                {formatNGN(item.priceNGN * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Shipping
          </p>
          <p className="mt-2 text-[14px] leading-6 text-ink">
            {order.address.fullName}
            <br />
            {order.address.street}
            <br />
            {order.address.city}, {order.address.state}
            <br />
            {order.address.phone}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Payment
          </p>
          <dl className="mt-2 space-y-1 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold">{formatNGN(order.subtotalNGN)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-semibold">
                {order.shippingNGN === 0
                  ? "Free"
                  : formatNGN(order.shippingNGN)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">{formatNGN(order.totalNGN)}</dd>
            </div>
            <p className="pt-2 text-[12px] text-muted">
              Ref {order.paymentRef}
            </p>
          </dl>
        </div>
      </div>
    </div>
  );
}
