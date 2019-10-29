const calculateValue = (value: string, maxLength: number): string => {
  if (!value) {
    return ``;
  }

  if (maxLength && maxLength > 0 && value.length >= maxLength) {
    return value.substring(0, maxLength);
  }

  return value;
};

export default calculateValue;
