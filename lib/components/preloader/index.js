import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

class OCPreloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: this.props.show
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ loader: this.props.show });
    }
  }

  render() {
    const { state } = this;

    return (
      <div
        className={`${prefix('preloader')} ${
          state.loader === false ? prefix('hide') : prefix('show')
        }`}>
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
  show: PropTypes.bool
};

OCPreloader.defaultProps = {
  show: false
};

export default OCPreloader;
