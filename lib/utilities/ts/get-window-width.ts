import {
  MEDIUM_BREAKPOINT,
  SMALL_BREAKPOINT
} from '../../utilities/ts/constants';

const getWindowWidth = (): string => {
  const WINDOW_WIDTH: number = window.innerWidth;

  let context: string = `small`;

  if (WINDOW_WIDTH > SMALL_BREAKPOINT) {
    context = `medium`;
  }

  if (WINDOW_WIDTH > MEDIUM_BREAKPOINT) {
    context = `large`;
  }

  return context;
};

export { getWindowWidth as default };
