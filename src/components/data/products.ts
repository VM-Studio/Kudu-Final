// Data de productos KUDU (Purificadores)
// Usamos esta estructura con ProductCard.

export type Spec = { k: string; v: string };
export type Product = {
  id: string;        // SKU / código
  name: string;      // nombre del modelo
  short?: string;    // descripción corta
  image?: string;    // /images/… (800x600 recomendado)
  specs?: Spec[];    // lista breve de especificaciones
  badges?: string[]; // ej. ["2 años de garantía"]
  barcode?: string;  // EAN si corresponde
};

// Convenio de claves: "<linea>/<sublínea>"
export const PRODUCTS: Record<string, Product[]> = {
  /* ---------------------- 🔹 PURIFICADORES EXTENSIBLES ---------------------- */
  "purificadores/extensible": [
    {
      id: "KU.PU700.SS",
      name: "Purificador Extensible Cromo",
      barcode: "7798339900612",
      short: "1 motor, 2×LED, filtro aluminio + carbón, 340 m³/h.",
      image: "/images/purificadores/extensible/pu700-ss.jpg",
      specs: [
        { k: "Potencia", v: "145 W" },
        { k: "Motor", v: "1" },
        { k: "Iluminación", v: "2× LED 2 W" },
        { k: "Filtros", v: "Aluminio + 2 de carbón" },
        { k: "Absorción", v: "340 m³/h" },
        { k: "Salida", v: "Ø 150 mm" },
        { k: "Velocidades", v: "2" },
        { k: "Tensión", v: "200 V - 50 Hz" },
      ],
      badges: ["Motor silencioso"],
    },
    {
      id: "KU.PU700.NG",
      name: "Purificador Extensible Negro",
      barcode: "7798387196500",
      short: "1 motor, 2×LED, 340 m³/h.",
      image: "/images/purificadores/extensible/pu700-ng.jpg",
      specs: [
        { k: "Potencia", v: "145 W" },
        { k: "Motor", v: "1" },
        { k: "Iluminación", v: "2× LED 2 W" },
        { k: "Absorción", v: "340 m³/h" },
      ],
    },
  ],

  /* ---------------------- 🔹 PURIFICADORES 1 MOTOR ---------------------- */
  "purificadores/1-motor": [
    {
      id: "KU.PU800.SS",
      name: "Purificador 1 Motor Cromo",
      barcode: "7798339900711",
      short: "Diseño compacto con 1 motor de 340 m³/h, iluminación LED.",
      image: "/images/purificadores/1-motor/pu800-ss.jpg",
      specs: [
        { k: "Motor", v: "1" },
        { k: "Absorción", v: "340 m³/h" },
        { k: "Iluminación", v: "2× LED 2 W" },
        { k: "Filtros", v: "Aluminio + carbón" },
      ],
      badges: ["Compacto y eficiente"],
    },
    {
      id: "KU.PU800.NG",
      name: "Purificador 1 Motor Negro",
      short: "Motor único, iluminación LED, bajo consumo.",
      image: "/images/purificadores/1-motor/pu800-ng.jpg",
      specs: [
        { k: "Motor", v: "1" },
        { k: "Absorción", v: "340 m³/h" },
        { k: "Consumo", v: "145 W" },
      ],
    },
  ],

  /* ---------------------- 🔹 PURIFICADORES 2 MOTORES ---------------------- */
  "purificadores/2-motores": [
    {
      id: "KU.PU900.SS",
      name: "Purificador 2 Motores Cromo",
      barcode: "7798339900810",
      short: "Doble motor de 700 m³/h, ideal para cocinas amplias.",
      image: "/images/purificadores/2-motores/pu900-ss.jpg",
      specs: [
        { k: "Motor", v: "2" },
        { k: "Absorción", v: "700 m³/h" },
        { k: "Iluminación", v: "2× LED 2 W" },
        { k: "Tensión", v: "220 V" },
      ],
      badges: ["Doble potencia"],
    },
    {
      id: "KU.PU900.NG",
      name: "Purificador 2 Motores Negro",
      short: "Potencia superior y estética moderna.",
      image: "/images/purificadores/2-motores/pu900-ng.jpg",
      specs: [
        { k: "Motor", v: "2" },
        { k: "Absorción", v: "700 m³/h" },
        { k: "Velocidades", v: "3" },
      ],
    },
  ],

  /* ---------------------- 🔹 PURIFICADORES DIGITALES ---------------------- */
  "purificadores/digital": [
    {
      id: "KU.PU950.DG",
      name: "Purificador Digital Glass",
      barcode: "7798339900919",
      short: "Panel táctil, temporizador, 2 motores – 700 m³/h.",
      image: "/images/purificadores/digital/pu950-dg.jpg",
      specs: [
        { k: "Motor", v: "2" },
        { k: "Control", v: "Touch digital" },
        { k: "Temporizador", v: "Sí" },
        { k: "Absorción", v: "700 m³/h" },
      ],
      badges: ["Touch Panel", "Temporizador automático"],
    },
    {
      id: "KU.PU950.BL",
      name: "Purificador Digital Black",
      short: "2 motores, panel táctil, moderno diseño negro mate.",
      image: "/images/purificadores/digital/pu950-bl.jpg",
      specs: [
        { k: "Motor", v: "2" },
        { k: "Control", v: "Touch digital" },
        { k: "Absorción", v: "700 m³/h" },
      ],
    },
  ],
  /* ======================= CAMPANAS ======================= */
"campanas/creta": [
    {
      id: "KU.CA700.CR",
      name: "Campana Creta Cromo",
      short: "Diseño mural, 700 m³/h, iluminación LED.",
      image: "/images/campanas/creta/creta-cr.jpg",
      specs: [
        { k: "Instalación", v: "Mural" },
        { k: "Absorción", v: "700 m³/h" },
        { k: "Iluminación", v: "LED" },
        { k: "Velocidades", v: "3" },
      ],
      badges: ["Acero Inoxidable"],
    },
    {
      id: "KU.CA700.NG",
      name: "Campana Creta Negra",
      short: "Terminación negra, 700 m³/h, filtro aluminio.",
      image: "/images/campanas/creta/creta-ng.jpg",
      specs: [
        { k: "Instalación", v: "Mural" },
        { k: "Absorción", v: "700 m³/h" },
        { k: "Filtros", v: "Aluminio" },
      ],
    },
  ],
  
  "campanas/rodas": [
    {
      id: "KU.CA800.RS",
      name: "Campana Rodas Inox",
      short: "Cuerpo piramidal, 800 m³/h, salida Ø150.",
      image: "/images/campanas/rodas/rodas-inox.jpg",
      specs: [
        { k: "Forma", v: "Piramidal" },
        { k: "Absorción", v: "800 m³/h" },
        { k: "Salida", v: "Ø150 mm" },
        { k: "Velocidades", v: "3" },
      ],
      badges: ["Alto caudal"],
    },
    {
      id: "KU.CA800.WH",
      name: "Campana Rodas Blanca",
      short: "Terminación blanca, LED, 3 velocidades.",
      image: "/images/campanas/rodas/rodas-blanca.jpg",
      specs: [
        { k: "Iluminación", v: "LED" },
        { k: "Velocidades", v: "3" },
        { k: "Control", v: "Frontal" },
      ],
    },
  ],
  
  "campanas/digital": [
    {
      id: "KU.CA900.DG",
      name: "Campana Digital Glass",
      short: "Panel táctil, temporizador, 900 m³/h.",
      image: "/images/campanas/digital/digital-glass.jpg",
      specs: [
        { k: "Control", v: "Touch" },
        { k: "Temporizador", v: "Sí" },
        { k: "Absorción", v: "900 m³/h" },
      ],
      badges: ["Touch Panel", "Temporizador"],
    },
    {
      id: "KU.CA900.BK",
      name: "Campana Digital Black",
      short: "Vidrio negro, touch, alto rendimiento.",
      image: "/images/campanas/digital/digital-black.jpg",
      specs: [
        { k: "Terminación", v: "Vidrio negro" },
        { k: "Control", v: "Touch" },
        { k: "Velocidades", v: "3" },
      ],
    },
  ],
  
  "campanas/milos": [
    {
      id: "KU.CA750.ML",
      name: "Campana Milos Inox",
      short: "Línea esbelta, 750 m³/h, LED.",
      image: "/images/campanas/milos/milos-inox.jpg",
      specs: [
        { k: "Absorción", v: "750 m³/h" },
        { k: "Iluminación", v: "LED" },
        { k: "Salida", v: "Ø150 mm" },
      ],
    },
    {
      id: "KU.CA750.MLNG",
      name: "Campana Milos Negra",
      short: "Acabado negro mate, 3 velocidades.",
      image: "/images/campanas/milos/milos-negra.jpg",
      specs: [
        { k: "Velocidades", v: "3" },
        { k: "Filtro", v: "Aluminio + Carbón" },
      ],
    },
  ],
/* ======================= EXTRACTORES ======================= */
"extractores/4": [
    {
      id: "KU.EX4.WH",
      name: "Extractor 4” Blanco",
      short: "Para baño/cocina pequeños. Silencioso y eficiente.",
      image: "/images/extractores/4/ex4-wh.jpg",
      specs: [
        { k: "Diámetro", v: '4"' },
        { k: "Aplicación", v: "Baños pequeños / Cocinas chicas" },
        { k: "Ruido", v: "Bajo" },
      ],
      badges: ["Silencioso"],
    },
    {
      id: "KU.EX4.IN",
      name: "Extractor 4” Inox",
      short: "Frente inox, fácil limpieza, bajo consumo.",
      image: "/images/extractores/4/ex4-in.jpg",
      specs: [
        { k: "Diámetro", v: '4"' },
        { k: "Frente", v: "Acero Inoxidable" },
        { k: "Consumo", v: "Bajo" },
      ],
    },
  ],
  
  "extractores/6": [
    {
      id: "KU.EX6.WH",
      name: "Extractor 6” Blanco",
      short: "Mayor caudal para ambientes medianos.",
      image: "/images/extractores/6/ex6-wh.jpg",
      specs: [
        { k: "Diámetro", v: '6"' },
        { k: "Caudal", v: "Medio" },
        { k: "Aplicación", v: "Baños / Cocinas medianas" },
      ],
      badges: ["Alta eficiencia"],
    },
  ],
  
  "extractores/10": [
    {
      id: "KU.EX10.WH",
      name: "Extractor 10” Blanco",
      short: "Alto caudal para ventilación exigente.",
      image: "/images/extractores/10/ex10-wh.jpg",
      specs: [
        { k: "Diámetro", v: '10"' },
        { k: "Caudal", v: "Alto" },
        { k: "Velocidades", v: "2" },
      ],
    },
  ],
  
  "extractores/forzador": [
    {
      id: "KU.EXFZ.150",
      name: "Forzador Ø150",
      short: "Para conductos extensos; mantiene flujo constante.",
      image: "/images/extractores/forzador/fz-150.jpg",
      specs: [
        { k: "Diámetro", v: "Ø150 mm" },
        { k: "Uso", v: "Conductos largos" },
        { k: "Montaje", v: "En línea" },
      ],
      badges: ["Flujo constante"],
    },
  ],
/* ======================= HORNOS ======================= */
"hornos/airis": [
    {
      id: "KU.HO.AIRIS.SS",
      name: "Horno Airis Inox",
      short: "Empotrable, eficiente y fácil de limpiar.",
      image: "/images/hornos/airis/airis-ss.jpg",
      specs: [
        { k: "Tipo", v: "Empotrable" },
        { k: "Terminación", v: "Acero Inox" },
        { k: "Programas", v: "Múltiples" },
      ],
      badges: ["Eficiencia energética"],
    },
    {
      id: "KU.HO.AIRIS.BL",
      name: "Horno Airis Black",
      short: "Frente vidrio negro, estética minimalista.",
      image: "/images/hornos/airis/airis-bl.jpg",
      specs: [
        { k: "Terminación", v: "Vidrio negro" },
        { k: "Control", v: "Frontal" },
      ],
    },
  ],
  
  "hornos/gemini": [
    {
      id: "KU.HO.GEM.SS",
      name: "Horno Gemini Inox",
      short: "Gran cavidad, cocción pareja, LED interior.",
      image: "/images/hornos/gemini/gemini-ss.jpg",
      specs: [
        { k: "Capacidad", v: "Amplia" },
        { k: "Iluminación", v: "LED" },
        { k: "Seguridad", v: "Puerta fría" },
      ],
      badges: ["Gran capacidad"],
    },
  ],
/* ======================= ANAFES ======================= */
"anafes/vitro": [
    {
      id: "KU.AN.VITRO60",
      name: "Anafe Vitro 60",
      short: "Resistencia vitrocerámica, control preciso.",
      image: "/images/anafes/vitro/vitro-60.jpg",
      specs: [
        { k: "Ancho", v: "60 cm" },
        { k: "Control", v: "Frontal" },
        { k: "Seguridad", v: "Bloqueo" },
      ],
    },
  ],
  
  "anafes/induccion": [
    {
      id: "KU.AN.IND60",
      name: "Anafe Inducción 60",
      short: "Alta eficiencia, respuesta instantánea.",
      image: "/images/anafes/induccion/induccion-60.jpg",
      specs: [
        { k: "Ancho", v: "60 cm" },
        { k: "Eficiencia", v: "Alta" },
        { k: "Bloqueo", v: "Sí" },
      ],
      badges: ["Ahorro de energía"],
    },
    {
      id: "KU.AN.IND90",
      name: "Anafe Inducción 90",
      short: "Superficie amplia para cocinar en grande.",
      image: "/images/anafes/induccion/induccion-90.jpg",
      specs: [
        { k: "Ancho", v: "90 cm" },
        { k: "Zonas", v: "Múltiples" },
        { k: "Control", v: "Touch" },
      ],
    },
  ],
  
  "anafes/a-gas": [
    {
      id: "KU.AN.GAS60",
      name: "Anafe a Gas 60",
      short: "Hierros robustos, excelente transferencia de calor.",
      image: "/images/anafes/a-gas/gas-60.jpg",
      specs: [
        { k: "Ancho", v: "60 cm" },
        { k: "Quemadores", v: "4" },
        { k: "Encendido", v: "Eléctrico" },
      ],
    },
    {
      id: "KU.AN.GAS75",
      name: "Anafe a Gas 75",
      short: "Formato 75 cm con 5 hornallas.",
      image: "/images/anafes/a-gas/gas-75.jpg",
      specs: [
        { k: "Ancho", v: "75 cm" },
        { k: "Quemadores", v: "5" },
        { k: "Seguridad", v: "Válvula" },
      ],
    },
  ],
        
};
