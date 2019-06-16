// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableCell = ({
  tag,
  modifiers,
  style,
  colSpan,
  rowSpan,
  width,
  children
}) => {
  const Tag = tag;

  return (
    <Tag
      className={!modifiers ? prefix(Tag) : `${prefix(`${Tag} ${modifiers}`)}`}
      style={style}
      colSpan={colSpan}
      rowSpan={rowSpan}
      width={width}>
      {children}
    </Tag>
  );
};

OCTableCell.propTypes = {
  tag: PropTypes.oneOf(['th', 'td']).isRequired,
  modifiers: PropTypes.string,
  style: PropTypes.object,
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
