import isUndefined from './is-undefined';

describe(`isUndefined()`, () => {
  it(`Handles 'array' argument`, () => {
    expect(isUndefined([])).toBe(false);
  });

  it(`Handles 'null' argument`, () => {
    expect(isUndefined(null)).toBe(false);
  });

  it(`Handles 'number' argument`, () => {
    expect(isUndefined(0)).toBe(false);
  });

  it(`Handles 'object' argument`, () => {
    expect(isUndefined({})).toBe(false);
  });

  it(`Handles 'string' argument`, () => {
    expect(isUndefined(`foo`)).toBe(false);
  });

  it(`Handles 'undefined' argument`, () => {
    expect(isUndefined(undefined)).toBe(true);
  });
});
