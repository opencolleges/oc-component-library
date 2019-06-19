import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCButton from './button';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories
  .add('Default', () => {
    const href = text('Link', '');

    return (
      <OCUniform
        tag="div"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        {href ? (
          <OCButton
            href={href}
            action={text('Action', 'Submit')}
            modifiers={`${select(
              'Latinate',
              { Primary: 'button--primary', Secondary: 'button--secondary' },
              'button--primary'
            )} ${select(
              'State',
              {
                Default: '',
                Error: 'button--error',
                Success: 'button--success'
              },
              ''
            )}`}
            disabled={boolean('Disabled', false)}
          />
        ) : (
          <OCButton
            action={text('Action', 'Submit')}
            modifiers={`${select(
              'Latinate',
              { Primary: 'button--primary', Secondary: 'button--secondary' },
              'button--primary'
            )} ${select(
              'State',
              {
                Default: '',
                Error: 'button--error',
                Success: 'button--success'
              },
              ''
            )}`}
            disabled={boolean('Disabled', false)}
          />
        )}
      </OCUniform>
    );
  })
  .add('Compact', () => {
    const href = text('Link', '');

    return (
      <OCUniform
        tag="div"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        {href ? (
          <OCButton
            href={href}
            action={text('Action', 'Submit')}
            modifiers={`button--compact ${select(
              'Latinate',
              { Primary: 'button--primary', Secondary: 'button--secondary' },
              'button--primary'
            )} ${select(
              'State',
              {
                Default: '',
                Error: 'button--error',
                Success: 'button--success'
              },
              ''
            )}`}
            disabled={boolean('Disabled', false)}
          />
        ) : (
          <OCButton
            action={text('Action', 'Submit')}
            modifiers={`button--compact ${select(
              'Latinate',
              { Primary: 'button--primary', Secondary: 'button--secondary' },
              'button--primary'
            )} ${select(
              'State',
              {
                Default: '',
                Error: 'button--error',
                Success: 'button--success'
              },
              ''
            )}`}
            disabled={boolean('Disabled', false)}
          />
        )}
      </OCUniform>
    );
  });
