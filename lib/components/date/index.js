import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';
import { now, fetchCalendar, format } from './utilities';
import OCIcon from '../icon';

class OCDate extends Component {
  constructor(props) {
    super(props);

    this.date = createRef();
    this.options = createRef();

    this.state = {
      id: uniqueId(),
      active: false,
      selection: this.props.selection ? this.props.selection : '',
      calendar: fetchCalendar(
        this.props.selection ? this.props.selection : now
      ),
      disabled: find('date--disabled', this.props.modifiers),
      readOnly: find('date--read-only', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('date--disabled', this.props.modifiers),
        readOnly: find('date--read-only', this.props.modifiers)
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
    const date = this.date.current;
    const options = this.options.current;

    const elementIndex = Array.prototype.indexOf.call(
      options.childNodes,
      event.target
    );

    const topSibling = this.getTopSibling(options.childNodes, elementIndex);
    const rightSibling = event.target.nextSibling;
    const bottomSibling = this.getBottomSibling(
      options.childNodes,
      elementIndex
    );
    const leftSibling = event.target.previousSibling;

    // date
    if (event.target.className === date.className) {
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
          for (let index = 0; index < options.childNodes.length; index++) {
            if (
              options.childNodes[index].hasAttribute('tabindex') &&
              options.childNodes[index].getAttribute('data-item') ===
                this.state.selection
            ) {
              options.childNodes[index].focus();
              break;
            }
          }
        } else {
          for (let index = 0; index < options.childNodes.length; index++) {
            if (
              options.childNodes[index].hasAttribute('tabindex') &&
              options.childNodes[index].getAttribute('data-item') === now
            ) {
              options.childNodes[index].focus();
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

        date.focus();
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

        date.focus();
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
                options.querySelector(`li[data-item='${nextMonthUpperDay}']`).focus();
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
              options.querySelectorAll('li[tabindex="-1"]')[options.querySelectorAll('li[tabindex="-1"]').length - 1].focus();
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
                options.querySelector(`li[data-item='${nextMonthFirstDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[2].date)
            },
            function() {
              options.firstChild.focus();
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
                options.querySelector(`li[data-item='${previousMonthLowerDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[2].date)
            },
            function() {
              options.querySelector('li[tabindex="-1"]').focus();
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
                options.querySelector(`li[data-item='${previousMonthLastDay}']`).focus();
              }
            );
          }
        } else {
          this.setState(
            {
              calendar: fetchCalendar(this.state.calendar.months[0].date)
            },
            function() {
              options.lastChild.focus();
            }
          );
        }
      }
    }
  };

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();

    const date = this.date.current;
    const options = this.options.current;

    // date
    if (event.target.className === date.className) {
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

        date.focus();
      } else {
        this.setState({ active: true });

        if (this.state.selection) {
          for (let index = 0; index < options.childNodes.length; index++) {
            if (
              options.childNodes[index].hasAttribute('tabindex') &&
              options.childNodes[index].getAttribute('data-item') ===
                this.state.selection
            ) {
              options.childNodes[index].focus();
              break;
            }
          }
        } else {
          for (let index = 0; index < options.childNodes.length; index++) {
            if (
              options.childNodes[index].hasAttribute('tabindex') &&
              options.childNodes[index].getAttribute('data-item') === now
            ) {
              options.childNodes[index].focus();
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
            options.querySelectorAll('li[tabindex="-1"]')[options.querySelectorAll('li[tabindex="-1"]').length -1].focus();
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
            options.querySelectorAll('li[tabindex="-1"]')[options.querySelectorAll('li[tabindex="-1"]').length -1].focus();
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
          date.focus();
        }
      );
    }
  };

  handleBlur = event => {
    event.preventDefault();
    event.stopPropagation();

    if (
      event.relatedTarget === null ||
      (event.relatedTarget !== null &&
        event.target.getAttribute('data-id') !==
          event.relatedTarget.getAttribute('data-id'))
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
      date,
      options,
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
          className={prefix('date__input date__input--hidden')}
          type="hidden"
          name={props.name}
          value={state.selection}
          disabled={state.disabled}
          readOnly={state.readOnly}
        />
        <span
          className={prefix('date__input')}
          tabIndex={!state.disabled ? 0 : null}
          ref={date}
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
        {!state.readOnly && <OCIcon modifiers="icon--calendar" />}
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
                <OCIcon modifiers="icon--chevron-left" />
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
                <OCIcon modifiers="icon--chevron-right" />
              </li>
              <li className={prefix('date__item date__item--weekend')}>Su</li>
              <li className={prefix('date__item date__item--weekday')}>Mo</li>
              <li className={prefix('date__item date__item--weekday')}>Tu</li>
              <li className={prefix('date__item date__item--weekday')}>We</li>
              <li className={prefix('date__item date__item--weekday')}>Th</li>
              <li className={prefix('date__item date__item--weekday')}>Fr</li>
              <li className={prefix('date__item date__item--weekend')}>Sa</li>
            </ul>
            <ul className={prefix('date__list')} ref={options}>
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
  selection: PropTypes.string,
  name: PropTypes.string,
  modifiers: PropTypes.string
};

export default OCDate;
