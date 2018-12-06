import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

const OCHeading = props => {
  const { level, modifiers, children } = props;
  const Heading = level.toLowerCase();
  const classNames = modifiers === '' ? level : level + ' ' + modifiers;

  return <Heading className={prefix(classNames)}>{children}</Heading>;
};

OCHeading.protoTypes = {
  level: PropTypes.string,
  modifiers: PropTypes.string
};

OCHeading.defaultProps = {
  level: 'h2',
  modifiers: ''
};

export default OCHeading;
