import getWindowWidth from './get-window-width';

describe(`getWindowWidth()`, () => {
  it(`Handles small context`, () => {
    window = Object.assign(window, { innerWidth: 320 });
    expect(getWindowWidth()).toBe(`small`);
    window = Object.assign(window, { innerWidth: 480 });
    expect(getWindowWidth()).toBe(`small`);
  });

  it(`Handles medium context`, () => {
    window = Object.assign(window, { innerWidth: 481 });
    expect(getWindowWidth()).toBe(`medium`);
    window = Object.assign(window, { innerWidth: 768 });
    expect(getWindowWidth()).toBe(`medium`);
  });

  it(`Handles large context`, () => {
    window = Object.assign(window, { innerWidth: 769 });
    expect(getWindowWidth()).toBe(`large`);
    window = Object.assign(window, { innerWidth: 1280 });
    expect(getWindowWidth()).toBe(`large`);
  });
});
