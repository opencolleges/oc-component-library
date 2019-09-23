import * as React from 'react';

import { Props, State } from './radio-set.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import Card from '../card';
import Grid from '../grid';
import GridItem from '../grid-item';
import Radio from '../radio';

import * as _ from 'lodash';

export default class RadioSet extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    cards: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  readonly state: Readonly<State> = {
    error: _.includes(this.props.modifiers, 'error'),
    success: _.includes(this.props.modifiers, 'success'),
    value: _.some(this.props.radios, ['value', this.props.value])
      ? this.props.value
      : ''
  };

  componentDidUpdate(prevProps): void {
    if (prevProps.modifiers !== this.props.modifiers) {
      this.setState({
        error: _.includes(this.props.modifiers, 'error'),
        success: _.includes(this.props.modifiers, 'success')
      });
    }
  }

  handleChange = (value): void => {
    this.setState({
      error: false,
      success: false,
      value
    });
    this.props.onChange(value, this.props.name);
  };

  render() {
    const { props, state, handleChange } = this;
    const classNames: string = _.trim(
      `${namespace(
        'radio-set',
        state.error ? toModifier('error', 'radio-set') : '',
        state.success ? toModifier('success', 'radio-set') : ''
      )} ${_.toString(props.className)}`
    );
    const modifiers: string = state.error
      ? 'error'
      : state.success
      ? 'success'
      : '';

    return (
      <fieldset className={classNames} style={props.style}>
        <Grid modifiers="grid--gutter-x-fixed">
          {props.radios.map((radio, index) => (
            <GridItem
              key={index}
              modifiers="grid__item--s-12 grid__item--m-6 grid__item--align-end">
              <ConditionalCard visible={props.cards}>
                <Radio
                  id={radio.id}
                  modifiers={state.value === radio.value ? modifiers : null}
                  className={radio.className}
                  style={radio.style}
                  name={props.name}
                  value={radio.value}
                  disabled={props.disabled}
                  readOnly={props.readOnly}
                  required={props.required && index === 0}
                  checked={state.value === radio.value}
                  onChange={handleChange}>
                  {radio.label}
                </Radio>
              </ConditionalCard>
            </GridItem>
          ))}
        </Grid>
        <div className={namespace('radio-set__border')} />
        {(state.error || state.success) && props.message && (
          <span className={namespace('radio-set__message')}>
            {props.message}
          </span>
        )}
      </fieldset>
    );
  }
}

interface ConditionalCardProps {
  children: React.ReactNode;
  visible?: boolean;
}

const ConditionalCard: React.FC<ConditionalCardProps> = props => {
  return (
    <React.Fragment>
      {props.visible ? (
        <Card
          modifiers="card--s card--layer-1 card--clickable"
          tabIndex={false}>
          {props.children}
        </Card>
      ) : (
        props.children
      )}
    </React.Fragment>
  );
};

ConditionalCard.defaultProps = {
  visible: true
};
