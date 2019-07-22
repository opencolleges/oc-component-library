import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  number,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCTextarea from './textarea';

import uniformStyles from '../../.storybook/storybook';

const textareaLabel = ['Label', 'Join the conversation'];
const textareaPlaceholder = ['Placeholder', 'What is on your mind?'];
const textareaMaxLength = ['Max length', 1000];
const textareaState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const textareaDisabled = ['Disabled', false];
const textareaReadOnly = ['Read only', false];
// const textareaRequired = ['Required', true];
const textareaErrorMessage = ['Error Message', 'Something is wrong'];
const textareaSuccessMessage = ['Success Message', 'Something is right'];

const stories = storiesOf('Textarea', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const label = text(...textareaLabel);
  const placeholder = text(...textareaPlaceholder);
  const maxLength = number(...textareaMaxLength);
  const state = options(...textareaState);
  const disabled = boolean(...textareaDisabled);
  const readOnly = boolean(...textareaReadOnly);
  // const required = boolean(...textareaRequired);
  const errorMessage = state === 'error' && text(...textareaErrorMessage);
  const successMessage = state === 'success' && text(...textareaSuccessMessage);

  return (
    <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
      {state === 'error' ? (
        <OCTextarea
          name="storybook-text-component"
          label={label ? label : 'Add label'}
          placeholder={placeholder}
          modifiers="textarea--error"
          disabled={disabled}
          readOnly={readOnly}
          // required={required}
          message={errorMessage ? errorMessage : 'Add message'}
          maxLength={maxLength}
        />
      ) : state === 'success' ? (
        <OCTextarea
          name="storybook-text-component"
          label={label ? label : 'Add label'}
          placeholder={placeholder}
          modifiers="textarea--success"
          disabled={disabled}
          readOnly={readOnly}
          // required={required}
          message={successMessage ? successMessage : 'Add message'}
          maxLength={maxLength}
        />
      ) : (
        <OCTextarea
          name="storybook-text-component"
          label={label ? label : 'Add label'}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          // required={required}
          maxLength={maxLength}
        />
      )}
    </OCUniform>
  );
});
