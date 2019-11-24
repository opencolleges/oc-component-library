import _ from 'lodash';
import includes from '../../utilities/ts/includes';

const isNotAlt = (modifiers: string): boolean => {
  modifiers = _.trim(modifiers);

  return !includes(_.split(modifiers, /\s+/g), `alt`);
};

export { isNotAlt as default };
