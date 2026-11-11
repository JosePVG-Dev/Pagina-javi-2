import type { ImageMetadata } from 'astro';
import chibi from '../assets/carousel/chibi.webp';
import full from '../assets/carousel/full.png';
import render from '../assets/carousel/render.jpg';
import icon from '../assets/carousel/icon.webp';
import custom from '../assets/carousel/custom.webp';
import forestCreature from '../assets/catalog/01-forest-creature.webp';
import nightCat from '../assets/catalog/02-night-cat.webp';
import chibiLineup from '../assets/catalog/03-chibi-lineup.webp';
import scarletChibi from '../assets/catalog/04-scarlet-chibi.webp';
import pinkDoll from '../assets/catalog/05-pink-doll.webp';
import eclipse from '../assets/catalog/06-eclipse.webp';
import arachne from '../assets/catalog/07-arachne.webp';
import nightSpark from '../assets/catalog/08-night-spark.webp';
import crystalDragon from '../assets/catalog/09-crystal-dragon.webp';
import rainbowLeopard from '../assets/catalog/10-rainbow-leopard.webp';

// Solo estructura (ids, precios, imágenes). Los textos traducibles viven en
// src/i18n/ui.ts, indexados por estos mismos ids.

export const planIds = ['chibi', 'bust', 'mega'] as const;
export type PlanId = (typeof planIds)[number];

export interface Plan {
  id: PlanId;
  price: string;
}

// Escalera de precios: peldaños separados por saltos de ~2x, no por incrementos.
// El peldaño destacado es el que debe cargar el margen; el visitante arranca ahí.
export const plans: Plan[] = [
  { id: 'chibi', price: '16' },
  { id: 'bust', price: '50' },
  { id: 'mega', price: '70' },
];

export const featuredPlanId: PlanId = 'bust';

// Precio de la puerta de entrada y etiqueta del plan a cotizar. Van aquí y no en
// los componentes para que no haya cifras duplicadas.
export const entryPrice = '5';

/* ---------- carrusel de precios ---------- */

// Una diapositiva por renglón de la lista: entrada, los tres planes y el
// plan a cotizar. El orden de `pricingIds` es el orden del carrusel.
export const pricingIds = ['icon', 'chibi', 'bust', 'mega', 'custom'] as const;
export type PricingId = (typeof pricingIds)[number];

export interface Photo {
  id: PricingId;
  src: ImageMetadata;
}

export const photos: Photo[] = [
  { id: 'icon', src: icon },
  { id: 'chibi', src: chibi },
  { id: 'bust', src: full },
  { id: 'mega', src: render },
  { id: 'custom', src: custom },
];

export const plansById = new Map(plans.map((plan) => [plan.id, plan]));

export const featuredPlanIndex = plans.findIndex((plan) => plan.id === featuredPlanId);

// Índice del mismo plan dentro del carrusel (lleva la puerta de entrada delante).
export const featuredSlideIndex = pricingIds.indexOf(featuredPlanId);

/* ---------- catálogo ---------- */

export const catalogIds = [
  'forest-creature',
  'night-cat',
  'chibi-lineup',
  'scarlet-chibi',
  'pink-doll',
  'eclipse',
  'arachne',
  'night-spark',
  'crystal-dragon',
  'rainbow-leopard',
] as const;
export type CatalogId = (typeof catalogIds)[number];

export interface CatalogPiece {
  id: CatalogId;
  src: ImageMetadata;
}

// Ordenado de más nuevo a más antiguo.
export const catalog: CatalogPiece[] = [
  { id: 'forest-creature', src: forestCreature },
  { id: 'night-cat', src: nightCat },
  { id: 'chibi-lineup', src: chibiLineup },
  { id: 'scarlet-chibi', src: scarletChibi },
  { id: 'pink-doll', src: pinkDoll },
  { id: 'eclipse', src: eclipse },
  { id: 'arachne', src: arachne },
  { id: 'night-spark', src: nightSpark },
  { id: 'crystal-dragon', src: crystalDragon },
  { id: 'rainbow-leopard', src: rainbowLeopard },
];
