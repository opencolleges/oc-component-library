import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCDivider from './divider';

import uniformStyles from '../../.storybook/storybook';

const dividerState = [
  'State',
  {
    Default: '',
    Alt: 'alt'
  },
  '',
  { display: 'inline-radio' }
];

const stories = storiesOf('Divider', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add('Small', () => {
    const state = options(...dividerState);

    return (
      <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
        <OCDivider
          modifiers={`divider--s${state ? ` divider--${state}` : ''}`}
        />
      </OCUniform>
    );
  })
  .add('Medium', () => {
    const state = options(...dividerState);

    return (
      <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
        <OCDivider
          modifiers={`divider--m${state ? ` divider--${state}` : ''}`}
        />
      </OCUniform>
    );
  })
  .add('Large', () => {
    const state = options(...dividerState);

    return (
      <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
        <OCDivider
          modifiers={`divider--l${state ? ` divider--${state}` : ''}`}
        />
      </OCUniform>
    );
  });
