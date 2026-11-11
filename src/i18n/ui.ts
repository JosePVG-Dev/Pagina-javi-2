import type { CatalogId, PlanId, PricingId } from '../data/planes';

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
  alt: string;
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
    name: string;
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
    /** Puerta de entrada: primer renglón de la lista, sin competir con la escalera. */
    entry: {
      name: string;
      tag: string;
    };
    /** Plan a cotizar: último renglón, sin precio propio. */
    custom: {
      name: string;
      body: string;
      amount: string;
    };
    /** Extras que el mercado sí cobra y que no son peldaños. */
    addons: string;
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
    /** Etiqueta del botón que detiene el avance automático. */
    pauseAutoplay: string;
    /** Etiqueta del botón que reanuda el avance automático. */
    playAutoplay: string;
  };
  catalog: {
    heading: string;
    cta: string;
  };
  contact: {
    heading: string;
    body: string;
    /** Asunto del correo. `{plan}` se sustituye por el plan elegido. */
    mail: {
      subject: string;
    };
    /** Formulario que arma el correo antes de enviarlo. */
    form: {
      legend: string;
      plan: string;
      discord: string;
      discordHint: string;
      references: string;
      referencesHint: string;
      files: string;
      filesHint: string;
      submit: string;
      ready: string;
      /** Plantilla con {n}. */
      attach: string;
    };
  };
  footer: {
    tagline: string;
    credit: string;
  };
  plans: Record<PlanId, PlanCopy>;
  photoAlts: Record<PricingId, string>;
  catalogItems: Record<CatalogId, CatalogCopy>;
}

export const t: Record<Lang, Copy> = {
  es: {
    meta: {
      title: 'Bloomysrkj | Portfolio',
      description: 'Ilustración y diseño por Bloomysrkj.',
    },
    nav: {
      pricing: 'Precios',
      catalog: 'Catálogo',
      contact: 'Contacto',
      language: 'Idioma',
    },
    hero: {
      name: 'Bloomysrkj',
      primaryCta: 'Encargar pieza',
      secondaryCta: 'Ver catálogo',
      wordart: 'holiii!! soy yo :3 ^_^',
    },
    pricing: {
      heading: 'Tarifas claras',
      intro:
        'Precios de referencia en dólares. Cada proyecto se cotiza según complejidad, formato y uso final.',
      choosePlan: 'Elegir plan {name}',
      entry: {
        name: 'Icono Custom',
        tag: 'Icono 1:1 en plano psicodélico — precio permanente.',
      },
      custom: {
        name: 'Custom',
        body: 'Más de un personaje, fondo o uso comercial.',
        amount: 'Cotización',
      },
      addons:
        'Extras: personaje extra +$10 · fondo simple +$10 · fondo complejo +$25 · uso comercial ×2 · diseño complejo +$5–10 · boceto previo +$15.',
      regionLabel: 'Ejemplos por plan',
      carouselRole: 'carrusel',
      slideRole: 'diapositiva',
      slideLabel: '{n} de {total}',
      viewPhoto: 'Ver {name}',
      fallbackPhoto: 'foto {n}',
      prev: 'Foto anterior',
      next: 'Foto siguiente',
      pauseAutoplay: 'Detener el avance automático',
      playAutoplay: 'Reanudar el avance automático',
    },
    catalog: {
      heading: 'Trabajos seleccionados',
      cta: 'Pedir algo parecido',
    },
    contact: {
      heading: '¿Trabajamos juntos?',
      body: 'Cuéntame tu idea, el formato y la fecha de entrega. Te respondo con presupuesto y disponibilidad en menos de 48 horas.',
      mail: {
        subject: 'Comisión — {plan}',
      },
      form: {
        legend: 'Brief',
        plan: 'Plan',
        discord: 'Discord',
        discordHint: 'opcional — si prefieres que te escriba por ahí',
        references: 'Referencias',
        referencesHint: 'Enlaces a Toyhouse, Drive o Imgur',
        files: 'Imágenes de referencia',
        filesHint: 'Se adjuntan a mano en el correo',
        submit: 'Preparar correo',
        ready: 'Se abrió tu correo con todo escrito.',
        attach: 'Recuerda adjuntar {n} archivo(s) antes de enviar.',
      },
    },
    footer: {
      tagline: 'Ilustración · Diseño · Arte digital',
      credit: 'Desarrollado por josepvg.dev',
    },
    plans: {
      chibi: { name: 'Chibi', tag: 'Icono o cuerpo completo, color pleno' },
      bust: { name: 'Busto Render', tag: 'Medio cuerpo, render completo' },
      mega: { name: 'Mega', tag: 'Medio cuerpo, densidad máxima' },
    },
    photoAlts: {
      icon: 'Chibi de pelo rosa con vestido de encaje y cuernos rojos',
      chibi: 'Chibi de un personaje de cabello multicolor con orejas y cola',
      bust: 'Ilustración de un personaje rodeado de fuego',
      mega: 'Render de tres personajes con armaduras y energía magenta',
      custom: 'Dos personajes abrazados en tonos pastel',
    },
    catalogItems: {
      'forest-creature': {
        title: 'Criatura del bosque',
        type: 'Criatura',
        alt: 'Chibi de criatura verde con cuernos negros y hojas',
      },
      'night-cat': {
        title: 'Gato nocturno',
        type: 'Personaje',
        alt: 'Gato de pelaje blanco y negro rodeado de destellos',
      },
      'chibi-lineup': {
        title: 'Ronda de chibis',
        type: 'Chibi',
        alt: 'Nueve chibis de colores ordenados sobre fondo blanco',
      },
      'scarlet-chibi': {
        title: 'Chibi escarlata',
        type: 'Chibi',
        alt: 'Chibi rojo y dorado con cresta puntiaguda',
      },
      'pink-doll': {
        title: 'Muñeca rosa',
        type: 'Chibi',
        alt: 'Chibi de pelo rosa con tocado redondo y lazo',
      },
      eclipse: {
        title: 'Eclipse',
        type: 'Criatura',
        alt: 'Criatura oscura con halo verde y azul',
      },
      arachne: {
        title: 'Aracne',
        type: 'Criatura',
        alt: 'Criatura arácnida rosa y negra de varias patas',
      },
      'night-spark': {
        title: 'Chispa nocturna',
        type: 'Personaje',
        alt: 'Retrato oscuro de un personaje con destellos',
      },
      'crystal-dragon': {
        title: 'Dragón de cristal',
        type: 'Criatura',
        alt: 'Dragón azul de cristal con alas desplegadas',
      },
      'rainbow-leopard': {
        title: 'Leopardo arcoíris',
        type: 'Criatura',
        alt: 'Leopardo de manchas multicolores sobre fondo claro',
      },
    },
  },
  en: {
    meta: {
      title: 'Bloomysrkj | Portfolio',
      description: 'Illustration and design by Bloomysrkj.',
    },
    nav: {
      pricing: 'Pricing',
      catalog: 'Catalog',
      contact: 'Contact',
      language: 'Language',
    },
    hero: {
      name: 'Bloomysrkj',
      primaryCta: 'Commission a piece',
      secondaryCta: 'View catalog',
      wordart: 'uh hi its me!! :D',
    },
    pricing: {
      heading: 'Clear pricing',
      intro:
        'Reference prices in US dollars. Every project is quoted on complexity, format and final use.',
      choosePlan: 'Choose the {name} plan',
      entry: {
        name: 'Icon Custom',
        tag: '1:1 icon in flat psychedelic finish — permanent price.',
      },
      custom: {
        name: 'Custom',
        body: 'More than one character, a background or commercial use.',
        amount: 'By quote',
      },
      addons:
        'Add-ons: extra character +$10 · simple background +$10 · complex background +$25 · commercial use ×2 · complex design +$5–10 · sketch pass +$15.',
      regionLabel: 'Examples by plan',
      carouselRole: 'carousel',
      slideRole: 'slide',
      slideLabel: '{n} of {total}',
      viewPhoto: 'View {name}',
      fallbackPhoto: 'photo {n}',
      prev: 'Previous photo',
      next: 'Next photo',
      pauseAutoplay: 'Stop the automatic slideshow',
      playAutoplay: 'Resume the automatic slideshow',
    },
    catalog: {
      heading: 'Selected works',
      cta: 'Request something similar',
    },
    contact: {
      heading: "Let's work together?",
      body: "Tell me your idea, the format and the deadline. I'll reply with a quote and availability within 48 hours.",
      mail: {
        subject: 'Commission — {plan}',
      },
      form: {
        legend: 'Brief',
        plan: 'Plan',
        discord: 'Discord',
        discordHint: 'optional — if you would rather be reached there',
        references: 'References',
        referencesHint: 'Links to Toyhouse, Drive or Imgur',
        files: 'Reference images',
        filesHint: 'Attach them by hand in the email',
        submit: 'Compose email',
        ready: 'Your email opened with everything written.',
        attach: 'Remember to attach {n} file(s) before sending.',
      },
    },
    footer: {
      tagline: 'Illustration · Design · Digital art',
      credit: 'Developed by josepvg.dev',
    },
    plans: {
      chibi: { name: 'Chibi', tag: 'Icon or full body, full colour' },
      bust: { name: 'Bust Render', tag: 'Half body, full render' },
      mega: { name: 'Mega', tag: 'Half body, maximum detail' },
    },
    photoAlts: {
      icon: 'Pink-haired chibi in a lace dress with red horns',
      chibi: 'Chibi character with multicolored hair, ears and a tail',
      bust: 'Illustration of a character surrounded by fire',
      mega: 'Render of three armored characters with magenta energy',
      custom: 'Two characters hugging in pastel tones',
    },
    catalogItems: {
      'forest-creature': {
        title: 'Forest creature',
        type: 'Creature',
        alt: 'Green chibi creature with black horns and leaves',
      },
      'night-cat': {
        title: 'Night cat',
        type: 'Character',
        alt: 'Black and white cat surrounded by sparkles',
      },
      'chibi-lineup': {
        title: 'Chibi line-up',
        type: 'Chibi',
        alt: 'Nine colorful chibis arranged on a white background',
      },
      'scarlet-chibi': {
        title: 'Scarlet chibi',
        type: 'Chibi',
        alt: 'Red and gold chibi with a spiked crest',
      },
      'pink-doll': {
        title: 'Pink doll',
        type: 'Chibi',
        alt: 'Pink-haired chibi with a round headdress and bow',
      },
      eclipse: {
        title: 'Eclipse',
        type: 'Creature',
        alt: 'Dark creature with a green and blue halo',
      },
      arachne: {
        title: 'Arachne',
        type: 'Creature',
        alt: 'Pink and black spider-like creature with several legs',
      },
      'night-spark': {
        title: 'Night spark',
        type: 'Character',
        alt: 'Dark character portrait with sparkles',
      },
      'crystal-dragon': {
        title: 'Crystal dragon',
        type: 'Creature',
        alt: 'Blue crystal dragon with spread wings',
      },
      'rainbow-leopard': {
        title: 'Rainbow leopard',
        type: 'Creature',
        alt: 'Leopard with multicolored spots on a light background',
      },
    },
  },
};

/** Sustituye marcadores `{clave}` en las plantillas del diccionario. */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
