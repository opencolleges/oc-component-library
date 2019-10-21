import _ from 'lodash';

function hasErrorOrSuccess(
  errorArr: string[],
  successArr: string[],
  value: string
): string | null {
  if (_.includes(errorArr, value)) {
    return 'error';
  }
  if (_.includes(successArr, value)) {
    return 'success';
  }
  return null;
}

export default hasErrorOrSuccess;
