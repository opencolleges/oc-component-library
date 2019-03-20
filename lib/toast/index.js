// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
export default class OCToast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <li
        className={
          !props.modifiers
            ? prefix('toast')
            : `${prefix(`toast ${props.modifiers}`)}`
        }>
        <h6 className={prefix('toast__heading')}>{props.heading}</h6>
        <p className={prefix('toast__message')}>{props.message}</p>
        <button className={prefix('toast__button')}>X</button>
      </li>
    );
  }
}

OCToast.propTypes = {
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  modifiers: PropTypes.string
};
