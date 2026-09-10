import Link from "next/link";
import { TrustBar } from "./TrustBar";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="text-[18px] font-semibold text-ink">Nimbus</p>
          <p className="mt-2 max-w-xs text-[14px] leading-6 text-muted">
            Quiet luxury fashion for West Africa. Editorial pieces, easy returns,
            ships nationwide.
          </p>
        </div>
        <div className="flex gap-10 text-[14px]">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Shop
            </p>
            <Link href="/category/women" className="text-ink hover:underline">
              Women
            </Link>
            <Link href="/category/men" className="text-ink hover:underline">
              Men
            </Link>
            <Link href="/category/new" className="text-ink hover:underline">
              New
            </Link>
            <Link
              href="/category/accessories"
              className="text-ink hover:underline"
            >
              Accessories
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Account
            </p>
            <Link href="/bag" className="text-ink hover:underline">
              Bag
            </Link>
            <Link href="/orders" className="text-ink hover:underline">
              Orders
            </Link>
            <Link href="/checkout" className="text-ink hover:underline">
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-4 md:px-8">
        <TrustBar />
      </div>
    </footer>
  );
}
