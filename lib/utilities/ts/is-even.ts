function isEven(num: number): boolean {
  if (Number.isInteger(num)) {
    return Math.abs(num) % 2 === 0;
  }
}

export default isEven;
