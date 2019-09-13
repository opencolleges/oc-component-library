import isEven from './is-even';

function isOdd(num: number): boolean {
  return !isEven(num);
}

export default isOdd;
