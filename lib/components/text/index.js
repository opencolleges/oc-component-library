import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prefix, uniqueId, find } from '../utilities';

import OCInput from './input';
import OCTextarea from './textarea';

class OCText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      error: false,
      success: false,
      remaining: this.props.characterCount,
      disabled: find('text--disabled', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('text--disabled', this.props.modifiers)
      });
    }
  }

  myCallBack = remain => {
    this.setState({ remaining: remain });
  };

  render() {
    const { props, state, myCallBack } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('text')
            : `${prefix(`text ${props.modifiers}`)}`
        }>
        {props.tag === 'input' ? (
          <OCInput {...this.props} />
        ) : (
          <OCTextarea {...this.props} myCallBack={myCallBack} />
        )}
        <label className={prefix('text__label')}>{props.label}</label>
        {!state.disabled && <div className={prefix('text__border')} />}
        <span className={prefix('text__message')}>
          {props.tag === 'textarea'
            ? state.remaining <= 0
              ? `You've exceed ${props.characterCount} characters`
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
  name: PropTypes.string
};

export default OCText;
