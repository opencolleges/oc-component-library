import PropTypes from 'prop-types';
import React from 'react';

import prefix from '../utilities/js/prefix';

const OCSkeletonLoader = props => {
  let classNames = prefix('skeleton-loader');

  props.className && (classNames += ` ${props.className}`);

  return <div className={classNames} style={props.style} />;
};

OCSkeletonLoader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default OCSkeletonLoader;
