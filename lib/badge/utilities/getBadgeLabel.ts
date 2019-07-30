import * as _ from 'lodash';

const getBadgeCount = (value: number | string): string => {
  if (value > 99) {
    return '99+';
  } else if (value > 9) {
    return '9+';
  }

  return _.toString(value);
};

export default getBadgeCount;
