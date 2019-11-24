import _ from 'lodash';

const isArr = (type: any): boolean => {
  return _.isArray(type);
};

export { isArr as default };
