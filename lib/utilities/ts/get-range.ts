const getRange = (startIndex: number, endIndex: number): number[] => {
  const range = [];
  let start: number = startIndex;

  while (start <= endIndex) {
    range.push(start);
    start++;
  }

  return range;
};

export { getRange as default };
