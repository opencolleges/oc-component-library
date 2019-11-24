import _ from 'lodash';
import isArr from './is-arr';
import isObj from './is-obj';

const includes = (
  collection: string | Array<number | string | { [key: string]: any }>,
  value: number | string | Array<number | string> | { [key: string]: any }
): boolean => {
  if (Array.isArray(value)) {
    let bool: boolean = false;

    for (const i of value) {
      if (_.includes(collection, i)) {
        bool = true;
        break;
      }
    }

    return bool;
  }

  if (isArr(collection) && isObj(value)) {
    return _.some(collection, value);
  }

  return _.includes(collection, value);
};

export { includes as default };
