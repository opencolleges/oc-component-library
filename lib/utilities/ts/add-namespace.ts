import _ from 'lodash';

import { NAMESPACE } from './constants';

const addNamespace = (className: string): string => {
  className = _.trim(className);

  return `${NAMESPACE}-${className}`;
};

export { addNamespace as default };
