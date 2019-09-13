import itemise from './itemise';

import * as _ from 'lodash';

const toModifier = (modifiers: string[] | string, block: string): string => {
  const arr: string[] = [];

  if (typeof modifiers === 'string') {
    modifiers = itemise(modifiers);
  }

  _.forEach(modifiers, modifier => {
    if (modifier.indexOf(`${block}--`) > -1) {
      arr.push(modifier);
    } else {
      arr.push(`${block}--${modifier}`);
    }
  });

  return _.join(arr, ' ');
};

export default toModifier;
