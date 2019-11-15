import includes from './includes';

describe(`includes()`, () => {
  it(`Handles an array as 'collection' argument`, () => {
    expect(includes([`foo`, `bar`, 1, 2], `baz`)).toBe(false);
    expect(includes([`foo`, `bar`, 1, 2, `baz`], `baz`)).toBe(true);
    expect(includes([`foo`, `bar`, 1, 2, `baz`], 1)).toBe(true);
  });

  it(`Handles a string as 'collection' argument`, () => {
    expect(includes(`fo`, `foo`)).toBe(false);
    expect(includes(`foo`, `foo`)).toBe(true);
    expect(includes(`food`, `foo`)).toBe(true);
  });

  it(`Handles an array as 'collection' argument and an array as 'value' argument`, () => {
    expect(includes([`foo`, `bar`, 1, 2], [`baz`, `qui`])).toBe(false);
    expect(includes([`foo`, `bar`, 1, 2], [`baz`, `qui`, `foo`])).toBe(true);
    expect(includes([`foo`, `bar`, 1, 2], [`baz`, `qui`, 1])).toBe(true);
  });

  it(`Handles a string as 'collection' argument and an array as 'value' argument`, () => {
    expect(includes(`foo-bar`, [`baz`, `qui`])).toBe(false);
    expect(includes(`foo-bar`, [`baz`, `qui`, `foo`])).toBe(true);
    expect(includes(`foo-bar`, [`baz`, `qui`, `bar`])).toBe(true);
  });
});
