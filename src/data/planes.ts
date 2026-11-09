import type { ImageMetadata } from 'astro';
import chibi from '../assets/carousel/chibi.webp';
import full from '../assets/carousel/full.png';
import render from '../assets/carousel/render.jpg';

// Solo estructura (ids, precios, imágenes). Los textos traducibles viven en
// src/i18n/ui.ts, indexados por estos mismos ids.

export const planIds = ['chibi', 'full', 'render'] as const;
export type PlanId = (typeof planIds)[number];

export interface Plan {
  id: PlanId;
  price: string;
}

export const plans: Plan[] = [
  { id: 'chibi', price: '49' },
  { id: 'full', price: '89' },
  { id: 'render', price: '149' },
];

export interface Photo {
  id: PlanId;
  src: ImageMetadata;
}

// Cada foto queda vinculada a un precio por su `id` (mismo orden).
export const photos: Photo[] = [
  { id: 'chibi', src: chibi },
  { id: 'full', src: full },
  { id: 'render', src: render },
];

export const plansById = new Map(plans.map((plan) => [plan.id, plan]));

export const catalogIds = [
  'portrait',
  'editorial',
  'character',
  'album',
  'concept',
  'commission',
] as const;
export type CatalogId = (typeof catalogIds)[number];

export const catalog: CatalogId[] = [...catalogIds];
