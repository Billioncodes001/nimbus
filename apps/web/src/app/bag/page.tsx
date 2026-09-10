"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import { TrustBar } from "@/components/TrustBar";
import { useCart } from "@/context/CartContext";
import { formatNGN } from "@/lib/format";

export default function BagPage() {
  const { items, subtotalNGN, updateQuantity, removeItem, hydrated } =
    useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 py-16 text-muted md:px-8">
        Loading bag…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 py-20 text-center md:px-8">
        <h1 className="text-[32px] font-semibold text-ink">Your bag is empty</h1>
        <p className="mt-2 max-w-sm text-[16px] leading-[26px] text-muted">
          Browse the collection and add pieces you love.
        </p>
        <Link href="/category/new" className="mt-8">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }

  const shipping = subtotalNGN >= 75000 ? 0 : 2500;

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
      <h1 className="text-[32px] font-semibold leading-10 text-ink">Bag</h1>
      <p className="mt-1 text-[14px] text-muted">
        {items.reduce((s, i) => s + i.quantity, 0)} item
        {items.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex gap-4 rounded-2xl border border-border bg-surface p-4 shadow-[0_8px_24px_rgba(26,26,26,0.04)]"
            >
              <Link
                href={`/product/${item.slug}`}
                className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EDEAE5]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-[16px] font-semibold text-ink hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[13px] text-muted">
                      {item.colorName} · {item.size}
                    </p>
                  </div>
                  <p className="text-[16px] font-semibold text-ink">
                    {formatNGN(item.priceNGN * item.quantity)}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-xl border border-border">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center text-ink"
                      onClick={() =>
                        updateQuantity(item.key, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-[14px] font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center text-ink"
                      onClick={() =>
                        updateQuantity(item.key, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-[13px] text-muted hover:text-ink"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.06)]">
          <h2 className="text-[18px] font-semibold text-ink">Order summary</h2>
          <dl className="mt-4 space-y-2 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold text-ink">
                {formatNGN(subtotalNGN)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-semibold text-ink">
                {shipping === 0 ? "Free" : formatNGN(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-[16px]">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-semibold text-ink">
                {formatNGN(subtotalNGN + shipping)}
              </dd>
            </div>
          </dl>
          {shipping > 0 && (
            <p className="mt-2 text-[12px] text-muted">
              Free shipping on orders over ₦75,000
            </p>
          )}
          <Link href="/checkout" className="mt-6 block">
            <Button fullWidth>Checkout</Button>
          </Link>
          <TrustBar className="mt-3" />
        </aside>
      </div>
    </div>
  );
}
