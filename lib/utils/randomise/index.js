// return a random number between a range of minimum and maximum (inclusive)
const randomise = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export default randomise;
