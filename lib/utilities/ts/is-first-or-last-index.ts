import isLastIndex from './is-last-index';

function isFirstOrLastIndex(arr: any[], index: number): boolean {
  return index === 0 || isLastIndex(arr, index);
}

export default isFirstOrLastIndex;
