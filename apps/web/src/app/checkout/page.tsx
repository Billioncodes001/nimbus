"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Address } from "@nimbus/catalog";
import { Button } from "@/components/Button";
import { TrustBar } from "@/components/TrustBar";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { formatNGN } from "@/lib/format";

const empty: Address = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalNGN, clearCart, hydrated } = useCart();
  const { placeOrder } = useOrders();
  const [address, setAddress] = useState<Address>(empty);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotalNGN >= 75000 ? 0 : 2500;
  const total = subtotalNGN + shipping;

  const setField = (key: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!address.fullName.trim()) return "Full name is required";
    if (!address.email.trim() || !address.email.includes("@"))
      return "Valid email is required";
    if (!address.phone.trim()) return "Phone is required";
    if (!address.street.trim()) return "Street address is required";
    if (!address.city.trim()) return "City is required";
    if (!address.state.trim()) return "State is required";
    return null;
  };

  const onPay = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    if (items.length === 0) {
      setError("Your bag is empty");
      return;
    }
    setError(null);
    setPaying(true);
    // Mock Paystack — no real network call
    await new Promise((r) => setTimeout(r, 1400));
    const order = placeOrder(items, address, subtotalNGN);
    clearCart();
    setPaying(false);
    router.push(`/confirmation/${order.id}`);
  };

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 py-16 text-muted md:px-8">
        Loading…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-20 text-center md:px-8">
        <h1 className="text-[28px] font-semibold text-ink">Nothing to checkout</h1>
        <Link href="/category/women" className="mt-6 inline-block">
          <Button>Browse shop</Button>
        </Link>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-14">
      <h1 className="text-[32px] font-semibold text-ink">Checkout</h1>
      <p className="mt-1 text-[14px] text-muted">
        Guest checkout · Mock Paystack (no real payment)
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void onPay();
          }}
        >
          {(
            [
              ["fullName", "Full name", "Ada Okonkwo"],
              ["email", "Email", "ada@example.com"],
              ["phone", "Phone", "+234 801 234 5678"],
              ["street", "Street address", "12 Admiralty Way"],
              ["city", "City", "Lagos"],
              ["state", "State", "Lagos"],
            ] as const
          ).map(([key, label, placeholder]) => (
            <label key={key} className="block text-[13px] font-semibold text-ink">
              {label}
              <input
                className={fieldClass}
                value={address[key]}
                onChange={(e) => setField(key, e.target.value)}
                placeholder={placeholder}
                autoComplete={
                  key === "email"
                    ? "email"
                    : key === "phone"
                      ? "tel"
                      : key === "fullName"
                        ? "name"
                        : "street-address"
                }
                type={key === "email" ? "email" : "text"}
              />
            </label>
          ))}

          {error && (
            <p className="rounded-xl bg-[#FEF3F2] px-4 py-3 text-[14px] text-[#B42318]">
              {error}
            </p>
          )}

          <Button fullWidth type="submit" disabled={paying}>
            {paying ? "Processing with Paystack…" : "Pay with Paystack"}
          </Button>
          <TrustBar />
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-[16px] font-semibold text-ink">
            {items.length} item{items.length === 1 ? "" : "s"}
          </h2>
          <ul className="mt-4 space-y-3 border-b border-border pb-4">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between gap-3 text-[13px]">
                <span className="text-muted">
                  {i.name} · {i.colorName}/{i.size} ×{i.quantity}
                </span>
                <span className="shrink-0 font-semibold text-ink">
                  {formatNGN(i.priceNGN * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold">{formatNGN(subtotalNGN)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-semibold">
                {shipping === 0 ? "Free" : formatNGN(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-[16px]">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">{formatNGN(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
