import hasLikertLabel from './has-likert-label';

describe('hasLikertLabel()', () => {
  it('Handles an array with a length of three', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(true);
    expect(hasLikertLabel(arr, 2)).toBe(true);
  });

  it('Handles an array with a length of four', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(true);
    expect(hasLikertLabel(arr, 2)).toBe(true);
    expect(hasLikertLabel(arr, 3)).toBe(true);
  });

  it('Handles an array with a length of five', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(true);
    expect(hasLikertLabel(arr, 2)).toBe(true);
    expect(hasLikertLabel(arr, 3)).toBe(true);
    expect(hasLikertLabel(arr, 4)).toBe(true);
  });

  it('Handles an array with a length of six', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' },
      { id: 'oc-6' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(false);
    expect(hasLikertLabel(arr, 2)).toBe(false);
    expect(hasLikertLabel(arr, 3)).toBe(false);
    expect(hasLikertLabel(arr, 4)).toBe(false);
    expect(hasLikertLabel(arr, 5)).toBe(true);
  });

  it('Handles an array with a length of seven', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' },
      { id: 'oc-6' },
      { id: 'oc-7' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(false);
    expect(hasLikertLabel(arr, 2)).toBe(false);
    expect(hasLikertLabel(arr, 3)).toBe(true);
    expect(hasLikertLabel(arr, 4)).toBe(false);
    expect(hasLikertLabel(arr, 5)).toBe(false);
    expect(hasLikertLabel(arr, 6)).toBe(true);
  });

  it('Handles an array with a length of eight', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' },
      { id: 'oc-6' },
      { id: 'oc-7' },
      { id: 'oc-8' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(false);
    expect(hasLikertLabel(arr, 2)).toBe(false);
    expect(hasLikertLabel(arr, 3)).toBe(false);
    expect(hasLikertLabel(arr, 4)).toBe(false);
    expect(hasLikertLabel(arr, 5)).toBe(false);
    expect(hasLikertLabel(arr, 6)).toBe(false);
    expect(hasLikertLabel(arr, 7)).toBe(true);
  });

  it('Handles an array with a length of nine', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' },
      { id: 'oc-6' },
      { id: 'oc-7' },
      { id: 'oc-8' },
      { id: 'oc-9' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(false);
    expect(hasLikertLabel(arr, 2)).toBe(false);
    expect(hasLikertLabel(arr, 3)).toBe(false);
    expect(hasLikertLabel(arr, 4)).toBe(true);
    expect(hasLikertLabel(arr, 5)).toBe(false);
    expect(hasLikertLabel(arr, 6)).toBe(false);
    expect(hasLikertLabel(arr, 7)).toBe(false);
    expect(hasLikertLabel(arr, 8)).toBe(true);
  });

  it('Handles an array with a length of 10', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' },
      { id: 'oc-6' },
      { id: 'oc-7' },
      { id: 'oc-8' },
      { id: 'oc-9' },
      { id: 'oc-10' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(false);
    expect(hasLikertLabel(arr, 2)).toBe(false);
    expect(hasLikertLabel(arr, 3)).toBe(false);
    expect(hasLikertLabel(arr, 4)).toBe(false);
    expect(hasLikertLabel(arr, 5)).toBe(false);
    expect(hasLikertLabel(arr, 6)).toBe(false);
    expect(hasLikertLabel(arr, 7)).toBe(false);
    expect(hasLikertLabel(arr, 8)).toBe(false);
    expect(hasLikertLabel(arr, 9)).toBe(true);
  });

  it('Handles an array with a length of 11', () => {
    const arr: Array<{ id: string; label?: string }> = [
      { id: 'oc-1' },
      { id: 'oc-2' },
      { id: 'oc-3' },
      { id: 'oc-4' },
      { id: 'oc-5' },
      { id: 'oc-6' },
      { id: 'oc-7' },
      { id: 'oc-8' },
      { id: 'oc-9' },
      { id: 'oc-10' },
      { id: 'oc-11' }
    ];

    expect(hasLikertLabel(arr, 0)).toBe(true);
    expect(hasLikertLabel(arr, 1)).toBe(false);
    expect(hasLikertLabel(arr, 2)).toBe(false);
    expect(hasLikertLabel(arr, 3)).toBe(false);
    expect(hasLikertLabel(arr, 4)).toBe(false);
    expect(hasLikertLabel(arr, 5)).toBe(true);
    expect(hasLikertLabel(arr, 6)).toBe(false);
    expect(hasLikertLabel(arr, 7)).toBe(false);
    expect(hasLikertLabel(arr, 8)).toBe(false);
    expect(hasLikertLabel(arr, 9)).toBe(false);
    expect(hasLikertLabel(arr, 10)).toBe(true);
  });
});
