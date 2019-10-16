import * as React from 'react';

import BEM from '../utilities/ts/bem';

type TTag = 'div' | 'section';

interface Props {
  children: React.ReactNode;
  className?: string;
  maxWidth?: boolean;
  modifiers?: string;
  style?: React.CSSProperties;
  tag?: TTag;
}

const Grid: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = props.tag;

  const bem = BEM('grid');
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <Tag
      className={bem.getResult()}
      style={
        props.maxWidth ? props.style : { maxWidth: '100%', ...props.style }
      }>
      {props.children}
    </Tag>
  );
};

Grid.defaultProps = {
  maxWidth: true,
  tag: 'div'
};

export default Grid;
