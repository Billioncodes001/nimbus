export type CategorySlug = "women" | "men" | "new" | "accessories";

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type ProductSize = string;

export type ProductVariant = {
  sku: string;
  colorId: string;
  size: ProductSize;
  inventory: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  tags: string[];
  priceNGN: number;
  compareAtNGN?: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  variants: ProductVariant[];
  featured?: boolean;
  materials?: string;
  care?: string;
};

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
};

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  priceNGN: number;
  size: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  image: string;
  quantity: number;
  sku: string;
};

export type Address = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
};

export type OrderStatus = "Confirmed" | "Processing" | "Shipped";

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  address: Address;
  subtotalNGN: number;
  shippingNGN: number;
  totalNGN: number;
  paymentRef: string;
  status: OrderStatus;
};
