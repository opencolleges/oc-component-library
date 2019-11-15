import pxToRem from './px-to-rem';

describe(`pxToRem()`, () => {
  it(`Handles a number argument`, () => {
    expect(pxToRem(1)).toBe(0.0625);
    expect(pxToRem(8)).toBe(0.5);
    expect(pxToRem(16)).toBe(1);
  });

  it(`Handles a string argument`, () => {
    expect(pxToRem(`1px`)).toBe(0.0625);
    expect(pxToRem(`8`)).toBe(0.5);
    expect(pxToRem(`16px`)).toBe(1);
  });

  it(`Handles a basePixel argument`, () => {
    expect(pxToRem(`16px`, 10)).toBe(1.6);
    expect(pxToRem(20, `40px`)).toBe(0.5);
  });
});
