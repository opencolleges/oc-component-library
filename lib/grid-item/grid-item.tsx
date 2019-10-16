import * as React from 'react';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

const GridItem: React.FC<Props> = props => {
  const bem = BEM('grid__item');
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <div className={bem.getResult()} style={props.style}>
      {props.children}
    </div>
  );
};

export default GridItem;
