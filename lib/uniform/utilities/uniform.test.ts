import date from '../../utilities/ts/date';

import uniform from './uniform';

describe('uniform.getMode()', () => {
  it('Handles summer', () => {
    date.getSeason = jest.fn().mockReturnValue('summer');
    date.getHour = jest.fn().mockReturnValue(4);

    // 05:00am
    expect(uniform.getMode()).toBe('light');

    date.getHour = jest.fn().mockReturnValue(18);

    // 07:00pm
    expect(uniform.getMode()).toBe('dark');
  });

  it('Handles autumn', () => {
    date.getSeason = jest.fn().mockReturnValue('autumn');
    date.getHour = jest.fn().mockReturnValue(5);

    // 06:00am
    expect(uniform.getMode()).toBe('light');

    date.getHour = jest.fn().mockReturnValue(4);

    // 05:00am
    expect(uniform.getMode()).toBe('dark');
  });

  it('Handles winter', () => {
    date.getSeason = jest.fn().mockReturnValue('winter');
    date.getHour = jest.fn().mockReturnValue(11);

    // 12:00pm
    expect(uniform.getMode()).toBe('light');

    date.getHour = jest.fn().mockReturnValue(22);

    // 11:00pm
    expect(uniform.getMode()).toBe('dark');
  });

  it('Handles spring', () => {
    date.getSeason = jest.fn().mockReturnValue('spring');
    date.getHour = jest.fn().mockReturnValue(14);

    // 05:00pm
    expect(uniform.getMode()).toBe('light');

    date.getHour = jest.fn().mockReturnValue(17);

    // 06:00pm
    expect(uniform.getMode()).toBe('dark');
  });
});

// describe('uniform.hasMouse()', () => {
//   it('Handles boolean', () => {
//     expect(uniform.hasMouse()).toBe(false);
//   });
// });
