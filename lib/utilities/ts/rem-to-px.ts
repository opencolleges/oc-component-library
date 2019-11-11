import { BASE_FONT_SIZE } from './constants';

const remToPx = (
  rems: number | string,
  basePixels: number | string = BASE_FONT_SIZE
): number => {
  if (typeof rems === `string`) {
    rems = parseFloat(rems);
  }
  if (typeof basePixels === `string`) {
    basePixels = parseFloat(basePixels);
  }

  const pixels: number = rems * basePixels;

  return pixels;
};

export { remToPx as default };
