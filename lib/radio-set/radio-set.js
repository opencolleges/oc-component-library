// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';

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
      value:
        radiosArray.indexOf(this.props.value) !== -1 ? this.props.value : '',
      error: find('radio-set--error', this.props.modifiers),
      success: find('radio-set--success', this.props.modifiers),
      disabled: this.props.disabled
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  handleChange = value => {
    this.setState({
      value: value,
      error: false,
      success: false
    });
    this.props.onChange(value, this.props.name);
  };

  render() {
    const { props, state, handleChange } = this;

    let classNames = prefix('radio-set');

    state.error && (classNames += ` ${prefix('radio-set--error')}`);
    state.success && (classNames += ` ${prefix('radio-set--success')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <fieldset className={classNames} style={props.style}>
        <OCGrid modifiers="grid--gutter-fixed">
          {props.radios.map((radio, index) => (
            <OCGridItem
              key={index}
              modifiers="grid__item--s-12 grid__item--m-6 grid__item--align-end">
              {props.cards ? (
                <OCCard modifiers="card--s card--layer-1 card--clickable">
                  <OCRadio
                    id={radio.id}
                    modifiers={
                      state.value === radio.value
                        ? state.error
                          ? 'radio--error'
                          : state.success
                          ? 'radio--success'
                          : null
                        : null
                    }
                    className={radio.className}
                    style={radio.style}
                    name={props.name}
                    value={radio.value}
                    disabled={state.disabled}
                    readOnly={props.readOnly}
                    required={props.required && index === 0}
                    checked={state.value === radio.value}
                    onChange={handleChange}>
                    {radio.label}
                  </OCRadio>
                </OCCard>
              ) : (
                <OCRadio
                  id={radio.id}
                  modifiers={
                    state.value === radio.value
                      ? state.error
                        ? 'radio--error'
                        : state.success
                        ? 'radio--success'
                        : null
                      : null
                  }
                  className={radio.className}
                  style={radio.style}
                  name={props.name}
                  value={radio.value}
                  disabled={state.disabled}
                  readOnly={props.readOnly}
                  required={props.required && index === 0}
                  checked={state.value === radio.value}
                  onChange={handleChange}>
                  {radio.label}
                </OCRadio>
              )}
            </OCGridItem>
          ))}
        </OCGrid>
        <div className={prefix('radio-set__border')} />
        {(state.error || state.success) && props.message && (
          <span className={prefix('radio-set__message')}>{props.message}</span>
        )}
      </fieldset>
    );
  }
}

OCRadioSet.propTypes = {
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      className: PropTypes.string,
      style: PropTypes.object,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

OCRadioSet.defaultProps = {
  onChange: () => {}
};
