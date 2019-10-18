import date from './date';

describe(`date`, () => {
  it(`getSeason()`, () => {
    expect(date.getSeason(new Date(`2019-01-01`))).toBe(`summer`);
    expect(date.getSeason(new Date(`2019-04-11`))).toBe(`autumn`);
    expect(date.getSeason(new Date(`2019-07-21`))).toBe(`winter`);
    expect(date.getSeason(new Date(`2019-10-31`))).toBe(`spring`);
  });

  it(`getSeasonIndex()`, () => {
    expect(date.getSeasonIndex(new Date(`2019-01-01`))).toBe(0);
    expect(date.getSeasonIndex(new Date(`2019-04-11`))).toBe(1);
    expect(date.getSeasonIndex(new Date(`2019-07-21`))).toBe(2);
    expect(date.getSeasonIndex(new Date(`2019-10-31`))).toBe(3);
  });

  it(`getMonth()`, () => {
    expect(date.getMonth(new Date(`2019-01-01`))).toBe(`january`);
    expect(date.getMonth(new Date(`2019-02-01`))).toBe(`february`);
    expect(date.getMonth(new Date(`2019-03-01`))).toBe(`march`);
    expect(date.getMonth(new Date(`2019-04-01`))).toBe(`april`);
    expect(date.getMonth(new Date(`2019-05-01`))).toBe(`may`);
    expect(date.getMonth(new Date(`2019-06-01`))).toBe(`june`);
    expect(date.getMonth(new Date(`2019-07-01`))).toBe(`july`);
    expect(date.getMonth(new Date(`2019-08-01`))).toBe(`august`);
    expect(date.getMonth(new Date(`2019-09-01`))).toBe(`september`);
    expect(date.getMonth(new Date(`2019-10-01`))).toBe(`october`);
    expect(date.getMonth(new Date(`2019-11-01`))).toBe(`november`);
    expect(date.getMonth(new Date(`2019-12-01`))).toBe(`december`);
  });

  it(`getMonthIndex()`, () => {
    expect(date.getMonthIndex(new Date(`2019-01-01`))).toBe(0);
    expect(date.getMonthIndex(new Date(`2019-02-01`))).toBe(1);
    expect(date.getMonthIndex(new Date(`2019-03-01`))).toBe(2);
    expect(date.getMonthIndex(new Date(`2019-04-01`))).toBe(3);
    expect(date.getMonthIndex(new Date(`2019-05-01`))).toBe(4);
    expect(date.getMonthIndex(new Date(`2019-06-01`))).toBe(5);
    expect(date.getMonthIndex(new Date(`2019-07-01`))).toBe(6);
    expect(date.getMonthIndex(new Date(`2019-08-01`))).toBe(7);
    expect(date.getMonthIndex(new Date(`2019-09-01`))).toBe(8);
    expect(date.getMonthIndex(new Date(`2019-10-01`))).toBe(9);
    expect(date.getMonthIndex(new Date(`2019-11-01`))).toBe(10);
    expect(date.getMonthIndex(new Date(`2019-12-01`))).toBe(11);
  });

  it(`getMonthLength()`, () => {
    expect(date.getMonthLength(new Date(`2019-01-01`))).toBe(31);
    expect(date.getMonthLength(new Date(`2019-02-01`))).toBe(28);
    expect(date.getMonthLength(new Date(`2019-03-01`))).toBe(31);
    expect(date.getMonthLength(new Date(`2019-04-01`))).toBe(30);
    expect(date.getMonthLength(new Date(`2019-05-01`))).toBe(31);
    expect(date.getMonthLength(new Date(`2019-06-01`))).toBe(30);
    expect(date.getMonthLength(new Date(`2019-07-01`))).toBe(31);
    expect(date.getMonthLength(new Date(`2019-08-01`))).toBe(31);
    expect(date.getMonthLength(new Date(`2019-09-01`))).toBe(30);
    expect(date.getMonthLength(new Date(`2019-10-01`))).toBe(31);
    expect(date.getMonthLength(new Date(`2019-11-01`))).toBe(30);
    expect(date.getMonthLength(new Date(`2019-12-01`))).toBe(31);

    // Leap year
    expect(date.getMonthLength(new Date(`2020-02-01`))).toBe(29);
  });

  it(`getDate()`, () => {
    expect(date.getDate(new Date(`2019-12-17`))).toBe(17);
  });

  it(`getISODate()`, () => {
    expect(
      date.getISODate(
        new Date(
          `Wed Jun 01 1994 00:00:00 GMT+1000 (Australian Eastern Standard Time)`
        )
      )
    ).toBe(`1994-06-01`);
  });

  it(`getYear()`, () => {
    expect(date.getYear(new Date(`2000-01-01`))).toBe(2000);
    expect(
      date.getYear(
        new Date(
          `Wed Jun 01 1994 00:00:00 GMT+1000 (Australian Eastern Standard Time)`
        )
      )
    ).toBe(1994);
  });
});
