import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

type TagTypes = `td` | `th`;

interface Props {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  modifiers?: string;
  rowSpan?: number;
  style?: React.CSSProperties;
  tag?: TagTypes;
}

const TableCell: React.FC<Props> = (props: Props) => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const BEM_MODULE: BEMInterface = BEM(Tag);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag
      className={getResult()}
      style={props.style}
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}>
      {props.children}
    </Tag>
  );
};

TableCell.defaultProps = {
  tag: `td`
};

export { TableCell as default };
