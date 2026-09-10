import Image from "next/image";
import Link from "next/link";
import type { Product } from "@nimbus/catalog";
import { formatNGN } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const badge =
    product.tags.includes("new") || product.category === "new"
      ? "New"
      : product.tags.includes("bestseller")
        ? "Bestseller"
        : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_8px_24px_rgba(26,26,26,0.06)] transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEAE5]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
          {product.category}
        </p>
        <h3 className="text-[16px] font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-[16px] font-semibold text-ink">
            {formatNGN(product.priceNGN)}
          </span>
          {product.compareAtNGN ? (
            <span className="text-[13px] text-muted line-through">
              {formatNGN(product.compareAtNGN)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
