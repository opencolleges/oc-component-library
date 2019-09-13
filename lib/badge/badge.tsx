import * as React from 'react';

import { Props } from './badge.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';
import getBadgeLabel from './utilities/get-badge-label';

import * as _ from 'lodash';

const Badge: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace('badge', toModifier(props.modifiers, 'badge'))} ${_.toString(
      props.className
    )}`
  );

  return (
    <span className={classNames} style={props.style} unselectable="on">
      {getBadgeLabel(props.value)}
    </span>
  );
};

Badge.defaultProps = {
  value: 0
};

export default Badge;
