import type { Category } from "./types";
import { EDITORIAL_IMAGES } from "./images";

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    description: "Dresses, jackets, and everyday polish",
    image: EDITORIAL_IMAGES[0],
  },
  {
    slug: "men",
    name: "Men",
    description: "Shirts, trousers, and weekend essentials",
    image: EDITORIAL_IMAGES[3],
  },
  {
    slug: "new",
    name: "New",
    description: "Just arrived for the season",
    image: EDITORIAL_IMAGES[5],
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Bags, jewelry, and finishing pieces",
    image: EDITORIAL_IMAGES[7],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
