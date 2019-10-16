import PropTypes from 'prop-types';
import React from 'react';

import namespace from '../utilities/ts/namespace';

import _ from 'lodash';

const SkeletonLoader = props => {
  const classNames = _.trim(
    `${namespace('skeleton-loader')} ${_.toString(props.className)}`
  );

  return <div className={classNames} style={props.style} />;
};

SkeletonLoader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default SkeletonLoader;
