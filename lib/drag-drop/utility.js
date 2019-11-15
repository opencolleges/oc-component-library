import isUndefined from '../utilities/ts/is-undefined';

const arrayMove = (arr, previousIndex, newIndex) => {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
};

const provideDisplayName = (prefix, Component) => {
  const componentName = Component.displayName || Component.name;
  return componentName ? `${prefix}(${componentName})` : prefix;
};

const events = {
  start: [`touchstart`, `mousedown`],
  move: [`touchmove`, `mousemove`],
  end: [`touchend`, `touchcancel`, `mouseup`]
};

const getPosition = event => {
  if (event.touches && event.touches.length) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  } else if (event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }
};

const closest = (el, fn) => {
  while (el) {
    if (fn(el)) return el;
    el = el.parentNode;
  }
};

const omit = (obj, ...keysToOmit) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
    return acc;
  }, {});
};
const getCSSPixelValue = stringValue => {
  if (stringValue.substr(-2) === `px`) {
    return parseFloat(stringValue);
  }
  return 0;
};

const getElementMargin = element => {
  const style = window.getComputedStyle(element);

  return {
    top: getCSSPixelValue(style.marginTop),
    right: getCSSPixelValue(style.marginRight),
    bottom: getCSSPixelValue(style.marginBottom),
    left: getCSSPixelValue(style.marginLeft)
  };
};
const getEdgeOffset = (node, parent, offset = { top: 0, left: 0 }) => {
  // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
  if (node) {
    const nodeOffset = {
      top: offset.top + node.offsetTop,
      left: offset.left + node.offsetLeft
    };

    if (node.parentNode !== parent) {
      return getEdgeOffset(node.parentNode, parent, nodeOffset);
    } else {
      return nodeOffset;
    }
  }
};

const vendorPrefix = (() => {
  if (isUndefined(window) || isUndefined(document)) return ``; // server environment

  const styles = window.getComputedStyle(document.documentElement, ``) || [
    `-moz-hidden-iframe`
  ];
  const pre = (Array.prototype.slice
    .call(styles)
    .join(``)
    .match(/-(moz|webkit|ms)-/) ||
    (styles.OLink === `` && [``, `o`]))[1];

  switch (pre) {
    case `ms`:
      return `ms`;
    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : ``;
  }
})();

const getLockPixelOffset = ({ lockOffset, width, height }) => {
  let offsetX = lockOffset;
  let offsetY = lockOffset;
  let unit = `px`;

  if (typeof lockOffset === `string`) {
    const match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);

    offsetX = offsetY = parseFloat(lockOffset);
    unit = match[1];
  }

  if (unit === `%`) {
    offsetX = (offsetX * width) / 100;
    offsetY = (offsetY * height) / 100;
  }

  return {
    x: offsetX,
    y: offsetY
  };
};

const isTouchEvent = event => {
  return (
    (event.touches && event.touches.length) ||
    (event.changedTouches && event.changedTouches.length)
  );
};

export {
  arrayMove,
  closest,
  events,
  getEdgeOffset,
  getElementMargin,
  getLockPixelOffset,
  getPosition,
  isTouchEvent,
  omit,
  provideDisplayName,
  vendorPrefix
};
