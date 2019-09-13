// * Get the file name's extenstion, then return it as a string.

const getExtension = fileName => {
  // * Initial variable declaration.
  let result = null;

  // * Store the last substring from fileName in result.
  result = fileName.split('.').pop();

  return result;
};

export default getExtension;
