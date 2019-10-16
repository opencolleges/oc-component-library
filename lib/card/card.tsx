import * as _ from 'lodash';
import * as React from 'react';

import Icon from '../icon';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  modifiers?: string;
  style?: React.CSSProperties;
  tabIndex?: boolean;
}

const Card: React.FC<Props> = props => {
  const Tag = (typeof props.href === 'undefined' ? 'div' : 'a') as 'div' | 'a';

  const bem = BEM('card');
  bem.addModifiers(props.modifiers);
  bem.addModifiers(props.href ? 'clickable' : '');
  bem.addClassNames(props.className);

  const classNames: string = bem.getResult();

  return (
    <Tag
      className={classNames}
      style={props.style}
      href={props.href}
      tabIndex={
        (_.includes(classNames, 'clickable') ||
          _.includes(classNames, 'draggable')) &&
        props.tabIndex
          ? 0
          : null
      }>
      {_.includes(classNames, 'draggable') && <Icon type="draggable" />}
      {props.children}
    </Tag>
  );
};

Card.defaultProps = {
  tabIndex: true
};

export default Card;
