import isFirstOrLastIndex from './is-first-or-last-index';

describe(`isFirstOrLastIndex()`, () => {
  it(`Handles indices`, () => {
    expect(isFirstOrLastIndex([`foo`, `bar`, `baz`], 0)).toBe(true);
    expect(isFirstOrLastIndex([`foo`, `bar`, `baz`], 3)).toBe(false);
    expect(isFirstOrLastIndex([`foo`, `bar`, `baz`], 2)).toBe(true);
    expect(isFirstOrLastIndex([`foo`, `bar`, `baz`, `qui`], 2)).toBe(false);
    expect(isFirstOrLastIndex([`foo`, `bar`, `baz`, `qui`], 3)).toBe(true);
    expect(isFirstOrLastIndex([1, 2, 3, 4, 5, 6], 0)).toBe(true);
    expect(isFirstOrLastIndex([1, 2, 3, 4, 5, 6], 1)).toBe(false);
    expect(isFirstOrLastIndex([1, 2, 3, 4, 5, 6], 5)).toBe(true);
  });
});
