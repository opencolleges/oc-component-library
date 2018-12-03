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
    this.textAreaRef = React.createRef();
    this.textAreaHeight = null;
    this.textAreaoffSetHeight = null;
  }

  componentDidMount() {
    this.resize();
  }

  resize = () => {
    let heightOffset = null;
    const node = this.textAreaRef.current;
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
      const style = window.getComputedStyle(borderNode, null);
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
    let remainder = this.state.remaining - event.target.value.length;
    this.props.myCallBack(remainder);
    this.setState({
      value: event.target.value.substring(0, this.props.characterCount)
    });
    this.resize();
  };

  render() {
    const { props, state, handleChange } = this;

    return (
      <textarea
        ref={this.textAreaRef}
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
