import ConfirmationClient from "./ConfirmationClient";

export function generateStaticParams() {
  // Placeholder for static export; real order ids are resolved client-side from local storage.
  return [{ id: "demo" }];
}

export default function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ConfirmationClient params={params} />;
}
