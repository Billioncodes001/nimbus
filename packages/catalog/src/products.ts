import type { Product } from "./types";
import { productImages } from "./images";

const img = (...idxs: number[]) => productImages(...idxs);

function variantsFor(
  prefix: string,
  colors: { id: string; name: string }[],
  sizes: string[],
  inventory: (colorId: string, size: string) => number
) {
  return colors.flatMap((c) =>
    sizes.map((size) => ({
      sku: `${prefix}-${c.id}-${size}`.toUpperCase().replace(/\s+/g, ""),
      colorId: c.id,
      size,
      inventory: inventory(c.id, size),
    }))
  );
}

export const products: Product[] = [

  {
    id: "prod-lagos-linen",
    slug: "lagos-linen-midi-dress",
    name: "Lagos Linen Midi Dress",
    description:
      "Breathable linen midi with a soft waist tie. Made for humid afternoons from Lagos to Accra — light, polished, endlessly wearable.",
    category: "women",
    tags: ["bestseller", "linen", "featured"],
    priceNGN: 48500,
    compareAtNGN: 56000,
    images: img(0, 1, 2),
    colors: [
      { id: "sand", name: "Sand", hex: "#D4C4A8" },
      { id: "teal", name: "Teal", hex: "#0F6B5C" },
      { id: "ivory", name: "Ivory", hex: "#F5F0E8" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: variantsFor(
      "LAG-LIN",
      [
        { id: "sand", name: "Sand" },
        { id: "teal", name: "Teal" },
        { id: "ivory", name: "Ivory" },
      ],
      ["XS", "S", "M", "L", "XL"],
      // Demo OOS: XS + Teal disables Add to bag
      (colorId, size) => (colorId === "teal" && size === "XS" ? 0 : 12)
    ),
    featured: true,
    materials: "100% European linen",
    care: "Cold wash, line dry",
  },
  {
    id: "prod-001",
    slug: "ankara-midi-wrap-dress",
    name: "Ankara Midi Wrap Dress",
    description:
      "Vibrant Ankara wrap dress with adjustable waist tie. Perfect for Lagos brunch and Sunday service.",
    category: "women",
    tags: ["ankara", "dress", "featured"],
    priceNGN: 28500,
    compareAtNGN: 32000,
    images: img(0, 1, 2),
    colors: [
      { id: "gold", name: "Gold Print", hex: "#C9A227" },
      { id: "indigo", name: "Indigo Print", hex: "#3D4F7A" },
    ],
    sizes: ["S", "M", "L"],
    variants: variantsFor(
      "ANK-WRAP",
      [
        { id: "gold", name: "Gold Print" },
        { id: "indigo", name: "Indigo Print" },
      ],
      ["S", "M", "L"],
      (colorId, size) => (colorId === "indigo" && size === "S" ? 0 : size === "L" && colorId === "gold" ? 2 : 10)
    ),
    featured: true,
    materials: "100% cotton Ankara",
    care: "Hand wash cold · Line dry",
  },
  {
    id: "prod-002",
    slug: "adire-boubou-kaftan",
    name: "Adire Boubou Kaftan",
    description:
      "Flowing Adire-inspired boubou with wide sleeves. Soft cotton blend, breathable for humid days.",
    category: "women",
    tags: ["adire", "kaftan"],
    priceNGN: 32000,
    images: img(1, 3, 0),
    colors: [
      { id: "ocean", name: "Ocean Blue", hex: "#2F5D8C" },
      { id: "terra", name: "Terracotta", hex: "#C46A3A" },
    ],
    sizes: ["One Size"],
    variants: variantsFor(
      "ADR-BOU",
      [
        { id: "ocean", name: "Ocean Blue" },
        { id: "terra", name: "Terracotta" },
      ],
      ["One Size"],
      () => 12
    ),
    featured: true,
    materials: "Cotton blend",
    care: "Gentle machine wash",
  },
  {
    id: "prod-003",
    slug: "high-waist-palazzo-pants",
    name: "High-Waist Palazzo Pants",
    description: "Wide-leg palazzo in stretch crepe. Pairs with crop tops or ankara blouses.",
    category: "women",
    tags: ["pants", "palazzo"],
    priceNGN: 18500,
    images: img(2, 4, 1),
    colors: [
      { id: "black", name: "Black", hex: "#1A1A1A" },
      { id: "olive", name: "Olive", hex: "#556B2F" },
    ],
    sizes: ["S", "M", "L"],
    variants: variantsFor(
      "PAL-HW",
      [
        { id: "black", name: "Black" },
        { id: "olive", name: "Olive" },
      ],
      ["S", "M", "L"],
      (colorId, size) => (colorId === "olive" && size === "S" ? 0 : 14)
    ),
    materials: "Stretch crepe",
    care: "Machine wash cold",
  },
  {
    id: "prod-004",
    slug: "nimbus-classic-tee",
    name: "Nimbus Classic Tee",
    description: "Heavyweight cotton tee with subtle Nimbus chest embroidery. Everyday staple.",
    category: "men",
    tags: ["tee", "basics"],
    priceNGN: 9500,
    images: img(6, 7, 5),
    colors: [
      { id: "white", name: "White", hex: "#F5F5F0" },
      { id: "black", name: "Black", hex: "#1A1A1A" },
      { id: "forest", name: "Forest Green", hex: "#0F6B5C" },
    ],
    sizes: ["S", "M", "L", "XL"],
    variants: variantsFor(
      "NIM-TEE",
      [
        { id: "white", name: "White" },
        { id: "black", name: "Black" },
        { id: "forest", name: "Forest Green" },
      ],
      ["S", "M", "L", "XL"],
      (colorId, size) => (colorId === "forest" && size === "XL" ? 0 : 20)
    ),
    featured: true,
    materials: "Heavyweight cotton",
    care: "Machine wash cold",
  },
  {
    id: "prod-005",
    slug: "kente-trim-shirt",
    name: "Kente Trim Shirt",
    description: "Oxford shirt with hand-finished Kente trim on collar and cuffs. Smart-casual ready.",
    category: "men",
    tags: ["shirt", "kente"],
    priceNGN: 24500,
    images: img(7, 6, 4),
    colors: [
      { id: "white-kente", name: "White/Kente", hex: "#F8F6F0" },
      { id: "navy-kente", name: "Navy/Kente", hex: "#1B2A4A" },
    ],
    sizes: ["M", "L", "XL"],
    variants: variantsFor(
      "KEN-SHT",
      [
        { id: "white-kente", name: "White/Kente" },
        { id: "navy-kente", name: "Navy/Kente" },
      ],
      ["M", "L", "XL"],
      () => 8
    ),
    materials: "Oxford cotton · Kente trim",
    care: "Dry clean preferred",
  },
  {
    id: "prod-006",
    slug: "relaxed-chino-trousers",
    name: "Relaxed Chino Trousers",
    description: "Tapered chino in durable cotton twill. Office-to-owambe transition piece.",
    category: "men",
    tags: ["chino", "trousers"],
    priceNGN: 22000,
    images: img(5, 6, 7),
    colors: [
      { id: "khaki", name: "Khaki", hex: "#C4A574" },
      { id: "navy", name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["30", "32", "34"],
    variants: variantsFor(
      "CHI-REL",
      [
        { id: "khaki", name: "Khaki" },
        { id: "navy", name: "Navy" },
      ],
      ["30", "32", "34"],
      (colorId, size) => (colorId === "navy" && size === "30" ? 0 : 12)
    ),
    materials: "Cotton twill",
    care: "Machine wash cold",
  },
  {
    id: "prod-007",
    slug: "lagos-runner-sneakers",
    name: "Lagos Runner Sneakers",
    description: "Lightweight knit sneakers with rubber outsole. Built for city pavement and travel days.",
    category: "new",
    tags: ["sneakers", "new"],
    priceNGN: 45000,
    images: img(4, 5, 7),
    colors: [
      { id: "white", name: "White", hex: "#F5F5F0" },
      { id: "black", name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["40", "41", "42", "43"],
    variants: variantsFor(
      "LAG-RUN",
      [
        { id: "white", name: "White" },
        { id: "black", name: "Black" },
      ],
      ["40", "41", "42", "43"],
      (colorId, size) => (size === "40" && colorId === "black" ? 0 : 9)
    ),
    featured: true,
    materials: "Knit upper · Rubber outsole",
    care: "Wipe clean",
  },
  {
    id: "prod-008",
    slug: "cropped-ankara-bomber",
    name: "Cropped Ankara Bomber",
    description: "Cropped bomber jacket in mixed Ankara panels. Limited drop — New arrivals.",
    category: "new",
    tags: ["bomber", "ankara", "new"],
    priceNGN: 52000,
    compareAtNGN: 58000,
    images: img(3, 0, 2),
    colors: [{ id: "multi", name: "Multi Print", hex: "#0F6B5C" }],
    sizes: ["S", "M", "L"],
    variants: variantsFor(
      "ANK-BOM",
      [{ id: "multi", name: "Multi Print" }],
      ["S", "M", "L"],
      (_c, size) => (size === "L" ? 0 : 5)
    ),
    featured: true,
    materials: "Ankara cotton panels",
    care: "Dry clean only",
  },
  {
    id: "prod-009",
    slug: "linen-co-ord-set",
    name: "Linen Co-ord Set",
    description: "Two-piece linen shirt + shorts set. Soft sand wash. New season essential.",
    category: "new",
    tags: ["linen", "set", "new"],
    priceNGN: 38000,
    images: img(2, 1, 4),
    colors: [
      { id: "sand", name: "Sand", hex: "#D4C4A8" },
      { id: "sage", name: "Sage", hex: "#8FA68A" },
    ],
    sizes: ["S", "M", "L"],
    variants: variantsFor(
      "LIN-COO",
      [
        { id: "sand", name: "Sand" },
        { id: "sage", name: "Sage" },
      ],
      ["S", "M", "L"],
      () => 8
    ),
    materials: "100% linen",
    care: "Hand wash · Hang dry",
  },
  {
    id: "prod-010",
    slug: "aso-oke-crossbody-bag",
    name: "Aso Oke Crossbody Bag",
    description: "Compact crossbody lined with Aso Oke fabric accents. Fits phone, cards, and lipstick.",
    category: "accessories",
    tags: ["bag", "aso-oke"],
    priceNGN: 16500,
    images: img(5, 3, 1),
    colors: [
      { id: "gold", name: "Gold Weave", hex: "#C9A227" },
      { id: "wine", name: "Wine Weave", hex: "#6B2D3C" },
    ],
    sizes: ["One Size"],
    variants: variantsFor(
      "ASO-XBD",
      [
        { id: "gold", name: "Gold Weave" },
        { id: "wine", name: "Wine Weave" },
      ],
      ["One Size"],
      () => 18
    ),
    featured: true,
    materials: "Cotton · Aso Oke accents",
    care: "Spot clean",
  },
  {
    id: "prod-011",
    slug: "beaded-waist-beads-set",
    name: "Beaded Waist Beads Set",
    description: "Hand-strung waist beads in three lengths. Adjustable clasp. Pack of three.",
    category: "accessories",
    tags: ["beads", "accessories"],
    priceNGN: 4500,
    images: img(1, 5, 0),
    colors: [
      { id: "amber", name: "Amber Mix", hex: "#D4923A" },
      { id: "pearl", name: "Pearl Mix", hex: "#E8E0D5" },
    ],
    sizes: ["One Size"],
    variants: variantsFor(
      "WBD-SET",
      [
        { id: "amber", name: "Amber Mix" },
        { id: "pearl", name: "Pearl Mix" },
      ],
      ["One Size"],
      () => 35
    ),
    materials: "Glass beads · Nylon cord",
    care: "Keep dry",
  },
  {
    id: "prod-012",
    slug: "leather-slide-sandals",
    name: "Leather Slide Sandals",
    description: "Genuine leather slides with cushioned footbed. Indoor-outdoor comfort.",
    category: "accessories",
    tags: ["sandals", "leather"],
    priceNGN: 18000,
    images: img(7, 4, 6),
    colors: [
      { id: "tan", name: "Tan", hex: "#C4A574" },
      { id: "black", name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["40", "41", "42"],
    variants: variantsFor(
      "LEA-SLD",
      [
        { id: "tan", name: "Tan" },
        { id: "black", name: "Black" },
      ],
      ["40", "41", "42"],
      () => 10
    ),
    materials: "Genuine leather",
    care: "Wipe with damp cloth",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  if (slug === "all") return products;
  if (slug === "new") {
    return products.filter(
      (p) => p.category === "new" || p.tags.includes("new")
    );
  }
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getVariant(
  product: Product,
  colorId: string,
  size: string
) {
  return product.variants.find(
    (v) => v.colorId === colorId && v.size === size
  );
}

export function isInStock(
  product: Product,
  colorId: string,
  size: string
): boolean {
  const v = getVariant(product, colorId, size);
  return !!v && v.inventory > 0;
}
