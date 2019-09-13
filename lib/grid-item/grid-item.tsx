import * as React from 'react';

import { Props } from './grid-item.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const GridItem: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace(
      'grid__item',
      toModifier(props.modifiers, 'grid__item')
    )} ${_.toString(props.className)}`
  );

  return (
    <div className={classNames} style={props.style}>
      {props.children}
    </div>
  );
};

export default GridItem;
