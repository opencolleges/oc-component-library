// global namespace declaration
const pre = 'oc';

// global id count
let id = 0;

function uniqueId() {
  id++;
  return `${pre}-${id}`;
}

// return modifiers in an array
function itemise(modifiers, separator = / +/g) {
  return modifiers.trim().split(separator);
}

// return modifiers with global namespace prefix
function prefix(modifiers, separator = ' ', classNames = '') {
  modifiers &&
    itemise(modifiers).forEach((modifier, index) => {
      index === 0
        ? (classNames += `${pre}-${modifier}`)
        : (classNames += `${separator}${pre}-${modifier}`);
    });
  return classNames;
}

// return true if modifier is found in modifiers
function find(modifier, modifiers) {
  return modifiers && itemise(modifiers).indexOf(modifier) > -1;
}

// remove specific modifier if it exists in modifiers
function remove(modifier, modifiers) {
  let classes = modifiers;

  // if modifiers exist and modifier is a string, remove modifier from modifiers
  modifiers &&
    typeof modifier === 'string' &&
    (classes = classes.replace(modifier, ''));

  // if modifiers exist and modifier is an array, remove each modifier from modifiers
  modifiers &&
    Array.isArray(modifier) &&
    modifier.forEach(value => {
      classes = classes.replace(value, '');
    });

  return classes;
}

// calculate a file's size
function byteSize(fileSize) {
  let result;

  fileSize >= 1000000000
    ? (result = `${Math.round((fileSize / 1000000000) * 100) / 100}GB`)
    : fileSize >= 1000000
    ? (result = `${Math.round((fileSize / 1000000) * 10) / 10}MB`)
    : fileSize >= 1000
    ? (result = `${Math.round(fileSize / 1000)}kB`)
    : (result = `${fileSize}bytes`);

  return result;
}

// return a random number between a range of minimum and maximum (inclusive)
function randomise(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function count(value) {
  value > 99 && (value = '99+');
  value > 9 && (value = '9+');

  return value;
}

function getRange(startIndex, endIndex) {
  let range = [];
  let start = startIndex;

  while (start <= endIndex) {
    range.push(start);
    start++;
  }

  return range;
}

function getWindowWidth() {
  const windowWidth = window.innerWidth;

  let context;

  windowWidth <= 480
    ? (context = 'small')
    : windowWidth <= 768
    ? (context = 'medium')
    : (context = 'large');

  return context;
}

export {
  pre,
  uniqueId,
  itemise,
  prefix,
  find,
  remove,
  byteSize,
  randomise,
  count,
  getRange,
  getWindowWidth
};
