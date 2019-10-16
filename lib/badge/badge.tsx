import React from 'react';

import BEM from '../utilities/ts/bem';
import getBadgeLabel from './utilities/get-badge-label';

interface Props {
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: string | number;
}

const Badge: React.FC<Props> = props => {
  const bem = BEM('badge');
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <span className={bem.getResult()} style={props.style} unselectable="on">
      {getBadgeLabel(props.value)}
    </span>
  );
};

Badge.defaultProps = {
  value: 0
};

export default Badge;
