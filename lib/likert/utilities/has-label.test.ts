import { LikertOptionInterface } from '../../likert';
import { NAMESPACE } from '../../utilities/ts/constants';
import hasLabel from './has-label';

const TEST_COLLECTION: LikertOptionInterface[] = [
  { id: `${NAMESPACE}-1` },
  { id: `${NAMESPACE}-2` },
  { id: `${NAMESPACE}-3` },
  { id: `${NAMESPACE}-4` },
  { id: `${NAMESPACE}-5` },
  { id: `${NAMESPACE}-6` },
  { id: `${NAMESPACE}-7` },
  { id: `${NAMESPACE}-8` },
  { id: `${NAMESPACE}-9` },
  { id: `${NAMESPACE}-10` },
  { id: `${NAMESPACE}-11` }
];

describe(`hasLabel()`, () => {
  it(`Handles an array with a length of three`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 3), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 3), 1)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 3), 2)).toBe(true);
  });

  it(`Handles an array with a length of four`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 4), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 4), 1)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 4), 2)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 4), 3)).toBe(true);
  });

  it(`Handles an array with a length of five`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 5), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 5), 1)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 5), 2)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 5), 3)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 5), 4)).toBe(true);
  });

  it(`Handles an array with a length of six`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 6), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 6), 1)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 6), 2)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 6), 3)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 6), 4)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 6), 5)).toBe(true);
  });

  it(`Handles an array with a length of seven`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 1)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 2)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 3)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 4)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 5)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 7), 6)).toBe(true);
  });

  it(`Handles an array with a length of eight`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 1)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 2)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 3)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 4)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 5)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 6)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 8), 7)).toBe(true);
  });

  it(`Handles an array with a length of nine`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 1)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 2)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 3)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 4)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 5)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 6)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 7)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 9), 8)).toBe(true);
  });

  it(`Handles an array with a length of 10`, () => {
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 0)).toBe(true);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 1)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 2)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 3)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 4)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 5)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 6)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 7)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 8)).toBe(false);
    expect(hasLabel([...TEST_COLLECTION].slice(0, 10), 9)).toBe(true);
  });

  it(`Handles an array with a length of 11`, () => {
    expect(hasLabel(TEST_COLLECTION, 0)).toBe(true);
    expect(hasLabel(TEST_COLLECTION, 1)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 2)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 3)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 4)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 5)).toBe(true);
    expect(hasLabel(TEST_COLLECTION, 6)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 7)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 8)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 9)).toBe(false);
    expect(hasLabel(TEST_COLLECTION, 10)).toBe(true);
  });
});
