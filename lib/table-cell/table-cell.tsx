import React from 'react';

import { Props } from './table-cell.interface';

import BEM from '../utilities/ts/bem';

const TableCell: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;
  const bem = BEM(Tag);
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <Tag
      className={bem.getResult()}
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
