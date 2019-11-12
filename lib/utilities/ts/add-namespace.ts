import _ from 'lodash';

import { NAMESPACE } from './constants';

const addNamespace = (classNames: string): string => {
  const ARR: string[] = [];
  const CLASS_NAMES: string[] = _.split(_.trim(classNames), /\s+/g);

  _.forEach(CLASS_NAMES, CLASS_NAME => {
    if (!!CLASS_NAME) {
      ARR.push(`${NAMESPACE}-${CLASS_NAME}`);
    }
  });

  return _.join(ARR, ` `);
};

export { addNamespace as default };
