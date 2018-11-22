import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prefix, find } from '../utilities';

class OCTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterCount: 0,
      value: this.props.value ? this.props.value : '',
      remaining: this.props.characterCount
    };
  }

  handleChange = event => {
    let remainder = this.state.remaining - event.target.value.length;
    this.props.myCallBack(remainder);
    this.setState({
      value: event.target.value.substring(0, this.props.characterCount)
    });
  };

  render() {
    const { props, state, handleChange } = this;

    return (
      <textarea
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

OCTextarea.propTypes = {
  autofocus: PropTypes.bool,
  modifiers: PropTypes.string,
  characterCount: PropTypes.number,
  myCallBack: PropTypes.func,
  name: PropTypes.string
};

export default OCTextarea;
