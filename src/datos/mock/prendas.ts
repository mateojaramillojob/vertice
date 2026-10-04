import type { Categoria, Foto, Prenda, Vendedor } from "../tipos";
import { IMAGENES, type ClaveImagen } from "./imagenes";

export const VENDEDORES: Vendedor[] = [
  { id: "v1", nombre: "Valeria Ortiz", ciudad: "Ciudad de México", valoracion: 4.9, resenas: 128, ventas: 214, miembroDesde: "2023-02-11" },
  { id: "v2", nombre: "Mariana Castillo", ciudad: "Guadalajara", valoracion: 4.8, resenas: 64, ventas: 97, miembroDesde: "2023-08-30" },
  { id: "v3", nombre: "Sofía Hernández", ciudad: "Monterrey", valoracion: 5.0, resenas: 41, ventas: 52, miembroDesde: "2024-01-15" },
  { id: "v4", nombre: "Camila Rojas", ciudad: "Puebla", valoracion: 4.7, resenas: 23, ventas: 31, miembroDesde: "2024-06-02" },
  { id: "v5", nombre: "Daniela Morales", ciudad: "Querétaro", valoracion: 4.9, resenas: 87, ventas: 140, miembroDesde: "2022-11-19" },
  { id: "v6", nombre: "Lucía Fernández", ciudad: "Mérida", valoracion: 4.6, resenas: 18, ventas: 22, miembroDesde: "2025-03-08" },
  { id: "v7", nombre: "Andrés Gutiérrez", ciudad: "Ciudad de México", valoracion: 4.8, resenas: 56, ventas: 73, miembroDesde: "2023-05-21" },
  { id: "v8", nombre: "Santiago Ramírez", ciudad: "Oaxaca", valoracion: 4.9, resenas: 34, ventas: 45, miembroDesde: "2024-09-12" },
];

type Fila = {
  img: ClaveImagen;
  titulo: string;
  tituloCorto?: string;
  marca: string;
  marcaCorta?: string;
  categoria: Categoria;
  talla: string;
  condicion: string;
  precio: number;
  descripcion: string;
  proporcion?: number; // alto en "3:x"
  precioAnterior?: number;
};

// Las 8 primeras son las del handoff, en el mismo orden y con los mismos datos
// (design/code.html, atributos data-product). El orden alterna columnas:
// impares a la izquierda, pares a la derecha, como en el mockup.
const FILAS: Fila[] = [
  { img: "trench", titulo: "Trench Oversize Gamuzado", tituloCorto: "Trench Gamuzado", marca: "Massimo Dutti Studio", marcaCorta: "Massimo Dutti", categoria: "exterior", talla: "M", condicion: "Excelente (9.5/10)", precio: 1450, proporcion: 4.4, descripcion: "100% piel de serraje vacuno suave. Sin detalles de uso visibles. Pieza de sastrería invernal con cinturón ancho y solapas estructuradas." },
  { img: "vestido", titulo: "Vestido Lino Estructurado", tituloCorto: "Vestido Lino", marca: "COS Archive", marcaCorta: "COS", categoria: "vestidos", talla: "S", condicion: "Como nuevo", precio: 890, proporcion: 4.6, descripcion: "Lino orgánico peso medio sin teñir, escote recto geométrico y silueta arquitectónica minimalista. Cierre oculto en espalda." },
  { img: "pantalon", titulo: "Pantalón Plisado Pinzas", tituloCorto: "Pantalón Plisado", marca: "Arket Atelier", marcaCorta: "Arket", categoria: "sastreria", talla: "30 / M", condicion: "Excelente", precio: 780, proporcion: 4.6, descripcion: "Lana virgen fría con caída pesada. Tiro alto con pinzas dobles delanteras y dobladillo cónico impecable. Botones de cuerno natural." },
  { img: "blazer", titulo: "Blazer Cuadro Terra", tituloCorto: "Blazer Terra", marca: "Dries Van Noten (Arch)", marcaCorta: "Dries Van Noten", categoria: "sastreria", talla: "L", condicion: "Impecable", precio: 3200, proporcion: 4.1, descripcion: "Pieza coleccionable de sarga pesada en tono óxido tostado. Hombro estructurado y forro interior de cupro en contraste. Edición verificada." },
  { img: "botin", titulo: "Botín Chelsea Punta Cuadrada", tituloCorto: "Botín Chelsea", marca: "Acne Studios", categoria: "calzado", talla: "41 EU", condicion: "Muy Bueno (8.8/10)", precio: 2100, proporcion: 3.8, descripcion: "Piel curtida artesanal negra con suela vibram original colocada. Tacón cubano bajo de 3.5cm y elásticos laterales en tensión perfecta." },
  { img: "bolso", titulo: "Bolso Baguette Cuero Oliva", tituloCorto: "Bolso Baguette", marca: "Lemaire", categoria: "accesorios", talla: "Única", condicion: "Impecable con guardapolvo", precio: 4600, proporcion: 3.8, descripcion: "Cuero suave curtido en aceite vegetal color verde oliva profundo. Forro de lona de algodón natural. Incluye certificado de autenticidad Vértice." },
  { img: "cazadora", titulo: "Cazadora Vintage Piel Envejecida", tituloCorto: "Cazadora Vintage", marca: "Schott NYC Archive", marcaCorta: "Schott NYC", categoria: "exterior", talla: "L", condicion: "Pátina Original (9/10)", precio: 2850, proporcion: 4.4, descripcion: "Piel bovina envejecida con grano marcado y cremalleras de bronce macizo. Cuello tipo bomber con remate elástico." },
  { img: "jeans", titulo: "Jeans Selvedge Índigo", tituloCorto: "Jeans Selvedge", marca: "Studio D'Artisan", categoria: "denim", talla: "32", condicion: "Excelente (9.2/10)", precio: 1650, proporcion: 4.2, descripcion: "Denim japonés selvedge con orillo rojo, corte recto atemporal y lavado medio con bigotes naturales." },

  // A partir de aquí, mock adicional para el scroll infinito (no viene del handoff).
  { img: "trench", titulo: "Gabardina Clásica Cruzada", marca: "Zara", categoria: "exterior", talla: "M", condicion: "Muy bueno (8.5/10)", precio: 980, descripcion: "Gabardina de algodón con forro a cuadros, cinturón original y botones completos. Leve desgaste en puños." },
  { img: "pantalon", titulo: "Pantalón Sastre Gris", marca: "Arturo Calle", categoria: "sastreria", talla: "32 / M", condicion: "Excelente (9/10)", precio: 650, descripcion: "Lana fría con pinza sencilla y bota recta. Dobladillo original sin ajustes." },
  { img: "vestido", titulo: "Vestido Midi de Lino", marca: "Carla Fernández", categoria: "vestidos", talla: "M", condicion: "Impecable", precio: 2700, descripcion: "Lino mexicano con corte geométrico tradicional. Pieza de diseño de autor con etiqueta original." },
  { img: "blazer", titulo: "Blazer Terracota Oversize", marca: "Zara", categoria: "sastreria", talla: "M", condicion: "Excelente (9.1/10)", precio: 790, descripcion: "Mezcla de lana con hombreras suaves y forro completo. Botones originales." },
  { img: "botin", titulo: "Botín Chelsea Negro", marca: "Vélez", categoria: "calzado", talla: "39 EU", condicion: "Excelente (9.2/10)", precio: 1850, descripcion: "Cuero napa con suela de goma cosida. Elásticos firmes y plantilla original." },
  { img: "bolso", titulo: "Bolso Media Luna Oliva", marca: "Vélez", categoria: "accesorios", talla: "Única", condicion: "Excelente (9.3/10)", precio: 2450, descripcion: "Cuero de res con correa ajustable. Interior impecable con bolsillo con cierre." },
  { img: "cazadora", titulo: "Chamarra Bomber de Piel", marca: "Cuadra", categoria: "exterior", talla: "L", condicion: "Excelente (9/10)", precio: 4200, descripcion: "Piel de borrego con puños y cintura de punto. Cierre metálico original." },
  { img: "jeans", titulo: "Jeans 501 Original", marca: "Levi's", categoria: "denim", talla: "31", condicion: "Pátina original (8.8/10)", precio: 890, descripcion: "Corte recto clásico con lavado medio natural. Bigotes y desgaste auténticos." },

  { img: "trench", titulo: "Abrigo Camel de Lana", marca: "Mango", categoria: "exterior", talla: "S", condicion: "Excelente (9.3/10)", precio: 1690, precioAnterior: 1990, descripcion: "Lana mezcla con caída recta y bolsillos de vivo. Sin bolitas ni manchas." },
  { img: "pantalon", titulo: "Pantalón Wide Leg Carbón", marca: "Zara", categoria: "sastreria", talla: "28 / S", condicion: "Muy bueno (8.4/10)", precio: 420, descripcion: "Tiro alto y pierna amplia. Tela con caída; pequeño hilo suelto en la pretina ya reparado." },
  { img: "vestido", titulo: "Vestido Columna Marfil", marca: "Mango", categoria: "vestidos", talla: "S", condicion: "Como nuevo", precio: 640, descripcion: "Lino y viscosa con abertura lateral discreta. Usado una vez." },
  { img: "blazer", titulo: "Blazer de Lana Óxido", marca: "Massimo Dutti", categoria: "sastreria", talla: "L", condicion: "Impecable", precio: 1580, precioAnterior: 1790, descripcion: "Lana virgen de corte recto con bolsillos de cartera. Sin uso visible." },
  { img: "botin", titulo: "Botín Punta Cuadrada", marca: "Zara", categoria: "calzado", talla: "38 EU", condicion: "Muy bueno (8.3/10)", precio: 690, descripcion: "Piel sintética de alto brillo. Tacón de 4 cm con desgaste leve en la suela." },
  { img: "bolso", titulo: "Bolso Hobo de Piel", marca: "Bimba y Lola", categoria: "accesorios", talla: "Única", condicion: "Como nuevo", precio: 1890, descripcion: "Piel suave con herrajes dorados mate. Incluye guardapolvo." },
  { img: "cazadora", titulo: "Chamarra Biker Vintage", marca: "AllSaints", categoria: "exterior", talla: "M", condicion: "Pátina original (8.7/10)", precio: 3600, descripcion: "Piel de cordero lavada con herrajes envejecidos. Forro con una costura reforzada." },
  { img: "jeans", titulo: "Jeans Rectos Índigo", marca: "Zara", categoria: "denim", talla: "28", condicion: "Muy bueno (8.3/10)", precio: 350, descripcion: "Mezclilla rígida de tiro alto. Bajo sin cortar." },

  { img: "trench", titulo: "Trench Gamuza Café", marca: "Vélez", categoria: "exterior", talla: "L", condicion: "Impecable", precio: 3450, descripcion: "Gamuza bovina curtida en Colombia, forro de satín y hebilla metálica con logo grabado." },
  { img: "pantalon", titulo: "Pantalón de Lana Plisado", marca: "Massimo Dutti", categoria: "sastreria", talla: "30 / M", condicion: "Impecable", precio: 890, descripcion: "Lana 100 % con forro hasta la rodilla. Botones de repuesto incluidos." },
  { img: "vestido", titulo: "Vestido Recto Crudo", marca: "Silvia Tcherassi", categoria: "vestidos", talla: "XS", condicion: "Excelente (9.5/10)", precio: 5400, descripcion: "Lino de peso medio con escote recto y espalda baja. Edición verificada con certificado." },
  { img: "blazer", titulo: "Blazer Cruzado Ladrillo", marca: "Studio F", categoria: "sastreria", talla: "S", condicion: "Como nuevo", precio: 1190, descripcion: "Doble botonadura y solapa en pico. Usado una vez para un evento." },
  { img: "botin", titulo: "Botín Chelsea de Piel", marca: "Dr. Martens", categoria: "calzado", talla: "42 EU", condicion: "Pátina original (8.9/10)", precio: 2300, descripcion: "Modelo 2976 con costura amarilla. Piel ya domada, lista para usar." },
  { img: "bolso", titulo: "Bolso Croissant Verde", marca: "Mango", categoria: "accesorios", talla: "Única", condicion: "Muy bueno (8.4/10)", precio: 520, descripcion: "Piel sintética acolchada. Leve marca en una esquina inferior." },
  { img: "cazadora", titulo: "Chamarra de Piel Café", marca: "Levi's Vintage", categoria: "exterior", talla: "XL", condicion: "Muy bueno (8.5/10)", precio: 1980, descripcion: "Corte trucker en piel. Pátina uniforme y botones de presión completos." },
  { img: "jeans", titulo: "Jeans Selvedge Crudos", marca: "Naked & Famous", categoria: "denim", talla: "33", condicion: "Excelente (9.1/10)", precio: 1950, descripcion: "Denim japonés de 14 oz con orillo. Desgaste suave y uniforme." },

  { img: "trench", titulo: "Gabardina Midi Arena", marca: "Bimba y Lola", categoria: "exterior", talla: "M", condicion: "Como nuevo", precio: 2250, descripcion: "Algodón técnico repelente al agua. Usada dos veces; conserva la etiqueta interior de composición." },
  { img: "pantalon", titulo: "Pantalón Palazzo Gris Topo", marca: "Studio F", categoria: "sastreria", talla: "26 / XS", condicion: "Como nuevo", precio: 560, descripcion: "Tela crepé con cintura elástica posterior. Sin uso visible." },
  { img: "vestido", titulo: "Vestido Lino Sin Mangas", marca: "H&M Studio", categoria: "vestidos", talla: "M", condicion: "Muy bueno (8.2/10)", precio: 380, descripcion: "Lino orgánico con cierre invisible. Leve marca de doblez en el bajo." },
  { img: "blazer", titulo: "Saco Tostado", marca: "Arturo Calle", categoria: "sastreria", talla: "XL", condicion: "Muy bueno (8.6/10)", precio: 980, descripcion: "Lana fría con forro de cupro. Mínimo brillo en codos." },
  { img: "botin", titulo: "Botín Chelsea Plataforma", marca: "Steve Madden", categoria: "calzado", talla: "37 EU", condicion: "Como nuevo", precio: 1150, descripcion: "Plataforma ligera de 5 cm. Usado una vez en interiores; incluye caja." },
  { img: "bolso", titulo: "Bolso Baguette Musgo", marca: "Pineda Covalin", categoria: "accesorios", talla: "Única", condicion: "Impecable", precio: 2980, descripcion: "Piel con forro de seda estampada. Pieza de colección con caja." },
  { img: "cazadora", titulo: "Chamarra Aviador", marca: "Zara", categoria: "exterior", talla: "S", condicion: "Como nuevo", precio: 1250, descripcion: "Piel sintética con cuello de borrega desmontable. Sin marcas de uso." },
  { img: "jeans", titulo: "Jeans Mom Fit", marca: "Kosiuko", categoria: "denim", talla: "26", condicion: "Como nuevo", precio: 640, descripcion: "Mezclilla 100 % algodón con pretina alta. Usados un par de veces." },

  { img: "trench", titulo: "Trench Oversize Arena", marca: "Johanna Ortiz", categoria: "exterior", talla: "S", condicion: "Excelente (9.6/10)", precio: 6800, descripcion: "Pieza de colección con mangas abullonadas y cuello amplio. Incluye funda original. Edición verificada." },
  { img: "pantalon", titulo: "Pantalón Tailored Antracita", marca: "COS", categoria: "sastreria", talla: "34 / L", condicion: "Excelente (9.1/10)", precio: 740, descripcion: "Lana y poliéster reciclado con raya marcada. Bolsillos traseros sin abrir." },
  { img: "vestido", titulo: "Vestido Largo Natural", marca: "Pineda Covalin", categoria: "vestidos", talla: "L", condicion: "Excelente (9/10)", precio: 2150, descripcion: "Lino con bordado tono sobre tono en el cuello. Hecho en México." },
  { img: "blazer", titulo: "Blazer Estructurado Terra", marca: "Johanna Ortiz", categoria: "sastreria", talla: "M", condicion: "Excelente (9.7/10)", precio: 7200, descripcion: "Sarga pesada con hombro marcado y botones forrados. Incluye funda. Edición verificada." },
  { img: "botin", titulo: "Botín de Cuero Artesanal", marca: "Cuadra", categoria: "calzado", talla: "41 EU", condicion: "Impecable", precio: 3900, descripcion: "Cuero de res curtido a mano en León, Guanajuato. Suela de cuero con tacón cubano." },
  { img: "bolso", titulo: "Bolso de Hombro Oliva", marca: "Coach", categoria: "accesorios", talla: "Única", condicion: "Excelente (9/10)", precio: 3750, descripcion: "Piel granulada con logo grabado. Esquinas sin desgaste. Certificado de autenticidad Vértice." },
  { img: "cazadora", titulo: "Cazadora Envejecida", marca: "Vélez", categoria: "exterior", talla: "M", condicion: "Excelente (9.4/10)", precio: 3100, descripcion: "Cuero colombiano con acabado encerado. Bolsillos interiores y forro de algodón." },
  { img: "jeans", titulo: "Jeans Straight Vintage", marca: "Wrangler", categoria: "denim", talla: "34", condicion: "Excelente (9/10)", precio: 780, descripcion: "Lavado stone de los 90 con costuras originales. Botones metálicos completos." },
];

// Mismas proporciones que usa el handoff, repetidas para el mock adicional.
const PROPORCIONES = [4.4, 4.6, 4.6, 4.1, 3.8, 3.8, 4.4, 4.2];

// Las fechas del mock son relativas al momento de carga: "hace 2 h" sigue
// siendo cierto cualquier día que se abra la app.
export const AHORA_MOCK = new Date();

function fotos(img: ClaveImagen): Foto[] {
  const { url, alt } = IMAGENES[img];
  // El handoff trae una foto por prenda; el carrusel simula tomas de detalle
  // con recortes de la misma imagen hasta que lleguen las fotos reales.
  return [
    { url, alt },
    { url, alt: `Detalle: ${alt}`, encuadre: { escala: 1.9, origen: "50% 35%" } },
    { url, alt: `Detalle inferior: ${alt}`, encuadre: { escala: 2.3, origen: "50% 80%" } },
  ];
}

// El mock adicional está escrito agrupado por foto; se mezcla con semilla fija
// (mismo orden siempre) para que la grilla no repita la foto en la misma columna.
function mezclar<T>(lista: T[], semilla: number): T[] {
  const copia = [...lista];
  let s = semilla;
  const azar = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const ORDENADAS = [...FILAS.slice(0, 8), ...mezclar(FILAS.slice(8), 2026)];

export const PRENDAS: Prenda[] = ORDENADAS.map((f, i) => {
  const vendedor = VENDEDORES[i % VENDEDORES.length];
  // Las del handoff son las más recientes (horas); el resto se reparte en días.
  const horasAtras = i < 8 ? (i + 1) * 2 : 24 + (i - 8) * 15;
  return {
    id: String(i + 1),
    titulo: f.titulo,
    tituloCorto: f.tituloCorto,
    marca: f.marca,
    marcaCorta: f.marcaCorta,
    categoria: f.categoria,
    talla: f.talla,
    condicion: f.condicion,
    precio: f.precio,
    precioAnterior: f.precioAnterior,
    moneda: "MXN",
    descripcion: f.descripcion,
    fotos: fotos(f.img),
    proporcion: (f.proporcion ?? PROPORCIONES[i % PROPORCIONES.length]) / 3,
    vendedor,
    ciudad: vendedor.ciudad,
    publicadaEn: new Date(AHORA_MOCK.getTime() - horasAtras * 3_600_000).toISOString(),
    estado: "disponible",
    verificada: true,
  };
});
