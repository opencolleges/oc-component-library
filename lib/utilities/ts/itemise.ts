import * as _ from 'lodash';

function itemise(str: string, separator: RegExp | string = /\s+/g): string[] {
  return _.split(_.trim(str), separator);
}

export default itemise;
