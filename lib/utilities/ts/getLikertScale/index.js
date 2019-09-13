import * as _ from 'lodash';

import NAMESPACE from '../constants';

const constructScale = options => {
  const scale = [];
  let range = options.length;

  (range < 3 && (range = 3)) || (range > 11 && (range = 11));

  for (let index = 0; index < range; index++) {
    scale.push({ id: _.uniqueId(`${NAMESPACE}-`) });

    options[index] && options[index].label
      ? (scale[index].label = options[index].label)
      : (scale[index].label = '');
  }

  return scale;
};

export default constructScale;