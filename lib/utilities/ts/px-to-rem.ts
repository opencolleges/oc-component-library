import { BASE_FONT_SIZE } from './constants';

const pxToRem = (
  pixels: number | string,
  type: `number` | `string` = `number`,
  basePixels: number | string = BASE_FONT_SIZE
): number | string => {
  if (typeof pixels === `string`) {
    pixels = parseFloat(pixels);
  }
  if (typeof basePixels === `string`) {
    basePixels = parseFloat(basePixels);
  }

  const remUnits: number = pixels / basePixels;

  if (type === `string`) {
    return `${remUnits}rem`;
  }

  return remUnits;
};

export default pxToRem;
