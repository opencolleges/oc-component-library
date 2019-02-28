const getRange = (startIndex, endIndex) => {
  let range = [];
  let start = startIndex;

  while (start <= endIndex) {
    range.push(start);
    start++;
  }

  return range;
};

export default getRange;
