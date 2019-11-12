import { LikertOptionInterface } from '../../likert';
import { NAMESPACE } from '../../utilities/ts/constants';
import hasLabel from './has-label';

describe(`hasLabel()`, () => {
  it(`Handles an array with a length of three`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(true);
    expect(hasLabel(arr, 2)).toBe(true);
  });

  it(`Handles an array with a length of four`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(true);
    expect(hasLabel(arr, 2)).toBe(true);
    expect(hasLabel(arr, 3)).toBe(true);
  });

  it(`Handles an array with a length of five`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` },
      { id: `${NAMESPACE}-5` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(true);
    expect(hasLabel(arr, 2)).toBe(true);
    expect(hasLabel(arr, 3)).toBe(true);
    expect(hasLabel(arr, 4)).toBe(true);
  });

  it(`Handles an array with a length of six`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` },
      { id: `${NAMESPACE}-5` },
      { id: `${NAMESPACE}-6` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(false);
    expect(hasLabel(arr, 2)).toBe(false);
    expect(hasLabel(arr, 3)).toBe(false);
    expect(hasLabel(arr, 4)).toBe(false);
    expect(hasLabel(arr, 5)).toBe(true);
  });

  it(`Handles an array with a length of seven`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` },
      { id: `${NAMESPACE}-5` },
      { id: `${NAMESPACE}-6` },
      { id: `${NAMESPACE}-7` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(false);
    expect(hasLabel(arr, 2)).toBe(false);
    expect(hasLabel(arr, 3)).toBe(true);
    expect(hasLabel(arr, 4)).toBe(false);
    expect(hasLabel(arr, 5)).toBe(false);
    expect(hasLabel(arr, 6)).toBe(true);
  });

  it(`Handles an array with a length of eight`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` },
      { id: `${NAMESPACE}-5` },
      { id: `${NAMESPACE}-6` },
      { id: `${NAMESPACE}-7` },
      { id: `${NAMESPACE}-8` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(false);
    expect(hasLabel(arr, 2)).toBe(false);
    expect(hasLabel(arr, 3)).toBe(false);
    expect(hasLabel(arr, 4)).toBe(false);
    expect(hasLabel(arr, 5)).toBe(false);
    expect(hasLabel(arr, 6)).toBe(false);
    expect(hasLabel(arr, 7)).toBe(true);
  });

  it(`Handles an array with a length of nine`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` },
      { id: `${NAMESPACE}-5` },
      { id: `${NAMESPACE}-6` },
      { id: `${NAMESPACE}-7` },
      { id: `${NAMESPACE}-8` },
      { id: `${NAMESPACE}-9` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(false);
    expect(hasLabel(arr, 2)).toBe(false);
    expect(hasLabel(arr, 3)).toBe(false);
    expect(hasLabel(arr, 4)).toBe(true);
    expect(hasLabel(arr, 5)).toBe(false);
    expect(hasLabel(arr, 6)).toBe(false);
    expect(hasLabel(arr, 7)).toBe(false);
    expect(hasLabel(arr, 8)).toBe(true);
  });

  it(`Handles an array with a length of 10`, () => {
    const arr: LikertOptionInterface[] = [
      { id: `${NAMESPACE}-1` },
      { id: `${NAMESPACE}-2` },
      { id: `${NAMESPACE}-3` },
      { id: `${NAMESPACE}-4` },
      { id: `${NAMESPACE}-5` },
      { id: `${NAMESPACE}-6` },
      { id: `${NAMESPACE}-7` },
      { id: `${NAMESPACE}-8` },
      { id: `${NAMESPACE}-9` },
      { id: `${NAMESPACE}-10` }
    ];

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(false);
    expect(hasLabel(arr, 2)).toBe(false);
    expect(hasLabel(arr, 3)).toBe(false);
    expect(hasLabel(arr, 4)).toBe(false);
    expect(hasLabel(arr, 5)).toBe(false);
    expect(hasLabel(arr, 6)).toBe(false);
    expect(hasLabel(arr, 7)).toBe(false);
    expect(hasLabel(arr, 8)).toBe(false);
    expect(hasLabel(arr, 9)).toBe(true);
  });

  it(`Handles an array with a length of 11`, () => {
    const arr: LikertOptionInterface[] = [
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

    expect(hasLabel(arr, 0)).toBe(true);
    expect(hasLabel(arr, 1)).toBe(false);
    expect(hasLabel(arr, 2)).toBe(false);
    expect(hasLabel(arr, 3)).toBe(false);
    expect(hasLabel(arr, 4)).toBe(false);
    expect(hasLabel(arr, 5)).toBe(true);
    expect(hasLabel(arr, 6)).toBe(false);
    expect(hasLabel(arr, 7)).toBe(false);
    expect(hasLabel(arr, 8)).toBe(false);
    expect(hasLabel(arr, 9)).toBe(false);
    expect(hasLabel(arr, 10)).toBe(true);
  });
});
