import pxToRem from '../../utilities/ts/px-to-rem';

const getTop = (
  element: any,
  offset: number = 16,
  gutter: number = 16
): number => {
  let position: number = offset;

  position += element.clientHeight / 2;

  while (element.previousSibling) {
    element = element.previousSibling;

    position += gutter + element.clientHeight;
  }

  return Number(pxToRem(position));
};

export default getTop;
