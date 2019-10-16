import _ from 'lodash';

function getBadgeLabel(value: number | string): string {
  if (_.isNumber(value)) {
    value = _.toInteger(value);
  }

  if (value > 99) {
    return '99+';
  } else if (value > 9) {
    return '9+';
  }

  return _.toString(value);
}

export default getBadgeLabel;
