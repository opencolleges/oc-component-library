function getTimer(delay: number, callback: any): void {
  let start: number;
  let remaining: number = delay;
  let timerId: number;

  this.getTimerId = (): number => {
    return timerId;
  };

  this.pause = (): void => {
    window.clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = (): void => {
    start = Date.now();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
}

export { getTimer as default };
