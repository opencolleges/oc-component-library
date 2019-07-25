import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { optionsKnob as options, withKnobs } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCLikert from './likert';

import uniformStyles from '../../.storybook/storybook';

const likertNumOfOptions = [
  'No of options',
  {
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    '11': '11'
  },
  '11',
  { display: 'inline-radio' }
];

const likert3Options = [
  { label: 'Strongly disagree' },
  { label: 'Neutral' },
  { label: 'Strongly agree' }
];
const likert4Options = [
  { label: 'Strongly disagree' },
  { label: 'Disagree' },
  { label: 'Agree' },
  { label: 'Strongly agree' }
];
const likert5Options = [
  { label: 'Strongly disagree' },
  { label: 'Disagree' },
  { label: 'Neutral' },
  { label: 'Agree' },
  { label: 'Strongly agree' }
];
const likert6Options = [
  { label: 'Strongly disagree' },
  {},
  {},
  {},
  {},
  { label: 'Strongly agree' }
];
const likert7Options = [
  { label: 'Strongly disagree' },
  {},
  {},
  { label: 'Neutral' },
  {},
  {},
  { label: 'Strongly agree' }
];
const likert8Options = [
  { label: 'Strongly disagree' },
  {},
  {},
  {},
  {},
  {},
  {},
  { label: 'Strongly agree' }
];
const likert9Options = [
  { label: 'Strongly disagree' },
  {},
  {},
  {},
  { label: 'Neutral' },
  {},
  {},
  {},
  { label: 'Strongly agree' }
];
const likert10Options = [
  { label: 'Strongly disagree' },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  { label: 'Strongly agree' }
];
const likert11Options = [
  { label: 'Strongly disagree' },
  {},
  {},
  {},
  {},
  { label: 'Neutral' },
  {},
  {},
  {},
  {},
  { label: 'Strongly agree' }
];

const stories = storiesOf('Likert', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add('Default', () => {
    const numOfOptions = options(...likertNumOfOptions);
    const threeOptions = likert3Options;
    const fourOptions = likert4Options;
    const fiveOptions = likert5Options;
    const sixOptions = likert6Options;
    const sevenOptions = likert7Options;
    const eightOptions = likert8Options;
    const nineOptions = likert9Options;
    const tenOptions = likert10Options;
    const elevenOptions = likert11Options;

    return (
      <OCUniform style={{ ...uniformStyles, width: '75%' }}>
        {numOfOptions === '3' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={threeOptions}
          />
        ) : numOfOptions === '4' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={fourOptions}
          />
        ) : numOfOptions === '5' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={fiveOptions}
          />
        ) : numOfOptions === '6' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={sixOptions}
          />
        ) : numOfOptions === '7' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={sevenOptions}
          />
        ) : numOfOptions === '8' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={eightOptions}
          />
        ) : numOfOptions === '9' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={nineOptions}
          />
        ) : numOfOptions === '10' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={tenOptions}
          />
        ) : (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={elevenOptions}
          />
        )}
      </OCUniform>
    );
  })
  .add('Compact', () => {
    const numOfOptions = options(...likertNumOfOptions);
    const threeOptions = likert3Options;
    const fourOptions = likert4Options;
    const fiveOptions = likert5Options;
    const sixOptions = likert6Options;
    const sevenOptions = likert7Options;
    const eightOptions = likert8Options;
    const nineOptions = likert9Options;
    const tenOptions = likert10Options;
    const elevenOptions = likert11Options;

    return (
      <OCUniform style={{ ...uniformStyles, width: '75%' }}>
        {numOfOptions === '3' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={threeOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '4' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={fourOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '5' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={fiveOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '6' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={sixOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '7' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={sevenOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '8' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={eightOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '9' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={nineOptions}
            modifiers="likert--compact"
          />
        ) : numOfOptions === '10' ? (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={tenOptions}
            modifiers="likert--compact"
          />
        ) : (
          <OCLikert
            key={numOfOptions}
            name="storybook-likert-component"
            options={elevenOptions}
            modifiers="likert--compact"
          />
        )}
      </OCUniform>
    );
  });
