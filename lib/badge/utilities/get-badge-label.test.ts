import getBadgeLabel from './get-badge-label';

describe('getBadgeLabel()', () => {
  it('Handles a number argument', () => {
    expect(getBadgeLabel(8)).toBe('8');
    expect(getBadgeLabel('16')).toBe('9+');
    expect(getBadgeLabel(24)).toBe('9+');
    expect(getBadgeLabel(120)).toBe('99+');
    expect(getBadgeLabel('  200   ')).toBe('99+');
  });

  it('Handles a string argument', () => {
    expect(getBadgeLabel('')).toBe('');
    expect(getBadgeLabel('Foo')).toBe('Foo');
    expect(getBadgeLabel('240 bar')).toBe('240 bar');
  });
});
