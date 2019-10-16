import _ from 'lodash';
import React from 'react';

import Card from '../card';
import Grid from '../grid';
import GridItem from '../grid-item';
import Radio from '../radio';

import BEM from '../utilities/ts/bem';

interface Radios {
  className?: string;
  id?: string;
  label: string;
  style?: React.CSSProperties;
  value: string;
}

interface Props {
  cards?: boolean;
  className?: string;
  disabled?: boolean;
  message?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  radios: Radios[];
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

interface State {
  error: boolean;
  success: boolean;
  value: string;
}

interface ConditionalCardProps {
  children: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  visible?: boolean;
}

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

    const error: string = state.error ? 'error' : '';
    const success: string = state.success ? 'success' : '';

    const bem = BEM('radio-set');
    bem.addModifiers(error);
    bem.addModifiers(success);
    bem.addClassNames(props.className);

    const modifiers: string = `${error}${success}`;

    return (
      <fieldset className={bem.getResult()} style={props.style}>
        <Grid modifiers="gutter-x-fixed">
          {props.radios.map((radio, index) => (
            <GridItem key={index} modifiers="s-12 m-6 align-end">
              <ConditionalCard
                disabled={props.disabled}
                readOnly={props.readOnly}
                visible={props.cards}>
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
        <div className={bem.getElement('border')} />
        {(state.error || state.success) && props.message && (
          <span className={bem.getElement('message')}>{props.message}</span>
        )}
      </fieldset>
    );
  }
}

const ConditionalCard: React.FC<ConditionalCardProps> = props => {
  return (
    <React.Fragment>
      {props.visible ? (
        <Card
          modifiers={`s ${
            props.disabled || props.readOnly ? 'layer-1' : 'clickable'
          }`}
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
  disabled: false,
  readOnly: false,
  visible: true
};
