import React from 'react';

import { withA11y } from '@storybook/addon-a11y';
import {
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Uniform from '../uniform';
import Badge from './badge';

import UNIFORM_STYLES from '../../.storybook/storybook';

const BADGE_VALUE = ['Label', 1000];
const BADGE_STATE = [
  'State',
  { Default: '', Error: 'error', Success: 'success' },
  '',
  { display: 'inline-radio' }
];

const stories = storiesOf('Badge', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const value = text(...BADGE_VALUE);
  const state = options(...BADGE_STATE);

  return (
    <Uniform tag="div" style={UNIFORM_STYLES}>
      <Badge
        value={value ? value : 'Add label'}
        modifiers={state ? `badge--${state}` : null}
      />
    </Uniform>
  );
});
