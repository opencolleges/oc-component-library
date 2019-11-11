import truncateString from './truncate-string';

describe(`truncateString()`, () => {
  it(`Handles maxLength equal to 0`, () => {
    expect(truncateString(`bar`, 0)).toBe(`bar`);
    expect(truncateString(`foo`, 0)).toBe(`foo`);
  });

  it(`Handles value greater than maxLength`, () => {
    expect(truncateString(`bar`, 1)).toBe(`b`);
    expect(truncateString(`foo`, 2)).toBe(`fo`);
  });

  it(`Handles value equal to maxLength`, () => {
    expect(truncateString(`bar`, 3)).toBe(`bar`);
    expect(truncateString(`foo`, 3)).toBe(`foo`);
  });

  it(`Handles value less than maxLength`, () => {
    expect(truncateString(`bar`, 5)).toBe(`bar`);
    expect(truncateString(`foo`, 6)).toBe(`foo`);
  });
});
