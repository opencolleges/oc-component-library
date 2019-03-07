// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCTableCell = ({ tag, modifiers, colSpan, rowSpan, width, children }) => {
  const Tag = tag;

  return (
    <Tag
      className={!modifiers ? prefix(Tag) : `${prefix(`${Tag} ${modifiers}`)}`}
      colSpan={colSpan ? colSpan : null}
      rowSpan={rowSpan ? rowSpan : null}
      width={width ? width : null}>
      {children}
    </Tag>
  );
};

OCTableCell.propTypes = {
  tag: PropTypes.oneOf(['th', 'td']).isRequired,
  modifiers: PropTypes.string,
  colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired
};

OCTableCell.defaultProps = {
  tag: 'td',
  children: ' '
};

export default OCTableCell;
