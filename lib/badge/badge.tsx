import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import IBadgeProps from './badge.types';
import getBadgeLabel from './utilities/getBadgeLabel';

const Badge: React.FC<IBadgeProps> = props => {
  const classNames: string = _.trim(
    `${namespace('badge', props.modifiers)} ${_.toString(props.className)}`
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
