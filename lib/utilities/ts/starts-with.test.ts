import startsWith from './starts-with';

describe(`startsWith()`, () => {
  it(`Handles a string argument`, () => {
    expect(startsWith(`  foo `, `b`)).toBe(false);
    expect(startsWith(`  foo `, `f`)).toBe(true);
    expect(startsWith(`  foo `, `foo`)).toBe(true);
    expect(startsWith(`       bar`, `b`)).toBe(true);
    expect(startsWith(`       bar`, `bar`)).toBe(true);
    expect(startsWith(`       bar`, `f`)).toBe(false);
  });

  it(`Handles an array argument`, () => {
    expect(startsWith(`foo`, [`b`, `b`, `q`])).toBe(false);
    expect(startsWith(`foo`, [`b`, `b`, `q`, `f`])).toBe(true);
    expect(startsWith(`foo`, [`b`, `b`, `q`, `foo`])).toBe(true);
    expect(startsWith(`bar`, [`f`, `q`, `q`])).toBe(false);
    expect(startsWith(`bar`, [`f`, `q`, `q`, `b`])).toBe(true);
    expect(startsWith(`bar`, [`f`, `q`, `q`, `bar`])).toBe(true);
  });
});
