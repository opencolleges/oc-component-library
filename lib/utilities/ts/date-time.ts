import moment from 'moment';

interface Month {
  date: string;
  days: string[];
}

export interface CalendarMonth {
  initialDate: string;
  months: Month[];
}

interface Season {
  index: number;
  name: string;
}

interface DateTime {
  dateFormat: string;
  getCalendarMonth: (date?: string) => CalendarMonth;
  getCustom: (format: string, date?: string) => string;
  getDate: (date?: string) => string;
  getDateISO: (dateAndTime?: string) => string;
  getDateShort: (date?: string) => string;
  getDateLong: (date?: string) => string;
  getDateTime: (dateAndTime?: string) => string;
  getDay: (date?: string) => number;
  getDayName: (date?: string) => string;
  getHour: (dateAndTime?: string) => number;
  getMinute: (dateAndTime?: string) => number;
  getMonth: (date?: string) => number;
  getMonthEnd: (date?: string) => string;
  getMonthLength: (date?: string) => number;
  getMonthName: (date?: string) => string;
  getMonthStart: (date?: string) => string;
  getQuarter: (date?: string) => number;
  getSeason: (date?: string) => number;
  getSeasonName: (date?: string) => string;
  getSecond: (dateAndTime?: string) => number;
  getTime: (dateAndTime?: string) => string;
  getYear: (date?: string) => number;
  isInRange: (minDate: string, maxDate: string, date?: string) => boolean;
  now: () => string;
  seasons: Season[];
  timeFormat: string;
}

const dateTime: DateTime = {
  dateFormat: `YYYY-MM-DD`,
  timeFormat: `HH:mm:ss`,

  seasons: [
    { index: 0, name: `Summer` },
    { index: 1, name: `Autumn` },
    { index: 1, name: `Autumn` },
    { index: 1, name: `Autumn` },
    { index: 2, name: `Winter` },
    { index: 2, name: `Winter` },
    { index: 2, name: `Winter` },
    { index: 3, name: `Spring` },
    { index: 3, name: `Spring` },
    { index: 3, name: `Spring` },
    { index: 0, name: `Summer` }
  ],

  getCalendarMonth(date?: string): CalendarMonth {
    const DATE: string = !!date
      ? moment(date).format(this.dateFormat)
      : moment().format(this.dateFormat);

    const MONTHS: Month[] = [
      {
        date: moment(DATE)
          .subtract(1, `month`)
          .format(this.dateFormat),
        days: []
      },
      {
        date: moment(DATE).format(this.dateFormat),
        days: []
      },
      {
        date: moment(DATE)
          .add(1, `month`)
          .format(this.dateFormat),
        days: []
      }
    ];

    const MONTH_LENGTH: number = moment(DATE).daysInMonth();
    const MONTH_START_DAY: number = Number(
      moment(DATE)
        .startOf(`month`)
        .format(`d`)
    );

    for (let i: number = MONTH_START_DAY; i % 7 !== 0; i--) {
      MONTHS[0].days.push(
        moment(DATE)
          .startOf(`month`)
          .subtract(i, `days`)
          .format(this.dateFormat)
      );
    }

    for (let i: number = 0; i < MONTH_LENGTH; i++) {
      MONTHS[1].days.push(
        moment(DATE)
          .startOf(`month`)
          .add(i, `days`)
          .format(this.dateFormat)
      );
    }

    const DATES_LENGTH: number = MONTHS[0].days.length + MONTHS[1].days.length;

    let j: number = 1;

    for (let i: number = DATES_LENGTH; i % 7 !== 0; i++) {
      MONTHS[2].days.push(
        moment(DATE)
          .endOf(`month`)
          .add(j, `days`)
          .format(this.dateFormat)
      );

      j++;
    }

    return {
      initialDate: DATE,
      months: MONTHS
    };
  },

  getCustom(format: string, date?: string): string {
    return !!date ? moment(date).format(format) : moment().format(format);
  },

  getDate(date?: string): string {
    return !!date
      ? moment(date).format(this.dateFormat)
      : moment().format(this.dateFormat);
  },

  getDateISO(dateAndTime?: string): string {
    return !!dateAndTime ? moment(dateAndTime).format() : moment().format();
  },

  getDateShort(date?: string): string {
    return !!date
      ? moment(date).format(`DD/MM/YYYY`)
      : moment().format(`DD/MM/YYYY`);
  },

  getDateLong(date?: string): string {
    return !!date
      ? moment(date).format(`Do MMMM, YYYY`)
      : moment().format(`Do MMMM, YYYY`);
  },

  getDateTime(dateAndTime?: string): string {
    return !!dateAndTime
      ? moment(dateAndTime).format(`${this.dateFormat} ${this.timeFormat}`)
      : moment().format(`${this.dateFormat} ${this.timeFormat}`);
  },

  getDay(date?: string): number {
    return Number(!!date ? moment(date).format(`d`) : moment().format(`d`));
  },

  getDayName(date?: string): string {
    return !!date ? moment(date).format(`dddd`) : moment().format(`dddd`);
  },

  getHour(dateAndTime?: string): number {
    return Number(
      !!dateAndTime ? moment(dateAndTime).format(`H`) : moment().format(`H`)
    );
  },

  getMinute(dateAndTime?: string): number {
    return Number(
      !!dateAndTime ? moment(dateAndTime).format(`m`) : moment().format(`m`)
    );
  },

  getMonth(date?: string): number {
    return !!date ? moment(date).month() : moment().month();
  },

  getMonthEnd(date?: string): string {
    return !!date
      ? moment(date)
          .endOf(`month`)
          .format(this.dateFormat)
      : moment()
          .endOf(`month`)
          .format(this.dateFormat);
  },

  getMonthLength(date?: string): number {
    return !!date ? moment(date).daysInMonth() : moment().daysInMonth();
  },

  getMonthName(date?: string): string {
    return !!date ? moment(date).format(`MMMM`) : moment().format(`MMMM`);
  },

  getMonthStart(date?: string): string {
    return !!date
      ? moment(date)
          .startOf(`month`)
          .format(this.dateFormat)
      : moment()
          .startOf(`month`)
          .format(this.dateFormat);
  },

  getQuarter(date?: string): number {
    return !!date
      ? Number(moment(date).format(`Q`)) - 1
      : Number(moment().format(`Q`)) - 1;
  },

  getSeason(date?: string): number {
    return !!date
      ? this.seasons[moment(date).month()].index
      : this.seasons[moment().month()].index;
  },

  getSeasonName(date?: string): string {
    return !!date
      ? this.seasons[moment(date).month()].name
      : this.seasons[moment().month()].name;
  },

  getSecond(dateAndTime?: string): number {
    return Number(
      !!dateAndTime ? moment(dateAndTime).format(`s`) : moment().format(`s`)
    );
  },

  getTime(dateAndTime?: string): string {
    return !!dateAndTime
      ? moment(dateAndTime).format(this.timeFormat)
      : moment().format(this.timeFormat);
  },

  getYear(date?: string): number {
    return !!date ? moment(date).year() : moment().year();
  },

  isInRange(minDate: string, maxDate: string, date?: string): boolean {
    const DATE: string = !!date
      ? moment(date).format(this.dateFormat)
      : moment().format(this.dateFormat);

    if (!!minDate && !!maxDate) {
      return (
        moment(DATE).isSameOrAfter(minDate) &&
        moment(DATE).isSameOrBefore(maxDate)
      );
    } else if (!!minDate) {
      return moment(DATE).isSameOrAfter(minDate);
    } else if (!!maxDate) {
      return moment(DATE).isSameOrBefore(maxDate);
    }

    return true;
  },

  now(): string {
    return moment().format(this.dateFormat);
  }
};

export default dateTime;
