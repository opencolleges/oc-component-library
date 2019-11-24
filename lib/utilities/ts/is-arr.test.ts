import isArr from './is-arr';

describe(`isArr()`, () => {
  it(`Handles all types`, () => {
    expect(isArr(undefined)).toBe(false);
    expect(isArr(`foo`)).toBe(false);
    expect(isArr(0)).toBe(false);
    expect(isArr({ bar: `baz` })).toBe(false);
    expect(isArr([])).toBe(true);
    expect(isArr([`qui`, `qux`, `corge`])).toBe(true);
    expect(isArr(null)).toBe(false);
  });
});
