import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, select } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCCard from './card';

const stories = storiesOf('Card', module);

stories.addDecorator(withKnobs);

stories
  .add('Default', () => (
    <OCUniform
      tag="div"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
      <OCCard
        style={{
          width: '12rem',
          height: '12rem'
        }}
        modifiers={`${select(
          'Size',
          {
            Default: '',
            Small: 'card--s',
            Medium: 'card--m',
            Large: 'card--l'
          },
          ''
        )} ${select(
          'Layer',
          {
            'Layer 1': 'card--layer-1',
            'Layer 2': 'card--layer-2',
            'Layer 3': 'card--layer-3',
            'Layer 4': 'card--layer-4'
          },
          'card--layer-1'
        )}`}
      />
    </OCUniform>
  ))
  .add('Clickable', () => (
    <OCUniform
      tag="div"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
      <OCCard
        style={{
          width: '12rem',
          height: '12rem'
        }}
        modifiers={`${select(
          'Size',
          {
            Default: '',
            Small: 'card--s',
            Medium: 'card--m',
            Large: 'card--l'
          },
          ''
        )} card--clickable`}
      />
    </OCUniform>
  ))
  .add('Draggable', () => (
    <OCUniform
      tag="div"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
      <OCCard
        style={{
          width: '12rem',
          height: '12rem'
        }}
        modifiers={`${select(
          'Size',
          {
            Default: '',
            Small: 'card--s',
            Medium: 'card--m',
            Large: 'card--l'
          },
          ''
        )} card--draggable`}
      />
    </OCUniform>
  ));
