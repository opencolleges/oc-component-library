import BEM from './bem';

import { NAMESPACE } from './constants';

describe(`BEM`, () => {
  it(`Handles bem.classNames()`, () => {
    const bem = BEM(`foo`);

    bem.addClassNames(``);
    bem.addClassNames(null);
    bem.addModifiers(`bar`);
    expect(bem.getResult()).toBe(`${NAMESPACE}-foo ${NAMESPACE}-foo--bar`);

    bem.addClassNames(`baz`);
    expect(bem.getResult()).toBe(`${NAMESPACE}-foo ${NAMESPACE}-foo--bar baz`);

    bem.addClassNames(` qui   qui qui qui            qux`);
    expect(bem.getResult()).toBe(
      `${NAMESPACE}-foo ${NAMESPACE}-foo--bar baz qui qux`
    );
  });

  it(`Handles bem.addModifiers()`, () => {
    const bem = BEM(`foo`);

    bem.addModifiers(``);
    bem.addModifiers(null);
    bem.addModifiers(`bar        `);
    bem.addModifiers(`     foo--bar foo--bar`);
    expect(bem.getResult()).toBe(`${NAMESPACE}-foo ${NAMESPACE}-foo--bar`);

    bem.addModifiers(`  baz qui`);
    expect(bem.getResult()).toBe(
      `${NAMESPACE}-foo ${NAMESPACE}-foo--bar ${NAMESPACE}-foo--baz ${NAMESPACE}-foo--qui`
    );
  });

  it(`Handles bem.getBlock()`, () => {
    const bem = BEM(`foo`);

    bem.addModifiers(`bar`);
    bem.addClassNames(`baz qui`);

    expect(bem.getBlock()).toBe(`${NAMESPACE}-foo`);
    expect(bem.getResult()).toBe(
      `${NAMESPACE}-foo ${NAMESPACE}-foo--bar baz qui`
    );
  });

  it(`Handles bem.getElement()`, () => {
    const bem = BEM(`foo`);

    expect(bem.getElement(`bar`)).toBe(`${NAMESPACE}-foo__bar`);
    expect(bem.getElement(`  baz    `)).toBe(`${NAMESPACE}-foo__baz`);
  });

  it(`Handles bem.getModifier()`, () => {
    const bem = BEM(`foo`);

    expect(bem.getModifier(`       bar`)).toBe(`${NAMESPACE}-foo--bar`);
    expect(bem.getModifier(`baz `, `bar`)).toBe(`${NAMESPACE}-foo__bar--baz`);
  });

  it(`Handles bem.getResult()`, () => {
    const bem = BEM(`foo`);

    expect(bem.getResult()).toBe(`${NAMESPACE}-foo`);

    bem.addModifiers(`  bar`);
    expect(bem.getResult()).toBe(`${NAMESPACE}-foo ${NAMESPACE}-foo--bar`);

    bem.addModifiers(`baz  qui   `);
    expect(bem.getResult()).toBe(
      `${NAMESPACE}-foo ${NAMESPACE}-foo--bar ${NAMESPACE}-foo--baz ${NAMESPACE}-foo--qui`
    );

    bem.addClassNames(`qux         `);
    expect(bem.getResult()).toBe(
      `${NAMESPACE}-foo ${NAMESPACE}-foo--bar ${NAMESPACE}-foo--baz ${NAMESPACE}-foo--qui qux`
    );

    bem.addClassNames(`    corge         thud`);
    expect(bem.getResult()).toBe(
      `${NAMESPACE}-foo ${NAMESPACE}-foo--bar ${NAMESPACE}-foo--baz ${NAMESPACE}-foo--qui qux corge thud`
    );
  });
});
