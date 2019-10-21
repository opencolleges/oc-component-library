import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Checkbox from './checkbox';

import UNIFORM_STYLES from '../../.storybook/storybook';

const checkboxChildren = ['Label', 'Yes, this assessment is my own work.'];
const checkboxAlignment = [
  'Alignment',
  { Default: '', Right: 'right' },
  '',
  { display: 'inline-radio' }
];
const checkboxState = [
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
const checkboxReadOnly = ['Read only', false];
const checkboxDisabled = ['Disabled', false];

const stories = storiesOf('Checkbox', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const children = text(...checkboxChildren);
  const alignment = options(...checkboxAlignment);
  const state = options(...checkboxState);
  const disabled = boolean(...checkboxDisabled);
  const readOnly = boolean(...checkboxReadOnly);

  return (
    <Uniform tag="div" style={UNIFORM_STYLES}>
      <Checkbox
        name="storybook-checkbox-component"
        value="storybook-checkbox-component"
        modifiers={`${alignment ? `checkbox--${alignment}` : ''}${
          state ? ` checkbox--${state}` : ''
        }`}
        disabled={disabled}
        readOnly={readOnly}>
        {children ? children : 'Add label'}
      </Checkbox>
    </Uniform>
  );
});
