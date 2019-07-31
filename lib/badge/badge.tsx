import * as React from 'react';

import namespace from '../utilities/js/namespace';

import { IBadgeProps } from './badge.types';
import getBadgeLabel from './utilities/getBadgeLabel';

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
  className: '',
  modifiers: '',
  style: {},
  value: 0
};

export default Badge;
