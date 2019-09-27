import * as _ from 'lodash';

import { NAMESPACE } from './constants';

const namespace = (...classNames: string[]): string => {
  const arr: string[] = [];

  _.forEach(classNames, className => {
    if (!_.isUndefined(className)) {
      _.forEach(_.split(_.trim(className), /\s+/g), value => {
        if (!_.isEmpty(value)) {
          arr.push(`${NAMESPACE}-${value}`);
        }
      });
    }
  });

  return _.join(arr, ' ');
};

export default namespace;
