import type { Product, ProductVariant } from "@nimbus/catalog";

export function findVariant(
  product: Product,
  colorId: string,
  size: string
): ProductVariant | undefined {
  return product.variants.find((v) => v.colorId === colorId && v.size === size);
}

export function isVariantOOS(
  product: Product,
  colorId: string,
  size: string
): boolean {
  const v = findVariant(product, colorId, size);
  return !v || v.inventory <= 0;
}

export function colorName(product: Product, colorId: string): string {
  return product.colors.find((c) => c.id === colorId)?.name ?? colorId;
}
