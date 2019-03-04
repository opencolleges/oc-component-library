// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCTableCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    const Tag = props.tag;

    return (
      <Tag
        className={
          !props.modifiers ? prefix(Tag) : prefix(`${Tag} ${props.modifiers}`)
        }
        width={props.width ? props.width : null}>
        {props.children}
      </Tag>
    );
  }
}

OCTableCell.propTypes = {
  tag: PropTypes.oneOf(['th', 'td']).isRequired,
  modifiers: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired
};

OCTableCell.defaultProps = {
  tag: 'td',
  children: ' '
};

export default OCTableCell;
