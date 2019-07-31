// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const TableCell = ({
  tag,
  modifiers,
  className,
  style,
  colSpan,
  rowSpan,
  width,
  children
}) => {
  const Tag = tag;

  let classNames = namespace(Tag);

  modifiers && (classNames += ` ${namespace(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag
      className={classNames}
      style={style}
      colSpan={colSpan}
      rowSpan={rowSpan}
      width={width}>
      {children}
    </Tag>
  );
};

TableCell.propTypes = {
  tag: PropTypes.oneOf(['th', 'td']).isRequired,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired
};

TableCell.defaultProps = {
  tag: 'td',
  children: ' '
};

export default TableCell;
