import * as React from 'react';

import { IProps } from './badge.interface';

import namespace from '../utilities/js/namespace';
import getBadgeLabel from './utilities/get-badge-label';

import * as _ from 'lodash';

const Badge: React.FC<IProps> = props => {
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
