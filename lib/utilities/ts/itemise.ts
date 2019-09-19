const itemise = (str: string, separator: RegExp | string = / +/g) => {
  return str.trim().split(separator);
};

export default itemise;
