// * imports
import itemise from '../itemise';

// * return true if modifier is found in modifiers
const find = (modifier, modifiers) => {
  return modifiers && itemise(modifiers).indexOf(modifier) > -1;
};

export default find;
