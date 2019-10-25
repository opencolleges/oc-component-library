import remove from './remove';

describe(`remove()`, () => {
  it(`Handles a string argument`, () => {
    expect(remove(`  bar   `, `foo bar baz`)).toBe(`foo baz`);
    expect(remove(`bar qui   `, `foo    bar   baz    qui`)).toBe(`foo baz`);
    expect(remove(`baz bar foo`, `  foo bar  baz`)).toBe(``);
    expect(remove(`food barn`, `foo bar baz`)).toBe(`foo bar baz`);
  });

  it(`Handles an array argument`, () => {
    expect(remove([`  bar  `], `foo bar baz`)).toBe(`foo baz`);
    expect(remove([` bar`, `qui  `], `foo  bar baz  qui`)).toBe(`foo baz`);
    expect(remove([`baz`, `bar`, `foo`], `  foo bar  baz`)).toBe(``);
    expect(remove([`food`, `barn`], `foo bar qui`)).toBe(`foo bar qui`);
  });
});
