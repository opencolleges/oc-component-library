// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * child imports
import Icon from '../icon';

// * React component
export default class Button extends React.Component {
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

    const Tag = typeof props.href === 'undefined' ? 'button' : 'a';

    let classNames = prefix('button');

    props.modifiers && (classNames += ` ${prefix(props.modifiers)}`);
    props.icon && (classNames += ` ${prefix('button--icon')}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <Tag
        className={classNames}
        style={props.style}
        type={Tag === 'button' ? props.type : null}
        name={props.name}
        href={props.href}
        disabled={state.disabled}
        title={props.action}
        onClick={props.onClick}>
        {props.icon && <Icon modifiers={`icon--${props.icon} active`} />}
        {props.action}
      </Tag>
    );
  }
}

Button.propTypes = {
  action: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  name: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf([
    'arrow-up',
    'arrow-right',
    'arrow-down',
    'arrow-left',
    'calendar',
    'chevron-up',
    'chevron-right',
    'chevron-down',
    'chevron-left',
    'clock',
    'close',
    'close-ring',
    'cloud',
    'cloud-download',
    'cloud-upload',
    'draggable',
    'hamburger',
    'minus',
    'minus-ring',
    'plus',
    'plus-ring',
    'search',
    'tick',
    'tick-ring'
  ]),
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: 'button',
  modifiers: 'button--primary',
  onClick: () => {}
};
