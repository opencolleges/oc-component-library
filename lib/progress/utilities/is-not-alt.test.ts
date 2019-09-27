import isNotAlt from './is-not-alt';

describe('isNotAlt()', () => {
  it('handles a string argument', () => {
    expect(isNotAlt('      error')).toBe(true);
    expect(isNotAlt('      error   alt    ')).toBe(false);
    expect(isNotAlt('alternative')).toBe(true);
    expect(isNotAlt('alt')).toBe(false);
  });
});
