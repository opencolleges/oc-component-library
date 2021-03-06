import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs,
  boolean,
  text,
  optionsKnob as options
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCRadio from './radio';

import uniformStyles from '../../.storybook/storybook';

const radioChildren = ['Label', 'I am working full-time'];
const radioAlignment = [
  'Alignment',
  { Default: '', Right: 'right' },
  '',
  { display: 'inline-radio' }
];
const radioState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success',
    Reversed: 'reversed'
  },
  '',
  { display: 'inline-radio' }
];
const radioReadOnly = ['Read only', false];
const radioDisabled = ['Disabled', false];

const stories = storiesOf('Radio', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const children = text(...radioChildren);
  const alignment = options(...radioAlignment);
  const state = options(...radioState);
  const disabled = boolean(...radioDisabled);
  const readOnly = boolean(...radioReadOnly);

  return (
    <OCUniform tag="div" style={uniformStyles}>
      <OCRadio
        name="storybook-radio-component"
        value="storybook-radio-component"
        modifiers={`${alignment ? `radio--${alignment}` : ''}${
          state ? ` radio--${state}` : ''
        }`}
        disabled={disabled}
        readOnly={readOnly}>
        {children ? children : 'Add label'}
      </OCRadio>
    </OCUniform>
  );
});
