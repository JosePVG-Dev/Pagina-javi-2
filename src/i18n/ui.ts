import type { CatalogId, DesignId, FinishId, FormatId, GalleryId } from '../data/planes';

export const locales = ['es', 'en'] as const;
export type Lang = (typeof locales)[number];

/** Ruta canónica de cada idioma. */
export const routes: Record<Lang, string> = {
  es: '/',
  en: '/en/',
};

/** Ruta de los términos de servicio en cada idioma. */
export const tosRoutes: Record<Lang, string> = {
  es: '/tos/',
  en: '/en/tos/',
};

/** Etiqueta nativa de cada idioma, para el conmutador. */
export const langLabels: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
};

export interface CatalogCopy {
  title: string;
  type: string;
  alt: string;
}

/** Canales de contacto del T.O.S. No son texto traducible. */
export const contact = {
  email: 'horseland212002@gmail.com',
  handle: '@Nek0_ch4n',
  toyhouse: 'https://toyhou.se/Nek0_ch4n',
} as const;

export interface TosLink {
  label: string;
  href: string;
}

export interface TosSection {
  title: string;
  /** Renglones con viñeta. */
  items?: string[];
  /** Párrafo suelto, para las secciones que no son lista. */
  body?: string;
  links?: TosLink[];
}

export interface TosCopy {
  meta: {
    title: string;
    description: string;
  };
  heading: string;
  updated: string;
  intro: string;
  summary: {
    heading: string;
    items: string[];
  };
  /** aria-label del índice de secciones. */
  index: string;
  sections: TosSection[];
  acceptance: string;
  back: string;
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
    tos: string;
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
    /** Encabezado de la primera columna de la matriz. */
    tableFormat: string;
    /** Nombres de los tres formatos (filas de la matriz). */
    formats: Record<FormatId, string>;
    /** Nombres de los tres acabados (columnas de la matriz). */
    finishes: Record<FinishId, string>;
    /** Personaje existente vs. diseño desde cero (bloques de la matriz). */
    designs: Record<DesignId, string>;
    /** Aclaración del bloque custom, dentro de la banda que lo separa. */
    customNote: string;
    /** Puerta de entrada: icono 1:1, fuera de la matriz. */
    entry: {
      name: string;
      tag: string;
    };
    /** Extras que el mercado sí cobra y que no son peldaños. */
    addons: string;
    cta: string;
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
    /** Control manual del avance automático (WCAG 2.2.2). */
    pauseAutoplay: string;
    playAutoplay: string;
    /** Nombre corto de cada foto, para los puntos del carrusel. */
    galleryNames: Record<GalleryId, string>;
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
      /** Los tres ejes se combinan en un precio de la matriz. */
      format: string;
      finish: string;
      design: string;
      quoteLabel: string;
      quoteHint: string;
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
  tos: TosCopy;
  footer: {
    tagline: string;
    credit: string;
  };
  photoAlts: Record<GalleryId, string>;
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
      tos: 'T.O.S.',
      language: 'Idioma',
    },
    hero: {
      name: 'Bloomysrkj',
      primaryCta: 'Encargar pieza',
      secondaryCta: 'Ver catálogo',
      wordart: '¡bienvenido!',
    },
    pricing: {
      heading: 'Tarifas claras',
      intro:
        'Precios de referencia en dólares. Elige formato, acabado y si el personaje ya existe o hay que diseñarlo.',
      tableFormat: 'Formato',
      formats: {
        chibi: 'Chibi',
        half: 'Half body',
        full: 'Full body',
      },
      finishes: {
        sketch: 'Sketch',
        simple: 'Simple',
        experimental: 'Experimental / detallado',
      },
      designs: {
        oc: 'Personaje existente',
        custom: 'Diseño custom',
      },
      customNote: 'Mismo formato y acabado, con el personaje diseñado desde cero.',
      entry: {
        name: 'Icono Custom',
        tag: 'Icono 1:1 en plano psicodélico — precio permanente.',
      },
      addons:
        'Extras: personaje extra +$10 · fondo simple +$10 · fondo complejo +$25 · uso comercial ×2 · diseño complejo +$5–10 · boceto previo +$15.',
      cta: 'Pedir presupuesto',
      regionLabel: 'Ejemplos de trabajos',
      carouselRole: 'carrusel',
      slideRole: 'diapositiva',
      slideLabel: '{n} de {total}',
      viewPhoto: 'Ver {name}',
      fallbackPhoto: 'foto {n}',
      prev: 'Foto anterior',
      next: 'Foto siguiente',
      pauseAutoplay: 'Pausar el avance automático',
      playAutoplay: 'Reanudar el avance automático',
      galleryNames: {
        icon: 'Icono',
        chibi: 'Chibi',
        bust: 'Half body',
        mega: 'Render full body',
        custom: 'Custom',
      },
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
        format: 'Formato',
        finish: 'Acabado',
        design: 'Diseño',
        quoteLabel: 'Precio de referencia',
        quoteHint: 'Rango en USD. Te confirmo el precio exacto al revisar el brief.',
        discord: 'Discord',
        discordHint: 'Tu usuario de Discord, para responderte por ahí.',
        references: 'Referencias',
        referencesHint: 'Enlaces a Toyhouse, Drive o Imgur',
        files: 'Imágenes de referencia',
        filesHint: 'Se adjuntan a mano en el correo',
        submit: 'Enviar brief',
        ready: 'Se abrió tu correo con todo escrito.',
        attach: 'Recuerda adjuntar {n} archivo(s) antes de enviar.',
      },
    },
    tos: {
      meta: {
        title: 'T.O.S. | Bloomysrkj',
        description: 'Términos de servicio de las comisiones de Bloomysrkj.',
      },
      heading: 'Términos de servicio (T.O.S.)',
      updated: 'Última actualización: noviembre 2026',
      intro:
        'Al encargar y pagar una comisión aceptas estos términos. Si algo no queda claro, pregúntame antes de pagar.',
      summary: {
        heading: 'Resumen rápido',
        items: [
          'Pago del 100 % por adelantado, por PayPal o transferencia chilena.',
          'Entrega en 1–2 meses desde el pago, con avances según el nivel de acabado.',
          'Uso personal incluido; el uso comercial se cotiza y se cobra aparte.',
          'No hay reembolsos una vez empezado el trabajo, salvo que cancele yo.',
        ],
      },
      index: 'Índice',
      sections: [
        {
          title: '1. Pago',
          items: [
            'Acepto PayPal y, si estás en Chile, transferencia a Banco Santander, MACH, Tenpo o Falabella.',
            'El pago es del 100 % por adelantado. No trabajo con 50/50.',
            'No aplico recargo por la comisión de PayPal.',
            'Los recargos (personaje extra, fondo, urgencia, uso comercial) se cotizan antes y se pagan antes de empezar.',
            'El plazo de entrega empieza cuando recibo el pago y las referencias completas.',
          ],
        },
        {
          title: '2. Tiempo de entrega',
          items: [
            'Mi tiempo de entrega (TAT) es de 1 a 2 meses, porque estudio en paralelo.',
            'Si necesito pausar el encargo (exámenes, salud), te aviso. Si la pausa la pides tú, el plazo se corre lo mismo.',
            'Si no recibo respuesta tuya en 30 días, el encargo se cierra sin reembolso.',
            'Si me retraso, te aviso de inmediato para acordar un nuevo plazo.',
          ],
        },
        {
          title: '3. Avances y revisiones',
          items: [
            'Boceto / línea: avances solo si los pides.',
            'Color plano: 1 sketch.',
            'Render completo: sketch + color.',
            'El avance se aprueba antes de pasar a la siguiente etapa.',
            'Una «ronda» es un conjunto de cambios enviado de una vez, no un cambio suelto.',
            'Cada encargo incluye hasta 3 rondas de ajustes.',
            'A partir de la cuarta ronda cobro $5 USD por cada una, y se paga antes de aplicarla.',
            'Los errores míos (olvidé un detalle de la referencia, un color mal puesto) se corrigen gratis, siempre.',
            'Los cambios de diseño (otro peinado, otra pose, otro personaje) son un encargo nuevo.',
            'Mi estilo evoluciona: dos encargos del mismo personaje pueden tener pequeñas variaciones. No es un defecto ni significa menos calidad.',
          ],
        },
        {
          title: '4. Entrega',
          items: [
            'Entrego por Sta.sh (DeviantArt), Toyhouse o correo si lo pides.',
            'Formato: PNG en la resolución acordada. Si necesitas capas o PSD, dímelo antes de empezar.',
            'El trabajo se considera entregado cuando te envío los archivos finales. Ahí termina el encargo.',
          ],
        },
        {
          title: '5. Uso y derechos',
          items: [
            'El precio cubre uso personal: publicarlo en tus redes, usarlo de avatar o en tu perfil, imprimirlo para ti.',
            'El uso comercial (merch, venta de prints, campañas, monetización) se cotiza y se cobra aparte.',
            'Puedes recortar, añadir texto o adaptar la pieza para un banner o un avatar.',
            'No puedes repintarla, taparla ni redibujar encima de la obra que te entregué.',
            'No puedes revenderla como tuya, usarla para entrenar IA ni acuñarla como NFT.',
            'No borres mi firma.',
            'Si la publicas, te agradezco el crédito con mi @. Dímelo si prefieres que no la publique en mi portafolio.',
          ],
        },
        {
          title: '6. Cancelaciones y reembolsos',
          items: [
            'No hago reembolsos una vez iniciado el trabajo.',
            'Si cancelo yo antes de empezar: te devuelvo el 100 %.',
            'Si cancelo yo a mitad: te devuelvo la parte no entregada.',
            'Si algo no cumple lo acordado, hablémoslo: prefiero arreglarlo antes que perder el trato.',
          ],
        },
        {
          title: '7. Qué necesito de ti',
          items: [
            'Referencias claras: personaje, expresión, pose, paleta, qué sí y qué no.',
            'Una sola persona de contacto para las decisiones.',
            'Responder a los avances para no frenar el encargo.',
          ],
        },
        {
          title: '8. Contenido',
          body: 'Puedo rechazar un encargo por contenido que no quiera dibujar. Si ya pagaste, te devuelvo el 100 %.',
        },
        {
          title: '9. Contacto',
          body: 'Escríbeme por correo o por Toyhouse. Respondo en un máximo de 48 h hábiles.',
          links: [
            { label: contact.email, href: `mailto:${contact.email}` },
            { label: `Toyhouse · ${contact.handle}`, href: contact.toyhouse },
          ],
        },
      ],
      acceptance: 'Al pagar aceptas estos términos.',
      back: 'Volver al portfolio',
    },
    footer: {
      tagline: 'Ilustración · Diseño · Arte digital',
      credit: 'Desarrollado por josepvg.dev',
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
      tos: 'T.O.S.',
      language: 'Language',
    },
    hero: {
      name: 'Bloomysrkj',
      primaryCta: 'Commission a piece',
      secondaryCta: 'View catalog',
      wordart: 'Welcome',
    },
    pricing: {
      heading: 'Clear pricing',
      intro:
        'Reference prices in US dollars. Pick a format, a finish, and whether the character already exists or has to be designed.',
      tableFormat: 'Format',
      formats: {
        chibi: 'Chibi',
        half: 'Half body',
        full: 'Full body',
      },
      finishes: {
        sketch: 'Sketch',
        simple: 'Simple',
        experimental: 'Experimental / detailed',
      },
      designs: {
        oc: 'Existing character',
        custom: 'Custom design',
      },
      customNote: 'Same format and finish, with the character designed from scratch.',
      entry: {
        name: 'Icon Custom',
        tag: '1:1 icon in flat psychedelic finish — permanent price.',
      },
      addons:
        'Add-ons: extra character +$10 · simple background +$10 · complex background +$25 · commercial use ×2 · complex design +$5–10 · sketch pass +$15.',
      cta: 'Request a quote',
      regionLabel: 'Work examples',
      carouselRole: 'carousel',
      slideRole: 'slide',
      slideLabel: '{n} of {total}',
      viewPhoto: 'View {name}',
      fallbackPhoto: 'photo {n}',
      prev: 'Previous photo',
      next: 'Next photo',
      pauseAutoplay: 'Pause the automatic slideshow',
      playAutoplay: 'Start the automatic slideshow',
      galleryNames: {
        icon: 'Icon',
        chibi: 'Chibi',
        bust: 'Half body',
        mega: 'Full body render',
        custom: 'Custom',
      },
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
        format: 'Format',
        finish: 'Finish',
        design: 'Design',
        quoteLabel: 'Reference price',
        quoteHint: 'Range in USD. I confirm the exact price when I review the brief.',
        discord: 'Discord',
        discordHint: 'Your Discord username, so I can reply there.',
        references: 'References',
        referencesHint: 'Links to Toyhouse, Drive or Imgur',
        files: 'Reference images',
        filesHint: 'Attach them by hand in the email',
        submit: 'Send brief',
        ready: 'Your email opened with everything written.',
        attach: 'Remember to attach {n} file(s) before sending.',
      },
    },
    tos: {
      meta: {
        title: 'T.O.S. | Bloomysrkj',
        description: 'Terms of service for Bloomysrkj commissions.',
      },
      heading: 'Terms of service (T.O.S.)',
      updated: 'Last updated: November 2026',
      intro:
        'By commissioning and paying for a piece you accept these terms. If anything is unclear, ask me before you pay.',
      summary: {
        heading: 'Quick summary',
        items: [
          '100 % payment upfront, via PayPal or Chilean bank transfer.',
          'Delivery in 1–2 months from payment, with previews depending on the finish level.',
          'Personal use included; commercial use is quoted and charged separately.',
          'No refunds once work has started, unless I cancel.',
        ],
      },
      index: 'Index',
      sections: [
        {
          title: '1. Payment',
          items: [
            'I accept PayPal and, if you are in Chile, transfer to Banco Santander, MACH, Tenpo or Falabella.',
            'Payment is 100 % upfront. I do not work 50/50.',
            'I do not add a PayPal fee surcharge.',
            'Add-ons (extra character, background, rush, commercial use) are quoted first and paid before I start.',
            'The delivery clock starts when I receive the payment and the complete references.',
          ],
        },
        {
          title: '2. Turnaround time',
          items: [
            'My turnaround time (TAT) is 1–2 months, because I am studying at the same time.',
            'If I need to pause the commission (exams, health), I will tell you. If you ask for the pause, the deadline moves the same way.',
            'If I get no reply from you for 30 days, the commission is closed without a refund.',
            'If I am late, I will tell you right away so we can agree on a new deadline.',
          ],
        },
        {
          title: '3. Previews and revisions',
          items: [
            'Sketch / line art: previews only on request.',
            'Flat colour: 1 sketch.',
            'Full render: sketch + colour.',
            'The preview is approved before moving on to the next stage.',
            'A “round” is a set of changes sent at once, not a single edit.',
            'Each commission includes up to 3 revision rounds.',
            'From the fourth round on I charge USD $5 per round, paid before I apply it.',
            'My own mistakes (a reference detail I missed, a wrong colour) are always fixed for free.',
            'Design changes (a different hairstyle, a different pose, a different character) are a new commission.',
            'My style evolves: two pieces of the same character may differ slightly. That is not a defect and does not mean lower quality.',
          ],
        },
        {
          title: '4. Delivery',
          items: [
            'I deliver via Sta.sh (DeviantArt), Toyhouse, or email if you ask.',
            'Format: PNG at the agreed resolution. If you need layers or a PSD, tell me before I start.',
            'The piece counts as delivered when I send the final files. That is when the commission ends.',
          ],
        },
        {
          title: '5. Use and rights',
          items: [
            'The price covers personal use: posting it on your socials, using it as an avatar or on your profile, printing it for yourself.',
            'Commercial use (merch, print sales, campaigns, monetisation) is quoted and charged separately.',
            'You may crop it, add text, or adapt the piece for a banner or an avatar.',
            'You may not repaint it, cover it, or redraw on top of the artwork I delivered.',
            'You may not resell it as your own, use it to train AI, or mint it as an NFT.',
            'Do not remove my signature.',
            'If you post it, I appreciate credit with my @. Tell me if you would rather I did not post it in my portfolio.',
          ],
        },
        {
          title: '6. Cancellations and refunds',
          items: [
            'I do not refund once work has started.',
            'If I cancel before starting, you get a 100 % refund.',
            'If I cancel halfway, you get the undelivered part refunded.',
            'If something does not match what we agreed, let’s talk: I would rather fix it than lose the deal.',
          ],
        },
        {
          title: '7. What I need from you',
          items: [
            'Clear references: character, expression, pose, palette, what you want and what you do not.',
            'One point of contact for decisions.',
            'Replies to previews, so the commission does not stall.',
          ],
        },
        {
          title: '8. Content',
          body: 'I may decline a commission over content I do not want to draw. If you already paid, you get a 100 % refund.',
        },
        {
          title: '9. Contact',
          body: 'Reach me by email or on Toyhouse. I reply within 48 business hours.',
          links: [
            { label: contact.email, href: `mailto:${contact.email}` },
            { label: `Toyhouse · ${contact.handle}`, href: contact.toyhouse },
          ],
        },
      ],
      acceptance: 'By paying you accept these terms.',
      back: 'Back to the portfolio',
    },
    footer: {
      tagline: 'Illustration · Design · Digital art',
      credit: 'Developed by josepvg.dev',
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
