import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import { boolean, withKnobs } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCPreloader from './preloader';

import uniformStyles from '../../.storybook/storybook';

const preloaderActive = ['Active', true];

const stories = storiesOf('Preloader', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const active = boolean(...preloaderActive);

  return (
    <OCUniform tag="div" style={uniformStyles}>
      <OCPreloader active={active} />
    </OCUniform>
  );
});
