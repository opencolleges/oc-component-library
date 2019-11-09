import isLastIndex from './is-last-index';

const isFirstOrLastIndex = (arr: any[], index: number): boolean => {
  return index === 0 || isLastIndex(arr, index);
};

export { isFirstOrLastIndex as default };
