import { uniqueId } from '../utilities';

function constructScale(range, options) {
  const scale = [];

  for (let index = 0; index < range; index++) {
    scale.push({ id: uniqueId(), label: options[index].label });
  }

  return scale;
}

export { constructScale };
