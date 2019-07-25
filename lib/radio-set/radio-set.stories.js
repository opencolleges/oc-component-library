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
import RadioSet from './radio-set';

import uniformStyles from '../../.storybook/storybook';

const radioSetNumOfOptions = [
  'No of options',
  {
    '2': '2',
    '4': '4'
  },
  '2',
  { display: 'inline-radio' }
];
const radioSetTwoOptions = ['True', 'False'];
const radioSetFourOptions = ['Red', 'Green', 'Blue', 'Yellow'];
const radioSetState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const radioSetCards = ['Cards', true];
const radioErrorMessage = ['Error Message', 'Something is wrong'];
const radioSuccessMessage = ['Success Message', 'Something is right'];

const stories = storiesOf('Radio Set', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const numOfOptions = options(...radioSetNumOfOptions);

  const twoOptions = [];

  for (let i = 0; i < radioSetTwoOptions.length; i++) {
    const radioSetTwoOption = radioSetTwoOptions[i];

    twoOptions.push({
      label:
        Number(numOfOptions) === 2 &&
        text(`Label ${i + 1} of ${numOfOptions}`, radioSetTwoOption)
          ? text(`Label ${i + 1} of ${numOfOptions}`, radioSetTwoOption)
          : 'Add label',
      value: `${i + 1}`
    });
  }

  const fourOptions = [];

  for (let i = 0; i < radioSetFourOptions.length; i++) {
    const radioSetFourOption = radioSetFourOptions[i];

    fourOptions.push({
      label:
        Number(numOfOptions) === 4 &&
        text(`Label ${i + 1} of ${numOfOptions}`, radioSetFourOption)
          ? text(`Label ${i + 1} of ${numOfOptions}`, radioSetFourOption)
          : 'Add label',
      value: `${i + 1}`
    });
  }

  const state = options(...radioSetState);
  const cards = boolean(...radioSetCards);
  const errorMessage = state === 'error' && text(...radioErrorMessage);
  const successMessage = state === 'success' && text(...radioSuccessMessage);

  return (
    <Uniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
      {Number(numOfOptions) === 2 && state === 'error' ? (
        <RadioSet
          name="storybook-radio-set-component"
          radios={twoOptions}
          modifiers="radio-set--error"
          cards={cards}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : Number(numOfOptions) === 2 && state === 'success' ? (
        <RadioSet
          name="storybook-radio-set-component"
          radios={twoOptions}
          modifiers="radio-set--success"
          cards={cards}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : Number(numOfOptions) === 2 ? (
        <RadioSet
          name="storybook-radio-set-component"
          radios={twoOptions}
          cards={cards}
        />
      ) : Number(numOfOptions) === 4 && state === 'error' ? (
        <RadioSet
          name="storybook-radio-set-component"
          radios={fourOptions}
          modifiers="radio-set--error"
          cards={cards}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : Number(numOfOptions) === 4 && state === 'success' ? (
        <RadioSet
          name="storybook-radio-set-component"
          radios={fourOptions}
          modifiers="radio-set--success"
          cards={cards}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : (
        <RadioSet
          name="storybook-radio-set-component"
          radios={fourOptions}
          cards={cards}
        />
      )}
    </Uniform>
  );
});
