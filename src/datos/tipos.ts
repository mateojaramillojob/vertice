// Modelo de datos de la app. La UI solo conoce estos tipos y la interfaz
// `Repositorio`; el mock y (después) Supabase los implementan.

export type Moneda = "MXN" | "ARS" | "COP" | "CLP";

export type Categoria = "exterior" | "sastreria" | "denim" | "calzado" | "accesorios" | "vestidos";

export type EstadoPrenda = "disponible" | "reservada" | "vendida";

export type Orden = "curada" | "recientes" | "precio-asc" | "precio-desc";

export interface Foto {
  url: string;
  alt: string;
  /** Solo en el mock: recorte para simular más fotos de la misma prenda en el carrusel. */
  encuadre?: { escala: number; origen: string };
}

export interface Vendedor {
  id: string;
  nombre: string;
  ciudad: string;
  valoracion: number; // 0–5
  resenas: number;
  ventas: number;
  miembroDesde: string; // ISO
}

export interface Prenda {
  id: string;
  titulo: string;
  /** Versión corta para la tarjeta del catálogo (el handoff usa "Trench Gamuzado" ahí). */
  tituloCorto?: string;
  marca: string;
  /** Versión corta para la tarjeta ("Massimo Dutti" en vez de "Massimo Dutti Studio"). */
  marcaCorta?: string;
  categoria: Categoria;
  talla: string;
  condicion: string;
  precio: number;
  moneda: Moneda;
  /** Texto del "Reporte de Inspección Vértice". */
  descripcion: string;
  fotos: Foto[];
  /** Alto ÷ ancho de la tarjeta en la grilla offset (3:4.4 → 4.4 / 3). */
  proporcion: number;
  vendedor: Vendedor;
  ciudad: string;
  publicadaEn: string; // ISO
  estado: EstadoPrenda;
  verificada: boolean;
  /** Precio anterior si bajó (para notificaciones y detalle). */
  precioAnterior?: number;
}

export interface FiltrosCatalogo {
  categoria?: Categoria | null;
  texto?: string;
  tallas?: string[];
  condiciones?: string[];
  precioMin?: number | null;
  precioMax?: number | null;
  orden?: Orden;
}

export interface Pagina<T> {
  items: T[];
  siguiente: string | null;
  total: number;
}

export type TipoNotificacion = "precio" | "inspeccion" | "guardado" | "envio" | "sistema";

export interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  cuerpo: string;
  fecha: string; // ISO
  leida: boolean;
  prendaId?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  ciudad: string;
  miembroDesde: string;
  valoracion: number;
  resenas: number;
  ventas: number;
  compras: number;
}

export interface Resena {
  id: string;
  autor: string;
  ciudad: string;
  estrellas: number;
  texto: string;
  fecha: string;
}
