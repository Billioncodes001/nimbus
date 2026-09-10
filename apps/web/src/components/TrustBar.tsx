export function TrustBar({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-center text-[13px] leading-5 text-muted ${className}`}
    >
      Secure Paystack checkout · Easy returns · Ships across Nigeria
    </p>
  );
}
