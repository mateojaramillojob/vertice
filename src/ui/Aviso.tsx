import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icono } from "./Icono";

type Tipo = "exito" | "error";

/**
 * Toast del handoff (#toastSuccess): oscuro, centrado, ícono cobalto.
 * La variante de error es propuesta.
 */
export function Aviso({ tipo = "exito", children, className }: { tipo?: Tipo; children: ReactNode; className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        "p-2.5 rounded-lg text-xs font-label text-center flex items-center justify-center gap-1.5",
        tipo === "exito" ? "bg-primary text-white" : "bg-error text-white",
        className,
      )}
    >
      <Icono nombre={tipo === "exito" ? "check_circle" : "error"} tam={16} className={tipo === "exito" ? "text-cobalt-light" : ""} />
      <span>{children}</span>
    </div>
  );
}
