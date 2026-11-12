/**
 * Set curado de stickers del perfil de Toyhouse de la artista.
 *
 * En `src/assets/stamps/profile/` están los 58 originales descargados; aquí
 * solo se importan los que se usan en el hero. Para cambiar una pieza por
 * otra, basta con importar su archivo y sustituir la entrada: todas viven en
 * esa carpeta.
 *
 * Se sirven con <img src> porque astro:assets aplanaría los GIF animados.
 */
import blueWave from '../assets/stamps/profile/neocities-bluecoil-30be01.gif';
import amIAntiAi from '../assets/stamps/profile/neocities-a112-2ab544.gif';
import smileSmile from '../assets/stamps/profile/neocities-c39-b1097d.gif';
import partyHard from '../assets/stamps/profile/neocities-q26-091904.gif';
import clubPenguin from '../assets/stamps/profile/tumblr-4d7216573ea03131be55dfc4b10edc804144f167-c20d73.gif';
import clickToBeSaved from '../assets/stamps/profile/tumblr-703395f59f9ef5debc8520d3b7a585a6566b87b2-8f2a43.gif';
import windowsXp from '../assets/stamps/profile/tumblr-e679d491c05e0860c6e57d62e75a80128b288d5b-afe32a.gif';
import rawr from '../assets/stamps/profile/tumblr-01c4397237073182ff2e79f4cda2e4a751107989-9ac4b7.png';
import megamanArt from '../assets/stamps/profile/tumblr-04bde01f8efc67fe9429b7cb467032ced2c3c7e4-77797e.png';
import megamanBlue from '../assets/stamps/profile/wixmp-d5os0bh-d52c9bba-854f-4e29-adad-48e92d44-1ab8d5.gif';
import megamanRed from '../assets/stamps/profile/wixmp-d6caviv-f4215bb1-2b3b-44b8-a253-6f6bf6eb-34bc43.gif';
import megamanBust from '../assets/stamps/profile/wixmp-d9n1k07-4d6cd7b3-3a98-4682-b7ac-7510cff9-e3a735.gif';
import tinyComputer from '../assets/stamps/profile/wixmp-d5cwj12-85f2d340-700a-443b-b284-d10b2e96-f65c13.gif';
import footprint from '../assets/stamps/profile/wixmp-daktqmq-d3c9ec54-8a80-4fd0-8df4-2f904e1c-f92ff5.gif';
import rainbowMusic from '../assets/stamps/profile/wixmp-dfhly1a-6605108e-796c-45d1-b1a0-cf878ce9-05644c.gif';

/** Piezas grandes que acompañan al dibujo de la pareja bajo el WordArt. */
export const megaman = {
  feature: megamanArt, // 346×342 — ilustración grande
  strip: [
    megamanBlue, // 99×56
    megamanRed, // 99×55
    megamanBust, // 99×56
  ],
};

/** Blinkies que se mezclan con los sellos bajo el WordArt. */
export const heroBlinkies = [
  smileSmile, // 150×20 — "Thel smile! smile!"
  partyHard, // 150×20 — "PARTY HARD!"
  clubPenguin, // 150×20 — "CLUB PENGUIN"
];

/** Repisa baja debajo de los botones: decoración sin empujar el CTA. */
export const stickerShelf = {
  /** Separador ondulado del perfil (620×23). */
  divider: blueWave,

  stickers: [
    windowsXp, // 99×57 — ventanita de Windows XP, guiño al tema
    clickToBeSaved, // 400×53 — "CLICK to be saved!"
    rainbowMusic, // 99×56 — nota musical y arcoíris
    rawr, // 250×141 — "RAWR, that means I love you in dinosaur"
    amIAntiAi, // 88×31 — botón "Am I Anti-AI"
    tinyComputer, // 132×80 — ordenador retro
    footprint, // 88×31 — huella de dinosaurio
  ],
} as const;
