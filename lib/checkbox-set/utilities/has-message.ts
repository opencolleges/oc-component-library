const hasMessage = (
  errorArr: string[],
  successArr: string[],
  message: string
): boolean => {
  return (errorArr.length !== 0 || successArr.length !== 0) && !!message;
};

export { hasMessage as default };
