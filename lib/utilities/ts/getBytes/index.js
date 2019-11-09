// * Get the appropriate unit of measure to apply to a number of bytes, then
// * return the number and unit of measure as a string.

const getBytes = bytes => {
  // * Initial variable declaration.
  let result = null;

  // * Convert bytes to a number.
  parseInt(bytes);

  // * If bytes is greater than or equal to 1099511627776 then divide bytes
  // * by 1099511627776 and apply TeraByte ('TB') as the unit of measure.
  if (bytes >= 1099511627776) {
    result = `${Math.round((bytes / 1099511627776) * 1000) / 1000} TB`;
  }

  // * If bytes is greater than or equal to 1073741824 then divide bytes by
  // * 1073741824 and apply GigaByte ('GB') as the unit of measure.
  else if (bytes >= 1073741824) {
    result = `${Math.round((bytes / 1073741824) * 100) / 100} GB`;
  }

  // * If bytes is greater than or equal to 1048576 then divide bytes by
  // * 1048576 and apply MegaByte ('MB') as the unit of measure.
  else if (bytes >= 1048576) {
    result = `${Math.round((bytes / 1048576) * 10) / 10} MB`;
  }

  // * If bytes is greater than or equal to 1024 then divide bytes by 1024
  // * and apply KiloByte ('kB') as the unit of measure.
  else if (bytes >= 1024) {
    result = `${Math.round(bytes / 1024)} kB`;
  }

  // * Apply 'bytes' as the unit of measure by default.
  else {
    result = `${bytes} bytes`;
  }

  return result;
};

export { getBytes as default };
