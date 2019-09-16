import toModifier from './to-modifier';

describe('toModifier()', () => {
  it('Handles a string of multiple modifiers', () => {
    expect(toModifier('foo bar', 'baz')).toBe('baz--foo baz--bar');
    expect(toModifier('qui--qux quux', 'qui')).toBe('qui--qux qui--quux');
  });

  it('Handles an array of multiple modifiers', () => {
    expect(toModifier(['foo', 'bar'], 'baz')).toBe('baz--foo baz--bar');
    expect(toModifier(['qui--qux', 'quux'], 'qui')).toBe('qui--qux qui--quux');
  });
});
