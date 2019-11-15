import remToPx from './rem-to-px';

describe(`remToPx()`, () => {
  it(`Handles a number argument`, () => {
    expect(remToPx(0.0625)).toBe(1);
    expect(remToPx(0.5)).toBe(8);
    expect(remToPx(1)).toBe(16);
  });

  it(`Handles a string argument`, () => {
    expect(remToPx(`0.0625rem`)).toBe(1);
    expect(remToPx(`0.5`)).toBe(8);
    expect(remToPx(`1rem`)).toBe(16);
  });

  it(`Handles a basePixel argument`, () => {
    expect(remToPx(1.6, `10px`)).toBe(16);
    expect(remToPx(`0.5rem`, 40)).toBe(20);
  });
});
