export type {
  CategorySlug,
  ProductColor,
  ProductSize,
  ProductVariant,
  Product,
  Category,
  CartItem,
  Address,
  OrderStatus,
  Order,
} from "./types";

export { EDITORIAL_IMAGES, productImages } from "./images";
export { categories, getCategory } from "./categories";
export {
  products,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getVariant,
  isInStock,
} from "./products";
