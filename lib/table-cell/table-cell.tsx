import * as React from 'react';

import { Props } from './table-cell.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const TableCell: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const classNames: string = _.trim(
    `${namespace(Tag, props.modifiers)} ${_.toString(props.className)}`
  );

  return (
    <Tag
      className={classNames}
      style={props.style}
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}>
      {props.children}
    </Tag>
  );
};

TableCell.defaultProps = {
  tag: 'td'
};

export default TableCell;
