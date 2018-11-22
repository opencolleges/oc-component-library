import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find } from '../utilities';
import { now, fetchCalendar, format } from './utilities';

import OCIcon from '../icon';

class OCDate extends Component {
  constructor(props) {
    super(props);

    this.select = createRef();
    this.options = createRef();

    this.state = {
      id: uniqueId(),
      active: false,
      selection: this.props.selection ? this.props.selection : '',
      disabled: find('date--disabled', this.props.modifiers),
      calendar: fetchCalendar(this.props.selection ? this.props.selection : now)
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
    const select = this.select.current;
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

    // Select
    if (event.target.className === select.className) {
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
              options.childNodes[index].getAttribute('data-option') ===
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
              options.childNodes[index].getAttribute('data-option') === now
            ) {
              options.childNodes[index].focus();
              break;
            }
          }
        }
      }
      // Options
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
          selection: event.target.getAttribute('data-option')
        });

        select.focus();
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

        select.focus();
      }

      // 'ArrowUp' key
      if (event.keyCode === 38) {
        event.preventDefault();
        event.stopPropagation();

        if (topSibling) {
          const nextMonthUpperDay = topSibling.getAttribute('data-option');

          if (topSibling.hasAttribute('tabindex')) {
            topSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[0].date)
              },
              function() {
                // prettier-ignore
                options.querySelector(`li[data-option='${nextMonthUpperDay}']`).focus();
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
          const nextMonthFirstDay = rightSibling.getAttribute('data-option');

          if (rightSibling.hasAttribute('tabindex')) {
            rightSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[2].date)
              },
              function() {
                // prettier-ignore
                options.querySelector(`li[data-option='${nextMonthFirstDay}']`).focus();
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
          const previousMonthLowerDay = bottomSibling.getAttribute(
            'data-option'
          );

          if (bottomSibling.hasAttribute('tabindex')) {
            bottomSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[2].date)
              },
              function() {
                // prettier-ignore
                options.querySelector(`li[data-option='${previousMonthLowerDay}']`).focus();
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
          const previousMonthLastDay = leftSibling.getAttribute('data-option');

          if (leftSibling.hasAttribute('tabindex')) {
            leftSibling.focus();
          } else {
            this.setState(
              {
                calendar: fetchCalendar(this.state.calendar.months[0].date)
              },
              function() {
                // prettier-ignore
                options.querySelector(`li[data-option='${previousMonthLastDay}']`).focus();
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

    const select = this.select.current;
    const options = this.options.current;

    // select
    if (event.target.className === select.className) {
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

        select.focus();
      } else {
        this.setState({ active: true });

        if (this.state.selection) {
          for (let index = 0; index < options.childNodes.length; index++) {
            if (
              options.childNodes[index].hasAttribute('tabindex') &&
              options.childNodes[index].getAttribute('data-option') ===
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
              options.childNodes[index].getAttribute('data-option') === now
            ) {
              options.childNodes[index].focus();
              break;
            }
          }
        }
      }
    } else if (event.target.tagName === 'BUTTON') {
      const initDate = document.activeElement.getAttribute('data-option');
      const midDate = this.state.calendar.months[1].days[15];

      if (
        event.target.className ===
        prefix('date__navigation date__navigation--next')
      ) {
        this.setState(
          {
            calendar: fetchCalendar(this.state.calendar.months[2].date)
          },
          function() {
            if (!document.activeElement.hasAttribute('tabindex')) {
              if (initDate <= midDate) {
                options.querySelectorAll('li[tabindex="-1"]')[0].focus();
              } else {
                // prettier-ignore
                options.querySelectorAll('li[tabindex="-1"]')[options.querySelectorAll('li[tabindex="-1"]').length -1].focus();
              }
            }
          }
        );
      } else {
        this.setState(
          {
            calendar: fetchCalendar(this.state.calendar.months[0].date)
          },
          function() {
            if (!document.activeElement.hasAttribute('tabindex')) {
              if (initDate <= midDate) {
                options.querySelectorAll('li[tabindex="-1"]')[0].focus();
              } else {
                // prettier-ignore
                options.querySelectorAll('li[tabindex="-1"]')[options.querySelectorAll('li[tabindex="-1"]').length -1].focus();
              }
            }
          }
        );
      }
    } else {
      this.setState({
        active: false,
        selection: event.target.getAttribute('data-option')
      });

      select.focus();
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
      select,
      options,
      state,
      handleKeyDown,
      handleMouseDown,
      handleBlur
    } = this;

    let hooks = '';

    state.selection && (hooks += 'selected ');
    state.active && (hooks += 'active');

    return (
      <div className={prefix(`date ${hooks}`)}>
        <input
          className={prefix('date__input date__input--hidden')}
          type="hidden"
          name={props.name}
          value={state.selection}
          disabled={state.disabled}
        />
        <span
          className={prefix('date__input')}
          tabIndex={!state.disabled ? 0 : null}
          ref={select}
          onKeyDown={!state.disabled ? handleKeyDown : null}
          onMouseDown={!state.disabled ? handleMouseDown : null}>
          {!state.selection
            ? props.label === 'Start date' || props.label === 'End date'
              ? props.label === 'Start date'
                ? `Pick a ${props.label.toLowerCase()}`
                : `Pick an ${props.label.toLowerCase()}`
              : `Pick a ${props.label.toLowerCase()}`
            : format(state.selection, 'D / M / YY')}
        </span>
        <label className={prefix('date__label')}>{props.label}</label>
        <OCIcon modifiers="icon--chevron-down" />
        {!state.disabled && <div className={prefix('date__border')} />}
        {!state.disabled && (
          <div className={prefix('date__list-outer')}>
            <div className={prefix('date__navigation-outer')}>
              <button
                className={prefix(
                  'date__navigation date__navigation--previous'
                )}
                type="button"
                title="Previous month"
                tabIndex={-1}
                onMouseDown={handleMouseDown}>
                <OCIcon modifiers="icon--chevron-left" />
              </button>
              <button
                className={prefix('date__navigation date__navigation--next')}
                type="button"
                title="Next month"
                tabIndex={-1}
                onMouseDown={handleMouseDown}>
                <OCIcon modifiers="icon--chevron-right" />
              </button>
              <div className={prefix('date__heading')}>
                {`${format(state.calendar.months[1].date, 'MMMM')} ${format(
                  state.calendar.months[1].date,
                  'YYYY'
                )}`}
              </div>
            </div>
            <ul className={prefix('date__list')}>
              <li
                className={prefix(
                  'date__item date__item--heading date__item--alt'
                )}>
                Su
              </li>
              <li className={prefix('date__item date__item--heading')}>Mo</li>
              <li className={prefix('date__item date__item--heading')}>Tu</li>
              <li className={prefix('date__item date__item--heading')}>We</li>
              <li className={prefix('date__item date__item--heading')}>Th</li>
              <li className={prefix('date__item date__item--heading')}>Fr</li>
              <li
                className={prefix(
                  'date__item date__item--heading date__item--alt'
                )}>
                Sa
              </li>
            </ul>
            <ul className={prefix('date__list')} ref={options}>
              {state.calendar.months.map((month, index) => {
                let monthIndex = index;
                return month.days.map((day, index) => {
                  if (monthIndex === 1) {
                    return (
                      <li
                        key={index}
                        className={
                          state.selection !== day
                            ? prefix('date__item')
                            : prefix('date__item selected')
                        }
                        tabIndex={-1}
                        data-id={state.id}
                        data-option={day}
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
                        className={prefix('date__item date__item--disabled')}
                        data-option={day}>
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
  name: PropTypes.string
};

export default OCDate;
