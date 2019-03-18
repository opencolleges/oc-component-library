// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * style imports
import './preloader.scss';

// * React component
export default class OCPreloader extends React.Component {
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
    const { state } = this;

    return (
      <div
        className={
          !state.active ? prefix('preloader') : prefix('preloader active')
        }>
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

OCPreloader.propTypes = {
  active: PropTypes.bool
};

OCPreloader.defaultProps = {
  active: false
};
