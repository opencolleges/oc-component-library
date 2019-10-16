import * as React from 'react';

import BEM from '../utilities/ts/bem';

type TTag = 'td' | 'th';

interface Props {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  modifiers?: string;
  rowSpan?: number;
  style?: React.CSSProperties;
  tag?: TTag;
  width?: string;
}

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
