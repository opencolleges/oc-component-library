import isOdd from '../../utilities/js/is-odd';

const hasLikertLabel = (arrLength: number, i: number): boolean => {
  if (
    arrLength <= 5 ||
    (isOdd(arrLength) && i === Math.floor(arrLength / 2)) ||
    i === 0 ||
    i === arrLength - 1
  ) {
    return true;
  }

  return false;
};

export default hasLikertLabel;
