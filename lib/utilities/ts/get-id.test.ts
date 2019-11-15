import { NAMESPACE } from './constants';
import getId from './get-id';

describe(`getId()`, () => {
  it(`Returns a unique id`, () => {
    expect(getId()).toBe(`${NAMESPACE}-1`);
    expect(getId()).toBe(`${NAMESPACE}-2`);
    expect(getId()).toBe(`${NAMESPACE}-3`);
    expect(getId()).toBe(`${NAMESPACE}-4`);
    expect(getId()).toBe(`${NAMESPACE}-5`);
  });
});
