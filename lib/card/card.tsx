import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import ICardProps from './card.types';

import Icon from '../icon';

const Card: React.FC<ICardProps> = props => {
  const Tag = (typeof props.href === 'undefined' ? 'div' : 'a') as 'div' | 'a';

  const classNames: string = _.trim(
    `${namespace(
      'card',
      props.modifiers,
      props.href ? 'card--clickable' : ''
    )} ${props.className}`
  );

  return (
    <Tag
      className={classNames}
      style={props.style}
      href={props.href}
      tabIndex={
        (_.includes('card--draggable', props.modifiers) ||
          _.includes('card--clickable', props.modifiers)) &&
        props.tabIndex
          ? 0
          : null
      }>
      {_.includes('card--draggable', props.modifiers) && (
        <Icon modifiers={`icon--draggable active`} />
      )}
      {props.children}
    </Tag>
  );
};

Card.defaultProps = {
  tabIndex: true
};

export default Card;
