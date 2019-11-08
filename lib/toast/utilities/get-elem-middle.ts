import pxToRem from '../../utilities/ts/px-to-rem';
import remToPx from '../../utilities/ts/rem-to-px';

const getElemMiddle = (
  element: any,
  offset: number = 1,
  gutter: number = 1
): number => {
  offset = Number(remToPx(offset));
  gutter = Number(remToPx(gutter));

  let position: number = offset;

  position += element.clientHeight / 2;

  while (element.previousSibling !== null) {
    element = element.previousSibling;

    position += gutter + element.clientHeight;
  }

  return Number(pxToRem(position));
};

export default getElemMiddle;
