import PropTypes from 'prop-types';
import React from 'react';

import prefix from '../utilities/ts/prefix';

const SkeletonLoader = props => {
  let classNames = prefix('skeleton-loader');

  props.className && (classNames += ` ${props.className}`);

  return <div className={classNames} style={props.style} />;
};

SkeletonLoader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default SkeletonLoader;
