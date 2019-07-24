// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * child imports
import Grid from '../grid';
import GridItem from '../grid-item';
import Card from '../card';
import Checkbox from '../checkbox';

// * React component
export default class CheckboxSet extends React.Component {
  constructor(props) {
    super(props);

    const checkboxesArray = [];

    props.checkboxes.map(checkbox => {
      checkboxesArray.push(checkbox.value);
    });

    const intersection = checkboxesArray.filter(
      value => this.props.value && this.props.value.indexOf(value) !== -1
    );

    this.state = {
      value: intersection.length !== 0 ? intersection : [],
      error: this.props.error ? this.props.error : [],
      success: this.props.success ? this.props.success : [],
      disabled: this.props.disabled
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }

    if (prevProps.error !== this.props.error) {
      if (!this.props.error) {
        this.setState({ error: [] });
      } else {
        this.setState({ error: [...this.props.error] });
      }
    }

    if (prevProps.success !== this.props.success) {
      if (!this.props.success) {
        this.setState({ success: [] });
      } else {
        this.setState({ success: [...this.props.success] });
      }
    }
  }

  handleChange = value => {
    const previousSelection = this.state.value;

    if (this.state.value.indexOf(value) === -1) {
      previousSelection.push(value);
    } else {
      const selectionIndex = this.state.value.indexOf(value);

      previousSelection.splice(selectionIndex, 1);
    }

    this.setState({
      value: previousSelection,
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
        <Grid modifiers="grid--gutter-x-fixed">
          {props.checkboxes.map((checkbox, index) => (
            <GridItem
              key={index}
              modifiers="grid__item--s-12 grid__item--m-6 grid__item--align-end">
              {props.cards ? (
                <Card modifiers="card--s card--clickable">
                  <Checkbox
                    id={checkbox.id}
                    modifiers={
                      state.value.indexOf(checkbox.value) !== -1
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
                    checked={state.value.indexOf(checkbox.value) !== -1}
                    onChange={handleChange}>
                    {checkbox.label}
                  </Checkbox>
                </Card>
              ) : (
                <Checkbox
                  id={checkbox.id}
                  modifiers={
                    state.value.indexOf(checkbox.value) !== -1
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
                  checked={state.value.indexOf(checkbox.value) !== -1}
                  onChange={handleChange}>
                  {checkbox.label}
                </Checkbox>
              )}
            </GridItem>
          ))}
        </Grid>
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

CheckboxSet.propTypes = {
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      className: PropTypes.string,
      style: PropTypes.object,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.arrayOf(
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
