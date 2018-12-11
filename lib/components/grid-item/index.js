import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

const OCGridItem = ({ modifiers, children }) => {
  return (
    <div
      className={
        !modifiers ? prefix('grid__item') : prefix(`grid__item ${modifiers}`)
      }>
      {children}
    </div>
  );
};

OCGridItem.propTypes = {
  modifiers: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default OCGridItem;
