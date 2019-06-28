import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  number,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCAvatar from './avatar';

import uniformStyles from '../../.storybook/storybook';

const avatarFirstName = ['First name', 'Angela'];
const avatarSex = [
  'Sex',
  {
    Female: 'female',
    Male: 'male',
    Undisclosed: 'undisclosed'
  },
  'female',
  { display: 'inline-radio' }
];
const avatarImage = ['Image', ''];
const avatarHref = ['Link', 'https://www.example.com'];
const avatarValue = ['Number', 1];

const stories = storiesOf('Avatar', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add('Default', () => {
    const firstName = text(...avatarFirstName);
    const sex = options(...avatarSex);
    const image = text(...avatarImage);
    const state = options(
      'State',
      {
        Default: '',
        Reversed: 'reversed'
      },
      '',
      { display: 'inline-radio' }
    );

    return (
      <OCUniform tag="div" style={{ ...uniformStyles, width: '8rem' }}>
        <OCAvatar
          modifiers={state ? `avatar--${state}` : null}
          image={image ? image : null}
          firstName={firstName ? firstName : 'Add first name'}
          sex={sex}
        />
      </OCUniform>
    );
  })
  .add('Small', () => {
    const firstName = text(...avatarFirstName);
    const sex = options(...avatarSex);
    const image = text(...avatarImage);
    const href = text(...avatarHref);
    const state = options(
      'State',
      {
        Default: '',
        Reversed: 'reversed'
      },
      '',
      { display: 'inline-radio' }
    );

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {href ? (
          <OCAvatar
            firstName={firstName ? firstName : 'Add first name'}
            sex={sex}
            image={image ? image : null}
            href={href ? href : null}
            modifiers={`avatar--s${state && ` avatar--${state}`}`}
          />
        ) : (
          <OCAvatar
            firstName={firstName ? firstName : 'Add first name'}
            sex={sex}
            modifiers={`avatar--s${state && ` avatar--${state}`}`}
          />
        )}
      </OCUniform>
    );
  })
  .add('Medium', () => {
    const firstName = text(...avatarFirstName);
    const sex = options(...avatarSex);
    const image = text(...avatarImage);
    const href = text(...avatarHref);
    const state = options(
      'State',
      {
        Default: '',
        Error: 'error',
        Success: 'success',
        Reversed: 'reversed'
      },
      '',
      { display: 'inline-radio' }
    );
    const value =
      state === 'error' || state === 'success' ? number(...avatarValue) : 0;

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {href ? (
          <OCAvatar
            firstName={firstName ? firstName : 'Add first name'}
            sex={sex}
            image={image ? image : null}
            href={href}
            modifiers={`avatar--m${state && ` avatar--${state}`}`}
            value={value ? value : 'Add label'}
          />
        ) : (
          <OCAvatar
            firstName={firstName ? firstName : 'Add first name'}
            sex={sex}
            image={image ? image : null}
            modifiers={`avatar--m${state && ` avatar--${state}`}`}
            value={value ? value : 'Add label'}
          />
        )}
      </OCUniform>
    );
  })
  .add('Large', () => {
    const firstName = text(...avatarFirstName);
    const sex = options(...avatarSex);
    const image = text(...avatarImage);
    const href = text(...avatarHref);
    const state = options(
      'State',
      {
        Default: '',
        Error: 'error',
        Success: 'success',
        Reversed: 'reversed'
      },
      '',
      { display: 'inline-radio' }
    );
    const value =
      state === 'error' || state === 'success' ? number(...avatarValue) : 0;

    return (
      <OCUniform tag="div" style={uniformStyles}>
        {href ? (
          <OCAvatar
            firstName={firstName ? firstName : 'Add first name'}
            sex={sex}
            image={image ? image : null}
            href={href}
            modifiers={`avatar--l${state && ` avatar--${state}`}`}
            value={value ? value : 'Add label'}
          />
        ) : (
          <OCAvatar
            firstName={firstName ? firstName : 'Add first name'}
            sex={sex}
            image={image ? image : null}
            modifiers={`avatar--l${state && ` avatar--${state}`}`}
            value={value ? value : 'Add label'}
          />
        )}
      </OCUniform>
    );
  });
