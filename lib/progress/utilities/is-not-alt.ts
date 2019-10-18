import _ from 'lodash';

function isNotAlt(modifiers: string): boolean {
  modifiers = _.trim(modifiers);

  return !_.includes(_.split(modifiers, ` `), `alt`);
}

export default isNotAlt;
