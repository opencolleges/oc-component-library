import isLastIndex from './is-last-index';

describe(`isLastIndex()`, () => {
  it(`Handles indices`, () => {
    expect(isLastIndex([`foo`, `bar`, `baz`], 3)).toBe(false);
    expect(isLastIndex([`foo`, `bar`, `baz`], 2)).toBe(true);
    expect(isLastIndex([`foo`, `bar`, `baz`, `qui`], 2)).toBe(false);
    expect(isLastIndex([`foo`, `bar`, `baz`, `qui`], 3)).toBe(true);
    expect(isLastIndex([`foo`, `bar`, `baz`, `qui`, 4, 5, 6], 0)).toBe(false);
    expect(isLastIndex([`foo`, `bar`, `baz`, `qui`, 4, 4, 6], 6)).toBe(true);
  });
});
