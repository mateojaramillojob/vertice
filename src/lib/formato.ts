import type { Moneda } from "@/datos/tipos";

const LOCALE: Record<Moneda, string> = { MXN: "es-MX", ARS: "es-AR", COP: "es-CO", CLP: "es-CL" };

/** "$1,450 MXN" en México; cada moneda con el formato de su país. */
export function formatoPrecio(valor: number, moneda: Moneda) {
  const numero = new Intl.NumberFormat(LOCALE[moneda], { maximumFractionDigits: 0 }).format(valor);
  return `$${numero} ${moneda}`;
}

/** "hace 2 h", "hace 3 d". */
export function haceCuanto(iso: string, ahora: Date = new Date()) {
  const min = Math.max(0, Math.round((ahora.getTime() - new Date(iso).getTime()) / 60_000));
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  if (d < 30) return `hace ${d} d`;
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" }).format(new Date(iso));
}

export function fechaMesAnio(iso: string) {
  return new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(new Date(iso));
}
