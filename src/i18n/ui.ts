import type { CatalogId, PlanId } from '../data/planes';

export const locales = ['es', 'en'] as const;
export type Lang = (typeof locales)[number];

/** Ruta canónica de cada idioma. */
export const routes: Record<Lang, string> = {
  es: '/',
  en: '/en/',
};

/** Etiqueta nativa de cada idioma, para el conmutador. */
export const langLabels: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
};

export interface PlanCopy {
  name: string;
  tag: string;
}

export interface CatalogCopy {
  title: string;
  type: string;
}

export interface Copy {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    pricing: string;
    catalog: string;
    contact: string;
    /** aria-label del grupo ES | EN */
    language: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
    /** Rótulo WordArt (solo ASCII + emoticonos ASCII). */
    wordart: string;
  };
  pricing: {
    heading: string;
    intro: string;
    /** Plantilla con {name}. */
    choosePlan: string;
    regionLabel: string;
    carouselRole: string;
    slideRole: string;
    /** Plantilla con {n} y {total}. */
    slideLabel: string;
    /** Plantilla con {name}. */
    viewPhoto: string;
    /** Plantilla con {n}. */
    fallbackPhoto: string;
    prev: string;
    next: string;
  };
  catalog: {
    heading: string;
    cta: string;
  };
  contact: {
    heading: string;
    body: string;
    cta: string;
  };
  footer: {
    tagline: string;
    credit: string;
  };
  plans: Record<PlanId, PlanCopy>;
  photoAlts: Record<PlanId, string>;
  catalogItems: Record<CatalogId, CatalogCopy>;
}

export const t: Record<Lang, Copy> = {
  es: {
    meta: {
      title: 'Javiera | Portfolio',
      description: 'Ilustración y diseño por Javiera.',
    },
    nav: {
      pricing: 'Precios',
      catalog: 'Catálogo',
      contact: 'Contacto',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Ilustración · Diseño · Arte digital',
      name: 'Javiera',
      paragraph:
        'Ilustraciones con carácter, trazos afilados y una paleta que no pasa desapercibida. Encargos abiertos para proyectos personales y marcas.',
      primaryCta: 'Encargar pieza',
      secondaryCta: 'Ver catálogo',
      wordart: 'holiii!! soy yo :3 ^_^',
    },
    pricing: {
      heading: 'Tarifas claras',
      intro:
        'Precios de referencia en dólares. Cada proyecto se cotiza según complejidad, formato y uso final.',
      choosePlan: 'Elegir plan {name}',
      regionLabel: 'Ejemplos por plan',
      carouselRole: 'carrusel',
      slideRole: 'diapositiva',
      slideLabel: '{n} de {total}',
      viewPhoto: 'Ver {name}',
      fallbackPhoto: 'foto {n}',
      prev: 'Foto anterior',
      next: 'Foto siguiente',
    },
    catalog: {
      heading: 'Trabajos seleccionados',
      cta: 'Pedir algo parecido',
    },
    contact: {
      heading: '¿Trabajamos juntos?',
      body: 'Cuéntame tu idea, el formato y la fecha de entrega. Te respondo con presupuesto y disponibilidad en menos de 48 horas.',
      cta: 'Escríbeme',
    },
    footer: {
      tagline: 'Ilustración · Diseño · Arte digital',
      credit: 'Desarrollado por josepvg.dev',
    },
    plans: {
      chibi: { name: 'Chibi', tag: 'Personaje simplificado' },
      full: { name: 'Full', tag: 'Ilustración completa' },
      render: { name: 'Render', tag: 'Acabado renderizado' },
    },
    photoAlts: {
      chibi: 'Chibi de un personaje de cabello multicolor con orejas y cola',
      full: 'Ilustración completa de un personaje rodeado de fuego',
      render: 'Render de tres personajes con armaduras y energía magenta',
    },
    catalogItems: {
      portrait: { title: 'Retrato digital', type: 'Retrato' },
      editorial: { title: 'Ilustración editorial', type: 'Editorial' },
      character: { title: 'Diseño de personaje', type: 'Personaje' },
      album: { title: 'Portada de álbum', type: 'Música' },
      concept: { title: 'Arte conceptual', type: 'Concept' },
      commission: { title: 'Comisión personalizada', type: 'Custom' },
    },
  },
  en: {
    meta: {
      title: 'Javiera | Portfolio',
      description: 'Illustration and design by Javiera.',
    },
    nav: {
      pricing: 'Pricing',
      catalog: 'Catalog',
      contact: 'Contact',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Illustration · Design · Digital art',
      name: 'Javiera',
      paragraph:
        'Illustrations with personality, sharp linework and a palette that refuses to blend in. Open for commissions from individuals and brands.',
      primaryCta: 'Commission a piece',
      secondaryCta: 'View catalog',
      wordart: 'uh hi its me!! :D',
    },
    pricing: {
      heading: 'Clear pricing',
      intro:
        'Reference prices in US dollars. Every project is quoted on complexity, format and final use.',
      choosePlan: 'Choose the {name} plan',
      regionLabel: 'Examples by plan',
      carouselRole: 'carousel',
      slideRole: 'slide',
      slideLabel: '{n} of {total}',
      viewPhoto: 'View {name}',
      fallbackPhoto: 'photo {n}',
      prev: 'Previous photo',
      next: 'Next photo',
    },
    catalog: {
      heading: 'Selected works',
      cta: 'Request something similar',
    },
    contact: {
      heading: "Let's work together?",
      body: "Tell me your idea, the format and the deadline. I'll reply with a quote and availability within 48 hours.",
      cta: 'Email me',
    },
    footer: {
      tagline: 'Illustration · Design · Digital art',
      credit: 'Developed by josepvg.dev',
    },
    plans: {
      chibi: { name: 'Chibi', tag: 'Simplified character' },
      full: { name: 'Full', tag: 'Full illustration' },
      render: { name: 'Render', tag: 'Rendered finish' },
    },
    photoAlts: {
      chibi: 'Chibi character with multicolored hair, ears and a tail',
      full: 'Full illustration of a character surrounded by fire',
      render: 'Render of three armored characters with magenta energy',
    },
    catalogItems: {
      portrait: { title: 'Digital portrait', type: 'Portrait' },
      editorial: { title: 'Editorial illustration', type: 'Editorial' },
      character: { title: 'Character design', type: 'Character' },
      album: { title: 'Album cover', type: 'Music' },
      concept: { title: 'Concept art', type: 'Concept' },
      commission: { title: 'Custom commission', type: 'Custom' },
    },
  },
};

/** Sustituye marcadores `{clave}` en las plantillas del diccionario. */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
