const truncateString = (str: string = ``, maxLength: number): string => {
  if (maxLength && maxLength < str.length) {
    return str.substring(0, maxLength);
  }

  return str;
};

export { truncateString as default };
