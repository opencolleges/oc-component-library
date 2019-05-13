// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';
import randomise from '../utils/randomise';
import toTitleCase from '../utils/toTitleCase';

// * child imports
import OCGrid from '../grid';
import OCGridItem from '../grid-item';
import OCCard from '../card';
import OCRadio from '../radio';

// * React component
export default class OCRadioSet extends React.Component {
  constructor(props) {
    super(props);

    const radiosArray = [];

    props.radios.map(radio => {
      radiosArray.push(radio.value);
    });

    this.state = {
      selection:
        radiosArray.indexOf(this.props.defaultSelection) !== -1
          ? this.props.defaultSelection
          : '',
      error: find('radio-set--error', this.props.modifiers),
      success: find('radio-set--success', this.props.modifiers),
      disabled: this.props.disabled
    };

    this.responses = {
      error: ['Uh-oh', 'Whoops'],
      success: ['Awesome', 'Great']
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  handleChange = selection => {
    this.setState({
      selection: selection,
      error: false,
      success: false
    });
  };

  render() {
    const { props, state, handleChange, responses } = this;

    let hooks = '';

    state.error && (hooks += 'radio-set--error ');
    state.success && (hooks += 'radio-set--success');

    return (
      <fieldset className={prefix(`radio-set ${hooks}`)}>
        <OCGrid modifiers="grid--gutter-fixed">
          {props.radios.map((radio, index) => (
            <OCGridItem
              key={index}
              modifiers="grid__item--s-12 grid__item--m-6 grid__item--align-end">
              {props.cards ? (
                <OCCard modifiers="card--s card--layer-1 card--clickable">
                  <OCRadio
                    modifiers={
                      state.selection === radio.value
                        ? state.error
                          ? 'radio--error'
                          : state.success
                          ? 'radio--success'
                          : null
                        : null
                    }
                    id={radio.id}
                    name={props.name}
                    value={radio.value}
                    disabled={state.disabled}
                    readOnly={props.readOnly}
                    required={props.required && index === 0}
                    defaultChecked={
                      state.selection === radio.value ||
                      (props.required && index === 0)
                    }
                    onChange={handleChange}>
                    {radio.label}
                  </OCRadio>
                </OCCard>
              ) : (
                <OCRadio
                  modifiers={
                    state.selection === radio.value
                      ? state.error
                        ? 'radio--error'
                        : state.success
                        ? 'radio--success'
                        : null
                      : null
                  }
                  id={radio.id}
                  name={props.name}
                  value={radio.value}
                  disabled={state.disabled}
                  readOnly={props.readOnly}
                  required={props.required && index === 0}
                  defaultChecked={
                    state.selection === radio.value ||
                    (props.required && index === 0)
                      ? true
                      : null
                  }
                  onChange={handleChange}>
                  {radio.label}
                </OCRadio>
              )}
            </OCGridItem>
          ))}
        </OCGrid>
        <div className={prefix('radio-set__border')} />
        {(state.error || state.success) && (
          <span className={prefix('radio-set__message')}>
            {(state.error && props.message
              ? props.message
              : responses.error[randomise(0, responses.error.length - 1)]) ||
              (state.success &&
                responses.success[randomise(0, responses.success.length - 1)])}
            ! {toTitleCase(state.selection)}{' '}
            {(typeof state.selection === 'string' && 'is') ||
              (Array.isArray(state.selection) && 'are')}{' '}
            {(state.error && 'incorrect') || (state.success && 'correct')}.
          </span>
        )}
      </fieldset>
    );
  }
}

OCRadioSet.propTypes = {
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  message: PropTypes.string,
  defaultSelection: PropTypes.string
};
