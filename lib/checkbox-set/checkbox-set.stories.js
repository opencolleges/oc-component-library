import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCCheckboxSet from './checkbox-set';

import uniformStyles from '../../.storybook/storybook';

const checkboxSetNumOfOptions = [
  'No of options',
  {
    '2': '2',
    '4': '4'
  },
  '2',
  { display: 'inline-radio' }
];
const checkboxSetTwoOptions = ['True', 'False'];
const checkboxSetFourOptions = ['Red', 'Green', 'Blue', 'Yellow'];
const checkboxSetState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const checkboxSetCards = ['Cards', true];
const checkboxErrorMessage = ['Error Message', 'Something is wrong'];
const checkboxSuccessMessage = ['Success Message', 'Something is right'];

const stories = storiesOf('Checkbox Set', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const numOfOptions = options(...checkboxSetNumOfOptions);

  const twoOptions = [];

  for (let i = 0; i < checkboxSetTwoOptions.length; i++) {
    const checkboxSetTwoOption = checkboxSetTwoOptions[i];

    twoOptions.push({
      label:
        Number(numOfOptions) === 2 &&
        text(`Label ${i + 1} of ${numOfOptions}`, checkboxSetTwoOption)
          ? text(`Label ${i + 1} of ${numOfOptions}`, checkboxSetTwoOption)
          : 'Add label',
      value: `${i + 1}`
    });
  }

  const fourOptions = [];

  for (let i = 0; i < checkboxSetFourOptions.length; i++) {
    const checkboxSetFourOption = checkboxSetFourOptions[i];

    fourOptions.push({
      label:
        Number(numOfOptions) === 4 &&
        text(`Label ${i + 1} of ${numOfOptions}`, checkboxSetFourOption)
          ? text(`Label ${i + 1} of ${numOfOptions}`, checkboxSetFourOption)
          : 'Add label',
      value: `${i + 1}`
    });
  }

  const state = options(...checkboxSetState);
  const cards = boolean(...checkboxSetCards);
  const errorMessage = state === 'error' && text(...checkboxErrorMessage);
  const successMessage = state === 'success' && text(...checkboxSuccessMessage);

  return (
    <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
      {Number(numOfOptions) === 2 && state === 'error' ? (
        <OCCheckboxSet
          name="storybook-checkbox-set-component"
          checkboxes={twoOptions}
          error={[twoOptions[0].value, twoOptions[1].value]}
          modifiers="checkbox-set--error"
          cards={cards}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : Number(numOfOptions) === 2 && state === 'success' ? (
        <OCCheckboxSet
          name="storybook-checkbox-set-component"
          checkboxes={twoOptions}
          success={[twoOptions[0].value, twoOptions[1].value]}
          modifiers="checkbox-set--success"
          cards={cards}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : Number(numOfOptions) === 2 ? (
        <OCCheckboxSet
          name="storybook-checkbox-set-component"
          checkboxes={twoOptions}
          cards={cards}
        />
      ) : Number(numOfOptions) === 4 && state === 'error' ? (
        <OCCheckboxSet
          name="storybook-checkbox-set-component"
          checkboxes={fourOptions}
          error={[
            fourOptions[0].value,
            fourOptions[1].value,
            fourOptions[2].value,
            fourOptions[3].value
          ]}
          modifiers="checkbox-set--error"
          cards={cards}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : Number(numOfOptions) === 4 && state === 'success' ? (
        <OCCheckboxSet
          name="storybook-checkbox-set-component"
          checkboxes={fourOptions}
          success={[
            fourOptions[0].value,
            fourOptions[1].value,
            fourOptions[2].value,
            fourOptions[3].value
          ]}
          modifiers="checkbox-set--success"
          cards={cards}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : (
        <OCCheckboxSet
          name="storybook-checkbox-set-component"
          checkboxes={fourOptions}
          cards={cards}
        />
      )}
    </OCUniform>
  );
});
