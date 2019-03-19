// * React imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// * utility imports
import { provideDisplayName, omit } from './utility';

// * React component
const SortableElement = (WrappedComponent, config = { withRef: false }) => {
  class drag extends Component {
    static displayName = provideDisplayName(
      'sortableElement',
      WrappedComponent
    );

    componentDidMount() {
      const { collection, disabled, index } = this.props;

      if (!disabled) {
        this.setDraggable(collection, index);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.index !== nextProps.index && this.node) {
        this.node.sortableInfo.index = nextProps.index;
      }
      if (this.props.disabled !== nextProps.disabled) {
        const { collection, disabled, index } = nextProps;
        if (disabled) {
          this.removeDraggable(collection);
        } else {
          this.setDraggable(collection, index);
        }
      } else if (this.props.collection !== nextProps.collection) {
        this.removeDraggable(this.props.collection);
        this.setDraggable(nextProps.collection, nextProps.index);
      }
    }

    componentWillUnmount() {
      const { collection, disabled } = this.props;

      if (!disabled) this.removeDraggable(collection);
    }

    setDraggable(collection, index) {
      const node = (this.node = ReactDOM.findDOMNode(this));

      node.sortableInfo = {
        index,
        collection,
        manager: this.context.manager
      };

      this.ref = { node };
      this.context.manager.add(collection, this.ref);
    }

    removeDraggable(collection) {
      this.context.manager.remove(collection, this.ref);
    }

    render() {
      const ref = config.withRef ? 'wrappedInstance' : null;

      return (
        <WrappedComponent
          ref={ref}
          {...omit(this.props, 'collection', 'disabled', 'index')}
        />
      );
    }
  }

  drag.contextTypes = {
    manager: PropTypes.object.isRequired
  };

  drag.propTypes = {
    index: PropTypes.number.isRequired,
    collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool
  };

  drag.defaultProps = {
    collection: 0
  };

  return drag;
};

export default SortableElement;
