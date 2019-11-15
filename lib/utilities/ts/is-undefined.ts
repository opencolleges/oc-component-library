import _ from 'lodash';

const isUndefined = (variable: any): boolean => {
  return _.isUndefined(variable);
};

export { isUndefined as default };
