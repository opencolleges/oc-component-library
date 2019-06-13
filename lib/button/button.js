// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
export default class OCButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: this.props.disabled
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  render() {
    const { props, state } = this;

    const Tag = typeof props.link === 'undefined' ? 'button' : 'a';

    return (
      <Tag
        className={
          !props.modifiers
            ? prefix(`button`)
            : `${prefix(`button ${props.modifiers}`)}`
        }
        type={Tag === 'button' ? props.type : null}
        name={props.name}
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
  name: PropTypes.string,
  modifiers: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

OCButton.defaultProps = {
  type: 'button',
  modifiers: 'button--primary',
  onClick: () => {}
};
