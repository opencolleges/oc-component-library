import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';
import React from 'react';
import Select from './select';
import Uniform from '../uniform';
import UNIFORM_STYLES from '../../.storybook/storybook';

const selectLabel = [`Label`, `Color`];
const selectOptions = [`Red`, `Green`, `Blue`, `Yellow`];
const selectState = [
  `State`,
  {
    Default: ``,
    Error: `error`,
    Success: `success`
  },
  ``,
  { display: `inline-radio` }
];
const selectDisabled = [`Disabled`, false];
const selectReadOnly = [`Read only`, false];
const selectRequired = [`Required`, false];
const selectErrorMessage = [`Error Message`, `Something is wrong`];
const selectSuccessMessage = [`Success Message`, `Something is right`];

const stories = storiesOf(`Select`, module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add(`Default`, () => {
  const label = text(...selectLabel);

  const Options = [];

  for (let i = 0; i < selectOptions.length; i++) {
    const selectOption = selectOptions[i];

    Options.push({
      label: text(`Option ${i + 1} of 4`, selectOption)
        ? text(`Option ${i + 1} of 4`, selectOption)
        : `Add label`,
      value: `${i + 1}`
    });
  }

  const state = options(...selectState);
  const disabled = boolean(...selectDisabled);
  const readOnly = boolean(...selectReadOnly);
  const required = boolean(...selectRequired);
  const errorMessage = state === `error` && text(...selectErrorMessage);
  const successMessage = state === `success` && text(...selectSuccessMessage);

  return (
    <Uniform style={{ ...UNIFORM_STYLES, width: `50%` }}>
      {state === `error` ? (
        <Select
          name="storybook-select-component"
          label={label ? label : `Add label`}
          options={Options}
          modifiers={state ? ` select--${state}` : ``}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          message={errorMessage ? errorMessage : `Add message`}
        />
      ) : state === `success` ? (
        <Select
          name="storybook-select-component"
          label={label ? label : `Add label`}
          options={Options}
          modifiers={state ? ` select--${state}` : ``}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          message={successMessage ? successMessage : `Add message`}
        />
      ) : (
        <Select
          name="storybook-select-component"
          label={label ? label : `Add label`}
          options={Options}
          modifiers={state ? ` select--${state}` : ``}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      )}
    </Uniform>
  );
});
