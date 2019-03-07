// * React imports
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

// * utility imports
import prefix from '../utils/prefix';
import randomise from '../utils/randomise';

// * child imports
import Manager from './Manager';

import {
  provideDisplayName,
  events,
  getPosition,
  closest,
  getElementMargin,
  getEdgeOffset,
  vendorPrefix,
  getLockPixelOffset,
  omit,
  isTouchEvent
} from './utility';

// * React component
const SortableContainer = (WrappedComponent, config = { withRef: false }) => {
  class drop extends React.Component {
    constructor(props) {
      super(props);
      this.manager = new Manager();
      this.events = {
        start: this.handleStart,
        move: this.handleMove,
        end: this.handleEnd
      };

      this.eventClass = {
        mouseDown: prefix('mouse-down'),
        mouseMove: prefix('mouse-move'),
        mouseUp: prefix('mouse-up')
      };

      this.state = {
        rotateDegree: 0
      };
    }

    static displayName = provideDisplayName('sortableList', WrappedComponent);

    componentDidMount() {
      const container = this.getContainer();
      Promise.resolve(container).then(containerNode => {
        this.container = containerNode;
        this.document = this.container.ownerDocument || document;
        const contentWindow =
          this.props.contentWindow || this.document.defaultView || window;

        this.contentWindow =
          typeof contentWindow === 'function' ? contentWindow() : contentWindow;

        this.scrollContainer = this.container;

        for (const key in this.events) {
          if (this.events.hasOwnProperty(key)) {
            events[key].forEach(eventName =>
              this.container.addEventListener(
                eventName,
                this.events[key],
                false
              )
            );
          }
        }
      });
    }

    componentWillUnmount() {
      if (this.container) {
        for (const key in this.events) {
          if (this.events.hasOwnProperty(key)) {
            events[key].forEach(eventName =>
              this.container.removeEventListener(eventName, this.events[key])
            );
          }
        }
      }
    }

    handleStart = event => {
      const target = event.target || event.srcElement;

      this._touched = true;
      this._pos = getPosition(event);
      const node = closest(target, el => el.sortableInfo != null);

      if (
        node &&
        node.sortableInfo &&
        this.nodeIsChild(node) &&
        !this.state.sorting
      ) {
        const { index, collection } = node.sortableInfo;

        this.setState({ rotateDegree: randomise(-3, 3) });

        if (!closest(target, el => el.sortableHandle != null))
          // return;

          this.manager.active = { index, collection };

        if (!isTouchEvent(event) && target.tagName.toLowerCase() === 'a') {
          event.preventDefault();
        }

        this.handlePress(event);
        this.helper.classList.add(this.eventClass.mouseDown);
      }
    };

    handleMove = event => {
      if (!this.state.sorting && this._touched) {
        const position = getPosition(event);

        this._delta = {
          x: this._pos.x - position.x,
          y: this._pos.y - position.y
        };

        if (this.manager.isActive()) {
          this.handlePress(event);
        }
      }
    };

    handleEnd = () => {
      this._touched = false;
    };

    cancel = () => {
      if (!this.state.sorting) {
        this.manager.active = null;
      }
    };

    getLockPixelOffsets() {
      const { width, height } = this;
      const { lockOffset } = this.props;
      const offsets = Array.isArray(lockOffset)
        ? lockOffset
        : [lockOffset, lockOffset];

      const [minLockOffset, maxLockOffset] = offsets;

      return [
        getLockPixelOffset({ lockOffset: minLockOffset, width, height }),
        getLockPixelOffset({ lockOffset: maxLockOffset, width, height })
      ];
    }

    handleSortMove = event => {
      event.preventDefault(); // Prevent scrolling on mobile
      this.helper.classList.remove(this.eventClass.mouseDown);
      this.helper.classList.add(this.eventClass.mouseMove);
      this.updatePosition(event);
      this.animateNodes();
      //  this.autoscroll();
    };

    autoscroll = () => {
      const translate = this.translate;
      const direction = {
        x: 0,
        y: 0
      };
      const speed = {
        x: 1,
        y: 1
      };
      const acceleration = {
        x: 10,
        y: 10
      };

      if (translate.y >= this.maxTranslate.y - this.height / 2) {
        direction.y = 1; // Scroll Down
        speed.y =
          acceleration.y *
          Math.abs(
            (this.maxTranslate.y - this.height / 2 - translate.y) / this.height
          );
      } else if (translate.x >= this.maxTranslate.x - this.width / 2) {
        direction.x = 1; // Scroll Right
        speed.x =
          acceleration.x *
          Math.abs(
            (this.maxTranslate.x - this.width / 2 - translate.x) / this.width
          );
      } else if (translate.y <= this.minTranslate.y + this.height / 2) {
        direction.y = -1; // Scroll Up
        speed.y =
          acceleration.y *
          Math.abs(
            (translate.y - this.height / 2 - this.minTranslate.y) / this.height
          );
      } else if (translate.x <= this.minTranslate.x + this.width / 2) {
        direction.x = -1; // Scroll Left
        speed.x =
          acceleration.x *
          Math.abs(
            (translate.x - this.width / 2 - this.minTranslate.x) / this.width
          );
      }

      if (this.autoscrollInterval) {
        clearInterval(this.autoscrollInterval);
        this.autoscrollInterval = null;
        this.isAutoScrolling = false;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        this.autoscrollInterval = setInterval(() => {
          this.isAutoScrolling = true;
          const offset = {
            left: 1 * speed.x * direction.x,
            top: 1 * speed.y * direction.y
          };
          this.scrollContainer.scrollTop += offset.top;
          this.scrollContainer.scrollLeft += offset.left;
          this.translate.x += offset.left;
          this.translate.y += offset.top;
          this.animateNodes();
        }, 5);
      }
    };

    updatePosition = event => {
      const { animateClass } = this.props;
      const offset = getPosition(event);
      const translate = {
        x: offset.x - this.initialOffset.x,
        y: offset.y - this.initialOffset.y
      };

      // Adjust for window scroll
      translate.y -= window.pageYOffset - this.initialWindowScroll.top;
      translate.x -= window.pageXOffset - this.initialWindowScroll.left;
      this.translate = translate;

      this.helper.style[`${vendorPrefix}Transform`] = `translate3d(${
        translate.x
      }px,${translate.y}px, 0) rotate(${this.state.rotateDegree}deg)`;

      if (animateClass) {
        this.helper.classList.add(...animateClass.split(' '));
      }
    };
    animateNodes() {
      const { hideSortableGhost } = this.props;
      const nodes = this.manager.getOrderedRefs();
      const containerScrollDelta = {
        left: this.container.scrollLeft - this.initialScroll.left,
        top: this.container.scrollTop - this.initialScroll.top
      };
      const sortingOffset = {
        left:
          this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
        top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
      };
      const windowScrollDelta = {
        top: window.pageYOffset - this.initialWindowScroll.top,
        left: window.pageXOffset - this.initialWindowScroll.left
      };
      //   const prevIndex = this.newIndex;
      this.newIndex = null;

      for (let i = 0, len = nodes.length; i < len; i++) {
        const { node } = nodes[i];
        const index = node.sortableInfo.index;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const offset = {
          width: this.width > width ? width / 2 : this.width / 2,
          height: this.height > height ? height / 2 : this.height / 2
        };

        const translate = {
          x: 0,
          y: 0
        };
        let { edgeOffset } = nodes[i];

        // If we haven't cached the node's offsetTop / offsetLeft value
        if (!edgeOffset) {
          nodes[i].edgeOffset = edgeOffset = getEdgeOffset(
            node,
            this.container
          );
        }

        // Get a reference to the next and previous node
        const nextNode = i < nodes.length - 1 && nodes[i + 1];
        const prevNode = i > 0 && nodes[i - 1];

        // Also cache the next node's edge offset if needed.
        // We need this for calculating the animation in a grid setup
        if (nextNode && !nextNode.edgeOffset) {
          nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);
        }

        // If the node is the one we're currently animating, skip it
        if (index === this.index) {
          if (hideSortableGhost) {
            this.sortableGhost = node;
            node.style.visibility = 'hidden';
            node.style.opacity = 0;
          }
          continue;
        }

        if (this.axis.x) {
          if (this.axis.y) {
            // Calculations for a grid setup
            if (
              index < this.index &&
              ((sortingOffset.left + windowScrollDelta.left - offset.width <=
                edgeOffset.left &&
                sortingOffset.top + windowScrollDelta.top <=
                  edgeOffset.top + offset.height) ||
                sortingOffset.top + windowScrollDelta.top + offset.height <=
                  edgeOffset.top)
            ) {
              // If the current node is to the left on the same row, or above the node that's being dragged
              // then move it to the right
              translate.x = this.width + this.marginOffset.x;
              if (
                edgeOffset.left + translate.x >
                this.containerBoundingRect.width - offset.width
              ) {
                // If it moves passed the right bounds, then animate it to the first position of the next row.
                // We just use the offset of the next node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                translate.y = nextNode.edgeOffset.top - edgeOffset.top;
              }
              if (this.newIndex === null) {
                this.newIndex = index;
              }
            } else if (
              index > this.index &&
              ((sortingOffset.left + windowScrollDelta.left + offset.width >=
                edgeOffset.left &&
                sortingOffset.top + windowScrollDelta.top + offset.height >=
                  edgeOffset.top) ||
                sortingOffset.top + windowScrollDelta.top + offset.height >=
                  edgeOffset.top + height)
            ) {
              // If the current node is to the right on the same row, or below the node that's being dragged
              // then move it to the left
              translate.x = -(this.width + this.marginOffset.x);
              if (
                edgeOffset.left + translate.x <
                this.containerBoundingRect.left + offset.width
              ) {
                // If it moves passed the left bounds, then animate it to the last position of the previous row.
                // We just use the offset of the previous node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                translate.y = prevNode.edgeOffset.top - edgeOffset.top;
              }
              this.newIndex = index;
            }
          } else {
            if (
              index > this.index &&
              sortingOffset.left + windowScrollDelta.left + offset.width >=
                edgeOffset.left
            ) {
              translate.x = -(this.width + this.marginOffset.x);
              this.newIndex = index;
            } else if (
              index < this.index &&
              sortingOffset.left + windowScrollDelta.left <=
                edgeOffset.left + offset.width
            ) {
              translate.x = this.width + this.marginOffset.x;
              if (this.newIndex == null) {
                this.newIndex = index;
              }
            }
          }
        } else if (this.axis.y) {
          if (
            index > this.index &&
            sortingOffset.top + windowScrollDelta.top + offset.height >=
              edgeOffset.top
          ) {
            translate.y = -(this.height + this.marginOffset.y);
            this.newIndex = index;
          } else if (
            index < this.index &&
            sortingOffset.top + windowScrollDelta.top <=
              edgeOffset.top + offset.height
          ) {
            translate.y = this.height + this.marginOffset.y;
            if (this.newIndex == null) {
              this.newIndex = index;
            }
          }
        }

        node.style.userSelect = 'none';
        node.style[`${vendorPrefix}Transform`] = `translate3d(${
          translate.x
        }px,${translate.y}px,0)`;
      }

      if (this.newIndex == null) {
        this.newIndex = this.index;
      }
    }

    handlePress = event => {
      const active = this.manager.getActive();

      if (active) {
        const { axis, hideSortableGhost, getHelperDimensions } = this.props;

        const { node, collection } = active;
        const { index } = node.sortableInfo;
        const margin = getElementMargin(node);

        const containerBoundingRect = this.container.getBoundingClientRect();
        const dimensions = getHelperDimensions({ index, node, collection });

        this.node = node;
        this.margin = margin;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.marginOffset = {
          x: this.margin.left + this.margin.right,
          y: Math.max(this.margin.top, this.margin.bottom)
        };

        this.boundingClientRect = node.getBoundingClientRect();
        this.containerBoundingRect = containerBoundingRect;
        this.index = index;
        this.newIndex = index;

        this.axis = {
          x: axis.indexOf('x') >= 0,
          y: axis.indexOf('y') >= 0
        };

        this.offsetEdge = getEdgeOffset(node, this.container);
        this.initialOffset = getPosition(event);
        this.initialScroll = {
          top: this.container.scrollTop,
          left: this.container.scrollLeft
        };

        this.initialWindowScroll = {
          top: window.pageYOffset,
          left: window.pageXOffset
        };

        const clonedNode = node.cloneNode(true);

        this.helper = this.document.body.appendChild(clonedNode);

        this.helper.style.position = 'fixed';
        this.helper.style.top = `${this.boundingClientRect.top - margin.top}px`;
        this.helper.style.left = `${this.boundingClientRect.left -
          margin.left}px`;
        this.helper.style.width = `${this.width}px`;
        this.helper.style.height = `${this.height}px`;
        this.helper.style.boxSizing = 'border-box';
        //this.helper.style.pointerEvents = 'none';
        this.helper.style.cursor = 'grabbing;';

        if (hideSortableGhost) {
          this.sortableGhost = node;
          node.style.visibility = 'hidden';
          node.style.opacity = 0;
        }

        this.minTranslate = {};
        this.maxTranslate = {};

        if (this.axis.x) {
          this.minTranslate.x =
            containerBoundingRect.left -
            this.boundingClientRect.left -
            this.width / 2;
          this.maxTranslate.x =
            containerBoundingRect.left +
            containerBoundingRect.width -
            this.boundingClientRect.left -
            this.width / 2;
        }

        if (this.axis.y) {
          this.minTranslate.y =
            containerBoundingRect.top -
            this.boundingClientRect.top -
            this.height / 2;
          this.maxTranslate.y =
            containerBoundingRect.top +
            containerBoundingRect.height -
            this.boundingClientRect.top -
            this.height / 2;
        }

        this.listenerNode = event.touches ? node : this.contentWindow;
        events.move.forEach(eventName =>
          this.listenerNode.addEventListener(
            eventName,
            this.handleSortMove,
            false
          )
        );
        events.end.forEach(eventName =>
          this.listenerNode.addEventListener(
            eventName,
            this.handleSortEnd,
            false
          )
        );

        this.setState({
          sorting: true,
          sortingIndex: index
        });

        this.updatePosition(event);
      }
    };

    handleSortEnd = event => {
      const { hideSortableGhost, onSortEnd } = this.props;
      const { collection } = this.manager.active;

      // Remove the event listeners if the node is still in the DOM
      if (this.listenerNode) {
        events.move.forEach(eventName =>
          this.listenerNode.removeEventListener(eventName, this.handleSortMove)
        );
        events.end.forEach(eventName =>
          this.listenerNode.removeEventListener(eventName, this.handleSortEnd)
        );
      }

      // Remove the helper from the DOM
      this.helper.parentNode.removeChild(this.helper);

      if (hideSortableGhost && this.sortableGhost) {
        this.sortableGhost.style.visibility = '';
        this.sortableGhost.style.opacity = '';
      }

      const nodes = this.manager.refs[collection];
      for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        const el = node.node;

        // Clear the cached offsetTop / offsetLeft value
        node.edgeOffset = null;

        // Remove the transforms / transitions
        el.style[`${vendorPrefix}Transform`] = '';
        el.style[`${vendorPrefix}TransitionDuration`] = '';
      }

      // Stop autoscroll
      clearInterval(this.autoscrollInterval);
      this.autoscrollInterval = null;

      // Update state
      this.manager.active = null;

      this.setState({
        sorting: false,
        sortingIndex: null
      });

      if (typeof onSortEnd === 'function') {
        onSortEnd(
          {
            oldIndex: this.index,
            newIndex: this.newIndex,
            collection
          },
          event
        );
      }

      this._touched = false;
    };

    getContainer() {
      return ReactDOM.findDOMNode(this);
    }

    nodeIsChild = node => {
      return node.sortableInfo.manager === this.manager;
    };

    getChildContext() {
      return {
        manager: this.manager
      };
    }

    render() {
      const ref = config.withRef ? 'wrappedInstance' : null;
      return (
        <WrappedComponent
          ref={ref}
          {...omit(
            this.props,
            'contentWindow',
            'hideSortableGhost',
            'onSortEnd',
            'getContainer',
            'getHelperDimensions'
          )}
        />
      );
    }
  }

  drop.propTypes = {
    contentWindow: PropTypes.any,
    pressDelay: PropTypes.number,
    axis: PropTypes.oneOf(['x', 'y', 'xy']),
    hideSortableGhost: PropTypes.bool,
    getHelperDimensions: PropTypes.func,
    animateClass: PropTypes.string
  };

  drop.defaultProps = {
    pressDelay: 0,
    axis: 'x',
    hideSortableGhost: true,
    getHelperDimensions: ({ node }) => ({
      width: node.offsetWidth,
      height: node.offsetHeight
    })
  };

  drop.childContextTypes = {
    manager: PropTypes.object.isRequired
  };

  return drop;
};

export default SortableContainer;
