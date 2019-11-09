import isEven from './is-even';

const isOdd = (num: number): boolean => {
  return !isEven(num);
};

export { isOdd as default };
