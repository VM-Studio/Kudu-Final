// src/components/data/products.ts
// ===============================================
// Catálogo de productos KUDU (PDF 2025) mapeado a TS
// Imágenes locales: public/products/... (paths relativos)
// Imágenes adicionales: usar `externalImages` con URLs absolutas
// ===============================================

export type Spec = { k: string; v: string };

export type Product = {
  id: string;                 // SKU / Código
  name: string;               // Nombre comercial
  category: "Purificadores" | "Campanas" | "Extractores" | "Hornos" | "Anafes";
  line?: string;              // Sub-línea dentro de la categoría (Extensible, 1 Motor, Creta, Rodas, etc.)
  short?: string;             // Resumen corto de venta
  image: string;              // Imagen principal (public/products/…)
  images?: string[];          // Galería local adicional (paths en /products)
  externalImages?: string[];  // Galería adicional por URLs absolutas
  barcode?: string;
  variants?: string[];        // Colores/medidas, si aplica
  badges?: string[];
  specs?: Spec[];             // Especificaciones técnicas clave
  dimensions?: Spec[];
gallery?: string[];         // Medidas relevantes (clave-valor)
};

// Helper para armar paths locales de imágenes (evita typos)
const img = (...parts: string[]) => `/products/${parts.join("/")}`;
// URL absoluta?
const isAbsoluteURL = (u: string) => /^https?:\/\//i.test(u);

// Enlace al detalle: si hay galería, la paso por query (?imgs=...)
function buildProductHref(p: Product) {
  if (p.gallery && p.gallery.length) {
    const qs = new URLSearchParams();
    for (const src of p.gallery) qs.append('imgs', src);
    return `/catalogo/${encodeURIComponent(p.id)}?${qs.toString()}`;
  }
  return `/catalogo/${encodeURIComponent(p.id)}`;
}


/* =========================================================
 * PURIFICADORES
 * ======================================================= */
export const PRODUCTS: Product[] = [
  // ---------- Extensibles ----------
  {
    id: "KU.PU700.SS",
    name: "Purificador Extensible Cromo",
    category: "Purificadores",
    line: "Extensible",
    barcode: "7798339900612",
    short: "1 motor, 340 m³/h, 2×LED 2W, filtros de aluminio + carbón.",
    image: "purificadores/extensible/pu700-ss_2.jpg",
    images: [
        "/productos/purificadores/purifi1.png",
        "/productos/purificadores/purifi2.png",
        "/productos/purificadores/purifi3.png",  
      ],
    
    specs: [
      { k: "Potencia", v: "145 W" },
      { k: "Motor", v: "1" },
      { k: "Velocidades", v: "2" },
      { k: "Absorción", v: "340 m³/h" },
      { k: "Iluminación", v: "2× LED 2 W" },
      { k: "Filtros", v: "Aluminio + 2 carbón activado" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Alimentación", v: "200 V – 50 Hz" },
      { k: "Ruido", v: "Motor silencioso" },
      { k: "Color", v: "Acero Inoxidable" },
    ],
    dimensions: [
      { k: "Ancho", v: "59,8 cm" },
      { k: "Fondo", v: "27,6 cm" },
      { k: "Altura", v: "4,2–16 cm" },
      { k: "Prof. frontal", v: "9,8–51 cm (según extensión)" },
    ],
  },
  {
    id: "KU.PU700.NG",
    name: "Purificador Extensible Negro",
    category: "Purificadores",
    line: "Extensible",
    barcode: "7798387196500",
    short: "1 motor, 340 m³/h, 2×LED 2W, filtros de aluminio + carbón.",
    image: "purificadores/extensible/pu700-ng_2.jpg",
    images: [
        "/productos/purificadores/purifi2.png",
        "/productos/purificadores/purifi4.png",
        
      ],
    specs: [
      { k: "Potencia", v: "145 W" },
      { k: "Motor", v: "1" },
      { k: "Velocidades", v: "2" },
      { k: "Absorción", v: "340 m³/h" },
      { k: "Iluminación", v: "2× LED 2 W" },
      { k: "Filtros", v: "Aluminio + 2 carbón activado" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Alimentación", v: "200 V – 50 Hz" },
      { k: "Color", v: "Negro" },
    ],
    dimensions: [
      { k: "Ancho", v: "59,8 cm" },
      { k: "Fondo", v: "27,6 cm" },
      { k: "Altura", v: "4,2–16 cm" },
    ],
  },

  // ---------- 1 Motor (PU601) ----------
 
  {
    id: "KU.PU601.BL",
    name: "Purificador 1 Motor Blanco",
    category: "Purificadores",
    line: "1 Motor",
    barcode: "7798339901169",
    short: "3 velocidades, 250 m³/h, LED 2W, filtros aluminio lavables.",
    image: "purificadores/1-motor/puri1.png",
    images: [
        "/productos/purificadores/purifi5.png",
        "/productos/purificadores/purifi6.png",
        "/productos/purificadores/purifi7.png",
        "/productos/purificadores/purifi8.png",
        
      ],
    specs: [
      { k: "Velocidades", v: "3" },
      { k: "Absorción", v: "250 m³/h" },
      { k: "Potencia total", v: "150 W" },
      { k: "Iluminación", v: "LED 2 W" },
      { k: "Filtros", v: "Aluminio lavables" },
    ],
  },
  {
    id: "KU.PU601.SS",
    name: "Purificador 1 Motor Acero",
    category: "Purificadores",
    line: "1 Motor",
    barcode: "7798339901183",
    short: "3 velocidades, 250 m³/h, LED 2W, filtros aluminio lavables.",
    image: "purificadores/1-motor/puri2.png",
    images: [
        "/productos/purificadores/purifi9.png",
       
      ],
    specs: [
      { k: "Velocidades", v: "3" },
      { k: "Absorción", v: "250 m³/h" },
      { k: "Potencia total", v: "150 W" },
      { k: "Iluminación", v: "LED 2 W" },
      { k: "Filtros", v: "Aluminio lavables" },
    ],
    badges: ["Compacto y eficiente"],
  },
  {
    id: "KU.PU601.NG",
    name: "Purificador 1 Motor Negro",
    category: "Purificadores",
    line: "1 Motor",
    barcode: "7798387196012",
    short: "3 velocidades, 250 m³/h, LED 2W, filtros aluminio lavables.",
    image: "/productos/purificador3.png",
    images: [
        "/productos/purificadores/purifi9.png",
       
      ],
    specs: [
      { k: "Velocidades", v: "3" },
      { k: "Absorción", v: "250 m³/h" },
      { k: "Potencia total", v: "150 W" },
    ],
  },

  // ---------- 2 Motores (PU602) ----------
  {
    id: "KU.PU602.BL",
    name: "Purificador 2 Motores Blanco",
    category: "Purificadores",
    line: "2 Motores",
    barcode: "7798339901176",
    short: "3 velocidades, 440 m³/h, LED 2W, filtros aluminio lavables.",
    image: "/productos/purificador4.png",
    images: [
        "/productos/purificadores/purifi10.png",
       
      ],
    specs: [
      { k: "Velocidades", v: "3" },
      { k: "Absorción", v: "440 m³/h" },
      { k: "Potencia total", v: "150 W" },
    ],
  },
  {
    id: "KU.PU602.SS",
    name: "Purificador 2 Motores Acero",
    category: "Purificadores",
    line: "2 Motores",
    barcode: "7798339901190",
    short: "3 velocidades, 440 m³/h, LED 2W, filtros aluminio lavables.",
    image: "/productos/purificador5.png",
    images: [
        "/productos/purificadores/purifi10.png",
       
      ],
    specs: [
      { k: "Velocidades", v: "3" },
      { k: "Absorción", v: "440 m³/h" },
      { k: "Potencia total", v: "150 W" },
    ],
  },
  {
    id: "KU.PU602.NG",
    name: "Purificador 2 Motores Negro",
    category: "Purificadores",
    line: "2 Motores",
    barcode: "7798387196500",
    short: "3 velocidades, 440 m³/h, LED 2W, filtros aluminio lavables.",
    image: "/purificadores/2-motores/pu602-ng.jpg",
    images: [
        "/productos/purificadores/purifi10.png",
       
      ],
    specs: [
      { k: "Velocidades", v: "3" },
      { k: "Absorción", v: "440 m³/h" },
      { k: "Potencia total", v: "150 W" },
    ],
  },

  // ---------- Digital ----------
  {
    id: "KU.PU.DIGITAL",
    name: "Purificador Digital (Con salida al exterior)",
    category: "Purificadores",
    line: "Digital",
    short: "500 m³/h, panel inoxidable, 3 velocidades, salida Ø150 mm.",
    image: "/purificadores/digital/pu-digital.jpg",
    images: [
        "/productos/purificadores/purifi11.png",
       
      ],
    specs: [
      { k: "Tensión", v: "220–240 V ~ 50/60 Hz" },
      { k: "Velocidades", v: "3" },
      { k: "Motor", v: "1 × 130 W" },
      { k: "Absorción", v: "500 m³/h" },
      { k: "Iluminación", v: "2 × LED 1,5 W" },
      { k: "Filtros", v: "Aluminio 3 capas" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Terminación", v: "Acero Inoxidable" },
    ],
  },

  /* =========================================================
   * CAMPANAS
   * ======================================================= */
  // --- Creta 60 ---
  {
    id: "KU-CC60SS",
    name: "Campana Creta 60 Cromo",
    category: "Campanas",
    line: "Creta",
    barcode: "7798339902524",
    short: "380 m³/h, 3 velocidades, tubo 400 mm, 2 filtros de aluminio.",
    image: "/productos/campana2.png",
    images: [
        "/productos/campanas/camp1.png",
        "/productos/campanas/camp2.png",
        "/productos/campanas/camp3.png",
        "/productos/campanas/camp4.png",
        
      ],
    specs: [
      { k: "Potencia", v: "65 W (Clase I)" },
      { k: "Absorción", v: "380 m³/h" },
      { k: "Iluminación", v: "2 × 40 W" },
      { k: "Velocidades", v: "3" },
      { k: "Filtros", v: "2 de aluminio (5 capas)" },
      { k: "Tubo", v: "400 mm" },
      { k: "Garantía", v: "2 años" },
    ],
    dimensions: [
      { k: "Ancho", v: "59,5 cm" },
      { k: "Fondo", v: "48 cm" },
      { k: "Altura", v: "98 cm (cuerpo + chimenea)" },
    ],
  },
  {
    id: "KU-CC60NG",
    name: "Campana Creta 60 Negro",
    category: "Campanas",
    line: "Creta",
    barcode: "7798387195978",
    short: "380 m³/h, 3 velocidades, 2 filtros aluminio.",
    image: "/productos/campana3.png",
    images: [
        "/productos/campanas/camp1.png",
        
      ],
    specs: [
      { k: "Potencia", v: "65 W (Clase I)" },
      { k: "Absorción", v: "380 m³/h" },
      { k: "Iluminación", v: "2 × 40 W" },
      { k: "Velocidades", v: "3" },
      { k: "Filtros", v: "2 de aluminio (5 capas)" },
      { k: "Tubo", v: "400 mm" },
      { k: "Garantía", v: "2 años" },
    ],
    dimensions: [
      { k: "Ancho", v: "59,5 cm" },
      { k: "Fondo", v: "48 cm" },
      { k: "Altura", v: "98 cm (cuerpo + chimenea)" },
    ],
  },

  // --- Creta 90 ---
  {
    id: "KU-CC90SS",
    name: "Campana Creta 90 Cromo",
    category: "Campanas",
    line: "Creta",
    barcode: "7798339902531",
    short: "380 m³/h, 3 velocidades, 3 filtros aluminio.",
    image: "/productos/campana4.png",
    images: [
        "/productos/campanas/camp5.png",
        "/productos/campanas/camp6.png",
        "/productos/campanas/camp7.png",
        "/productos/campanas/camp8.png",
        
      ],
    specs: [
      { k: "Absorción", v: "380 m³/h" },
      { k: "Velocidades", v: "3" },
      { k: "Iluminación", v: "2 × 40 W" },
      { k: "Filtros", v: "3 de aluminio (5 capas)" },
    ],
  },

  // --- Rodas 60 (Inox / Negro) ---
  {
    id: "KU-CM60SS",
    name: "Campana Rodas 60 Cromo",
    category: "Campanas",
    line: "Rodas",
    barcode: "7798387192014",
    short: "Motor 130 W, 380 m³/h, 3 velocidades, 2 filtros aluminio, 2×LED 1,5 W.",
    image: "/productos/campana5.png",
    images: [
        "/productos/campanas/camp9.png",
        "/productos/campanas/camp10.png",
        "/productos/campanas/camp11.png",
        "/productos/campanas/camp12.png",
        
      ],
    specs: [
      { k: "Motor", v: "130 W" },
      { k: "Absorción", v: "380 m³/h" },
      { k: "Iluminación", v: "2 × LED 1,5 W" },
      { k: "Velocidades", v: "3" },
      { k: "Filtros", v: "2 de aluminio (5 capas)" },
      { k: "Garantía", v: "2 años" },
    ],
  },
  {
    id: "KU-CM60NG",
    name: "Campana Rodas 60 Negro",
    category: "Campanas",
    line: "Rodas",
    barcode: "7798387196128",
    short: "Motor 130 W, 380 m³/h, 3 velocidades, 2 filtros aluminio, 2×LED 1,5 W.",
    image: "/productos/campana6.png",
    images: [
        "/productos/campanas/camp13.png",
        "/productos/campanas/camp14.png",
        "/productos/campanas/camp15.png",
        "/productos/campanas/camp16.png",
        "/productos/campanas/camp17.png",
        
      ],
    specs: [
      { k: "Motor", v: "130 W" },
      { k: "Absorción", v: "380 m³/h" },
      { k: "Iluminación", v: "2 × LED 1,5 W" },
      { k: "Velocidades", v: "3" },
      { k: "Filtros", v: "2 de aluminio (5 capas)" },
    ],
  },

  // --- Rodas Digital 60/90 (SMNG) ---
  {
    id: "KU-CM60SMNG",
    name: "Campana Rodas 60 Digital Negro",
    category: "Campanas",
    line: "Rodas Digital",
    barcode: "7798387197217",
    short: "Motor 130 W, 380 m³/h, 3 velocidades, 2×LED 1,5 W, filtros aluminio.",
    image: "/productos/campana7.png",
    images: [
        "/productos/campanas/camp20.png",
    
        
        
      ],
    specs: [
      { k: "Motor", v: "130 W" },
      { k: "Absorción", v: "380 m³/h" },
      { k: "Velocidades", v: "3 (digital)" },
      { k: "Iluminación", v: "2 × LED 1,5 W" },
      { k: "Filtros", v: "Aluminio" },
    ],
  },
  {
    id: "KU-CM90SMNG",
    name: "Campana Rodas 90 Digital Negro",
    category: "Campanas",
    line: "Rodas Digital",
    barcode: "7798387197224",
    short: "Motor 130 W, 380 m³/h, 3 velocidades, 2×LED 1,5 W, 3 filtros aluminio.",
    image: "/productos/campana8.png",
    images: [
        "/productos/campanas/camp18.png",
        "/productos/campanas/camp19.png",
        
        
      ],
    specs: [
      { k: "Motor", v: "130 W" },
      { k: "Absorción", v: "380 m³/h" },
      { k: "Velocidades", v: "3 (digital)" },
      { k: "Iluminación", v: "2 × LED 1,5 W" },
      { k: "Filtros", v: "3 de aluminio (5 capas)" },
    ],
  },

  // --- Milos / Empotrable (datos técnicos del catálogo) ---
  {
    id: "KU-CM-MILOS-EMP",
    name: "Campana Empotrable Milos",
    category: "Campanas",
    line: "Milos (Empotrable)",
    short: "Solo con salida al exterior, 500 m³/h, 3 velocidades, salida Ø150 mm.",
    image: "/productos/campana1.png",
    images: [
        "/productos/campanas/camp21.png",
        "/productos/campanas/camp22.png",
        "/productos/campanas/camp23.png",
        "/productos/campanas/camp24.png",
        
        
      ],
    specs: [
      { k: "Panel", v: "Acero Inoxidable" },
      { k: "Tensión", v: "220–240 V ~ 50/60 Hz" },
      { k: "Velocidades", v: "3" },
      { k: "Motor", v: "1 × 130 W" },
      { k: "Absorción", v: "500 m³/h" },
      { k: "Iluminación", v: "2 × LED 1,5 W" },
      { k: "Filtros", v: "Aluminio 3 capas" },
      { k: "Salida", v: "Ø 150 mm" },
    ],
    dimensions: [
      { k: "Ancho", v: "52,5 cm" },
      { k: "Fondo", v: "27,6 cm" },
      { k: "Altura", v: "15 cm" },
    ],
  },

  /* =========================================================
   * EXTRACTORES
   * ======================================================= */
  // --- Extractor 4" (EX4) ---
  {
    id: "KU.EX4.BL",
    name: 'Extractor 4" Blanco',
    category: "Extractores",
    line: 'Extractor 4"',
    barcode: "7798143724220",
    short: "12 W, salida 100 mm, 90 m³/h, rejilla 14×14 cm.",
    image: "/productos/extractor1.png",
    images: [
        "/productos/extractores/extractor1-alt.png",
        "/productos/extractores/extractor2-alt.png",
        "/productos/extractores/extractor3-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "12 W" },
      { k: "Salida", v: "Ø 100 mm" },
      { k: "Absorción", v: "90 m³/h" },
      { k: "Cuerpo/Frente", v: "Plástico de alta calidad" },
      { k: "Rejilla", v: "14 × 14 cm" },
    ],
  },
  
  {
    id: "KU.EX4.CO",
    name: 'Extractor 4" Cobre',
    category: "Extractores",
    line: 'Extractor 4"',
    barcode: "7798143724022",
    short: "12 W, salida 100 mm, 90 m³/h.",
    image: "/productos/extractor15.png",
    images: [
        "/productos/extractores/extractor1-alt.png",
        "/productos/extractores/extractor2-alt.png",
        "/productos/extractores/extractor3-alt.png", // <-- nueva en public
      ],
      specs: [
        { k: "Potencia", v: "12 W" },
        { k: "Salida", v: "Ø 100 mm" },
        { k: "Absorción", v: "90 m³/h" },
        { k: "Cuerpo/Frente", v: "Plástico de alta calidad" },
        { k: "Rejilla", v: "14 × 14 cm" },
      ],
  },
  {
    id: "KU.EX4.GR",
    name: 'Extractor 4" Gris',
    category: "Extractores",
    line: 'Extractor 4"',
    barcode: "7798143720109",
    short: "12 W, salida 100 mm, 90 m³/h.",
    image: "/productos/extractor14.png",
    images: [
        "/productos/extractores/extractor1-alt.png",
        "/productos/extractores/extractor2-alt.png",
        "/productos/extractores/extractor3-alt.png", // <-- nueva en public
      ],
      specs: [
        { k: "Potencia", v: "12 W" },
        { k: "Salida", v: "Ø 100 mm" },
        { k: "Absorción", v: "90 m³/h" },
        { k: "Cuerpo/Frente", v: "Plástico de alta calidad" },
        { k: "Rejilla", v: "14 × 14 cm" },
      ],
  },
  {
    id: "KU.EX4.NG",
    name: 'Extractor 4" Negro',
    category: "Extractores",
    line: 'Extractor 4"',
    barcode: "7798387198818",
    short: "12 W, salida 100 mm, 90 m³/h.",
    image: "/productos/extractor2.png",
    images: [
        "/productos/extractores/extractor1-alt.png",
        "/productos/extractores/extractor2-alt.png",
        "/productos/extractores/extractor3-alt.png", // <-- nueva en public
      ],
      specs: [
        { k: "Potencia", v: "12 W" },
        { k: "Salida", v: "Ø 100 mm" },
        { k: "Absorción", v: "90 m³/h" },
        { k: "Cuerpo/Frente", v: "Plástico de alta calidad" },
        { k: "Rejilla", v: "14 × 14 cm" },
      ],
  },

  // --- Extractor 6" (EX6) ---
  {
    id: "KU.EX6.BL",
    name: 'Extractor 6" Blanco',
    category: "Extractores",
    line: 'Extractor 6"',
    barcode: "7798143724183",
    short: "19 W, salida 150 mm, 200 m³/h, rejilla 19,2×19,2 cm.",
    image: "/productos/extractor4.png",
    images: [
        "/productos/extractores/extractor4-alt.png",
        "/productos/extractores/extractor5-alt.png",
        "/productos/extractores/extractor6-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "19 W" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Rejilla", v: "19,2 × 19,2 cm" },
    ],
  },
  {
    id: "KU.EX6.NG",
    name: 'Extractor 6" Negro',
    category: "Extractores",
    line: 'Extractor 6"',
    barcode: "7798387198825",
    short: "19 W, salida 150 mm, 200 m³/h.",
    image: "/productos/extractor12.png",
    images: [
        "/productos/extractores/extractor4-alt.png",
        "/productos/extractores/extractor5-alt.png",
        "/productos/extractores/extractor6-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "19 W" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Rejilla", v: "19,2 × 19,2 cm" },
    ],
  },
  {
    id: "KU.EX6.GR",
    name: 'Extractor 6" Gris',
    category: "Extractores",
    line: 'Extractor 6"',
    barcode: "7798143720109",
    short: "19 W, salida 150 mm, 200 m³/h.",
    image: "/productos/extractor13.png",
    images: [
        "/productos/extractores/extractor4-alt.png",
        "/productos/extractores/extractor5-alt.png",
        "/productos/extractores/extractor6-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "19 W" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Rejilla", v: "19,2 × 19,2 cm" },
    ],
  },
  {
    id: "KU.EX6.CO",
    name: 'Extractor 6" Cromo',
    category: "Extractores",
    line: 'Extractor 6"',
    short: "19 W, salida 150 mm, 200 m³/h.",
    image: "/productos/extractor5.png",
    images: [
        "/productos/extractores/extractor4-alt.png",
        "/productos/extractores/extractor5-alt.png",
        "/productos/extractores/extractor6-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "19 W" },
      { k: "Salida", v: "Ø 150 mm" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Rejilla", v: "19,2 × 19,2 cm" },
    ],
  },
 

  // --- Extractor 10" (EX10) ---
  {
    id: "KU.EX10.BL",
    name: 'Extractor 10" Blanco',
    category: "Extractores",
    line: 'Extractor 10"',
    barcode: "7798339902555",
    short: "50 W, salida 250 mm, motor a rulemán, doble sentido, 200 m³/h.",
    image: "/productos/extractor9.png",
    images: [
        "/productos/extractores/extractor7-alt.png",
        "/productos/extractores/extractor8-alt.png",
        "/productos/extractores/extractor9-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "50 W" },
      { k: "Salida", v: "Ø 250 mm" },
      { k: "Motor", v: "A rulemán, doble sentido de giro" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Garantía", v: "1 año" },
    ],
  },
  {
    id: "KU.EX10.NG",
    name: 'Extractor 10" Negro',
    category: "Extractores",
    line: 'Extractor 10"',
    barcode: "7798387190515",
    short: "50 W, salida 250 mm, motor a rulemán, doble sentido.",
    image: "/productos/extractor10.png",
    images: [
        "/productos/extractores/extractor7-alt.png",
        "/productos/extractores/extractor8-alt.png",
        "/productos/extractores/extractor9-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "50 W" },
      { k: "Salida", v: "Ø 250 mm" },
      { k: "Motor", v: "A rulemán, doble sentido de giro" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Garantía", v: "1 año" },
    ],
  },
  {
    id: "KU.EX10.GR",
    name: 'Extractor 10" Gris',
    category: "Extractores",
    line: 'Extractor 10"',
    barcode: "7798339902562",
    short: "50 W, salida 250 mm, motor a rulemán, doble sentido.",
    image: "/productos/extractor11.png",
    images: [
        "/productos/extractores/extractor7-alt.png",
        "/productos/extractores/extractor8-alt.png",
        "/productos/extractores/extractor9-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "50 W" },
      { k: "Salida", v: "Ø 250 mm" },
      { k: "Motor", v: "A rulemán, doble sentido de giro" },
      { k: "Absorción", v: "200 m³/h" },
      { k: "Garantía", v: "1 año" },
    ],
  },

  // --- Forzadores (FA100) ---
  {
    id: "KU.FA100.TE",
    name: "Forzador FA100 Techo",
    category: "Extractores",
    line: "Forzador",
    barcode: "7798387191802",
    short: "50 W, caudal 550 m³/h, motor a rulemán.",
    image: "/productos/extractor8.png",
    images: [
        "/productos/extractores/extractor10-alt.png",
        "/productos/extractores/extractor11-alt.png",
        "/productos/extractores/extractor12-alt.png",
        "/productos/extractores/extractor13-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "50 W" },
      { k: "Caudal", v: "550 m³/h" },
      { k: "Motor", v: "A rulemán" },
    ],
  },
  {
    id: "KU.FA100.GR",
    name: "Forzador FA100 Gris",
    category: "Extractores",
    line: "Forzador",
    barcode: "7798387191796",
    short: "50 W, caudal 550 m³/h, motor a rulemán.",
    image: "/productos/extractor7.png",
    images: [
        "/productos/extractores/extractor10-alt.png",
        "/productos/extractores/extractor11-alt.png",
        "/productos/extractores/extractor12-alt.png",
        "/productos/extractores/extractor13-alt.png", // <-- nueva en public
      ],
    specs: [
      { k: "Potencia", v: "50 W" },
      { k: "Caudal", v: "550 m³/h" },
      { k: "Motor", v: "A rulemán" },
    ],
  },

 
  
  /* =========================================================
   * ANAFES
   * ======================================================= */
  // --- Vitrocerámicos (AV / VC) ---
  {
    id: "KU-AV3001-NG",
    name: "Anafe Vitro x1",
    category: "Anafes",
    line: "Vitro",
    barcode: "7798387197156",
    short: "8 niveles, 2000 W, bloqueo, alerta de zona caliente.",
    image: "/productos/anafe4.png",
    images: [
        "/productos/anafes/anaf1.png",
        "/productos/anafes/anaf2.png",
        "/productos/anafes/anaf3.png",
        "/productos/anafes/anaf4.png",
       
      ],
    specs: [
      { k: "Niveles", v: "8" },
      { k: "Potencia", v: "2000 W" },
      { k: "Voltaje/Hz", v: "220–240 V, 50/60 Hz" },
      { k: "Seguridad", v: "Bloqueo + alerta zona caliente" },
      { k: "Superficie", v: "Cristal negro grado A (mate)" },
      { k: "Garantía", v: "2 años" },
    ],
    dimensions: [
      { k: "Placa", v: "260 × 260 mm" },
    ],
  },
  {
    id: "KU-VC3002-NG",
    name: "Anafe Vitro x2",
    category: "Anafes",
    line: "Vitro",
    barcode: "7798387197620",
    short: "9 niveles, 2700–3300 W, control táctil, timer individual.",
    image: "/productos/anafe5.png",
    images: [
        "/productos/anafes/anaf5.png",
       
       
      ],
    specs: [
      { k: "Niveles", v: "9" },
      { k: "Potencia", v: "2700–3300 W" },
      { k: "Control", v: "Táctil deslizante" },
      { k: "Seguridad", v: "Desconexión automática, bloqueo" },
      { k: "Indicadores", v: "Calor residual" },
      { k: "Garantía", v: "2 años" },
    ],
  },
  {
    id: "KU-VC6004-NG",
    name: "Anafe Vitro x4",
    category: "Anafes",
    line: "Vitro",
    barcode: "7798387197637",
    short: "9 niveles, 5490–6533 W, control táctil, timer por zona.",
    image: "/productos/anafe6.png",
    images: [
        "/productos/anafes/anaf6.png",
        "/productos/anafes/anaf7.png",
        "/productos/anafes/anaf8.png",
        "/productos/anafes/anaf9.png",
        "/productos/anafes/anaf10.png",
       
       
      ],
    specs: [
      { k: "Niveles", v: "9" },
      { k: "Potencia", v: "5490–6533 W" },
      { k: "Control", v: "Táctil deslizante" },
      { k: "Indicadores", v: "Calor residual" },
    ],
    dimensions: [
      { k: "Ancho", v: "59 cm" },
      { k: "Fondo", v: "52 cm" },
      { k: "Alto", v: "5,2 cm" },
    ],
  },
 

  // --- Inducción (IC) ---
  {
    id: "KU-IC2000-NG",
    name: "Anafe Inducción 2 zonas",
    category: "Anafes",
    line: "Inducción",
    short: "9 niveles, 3000–3800 W, control táctil, timer.",
    image: "/productos/anafe8.png",
    images: [
        "/productos/anafes/anaf11.png",
        "/productos/anafes/anaf12.png",
        "/productos/anafes/anaf13.png",
      ],
    specs: [
      { k: "Niveles", v: "9" },
      { k: "Potencia", v: "3000–3800 W" },
      { k: "Seguridad", v: "Desconexión auto., bloqueo" },
      { k: "Indicadores", v: "Calor residual" },
    ],
    dimensions: [
      { k: "Ancho", v: "59 cm" },
      { k: "Fondo", v: "52 cm" },
    ],
  },
  

  // --- A Gas (AG) ---
  {
    id: "KU-AG301-SS",
    name: "Anafe a Gas x2",
    category: "Anafes",
    line: "A Gas",
    barcode: "7798387195022",
    short: "Encendido automático, válvula de seguridad, grilla de fundición.",
    image: "/productos/anafe2.png",
    images: [
        "/productos/anafes/anaf14.png",
        "/productos/anafes/anaf15.png",
        "/productos/anafes/anaf16.png",
        "/productos/anafes/anaf17.png",
      ],
    specs: [
      { k: "Zonas", v: "2 (2,7 kW + 1,0 kW)" },
      { k: "Seguridad", v: "Válvula por fugas" },
      { k: "Superficie", v: "Acero inoxidable" },
      { k: "Perillas", v: "Metálicas" },
      { k: "Empotrable", v: "Sí" },
      { k: "Alimentación", v: "Gas" },
      { k: "Voltaje", v: "220–240 V ~ 50/60 Hz (6 W)" },
    ],
    dimensions: [
      { k: "Ancho", v: "51 cm" },
      { k: "Fondo", v: "31 cm" },
    ],
  },
  {
    id: "KU-AG601-SS",
    name: "Anafe a Gas x4",
    category: "Anafes",
    line: "A Gas",
    barcode: "7798387197255",
    short: "4 hornallas, encendido automático, válvula de seguridad.",
    image: "/productos/anafe3.png",
    images: [
        "/productos/anafes/anaf18.png",
        
      ],
    specs: [
      { k: "Zonas", v: "1,0 / 1,75 / 1,75 / 3,3 kW" },
      { k: "Superficie", v: "Acero inoxidable" },
      { k: "Grilla", v: "Fundición de aluminio" },
    ],
    dimensions: [
      { k: "Ancho", v: "58,6 cm" },
      { k: "Fondo", v: "50,6 cm" },
    ],
  },


  {
    id: "KU-AG602-SS",
    name: "Anafe a Gas x5",
    category: "Anafes",
    line: "A Gas",
    barcode: "7798387197255",
    short: "5 hornallas, encendido automático, válvula de seguridad, grilla de fundición.",
    image: "/productos/anafe9.png",
    images: [
      "/productos/anafes/anaf19.png",           
    ],
    specs: [
      { k: "Zonas", v: "1,0 / 1,75 / 1,75 / 3,0 / 3,3 kW" },
      { k: "Seguridad", v: "Válvula por fugas de gas" },
      { k: "Superficie", v: "Acero inoxidable" },
      { k: "Grilla", v: "Fundición de aluminio" },
      { k: "Encendido", v: "Automático por perillas" },
      { k: "Perillas", v: "Metálicas" },
      { k: "Empotrable", v: "Sí" },
      { k: "Alimentación", v: "Gas" },
      { k: "Voltaje/Hz", v: "220–240 V ~ 50/60 Hz" },
      { k: "Garantía", v: "2 años" },
      // { k: "Potencia encendido", v: "6 W" }, // opcional si querés reflejar la nota del gráfico
    ],
    dimensions: [
      { k: "Ancho", v: "52 cm" },
      { k: "Fondo", v: "50,6 cm" },
    ],
  },
  






 /* =========================================================
   * HORNOS
   * ======================================================= */


  {
    id: "KU-HE7801-NG",
    name: "Horno GEMINI",
    category: "Hornos",
    line: "Eléctrico / Empotrable",
    barcode: "—",
    short: "Horno Empotrable Eléctrico 78L con convección y display LED.",
    image: "/productos/hornos/bip.png",
    images: [
        "/productos/hornos/horno1.png",
        "/productos/hornos/horno2.png",
        "/productos/hornos/horno3.png",
        "/productos/hornos/horno4.png",           
      ],
    specs: [
      { k: "Modelo", v: "KU-HE7801-NG" },
      { k: "Capacidad", v: "78 L" },
      { k: "Origen", v: "Turquía" },
      { k: "Tipo", v: "Eléctrico con convección" },
      { k: "Material Panel", v: "Glass" },
      { k: "Color Panel", v: "Vidrio Negro" },
      { k: "Color Puerta", v: "Vidrio Negro" },
      { k: "Funciones", v: "0+7" },
      { k: "Rango de Temperatura", v: "50° - 255°" },
      { k: "Ventilador de Enfriado", v: "Sí" },
      { k: "Tipo de Vidrio", v: "Doble capa de vidrio" },
      { k: "Tipo de Timer", v: "Display LED Blanco Premium" },
      { k: "Número de Perillas", v: "2" },
      { k: "Racks", v: "6 niveles de racks laterales" },
      { k: "Bandeja", v: "1 pieza" },
      { k: "Potencia Resistencia Inferior", v: "1200 W" },
      { k: "Potencia Resistencia Superior", v: "1100 W" },
      { k: "Potencia Total", v: "2359 W" },
      { k: "Voltaje", v: "220–240 V" },
      { k: "Frecuencia", v: "50–60 Hz" },
      { k: "Clase Energética", v: "A" },
    ],
    dimensions: [
      { k: "Ancho", v: "59,5 cm" },
      { k: "Fondo", v: "54,7 cm" },
      { k: "Alto", v: "59,5 cm" },
      { k: "Dimensiones Caja", v: "67,0 × 64,5 × 66,0 cm" },
      { k: "Peso Neto / Bruto", v: "29 / 30,5 kg" },
    ],
  },
  {
    id: "KU-HE7201-SS",
    name: "Horno AIRIS",
    category: "Hornos",
    line: "Eléctrico / Empotrable",
    barcode: "—",
    short: "Horno Empotrable Eléctrico 72L Convección Inox. 72 litros, acero inoxidable, doble vidrio, convección y timer mecánico.",
    image: "/productos/hornos/gemiini.png", // (en tu slide indica “FALTA FOTO”)
    images: [
        "/productos/hornos/horno4.png",         
      ],
    specs: [
      { k: "Modelo", v: "KU-HE7201-SS" },
      { k: "Capacidad", v: "72 L" },
      { k: "Origen", v: "Turquía" },
      { k: "Tipo", v: "Eléctrico con convección" },
      { k: "Material Panel", v: "Metal" },
      { k: "Color Panel", v: "Acero Inoxidable" },
      { k: "Color Puerta", v: "Vidrio Negro" },
      { k: "Funciones", v: "0+7" },
      { k: "Rango de Temperatura", v: "50° - 250°" },
      { k: "Ventilador de Enfriado", v: "Sí" },
      { k: "Tipo de Vidrio", v: "Doble capa de vidrio" },
      { k: "Tipo de Timer", v: "Mecánico" },
      { k: "Número de Perillas", v: "3" },
      { k: "Racks", v: "Racks en relieve laterales" },
      { k: "Bandeja", v: "1 pieza" },
      { k: "Potencia Resistencia Inferior", v: "1200 W" },
      { k: "Potencia Resistencia Superior", v: "1100 W" },
      { k: "Potencia Total", v: "2359 W" },
      { k: "Voltaje", v: "220–240 V" },
      { k: "Frecuencia", v: "50–60 Hz" },
      { k: "Clase Energética", v: "A" },
    ],
    dimensions: [
      { k: "Ancho", v: "59,5 cm" },
      { k: "Fondo", v: "54,7 cm" },
      { k: "Alto", v: "59,5 cm" },
      { k: "Dimensiones Caja", v: "67,0 × 64,5 × 66,0 cm" },
      { k: "Peso Neto / Bruto", v: "29 / 30,5 kg" },
    ],
  },
  
 
];

// Export práctico por categoría (útil para secciones)
export const byCategory = {
  Purificadores: PRODUCTS.filter((p) => p.category === "Purificadores"),
  Campanas: PRODUCTS.filter((p) => p.category === "Campanas"),
  Extractores: PRODUCTS.filter((p) => p.category === "Extractores"),
  Hornos: PRODUCTS.filter((p) => p.category === "Hornos"),
  Anafes: PRODUCTS.filter((p) => p.category === "Anafes"),
};

// ---- Búsqueda por ID (robusta a espacios, %2E, mayúsculas/minúsculas) ----
const normalizeId = (s?: string) => {
    if (!s) return '';
    // decodifica, reemplaza %2E por ".", baja a minúsculas y trimea
    const dec = decodeURIComponent(String(s)).replace(/%2E/gi, '.');
    return dec.trim().toLowerCase().replace(/\s+/g, ' ');
  };
  
  export const findProduct = (id: string) => {
    const q = normalizeId(id);
    if (!q) return undefined;
  
    return (
      PRODUCTS.find((p) => {
        const pid = normalizeId(p.id);
        // También probamos contra su forma URL-encoded por si llega ya codificado
        const pidEnc = normalizeId(encodeURIComponent(p.id));
        return pid === q || pidEnc === q;
      }) || undefined
    );
  };
  

