import _ from 'lodash';
import { NAMESPACE } from './constants';

const getId = (): string => {
  return _.uniqueId(`${NAMESPACE}-`);
};

export { getId as default };
