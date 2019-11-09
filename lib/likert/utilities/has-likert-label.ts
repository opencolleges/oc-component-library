import isFirstOrLastIndex from '../../utilities/ts/is-first-or-last-index';
import isOdd from '../../utilities/ts/is-odd';

const hasLikertLabel = (
  arr: Array<{ id: string; label?: string }>,
  index: number
): boolean => {
  return (
    arr.length <= 5 ||
    (isOdd(arr.length) && index === Math.floor(arr.length / 2)) ||
    isFirstOrLastIndex(arr, index)
  );
};

export { hasLikertLabel as default };
