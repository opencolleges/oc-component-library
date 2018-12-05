import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';
import OCIcon from '../icon';

class OCText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      value: this.props.value
        ? this.props.value.length < this.props.characterCount
          ? this.props.value
          : this.props.value.substring(0, this.props.characterCount)
        : '',
      remaining: this.props.value
        ? this.props.value.length < this.props.characterCount
          ? this.props.characterCount - this.props.value.length
          : 0
        : this.props.characterCount,
      error: find('text--error', this.props.modifiers),
      success: find('text--success', this.props.modifiers),
      disabled: find('text--disabled', this.props.modifiers),
      readOnly: find('text--read-only', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('text--error', this.props.modifiers),
        success: find('text--success', this.props.modifiers),
        disabled: find('text--disabled', this.props.modifiers),
        readOnly: find('text--read-only', this.props.modifiers)
      });
    }

    if (this.state.value !== previousState.value) {
      this.setState({
        error: false,
        success: false
      });
    }
  }

  myCallBack = (value, remaining) => {
    this.setState({ value: value, remaining: remaining });
  };

  newCallBack = value => {
    this.setState({ value: value });
  };

  render() {
    const { props, state, myCallBack, newCallBack } = this;

    const modifiers = remove(
      [
        'text--disabled',
        'text--read-only',
        'text--required',
        'text--error',
        'text--success'
      ],
      props.modifiers
    );

    let hooks = '';

    state.error && (hooks += 'text--error ');
    state.success && (hooks += 'text--success');

    return (
      <div
        className={
          !modifiers
            ? prefix(`text ${hooks}`)
            : `${prefix(`text ${modifiers} ${hooks}`)}`
        }>
        {props.tag === 'input' ? (
          <Input {...this.props} newCallBack={newCallBack} />
        ) : (
          <Textarea {...this.props} myCallBack={myCallBack} />
        )}
        <label className={prefix('text__label')}>{props.label}</label>
        <OCIcon modifiers={`icon--close ${state.error ? 'active' : ''}`} />
        <OCIcon modifiers={`icon--tick ${state.success ? 'active' : ''}`} />
        {!state.disabled && !state.readOnly && (
          <div className={prefix('text__border')} />
        )}
        <span className={prefix('text__message')}>
          {props.tag === 'textarea'
            ? state.remaining <= 0
              ? `You've reached ${props.characterCount} characters`
              : `${state.remaining} characters remaining`
            : null}
        </span>
      </div>
    );
  }
}

OCText.propTypes = {
  tag: PropTypes.oneOf(['input', 'textarea']),
  label: PropTypes.string.isRequired,
  modifiers: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ''
    };
  }

  handleChange = event => {
    this.props.newCallBack(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    const { props, state, handleChange, handleKeyDown } = this;

    return (
      <input
        className={
          !state.value ? prefix('text__input') : prefix('text__input active')
        }
        type={props.type}
        disabled={find('text--disabled', props.modifiers)}
        required={find('text--required', props.modifiers)}
        readOnly={find('text--read-only', props.modifiers)}
        autoComplete={props.autocomplete}
        autoFocus={props.autofocus}
        spellCheck={false}
        value={state.value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        name={props.name}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['email', 'password', 'tel', 'text', 'url']),
  value: PropTypes.string,
  autocomplete: PropTypes.oneOf([
    'on',
    'off',
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',
    'impp',
    'url',
    'photo'
  ]),
  autofocus: PropTypes.bool,
  modifiers: PropTypes.string,
  newCallBack: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  autofocus: false
};

class Textarea extends Component {
  constructor(props) {
    super(props);

    this.textAreaRef = React.createRef();

    this.state = {
      value: this.props.value
        ? this.props.value.length < this.props.characterCount
          ? this.props.value
          : this.props.value.substring(0, this.props.characterCount)
        : ''
    };

    this.textAreaHeight = null;
    this.textAreaoffSetHeight = null;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize = () => {
    let heightOffset = null;
    const node = this.textAreaRef.current;
    node.style.height = '';
    const style = window.getComputedStyle(node, null);

    heightOffset =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    this.textAreaoffSetHeight = node.offsetTop;
    this.textAreaHeight = node.scrollHeight + heightOffset;
    node.style.height = this.textAreaHeight + 'px';
    this.resizeBorder();
    this.resizeParentNode();
  };

  resizeBorder = () => {
    const textAreaSize = this.textAreaHeight;
    const node = this.textAreaRef.current;

    const borderNode = node.parentNode.querySelector(
      '.' + prefix('text__border')
    );
    if (borderNode !== null) {
      //const style = window.getComputedStyle(borderNode, null);
      borderNode.style.top =
        this.textAreaoffSetHeight + textAreaSize - 1 + 'px';
    }
  };

  resizeParentNode = () => {
    const node = this.textAreaRef.current;
    const parentNode = node.parentNode;
    if (parentNode !== null) {
      parentNode.style.height = this.textAreaHeight + 16 * 3 + 'px';
    }
  };

  handleChange = event => {
    this.props.myCallBack(
      event.target.value,
      this.props.characterCount - event.target.value.length
    );
    this.setState({
      value: event.target.value
    });
    this.resize();
  };

  render() {
    const { props, state, handleChange, textAreaRef } = this;

    return (
      <textarea
        ref={textAreaRef}
        className={
          !state.value
            ? prefix('text__textarea')
            : prefix('text__textarea active')
        }
        disabled={find(`text--disabled`, props.modifiers)}
        required={find(`text--required`, props.modifiers)}
        readOnly={find(`text--read-only`, props.modifiers)}
        autoComplete={props.autocomplete}
        autoFocus={props.autofocus}
        value={state.value}
        onChange={handleChange}
        maxLength={this.props.characterCount}
        name={props.name}
      />
    );
  }
}

Textarea.propTypes = {
  autofocus: PropTypes.bool,
  modifiers: PropTypes.string,
  characterCount: PropTypes.number,
  myCallBack: PropTypes.func,
  name: PropTypes.string
};

export default OCText;
