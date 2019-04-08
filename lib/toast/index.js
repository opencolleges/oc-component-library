// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import getTimer from '../utils/getTimer';
import find from '../utils/find';
import prefix from '../utils/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      top: null
    };

    this.toastRef = React.createRef();

    this.timer = null;
  }

  setTop = element => {
    let top = 16;

    top += element.clientHeight / 2;

    while ((element = element.previousSibling)) {
      top += element.clientHeight + 16;
    }

    return top;
  };

  componentDidMount() {
    this.setState({ top: this.setTop(this.toastRef.current), mounted: true });

    if (this.props.modifiers !== 'toast--error') {
      this.timer = new getTimer(this.handleClick, 8000);
    }
  }

  componentDidUpdate() {
    if (
      this.state.mounted &&
      this.state.top !== this.setTop(this.toastRef.current)
    ) {
      this.setState({ top: this.setTop(this.toastRef.current) });
    }

    if (this.state.mounted === false) {
      setTimeout(() => {
        this.props.handleClick(this.props.id);
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer.getTimerId());
    }
  }

  handleClick = () => {
    this.setState({ mounted: false });
  };

  handleMouseEnter = () => {
    if (this.props.modifiers !== 'toast--error') {
      this.timer.pause();
    }
  };

  handleMouseLeave = () => {
    if (this.props.modifiers !== 'toast--error') {
      this.timer.resume();
    }
  };

  render() {
    const {
      props,
      state,
      toastRef,
      handleMouseEnter,
      handleMouseLeave,
      handleClick
    } = this;

    return (
      <div
        ref={toastRef}
        className={
          !props.modifiers
            ? prefix(`toast ${state.mounted ? 'mounted' : ''}`)
            : `${prefix(
                `toast ${props.modifiers} ${state.mounted ? 'mounted' : ''}`
              )}`
        }
        style={state.top && { top: state.top }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <h6 className={prefix('toast__heading')}>{props.heading}</h6>
        <p className={prefix('toast__message')}>{props.message}</p>
        <button
          className={prefix('toast__button')}
          tabIndex={0}
          title="Close"
          onClick={handleClick}>
          <OCIcon modifiers={'icon--close active'} />
        </button>
        <OCIcon
          modifiers={`icon--close-ring ${
            find('toast--error', props.modifiers) ? 'active' : ''
          }`}
        />
        <OCIcon
          modifiers={`icon--tick-ring ${
            find('toast--success', props.modifiers) ? 'active' : ''
          }`}
        />
        {props.icon &&
          (!find('toast--error', props.modifiers) ||
            !find('toast--success', props.modifiers)) && (
            <OCIcon modifiers={`${props.icon} active`} />
          )}
      </div>
    );
  }
}

OCToast.propTypes = {
  id: PropTypes.string.isRequired,
  modifiers: PropTypes.oneOf(['toast--error', 'toast--success']),
  icon: PropTypes.string,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
