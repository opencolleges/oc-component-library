import isFirstOrLastIndex from '../../utilities/js/is-first-or-last-index';
import isOdd from '../../utilities/js/is-odd';

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

export default hasLikertLabel;
