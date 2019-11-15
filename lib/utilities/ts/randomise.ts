import _ from 'lodash';

const randomise = (min, max) => {
  return _.random(min, max);
};

export { randomise as default };
