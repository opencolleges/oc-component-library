import includes from '../../utilities/ts/includes';

const hasErrorOrSuccess = (
  errorArr: string[],
  successArr: string[],
  value: string
): string => {
  if (includes(errorArr, value)) {
    return `error`;
  }
  if (includes(successArr, value)) {
    return `success`;
  }

  return null;
};

export { hasErrorOrSuccess as default };
