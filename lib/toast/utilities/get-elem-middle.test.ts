import getElemMiddle from './get-elem-middle';

const ELEM_1 = { clientHeight: 104, previousSibling: null };
const ELEM_2 = { clientHeight: 80, previousSibling: ELEM_1 };
const ELEM_3 = { clientHeight: 128, previousSibling: ELEM_2 };

describe(`getElemMiddle()`, () => {
  it(`Handles default arguments`, () => {
    expect(getElemMiddle(ELEM_1)).toBe(4.25);
    expect(getElemMiddle(ELEM_2)).toBe(11);
    expect(getElemMiddle(ELEM_3)).toBe(18.5);
  });

  it(`Handles custom offset argument`, () => {
    expect(getElemMiddle(ELEM_1, 2)).toBe(5.25);
    expect(getElemMiddle(ELEM_2, 5)).toBe(15);
    expect(getElemMiddle(ELEM_3, 3)).toBe(20.5);
  });

  it(`Handles custom gutter argument`, () => {
    expect(getElemMiddle(ELEM_1, 3, 1.5)).toBe(6.25);
    expect(getElemMiddle(ELEM_2, 5, 2.5)).toBe(16.5);
    expect(getElemMiddle(ELEM_3, 3, 3)).toBe(24.5);
  });
});
