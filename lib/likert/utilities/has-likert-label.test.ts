import hasLikertLabel from './has-likert-label';

describe('hasLikertLabel()', () => {
  it('Handles an array with a length of three', () => {
    expect(hasLikertLabel(3, 0)).toBe(true);
    expect(hasLikertLabel(3, 1)).toBe(true);
    expect(hasLikertLabel(3, 2)).toBe(true);
  });

  it('Handles an array with a length of four', () => {
    expect(hasLikertLabel(4, 0)).toBe(true);
    expect(hasLikertLabel(4, 1)).toBe(true);
    expect(hasLikertLabel(4, 2)).toBe(true);
    expect(hasLikertLabel(4, 3)).toBe(true);
  });

  it('Handles an array with a length of five', () => {
    expect(hasLikertLabel(5, 0)).toBe(true);
    expect(hasLikertLabel(5, 1)).toBe(true);
    expect(hasLikertLabel(5, 2)).toBe(true);
    expect(hasLikertLabel(5, 3)).toBe(true);
    expect(hasLikertLabel(5, 4)).toBe(true);
  });

  it('Handles an array with a length of six', () => {
    expect(hasLikertLabel(6, 0)).toBe(true);
    expect(hasLikertLabel(6, 1)).toBe(false);
    expect(hasLikertLabel(6, 2)).toBe(false);
    expect(hasLikertLabel(6, 3)).toBe(false);
    expect(hasLikertLabel(6, 4)).toBe(false);
    expect(hasLikertLabel(6, 5)).toBe(true);
  });

  it('Handles an array with a length of seven', () => {
    expect(hasLikertLabel(7, 0)).toBe(true);
    expect(hasLikertLabel(7, 1)).toBe(false);
    expect(hasLikertLabel(7, 2)).toBe(false);
    expect(hasLikertLabel(7, 3)).toBe(true);
    expect(hasLikertLabel(7, 4)).toBe(false);
    expect(hasLikertLabel(7, 5)).toBe(false);
    expect(hasLikertLabel(7, 6)).toBe(true);
  });

  it('Handles an array with a length of eight', () => {
    expect(hasLikertLabel(8, 0)).toBe(true);
    expect(hasLikertLabel(8, 1)).toBe(false);
    expect(hasLikertLabel(8, 2)).toBe(false);
    expect(hasLikertLabel(8, 3)).toBe(false);
    expect(hasLikertLabel(8, 4)).toBe(false);
    expect(hasLikertLabel(8, 5)).toBe(false);
    expect(hasLikertLabel(8, 6)).toBe(false);
    expect(hasLikertLabel(8, 7)).toBe(true);
  });

  it('Handles an array with a length of nine', () => {
    expect(hasLikertLabel(9, 0)).toBe(true);
    expect(hasLikertLabel(9, 1)).toBe(false);
    expect(hasLikertLabel(9, 2)).toBe(false);
    expect(hasLikertLabel(9, 3)).toBe(false);
    expect(hasLikertLabel(9, 4)).toBe(true);
    expect(hasLikertLabel(9, 5)).toBe(false);
    expect(hasLikertLabel(9, 6)).toBe(false);
    expect(hasLikertLabel(9, 7)).toBe(false);
    expect(hasLikertLabel(9, 8)).toBe(true);
  });

  it('Handles an array with a length of 10', () => {
    expect(hasLikertLabel(10, 0)).toBe(true);
    expect(hasLikertLabel(10, 1)).toBe(false);
    expect(hasLikertLabel(10, 2)).toBe(false);
    expect(hasLikertLabel(10, 3)).toBe(false);
    expect(hasLikertLabel(10, 4)).toBe(false);
    expect(hasLikertLabel(10, 5)).toBe(false);
    expect(hasLikertLabel(10, 6)).toBe(false);
    expect(hasLikertLabel(10, 7)).toBe(false);
    expect(hasLikertLabel(10, 8)).toBe(false);
    expect(hasLikertLabel(10, 9)).toBe(true);
  });

  it('Handles an array with a length of 11', () => {
    expect(hasLikertLabel(11, 0)).toBe(true);
    expect(hasLikertLabel(11, 1)).toBe(false);
    expect(hasLikertLabel(11, 2)).toBe(false);
    expect(hasLikertLabel(11, 3)).toBe(false);
    expect(hasLikertLabel(11, 4)).toBe(false);
    expect(hasLikertLabel(11, 5)).toBe(true);
    expect(hasLikertLabel(11, 6)).toBe(false);
    expect(hasLikertLabel(11, 7)).toBe(false);
    expect(hasLikertLabel(11, 8)).toBe(false);
    expect(hasLikertLabel(11, 9)).toBe(false);
    expect(hasLikertLabel(11, 10)).toBe(true);
  });
});
