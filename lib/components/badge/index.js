// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCBadge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    let value = props.value;

    value > 99 && (value = '99+');
    value > 9 && (value = '9+');

    return (
      <span
        className={
          !props.modifiers
            ? prefix('badge')
            : `${prefix(`badge ${props.modifiers}`)}`
        }
        unselectable="on">
        {value}
      </span>
    );
  }
}

OCBadge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  modifiers: PropTypes.oneOf(['badge--error', 'badge--success'])
};

OCBadge.defaultProps = {
  value: 1
};

export default OCBadge;
