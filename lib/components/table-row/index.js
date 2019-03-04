// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCTableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return <tr className={prefix('tr')}>{props.children}</tr>;
  }
}

OCTableRow.propTypes = {
  children: PropTypes.node.isRequired
};

export default OCTableRow;
