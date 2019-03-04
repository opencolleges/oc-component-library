// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCTableHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return <thead className={prefix('thead')}>{props.children}</thead>;
  }
}

OCTableHead.propTypes = {
  children: PropTypes.node.isRequired
};

export default OCTableHead;
