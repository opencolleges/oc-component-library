const date = {
  now: new Date(),

  months: [
    { name: 'January', season: { index: 0, name: 'Summer' } },
    { name: 'February', season: { index: 0, name: 'Summer' } },
    { name: 'March', season: { index: 1, name: 'Autumn' } },
    { name: 'April', season: { index: 1, name: 'Autumn' } },
    { name: 'May', season: { index: 1, name: 'Autumn' } },
    { name: 'June', season: { index: 2, name: 'Winter' } },
    { name: 'July', season: { index: 2, name: 'Winter' } },
    { name: 'August', season: { index: 2, name: 'Winter' } },
    { name: 'September', season: { index: 3, name: 'Spring' } },
    { name: 'October', season: { index: 3, name: 'Spring' } },
    { name: 'November', season: { index: 3, name: 'Spring' } },
    { name: 'December', season: { index: 0, name: 'Summer' } }
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  ordinals: {
    '0': 'th',
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
    '4': 'th',
    '5': 'th',
    '6': 'th',
    '7': 'th',
    '8': 'th',
    '9': 'th'
  },

  getLastIndex(string) {
    return string.slice(-1);
  },

  getLeadingZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
  },

  getOrdinal(number) {
    let ordinal = number.toString();
    ordinal = this.getLastIndex(ordinal);

    return `${ordinal}${this.ordinals[ordinal]}`;
  },

  getYear(date = this.now) {
    return date.getFullYear();
  },

  getSeason(date = this.now) {
    return this.months[this.getMonthIndex(date)].season.name;
  },

  getSeasonIndex(date = this.now) {
    return this.months[this.getMonthIndex(date)].season.index;
  },

  getMonth(date = this.now) {
    return this.months[this.getMonthIndex(date)].name;
  },

  getMonthCalendar(date = this.now) {
    const calendar = {};

    const year = this.getYear(date);
    const monthIndex = this.getMonthIndex(date);

    calendar.dates = [];

    const monthLength = this.getMonthLength(date);

    for (let index = 0; index < monthLength; index++) {
      calendar.dates.push({
        date: index + 1,
        day: this.getDay(
          new Date(
            `${year}-${monthIndex + 1}-${this.getLeadingZero(index + 1)}`
          )
        )
      });
    }

    return calendar;
  },

  getMonthIndex(date = this.now) {
    return date.getMonth();
  },

  getMonthLength(date = this.now) {
    return new Date(
      this.getYear(date),
      this.getMonthIndex(date) + 1,
      0
    ).getDate();
  },

  getDate(date = this.now) {
    return date.getDate();
  },

  getISODate(date = this.now) {
    const year = this.getYear(date);

    let month = this.getMonthIndex(date) + 1;
    month = this.getLeadingZero(month);

    let day = this.getDate(date);
    day = this.getLeadingZero(day);

    return `${year}-${month}-${day}`;
  },

  getShortDate(date = this.now) {
    const year = this.getYear(date);

    let month = this.getMonthIndex(date) + 1;
    month = this.getLeadingZero(month);

    let day = this.getDate(date);
    day = this.getLeadingZero(day);

    return `${day}/${month}/${year}`;
  },

  getLongDate(date = this.now) {
    const year = this.getYear(date);
    const month = this.getMonth(date);

    let day = this.getDate(date);
    day = this.getOrdinal(day);

    return `${day} ${month}, ${year}`;
  },

  getDay(date = this.now) {
    return this.days[date.getDay()];
  },

  getDayIndex(date = this.now) {
    return date.getDay();
  },

  get12HourTime(date = this.now) {
    let hour = this.getHour(date);
    hour = hour % 12 !== 0 ? hour % 12 : hour;

    let minute = this.getMinute(date);
    minute = this.getLeadingZero(minute);

    const meridiem = hour > 0 && hour < 12 ? 'AM' : 'PM';

    return `${hour}:${minute} ${meridiem}`;
  },

  get24HourTime(date = this.now) {
    let hour = this.getHour(date);
    hour = this.getLeadingZero(hour);

    let minute = this.getMinute(date);
    minute = this.getLeadingZero(minute);

    return `${hour}:${minute}`;
  },

  getHour(date = this.now) {
    return date.getHours();
  },

  getMinute(date = this.now) {
    return date.getMinutes();
  },

  getSecond(date = this.now) {
    return date.getSeconds();
  }
};

export default date;
