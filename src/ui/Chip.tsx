import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  activo?: boolean;
}

/**
 * Píldora de categoría o filtro. Activo e inactivo miden lo mismo (A8): el
 * activo lleva un borde de su mismo color, en el handoff no tenía y medía 2 px menos.
 */
export function Chip({ activo, className, children, ...resto }: Props) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      {...resto}
      className={cn(
        "relative toque-44 px-3.5 py-1.5 rounded-full border font-label text-xs tracking-tight whitespace-nowrap transition-colors",
        activo
          ? "bg-primary border-primary text-on-primary font-medium shadow-sm"
          : "bg-surface-container border-outline-subtle text-on-surface-variant hover:bg-surface-container-high",
        className,
      )}
    >
      {children}
    </button>
  );
}
