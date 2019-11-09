import _ from 'lodash';

import itemise from './itemise';

const toModifier = (modifiers: string[] | string, block: string): string => {
  const arr: string[] = [];

  if (typeof modifiers === `string`) {
    modifiers = itemise(modifiers);
  }

  _.forEach(modifiers, modifier => {
    if (modifier) {
      if (modifier.indexOf(`${block}--`) !== -1) {
        arr.push(modifier);
      } else {
        arr.push(`${block}--${modifier}`);
      }
    }
  });

  return _.join(arr, ` `);
};

export { toModifier as default };
