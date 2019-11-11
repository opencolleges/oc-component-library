import { BASE_FONT_SIZE } from './constants';

const pxToRem = (
  pixels: number | string,
  basePixels: number | string = BASE_FONT_SIZE
): number => {
  if (typeof pixels === `string`) {
    pixels = parseFloat(pixels);
  }
  if (typeof basePixels === `string`) {
    basePixels = parseFloat(basePixels);
  }

  const rems: number = pixels / basePixels;

  return rems;
};

export { pxToRem as default };
