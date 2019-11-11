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

  it(`Returns a number argument`, () => {
    expect(remToPx(1.5)).toBe(24);
    expect(remToPx(`2.5rem`)).toBe(40);
    expect(remToPx(2.0625)).toBe(33);
  });

  it(`Returns a string argument`, () => {
    expect(remToPx(1.5, `string`)).toBe(`24px`);
    expect(remToPx(`2.5rem`, `string`)).toBe(`40px`);
    expect(remToPx(2.0625, `string`)).toBe(`33px`);
  });

  it(`Handles a basePixel argument`, () => {
    expect(remToPx(1.6, `number`, 10)).toBe(16);
    expect(remToPx(1.6, `string`, `10px`)).toBe(`16px`);
    expect(remToPx(`0.5rem`, `string`, 40)).toBe(`20px`);
    expect(remToPx(`0.5rem`, `number`, `40px`)).toBe(20);
  });
});
