import * as _ from 'lodash';
import { NAMESPACE } from '../constants';

/**
 * Return a string of class names, derived from the class names passed.
 *
 * @author Saumil Shah
 * @param {String} classNames - initial string.
 * @return {String} - returns string of classNames
 */

const namespace = (...classNames: string[]): string => {
  const classArr: string[] = [];

  _.forEach(classNames, className => {
    if (!_.isUndefined(className)) {
      _.forEach(_.split(_.trim(className), / +/g), value => {
        if (!_.isEmpty(value)) {
          classArr.push(`${NAMESPACE}-${value}`);
        }
      });
    }
  });

  return _.join(classArr, ' ');
};

export default namespace;
