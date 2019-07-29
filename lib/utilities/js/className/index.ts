import * as _ from 'lodash';
import { NAMESPACE } from '../constant';

/**
 * Return string of class names, derived from the class names passed.
 *
 * @author Saumil Shah
 * @param {String} classNames - initial string.
 * @return {String} - returns string of classNames
 */

const className = (...classNames: string[]): string => {
  let classes: string[] = [];

  _.forEach(classNames, name => {
    if (!_.isUndefined(name)) {
      _.forEach(_.split(_.trim(name), ' '), value => {
        if (value !== '') {
          classes.push(`${NAMESPACE}-${value}`);
        }
      });
    }
  });

  return _.join(classes, ' ');
};

export default className;
