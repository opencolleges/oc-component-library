const getWindowWidth = (): string => {
  const windowWidth: number = window.innerWidth;

  let context: string;

  windowWidth <= 480
    ? (context = `small`)
    : windowWidth <= 768
    ? (context = `medium`)
    : (context = `large`);

  return context;
};

export { getWindowWidth as default };
