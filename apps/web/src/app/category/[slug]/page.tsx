import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@nimbus/catalog";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  return { title: cat?.name ?? "Category" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const items = getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Shop
      </p>
      <h1 className="mt-1 text-[32px] font-semibold leading-10 tracking-[-0.02em] text-ink">
        {cat.name}
      </h1>
      <p className="mt-2 max-w-lg text-[16px] leading-[26px] text-muted">
        {cat.description}
      </p>
      <div className="mt-4">
        <TrustBar className="text-left" />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-16 text-center text-muted">
          No pieces in this category yet.
        </p>
      )}
    </div>
  );
}
