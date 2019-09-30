import BEM from './bem';

describe('BEM', () => {
  it('Handles bem.classNames()', () => {
    const bem = BEM('foo');

    bem.addClassNames('');
    bem.addClassNames(null);
    bem.addModifiers('bar');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar');

    bem.addClassNames('baz');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar baz');

    bem.addClassNames(' qui   qui qui qui            qux');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar baz qui qux');
  });

  it('Handles bem.addModifiers()', () => {
    const bem = BEM('foo');

    bem.addModifiers('');
    bem.addModifiers(null);
    bem.addModifiers('bar        ');
    bem.addModifiers('     foo--bar foo--bar');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar');

    bem.addModifiers('  baz qui');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar oc-foo--baz oc-foo--qui');
  });

  it('Handles bem.getElement()', () => {
    const bem = BEM('foo');

    expect(bem.getElement('bar')).toBe('oc-foo__bar');
    expect(bem.getElement('  baz    ')).toBe('oc-foo__baz');
  });

  it('Handles bem.getModifier()', () => {
    const bem = BEM('foo');

    expect(bem.getModifier('       bar')).toBe('oc-foo--bar');
    expect(bem.getModifier('baz ', 'bar')).toBe('oc-foo__bar--baz');
  });

  it('Handles bem.getResult()', () => {
    const bem = BEM('foo');

    expect(bem.getResult()).toBe('oc-foo');

    bem.addModifiers('  bar');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar');

    bem.addModifiers('baz  qui   ');
    expect(bem.getResult()).toBe('oc-foo oc-foo--bar oc-foo--baz oc-foo--qui');

    bem.addClassNames('qux         ');
    expect(bem.getResult()).toBe(
      'oc-foo oc-foo--bar oc-foo--baz oc-foo--qui qux'
    );

    bem.addClassNames('    corge         thud');
    expect(bem.getResult()).toBe(
      'oc-foo oc-foo--bar oc-foo--baz oc-foo--qui qux corge thud'
    );
  });
});
