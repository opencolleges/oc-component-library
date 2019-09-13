import isOdd from './is-odd';

describe('isOdd()', () => {
  it('Handles an even number', () => {
    expect(isOdd(8)).toBe(false);
    expect(isOdd(456)).toBe(false);
    expect(isOdd(80000)).toBe(false);
  });
  it('Handles an odd number', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(457)).toBe(true);
    expect(isOdd(80001)).toBe(true);
  });
});
