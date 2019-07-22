import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import { number, text, withKnobs } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCRange from './range';

import uniformStyles from '../../.storybook/storybook';

const rangeLabel = ['Label', 'Your mood today'];
const rangeValue = [
  'Value',
  21,
  {
    range: true,
    min: 0,
    max: 100,
    step: 1
  }
];

const stories = storiesOf('Range', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const label = text(...rangeLabel);
  const value = number(...rangeValue);

  return (
    <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
      <OCRange label={label ? label : 'Add label'} value={value} />
    </OCUniform>
  );
});
