import calculateValue from './calculate-value';

describe(`calculateValue()`, () => {
  it(`Handles maxLength equals to 0`, () => {
    expect(calculateValue(`bar`, 0)).toBe(`bar`);
    expect(calculateValue(`foo`, 0)).toBe(`foo`);
  });

  it(`Handles value greater than maxLength`, () => {
    expect(calculateValue(`bar`, 1)).toBe(`b`);
    expect(calculateValue(`foo`, 2)).toBe(`fo`);
  });

  it(`Handles value equals than maxLength`, () => {
    expect(calculateValue(`bar`, 3)).toBe(`bar`);
    expect(calculateValue(`foo`, 3)).toBe(`foo`);
  });

  it(`Handles value less than maxLength`, () => {
    expect(calculateValue(`bar`, 5)).toBe(`bar`);
    expect(calculateValue(`foo`, 6)).toBe(`foo`);
  });
});
