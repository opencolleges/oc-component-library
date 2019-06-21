import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCButton from './button';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs).addDecorator(withA11y);

stories
  .add('Default', () => {
    const href = text('Link', '');
    const icon = select(
      'Icon',
      {
        None: null,
        'Arrow up': 'arrow-up',
        'Arrow right': 'arrow-right',
        'Arrow down': 'arrow-down',
        'Arrow left': 'arrow-left',
        Calendar: 'calendar',
        'Chevron up': 'chevron-up',
        'Chevron right': 'chevron-right',
        'Chevron down': 'chevron-down',
        'Chevron left': 'chevron-left',
        Clock: 'clock',
        Close: 'close',
        'Close ring': 'close-ring',
        Cloud: 'cloud',
        'Cloud download': 'cloud-download',
        'Cloud upload': 'cloud-upload',
        Draggable: 'draggable',
        Hamburger: 'hamburger',
        Minus: 'minus',
        'Minus ring': 'minus-ring',
        Plus: 'plus',
        'Plus ring': 'plus-ring',
        Search: 'search',
        Tick: 'tick',
        'Tick ring': 'tick-ring'
      },
      null
    );
    const action = text('Action', 'Submit');
    const latinate = select(
      'Latinate',
      { Primary: 'primary', Secondary: 'secondary' },
      'primary'
    );
    const state = select(
      'State',
      {
        Default: '',
        Error: 'error',
        Success: 'success',
        Reversed: 'reversed'
      },
      ''
    );
    const disabled = boolean('Disabled', false);

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
            icon={icon}
            action={action}
            modifiers={`button--${latinate} ${state ? `button--${state}` : ''}`}
            disabled={disabled}
          />
        ) : (
          <OCButton
            icon={icon}
            action={action}
            modifiers={`button--${latinate} ${state ? `button--${state}` : ''}`}
            disabled={disabled}
          />
        )}
      </OCUniform>
    );
  })
  .add('Compact', () => {
    const href = text('Link', '');
    const icon = select(
      'Icon',
      {
        None: null,
        'Arrow up': 'arrow-up',
        'Arrow right': 'arrow-right',
        'Arrow down': 'arrow-down',
        'Arrow left': 'arrow-left',
        Calendar: 'calendar',
        'Chevron up': 'chevron-up',
        'Chevron right': 'chevron-right',
        'Chevron down': 'chevron-down',
        'Chevron left': 'chevron-left',
        Clock: 'clock',
        Close: 'close',
        'Close ring': 'close-ring',
        Cloud: 'cloud',
        'Cloud download': 'cloud-download',
        'Cloud upload': 'cloud-upload',
        Draggable: 'draggable',
        Hamburger: 'hamburger',
        Minus: 'minus',
        'Minus ring': 'minus-ring',
        Plus: 'plus',
        'Plus ring': 'plus-ring',
        Search: 'search',
        Tick: 'tick',
        'Tick ring': 'tick-ring'
      },
      null
    );
    const action = text('Action', 'Submit');
    const latinate = select(
      'Latinate',
      { Primary: 'primary', Secondary: 'secondary' },
      'primary'
    );
    const state = select(
      'State',
      {
        Default: '',
        Error: 'error',
        Success: 'success',
        Reversed: 'reversed'
      },
      ''
    );
    const disabled = boolean('Disabled', false);

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
            icon={icon}
            action={action}
            modifiers={`button--compact button--${latinate} ${
              state ? `button--${state}` : ''
            }`}
            disabled={disabled}
          />
        ) : (
          <OCButton
            icon={icon}
            action={text('Action', 'Submit')}
            modifiers={`button--compact button--${latinate} ${
              state ? `button--${state}` : ''
            }`}
            disabled={disabled}
          />
        )}
      </OCUniform>
    );
  });
