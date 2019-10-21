// import _ from 'lodash';
// import React from 'react';

// import { NAMESPACE } from '../utilities/ts/constants';

// import BEM from '../utilities/ts/bem';
// import namespace from '../utilities/ts/namespace';
// import remove from '../utilities/ts/remove';
// import toModifier from '../utilities/ts/to-modifier';

// import {
//   getCalendar,
//   getEndOfMonth,
//   getStartOfMonth
// } from '../utilities/ts/getCalendar';
// import getDateFormat from '../utilities/ts/getDateFormat';
// import { now } from '../utilities/ts/variables';

// import Icon from '../icon';

// interface Props {
//   className?: string;
//   disabled?: boolean;
//   id?: string;
//   label: string;
//   maxDate?: string;
//   message?: string;
//   minDate?: string;
//   modifiers?: string;
//   name?: string;
//   onChange?: () => void;
//   readOnly?: boolean;
//   required?: boolean;
//   style?: React.CSSProperties;
//   value?: string;
// }

// interface State {
//   active: boolean;
//   calendar: [];
//   error: boolean;
//   success: boolean;
//   value: string;
// }

// export default class Date extends React.Component<Props, State> {
//   static defaultProps: Partial<Props> = {
//     disabled: false,
//     onChange: () => {
//       return;
//     },
//     readOnly: false,
//     required: false
//   };

//   id = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);

//   dateRef = React.createRef();
//   optionsRef = React.createRef();

//   readonly state: Readonly<State> = {
//     active: false,
//     calendar: getCalendar(
//       this.props.value && this.isInDateRange(this.props.value)
//         ? this.props.value
//         : now
//     ),
//     error: _.includes(_.split(this.props.modifiers, ` `), `error`),
//     success: _.includes(_.split(this.props.modifiers, ` `), `success`),
//     value:
//       this.props.value && this.isInDateRange(this.props.value)
//         ? this.props.value
//         : ``
//   };
// this;

//     const modifiers: string = remove([`error`, `success`], props.modifiers);

//     const bem = BEM(`date`);
//     bem.    bem.
//   componentDidUpdate(prevProps, prevState): void {
//     if (this.props.modifiers !== prevProps.modifiers) {
//       this.setState({
//         error: _.includes(_.split(this.props.modifiers, ` `), `error`),
//         success: _.includes(_.split(this.props.modifiers, ` `), `success`)
//       });
//     }

//     if (this.state.value !== prevState.value) {
//       this.setState({
//         error: false,
//         success: false
//       });
//     }
//   }

//   getTopSibling = (array, index) => {
//     return array[index - 7] || null;
//   };

//   getBottomSibling = (array, index) => {
//     return array[index + 7] || null;
//   };

//   handleChange = (): void => {
//     this.props.onChange(this.state.value, this.props.name);
//   };

//   // handleKeyDown = event => {
//   //   const dateRef = this.dateRef.current;
//   //   const optionsRef = this.optionsRef.current;

//   //   const target = event.target || event.srcElement;

//   //   const elementIndex = Array.prototype.indexOf.call(
//   //     optionsRef.childNodes,
//   //     target
//   //   );

//   //   const topSibling = this.getTopSibling(optionsRef.childNodes, elementIndex);
//   //   const rightSibling = target.nextSibling;
//   //   const bottomSibling = this.getBottomSibling(
//   //     optionsRef.childNodes,
//   //     elementIndex
//   //   );
//   //   const leftSibling = target.previousSibling;

//   //   // date
//   //   if (target.className === dateRef.className) {
//   //     // 'Space', 'ArrowUp', 'ArrowDown' keys
//   //     if (
//   //       event.keyCode === 32 ||
//   //       event.keyCode === 38 ||
//   //       event.keyCode === 40
//   //     ) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       this.setState({ active: true });

//   //       if (this.state.value) {
//   //         for (let index = 0; index < optionsRef.childNodes.length; index++) {
//   //           if (
//   //             optionsRef.childNodes[index].hasAttribute(`tabindex`) &&
//   //             optionsRef.childNodes[index].getAttribute(`data-item`) ===
//   //               this.state.value
//   //           ) {
//   //             optionsRef.childNodes[index].focus();
//   //             break;
//   //           }
//   //         }
//   //       } else {
//   //         for (let index = 0; index < optionsRef.childNodes.length; index++) {
//   //           if (
//   //             optionsRef.childNodes[index].hasAttribute(`tabindex`) &&
//   //             optionsRef.childNodes[index].getAttribute(`data-item`) === now
//   //           ) {
//   //             optionsRef.childNodes[index].focus();
//   //             break;
//   //           }
//   //         }
//   //       }
//   //     }

//   //     // options
//   //   } else {
//   //     // 'Tab' key
//   //     if (event.keyCode === 9) {
//   //       event.preventDefault();
//   //       event.stopPropagation();
//   //     }

//   //     // 'Enter' or 'Space' key
//   //     if (event.keyCode === 13 || event.keyCode === 32) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       this.setState(
//   //         {
//   //           active: false,
//   //           value: target.getAttribute(`data-item`)
//   //         },
//   //         function() {
//   //           this.setState({ calendar: getCalendar(this.state.value) });
//   //         }
//   //       );

//   //       dateRef.focus();
//   //     }

//   //     // 'Esc' key
//   //     if (event.keyCode === 27) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       if (this.state.value) {
//   //         this.setState({ active: false }, function() {
//   //           this.setState({ calendar: getCalendar(this.state.value) });
//   //         });
//   //       } else {
//   //         this.setState({ active: false }, function() {
//   //           this.setState({ calendar: getCalendar(now) });
//   //         });
//   //       }

//   //       dateRef.focus();
//   //     }

//   //     // 'ArrowUp' key
//   //     if (event.keyCode === 38) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       if (topSibling) {
//   //         const nextMonthUpperDay = topSibling.getAttribute(`data-item`);

//   //         if (topSibling.hasAttribute(`tabindex`)) {
//   //           topSibling.focus();
//   //         } else {
//   //           if (this.isInDateRange(nextMonthUpperDay)) {
//   //             this.setState(
//   //               {
//   //                 calendar: getCalendar(this.state.calendar.months[0].date)
//   //               },
//   //               function() {
//   //                 // prettier-ignore
//   //                 optionsRef.querySelector(`li[data-item='${nextMonthUpperDay}']`).focus();
//   //               }
//   //             );
//   //           }
//   //         }
//   //       } else {
//   //         this.setState(
//   //           {
//   //             calendar: getCalendar(this.state.calendar.months[0].date)
//   //           },
//   //           function() {
//   //             // prettier-ignore
//   //             optionsRef.querySelectorAll(`li[tabindex="-1"]`)[optionsRef.querySelectorAll(`li[tabindex="-1"]`).length - 1].focus();
//   //           }
//   //         );
//   //       }
//   //     }

//   //     // 'ArrowRight' key
//   //     if (event.keyCode === 39) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       if (rightSibling) {
//   //         const nextMonthFirstDay = rightSibling.getAttribute(`data-item`);

//   //         if (rightSibling.hasAttribute(`tabindex`)) {
//   //           rightSibling.focus();
//   //         } else {
//   //           if (this.isInDateRange(nextMonthFirstDay)) {
//   //             this.setState(
//   //               {
//   //                 calendar: getCalendar(this.state.calendar.months[2].date)
//   //               },
//   //               function() {
//   //                 // prettier-ignore
//   //                 optionsRef.querySelector(`li[data-item='${nextMonthFirstDay}']`).focus();
//   //               }
//   //             );
//   //           }
//   //         }
//   //       } else {
//   //         this.setState(
//   //           {
//   //             calendar: getCalendar(this.state.calendar.months[2].date)
//   //           },
//   //           function() {
//   //             optionsRef.firstChild.focus();
//   //           }
//   //         );
//   //       }
//   //     }

//   //     // 'ArrowDown' key
//   //     if (event.keyCode === 40) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       if (bottomSibling) {
//   //         const previousMonthLowerDay = bottomSibling.getAttribute(`data-item`);

//   //         if (bottomSibling.hasAttribute(`tabindex`)) {
//   //           bottomSibling.focus();
//   //         } else {
//   //           if (this.isInDateRange(previousMonthLowerDay)) {
//   //             this.setState(
//   //               {
//   //                 calendar: getCalendar(this.state.calendar.months[2].date)
//   //               },
//   //               function() {
//   //                 // prettier-ignore
//   //                 optionsRef.querySelector(`li[data-item='${previousMonthLowerDay}']`).focus();
//   //               }
//   //             );
//   //           }
//   //         }
//   //       } else {
//   //         this.setState(
//   //           {
//   //             calendar: getCalendar(this.state.calendar.months[2].date)
//   //           },
//   //           function() {
//   //             optionsRef.querySelector(`li[tabindex="-1"]`).focus();
//   //           }
//   //         );
//   //       }
//   //     }

//   //     // 'ArrowLeft' key
//   //     if (event.keyCode === 37) {
//   //       event.preventDefault();
//   //       event.stopPropagation();

//   //       if (leftSibling) {
//   //         const previousMonthLastDay = leftSibling.getAttribute(`data-item`);

//   //         if (leftSibling.hasAttribute(`tabindex`)) {
//   //           leftSibling.focus();
//   //         } else {
//   //           if (this.isInDateRange(previousMonthLastDay)) {
//   //             this.setState(
//   //               {
//   //                 calendar: getCalendar(this.state.calendar.months[0].date)
//   //               },
//   //               function() {
//   //                 // prettier-ignore
//   //                 optionsRef.querySelector(`li[data-item='${previousMonthLastDay}']`).focus();
//   //               }
//   //             );
//   //           }
//   //         }
//   //       } else {
//   //         this.setState(
//   //           {
//   //             calendar: getCalendar(this.state.calendar.months[0].date)
//   //           },
//   //           function() {
//   //             optionsRef.lastChild.focus();
//   //           }
//   //         );
//   //       }
//   //     }
//   //   }
//   // };

//   // handleMouseDown = event => {
//   //   event.preventDefault();
//   //   event.stopPropagation();

//   //   const dateRef = this.dateRef.current;
//   //   const optionsRef = this.optionsRef.current;

//   //   const target = event.target || event.srcElement;

//   //   // date
//   //   if (target.className === dateRef.className) {
//   //     if (this.state.active) {
//   //       if (this.state.value) {
//   //         this.setState({ active: false }, function() {
//   //           this.setState({ calendar: getCalendar(this.state.value) });
//   //         });
//   //       } else {
//   //         this.setState({ active: false }, function() {
//   //           this.setState({ calendar: getCalendar(now) });
//   //         });
//   //       }

//   //       dateRef.focus();
//   //     } else {
//   //       this.setState({ active: true });

//   //       if (this.state.value) {
//   //         for (let index = 0; index < optionsRef.childNodes.length; index++) {
//   //           if (
//   //             optionsRef.childNodes[index].hasAttribute(`tabindex`) &&
//   //             optionsRef.childNodes[index].getAttribute(`data-item`) ===
//   //               this.state.value
//   //           ) {
//   //             optionsRef.childNodes[index].focus();
//   //             break;
//   //           }
//   //         }
//   //       } else {
//   //         for (let index = 0; index < optionsRef.childNodes.length; index++) {
//   //           if (
//   //             optionsRef.childNodes[index].hasAttribute(`tabindex`) &&
//   //             optionsRef.childNodes[index].getAttribute(`data-item`) === now
//   //           ) {
//   //             optionsRef.childNodes[index].focus();
//   //             break;
//   //           }
//   //         }
//   //       }
//   //     }

//   //     // previous
//   //   } else if (
//   //     target.className === namespace(`date__item date__item--previous`)
//   //   ) {
//   //     this.setState(
//   //       {
//   //         calendar: getCalendar(this.state.calendar.months[0].date)
//   //       },
//   //       function() {
//   //         if (!document.activeElement.hasAttribute(`tabindex`)) {
//   //           // prettier-ignore
//   //           optionsRef.querySelectorAll(`li[tabindex="-1"]`)[optionsRef.querySelectorAll(`li[tabindex="-1"]`).length -1].focus();
//   //         }
//   //       }
//   //     );

//   //     // next
//   //   } else if (target.className === namespace(`date__item date__item--next`)) {
//   //     this.setState(
//   //       {
//   //         calendar: getCalendar(this.state.calendar.months[2].date)
//   //       },
//   //       function() {
//   //         if (!document.activeElement.hasAttribute(`tabindex`)) {
//   //           // prettier-ignore
//   //           optionsRef.querySelectorAll(`li[tabindex="-1"]`)[optionsRef.querySelectorAll(`li[tabindex="-1"]`).length -1].focus();
//   //         }
//   //       }
//   //     );

//   //     // options
//   //   } else {
//   //     this.setState(
//   //       {
//   //         active: false,
//   //         value: target.getAttribute(`data-item`)
//   //       },
//   //       function() {
//   //         dateRef.focus();
//   //         this.handleChange();
//   //       }
//   //     );
//   //   }
//   // };

//   // handleBlur = event => {
//   //   event.preventDefault();
//   //   event.stopPropagation();

//   //   const target = event.target || event.srcElement;
//   //   const relatedTarget = event.relatedTarget || document.activeElement;

//   //   if (
//   //     relatedTarget === null ||
//   //     (relatedTarget !== null &&
//   //       target.getAttribute(`data-id`) !==
//   //         relatedTarget.getAttribute(`data-id`))
//   //   ) {
//   //     this.setState({ active: false }, function() {
//   //       this.setState({
//   //         calendar: getCalendar(this.state.value ? this.state.value : now)
//   //       });
//   //     });
//   //   }
//   // };

//   isInDateRange = (date: string): boolean => {
//     const minDate: string = this.props.minDate;
//     const maxDate: string = this.props.maxDate;

//     if (minDate || maxDate) {
//       if (minDate && maxDate) {
//         if (minDate <= date && maxDate >= date) {
//           return true;
//         }
//       } else if (minDate) {
//         if (minDate <= date) {
//           return true;
//         }
//       } else {
//         if (maxDate >= date) {
//           return true;
//         }
//       }

//       return false;
//     }

//     return true;
//   };

//   render() {
//     const {
//       props,
//       state,
//       dateRef,
//       optionsRef,``
//       id,
//       isInDateRange,
//       handleChange,
//       handleKeyDown,
//       handleMouseDown,
//       handleBlur
//     } = addModifiers(modifiers);
// addModifiers(state.error ? `error` : ``);
//     bem.addModifiers(state.success ? `success` : ``);
//     bem.addClassNames(state.value ? `selected` : ``);
//     bem.addClassNames(state.active ? `active` : ``);
//     bem.addClassNames(props.className);

//     return (
//       <div className={bem.getResult()} style={props.style}>
//         <input
//           id={id}
//           className={`${bem.getElement(`input`)} ${bem.getModifier(
//             `hidden`,
//             `input`
//           )}`}
//           type="hidden"
//           name={props.name}
//           disabled={props.disabled}
//           readOnly={props.readOnly}
//           required={props.required}
//           value={state.value}
//           onChange={handleChange}
//         />
//         <span
//           ref={dateRef}
//           className={bem.getElement(`input`)}
//           // name={`date-${props.name}`}
//           tabIndex={!props.readOnly && !props.disabled ? 0 : null}
//           onKeyDown={!props.readOnly && !props.disabled ? handleKeyDown : null}
//           onMouseDown={
//             !props.readOnly && !props.disabled ? handleMouseDown : null
//           }
//           onTouchEnd={
//             !props.readOnly && !props.disabled ? handleMouseDown : null
//           }>
//           {!state.value
//             ? `Pick ${
//                 _.startsWith(`aeiou`, props.label) ? `an` : `a`
//               } ${props.label.toLowerCase()}`
//             : getDateFormat(state.value, `Do MMM YYYY`)}
//         </span>
//         <label className={bem.getElement(`label`)}>{props.label}</label>
//         {!props.readOnly && <Icon type="calendar" />}
//         {!props.readOnly && !props.disabled && (
//           <div className={bem.getElement(`border`)} />
//         )}
//         {!props.readOnly && !props.disabled && (
//           <div className={bem.getElement(`list-outer`)}>
//             <ul className={bem.getElement(`list`)}>
//               {isInDateRange(getEndOfMonth(state.calendar.months[0].date)) ? (
//                 <li
//                   className={`${bem.getElement(`item`)} ${bem.getModifier(
//                     `previous`,
//                     `item`
//                   )}`}
//                   title="Previous month"
//                   tabIndex={-1}
//                   onMouseDown={handleMouseDown}
//                   onTouchEnd={handleMouseDown}>
//                   <Icon type="chevron-left" />
//                 </li>
//               ) : (
//                 <li
//                   className={`${bem.getElement(`item`)} ${bem.getModifier(
//                     `previous`,
//                     `item`
//                   )} ${bem.getModifier(`disabled`, `item`)}`}>
//                   <Icon type="chevron-left" visible={false} />
//                 </li>
//               )}
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `month`,
//                   `item`
//                 )}`}>
//                 {`${getDateFormat(
//                   state.calendar.months[1].date,
//                   `MMMM`
//                 )} ${getDateFormat(state.calendar.months[1].date, `YYYY`)}`}
//               </li>
//               {isInDateRange(getStartOfMonth(state.calendar.months[2].date)) ? (
//                 <li
//                   className={`${bem.getElement(`item`)} ${bem.getModifier(
//                     `next`,
//                     `item`
//                   )}`}
//                   title="Next month"
//                   tabIndex={-1}
//                   onMouseDown={handleMouseDown}
//                   onTouchEnd={handleMouseDown}>
//                   <Icon type="chevron-right" />
//                 </li>
//               ) : (
//                 <li
//                   className={`${bem.getElement(`item`)} ${bem.getModifier(
//                     `next`,
//                     `item`
//                   )} ${bem.getModifier(`disabled`, `item`)}`}>
//                   <Icon type="chevron-right" visible={false} />
//                 </li>
//               )}
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekend`,
//                   `item`
//                 )}`}>
//                 Su
//               </li>
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekday`,
//                   `item`
//                 )}`}>
//                 Mo
//               </li>
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekday`,
//                   `item`
//                 )}`}>
//                 Tu
//               </li>
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekday`,
//                   `item`
//                 )}`}>
//                 We
//               </li>
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekday`,
//                   `item`
//                 )}`}>
//                 Th
//               </li>
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekday`,
//                   `item`
//                 )}`}>
//                 Fr
//               </li>
//               <li
//                 className={`${bem.getElement(`item`)} ${bem.getModifier(
//                   `weekend`,
//                   `item`
//                 )}`}>
//                 Sa
//               </li>
//             </ul>
//             <ul className={namespace(`date__list`)} ref={optionsRef}>
//               {state.calendar.months.map((month, index) => {
//                 const monthIndex = index;

//                 return month.days.map((day, index) => {
//                   if (monthIndex === 1 && isInDateRange(day)) {
//                     return (
//                       <li
//                         key={index}
//                         className={`${bem.getElement(`item`)} ${bem.getModifier(
//                           `selectable`,
//                           `item`
//                         )} ${
//                           now === day ? bem.getModifier(`current`, `item`) : ``
//                         }`}
//                         tabIndex={-1}
//                         data-id={id}
//                         data-item={day}
//                         onKeyDown={handleKeyDown}
//                         onMouseDown={handleMouseDown}
//                         onTouchEnd={handleMouseDown}
//                         onBlur={handleBlur}>
//                         {getDateFormat(day, `D`)}
//                       </li>
//                     );
//                   } else {
//                     return (
//                       <li
//                         key={index}
//                         className={bem.getElement(`item`)}
//                         data-item={day}>
//                         {getDateFormat(day, `D`)}
//                       </li>
//                     );
//                   }
//                 });
//               })}
//             </ul>
//           </div>
//         )}
//         {!props.readOnly && !props.disabled && props.message && (
//           <span className={bem.getElement(`message`)}>{props.message}</span>
//         )}
//       </div>
//     );
//   }
// }
