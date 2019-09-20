import itemise from '../itemise';

const find = (
  subStr: string,
  str: string,
  separator: RegExp | string = / +/g
) => {
  return str && itemise(str, separator).indexOf(subStr) > -1;
};

export default find;
