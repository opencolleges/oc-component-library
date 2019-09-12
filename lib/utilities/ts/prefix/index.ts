// * global variable imports
import { namespace } from '../variables';

// * utility imports
import itemise from '../itemise';

const prefix = (modifiers, separator = ' ', classNames = '') => {
  if (modifiers) {
    itemise(modifiers).forEach((modifier, index) => {
      index === 0
        ? (classNames += `${namespace}-${modifier}`)
        : (classNames += `${separator}${namespace}-${modifier}`);
    });
  }

  return classNames;
};

export default prefix;
