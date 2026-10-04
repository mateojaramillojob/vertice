import type { Notificacion, Resena, Usuario } from "../tipos";
import { AHORA_MOCK, PRENDAS, VENDEDORES } from "./prendas";

const idDe = (titulo: string) => PRENDAS.find((p) => p.titulo === titulo)?.id;

const haceHoras = (h: number) => new Date(AHORA_MOCK.getTime() - h * 3_600_000).toISOString();

// La sesión del mock es la de la primera vendedora.
const yo = VENDEDORES[0];
export const USUARIO_ACTUAL: Usuario = {
  id: yo.id,
  nombre: yo.nombre,
  ciudad: yo.ciudad,
  miembroDesde: yo.miembroDesde,
  valoracion: yo.valoracion,
  resenas: yo.resenas,
  ventas: yo.ventas,
  compras: 37,
};

export const NOTIFICACIONES: Notificacion[] = [
  { id: "n1", tipo: "precio", titulo: "Bajó de precio una prenda guardada", cuerpo: "Abrigo Camel de Lana · Mango ahora cuesta $1,690 MXN (antes $1,990).", fecha: haceHoras(1), leida: false, prendaId: idDe("Abrigo Camel de Lana") },
  { id: "n2", tipo: "inspeccion", titulo: "Inspección física completada", cuerpo: "Tu Gabardina Clásica Cruzada pasó la revisión de Custodia Vértice y ya está publicada.", fecha: haceHoras(5), leida: false },
  { id: "n3", tipo: "guardado", titulo: "3 personas guardaron tu prenda", cuerpo: "Bolso Hobo de Piel · Bimba y Lola está entre los más guardados de la semana.", fecha: haceHoras(26), leida: true },
  { id: "n4", tipo: "precio", titulo: "Bajó de precio una prenda guardada", cuerpo: "Blazer de Lana Óxido · Massimo Dutti ahora cuesta $1,580 MXN (antes $1,790).", fecha: haceHoras(49), leida: true, prendaId: idDe("Blazer de Lana Óxido") },
  { id: "n5", tipo: "envio", titulo: "Tu compra va en camino", cuerpo: "Jeans 501 Original salió del centro de inspección rumbo a Ciudad de México.", fecha: haceHoras(72), leida: true },
  { id: "n6", tipo: "sistema", titulo: "Bienvenida a Vértice", cuerpo: "Cada prenda pasa por inspección física antes de llegar a ti. Así funciona la Custodia Vértice.", fecha: haceHoras(24 * 9), leida: true },
];

export const RESENAS: Resena[] = [
  { id: "r1", autor: "Mariana C.", ciudad: "Guadalajara", estrellas: 5, texto: "La gabardina llegó exactamente como en las fotos y el reporte de inspección fue muy detallado.", fecha: haceHoras(30) },
  { id: "r2", autor: "Andrés G.", ciudad: "Ciudad de México", estrellas: 5, texto: "Respondió rápido y el empaque fue impecable. Volvería a comprarle.", fecha: haceHoras(24 * 6) },
  { id: "r3", autor: "Lucía F.", ciudad: "Mérida", estrellas: 4, texto: "Todo bien con el bolso; tardó un día más de lo esperado en salir de inspección.", fecha: haceHoras(24 * 15) },
  { id: "r4", autor: "Sofía H.", ciudad: "Monterrey", estrellas: 5, texto: "Prenda en perfecto estado, la talla coincidía con las medidas que indicó.", fecha: haceHoras(24 * 33) },
];
