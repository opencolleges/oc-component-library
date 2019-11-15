import _ from 'lodash';

const itemise = (
  str: string,
  separator: RegExp | string = /\s+/g
): string[] => {
  return _.split(_.trim(str), separator);
};

export { itemise as default };
