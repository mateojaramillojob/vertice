import { cn } from "@/lib/cn";
import { Icono } from "./Icono";

interface Props {
  /** Con nombre muestra iniciales (propuesta); sin nombre, el ícono del handoff. */
  nombre?: string;
  tam?: number;
  className?: string;
}

const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

/** Avatar del header del handoff: 32 px, fondo primary, anillo de 2 px. */
export function Avatar({ nombre, tam = 32, className }: Props) {
  return (
    <span
      className={cn("rounded-full bg-primary text-on-primary ring-2 ring-primary/10 flex items-center justify-center shrink-0", className)}
      style={{ width: tam, height: tam }}
    >
      {nombre ? (
        <span className="font-headline font-bold" style={{ fontSize: Math.round(tam * 0.38) }}>
          {iniciales(nombre)}
        </span>
      ) : (
        <Icono nombre="person" tam={Math.round(tam * 0.53)} />
      )}
    </span>
  );
}
