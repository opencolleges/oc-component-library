import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs,
  boolean,
  text,
  optionsKnob as options
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Toggle from './toggle';

import uniformStyles from '../../.storybook/storybook';

const toggleChildren = ['Label', 'Hide my activity feed'];
const toggleAlignment = [
  'Alignment',
  { Default: '', Right: 'right' },
  '',
  { display: 'inline-radio' }
];
const toggleState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const toggleReadOnly = ['Read only', false];
const toggleDisabled = ['Disabled', false];

const stories = storiesOf('Toggle', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const children = text(...toggleChildren);
  const alignment = options(...toggleAlignment);
  const state = options(...toggleState);
  const disabled = boolean(...toggleDisabled);
  const readOnly = boolean(...toggleReadOnly);

  return (
    <Uniform tag="div" style={uniformStyles}>
      <Toggle
        name="storybook-toggle-component"
        value="storybook-toggle-component"
        modifiers={`${alignment ? `toggle--${alignment}` : ''}${
          state ? ` toggle--${state}` : ''
        }`}
        disabled={disabled}
        readOnly={readOnly}>
        {children ? children : 'Add label'}
      </Toggle>
    </Uniform>
  );
});
