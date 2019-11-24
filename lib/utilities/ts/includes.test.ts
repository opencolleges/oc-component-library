import includes from './includes';

const TEST_COLLECTION: Array<number | string | { [key: string]: any }> = [
  `foo`,
  `bar`,
  1,
  2,
  { baz: `qui` },
  { qux: `corge` },
  { thud: [1, 2, 3] }
];

describe(`includes()`, () => {
  it(`Handles an array as 'collection' argument`, () => {
    expect(includes(TEST_COLLECTION, `foo`)).toBe(true);
    expect(includes(TEST_COLLECTION, `bar`)).toBe(true);
    expect(includes(TEST_COLLECTION, `baz`)).toBe(false);
    expect(includes(TEST_COLLECTION, 1)).toBe(true);
    expect(includes(TEST_COLLECTION, 2)).toBe(true);
    expect(includes(TEST_COLLECTION, 3)).toBe(false);
  });

  it(`Handles a string as 'collection' argument`, () => {
    expect(includes(`foo`, `foo`)).toBe(true);
    expect(includes(`bar`, `bar`)).toBe(true);
    expect(includes(`bar`, `baz`)).toBe(false);
  });

  it(`Handles an array as 'collection' argument and an array as 'value' argument`, () => {
    expect(includes(TEST_COLLECTION, [`foo`, `bar`])).toBe(true);
    expect(includes(TEST_COLLECTION, [`bar`, `baz`])).toBe(true);
    expect(includes(TEST_COLLECTION, [`baz`, `qui`])).toBe(false);
    expect(includes(TEST_COLLECTION, [1, 2])).toBe(true);
    expect(includes(TEST_COLLECTION, [2, 3])).toBe(true);
    expect(includes(TEST_COLLECTION, [3, 4])).toBe(false);
  });

  it(`Handles a string as 'collection' argument and an array as 'value' argument`, () => {
    expect(includes(`foo__bar`, [`foo`, `bar`])).toBe(true);
    expect(includes(`foo__bar`, [`bar`, `baz`])).toBe(true);
    expect(includes(`foo__bar`, [`baz`, `qui`])).toBe(false);
  });

  it(`Handles an array as 'collection' arguemnt and an object as 'value' arguemnt`, () => {
    expect(includes(TEST_COLLECTION, { foo: `bar` })).toBe(false);
    expect(includes(TEST_COLLECTION, { baz: `qui` })).toBe(true);
    expect(includes(TEST_COLLECTION, { baz: `qux` })).toBe(false);
    expect(includes(TEST_COLLECTION, { qux: `corge` })).toBe(true);
    expect(includes(TEST_COLLECTION, { thud: `corge` })).toBe(false);
    expect(includes(TEST_COLLECTION, { thud: [1, 2, 3] })).toBe(true);
    expect(includes(TEST_COLLECTION, { thud: [1, 2, 3, 4] })).toBe(false);
  });

  it(`Handles a string as 'collection' arguemnt and an object as 'value' arguemnt`, () => {
    expect(includes(`foo__bar`, { foo: `bar` })).toBe(false);
    expect(includes(`foo__bar`, { baz: `qui` })).toBe(false);
  });
});
