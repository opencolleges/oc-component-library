import dateTime from './date-time';

describe(`dateTime`, () => {
  it(`handles dateTime.getCalendarMonth()`, () => {
    expect(dateTime.getCalendarMonth(`2019-10-02`)).toMatchObject({
      initialDate: `2019-10-02`,
      months: [
        {
          date: `2019-09-02`,
          days: [`2019-09-29`, `2019-09-30`]
        },
        {
          date: `2019-10-02`,
          days: [
            `2019-10-01`,
            `2019-10-02`,
            `2019-10-03`,
            `2019-10-04`,
            `2019-10-05`,
            `2019-10-06`,
            `2019-10-07`,
            `2019-10-08`,
            `2019-10-09`,
            `2019-10-10`,
            `2019-10-11`,
            `2019-10-12`,
            `2019-10-13`,
            `2019-10-14`,
            `2019-10-15`,
            `2019-10-16`,
            `2019-10-17`,
            `2019-10-18`,
            `2019-10-19`,
            `2019-10-20`,
            `2019-10-21`,
            `2019-10-22`,
            `2019-10-23`,
            `2019-10-24`,
            `2019-10-25`,
            `2019-10-26`,
            `2019-10-27`,
            `2019-10-28`,
            `2019-10-29`,
            `2019-10-30`,
            `2019-10-31`
          ]
        },
        {
          date: `2019-11-02`,
          days: [`2019-11-01`, `2019-11-02`]
        }
      ]
    });
    expect(dateTime.getCalendarMonth(`2020-02-15`)).toMatchObject({
      initialDate: `2020-02-15`,
      months: [
        {
          date: `2020-01-15`,
          days: [
            `2020-01-26`,
            `2020-01-27`,
            `2020-01-28`,
            `2020-01-29`,
            `2020-01-30`,
            `2020-01-31`
          ]
        },
        {
          date: `2020-02-15`,
          days: [
            `2020-02-01`,
            `2020-02-02`,
            `2020-02-03`,
            `2020-02-04`,
            `2020-02-05`,
            `2020-02-06`,
            `2020-02-07`,
            `2020-02-08`,
            `2020-02-09`,
            `2020-02-10`,
            `2020-02-11`,
            `2020-02-12`,
            `2020-02-13`,
            `2020-02-14`,
            `2020-02-15`,
            `2020-02-16`,
            `2020-02-17`,
            `2020-02-18`,
            `2020-02-19`,
            `2020-02-20`,
            `2020-02-21`,
            `2020-02-22`,
            `2020-02-23`,
            `2020-02-24`,
            `2020-02-25`,
            `2020-02-26`,
            `2020-02-27`,
            `2020-02-28`,
            `2020-02-29`
          ]
        },
        {
          date: `2020-03-15`,
          days: []
        }
      ]
    });
    expect(dateTime.getCalendarMonth(`2014-04-03`)).toMatchObject({
      initialDate: `2014-04-03`,
      months: [
        {
          date: `2014-03-03`,
          days: [`2014-03-30`, `2014-03-31`]
        },
        {
          date: `2014-04-03`,
          days: [
            `2014-04-01`,
            `2014-04-02`,
            `2014-04-03`,
            `2014-04-04`,
            `2014-04-05`,
            `2014-04-06`,
            `2014-04-07`,
            `2014-04-08`,
            `2014-04-09`,
            `2014-04-10`,
            `2014-04-11`,
            `2014-04-12`,
            `2014-04-13`,
            `2014-04-14`,
            `2014-04-15`,
            `2014-04-16`,
            `2014-04-17`,
            `2014-04-18`,
            `2014-04-19`,
            `2014-04-20`,
            `2014-04-21`,
            `2014-04-22`,
            `2014-04-23`,
            `2014-04-24`,
            `2014-04-25`,
            `2014-04-26`,
            `2014-04-27`,
            `2014-04-28`,
            `2014-04-29`,
            `2014-04-30`
          ]
        },
        {
          date: `2014-05-03`,
          days: [`2014-05-01`, `2014-05-02`, `2014-05-03`]
        }
      ]
    });
  });

  it(`handles.dateTime.getCustom()`, () => {
    expect(dateTime.getCustom(`Do MMM YYYY`, `2018-11-17T05:15:36+11:00`)).toBe(
      `17th Nov 2018`
    );
    expect(dateTime.getCustom(`h:m:sa`, `2018-11-17T05:15:36+11:00`)).toBe(
      `5:15:36am`
    );
    expect(dateTime.getCustom(`dd ddd dddd`, `2018-11-17T05:15:36+11:00`)).toBe(
      `Sa Sat Saturday`
    );
  });

  it(`handles dateTime.getDate()`, () => {
    expect(dateTime.getDate(`2019-12-14 05:15:36`)).toBe(`2019-12-14`);
    expect(dateTime.getDate(`2021-08-22 07:51:14`)).toBe(`2021-08-22`);
    expect(dateTime.getDate(`2014-11-04T02:12:29+11:00`)).toBe(`2014-11-04`);
  });

  it(`handles dateTime.getDateISO()`, () => {
    expect(dateTime.getDateISO(`2019-06-06 04:04:40`)).toBe(
      `2019-06-06T04:04:40+10:00`
    );
    expect(dateTime.getDateISO(`2022-09-11`)).toBe(`2022-09-11T00:00:00+10:00`);
    expect(dateTime.getDateISO(`2019-12-07 07:33:03`)).toBe(
      `2019-12-07T07:33:03+11:00`
    );
  });

  it(`handles dateTime.getDateLong()`, () => {
    expect(dateTime.getDateLong(`2019-03-14`)).toBe(`14th March, 2019`);
    expect(dateTime.getDateLong(`2022-01-16`)).toBe(`16th January, 2022`);
    expect(dateTime.getDateLong(`2017-10-23`)).toBe(`23rd October, 2017`);
  });

  it(`handles dateTime.getDateShort()`, () => {
    expect(dateTime.getDateShort(`2016-05-22`)).toBe(`22/05/2016`);
    expect(dateTime.getDateShort(`2023-02-28`)).toBe(`28/02/2023`);
    expect(dateTime.getDateShort(`2019-01-01 07:50:02`)).toBe(`01/01/2019`);
  });

  it(`handles dateTime.getDateTime()`, () => {
    expect(dateTime.getDateTime(`2020-04-19T07:24:09+10:00`)).toBe(
      `2020-04-19 07:24:09`
    );
    expect(dateTime.getDateTime(`2019-02-25T11:00:00+11:00`)).toBe(
      `2019-02-25 11:00:00`
    );
    expect(dateTime.getDateTime(`2001-09-26T07:17:22+10:00`)).toBe(
      `2001-09-26 07:17:22`
    );
  });

  it(`handles dateTime.getDay()`, () => {
    expect(dateTime.getDay(`2018-10-20 09:08:38`)).toBe(6);
    expect(dateTime.getDay(`2020-01-16`)).toBe(4);
    expect(dateTime.getDay(`2019-09-04 01:00:27`)).toBe(3);
  });

  it(`handles dateTime.getDayName()`, () => {
    expect(dateTime.getDayName(`2019-10-23 10:58:58`)).toBe(`Wednesday`);
    expect(dateTime.getDayName(`2019-10-25`)).toBe(`Friday`);
    expect(dateTime.getDayName(`2019-10-26`)).toBe(`Saturday`);
  });

  it(`handles dateTime.getHour()`, () => {
    expect(dateTime.getHour(`2016-08-12 05:05:35`)).toBe(5);
    expect(dateTime.getHour(`2027-04-03 12:30:59`)).toBe(12);
    expect(dateTime.getHour(`2018-01-11 23:43:00`)).toBe(23);
  });

  it(`handles dateTime.getMinute()`, () => {
    expect(dateTime.getMinute(`2011-05-11 06:37:01`)).toBe(37);
    expect(dateTime.getMinute(`2014-07-09 11:29:27`)).toBe(29);
    expect(dateTime.getMinute(`2017-08-07 12:07:51`)).toBe(7);
  });

  it(`handles dateTime.getMonth()`, () => {
    expect(dateTime.getMonth(`2018-04-20 05:43:34`)).toBe(3);
    expect(dateTime.getMonth(`2014-10-31`)).toBe(9);
    expect(dateTime.getMonth(`2018-07-22`)).toBe(6);
  });

  it(`handles dateTime.getMonthEnd()`, () => {
    expect(dateTime.getMonthEnd(`2019-04-25 02:32:10`)).toBe(`2019-04-30`);
    expect(dateTime.getMonthEnd(`2012-12-20`)).toBe(`2012-12-31`);
    expect(dateTime.getMonthEnd(`2019-03-17`)).toBe(`2019-03-31`);
  });

  it(`handles dateTime.getMonthLength()`, () => {
    expect(dateTime.getMonthLength(`2026-01-20`)).toBe(31);
    expect(dateTime.getMonthLength(`2011-11-11`)).toBe(30);
    expect(dateTime.getMonthLength(`2019-02-03 01:01:01`)).toBe(28);

    // Leap year
    expect(dateTime.getMonthLength(`2020-02-01`)).toBe(29);
  });

  it(`handles dateTime.getMonthName()`, () => {
    expect(dateTime.getMonthName(`2016-01-20`)).toBe(`January`);
    expect(dateTime.getMonthName(`2020-08-01`)).toBe(`August`);
    expect(dateTime.getMonthName(`2014-06-07`)).toBe(`June`);
  });

  it(`handles dateTime.getMonthStart()`, () => {
    expect(dateTime.getMonthStart(`2017-01-31`)).toBe(`2017-01-01`);
    expect(dateTime.getMonthStart(`2020-08-24 17:17:37`)).toBe(`2020-08-01`);
    expect(dateTime.getMonthStart(`2021-06-13 23:09:28`)).toBe(`2021-06-01`);
  });

  it(`handles dateTime.getQuarter()`, () => {
    expect(dateTime.getQuarter(`2017-01-30`)).toBe(0);
    expect(dateTime.getQuarter(`2019-04-29`)).toBe(1);
    expect(dateTime.getQuarter(`2020-08-09 19:22:34`)).toBe(2);
    expect(dateTime.getQuarter(`2022-11-30 20:20:55`)).toBe(3);
  });

  it(`handles dateTime.getSeason()`, () => {
    expect(dateTime.getSeason(`2019-01-01`)).toBe(0);
    expect(dateTime.getSeason(`2019-04-11`)).toBe(1);
    expect(dateTime.getSeason(`2019-07-21`)).toBe(2);
    expect(dateTime.getSeason(`2019-10-31`)).toBe(3);
  });

  it(`handles dateTime.getSeasonName()`, () => {
    expect(dateTime.getSeasonName(`2019-01-01`)).toBe(`Summer`);
    expect(dateTime.getSeasonName(`2019-04-11`)).toBe(`Autumn`);
    expect(dateTime.getSeasonName(`2019-07-21`)).toBe(`Winter`);
    expect(dateTime.getSeasonName(`2019-10-31`)).toBe(`Spring`);
  });

  it(`handles dateTime.getSecond()`, () => {
    expect(dateTime.getSecond(`2019-04-03 13:00:49`)).toBe(49);
    expect(dateTime.getSecond(`2015-03-05 06:46:21`)).toBe(21);
    expect(dateTime.getSecond(`2011-11-30 12:02:06`)).toBe(6);
  });

  it(`handles dateTime.getTime()`, () => {
    expect(dateTime.getTime(`2018-02-10 15:32:32`)).toBe(`15:32:32`);
    expect(dateTime.getTime(`2012-08-31 18:21:45`)).toBe(`18:21:45`);
    expect(dateTime.getTime(`2028-12-19 12:02:06`)).toBe(`12:02:06`);
  });

  it(`handles dateTime.getYear()`, () => {
    expect(dateTime.getYear(`2017-01-01`)).toBe(2017);
    expect(dateTime.getYear(`2018-07-21`)).toBe(2018);
    expect(dateTime.getYear(`2019-10-31`)).toBe(2019);
  });

  it(`handles dateTime.isInRange()`, () => {
    expect(dateTime.isInRange(`2019-10-23`, `2019-10-25`, `2019-10-22`)).toBe(
      false
    );
    expect(dateTime.isInRange(`2019-10-23`, `2019-10-25`, `2019-10-23`)).toBe(
      true
    );
    expect(dateTime.isInRange(`2019-10-23`, `2019-10-25`, `2019-10-24`)).toBe(
      true
    );
    expect(dateTime.isInRange(`2019-10-23`, `2019-10-25`, `2019-10-25`)).toBe(
      true
    );
    expect(dateTime.isInRange(`2019-10-23`, `2019-10-25`, `2019-10-26`)).toBe(
      false
    );

    expect(dateTime.isInRange(`2019-10-23`, undefined, `2019-10-22`)).toBe(
      false
    );
    expect(dateTime.isInRange(`2019-10-23`, undefined, `2019-10-23`)).toBe(
      true
    );
    expect(dateTime.isInRange(`2019-10-23`, undefined, `2019-10-24`)).toBe(
      true
    );

    expect(dateTime.isInRange(undefined, `2019-10-25`, `2019-10-24`)).toBe(
      true
    );
    expect(dateTime.isInRange(undefined, `2019-10-25`, `2019-10-25`)).toBe(
      true
    );
    expect(dateTime.isInRange(undefined, `2019-10-25`, `2019-10-26`)).toBe(
      false
    );
  });
});
