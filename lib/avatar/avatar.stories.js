import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import { withKnobs, select, text, number } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCAvatar from './avatar';

const stories = storiesOf('Avatar', module);

stories.addDecorator(withKnobs).addDecorator(withA11y);

stories
  .add('Default', () => {
    const image = text('Image', '');
    const firstName = text('First name', 'Angela');
    const sex = select(
      'Sex',
      {
        Female: 'female',
        Male: 'male',
        Undisclosed: 'undisclosed'
      },
      'female'
    );
    const state = select('State', {
      Default: null,
      Reversed: 'avatar--reversed'
    });

    return (
      <OCUniform
        tag="div"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '7.5rem',
          transform: 'translate(-50%, -50%)'
        }}>
        {state === 'avatar--reversed' ? (
          <OCAvatar
            modifiers="avatar--reversed"
            image={image ? image : null}
            firstName={firstName}
            sex={sex}
          />
        ) : (
          <OCAvatar
            image={image ? image : null}
            firstName={firstName}
            sex={sex}
          />
        )}
      </OCUniform>
    );
  })
  .add('Small', () => {
    const modifiers = 'avatar--s';
    const href = text('Link', 'https://www.example.com');
    const image = text('Image', '');
    const firstName = text('First name', 'Angela');
    const sex = select(
      'Sex',
      {
        Female: 'female',
        Male: 'male',
        Undisclosed: 'undisclosed'
      },
      'female'
    );
    const state = select('State', {
      Default: null,
      Reversed: 'avatar--reversed'
    });

    return (
      <OCUniform
        tag="div"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        {state === 'avatar--reversed' ? (
          href ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--reversed`}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          ) : (
            <OCAvatar modifiers={modifiers} firstName={firstName} sex={sex} />
          )
        ) : href ? (
          <OCAvatar
            modifiers={modifiers}
            href={href}
            image={image ? image : null}
            firstName={firstName}
            sex={sex}
          />
        ) : (
          <OCAvatar
            image={image ? image : null}
            modifiers={modifiers}
            firstName={firstName}
            sex={sex}
          />
        )}
      </OCUniform>
    );
  })
  .add('Medium', () => {
    const modifiers = 'avatar--m';
    const href = text('Link', 'https://www.example.com');
    const image = text('Image', '');
    const firstName = text('First name', 'Angela');
    const sex = select(
      'Sex',
      {
        Female: 'female',
        Male: 'male',
        Undisclosed: 'undisclosed'
      },
      'female'
    );
    const state = select('State', {
      Default: null,
      Error: 'avatar--error',
      Success: 'avatar--success',
      Reversed: 'avatar--reversed'
    });
    const value =
      state === 'avatar--error' || state === 'avatar--success'
        ? number('Number', 1)
        : 0;

    return (
      <OCUniform
        tag="div"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        {state === 'avatar--error' ? (
          href && value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--error`}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : href ? (
            <OCAvatar
              modifiers={modifiers}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          ) : value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--error`}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : (
            <OCAvatar
              modifiers={modifiers}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          )
        ) : state === 'avatar--success' ? (
          href && value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--success`}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : href ? (
            <OCAvatar
              modifiers={modifiers}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          ) : value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--success`}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : (
            <OCAvatar
              modifiers={modifiers}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          )
        ) : state === 'avatar--reversed' ? (
          href ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--reversed`}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          ) : (
            <OCAvatar
              modifiers={`${modifiers} avatar--reversed`}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          )
        ) : href ? (
          <OCAvatar
            modifiers={modifiers}
            href={href}
            image={image ? image : null}
            firstName={firstName}
            sex={sex}
          />
        ) : (
          <OCAvatar
            modifiers={modifiers}
            image={image ? image : null}
            firstName={firstName}
            sex={sex}
          />
        )}
      </OCUniform>
    );
  })
  .add('Large', () => {
    const modifiers = 'avatar--l';
    const href = text('Link', 'https://www.example.com');
    const image = text('Image', '');
    const firstName = text('First name', 'Angela');
    const sex = select(
      'Sex',
      {
        Female: 'female',
        Male: 'male',
        Undisclosed: 'undisclosed'
      },
      'female'
    );
    const state = select('State', {
      Default: null,
      Error: 'avatar--error',
      Success: 'avatar--success',
      Reversed: 'avatar--reversed'
    });
    const value =
      (state === 'avatar--error' || state === 'avatar--success') &&
      number('Number', 1);

    return (
      <OCUniform
        tag="div"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        {state === 'avatar--error' ? (
          href && value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--error`}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : href ? (
            <OCAvatar
              modifiers={modifiers}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          ) : value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--error`}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : (
            <OCAvatar
              modifiers={modifiers}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          )
        ) : state === 'avatar--success' ? (
          href && value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--success`}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : href ? (
            <OCAvatar
              modifiers={modifiers}
              href={href}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          ) : value ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--success`}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
              value={value}
            />
          ) : (
            <OCAvatar
              modifiers={modifiers}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          )
        ) : state === 'avatar--reversed' ? (
          href ? (
            <OCAvatar
              modifiers={`${modifiers} avatar--reversed`}
              image={image ? image : null}
              href={href}
              firstName={firstName}
              sex={sex}
            />
          ) : (
            <OCAvatar
              modifiers={`${modifiers} avatar--reversed`}
              image={image ? image : null}
              firstName={firstName}
              sex={sex}
            />
          )
        ) : href ? (
          <OCAvatar
            modifiers={modifiers}
            image={image ? image : null}
            href={href}
            firstName={firstName}
            sex={sex}
          />
        ) : (
          <OCAvatar
            modifiers={modifiers}
            image={image ? image : null}
            firstName={firstName}
            sex={sex}
          />
        )}
      </OCUniform>
    );
  });
