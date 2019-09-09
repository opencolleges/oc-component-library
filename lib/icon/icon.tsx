import * as React from 'react';

import find from '../utilities/js/find';
import namespace from '../utilities/js/namespace';

import classNames from '../utilities/js/namespace';
import { IProps } from './icon.interface';

const Icon: React.FC<IProps> = props => {
  const class_names: string = `${classNames('icon', props.modifiers)} ${
    props.className
  }`;

  return (
    <svg
      className={class_names}
      style={props.style}
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true">
      {find('icon--arrow-up', props.modifiers) && <ArrowUp />}
      {find('icon--arrow-right', props.modifiers) && <ArrowRight />}
      {find('icon--arrow-down', props.modifiers) && <ArrowDown />}
      {find('icon--arrow-left', props.modifiers) && <ArrowLeft />}
      {find('icon--calendar', props.modifiers) && <Calendar />}
      {find('icon--chevron-up', props.modifiers) && <ChevronUp />}
      {find('icon--chevron-right', props.modifiers) && <ChevronRight />}
      {find('icon--chevron-down', props.modifiers) && <ChevronDown />}
      {find('icon--chevron-left', props.modifiers) && <ChevronLeft />}
      {find('icon--clock', props.modifiers) && <Clock />}
      {find('icon--close', props.modifiers) && <Close />}
      {find('icon--close-ring', props.modifiers) && <CloseRing />}
      {find('icon--cloud', props.modifiers) && <Cloud />}
      {find('icon--cloud-download', props.modifiers) && <CloudDownload />}
      {find('icon--cloud-upload', props.modifiers) && <CloudUpload />}
      {find('icon--draggable', props.modifiers) && <Draggable />}
      {find('icon--hamburger', props.modifiers) && <Hamburger />}
      {find('icon--minus', props.modifiers) && <Minus />}
      {find('icon--minus-ring', props.modifiers) && <MinusRing />}
      {find('icon--question-ring', props.modifiers) && <QuestionRing />}
      {find('icon--plus', props.modifiers) && <Plus />}
      {find('icon--plus-ring', props.modifiers) && <PlusRing />}
      {find('icon--print', props.modifiers) && <Print />}
      {find('icon--search', props.modifiers) && <Search />}
      {find('icon--tick', props.modifiers) && <Tick />}
      {find('icon--tick-ring', props.modifiers) && <TickRing />}
    </svg>
  );
};

Icon.defaultProps = {
  size: '24px'
};

const ArrowUp = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M12,20 L12,4.71" />
      <polyline
        className={namespace('stroke stroke--2')}
        points="7.76 8.95 12 4.71 16.25 8.94"
      />
    </React.Fragment>
  );
};

const ArrowRight = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M4,12 L19.3,12" />
      <polyline
        className={namespace('stroke stroke--2')}
        points="15.05 7.76 19.3 12 15.05 16.24"
      />
    </React.Fragment>
  );
};

const ArrowDown = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M12,4 L12,19.3" />
      <polyline
        className={namespace('stroke stroke--2')}
        points="7.76 15.06 12 19.3 16.24 15.05"
      />
    </React.Fragment>
  );
};

const ArrowLeft = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M20,12 L4.71,12" />
      <polyline
        className={namespace('stroke stroke--2')}
        points="8.96 7.76 4.71 12 8.96 16.24"
      />
    </React.Fragment>
  );
};

const Calendar = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M12.5,4.5 L19.5,4.5 L19.5,19.5 L4.5,19.5 L4.5,4.5Z"
      />
      <path className={namespace('stroke stroke--2')} d="M4.5,7.5 L19.5,7.5" />
      <path className={namespace('stroke stroke--3')} d="M7.5,4.5 L7.5,2" />
      <path className={namespace('stroke stroke--4')} d="M16.5,4.5 L16.5,2" />
    </React.Fragment>
  );
};

const ChevronUp = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="4.93 15.535 12 8.465 19.07 15.535"
      />
    </React.Fragment>
  );
};

const ChevronRight = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="8.47 4.93 15.54 12 8.47 19.07"
      />
    </React.Fragment>
  );
};

const ChevronDown = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="4.93 8.47 12 15.54 19.07 8.47"
      />
    </React.Fragment>
  );
};

const ChevronLeft = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="15.535 4.93 8.465 12 15.535 19.07"
      />
    </React.Fragment>
  );
};

const Clock = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke-stroke--1')}
        cx="12"
        cy="12"
        r="9.5"
      />
      <polyline
        className={namespace('stroke stroke--2')}
        points="12 4.5 12 12 15.5 12"
      />
    </React.Fragment>
  );
};

const Close = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M6.34,6.34 L17.66,17.66"
      />
      <path
        className={namespace('stroke stroke--2')}
        d="M17.66,6.34 L6.34,17.66"
      />
    </React.Fragment>
  );
};

const CloseRing = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke stroke--1')}
        cx="12"
        cy="12"
        r="9.5"
      />
      <path
        className={namespace('stroke stroke--2')}
        d="M8.46,8.46 L15.5395508,15.54"
      />
      <path
        className={namespace('stroke stroke--3')}
        d="M15.54,8.46 L8.46,15.54"
      />
    </React.Fragment>
  );
};

const Cloud = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L6,16.5 Z"
      />
    </React.Fragment>
  );
};

const CloudDownload = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M9,16.5 L6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L15,16.5"
      />
      <path className={namespace('stroke stroke--2')} d="M12,11 L12,21.3" />
      <polyline
        className={namespace('stroke stroke--3')}
        points="9.17 18.47 12 21.3 14.83 18.47"
      />
    </React.Fragment>
  );
};

const CloudUpload = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M9,16.5 L6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L15,16.5"
      />
      <path className={namespace('stroke stroke--2')} d="M12,22 L12,11.7" />
      <polyline
        className={namespace('stroke stroke--3')}
        points="9.17 14.53 12 11.7 14.83 14.53"
      />
    </React.Fragment>
  );
};

const Draggable = () => {
  return (
    <React.Fragment>
      <circle className={namespace('stroke stroke--1')} cx="8" cy="4" r="2" />
      <circle className={namespace('stroke stroke--2')} cx="16" cy="4" r="2" />
      <circle className={namespace('stroke stroke--3')} cx="8" cy="12" r="2" />
      <circle className={namespace('stroke stroke--4')} cx="16" cy="12" r="2" />
      <circle className={namespace('stroke stroke--5')} cx="8" cy="20" r="2" />
      <circle className={namespace('stroke stroke--6')} cx="16" cy="20" r="2" />
    </React.Fragment>
  );
};

const Hamburger = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M0,4.5 L24,4.5" />
      <path className={namespace('stroke stroke--2')} d="M0,12 L24,12" />
      <path className={namespace('stroke stroke--3')} d="M0,19.5 L24,19.5" />
    </React.Fragment>
  );
};

const Tick = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="4.93 14.3 8.11 17.48 19.07 6.52"
      />
    </React.Fragment>
  );
};

const TickRing = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke stroke--1')}
        cx="12"
        cy="12"
        r="9.5"
      />
      <polyline
        className={namespace('stroke stroke--2')}
        points="7.1451416 12.89 9.63 15.36 16.35 8.64"
      />
    </React.Fragment>
  );
};

const Minus = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M4,12 L20,12" />
    </React.Fragment>
  );
};

const MinusRing = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke stroke--1')}
        cx="12"
        cy="12"
        r="9.5"
      />
      <path className={namespace('stroke stroke--2')} d="M7,12 L17,12" />
    </React.Fragment>
  );
};

const Plus = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M12,4 L12,20" />
      <path className={namespace('stroke stroke--2')} d="M4,12 L20,12" />
    </React.Fragment>
  );
};

const PlusRing = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke stroke--1')}
        cx="12"
        cy="12"
        r="9.5"
      />
      <path className={namespace('stroke stroke--2')} d="M7,12 L17,12" />
      <path className={namespace('stroke stroke--3')} d="M12,7 L12,17" />
    </React.Fragment>
  );
};

const Print = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M12 6.5L21.5 6.5L21.5 16.5L17.5 16.5L17.5 13.5L6.5 13.5L6.5 16.5L2.5 16.5L2.5 6.5Z"
      />
      <path
        className={namespace('stroke stroke--2')}
        d="M6.5 16.5L6.5 21.5L17.5 21.5L17.5 16.5"
      />
      <path
        className={namespace('stroke stroke--3')}
        d="M6.5 6.5L6.5 2.5L17.5 2.5L17.5 6.5"
      />
      <path className={namespace('stroke stroke--4')} d="M9 16.5L15 16.5" />
      <path className={namespace('stroke stroke--5')} d="M9 18.5L15 18.5" />
    </React.Fragment>
  );
};

const QuestionRing = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke stroke--1')}
        cx="12"
        cy="12"
        r="9.5"
      />
      <path
        className={namespace('stroke stroke--2')}
        d="M12,16 L12,14 C13.9329966,14 15.5,12.4329966 15.5,10.5 C15.5,8.56700338 13.9329966,7 12,7 C11.0324538,7 10.1566044,7.3926008 9.52306695,8.02718729 C8.89090181,8.66039919 8.5,9.53454959 8.5,10.5"
      />
      <path className={namespace('stroke stroke--3')} d="M12,17 L12,18" />
    </React.Fragment>
  );
};

const Search = () => {
  return (
    <React.Fragment>
      <circle
        className={namespace('stroke stroke--1')}
        cx="10.5"
        cy="10.5"
        r="5"
      />
      <path
        className={namespace('stroke stroke--2')}
        d="M13.88,13.88 L18.12,18.12"
      />
    </React.Fragment>
  );
};

export default Icon;
