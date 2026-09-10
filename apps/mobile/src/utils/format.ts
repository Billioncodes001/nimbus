export function formatNGN(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
