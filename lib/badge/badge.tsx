import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getLabel from './utilities/get-label';

interface Props {
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: string | number;
}

const Badge: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`badge`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE; // ? Review type.

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <span className={getResult()} style={props.style} unselectable="on">
      {getLabel(props.value)}
    </span>
  );
};

Badge.defaultProps = {
  value: 0
};

export { Badge as default };
