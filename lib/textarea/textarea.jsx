import PropTypes from 'prop-types';
import React from 'react';

import _ from 'lodash';

import { NAMESPACE } from '../utilities/ts/constants';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';
import remove from '../utilities/ts/remove';
import getWindowWidth from '../utilities/ts/getWindowWidth';

import BrowserDetect from 'browser-detect';

export default class Textarea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null,
      overflow: 'hidden',
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
      message: this.props.message ? this.props.message : '',
      error: _.includes(_.split(this.props.modifiers, ' '), 'textarea--error'),
      success: _.includes(
        _.split(this.props.modifiers, ' '),
        'textarea--success'
      ),
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : _.uniqueId(`${NAMESPACE}-`);

    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: _.includes(
          _.split(this.props.modifiers, ' '),
          'textarea--error'
        ),
        success: _.includes(
          _.split(this.props.modifiers, ' '),
          'textarea--success'
        ),
        message: this.props.message ? this.props.message : ''
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
        success: false,
        message: ''
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

        if (!this.props.readOnly) {
          if (windowWidth === 'small') {
            maxHeight = 200;
          } else if (windowWidth === 'medium') {
            maxHeight = 264;
          } else {
            maxHeight = 392;
          }
        }

        this.setState({
          height: maxHeight
            ? textarea.scrollHeight + 1 < maxHeight
              ? textarea.scrollHeight + 1
              : maxHeight
            : textarea.scrollHeight + 1,
          overflow:
            maxHeight && textarea.scrollHeight + 1 < maxHeight
              ? 'hidden'
              : 'auto'
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

    let classNames = namespace('textarea');

    modifiers &&
      (classNames += ` ${namespace(toModifier(modifiers, 'textarea'))}`);

    state.error &&
      (classNames += ` ${namespace(toModifier('error', 'textarea'))}`);
    state.success &&
      (classNames += ` ${namespace(toModifier('success', 'textarea'))}`);

    props.className && (classNames += ` ${props.className}`);

    const browser = BrowserDetect();

    let borderHeight = 1;

    browser.name === 'firefox' && (borderHeight = 0);

    return (
      <div
        className={classNames}
        style={
          state.height
            ? { height: `${state.height + 40}px`, ...props.style }
            : props.style
        }>
        <textarea
          ref={textareaRef}
          id={id}
          className={
            !state.value
              ? namespace('textarea__input')
              : namespace('textarea__input active')
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
          placeholder={props.placeholder}
          spellCheck={props.spellCheck}
          value={state.value}
          rows={1}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          style={{
            height: state.height ? `${state.height}px` : null,
            overflow: state.overflow === 'auto' ? 'auto' : null
          }}
          // Grammarly control
          data-gramm={!props.grammarly ? false : null}
          onChange={handleChange}
        />
        <label className={namespace('textarea__label')}>{props.label}</label>
        {!props.readOnly && !state.disabled && (
          <div
            className={namespace('textarea__border')}
            style={
              state.height
                ? { top: `${state.height + (16 - borderHeight)}px` }
                : null
            }
          />
        )}
        {!props.readOnly && !state.disabled && (
          <span className={namespace('textarea__message')}>
            {state.message
              ? state.message
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

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.bool,
  grammarly: PropTypes.bool,
  message: PropTypes.string,
  onChange: PropTypes.func
};

Textarea.defaultProps = {
  spellCheck: true,
  grammarly: true,
  onChange: () => {}
};