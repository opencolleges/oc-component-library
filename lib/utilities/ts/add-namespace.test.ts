import addNamespace from './add-namespace';
import { NAMESPACE } from './constants';

describe(`addNamespace()`, () => {
  it(`Handles a string argument`, () => {
    expect(addNamespace(`foo`)).toBe(`${NAMESPACE}-foo`);
    expect(addNamespace(`              bar`)).toBe(`${NAMESPACE}-bar`);
    expect(addNamespace(` baz                `)).toBe(`${NAMESPACE}-baz`);
  });
});
