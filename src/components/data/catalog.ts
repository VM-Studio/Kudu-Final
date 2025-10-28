// Estructura base del catálogo (mismas líneas y sublíneas que el PDF KUDU 2025)
export type Category = {
    slug: string;
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;      // imagen destacada de la línea (la pondremos en /public/images/lineas/)
    children?: Category[];
  };
  
  export const LINES: Category[] = [
    {
      slug: "purificadores",
      title: "Línea Purificadores",
      subtitle: "Extensible · 1 Motor · 2 Motores · Digital",
      description:
        "Desarrollados para rápida absorción, gran diseño y versatilidad. Ideales para cocinas integradas.",
        image: "/images/lines/purificadores.png",
      children: [
        { slug: "extensible", title: "Extensible" },
        { slug: "1-motor", title: "1 Motor" },
        { slug: "2-motores", title: "2 Motores" },
        { slug: "digital", title: "Digital" },
      ],
    },
    {
      slug: "campanas",
      title: "Línea Campanas",
      subtitle: "Creta · Rodas · Digital · Milos",
      description:
        "Campanas domésticas adaptables a cualquier cocina; instalación mural sobre hornallas.",
        image: "/images/lines/campana.png",
      children: [
        { slug: "creta", title: "Creta" },
        { slug: "rodas", title: "Rodas" },
        { slug: "digital", title: "Digital" },
        { slug: "milos", title: "Milos" },
      ],
    },
    {
      slug: "extractores",
      title: "Línea Extractores",
      subtitle: "4 · 6 · 10 · Forzador",
      description:
        "Eliminan olores y vapor en baños y cocinas; previenen humedad y moho.",
      image: "/images/lines/extractor.png",
      children: [
        { slug: "4", title: "Extractor 4" },
        { slug: "6", title: "Extractor 6" },
        { slug: "10", title: "Extractor 10" },
        { slug: "forzador", title: "Forzador" },
      ],
    },
    {
      slug: "hornos",
      title: "Línea Hornos",
      subtitle: "Airis · Gemini",
      description:
        "Hornos empotrables: eficiencia energética, simpleza y buen diseño.",
      image: "/images/lines/horno.png",
      children: [
        { slug: "airis", title: "Airis" },
        { slug: "gemini", title: "Gemini" },
      ],
    },
    {
      slug: "anafes",
      title: "Línea Anafes",
      subtitle: "Vitro · Inducción · A Gas",
      description:
        "Vitro con control preciso, Inducción con seguridad y eficiencia, Gas con máxima transferencia de calor.",
      image: "/images/lines/anafe.png",
      children: [
        { slug: "vitro", title: "Vitrocerámicos" },
        { slug: "induccion", title: "Por Inducción" },
        { slug: "a-gas", title: "A Gas" },
      ],
    },
  ];
  