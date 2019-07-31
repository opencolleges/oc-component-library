// * global variable imports

import * as _ from 'lodash';

import { NAMESPACE } from '../constant';

// * Initial variable declaration.

// * Get a namespaced, incrementally updated id and return it as a string.

const getId = () => {
  // * Incrementally update the id variable.
  //console.log(_.uniqueId(`${NAMESPACE}-`));
  // * Add a namespace to the id.
  return _.uniqueId(`${NAMESPACE}-`);
};

export default getId;
