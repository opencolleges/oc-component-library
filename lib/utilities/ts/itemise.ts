import * as _ from 'lodash';

const itemise = (str: string, separator: RegExp | string = /\s+/g) => {
  return _.split(_.trim(str), separator);
};

export default itemise;
