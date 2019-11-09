import _ from 'lodash';
import React from 'react';
import Icon from '../icon';
import BEM from '../utilities/ts/bem';
import isUndefined from '../utilities/ts/is-undefined';

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  modifiers?: string;
  style?: React.CSSProperties;
  tabIndex?: boolean;
}

const Card: React.FC<Props> = (props: Props) => {
  const Tag = (isUndefined(props.href) ? `div` : `a`) as `div` | `a`;

  const bem = BEM(`card`);
  bem.addModifiers(props.modifiers);
  bem.addModifiers(props.href ? `clickable` : ``);
  bem.addClassNames(props.className);

  const classNames: string = bem.getResult();

  return (
    <Tag
      className={classNames}
      style={props.style}
      href={props.href}
      tabIndex={
        (_.includes(classNames, `clickable`) ||
          _.includes(classNames, `draggable`)) &&
        props.tabIndex
          ? 0
          : null
      }>
      {_.includes(classNames, `draggable`) && <Icon type="draggable" />}
      {props.children}
    </Tag>
  );
};

Card.defaultProps = {
  tabIndex: true
};

export { Card as default };
