import { uniqueId } from '../utilities';

function constructScale(options) {
  const scale = [];
  let range = options.length;

  (range < 3 && (range = 3)) || (range > 10 && (range = 10));

  for (let index = 0; index < range; index++) {
    scale.push({ id: uniqueId() });

    options[index] && options[index].label
      ? (scale[index].label = options[index].label)
      : (scale[index].label = '');
  }

  return scale;
}

export { constructScale };
