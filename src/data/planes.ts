import type { ImageMetadata } from 'astro';
import chibi from '../assets/carousel/chibi.webp';
import full from '../assets/carousel/full.png';
import render from '../assets/carousel/render.jpg';

export interface Plan {
  id: string;
  name: string;
  price: string;
  tag: string;
}

export interface Photo {
  id: string;
  src: ImageMetadata;
  alt: string;
}

export interface CatalogItem {
  title: string;
  type: string;
}

export const plans: Plan[] = [
  {
    id: 'chibi',
    name: 'Chibi',
    price: '49',
    tag: 'Personaje simplificado',
  },
  {
    id: 'full',
    name: 'Full',
    price: '89',
    tag: 'Ilustración completa',
  },
  {
    id: 'render',
    name: 'Render',
    price: '149',
    tag: 'Acabado renderizado',
  },
];

// Cada foto queda vinculada a un precio por su `id` (mismo orden).
export const photos: Photo[] = [
  {
    id: 'chibi',
    src: chibi,
    alt: 'Chibi de un personaje de cabello multicolor con orejas y cola',
  },
  {
    id: 'full',
    src: full,
    alt: 'Ilustración completa de un personaje rodeado de fuego',
  },
  {
    id: 'render',
    src: render,
    alt: 'Render de tres personajes con armaduras y energía magenta',
  },
];

export const plansById = new Map(plans.map((plan) => [plan.id, plan]));

export const catalog: CatalogItem[] = [
  { title: 'Retrato digital', type: 'Retrato' },
  { title: 'Ilustración editorial', type: 'Editorial' },
  { title: 'Diseño de personaje', type: 'Personaje' },
  { title: 'Portada de álbum', type: 'Música' },
  { title: 'Arte conceptual', type: 'Concept' },
  { title: 'Comisión personalizada', type: 'Custom' },
];
