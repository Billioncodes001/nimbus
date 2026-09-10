"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@nimbus/catalog";
import { getVariant, isInStock } from "@nimbus/catalog";
import { Button } from "@/components/Button";
import { ColorSwatches } from "@/components/ColorSwatches";
import { SizeChips } from "@/components/SizeChips";
import { TrustBar } from "@/components/TrustBar";
import { useCart } from "@/context/CartContext";
import { formatNGN, makeCartKey } from "@/lib/format";

export function AddToBagPanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);

  const variant = useMemo(
    () => getVariant(product, colorId, size),
    [product, colorId, size]
  );
  const inStock = useMemo(
    () => isInStock(product, colorId, size),
    [product, colorId, size]
  );

  // Disable sizes that are OOS for the selected color
  const disabledSizes = useMemo(
    () =>
      product.sizes.filter(
        (s) => !isInStock(product, colorId, s)
      ),
    [product, colorId]
  );

  const selectedColor = product.colors.find((c) => c.id === colorId);

  const onAdd = () => {
    if (!inStock || !variant || !selectedColor) return;
    addItem({
      key: makeCartKey(product.id, size, colorId),
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceNGN: product.priceNGN,
      size,
      colorId,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      image: product.images[0],
      sku: variant.sku,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {product.category}
        </p>
        <h1 className="mt-1 text-[28px] font-semibold leading-9 tracking-[-0.02em] text-ink md:text-[32px] md:leading-10">
          {product.name}
        </h1>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-[16px] font-semibold text-ink">
            {formatNGN(product.priceNGN)}
          </span>
          {product.compareAtNGN ? (
            <span className="text-[14px] text-muted line-through">
              {formatNGN(product.compareAtNGN)}
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-[16px] leading-[26px] text-muted">
          {product.description}
        </p>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink">
          Color
          {selectedColor ? (
            <span className="ml-2 font-normal text-muted">
              {selectedColor.name}
            </span>
          ) : null}
        </p>
        <ColorSwatches
          colors={product.colors}
          selected={colorId}
          onSelect={(id) => {
            setColorId(id);
            // if current size OOS for new color, jump to first in-stock size
            if (!isInStock(product, id, size)) {
              const next = product.sizes.find((s) => isInStock(product, id, s));
              if (next) setSize(next);
            }
          }}
        />
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink">Size</p>
        <SizeChips
          sizes={product.sizes}
          selected={size}
          onSelect={setSize}
          disabledSizes={disabledSizes}
        />
        {!inStock && (
          <p className="mt-2 text-[13px] text-[#B42318]">
            Out of stock in {selectedColor?.name} / {size}. Choose another
            option.
          </p>
        )}
      </div>

      {(product.materials || product.care) && (
        <div className="rounded-2xl border border-border bg-canvas px-4 py-3 text-[13px] leading-5 text-muted">
          {product.materials && (
            <p>
              <span className="font-semibold text-ink">Materials · </span>
              {product.materials}
            </p>
          )}
          {product.care && (
            <p className="mt-1">
              <span className="font-semibold text-ink">Care · </span>
              {product.care}
            </p>
          )}
        </div>
      )}

      <div className="sticky bottom-0 -mx-5 border-t border-border bg-canvas/95 px-5 py-4 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <Button
          fullWidth
          disabled={!inStock}
          onClick={onAdd}
          aria-disabled={!inStock}
        >
          {!inStock
            ? "Out of stock"
            : added
              ? "Added to bag"
              : "Add to bag"}
        </Button>
        {added && (
          <button
            type="button"
            onClick={() => router.push("/bag")}
            className="mt-2 w-full text-center text-[14px] font-semibold text-accent hover:text-pressed"
          >
            View bag →
          </button>
        )}
        <TrustBar className="mt-3" />
      </div>
    </div>
  );
}
