import isEven from './is-even';

describe('isEven()', () => {
  it('Handles an even number', () => {
    expect(isEven(8)).toBe(true);
    expect(isEven(456)).toBe(true);
    expect(isEven(80000)).toBe(true);
  });
  it('Handles an odd number', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(457)).toBe(false);
    expect(isEven(80001)).toBe(false);
  });
});
