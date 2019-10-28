// Number.isInteger polyfill for IE11
if (typeof Number.isInteger === `undefined`) {
  Number.isInteger = value => {
    return (
      typeof value === `number` &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
}
