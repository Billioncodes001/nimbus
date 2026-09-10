/** Shared 3:4 editorial Unsplash URLs — use same set on web + Expo */
export const EDITORIAL_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1067&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1067&fit=crop",
] as const;

export function productImages(...indexes: number[]): string[] {
  return indexes.map((i) => EDITORIAL_IMAGES[i % EDITORIAL_IMAGES.length]);
}
