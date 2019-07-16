import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCCard from './card';

import uniformStyles from '../../.storybook/storybook';

const cardStyles = {
  width: '12rem',
  height: '12rem'
};
const cardLink = ['Link', ''];
const cardLayer = [
  'Layer',
  {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4'
  },
  '1',
  { display: 'inline-radio' }
];
const cardState = [
  'State',
  {
    Default: '',
    Clickable: 'clickable',
    Draggable: 'draggable'
  },
  '',
  { display: 'inline-radio' }
];

const stories = storiesOf('Card', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add('Default', () => {
    const link = text(...cardLink);
    const state = link === '' && options(...cardState);
    const layer = link === '' && state === '' && options(...cardLayer);

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {link ? (
          <OCCard link={link} style={cardStyles}>
            {' '}
          </OCCard>
        ) : (
          <OCCard
            modifiers={`${state ? `card--${state} ` : ''}card--layer-${layer}`}
            style={cardStyles}>
            {' '}
          </OCCard>
        )}
      </OCUniform>
    );
  })
  .add('Small', () => {
    const link = text(...cardLink);
    const state = link === '' && options(...cardState);
    const layer = link === '' && state === '' && options(...cardLayer);

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {link ? (
          <OCCard link={link} modifiers="card--s" style={cardStyles}>
            {' '}
          </OCCard>
        ) : (
          <OCCard
            modifiers={`card--s ${
              state ? `card--${state} ` : ''
            }card--layer-${layer}`}
            style={cardStyles}>
            {' '}
          </OCCard>
        )}
      </OCUniform>
    );
  })
  .add('Medium', () => {
    const link = text(...cardLink);
    const state = link === '' && options(...cardState);
    const layer = link === '' && state === '' && options(...cardLayer);

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {link ? (
          <OCCard link={link} modifiers="card--m" style={cardStyles}>
            {' '}
          </OCCard>
        ) : (
          <OCCard
            modifiers={`card--m ${
              state ? `card--${state} ` : ''
            }card--layer-${layer}`}
            style={cardStyles}>
            {' '}
          </OCCard>
        )}
      </OCUniform>
    );
  })
  .add('Large', () => {
    const link = text(...cardLink);
    const state = link === '' && options(...cardState);
    const layer = link === '' && state === '' && options(...cardLayer);

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {link ? (
          <OCCard link={link} modifiers="card--l" style={cardStyles}>
            {' '}
          </OCCard>
        ) : (
          <OCCard
            modifiers={`card--l ${
              state ? `card--${state} ` : ''
            }card--layer-${layer}`}
            style={cardStyles}>
            {' '}
          </OCCard>
        )}
      </OCUniform>
    );
  });
