import * as React from 'react';

import { Props } from './divider.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const Divider: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace(
      'divider',
      toModifier(props.modifiers, 'divider')
    )} ${_.toString(props.className)}`
  );

  return <div className={classNames} style={props.style} aria-hidden="true" />;
};

Divider.defaultProps = {
  modifiers: 'divider--s'
};

export default Divider;
