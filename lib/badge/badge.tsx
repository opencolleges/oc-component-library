import * as React from 'react';

import { IBadgeProps } from './badge.types';
import getBadgeLabel from './utilities/getBadgeLabel';

import namespace from '../utilities/js/namespace';

const Badge: React.FC<IBadgeProps> = props => {
  const class_names: string = `${namespace(
    'badge',
    props.modifiers
  )}${props.className && ` ${props.className}`}`;

  return (
    <span className={class_names} style={props.style} unselectable="on">
      {getBadgeLabel(props.value)}
    </span>
  );
};

Badge.defaultProps = {
  modifiers: '',
  className: '',
  style: {},
  value: 0
};

export default Badge;
