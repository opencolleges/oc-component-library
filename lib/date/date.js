// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';
import remove from '../utilities/js/remove';
import getId from '../utilities/js/getId';

import getDateFormat from '../utilities/js/getDateFormat';
import {
  getCalendar,
  getEndOfMonth,
  getStartOfMonth
} from '../utilities/js/getCalendar';
import isVowel from '../utilities/js/isVowel';

import { now } from '../utilities/js/variables';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCDate extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id ? props.id : getId();

    this.dateRef = React.createRef();
    this.optionsRef = React.createRef();

    this.state = {
      active: false,
      value:
        this.props.value && this.isInDateRange(this.props.value)
          ? this.props.value
          : '',
      calendar: getCalendar(
        this.props.value && this.isInDateRange(this.props.value)
          ? this.props.value
          : now
      ),
      error: find('date--error', this.props.modifiers),
      success: find('date--success', this.props.modifiers),
      disabled: this.props.disabled
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('date--error', this.props.modifiers),
        success: find('date--success', this.props.modifiers)
      });
    }

    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }

    if (this.state.value !== previousState.value) {
      this.setState({
        error: false,
        success: false
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
    this.props.onChange(this.state.value, this.props.name);
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

        if (this.state.value) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].hasAttribute('tabindex') &&
              optionsRef.childNodes[index].getAttribute('data-item') ===
                this.state.value
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

        this.setState(
          {
            active: false,
            value: target.getAttribute('data-item')
          },
          function() {
            this.setState({ calendar: getCalendar(this.state.value) });
          }
        );

        dateRef.focus();
      }

      //'Esc' key
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.value) {
          this.setState({ active: false }, function() {
            this.setState({ calendar: getCalendar(this.state.value) });
          });
        } else {
          this.setState({ active: false }, function() {
            this.setState({ calendar: getCalendar(now) });
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
            if (this.isInDateRange(nextMonthUpperDay)) {
              this.setState(
                {
                  calendar: getCalendar(this.state.calendar.months[0].date)
                },
                function() {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${nextMonthUpperDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: getCalendar(this.state.calendar.months[0].date)
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
            if (this.isInDateRange(nextMonthFirstDay)) {
              this.setState(
                {
                  calendar: getCalendar(this.state.calendar.months[2].date)
                },
                function() {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${nextMonthFirstDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: getCalendar(this.state.calendar.months[2].date)
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
            if (this.isInDateRange(previousMonthLowerDay)) {
              this.setState(
                {
                  calendar: getCalendar(this.state.calendar.months[2].date)
                },
                function() {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${previousMonthLowerDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: getCalendar(this.state.calendar.months[2].date)
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
            if (this.isInDateRange(previousMonthLastDay)) {
              this.setState(
                {
                  calendar: getCalendar(this.state.calendar.months[0].date)
                },
                function() {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${previousMonthLastDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: getCalendar(this.state.calendar.months[0].date)
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
        if (this.state.value) {
          this.setState({ active: false }, function() {
            this.setState({ calendar: getCalendar(this.state.value) });
          });
        } else {
          this.setState({ active: false }, function() {
            this.setState({ calendar: getCalendar(now) });
          });
        }

        dateRef.focus();
      } else {
        this.setState({ active: true });

        if (this.state.value) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].hasAttribute('tabindex') &&
              optionsRef.childNodes[index].getAttribute('data-item') ===
                this.state.value
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
          calendar: getCalendar(this.state.calendar.months[0].date)
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
          calendar: getCalendar(this.state.calendar.months[2].date)
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
          value: target.getAttribute('data-item')
        },
        function() {
          dateRef.focus();
          this.handleChange();
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
      this.setState({ active: false }, function() {
        this.setState({
          calendar: getCalendar(this.state.value ? this.state.value : now)
        });
      });
    }
  };

  isInDateRange = date => {
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;

    if (minDate || maxDate) {
      if (minDate && maxDate) {
        if (minDate <= date && maxDate >= date) {
          return true;
        }
      } else if (minDate) {
        if (minDate <= date) {
          return true;
        }
      } else {
        if (maxDate >= date) {
          return true;
        }
      }

      return false;
    }

    return true;
  };

  render() {
    const {
      props,
      state,
      dateRef,
      optionsRef,
      id,
      isInDateRange,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleBlur
    } = this;

    let classNames = prefix('date');

    const modifiers = remove(['date--error', 'date--success'], props.modifiers);

    modifiers && (classNames += ` ${prefix(modifiers)}`);

    state.error && (classNames += ` ${prefix('date--error')}`);
    state.success && (classNames += ` ${prefix('date--success')}`);

    state.value && (classNames += ` ${prefix('selected')}`);
    state.active && (classNames += ` ${prefix('active')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={prefix('date__input date__input--hidden')}
          type="hidden"
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.value}
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
          {!state.value
            ? `Pick ${
                isVowel(props.label.charAt(0)) ? 'an' : 'a'
              } ${props.label.toLowerCase()}`
            : getDateFormat(state.value, 'Do MMM YYYY')}
        </span>
        <label className={prefix('date__label')}>{props.label}</label>
        {!props.readOnly && <OCIcon modifiers="icon--calendar active" />}
        {!props.readOnly && !state.disabled && (
          <div className={prefix('date__border')} />
        )}
        {!props.readOnly && !state.disabled && (
          <div className={prefix('date__list-outer')}>
            <ul className={prefix('date__list')}>
              {isInDateRange(getEndOfMonth(state.calendar.months[0].date)) ? (
                <li
                  className={prefix('date__item date__item--previous')}
                  title="Previous month"
                  tabIndex={-1}
                  onMouseDown={handleMouseDown}
                  onTouchEnd={handleMouseDown}>
                  <OCIcon modifiers="icon--chevron-left active" />
                </li>
              ) : (
                <li
                  className={prefix(
                    'date__item date__item--previous date__item--disabled'
                  )}>
                  <OCIcon modifiers="icon--chevron-left" />
                </li>
              )}
              <li className={prefix('date__item date__item--month')}>
                {`${getDateFormat(
                  state.calendar.months[1].date,
                  'MMMM'
                )} ${getDateFormat(state.calendar.months[1].date, 'YYYY')}`}
              </li>
              {isInDateRange(getStartOfMonth(state.calendar.months[2].date)) ? (
                <li
                  className={prefix('date__item date__item--next')}
                  title="Next month"
                  tabIndex={-1}
                  onMouseDown={handleMouseDown}
                  onTouchEnd={handleMouseDown}>
                  <OCIcon modifiers="icon--chevron-right active" />
                </li>
              ) : (
                <li
                  className={prefix(
                    'date__item date__item--next date__item--disabled'
                  )}>
                  <OCIcon modifiers="icon--chevron-right" />
                </li>
              )}
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
                  if (monthIndex === 1 && isInDateRange(day)) {
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
                        {getDateFormat(day, 'D')}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={index}
                        className={prefix('date__item')}
                        data-item={day}>
                        {getDateFormat(day, 'D')}
                      </li>
                    );
                  }
                });
              })}
            </ul>
          </div>
        )}
        {!props.readOnly && !state.disabled && props.message && (
          <span className={prefix('date__message')}>{props.message}</span>
        )}
      </div>
    );
  }
}

OCDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  message: PropTypes.string,
  onChange: PropTypes.func
};

OCDate.defaultProps = {
  onChange: () => {}
};
