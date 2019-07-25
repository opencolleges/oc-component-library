// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
export default class Preloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.active !== previousProps.active) {
      this.setState({ active: this.props.active });
    }
  }

  render() {
    const { props, state } = this;

    let classNames = prefix('preloader');

    state.active && (classNames += ` ${prefix('active')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <svg className={prefix('preloader__stroke-outer')} viewBox="0 0 96 96">
          <circle
            className={prefix('preloader__stroke preloader__stroke--1')}
            cx="48"
            cy="48"
            r="44"
          />
          <circle
            className={prefix('preloader__stroke preloader__stroke--2')}
            cx="48"
            cy="48"
            r="44"
          />
          <circle
            className={prefix('preloader__stroke preloader__stroke--3')}
            cx="48"
            cy="48"
            r="44"
          />
        </svg>
      </div>
    );
  }
}

Preloader.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

Preloader.defaultProps = {
  active: false
};
