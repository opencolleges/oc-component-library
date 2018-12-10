import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';
import { now, fetchCalendar, format } from './utilities';
import OCIcon from '../icon';

class OCDate extends Component {
  constructor(props) {
    super(props);

    this.dateRef = createRef();
    this.optionsRef = createRef();

    this.state = {
      active: false,
      selection: this.props.selection ? this.props.selection : '',
      calendar: fetchCalendar(
        this.props.selection ? this.props.selection : now
      ),
      disabled: find('date--disabled', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('date--disabled', this.props.modifiers)
      });
    }
  }

  getTopSibling = (array, index) => {
    return array[index - 7] || null;
  };

  getBottomSibling = (array, index) => {
    return array[index + 7] || null;
  };

  handleKeyDown = event => {
    const dateRef = this.dateRef.current;
    const optionsRef = this.optionsRef.current;

    const elementIndex = Array.prototype.indexOf.call(
      optionsRef.childNodes,
      event.target
    );

    const topSibling = this.getTopSibling(optionsRef.childNodes, elementIndex);
    const rightSibling = event.target.nextSibling;
    const bottomSibling = this.getBottomSibling(
      optionsRef.childNodes,
      elementIndex
    );
    const leftSibling = event.target.previousSibling;

    // date
    if (event.target.className === dateRef.className) {
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
          selection: event.target.getAttribute('data-item')
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

    // date
    if (event.target.className === dateRef.className) {
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
    } else if (
      event.target.className === prefix('date__item date__item--previous')
    ) {
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
    } else if (
      event.target.className === prefix('date__item date__item--next')
    ) {
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
          selection: event.target.getAttribute('data-item')
        },
        function() {
          dateRef.focus();
        }
      );
    }
  };

  handleBlur = event => {
    let relatedTarget = null;
    event.preventDefault();
    event.stopPropagation();

    if (event.relatedTarget === null) {
      relatedTarget = document.activeElement;
    } else {
      relatedTarget = event.relatedTarget;
    }

    if (
      relatedTarget === null ||
      (relatedTarget !== null &&
        event.target.getAttribute('data-id') !==
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
      dateRef,
      optionsRef,
      state,
      handleKeyDown,
      handleMouseDown,
      handleBlur
    } = this;

    const modifiers = remove(
      ['date--disabled', 'date--read-only'],
      props.modifiers
    );

    let hooks = '';

    state.selection && (hooks += 'selected ');
    state.active && (hooks += 'active');

    return (
      <div
        className={
          !modifiers
            ? prefix(`date ${hooks}`)
            : `${prefix(`date ${modifiers} ${hooks}`)}`
        }>
        <input
          id={props.id ? props.id : uniqueId()}
          className={prefix('date__input date__input--hidden')}
          type="hidden"
          name={props.name}
          value={state.selection}
          disabled={state.disabled}
          readOnly={find('date--read-only', this.props.modifiers)}
          onChange={props.onChange}
        />
        <span
          name={`date-${props.name}`}
          className={prefix('date__input')}
          tabIndex={!state.disabled ? 0 : null}
          ref={dateRef}
          onKeyDown={!state.disabled && !state.readOnly ? handleKeyDown : null}
          onMouseDown={
            !state.disabled && !state.readOnly ? handleMouseDown : null
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
        {!state.readOnly && <OCIcon modifiers="icon--calendar active" />}
        {!state.disabled && !state.readOnly && (
          <div className={prefix('date__border')} />
        )}
        {!state.disabled && !state.readOnly && (
          <div className={prefix('date__list-outer')}>
            <ul className={prefix('date__list')}>
              <li
                className={prefix('date__item date__item--previous')}
                title="Previous month"
                tabIndex={-1}
                onMouseDown={handleMouseDown}>
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
                onMouseDown={handleMouseDown}>
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
                        className={prefix('date__item date__item--selectable')}
                        tabIndex={-1}
                        data-id={state.id}
                        data-item={day}
                        onKeyDown={handleKeyDown}
                        onMouseDown={handleMouseDown}
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
  selection: PropTypes.string,
  onChange: PropTypes.func
};

export default OCDate;
