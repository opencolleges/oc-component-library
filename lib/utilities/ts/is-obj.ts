import _ from 'lodash';

const isObj = (type: any): boolean => {
  return _.isObject(type) && type.constructor === Object;
};

export { isObj as default };
