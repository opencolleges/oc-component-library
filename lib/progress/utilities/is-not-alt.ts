import _ from 'lodash';

const isNotAlt = (modifiers: string): boolean => {
  modifiers = _.trim(modifiers);

  return !_.includes(_.split(modifiers, ` `), `alt`);
};

export { isNotAlt as default };
