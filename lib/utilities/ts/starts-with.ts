import _ from 'lodash';
import isArr from './is-arr';

const startsWith = (string: string, value: string | string[]): boolean => {
  string = _.trim(string);
  string = string.toLowerCase();

  if (Array.isArray(value)) {
    let bool: boolean = false;

    for (let i of value) {
      i = _.trim(i);
      i = i.toLowerCase();

      if (_.startsWith(string, i)) {
        bool = true;
        break;
      }
    }

    return bool;
  } else {
    return _.startsWith(string, value);
  }
};

export { startsWith as default };
