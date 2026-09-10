"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import type { Order } from "@nimbus/catalog";
import { Button } from "@/components/Button";
import { TrustBar } from "@/components/TrustBar";
import { useOrders } from "@/context/OrdersContext";
import { formatNGN } from "@/lib/format";

export default function ConfirmationClient({
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
      <div className="mx-auto max-w-[720px] px-5 py-16 text-muted md:px-8">
        Loading…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-20 text-center md:px-8">
        <h1 className="text-[28px] font-semibold text-ink">Order not found</h1>
        <p className="mt-2 text-muted">
          It may still be syncing, or this link is from another browser.
        </p>
        <Link href="/orders" className="mt-6 inline-block">
          <Button>View orders</Button>
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
    <div className="mx-auto max-w-[720px] px-5 py-12 md:px-8 md:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        Payment successful
      </p>
      <h1 className="mt-2 text-[32px] font-semibold leading-10 text-ink">
        Thank you, {order.address.fullName.split(" ")[0]}
      </h1>
      <p className="mt-3 text-[16px] leading-[26px] text-muted">
        Order <span className="font-semibold text-ink">{order.id}</span> is
        confirmed. A mock Paystack receipt was recorded — no real charge was
        made.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.06)]">
        <dl className="grid gap-3 text-[14px] sm:grid-cols-2">
          <div>
            <dt className="text-muted">Placed</dt>
            <dd className="mt-0.5 font-semibold text-ink">{date} WAT</dd>
          </div>
          <div>
            <dt className="text-muted">Payment ref</dt>
            <dd className="mt-0.5 font-semibold text-ink">{order.paymentRef}</dd>
          </div>
          <div>
            <dt className="text-muted">Status</dt>
            <dd className="mt-0.5 font-semibold text-accent">{order.status}</dd>
          </div>
          <div>
            <dt className="text-muted">Total</dt>
            <dd className="mt-0.5 font-semibold text-ink">
              {formatNGN(order.totalNGN)}
            </dd>
          </div>
        </dl>

        <ul className="mt-6 space-y-3 border-t border-border pt-4">
          {order.items.map((i) => (
            <li key={i.key} className="flex justify-between gap-3 text-[14px]">
              <span className="text-muted">
                {i.name} · {i.colorName}/{i.size} ×{i.quantity}
              </span>
              <span className="font-semibold text-ink">
                {formatNGN(i.priceNGN * i.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-border pt-4 text-[14px] text-muted">
          Ships to {order.address.street}, {order.address.city},{" "}
          {order.address.state}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/orders/${order.id}`}>
          <Button>View order</Button>
        </Link>
        <Link href="/">
          <Button variant="secondary">Continue shopping</Button>
        </Link>
      </div>
      <TrustBar className="mt-6" />
    </div>
  );
}
