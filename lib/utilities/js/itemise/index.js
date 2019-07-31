const itemise = (modifiers, separator = / +/g) => {
  return modifiers.trim().split(separator);
};

export default itemise;
