import hasMessage from './has-message';

describe(`hasMessage()`, () => {
  it(`Handles all arguments`, () => {
    expect(hasMessage([], [], ``)).toBe(false);
    expect(hasMessage([], [], `foo`)).toBe(false);

    expect(hasMessage([`foo`, `bar`, `baz`], [], undefined)).toBe(false);
    expect(hasMessage([`foo`], [`bar`, `baz`], ``)).toBe(false);
    expect(hasMessage([], [`bar`], null)).toBe(false);

    expect(hasMessage([`foo`, `bar`, `baz`], [], `qui`)).toBe(true);
    expect(hasMessage([`foo`, `bar`], [`baz`, `qui`], `qux`)).toBe(true);
    expect(hasMessage([], [`foo`, `bar`], `baz`)).toBe(true);
  });
});
