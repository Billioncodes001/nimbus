"use client";

import type { ProductColor } from "@nimbus/catalog";
import { cn } from "@/lib/format";

type Props = {
  colors: ProductColor[];
  selected: string;
  onSelect: (colorId: string) => void;
  disabledColorIds?: string[];
};

export function ColorSwatches({
  colors,
  selected,
  onSelect,
  disabledColorIds = [],
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const disabled = disabledColorIds.includes(color.id);
        const active = selected === color.id;
        return (
          <button
            key={color.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(color.id)}
            className={cn(
              "group flex min-h-11 items-center gap-2 rounded-xl border px-3 py-1.5 transition-colors",
              active && !disabled && "border-ink",
              !active &&
                !disabled &&
                "border-border hover:border-ink/40",
              disabled && "cursor-not-allowed opacity-45"
            )}
            aria-pressed={active}
            title={color.name}
          >
            <span
              className={cn(
                "h-5 w-5 rounded-full border border-black/10 ring-offset-2",
                active && "ring-2 ring-ink"
              )}
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-[13px] text-ink">{color.name}</span>
            {disabled && (
              <span className="text-[11px] uppercase tracking-wide text-muted">
                OOS
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
