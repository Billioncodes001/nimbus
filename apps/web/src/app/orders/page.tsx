"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { useOrders } from "@/context/OrdersContext";
import { formatNGN } from "@/lib/format";

export default function OrdersPage() {
  const { orders, hydrated } = useOrders();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[900px] px-5 py-16 text-muted md:px-8">
        Loading orders…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] px-5 py-10 md:px-8 md:py-14">
      <h1 className="text-[32px] font-semibold text-ink">Orders</h1>
      <p className="mt-1 text-[14px] text-muted">
        Guest orders stored in this browser
      </p>

      {orders.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
          <p className="text-[16px] text-muted">No orders yet.</p>
          <Link href="/category/new" className="mt-6 inline-block">
            <Button>Start shopping</Button>
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {orders.map((order) => {
            const date = new Date(order.createdAt).toLocaleString("en-NG", {
              timeZone: "Africa/Lagos",
              dateStyle: "medium",
              timeStyle: "short",
            });
            return (
              <li key={order.id}>
                <Link
                  href={`/orders/${order.id}`}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(26,26,26,0.04)] transition hover:border-ink/20 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[16px] font-semibold text-ink">
                      {order.id}
                    </p>
                    <p className="mt-1 text-[13px] text-muted">
                      {date} WAT · {order.items.length} item
                      {order.items.length === 1 ? "" : "s"} · {order.status}
                    </p>
                  </div>
                  <p className="text-[16px] font-semibold text-ink">
                    {formatNGN(order.totalNGN)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
