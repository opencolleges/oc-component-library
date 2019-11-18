import _ from 'lodash';

const hasErrorOrSuccess = (
  errorArr: string[],
  successArr: string[],
  value: string
): string => {
  if (_.includes(errorArr, value)) {
    return `error`;
  }
  if (_.includes(successArr, value)) {
    return `success`;
  }

  return null;
};

export { hasErrorOrSuccess as default };
