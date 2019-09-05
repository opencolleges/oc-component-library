import * as React from 'react';

import { IProps } from './card.interface';

import Icon from '../icon';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const Card: React.FC<IProps> = props => {
  const Tag = (typeof props.href === 'undefined' ? 'div' : 'a') as 'div' | 'a';

  const classNames: string = _.trim(
    `${namespace(
      'card',
      props.modifiers,
      props.href ? 'card--clickable' : ''
    )} ${_.toString(props.className)}`
  );

  return (
    <Tag
      className={classNames}
      style={props.style}
      href={props.href}
      tabIndex={
        (_.includes(classNames, 'card--clickable') ||
          _.includes(classNames, 'card--draggable')) &&
        props.tabIndex
          ? 0
          : null
      }>
      {_.includes(classNames, 'card--draggable') && (
        <Icon modifiers="icon--draggable active" />
      )}
      {props.children}
    </Tag>
  );
};

Card.defaultProps = {
  tabIndex: true
};

export default Card;