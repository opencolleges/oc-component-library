import _ from 'lodash';

const date = {
  now: new Date(),

  months: [
    { name: 'january', season: { index: 0, name: 'summer' } },
    { name: 'february', season: { index: 0, name: 'summer' } },
    { name: 'march', season: { index: 1, name: 'autumn' } },
    { name: 'april', season: { index: 1, name: 'autumn' } },
    { name: 'may', season: { index: 1, name: 'autumn' } },
    { name: 'june', season: { index: 2, name: 'winter' } },
    { name: 'july', season: { index: 2, name: 'winter' } },
    { name: 'august', season: { index: 2, name: 'winter' } },
    { name: 'september', season: { index: 3, name: 'spring' } },
    { name: 'october', season: { index: 3, name: 'spring' } },
    { name: 'november', season: { index: 3, name: 'spring' } },
    { name: 'december', season: { index: 0, name: 'summer' } }
  ],

  days: [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
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

  getLastIndex(str: string): string {
    return str.slice(-1);
  },

  getLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  },

  getOrdinal(num: number): string {
    let ordinal: string = _.toString(num);
    ordinal = this.getLastIndex(ordinal);

    return `${ordinal}${this.ordinals[ordinal]}`;
  },

  getYear(dateObj: Date = this.now) {
    return dateObj.getFullYear();
  },

  getSeason(dateObj: Date = this.now): string {
    return this.months[this.getMonthIndex(dateObj)].season.name;
  },

  getSeasonIndex(dateObj: Date = this.now) {
    return this.months[this.getMonthIndex(dateObj)].season.index;
  },

  getMonth(dateObj: Date = this.now) {
    return this.months[this.getMonthIndex(dateObj)].name;
  },

  getMonthIndex(dateObj: Date = this.now) {
    return dateObj.getMonth();
  },

  getMonthLength(dateObj: Date = this.now) {
    return new Date(
      this.getYear(dateObj),
      this.getMonthIndex(dateObj) + 1,
      0
    ).getDate();
  },

  getMonthCalendar(dateObj: Date = this.now) {
    const calendar = {
      dates: []
    };

    const year = this.getYear(dateObj);
    const monthIndex = this.getMonthIndex(dateObj);

    const monthLength = this.getMonthLength(dateObj);

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

  getDate(dateObj: Date = this.now) {
    return dateObj.getDate();
  },

  getISODate(dateObj: Date = this.now) {
    const year = this.getYear(dateObj);

    let month = this.getMonthIndex(dateObj) + 1;
    month = this.getLeadingZero(month);

    let day = this.getDate(dateObj);
    day = this.getLeadingZero(day);

    return `${year}-${month}-${day}`;
  },

  getShortDate(dateObj: Date = this.now) {
    const year = this.getYear(dateObj);

    let month = this.getMonthIndex(dateObj) + 1;
    month = this.getLeadingZero(month);

    let day = this.getDate(dateObj);
    day = this.getLeadingZero(day);

    return `${day}/${month}/${year}`;
  },

  getLongDate(dateObj: Date = this.now) {
    const year = this.getYear(dateObj);
    const month = this.getMonth(dateObj);

    let day = this.getDate(dateObj);
    day = this.getOrdinal(day);

    return `${day} ${month}, ${year}`;
  },

  getDay(dateObj: Date = this.now) {
    return this.days[dateObj.getDay()];
  },

  getDayIndex(dateObj: Date = this.now) {
    return dateObj.getDay();
  },

  get12HourTime(dateObj: Date = this.now) {
    let hour = this.getHour(dateObj);
    hour = hour % 12 !== 0 ? hour % 12 : hour;

    let minute = this.getMinute(dateObj);
    minute = this.getLeadingZero(minute);

    const meridiem = hour > 0 && hour < 12 ? 'AM' : 'PM';

    return `${hour}:${minute} ${meridiem}`;
  },

  get24HourTime(dateObj: Date = this.now) {
    let hour = this.getHour(dateObj);
    hour = this.getLeadingZero(hour);

    let minute = this.getMinute(dateObj);
    minute = this.getLeadingZero(minute);

    return `${hour}:${minute}`;
  },

  getHour(dateObj: Date = this.now) {
    return dateObj.getHours();
  },

  getMinute(dateObj: Date = this.now) {
    return dateObj.getMinutes();
  },

  getSecond(dateObj: Date = this.now) {
    return dateObj.getSeconds();
  }
};

export default date;
