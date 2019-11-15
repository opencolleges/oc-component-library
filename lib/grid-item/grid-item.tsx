import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import { ELEMENT_SEPARATOR } from '../utilities/ts/constants';

type TagTypes = `div` | `section`;

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
  tag?: TagTypes;
}

const GridItem: React.FC<Props> = (props: Props) => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const BEM_MODULE: BEMInterface = BEM(`grid${ELEMENT_SEPARATOR}item`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag className={getResult()} style={props.style}>
      {props.children}
    </Tag>
  );
};

GridItem.defaultProps = {
  tag: `div`
};

export { GridItem as default };
