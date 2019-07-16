import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCBadge from './badge';

import uniformStyles from '../../.storybook/storybook';

const badgeValue = ['Label', 1000];
const badgeState = [
  'State',
  { Default: '', Error: 'error', Success: 'success' },
  '',
  { display: 'inline-radio' }
];

const stories = storiesOf('Badge', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const value = text(...badgeValue);
  const state = options(...badgeState);

  return (
    <OCUniform tag="div" style={uniformStyles}>
      <OCBadge
        value={value ? value : 'Add label'}
        modifiers={state ? `badge--${state}` : null}
      />
    </OCUniform>
  );
});
