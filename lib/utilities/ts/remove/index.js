// * remove specific modifier if it exists in modifiers
const remove = (modifier, modifiers) => {
  let classes = modifiers;

  // * if modifiers exist and modifier is a string, remove modifier from modifiers
  modifiers &&
    typeof modifier === `string` &&
    (classes = classes.replace(modifier, ``));

  // * if modifiers exist and modifier is an array, remove each modifier from modifiers
  modifiers &&
    Array.isArray(modifier) &&
    modifier.forEach(value => {
      classes = classes.replace(value, ``);
    });

  return classes;
};

export default remove;
