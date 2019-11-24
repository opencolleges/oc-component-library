import isObj from './is-obj';

describe(`isObj()`, () => {
  it(`Handles all types`, () => {
    expect(isObj(undefined)).toBe(false);
    expect(isObj(`foo`)).toBe(false);
    expect(isObj(0)).toBe(false);
    expect(isObj({})).toBe(true);
    expect(isObj({ bar: `baz` })).toBe(true);
    expect(isObj([`qui`, `qux`, `corge`])).toBe(false);
    expect(isObj(null)).toBe(false);
  });
});
