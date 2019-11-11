import { BASE_FONT_SIZE } from './constants';

const remToPx = (
  rems: number | string,
  type: `number` | `string` = `number`,
  basePixels: number | string = BASE_FONT_SIZE
): number | string => {
  if (typeof rems === `string`) {
    rems = parseFloat(rems);
  }
  if (typeof basePixels === `string`) {
    basePixels = parseFloat(basePixels);
  }

  const pixelUnits: number = rems * basePixels;

  if (type === `string`) {
    return `${pixelUnits}px`;
  }

  return pixelUnits;
};

export { remToPx as default };
