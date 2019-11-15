const truncateString = (str: string = ``, maxLength: number): string => {
  if (maxLength && str.length >= maxLength) {
    return str.substring(0, maxLength);
  }

  return str;
};

export { truncateString as default };
