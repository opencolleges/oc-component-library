import namespace from './namespace';

describe('namespace()', () => {
  it('Handles a string argument', () => {
    expect(namespace()).toBe('');
    expect(namespace('foo')).toBe('oc-foo');
    expect(namespace(null, 'bar baz', null)).toBe('oc-bar oc-baz');
    expect(namespace('qui', undefined, 'qux')).toBe('oc-qui oc-qux');
  });
});
