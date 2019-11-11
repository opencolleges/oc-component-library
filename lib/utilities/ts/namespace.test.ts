import { NAMESPACE } from './constants';
import namespace from './namespace';

describe(`namespace()`, () => {
  it(`Handles a string argument`, () => {
    expect(namespace()).toBe(``);
    expect(namespace(`foo`)).toBe(`${NAMESPACE}-foo`);
    expect(namespace(null, `bar baz`, null)).toBe(
      `${NAMESPACE}-bar ${NAMESPACE}-baz`
    );
    expect(namespace(`qui`, undefined, `qux`)).toBe(
      `${NAMESPACE}-qui ${NAMESPACE}-qux`
    );
  });
});
