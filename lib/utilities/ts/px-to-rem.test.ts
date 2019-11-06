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

  it(`Returns a number argument`, () => {
    expect(pxToRem(24)).toBe(1.5);
    expect(pxToRem(`40px`)).toBe(2.5);
    expect(pxToRem(33)).toBe(2.0625);
  });

  it(`Returns a string argument`, () => {
    expect(pxToRem(24, `string`)).toBe(`1.5rem`);
    expect(pxToRem(`40px`, `string`)).toBe(`2.5rem`);
    expect(pxToRem(33, `string`)).toBe(`2.0625rem`);
  });

  it(`Handles a basePixel argument`, () => {
    expect(pxToRem(`16px`, `number`, 10)).toBe(1.6);
    expect(pxToRem(16, `string`, `10px`)).toBe(`1.6rem`);
    expect(pxToRem(`20px`, `string`, 40)).toBe(`0.5rem`);
    expect(pxToRem(20, `number`, `40px`)).toBe(0.5);
  });
});
