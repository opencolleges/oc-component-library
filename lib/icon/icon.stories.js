import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCIcon from './icon';

import uniformStyles from '../../.storybook/storybook';

const OCIconIcon = [
  'Icon',
  {
    'Arrow up': 'arrow-up',
    'Arrow right': 'arrow-right',
    'Arrow down': 'arrow-down',
    'Arrow left': 'arrow-left',
    Calendar: 'calendar',
    'Chevron up': 'chevron-up',
    'Chevron right': 'chevron-right',
    'Chevron down': 'chevron-down',
    'Chevron left': 'chevron-left',
    Clock: 'clock',
    Close: 'close',
    'Close ring': 'close-ring',
    Cloud: 'cloud',
    'Cloud download': 'cloud-download',
    'Cloud upload': 'cloud-upload',
    Draggable: 'draggable',
    Hamburger: 'hamburger',
    Minus: 'minus',
    'Minus ring': 'minus-ring',
    Plus: 'plus',
    'Plus ring': 'plus-ring',
    Search: 'search',
    Tick: 'tick',
    'Tick ring': 'tick-ring'
  },
  'arrow-right'
];
const OCIconSize = [
  'Size',
  24,
  {
    range: true,
    min: 24,
    max: 240,
    step: 8
  }
];
const OCIconActive = ['Active', true];

const stories = storiesOf('Icon', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const icon = select(...OCIconIcon);
  const size = number(...OCIconSize);
  const active = boolean(...OCIconActive);

  return (
    <OCUniform tag="div" style={uniformStyles}>
      <OCIcon
        modifiers={`icon--${icon}${active ? ' active' : ''}`}
        size={size}
      />
    </OCUniform>
  );
});
