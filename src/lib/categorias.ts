import type { Categoria } from "@/datos/tipos";

export const NOMBRE_CATEGORIA: Record<Categoria, string> = {
  exterior: "Exterior",
  sastreria: "Sastrería",
  denim: "Denim",
  calzado: "Calzado",
  accesorios: "Accesorios",
  vestidos: "Vestidos",
};

/** Chips del Inicio, en el orden del handoff (que no incluye Vestidos). */
export const CATEGORIAS_INICIO: Categoria[] = ["exterior", "sastreria", "denim", "calzado", "accesorios"];

/** Todas, para Explorar y Filtros (propuesta). */
export const CATEGORIAS: Categoria[] = ["exterior", "sastreria", "vestidos", "denim", "calzado", "accesorios"];

export const TALLAS = {
  ropa: ["XS", "S", "M", "L", "XL"],
  cintura: ["26", "28", "30", "31", "32", "33", "34"],
  calzado: ["37", "38", "39", "41", "42"],
  otras: ["Única"],
};

/** Grupos de condición. El handoff usa texto libre ("Excelente (9.5/10)"); se agrupa por el inicio. */
export const CONDICIONES = [
  { id: "como-nuevo", nombre: "Como nuevo", prefijo: "como nuevo" },
  { id: "impecable", nombre: "Impecable", prefijo: "impecable" },
  { id: "excelente", nombre: "Excelente", prefijo: "excelente" },
  { id: "muy-bueno", nombre: "Muy bueno", prefijo: "muy bueno" },
  { id: "patina", nombre: "Pátina original", prefijo: "patina" },
] as const;

export const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
