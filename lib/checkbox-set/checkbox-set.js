// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * child imports
import OCGrid from '../grid';
import OCGridItem from '../grid-item';
import OCCard from '../card';
import OCCheckbox from '../checkbox';

// * React component
export default class OCCheckboxSet extends React.Component {
  constructor(props) {
    super(props);

    const checkboxesArray = [];

    props.checkboxes.map(checkbox => {
      checkboxesArray.push(checkbox.value);
    });

    const intersection = checkboxesArray.filter(
      value =>
        this.props.selection && this.props.selection.indexOf(value) !== -1
    );

    this.state = {
      selection: intersection.length !== 0 ? intersection : [],
      error: this.props.error ? this.props.error : [],
      success: this.props.success ? this.props.success : [],
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

  handleChange = selection => {
    const previousSelection = this.state.selection;

    if (this.state.selection.indexOf(selection) === -1) {
      previousSelection.push(selection);
    } else {
      const selectionIndex = this.state.selection.indexOf(selection);

      previousSelection.splice(selectionIndex, 1);
    }

    this.setState({
      selection: previousSelection,
      error: [],
      success: []
    });
  };

  render() {
    const { props, state, handleChange } = this;

    let classNames = prefix('checkbox-set');

    state.error.length !== 0 && state.success.length !== 0
      ? (classNames += ` ${prefix('checkbox-set--error')}`)
      : state.error.length !== 0
      ? (classNames += ` ${prefix('checkbox-set--error')}`)
      : state.success.length !== 0 &&
        (classNames += ` ${prefix('checkbox-set--success')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <fieldset className={classNames} style={props.style}>
        <OCGrid
          modifiers={
            props.cards ? 'grid--gutter-fixed' : 'grid--gutter-x-fixed'
          }>
          {props.checkboxes.map((checkbox, index) => (
            <OCGridItem
              key={index}
              modifiers="grid__item--s-12 grid__item--m-6 grid__item--align-end">
              {props.cards ? (
                <OCCard modifiers="card--s card--layer-1 card--clickable">
                  <OCCheckbox
                    id={checkbox.id}
                    modifiers={
                      state.selection.indexOf(checkbox.value) !== -1
                        ? state.error.indexOf(checkbox.value) !== -1
                          ? 'checkbox--error'
                          : state.success.indexOf(checkbox.value) !== -1
                          ? 'checkbox--success'
                          : null
                        : null
                    }
                    className={checkbox.className}
                    style={checkbox.style}
                    name={props.name}
                    value={checkbox.value}
                    disabled={state.disabled}
                    readOnly={props.readOnly}
                    defaultChecked={
                      state.selection.indexOf(checkbox.value) !== -1
                    }
                    onChange={handleChange}>
                    {checkbox.label}
                  </OCCheckbox>
                </OCCard>
              ) : (
                <OCCheckbox
                  id={checkbox.id}
                  modifiers={
                    state.selection.indexOf(checkbox.value) !== -1
                      ? state.error.indexOf(checkbox.value) !== -1
                        ? 'checkbox--error'
                        : state.success.indexOf(checkbox.value) !== -1
                        ? 'checkbox--success'
                        : null
                      : null
                  }
                  className={checkbox.className}
                  style={checkbox.style}
                  name={props.name}
                  value={checkbox.value}
                  disabled={state.disabled}
                  readOnly={props.readOnly}
                  defaultChecked={
                    state.selection.indexOf(checkbox.value) !== -1
                  }
                  onChange={handleChange}>
                  {checkbox.label}
                </OCCheckbox>
              )}
            </OCGridItem>
          ))}
        </OCGrid>
        <div className={prefix('checkbox-set__border')} />
        {(state.error.length !== 0 || state.success.length !== 0) &&
          props.message && (
            <span className={prefix('checkbox-set__message')}>
              {props.message}
            </span>
          )}
      </fieldset>
    );
  }
}

OCCheckboxSet.propTypes = {
  checkboxes: PropTypes.arrayOf(
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
  message: PropTypes.string,
  selection: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  error: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  success: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  className: PropTypes.string,
  style: PropTypes.object
};
