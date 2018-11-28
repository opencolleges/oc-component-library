import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, find, remove } from '../utilities';

class OCButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: find('button--disabled', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('button--disabled', this.props.modifiers)
      });
    }
  }

  render() {
    const { props, state } = this;
    const modifiers = remove('button--disabled', props.modifiers);
    const Tag = typeof props.link === 'undefined' ? 'button' : 'a';

    return (
      <Tag
        className={
          !modifiers ? prefix('button') : `${prefix(`button ${modifiers}`)}`
        }
        type={Tag === 'button' ? props.type : null}
        name={`button-${props.action}`}
        href={props.link}
        disabled={state.disabled}
        title={props.action}
        onClick={props.onClick}>
        {props.action}
      </Tag>
    );
  }
}

OCButton.propTypes = {
  action: PropTypes.string.isRequired,
  link: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  modifiers: PropTypes.string,
  onClick: PropTypes.func
};

OCButton.defaultProps = {
  type: 'button',
  modifiers: 'button--primary'
};

export default OCButton;
