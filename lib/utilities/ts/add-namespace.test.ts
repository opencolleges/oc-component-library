import addNamespace from './add-namespace';
import { NAMESPACE } from './constants';

describe(`addNamespace()`, () => {
  it(`Handles a string argument`, () => {
    expect(addNamespace(`foo`)).toBe(`${NAMESPACE}-foo`);
    expect(addNamespace(`              bar`)).toBe(`${NAMESPACE}-bar`);
    expect(addNamespace(` baz                `)).toBe(`${NAMESPACE}-baz`);
    expect(addNamespace(`    qui     qux `)).toBe(
      `${NAMESPACE}-qui ${NAMESPACE}-qux`
    );
    expect(addNamespace(`    corge     thud foo`)).toBe(
      `${NAMESPACE}-corge ${NAMESPACE}-thud ${NAMESPACE}-foo`
    );
  });
});
