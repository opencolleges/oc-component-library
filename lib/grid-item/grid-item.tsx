import React from 'react';

import { Props } from './grid-item.interface';

import BEM from '../utilities/ts/bem';

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
