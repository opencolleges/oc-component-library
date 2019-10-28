import _ from 'lodash';

const remove = (modifier: string | string[], modifiers: string): string => {
  if (modifiers) {
    if (typeof modifier === `string`) {
      modifier = _.trim(modifier).split(/\s+/);
    }

    modifier.forEach(index => {
      modifiers = modifiers.replace(_.trim(index), ``);
    });

    modifiers = _.trim(modifiers.replace(/\s+/g, ` `));
  }

  return modifiers;
};

export default remove;
