import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import { ELEMENT_SEPARATOR } from '../utilities/ts/constants';

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

const GridItem: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`grid${ELEMENT_SEPARATOR}item`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <div className={getResult()} style={props.style}>
      {props.children}
    </div>
  );
};

export { GridItem as default };
