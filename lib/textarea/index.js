// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';
import remove from '../utils/remove';
import getId from '../utils/getId';
import getWindowWidth from '../utils/getWindowWidth';

import BrowserDetect from 'browser-detect';

// * React component
export default class OCTextarea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null,
      value: this.props.value
        ? this.props.maxLength && this.props.maxLength > 0
          ? this.props.value.length < this.props.maxLength
            ? this.props.value
            : this.props.value.substring(0, this.props.maxLength)
          : this.props.value
        : '',
      remaining: this.props.value
        ? this.props.value.length < this.props.maxLength
          ? this.props.maxLength - this.props.value.length
          : 0
        : this.props.maxLength,
      error: find('textarea--error', this.props.modifiers),
      success: find('textarea--success', this.props.modifiers),
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : getId();

    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('textarea--error', this.props.modifiers),
        success: find('textarea--success', this.props.modifiers)
      });
    }

    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }

    if (this.state.value !== previousState.value) {
      this.setState({
        error: false,
        success: false
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const textarea = this.textareaRef.current;

    this.setState(
      {
        height: null
      },
      function() {
        const windowWidth = getWindowWidth();

        let maxHeight = null;

        if (windowWidth === 'small') {
          maxHeight = 200;
        } else if (windowWidth === 'medium') {
          maxHeight = 264;
        } else {
          maxHeight = 392;
        }

        this.setState({
          height:
            textarea.scrollHeight + 1 < maxHeight
              ? textarea.scrollHeight + 1
              : maxHeight
        });
      }
    );
  };

  handleChange = event => {
    const target = event.target || event.srcElement;

    this.setState({
      value: target.value,
      remaining: target.value
        ? target.value.length < this.props.maxLength
          ? this.props.maxLength - target.value.length
          : 0
        : this.props.maxLength
    });

    this.resize();
    this.props.onChange(target.value, this.props.name);
  };

  render() {
    const { props, state, id, textareaRef, handleChange } = this;

    const modifiers = remove(
      ['textarea--error', 'textarea--success'],
      props.modifiers
    );

    let hooks = '';

    state.error && (hooks += 'textarea--error ');
    state.success && (hooks += 'textarea--success');

    const browser = BrowserDetect();

    let borderHeight = 1;

    browser.name === 'firefox' && (borderHeight = 0);

    return (
      <div
        className={
          !modifiers
            ? prefix(`textarea ${hooks}`)
            : `${prefix(`textarea ${modifiers} ${hooks}`)}`
        }
        style={state.height ? { height: `${state.height + 40}px` } : null}>
        <textarea
          ref={textareaRef}
          id={id}
          className={
            !state.value
              ? prefix('textarea__input')
              : prefix('textarea__input active')
          }
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          maxLength={
            props.maxLength && props.maxLength > 0 ? props.maxLength : null
          }
          spellCheck={props.spellCheck}
          value={state.value}
          rows={1}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          style={state.height ? { height: `${state.height}px` } : null}
          // Grammarly control
          data-gramm={!props.grammarly ? false : null}
          onChange={handleChange}
        />
        <label className={prefix('textarea__label')}>{props.label}</label>
        {!props.readOnly && !state.disabled && (
          <div
            className={prefix('textarea__border')}
            style={
              state.height
                ? { top: `${state.height + (16 - borderHeight)}px` }
                : null
            }
          />
        )}
        {!props.readOnly && !state.disabled && (
          <span className={prefix('textarea__message')}>
            {props.message
              ? props.message
              : props.maxLength
              ? state.remaining <= 0
                ? `You've reached ${props.maxLength} characters`
                : `${state.remaining} characters remaining`
              : ''}
          </span>
        )}
      </div>
    );
  }
}

OCTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifiers: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  grammarly: PropTypes.bool,
  message: PropTypes.string,
  onChange: PropTypes.func
};

OCTextarea.defaultProps = {
  spellCheck: true,
  grammarly: true,
  onChange: () => {}
};
