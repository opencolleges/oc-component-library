import { NAMESPACE } from '../../utilities/ts/constants';

import _ from 'lodash';

function getLikertScale(
  options: Array<{
    label?: string;
  }>
): Array<{ id: string; label: string }> {
  const SCALE: Array<{ id: string; label: string }> = [];

  let range: number = options.length;

  if (range < 3) {
    range = 3;
  }
  if (range > 11) {
    range = 11;
  }

  for (let i = 0; i < range; i++) {
    const OPTION: { id: string; label: string } = {
      id: _.uniqueId(`${NAMESPACE}-`),
      label: options[i] && options[i].label ? options[i].label : ``
    };

    SCALE.push(OPTION);
  }

  return SCALE;
}

export default getLikertScale;
