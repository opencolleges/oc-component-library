import _ from 'lodash';
import getId from '../../utilities/ts/get-id';
import isObj from '../../utilities/ts/is-obj';

const addId = (collection: any[]): any[] => {
  const COLLECTION: any[] = _.cloneDeep(collection);

  for (const i of COLLECTION) {
    if (isObj(i) && !i.id) {
      i.id = getId();
    }
  }

  return COLLECTION;
};

export { addId as default };
