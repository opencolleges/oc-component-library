import { uniqueId } from '../utilities';

function constructScale(range, options) {
  const scale = [];

  (range < 3 && (range = 3)) || (range > 10 && (range = 10));

  for (let index = 0; index < range; index++) {
    scale.push({ id: uniqueId(), label: options[index].label });
  }

  return scale;
}

export { constructScale };
