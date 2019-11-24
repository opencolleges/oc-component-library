import _ from 'lodash';

const randomise = (min: number, max: number): number => {
  return _.random(min, max);
};

export { randomise as default };
