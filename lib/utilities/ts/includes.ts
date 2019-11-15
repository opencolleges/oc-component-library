import _ from 'lodash';

const includes = (
  collection: string | Array<number | string>,
  value: number | string | Array<number | string>
): boolean => {
  if (Array.isArray(value)) {
    let bool: boolean = false;

    for (const index of value) {
      if (_.includes(collection, index)) {
        bool = true;
        break;
      }
    }

    return bool;
  }

  return _.includes(collection, value);
};

export { includes as default };
