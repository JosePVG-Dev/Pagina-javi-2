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

// Tres ejes combinables: formato del dibujo, acabado y tipo de diseño.
export const formatIds = ['chibi', 'half', 'full'] as const;
export type FormatId = (typeof formatIds)[number];

export const finishIds = ['sketch', 'simple', 'experimental'] as const;
export type FinishId = (typeof finishIds)[number];

export const designIds = ['oc', 'custom'] as const;
export type DesignId = (typeof designIds)[number];

// Matriz de precios: [diseño][formato][acabado]. Rangos en dólares.
// `oc` = personaje que ya existe; `custom` = personaje diseñado desde cero.
// El custom solo ofrece chibi y full body: no hay half body custom.
export const prices: Record<
  DesignId,
  Partial<Record<FormatId, Record<FinishId, string>>>
> = {
  oc: {
    chibi: { sketch: '5–6', simple: '8–15', experimental: '20–25' },
    half: { sketch: '10–12', simple: '18–25', experimental: '35–45' },
    full: { sketch: '15–20', simple: '28–35', experimental: '55–75' },
  },
  custom: {
    chibi: { sketch: '10', simple: '25–35', experimental: '55–85' },
    full: { sketch: '20', simple: '35–45', experimental: '75–100' },
  },
};

// Formatos que existen para un tipo de diseño (el custom no tiene half body).
export const formatsForDesign = (design: DesignId): readonly FormatId[] =>
  formatIds.filter((format) => Boolean(prices[design][format]));

// Rango de una combinación concreta; cadena vacía si no existe.
export const priceFor = (design: DesignId, format: FormatId, finish: FinishId): string =>
  prices[design][format]?.[finish] ?? '';

// Precio de la puerta de entrada (icono 1:1), fuera de la matriz.
export const entryPrice = '5';

/* ---------- galería de ejemplos ---------- */

// El carrusel no está atado a la matriz: es una galería de ejemplos.
export const galleryIds = ['icon', 'chibi', 'bust', 'mega', 'custom'] as const;
export type GalleryId = (typeof galleryIds)[number];

export interface Photo {
  id: GalleryId;
  src: ImageMetadata;
}

export const photos: Photo[] = [
  { id: 'icon', src: icon },
  { id: 'chibi', src: chibi },
  { id: 'bust', src: full },
  { id: 'mega', src: render },
  { id: 'custom', src: custom },
];

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
