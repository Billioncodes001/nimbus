import Image from "next/image";
import Link from "next/link";
import {
  categories,
  getFeaturedProducts,
  products,
  EDITORIAL_IMAGES,
} from "@nimbus/catalog";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const latest = products.filter((p) => p.category === "new").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-[1200px] gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-14 md:px-8 md:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              West Africa · Quiet luxury
            </p>
            <h1 className="mt-3 max-w-md text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-ink md:text-[40px] md:leading-[48px]">
              Fashion that moves with the heat — and the city.
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-[26px] text-muted">
              Editorial pieces for Lagos evenings, Accra weekends, and everywhere
              in between. Easy returns. Ships across Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/category/new"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 text-[16px] font-semibold text-white transition-colors hover:bg-pressed"
              >
                Shop new arrivals
              </Link>
              <Link
                href="/category/women"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-[16px] font-semibold text-ink transition-colors hover:border-ink"
              >
                Browse women
              </Link>
            </div>
            <div className="mt-8">
              <TrustBar className="text-left" />
            </div>
          </div>
          <div className="relative min-h-[360px] md:min-h-[520px]">
            <Image
              src={EDITORIAL_IMAGES[0]}
              alt="Nimbus editorial fashion"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Collections
            </p>
            <h2 className="mt-1 text-[22px] font-semibold leading-7 text-ink">
              Shop by category
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="text-[18px] font-semibold text-white">{cat.name}</p>
                <p className="mt-0.5 text-[13px] text-white/80">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section
        id="browse"
        className="border-y border-border bg-surface/60"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Featured
              </p>
              <h2 className="mt-1 text-[22px] font-semibold leading-7 text-ink">
                Pieces we love right now
              </h2>
            </div>
            <Link
              href="/category/new"
              className="text-[14px] font-semibold text-accent hover:text-pressed"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* New strip */}
      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Just in
          </p>
          <h2 className="mt-1 text-[22px] font-semibold leading-7 text-ink">
            New arrivals
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {latest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
