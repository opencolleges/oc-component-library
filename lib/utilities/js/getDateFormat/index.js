// * dependancy imports
import moment from 'moment';

const getDateFormat = (date, format) => {
  return moment(date).format(format);
};

export default getDateFormat;
