"use client";

import { cn } from "@/lib/format";

type Props = {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
  disabledSizes?: string[];
};

export function SizeChips({
  sizes,
  selected,
  onSelect,
  disabledSizes = [],
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const disabled = disabledSizes.includes(size);
        const active = selected === size;
        return (
          <button
            key={size}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(size)}
            className={cn(
              "min-h-11 min-w-11 rounded-xl border px-3 text-[14px] font-medium transition-colors",
              active && !disabled && "border-ink bg-ink text-white",
              !active &&
                !disabled &&
                "border-border bg-surface text-ink hover:border-ink",
              disabled &&
                "cursor-not-allowed border-border bg-[#F0EDE8] text-muted line-through opacity-60"
            )}
            aria-pressed={active}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
