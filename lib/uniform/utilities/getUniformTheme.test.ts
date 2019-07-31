import getUniformTheme from './getUniformTheme';

describe(`getUniformTheme()`, () => {
  it(`Handles Summer`, () => {
    // 05:00am
    expect(getUniformTheme('Summer', 4)).toBe(`light`);
    // 07:00pm
    expect(getUniformTheme('Summer', 18)).toBe(`dark`);
  });

  it(`Handles Autumn`, () => {
    // 06:00am
    expect(getUniformTheme('Autumn', 5)).toBe(`light`);
    // 05:00am
    expect(getUniformTheme('Autumn', 4)).toBe(`dark`);
  });

  it(`Handles Winter`, () => {
    // 12:00pm
    expect(getUniformTheme('Winter', 11)).toBe(`light`);
    // 11:00pm
    expect(getUniformTheme('Winter', 22)).toBe(`dark`);
  });

  it(`Handles Spring`, () => {
    // 05:00pm
    expect(getUniformTheme('Spring', 16)).toBe(`light`);
    // 06:00pm
    expect(getUniformTheme('Spring', 17)).toBe(`dark`);
  });
});
