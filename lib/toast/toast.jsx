// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import getTimer from '../utilities/ts/getTimer';
import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

// * child imports
import Icon from '../icon';

import _ from 'lodash';

// * React component
class Toast extends React.Component {
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

    if (this.props.modifiers !== `toast--error`) {
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
        if (nextToastRef.childNodes[index].hasAttribute(`tabindex`)) {
          nextToastRef.childNodes[index].focus();
        }
      }
    } else if (previousToastRef) {
      for (let index = 0; index < previousToastRef.childNodes.length; index++) {
        if (previousToastRef.childNodes[index].hasAttribute(`tabindex`)) {
          previousToastRef.childNodes[index].focus();
        }
      }
    }

    this.setState({ focus: false, mounted: false });
  };

  handleMouseEnter = () => {
    if (this.props.modifiers !== `toast--error` && !this.state.focus) {
      this.timer.pause();
    }

    this.setState({ mouseOver: true });
  };

  handleMouseLeave = () => {
    if (this.props.modifiers !== `toast--error` && !this.state.focus) {
      this.timer.resume();
    }

    this.setState({ mouseOver: false });
  };

  handleFocus = () => {
    if (this.props.modifiers !== `toast--error` && !this.state.mouseOver) {
      this.timer.pause();
    }

    this.setState({ focus: true });
  };

  handleBlur = () => {
    if (this.props.modifiers !== `toast--error` && !this.state.mouseOver) {
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
            toastRef.previousSibling.childNodes[index].hasAttribute(`tabindex`)
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
            toastRef.previousSibling.childNodes[index].hasAttribute(`tabindex`)
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
          if (toastRef.nextSibling.childNodes[index].hasAttribute(`tabindex`)) {
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
          if (toastRef.nextSibling.childNodes[index].hasAttribute(`tabindex`)) {
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

    let classNames = namespace(`toast`);

    props.modifiers &&
      (classNames += ` ${namespace(toModifier(props.modifiers, `toast`))}`);

    state.mounted && (classNames += ` ${namespace(`mounted`)}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div
        ref={toastRef}
        className={classNames}
        style={state.top ? { top: state.top, ...props.style } : props.style}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <h6 className={namespace(`toast__heading`)}>{props.heading}</h6>
        <p className={namespace(`toast__message`)}>{props.message}</p>
        <button
          id={props.id}
          className={namespace(`toast__button`)}
          tabIndex={0}
          title="Close"
          onClick={handleClick}>
          <Icon modifiers={`icon--close active`} />
        </button>
        <Icon
          modifiers={`icon--close-ring ${
            _.includes(_.split(props.modifiers, ` `), `toast--error`)
              ? `active`
              : ``
          }`}
        />
        <Icon
          modifiers={`icon--tick-ring ${
            _.includes(_.split(props.modifiers, ` `), `toast--success`)
              ? `active`
              : ``
          }`}
        />
        {props.icon &&
          (!_.includes(_.split(props.modifiers, ` `), `toast--error`) ||
            !_.includes(_.split(props.modifiers, ` `), `toast--success`)) && (
            <Icon modifiers={`${props.icon} active`} />
          )}
      </div>
    );
  }
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  modifiers: PropTypes.oneOf([`toast--error`, `toast--success`]),
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClick: PropTypes.func
};

Toast.defaultProps = {
  duration: 8000,
  onClick: () => {}
};

export { Toast as default };
