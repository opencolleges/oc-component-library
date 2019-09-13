import PropTypes from 'prop-types';
import React from 'react';

import * as _ from 'lodash';

import NAMESPACE from '../utilities/ts/constants';

import namespace from '../utilities/ts/namespace';

import Toast from '../toast';

export default class Toaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: this.props.toast ? this.addId(this.props.toast) : []
    };
  }

  addId = toast => {
    for (let index = 0; index < toast.length; index++) {
      if (!toast[index].id) {
        toast[index].id = _.uniqueId(`${NAMESPACE}-`);
      }
    }

    return toast;
  };

  componentDidUpdate(previousProps) {
    if (previousProps !== this.props) {
      this.setState({
        toast: [...this.state.toast, ...this.addId(this.props.toast)]
      });
    }
  }

  handleClick = id => {
    // * create an additional instance of array, so that .splice() doesn't
    // * directly mutate state.
    const toast = [...this.state.toast];

    for (let index = 0; index < toast.length; index++) {
      if (toast[index].id === id) {
        toast.splice(index, 1);
      }
    }

    this.setState({ toast: toast });
  };

  render() {
    const { props, state, handleClick } = this;

    let classNames = namespace('toaster');

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        {state.toast.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            modifiers={toast.modifiers}
            className={toast.className}
            style={toast.style}
            icon={toast.icon}
            heading={toast.heading}
            message={toast.message}
            onClick={handleClick}
          />
        ))}
      </div>
    );
  }
}

Toaster.propTypes = {
  toast: PropTypes.arrayOf(
    PropTypes.shape({
      modifiers: PropTypes.string,
      className: PropTypes.string,
      style: PropTypes.object,
      heading: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  ),
  className: PropTypes.string,
  style: PropTypes.object
};
