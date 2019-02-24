import PropTypes from 'prop-types';
import React from 'react';

import { prefix, uniqueId } from '../utilities';
import { now, fetchCalendar, format } from './utilities';

import OCIcon from '../icon';

class OCDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      selection: this.props.selection ? this.props.selection : '',
      calendar: fetchCalendar(
        this.props.selection ? this.props.selection : now
      ),
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : uniqueId();

    this.dateRef = React.createRef();
    this.optionsRef = React.createRef();
  }

  componentDidUpdate(previousProps) {
    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  getTopSibling = (array, index) => {
    return array[index - 7] || null;
  };

  getBottomSibling = (array, index) => {
    return array[index + 7] || null;
  };

  handleChange = () => {
    // this.props.onChange(this.props.name, this.props.value);
  };

  handleKeyDown = event => {
    const dateRef = this.dateRef.current;
    const optionsRef = this.optionsRef.current;

    const target = event.target || event.srcElement;

    const elementIndex = Array.prototype.indexOf.call(
      optionsRef.childNodes,
      target
    );

    const topSibling = this.getTopSibling(optionsRef.childNodes, elementIndex);
    const rightSibling = target.nextSibling;
    const bottomSibling = this.getBottomSibling(
      optionsRef.childNodes,
      elementIndex
    );
    const leftSibling = target.previousSibling;

    // date
    if (target.className === dateRef.className) {
      // 'Space', 'ArrowUp', 'ArrowDown' keys
      if (
        event.keyCode === 32 ||
        event.keyCode === 38 ||
        event.keyCode === 40
      ) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ active: true });

        if (this.state.selection) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].hasAttribute('tabindex') &&
              optionsRef.childNodes[index].getAttribute('data-item') ===
                this.state.selection
            ) {
              optionsRef.childNodes[index].focus();
              break;
            }
          }
        } else {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].hasAttribute('tabindex') &&
              optionsRef.childNodes[index].getAttribute('data-item') === now
            ) {
              optionsRef.childNodes[index].focus();
              break;
            }
          }
        }
      }

      // options
    } else {
      // 'Tab' key
      if (event.keyCode === 9) {
        event.preventDefault();
        event.stopPropagation();
      }

      // 'Enter' or 'Space' key
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
          active: false,
          selection: target.getAttribute('data-item')
        });

        dateRef.focus();
      }

      //'Esc' key
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.selection) {
          this.setState({ active: false }, function() {
            this.setState({ calendar: fetchCalendar(this.state.selection) });
          });
        } else {
          this.setState({ active: false }, function() {
            this.setState({ calendar: fetchCalendar(now) });
          });
        }

        dateRef.focus();
      }

      // 'ArrowUp' key
      if (event.keyCode === 38) {
        event.preventDefault();
        event.stopPropagation();

        if (topSibling) {
          const nextMonthUpperDay = topSibling.getAttribute('data-item');

          if (topSibling.hasAttribute('tabindex')) {
            topSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[0].date)
              },
              function() {
                // prettier-ignore
                optionsRef.querySelector(`li[data-item='${nextMonthUpperDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[0].date)
            },
            function() {
              // prettier-ignore
              optionsRef.querySelectorAll('li[tabindex="-1"]')[optionsRef.querySelectorAll('li[tabindex="-1"]').length - 1].focus();
            }
          );
        }
      }

      // 'ArrowRight' key
      if (event.keyCode === 39) {
        event.preventDefault();
        event.stopPropagation();

        if (rightSibling) {
          const nextMonthFirstDay = rightSibling.getAttribute('data-item');

          if (rightSibling.hasAttribute('tabindex')) {
            rightSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[2].date)
              },
              function() {
                // prettier-ignore
                optionsRef.querySelector(`li[data-item='${nextMonthFirstDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[2].date)
            },
            function() {
              optionsRef.firstChild.focus();
            }
          );
        }
      }

      // 'ArrowDown' key
      if (event.keyCode === 40) {
        event.preventDefault();
        event.stopPropagation();

        if (bottomSibling) {
          const previousMonthLowerDay = bottomSibling.getAttribute('data-item');

          if (bottomSibling.hasAttribute('tabindex')) {
            bottomSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[2].date)
              },
              function() {
                // prettier-ignore
                optionsRef.querySelector(`li[data-item='${previousMonthLowerDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[2].date)
            },
            function() {
              optionsRef.querySelector('li[tabindex="-1"]').focus();
            }
          );
        }
      }

      // 'ArrowLeft' key
      if (event.keyCode === 37) {
        event.preventDefault();
        event.stopPropagation();

        if (leftSibling) {
          const previousMonthLastDay = leftSibling.getAttribute('data-item');

          if (leftSibling.hasAttribute('tabindex')) {
            leftSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[0].date)
              },
              function() {
                // prettier-ignore
                optionsRef.querySelector(`li[data-item='${previousMonthLastDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[0].date)
            },
            function() {
              optionsRef.lastChild.focus();
            }
          );
        }
      }
    }
  };

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();

    const dateRef = this.dateRef.current;
    const optionsRef = this.optionsRef.current;

    const target = event.target || event.srcElement;

    // date
    if (target.className === dateRef.className) {
      if (this.state.active) {
        if (this.state.selection) {
          this.setState({ active: false }, function() {
            this.setState({ calendar: fetchCalendar(this.state.selection) });
          });
        } else {
          this.setState({ active: false }, function() {
            this.setState({ calendar: fetchCalendar(now) });
          });
        }

        dateRef.focus();
      } else {
        this.setState({ active: true });

        if (this.state.selection) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].hasAttribute('tabindex') &&
              optionsRef.childNodes[index].getAttribute('data-item') ===
                this.state.selection
            ) {
              optionsRef.childNodes[index].focus();
              break;
            }
          }
        } else {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].hasAttribute('tabindex') &&
              optionsRef.childNodes[index].getAttribute('data-item') === now
            ) {
              optionsRef.childNodes[index].focus();
              break;
            }
          }
        }
      }

      // previous
    } else if (target.className === prefix('date__item date__item--previous')) {
      this.setState(
        {
          calendar: fetchCalendar(this.state.calendar.months[0].date)
        },
        function() {
          if (!document.activeElement.hasAttribute('tabindex')) {
            // prettier-ignore
            optionsRef.querySelectorAll('li[tabindex="-1"]')[optionsRef.querySelectorAll('li[tabindex="-1"]').length -1].focus();
          }
        }
      );

      // next
    } else if (target.className === prefix('date__item date__item--next')) {
      this.setState(
        {
          calendar: fetchCalendar(this.state.calendar.months[2].date)
        },
        function() {
          if (!document.activeElement.hasAttribute('tabindex')) {
            // prettier-ignore
            optionsRef.querySelectorAll('li[tabindex="-1"]')[optionsRef.querySelectorAll('li[tabindex="-1"]').length -1].focus();
          }
        }
      );

      // options
    } else {
      this.setState(
        {
          active: false,
          selection: target.getAttribute('data-item')
        },
        function() {
          dateRef.focus();
        }
      );
    }
  };

  handleBlur = event => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target || event.srcElement;
    const relatedTarget = event.relatedTarget || document.activeElement;

    if (
      relatedTarget === null ||
      (relatedTarget !== null &&
        target.getAttribute('data-id') !==
          relatedTarget.getAttribute('data-id'))
    ) {
      if (this.state.selection) {
        this.setState({ active: false }, function() {
          this.setState({ calendar: fetchCalendar(this.state.selection) });
        });
      } else {
        this.setState({ active: false }, function() {
          this.setState({ calendar: fetchCalendar(now) });
        });
      }
    }
  };

  render() {
    const {
      props,
      state,
      id,
      dateRef,
      optionsRef,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleBlur
    } = this;

    let hooks = '';

    state.selection && (hooks += 'selected ');
    state.active && (hooks += 'active');

    return (
      <div
        className={
          !props.modifiers
            ? prefix(`date ${hooks}`)
            : `${prefix(`date ${props.modifiers} ${hooks}`)}`
        }>
        <input
          id={id}
          className={prefix('date__input date__input--hidden')}
          type="hidden"
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.selection}
          onChange={handleChange}
        />
        <span
          ref={dateRef}
          className={prefix('date__input')}
          name={`date-${props.name}`}
          tabIndex={!props.readOnly && !state.disabled ? 0 : null}
          onKeyDown={!props.readOnly && !state.disabled ? handleKeyDown : null}
          onMouseDown={
            !props.readOnly && !state.disabled ? handleMouseDown : null
          }
          onTouchEnd={
            !props.readOnly && !state.disabled ? handleMouseDown : null
          }>
          {!state.selection
            ? props.label === 'Start date' || props.label === 'End date'
              ? props.label === 'Start date'
                ? `Pick a ${props.label.toLowerCase()}`
                : `Pick an ${props.label.toLowerCase()}`
              : `Pick a ${props.label.toLowerCase()}`
            : format(state.selection, 'Do MMM YYYY')}
        </span>
        <label className={prefix('date__label')}>{props.label}</label>
        {!props.readOnly && <OCIcon modifiers="icon--calendar active" />}
        {!props.readOnly && !state.disabled && (
          <div className={prefix('date__border')} />
        )}
        {!props.readOnly && !state.disabled && (
          <div className={prefix('date__list-outer')}>
            <ul className={prefix('date__list')}>
              <li
                className={prefix('date__item date__item--previous')}
                title="Previous month"
                tabIndex={-1}
                onMouseDown={handleMouseDown}
                onTouchEnd={handleMouseDown}>
                <OCIcon modifiers="icon--chevron-left active" />
              </li>
              <li className={prefix('date__item date__item--month')}>
                {`${format(state.calendar.months[1].date, 'MMMM')} ${format(
                  state.calendar.months[1].date,
                  'YYYY'
                )}`}
              </li>
              <li
                className={prefix('date__item date__item--next')}
                title="Next month"
                tabIndex={-1}
                onMouseDown={handleMouseDown}
                onTouchEnd={handleMouseDown}>
                <OCIcon modifiers="icon--chevron-right active" />
              </li>
              <li className={prefix('date__item date__item--weekend')}>Su</li>
              <li className={prefix('date__item date__item--weekday')}>Mo</li>
              <li className={prefix('date__item date__item--weekday')}>Tu</li>
              <li className={prefix('date__item date__item--weekday')}>We</li>
              <li className={prefix('date__item date__item--weekday')}>Th</li>
              <li className={prefix('date__item date__item--weekday')}>Fr</li>
              <li className={prefix('date__item date__item--weekend')}>Sa</li>
            </ul>
            <ul className={prefix('date__list')} ref={optionsRef}>
              {state.calendar.months.map((month, index) => {
                let monthIndex = index;
                return month.days.map((day, index) => {
                  if (monthIndex === 1) {
                    return (
                      <li
                        key={index}
                        className={
                          now !== day
                            ? prefix('date__item date__item--selectable')
                            : prefix(
                                'date__item date__item--selectable date__item--current'
                              )
                        }
                        tabIndex={-1}
                        data-id={id}
                        data-item={day}
                        onKeyDown={handleKeyDown}
                        onMouseDown={handleMouseDown}
                        onTouchEnd={handleMouseDown}
                        onBlur={handleBlur}>
                        {format(day, 'D')}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={index}
                        className={prefix('date__item')}
                        data-item={day}>
                        {format(day, 'D')}
                      </li>
                    );
                  }
                });
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

OCDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  selection: PropTypes.string,
  onChange: PropTypes.func
};

export default OCDate;
