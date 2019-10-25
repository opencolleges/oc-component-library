import _ from 'lodash';
import React from 'react';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';
import { CalendarMonth } from '../utilities/ts/date-time';
import dateTime from '../utilities/ts/date-time';
import namespace from '../utilities/ts/namespace';
import remove from '../utilities/ts/remove';

import Icon from '../icon';

interface Props {
  className?: string;
  disabled?: boolean;
  id?: string;
  label: string;
  maxDate?: string;
  message?: string;
  minDate?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

interface State {
  active: boolean;
  calendar: CalendarMonth;
  error: boolean;
  success: boolean;
  value: string;
}

export default class Date extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  id: string = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);
  inRange: boolean = dateTime.isInRange(
    this.props.minDate,
    this.props.maxDate,
    this.props.value
  );

  dateRef: any = React.createRef();
  optionsRef: any = React.createRef();

  readonly state: Readonly<State> = {
    active: false,
    calendar: dateTime.getCalendarMonth(
      this.props.value && this.inRange ? this.props.value : ``
    ),
    error: _.includes(_.split(this.props.modifiers, ` `), `error`),
    success: _.includes(_.split(this.props.modifiers, ` `), `success`),
    value: this.props.value && this.inRange ? this.props.value : ``
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: _.includes(_.split(this.props.modifiers, ` `), `error`),
        success: _.includes(_.split(this.props.modifiers, ` `), `success`)
      });
    }

    if (this.state.value !== prevState.value) {
      this.setState({
        error: false,
        success: false
      });
    }
  }

  getTopSibling = (array: number[], i: number): number => {
    return array[i - 7] || null;
  };

  getBottomSibling = (array: number[], i: number): number => {
    return array[i + 7] || null;
  };

  handleChange = (): void => {
    this.props.onChange(this.state.value, this.props.name);
  };

  handleKeyDown = (event: any): void => {
    const dateRef: any = this.dateRef.current;
    const optionsRef: any = this.optionsRef.current;

    const target: any = event.target;

    const elementIndex: number = Array.prototype.indexOf.call(
      optionsRef.childNodes,
      target
    );

    const topSibling: any = this.getTopSibling(
      optionsRef.childNodes,
      elementIndex
    );
    const rightSibling: any = target.nextSibling;
    const bottomSibling: any = this.getBottomSibling(
      optionsRef.childNodes,
      elementIndex
    );
    const leftSibling: any = target.previousSibling;

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
          for (const childNode of optionsRef.childNodes) {
            if (
              childNode.hasAttribute(`tabindex`) &&
              childNode.getAttribute(`data-item`) === this.state.value
            ) {
              childNode.focus();
              break;
            }
          }
        } else {
          for (const childNode of optionsRef.childNodes) {
            if (
              childNode.hasAttribute(`tabindex`) &&
              childNode.getAttribute(`data-item`) === dateTime.now()
            ) {
              childNode.focus();
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
            value: target.getAttribute(`data-item`)
          },
          () => {
            this.setState({
              calendar: dateTime.getCalendarMonth(this.state.value)
            });
          }
        );

        dateRef.focus();
      }

      // 'Esc' key
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.value) {
          this.setState({ active: false }, () => {
            this.setState({
              calendar: dateTime.getCalendarMonth(this.state.value)
            });
          });
        } else {
          this.setState({ active: false }, () => {
            this.setState({
              calendar: dateTime.getCalendarMonth(dateTime.now())
            });
          });
        }

        dateRef.focus();
      }

      // 'ArrowUp' key
      if (event.keyCode === 38) {
        event.preventDefault();
        event.stopPropagation();

        if (topSibling) {
          const nextMonthUpperDay = topSibling.getAttribute(`data-item`);

          if (topSibling.hasAttribute(`tabindex`)) {
            topSibling.focus();
          } else {
            if (
              dateTime.isInRange(
                this.props.minDate,
                this.props.maxDate,
                nextMonthUpperDay
              )
            ) {
              this.setState(
                {
                  calendar: dateTime.getCalendarMonth(
                    this.state.calendar.months[0].date
                  )
                },
                () => {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${nextMonthUpperDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: dateTime.getCalendarMonth(
                this.state.calendar.months[0].date
              )
            },
            () => {
              // prettier-ignore
              optionsRef.querySelectorAll(`li[tabindex="-1"]`)[optionsRef.querySelectorAll(`li[tabindex="-1"]`).length - 1].focus();
            }
          );
        }
      }

      // 'ArrowRight' key
      if (event.keyCode === 39) {
        event.preventDefault();
        event.stopPropagation();

        if (rightSibling) {
          const nextMonthFirstDay = rightSibling.getAttribute(`data-item`);

          if (rightSibling.hasAttribute(`tabindex`)) {
            rightSibling.focus();
          } else {
            if (
              dateTime.isInRange(
                this.props.minDate,
                this.props.maxDate,
                nextMonthFirstDay
              )
            ) {
              this.setState(
                {
                  calendar: dateTime.getCalendarMonth(
                    this.state.calendar.months[2].date
                  )
                },
                () => {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${nextMonthFirstDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: dateTime.getCalendarMonth(
                this.state.calendar.months[2].date
              )
            },
            () => {
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
          const previousMonthLowerDay = bottomSibling.getAttribute(`data-item`);

          if (bottomSibling.hasAttribute(`tabindex`)) {
            bottomSibling.focus();
          } else {
            if (
              dateTime.isInRange(
                this.props.minDate,
                this.props.maxDate,
                previousMonthLowerDay
              )
            ) {
              this.setState(
                {
                  calendar: dateTime.getCalendarMonth(
                    this.state.calendar.months[2].date
                  )
                },
                () => {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${previousMonthLowerDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: dateTime.getCalendarMonth(
                this.state.calendar.months[2].date
              )
            },
            () => {
              optionsRef.querySelector(`li[tabindex="-1"]`).focus();
            }
          );
        }
      }

      // 'ArrowLeft' key
      if (event.keyCode === 37) {
        event.preventDefault();
        event.stopPropagation();

        if (leftSibling) {
          const previousMonthLastDay = leftSibling.getAttribute(`data-item`);

          if (leftSibling.hasAttribute(`tabindex`)) {
            leftSibling.focus();
          } else {
            if (
              dateTime.isInRange(
                this.props.minDate,
                this.props.maxDate,
                previousMonthLastDay
              )
            ) {
              this.setState(
                {
                  calendar: dateTime.getCalendarMonth(
                    this.state.calendar.months[0].date
                  )
                },
                () => {
                  // prettier-ignore
                  optionsRef.querySelector(`li[data-item='${previousMonthLastDay}']`).focus();
                }
              );
            }
          }
        } else {
          this.setState(
            {
              calendar: dateTime.getCalendarMonth(
                this.state.calendar.months[0].date
              )
            },
            () => {
              optionsRef.lastChild.focus();
            }
          );
        }
      }
    }
  };

  handleMouseDown = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();

    const dateRef: any = this.dateRef.current;
    const optionsRef: any = this.optionsRef.current;

    const target: any = event.target;

    // date
    if (target.className === dateRef.className) {
      if (this.state.active) {
        if (this.state.value) {
          this.setState({ active: false }, () => {
            this.setState({
              calendar: dateTime.getCalendarMonth(this.state.value)
            });
          });
        } else {
          this.setState({ active: false }, () => {
            this.setState({
              calendar: dateTime.getCalendarMonth(dateTime.now())
            });
          });
        }

        dateRef.focus();
      } else {
        this.setState({ active: true });

        if (this.state.value) {
          for (const childNode of optionsRef.childNodes) {
            if (
              childNode.hasAttribute(`tabindex`) &&
              childNode.getAttribute(`data-item`) === this.state.value
            ) {
              childNode.focus();
              break;
            }
          }
        } else {
          for (const childNode of optionsRef.childNodes) {
            if (
              childNode.hasAttribute(`tabindex`) &&
              childNode.getAttribute(`data-item`) === dateTime.now()
            ) {
              childNode.focus();
              break;
            }
          }
        }
      }

      // previous
    } else if (
      target.className === namespace(`date__item date__item--previous`)
    ) {
      this.setState(
        {
          calendar: dateTime.getCalendarMonth(
            this.state.calendar.months[0].date
          )
        },
        () => {
          if (!document.activeElement.hasAttribute(`tabindex`)) {
            // prettier-ignore
            optionsRef.querySelectorAll(`li[tabindex="-1"]`)[optionsRef.querySelectorAll(`li[tabindex="-1"]`).length -1].focus();
          }
        }
      );

      // next
    } else if (target.className === namespace(`date__item date__item--next`)) {
      this.setState(
        {
          calendar: dateTime.getCalendarMonth(
            this.state.calendar.months[2].date
          )
        },
        () => {
          if (!document.activeElement.hasAttribute(`tabindex`)) {
            // prettier-ignore
            optionsRef.querySelectorAll(`li[tabindex="-1"]`)[optionsRef.querySelectorAll(`li[tabindex="-1"]`).length -1].focus();
          }
        }
      );

      // options
    } else {
      this.setState(
        {
          active: false,
          value: target.getAttribute(`data-item`)
        },
        () => {
          dateRef.focus();
          this.handleChange();
        }
      );
    }
  };

  handleBlur = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();

    const target: any = e.target;
    const relatedTarget: any = e.relatedTarget || document.activeElement;

    if (
      relatedTarget === null ||
      (relatedTarget !== null &&
        target.getAttribute(`data-id`) !==
          relatedTarget.getAttribute(`data-id`))
    ) {
      this.setState({ active: false }, () => {
        this.setState({
          calendar: dateTime.getCalendarMonth(
            this.state.value ? this.state.value : dateTime.now()
          )
        });
      });
    }
  };

  render() {
    const {
      props,
      state,
      dateRef,
      optionsRef,
      id,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleBlur
    } = this;

    const modifiers: string = remove([`error`, `success`], props.modifiers);

    const bem = BEM(`date`);
    bem.addModifiers(modifiers ? modifiers : ``);
    bem.addModifiers(state.error ? `error` : ``);
    bem.addModifiers(state.success ? `success` : ``);
    bem.addClassNames(state.value ? `selected` : ``);
    bem.addClassNames(state.active ? `active` : ``);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <input
          id={id}
          className={`${bem.getElement(`input`)} ${bem.getModifier(
            `hidden`,
            `input`
          )}`}
          type="hidden"
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.value}
          onChange={handleChange}
        />
        <span
          ref={dateRef}
          className={bem.getElement(`input`)}
          tabIndex={!props.readOnly && !props.disabled ? 0 : null}
          onKeyDown={!props.readOnly && !props.disabled ? handleKeyDown : null}
          onMouseDown={
            !props.readOnly && !props.disabled ? handleMouseDown : null
          }
          onTouchEnd={
            !props.readOnly && !props.disabled ? handleMouseDown : null
          }>
          {!state.value
            ? `Pick ${
                _.startsWith(`aeiou`, props.label) ? `an` : `a`
              } ${props.label.toLowerCase()}`
            : dateTime.getCustom(`Do MMM YYYY`, state.value)}
        </span>
        <label className={bem.getElement(`label`)}>{props.label}</label>
        {!props.readOnly && <Icon type="calendar" />}
        {!props.readOnly && !props.disabled && (
          <div className={bem.getElement(`border`)} />
        )}
        {!props.readOnly && !props.disabled && (
          <div className={bem.getElement(`list-outer`)}>
            <ul className={bem.getElement(`list`)}>
              {dateTime.isInRange(
                props.minDate,
                props.maxDate,
                dateTime.getMonthEnd(state.calendar.months[0].date)
              ) ? (
                <li
                  className={`${bem.getElement(`item`)} ${bem.getModifier(
                    `previous`,
                    `item`
                  )}`}
                  title="Previous month"
                  tabIndex={-1}
                  onMouseDown={handleMouseDown}
                  onTouchEnd={handleMouseDown}>
                  <Icon type="chevron-left" />
                </li>
              ) : (
                <li
                  className={`${bem.getElement(`item`)} ${bem.getModifier(
                    `previous`,
                    `item`
                  )} ${bem.getModifier(`disabled`, `item`)}`}>
                  <Icon type="chevron-left" visible={false} />
                </li>
              )}
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `month`,
                  `item`
                )}`}>
                {`${dateTime.getCustom(
                  `MMMM`,
                  state.calendar.months[1].date
                )} ${dateTime.getCustom(
                  `YYYY`,
                  state.calendar.months[1].date
                )}`}
              </li>
              {dateTime.isInRange(
                props.minDate,
                props.maxDate,
                dateTime.getMonthStart(state.calendar.months[2].date)
              ) ? (
                <li
                  className={`${bem.getElement(`item`)} ${bem.getModifier(
                    `next`,
                    `item`
                  )}`}
                  title="Next month"
                  tabIndex={-1}
                  onMouseDown={handleMouseDown}
                  onTouchEnd={handleMouseDown}>
                  <Icon type="chevron-right" />
                </li>
              ) : (
                <li
                  className={`${bem.getElement(`item`)} ${bem.getModifier(
                    `next`,
                    `item`
                  )} ${bem.getModifier(`disabled`, `item`)}`}>
                  <Icon type="chevron-right" visible={false} />
                </li>
              )}
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekend`,
                  `item`
                )}`}>
                Su
              </li>
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Mo
              </li>
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Tu
              </li>
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekday`,
                  `item`
                )}`}>
                We
              </li>
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Th
              </li>
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Fr
              </li>
              <li
                className={`${bem.getElement(`item`)} ${bem.getModifier(
                  `weekend`,
                  `item`
                )}`}>
                Sa
              </li>
            </ul>
            <ul className={namespace(`date__list`)} ref={optionsRef}>
              {state.calendar.months.map((month, monthIndex) => {
                return month.days.map((day, dayIndex) => {
                  if (
                    monthIndex === 1 &&
                    dateTime.isInRange(props.minDate, props.maxDate, day)
                  ) {
                    return (
                      <li
                        key={dayIndex}
                        className={`${bem.getElement(`item`)} ${bem.getModifier(
                          `selectable`,
                          `item`
                        )}${
                          dateTime.now() === day
                            ? ` ${bem.getModifier(`current`, `item`)}`
                            : ``
                        }`}
                        tabIndex={-1}
                        data-id={id}
                        data-item={day}
                        onKeyDown={handleKeyDown}
                        onMouseDown={handleMouseDown}
                        onTouchEnd={handleMouseDown}
                        onBlur={handleBlur}>
                        {dateTime.getCustom(`D`, day)}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={dayIndex}
                        className={bem.getElement(`item`)}
                        data-item={day}>
                        {dateTime.getCustom(`D`, day)}
                      </li>
                    );
                  }
                });
              })}
            </ul>
          </div>
        )}
        {!props.readOnly && !props.disabled && props.message && (
          <span className={bem.getElement(`message`)}>{props.message}</span>
        )}
      </div>
    );
  }
}
