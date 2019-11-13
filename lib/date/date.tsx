import _ from 'lodash';
import React from 'react';
import Icon from '../icon';
import addNamespace from '../utilities/ts/add-namespace';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import dateTime from '../utilities/ts/date-time';
import { CalendarMonth } from '../utilities/ts/date-time';
import getId from '../utilities/ts/get-id';
import includes from '../utilities/ts/includes';
import itemise from '../utilities/ts/itemise';
import remove from '../utilities/ts/remove';

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

class Date extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  id: string = this.props.id ? this.props.id : getId();
  inRange: boolean = dateTime.isInRange(
    this.props.minDate,
    this.props.maxDate,
    this.props.value
  );

  inputRef = React.createRef<HTMLSpanElement>();
  listRef = React.createRef<HTMLUListElement>();

  readonly state: Readonly<State> = {
    active: false,
    calendar: dateTime.getCalendarMonth(
      this.props.value && this.inRange ? this.props.value : ``
    ),
    error: includes(itemise(this.props.modifiers), `error`),
    success: includes(itemise(this.props.modifiers), `success`),
    value: this.props.value && this.inRange ? this.props.value : ``
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: includes(itemise(this.props.modifiers), `error`),
        success: includes(itemise(this.props.modifiers), `success`)
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
    const inputRef: HTMLSpanElement = this.inputRef.current;
    const listRef: any = this.listRef.current;

    const target: any = event.target;

    const elementIndex: number = Array.prototype.indexOf.call(
      listRef.childNodes,
      target
    );

    const topSibling: any = this.getTopSibling(
      listRef.childNodes,
      elementIndex
    );
    const rightSibling: any = target.nextSibling;
    const bottomSibling: any = this.getBottomSibling(
      listRef.childNodes,
      elementIndex
    );
    const leftSibling: any = target.previousSibling;

    // date
    if (target.className === inputRef.className) {
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
          for (const childNode of listRef.childNodes) {
            if (
              childNode.hasAttribute(`tabindex`) &&
              childNode.getAttribute(`data-item`) === this.state.value
            ) {
              childNode.focus();
              break;
            }
          }
        } else {
          for (const childNode of listRef.childNodes) {
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

        inputRef.focus();
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

        inputRef.focus();
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
                  listRef.querySelector(`li[data-item='${nextMonthUpperDay}']`).focus();
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
              listRef.querySelectorAll(`li[tabindex="-1"]`)[listRef.querySelectorAll(`li[tabindex="-1"]`).length - 1].focus();
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
                  listRef.querySelector(`li[data-item='${nextMonthFirstDay}']`).focus();
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
              listRef.firstChild.focus();
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
                  listRef.querySelector(`li[data-item='${previousMonthLowerDay}']`).focus();
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
              listRef.querySelector(`li[tabindex="-1"]`).focus();
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
                  listRef.querySelector(`li[data-item='${previousMonthLastDay}']`).focus();
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
              listRef.lastChild.focus();
            }
          );
        }
      }
    }
  };

  handleMouseDown = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();

    const inputRef: HTMLSpanElement = this.inputRef.current;
    const listRef: any = this.listRef.current;

    const target: any = event.target;

    // date
    if (target.className === inputRef.className) {
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

        inputRef.focus();
      } else {
        this.setState({ active: true });

        if (this.state.value) {
          for (const childNode of listRef.childNodes) {
            if (
              childNode.hasAttribute(`tabindex`) &&
              childNode.getAttribute(`data-item`) === this.state.value
            ) {
              childNode.focus();
              break;
            }
          }
        } else {
          for (const childNode of listRef.childNodes) {
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
      target.className === addNamespace(`date__item date__item--previous`)
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
            listRef.querySelectorAll(`li[tabindex="-1"]`)[listRef.querySelectorAll(`li[tabindex="-1"]`).length -1].focus();
          }
        }
      );

      // next
    } else if (
      target.className === addNamespace(`date__item date__item--next`)
    ) {
      this.setState(
        {
          calendar: dateTime.getCalendarMonth(
            this.state.calendar.months[2].date
          )
        },
        () => {
          if (!document.activeElement.hasAttribute(`tabindex`)) {
            // prettier-ignore
            listRef.querySelectorAll(`li[tabindex="-1"]`)[listRef.querySelectorAll(`li[tabindex="-1"]`).length -1].focus();
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
          inputRef.focus();
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
      inputRef,
      listRef,
      id,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleBlur
    } = this;

    const modifiers: string = remove([`error`, `success`], props.modifiers);

    const BEM_MODULE: BEMInterface = BEM(`date`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getModifier,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(modifiers ? modifiers : ``);
    addModifiers(state.error ? `error` : ``);
    addModifiers(state.success ? `success` : ``);
    addClassNames(state.value ? `selected` : ``);
    addClassNames(state.active ? `active` : ``);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <input
          id={id}
          className={`${getElement(`input`)} ${getModifier(`hidden`, `input`)}`}
          type="hidden"
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.value}
          onChange={handleChange}
        />
        <span
          ref={inputRef}
          className={getElement(`input`)}
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
        <label className={getElement(`label`)}>{props.label}</label>
        {!props.readOnly && <Icon type="calendar" />}
        {!props.readOnly && !props.disabled && (
          <div className={getElement(`border`)} />
        )}
        {!props.readOnly && !props.disabled && (
          <div className={getElement(`list-outer`)}>
            <ul className={getElement(`list`)}>
              {dateTime.isInRange(
                props.minDate,
                props.maxDate,
                dateTime.getMonthEnd(state.calendar.months[0].date)
              ) ? (
                <li
                  className={`${getElement(`item`)} ${getModifier(
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
                  className={`${getElement(`item`)} ${getModifier(
                    `previous`,
                    `item`
                  )} ${getModifier(`disabled`, `item`)}`}>
                  <Icon type="chevron-left" visible={false} />
                </li>
              )}
              <li
                className={`${getElement(`item`)} ${getModifier(
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
                  className={`${getElement(`item`)} ${getModifier(
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
                  className={`${getElement(`item`)} ${getModifier(
                    `next`,
                    `item`
                  )} ${getModifier(`disabled`, `item`)}`}>
                  <Icon type="chevron-right" visible={false} />
                </li>
              )}
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekend`,
                  `item`
                )}`}>
                Su
              </li>
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Mo
              </li>
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Tu
              </li>
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekday`,
                  `item`
                )}`}>
                We
              </li>
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Th
              </li>
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekday`,
                  `item`
                )}`}>
                Fr
              </li>
              <li
                className={`${getElement(`item`)} ${getModifier(
                  `weekend`,
                  `item`
                )}`}>
                Sa
              </li>
            </ul>
            <ul className={addNamespace(`date__list`)} ref={listRef}>
              {state.calendar.months.map((month, monthIndex) => {
                return month.days.map((day, dayIndex) => {
                  if (
                    monthIndex === 1 &&
                    dateTime.isInRange(props.minDate, props.maxDate, day)
                  ) {
                    return (
                      <li
                        key={dayIndex}
                        className={`${getElement(`item`)} ${getModifier(
                          `selectable`,
                          `item`
                        )}${
                          dateTime.now() === day
                            ? ` ${getModifier(`current`, `item`)}`
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
                        className={getElement(`item`)}
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
          <span className={getElement(`message`)}>{props.message}</span>
        )}
      </div>
    );
  }
}

export { Date as default };
