export function formatNGN(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function makeCartKey(
  productId: string,
  size: string,
  colorId: string
): string {
  return `${productId}::${size}::${colorId}`;
}

export function makeOrderId(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NIM-${n}`;
}

export function makePaymentRef(): string {
  return `PSK_mock_${Date.now().toString(36).toUpperCase()}`;
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
