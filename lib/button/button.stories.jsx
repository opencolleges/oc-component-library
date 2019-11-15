import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  optionsKnob as options,
  select,
  text,
  boolean,
  withKnobs
} from '@storybook/addon-knobs';
import React from 'react';
import Button from './button';
import Uniform from '../uniform';
import UNIFORM_STYLES from '../../.storybook/storybook';

const buttonStyles = {
  width: `auto`
};
const buttonHref = [`Link`, ``];
const buttonIcon = [
  `Icon`,
  {
    None: ``,
    'Arrow up': `arrow-up`,
    'Arrow right': `arrow-right`,
    'Arrow down': `arrow-down`,
    'Arrow left': `arrow-left`,
    Calendar: `calendar`,
    'Chevron up': `chevron-up`,
    'Chevron right': `chevron-right`,
    'Chevron down': `chevron-down`,
    'Chevron left': `chevron-left`,
    Clock: `clock`,
    Close: `close`,
    'Close ring': `close-ring`,
    Cloud: `cloud`,
    'Cloud download': `cloud-download`,
    'Cloud upload': `cloud-upload`,
    Draggable: `draggable`,
    Hamburger: `hamburger`,
    Minus: `minus`,
    'Minus ring': `minus-ring`,
    Plus: `plus`,
    'Plus ring': `plus-ring`,
    Search: `search`,
    Tick: `tick`,
    'Tick ring': `tick-ring`,
    Print: `print`
  },
  ``
];
const buttonAction = [`Label`, `Submit`];
const buttonType = [
  `Type`,
  { Submit: `submit`, Reset: `reset`, Button: `button` },
  `submit`,
  { display: `inline-radio` }
];
const buttonLatinate = [
  `Latinate`,
  { Primary: `primary`, Secondary: `secondary` },
  `primary`,
  { display: `inline-radio` }
];
const buttonState = [
  `State`,
  {
    Default: ``,
    Error: `error`,
    Success: `success`,
    Reversed: `reversed`
  },
  ``,
  { display: `inline-radio` }
];
const buttonDisabled = [`Disabled`, false];

const stories = storiesOf(`Button`, module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add(`Default`, () => {
    const href = text(...buttonHref);
    const icon = select(...buttonIcon);
    const action = text(...buttonAction);
    const type = href === `` && options(...buttonType);
    const latinate = options(...buttonLatinate);
    const state = options(...buttonState);
    const disabled = boolean(...buttonDisabled);

    return (
      <Uniform tag="div" style={UNIFORM_STYLES}>
        {href ? (
          <Button
            name="storybook-button-component"
            href={href}
            icon={icon}
            action={action ? action : `Add label`}
            modifiers={`button--${latinate}${state ? ` button--${state}` : ``}`}
            style={buttonStyles}
            disabled={disabled}
          />
        ) : (
          <Button
            name="storybook-button-component"
            icon={icon}
            action={action ? action : `Add label`}
            type={type}
            modifiers={`button--${latinate}${state ? ` button--${state}` : ``}`}
            style={buttonStyles}
            disabled={disabled}
          />
        )}
      </Uniform>
    );
  })
  .add(`Compact`, () => {
    const href = text(...buttonHref);
    const icon = select(...buttonIcon);
    const action = text(...buttonAction);
    const type = href === `` && options(...buttonType);
    const latinate = options(...buttonLatinate);
    const state = options(...buttonState);
    const disabled = boolean(...buttonDisabled);

    return (
      <Uniform tag="div" style={UNIFORM_STYLES}>
        {href ? (
          <Button
            name="storybook-button-component"
            href={href}
            icon={icon}
            action={action ? action : `Add label`}
            modifiers={`button--compact button--${latinate}${
              state ? ` button--${state}` : ``
            }`}
            style={buttonStyles}
            disabled={disabled}
          />
        ) : (
          <Button
            name="storybook-button-component"
            icon={icon}
            action={action ? action : `Add label`}
            type={type}
            modifiers={`button--compact button--${latinate}${
              state ? ` button--${state}` : ``
            }`}
            style={buttonStyles}
            disabled={disabled}
          />
        )}
      </Uniform>
    );
  });
