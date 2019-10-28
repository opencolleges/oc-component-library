import itemise from './itemise';

describe(`itemise()`, () => {
  it(`Handles a string argument`, () => {
    expect(itemise(`Foo Bar `)).toMatchObject([`Foo`, `Bar`]);
    expect(itemise(`    Baz      Qui  Qux    `)).toMatchObject([
      `Baz`,
      `Qui`,
      `Qux`
    ]);
  });

  it(`Handles a string separator`, () => {
    expect(itemise(`Foo,Bar,Baz`, `,`)).toMatchObject([`Foo`, `Bar`, `Baz`]);
    expect(itemise(`qui-qux`, `-`)).toMatchObject([`qui`, `qux`]);
  });
});
