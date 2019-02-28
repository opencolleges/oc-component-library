// * dependancy imports
import moment from 'moment';

// * utility imports
import leadingZero from '../leadingZero';

const getCalendar = date => {
  const calendar = {
    initialDate: date,
    months: []
  };

  const previousMonth = moment(date)
      .subtract(1, 'M')
      .format('YYYY-MM-DD'),
    currentMonth = moment(date).format('YYYY-MM-DD'),
    nextMonth = moment(date)
      .add(1, 'M')
      .format('YYYY-MM-DD');

  buildCalendar(calendar.months, previousMonth, currentMonth, nextMonth);

  return calendar;
};

const buildCalendar = (array, ...months) => {
  for (let index = 0; index < months.length; index++) {
    const month = {
      date: moment(months[index]).format('YYYY-MM-DD'),
      days: []
    };

    const monthsIndex = months[index];

    for (let index = 0; index < moment(monthsIndex).daysInMonth(); index++) {
      const day = moment(
        moment(monthsIndex).format('YYYY-MM-') + leadingZero(index + 1)
      ).format('YYYY-MM-DD');

      month.days.push(day);
    }

    array.push(month);
  }

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  let prevMonthDayCount = 0;

  for (let index = 0; index < weekdays.length; index++) {
    if (moment(array[1].days[0]).format('dd') === weekdays[index]) {
      prevMonthDayCount = index;
      break;
    }
  }

  if (prevMonthDayCount !== 0) {
    array[0].days = array[0].days.slice(0 - prevMonthDayCount);
  } else {
    array[0].days = array[0].days.slice(array[0].days.length);
  }

  let nextMonthDayCount = 0;

  while (
    (array[0].days.length + array[1].days.length + nextMonthDayCount) %
    7
  ) {
    nextMonthDayCount++;
  }

  array[2].days = array[2].days.slice(0, nextMonthDayCount);
};

export default getCalendar;
