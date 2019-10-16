import * as React from 'react';

import BEM from '../utilities/ts/bem';

interface Props {
  className?: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<Props> = props => {
  const bem = BEM('divider');
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <div className={bem.getResult()} style={props.style} aria-hidden="true" />
  );
};

Divider.defaultProps = {
  modifiers: 's'
};

export default Divider;
