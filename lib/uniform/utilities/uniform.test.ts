import dateTime from '../../utilities/ts/date-time';

import uniform from './uniform';

describe(`uniform.getMode()`, () => {
  it(`Handles summer`, () => {
    dateTime.getSeasonName = jest.fn().mockReturnValue(`Summer`);
    dateTime.getHour = jest.fn().mockReturnValue(4);

    // 05:00am
    expect(uniform.getMode()).toBe(`light`);

    dateTime.getHour = jest.fn().mockReturnValue(18);

    // 07:00pm
    expect(uniform.getMode()).toBe(`dark`);
  });

  it(`Handles autumn`, () => {
    dateTime.getSeasonName = jest.fn().mockReturnValue(`Autumn`);
    dateTime.getHour = jest.fn().mockReturnValue(5);

    // 06:00am
    expect(uniform.getMode()).toBe(`light`);

    dateTime.getHour = jest.fn().mockReturnValue(4);

    // 05:00am
    expect(uniform.getMode()).toBe(`dark`);
  });

  it(`Handles winter`, () => {
    dateTime.getSeasonName = jest.fn().mockReturnValue(`Winter`);
    dateTime.getHour = jest.fn().mockReturnValue(11);

    // 12:00pm
    expect(uniform.getMode()).toBe(`light`);

    dateTime.getHour = jest.fn().mockReturnValue(22);

    // 11:00pm
    expect(uniform.getMode()).toBe(`dark`);
  });

  it(`Handles spring`, () => {
    dateTime.getSeasonName = jest.fn().mockReturnValue(`Spring`);
    dateTime.getHour = jest.fn().mockReturnValue(14);

    // 05:00pm
    expect(uniform.getMode()).toBe(`light`);

    dateTime.getHour = jest.fn().mockReturnValue(17);

    // 06:00pm
    expect(uniform.getMode()).toBe(`dark`);
  });
});

// describe('uniform.hasMouse()', () => {
//   it('Handles boolean', () => {
//     expect(uniform.hasMouse()).toBe(false);
//   });
// });
