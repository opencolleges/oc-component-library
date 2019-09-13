import getLikertScale from './get-likert-scale';

describe('getLikertScale()', () => {
  it('Handles an empty array argument', () => {
    expect(getLikertScale([])).toMatchObject([
      { id: 'oc-1', label: '' },
      { id: 'oc-2', label: '' },
      { id: 'oc-3', label: '' }
    ]);
  });

  it('Handles an array argument w/ five indexes', () => {
    expect(
      getLikertScale([
        { label: 'Foo' },
        {},
        { label: 'Bar' },
        { label: 'Baz' },
        {}
      ])
    ).toMatchObject([
      { id: 'oc-4', label: 'Foo' },
      { id: 'oc-5', label: '' },
      { id: 'oc-6', label: 'Bar' },
      { id: 'oc-7', label: 'Baz' },
      { id: 'oc-8', label: '' }
    ]);
  });

  it('Handles an array argument w/ six indexes', () => {
    expect(
      getLikertScale([
        { label: 'Foo' },
        { label: 'Bar' },
        {},
        {},
        { label: 'Baz' },
        { label: 'Qui' }
      ])
    ).toMatchObject([
      { id: 'oc-9', label: 'Foo' },
      { id: 'oc-10', label: 'Bar' },
      { id: 'oc-11', label: '' },
      { id: 'oc-12', label: '' },
      { id: 'oc-13', label: 'Baz' },
      { id: 'oc-14', label: 'Qui' }
    ]);
  });

  it('Handles an array argument w/ 12 indexes', () => {
    expect(
      getLikertScale([
        { label: 'Foo' },
        {},
        {},
        { label: 'Bar' },
        { label: 'Baz' },
        {},
        {},
        {},
        { label: 'Qui' },
        {},
        { label: 'Qux' },
        {}
      ])
    ).toMatchObject([
      { id: 'oc-15', label: 'Foo' },
      { id: 'oc-16', label: '' },
      { id: 'oc-17', label: '' },
      { id: 'oc-18', label: 'Bar' },
      { id: 'oc-19', label: 'Baz' },
      { id: 'oc-20', label: '' },
      { id: 'oc-21', label: '' },
      { id: 'oc-22', label: '' },
      { id: 'oc-23', label: 'Qui' },
      { id: 'oc-24', label: '' },
      { id: 'oc-25', label: 'Qux' }
    ]);
  });
});
