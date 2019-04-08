function getTimer(callback, delay) {
  let timerId,
    start,
    remaining = delay;

  this.pause = function() {
    window.clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = function() {
    start = Date.now();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.getTimerId = function() {
    return timerId;
  };

  this.resume();
}

export default getTimer;
