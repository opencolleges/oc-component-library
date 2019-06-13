// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import getTimer from '../utilities/js/getTimer';
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      top: null,
      focus: false,
      mouseOver: false
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
      this.timer = new getTimer(this.handleClick, this.props.duration);
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
        this.props.onClick(this.props.id);
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer.getTimerId());
    }
  }

  handleClick = () => {
    const toastRef = this.toastRef.current;

    const nextToastRef = toastRef.nextSibling;
    const previousToastRef = toastRef.previousSibling;

    if (nextToastRef) {
      for (let index = 0; index < nextToastRef.childNodes.length; index++) {
        if (nextToastRef.childNodes[index].hasAttribute('tabindex')) {
          nextToastRef.childNodes[index].focus();
        }
      }
    } else if (previousToastRef) {
      for (let index = 0; index < previousToastRef.childNodes.length; index++) {
        if (previousToastRef.childNodes[index].hasAttribute('tabindex')) {
          previousToastRef.childNodes[index].focus();
        }
      }
    }

    this.setState({ focus: false, mounted: false });
  };

  handleMouseEnter = () => {
    if (this.props.modifiers !== 'toast--error' && !this.state.focus) {
      this.timer.pause();
    }

    this.setState({ mouseOver: true });
  };

  handleMouseLeave = () => {
    if (this.props.modifiers !== 'toast--error' && !this.state.focus) {
      this.timer.resume();
    }

    this.setState({ mouseOver: false });
  };

  handleFocus = () => {
    if (this.props.modifiers !== 'toast--error' && !this.state.mouseOver) {
      this.timer.pause();
    }

    this.setState({ focus: true });
  };

  handleBlur = () => {
    if (this.props.modifiers !== 'toast--error' && !this.state.mouseOver) {
      this.timer.resume();
    }

    this.setState({ focus: false });
  };

  // This method is triggered onKeyDown, because the default scroll behaviour
  // fires before onKeyUp.

  handleKeyDown = event => {
    const toastRef = this.toastRef.current;

    // 'ArrowLeft' key
    if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.previousSibling) {
        for (
          let index = 0;
          index < toastRef.previousSibling.childNodes.length;
          index++
        ) {
          if (
            toastRef.previousSibling.childNodes[index].hasAttribute('tabindex')
          ) {
            toastRef.previousSibling.childNodes[index].focus();
            break;
          }
        }
      }
    }

    // 'ArrowUp' key
    if (event.keyCode === 38) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.previousSibling) {
        for (
          let index = 0;
          index < toastRef.previousSibling.childNodes.length;
          index++
        ) {
          if (
            toastRef.previousSibling.childNodes[index].hasAttribute('tabindex')
          ) {
            toastRef.previousSibling.childNodes[index].focus();
            break;
          }
        }
      }
    }

    // 'ArrowRight' key
    if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.nextSibling) {
        for (
          let index = 0;
          index < toastRef.nextSibling.childNodes.length;
          index++
        ) {
          if (toastRef.nextSibling.childNodes[index].hasAttribute('tabindex')) {
            toastRef.nextSibling.childNodes[index].focus();
            break;
          }
        }
      }
    }

    // 'ArrowDown' key
    if (event.keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.nextSibling) {
        for (
          let index = 0;
          index < toastRef.nextSibling.childNodes.length;
          index++
        ) {
          if (toastRef.nextSibling.childNodes[index].hasAttribute('tabindex')) {
            toastRef.nextSibling.childNodes[index].focus();
            break;
          }
        }
      }
    }
  };

  render() {
    const {
      props,
      state,
      toastRef,
      handleKeyDown,
      handleFocus,
      handleBlur,
      handleMouseEnter,
      handleMouseLeave,
      handleClick
    } = this;

    return (
      <div
        ref={toastRef}
        className={
          !props.modifiers
            ? prefix(`toast ${state.mounted ? 'toast--mounted' : ''}`)
            : `${prefix(
                `toast ${props.modifiers} ${
                  state.mounted ? 'toast--mounted' : ''
                }`
              )}`
        }
        style={state.top && { top: state.top }}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <h6 className={prefix('toast__heading')}>{props.heading}</h6>
        <p className={prefix('toast__message')}>{props.message}</p>
        <button
          id={props.id}
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
  duration: PropTypes.number,
  onClick: PropTypes.func
};

OCToast.defaultProps = {
  duration: 8000,
  onClick: () => {}
};
