"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User } from "lucide-react";
import { categories } from "@nimbus/catalog";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/format";

export function Header() {
  const pathname = usePathname();
  const { itemCount, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="text-[22px] font-semibold tracking-[-0.02em] text-ink"
        >
          Nimbus
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {categories.map((cat) => {
            const href = `/category/${cat.slug}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={cat.slug}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                  active
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                )}
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/#browse"
            className="hidden h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-black/[0.04] sm:inline-flex"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.75} />
          </Link>
          <Link
            href="/orders"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-black/[0.04]"
            aria-label="Account / Orders"
          >
            <User size={20} strokeWidth={1.75} />
          </Link>
          <Link
            href="/bag"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-black/[0.04]"
            aria-label="Bag"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {hydrated && itemCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-border px-5 py-2 md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium",
              pathname.startsWith(`/category/${cat.slug}`)
                ? "bg-ink text-white"
                : "text-muted"
            )}
          >
            {cat.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
