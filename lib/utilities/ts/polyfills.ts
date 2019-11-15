import _ from 'lodash';

// Number.isInteger polyfill for IE11
if (_.isUndefined(Number.isInteger)) {
  Number.isInteger = (value: number): boolean => {
    return (
      typeof value === `number` &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
}
