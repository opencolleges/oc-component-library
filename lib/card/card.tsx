import _ from 'lodash';
import React from 'react';
import Icon from '../icon';
import BEM, { BEMInterface } from '../utilities/ts/bem';
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

  const BEM_MODULE: BEMInterface = BEM(`card`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addModifiers(props.href ? `clickable` : ``);
  addClassNames(props.className);

  return (
    <Tag
      className={getResult()}
      style={props.style}
      href={props.href}
      tabIndex={
        (_.includes(getResult(), `clickable`) ||
          _.includes(getResult(), `draggable`)) &&
        props.tabIndex
          ? 0
          : null
      }>
      {_.includes(getResult(), `draggable`) && <Icon type="draggable" />}
      {props.children}
    </Tag>
  );
};

Card.defaultProps = {
  tabIndex: true
};

export { Card as default };
