import * as React from 'react';

import { Props } from './card.interface';

import Icon from '../icon';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const Card: React.FC<Props> = props => {
  const Tag = (typeof props.href === 'undefined' ? 'div' : 'a') as 'div' | 'a';

  const classNames: string = _.trim(
    `${namespace(
      'card',
      toModifier(props.modifiers, 'card'),
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
