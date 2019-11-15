import getLabel from './get-label';

describe(`getLabel()`, () => {
  it(`Handles a number argument`, () => {
    expect(getLabel(8)).toBe(`8`);
    expect(getLabel(`16`)).toBe(`9+`);
    expect(getLabel(24)).toBe(`9+`);
    expect(getLabel(120)).toBe(`99+`);
    expect(getLabel(`  200   `)).toBe(`99+`);
  });

  it(`Handles a string argument`, () => {
    expect(getLabel(``)).toBe(``);
    expect(getLabel(`Foo`)).toBe(`Foo`);
    expect(getLabel(`240 bar`)).toBe(`240 bar`);
  });
});
