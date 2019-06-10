// * global variable imports
import { namespace } from '../variables';

// * Initial variable declaration.
let id = 0;

// * Get a namespaced, incrementally updated id and return it as a string.

const getId = () => {
  // * Incrementally update the id variable.
  id++;

  // * Add a namespace to the id.
  return `${namespace}-${id}`;
};

export default getId;
