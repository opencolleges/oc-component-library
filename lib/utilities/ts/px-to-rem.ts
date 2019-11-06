const pxToRem = (
  pixels: number | string,
  type: `number` | `string` = `number`,
  basePixels: number | string = 16
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
