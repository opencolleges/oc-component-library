const getWindowWidth = (): string => {
  const windowWidth = window.innerWidth;

  let context;

  windowWidth <= 480
    ? (context = 'small')
    : windowWidth <= 768
    ? (context = 'medium')
    : (context = 'large');

  return context;
};

export default getWindowWidth;
