// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCTableBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return <tbody className={prefix('tbody')}>{props.children}</tbody>;
  }
}

OCTableBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default OCTableBody;
