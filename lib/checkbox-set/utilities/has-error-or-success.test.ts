import hasErrorOrSuccess from './has-error-or-success';

describe('hasErrorOrSuccess()', () => {
  it('Handles an error array', () => {
    expect(hasErrorOrSuccess(['foo', 'bar'], [], 'baz')).toBe(null);
    expect(hasErrorOrSuccess(['foo', 'bar', 'baz'], [], 'baz')).toBe('error');
    expect(
      hasErrorOrSuccess(['foo', 'bar', 'baz', 'qui'], ['qux'], 'baz')
    ).toBe('error');
  });

  it('Handles a success array', () => {
    expect(hasErrorOrSuccess(['foo', 'bar'], ['baz'], 'qui')).toBe(null);
    expect(hasErrorOrSuccess(['foo', 'bar'], ['baz', 'qui'], 'qui')).toBe(
      'success'
    );
    expect(hasErrorOrSuccess([], ['baz', 'qui'], 'qui')).toBe('success');
  });
});
