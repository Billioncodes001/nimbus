import OrderDetailClient from "./OrderDetailClient";

export function generateStaticParams() {
  // Placeholder for static export; real order ids are resolved client-side from local storage.
  return [{ id: "demo" }];
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <OrderDetailClient params={params} />;
}
