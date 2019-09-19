import * as React from 'react';

import { Props } from './icon.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const Icon: React.FC<Props> = props => {
  const icons = {
    'arrow-down': ArrowDown,
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
    'arrow-up': ArrowUp,
    calendar: Calendar,
    'chevron-down': ChevronDown,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'chevron-up': ChevronUp,
    clock: Clock,
    close: Close,
    'close-ring': CloseRing,
    cloud: Cloud,
    'cloud-download': CloudDownload,
    'cloud-upload': CloudUpload,
    draggable: Draggable,
    hamburger: Hamburger,
    minus: Minus,
    'minus-ring': MinusRing,
    plus: Plus,
    'plus-ring': PlusRing,
    print: Print,
    'question-ring': QuestionRing,
    search: Search,
    tick: Tick,
    'tick-ring': TickRing
  };

  const classNames: string = _.trim(
    `${namespace(
      'icon',
      toModifier(props.type, 'icon'),
      props.visible ? 'active' : ''
    )} ${_.toString(props.className)}`
  );

  return (
    <svg
      className={classNames}
      style={props.style}
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true">
      {React.createElement(icons[props.type], {})}
    </svg>
  );
};

Icon.defaultProps = {
  size: '24px',
  visible: true
};

export default Icon;

const ArrowUp: React.FC = () => {
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

const ArrowRight: React.FC = () => {
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

const ArrowDown: React.FC = () => {
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

const ArrowLeft: React.FC = () => {
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

const Calendar: React.FC = () => {
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

const ChevronUp: React.FC = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="4.93 15.535 12 8.465 19.07 15.535"
      />
    </React.Fragment>
  );
};

const ChevronRight: React.FC = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="8.47 4.93 15.54 12 8.47 19.07"
      />
    </React.Fragment>
  );
};

const ChevronDown: React.FC = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="4.93 8.47 12 15.54 19.07 8.47"
      />
    </React.Fragment>
  );
};

const ChevronLeft: React.FC = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="15.535 4.93 8.465 12 15.535 19.07"
      />
    </React.Fragment>
  );
};

const Clock: React.FC = () => {
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

const Close: React.FC = () => {
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

const CloseRing: React.FC = () => {
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

const Cloud: React.FC = () => {
  return (
    <React.Fragment>
      <path
        className={namespace('stroke stroke--1')}
        d="M6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L6,16.5 Z"
      />
    </React.Fragment>
  );
};

const CloudDownload: React.FC = () => {
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

const CloudUpload: React.FC = () => {
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

const Draggable: React.FC = () => {
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

const Hamburger: React.FC = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M0,4.5 L24,4.5" />
      <path className={namespace('stroke stroke--2')} d="M0,12 L24,12" />
      <path className={namespace('stroke stroke--3')} d="M0,19.5 L24,19.5" />
    </React.Fragment>
  );
};

const Tick: React.FC = () => {
  return (
    <React.Fragment>
      <polyline
        className={namespace('stroke stroke--1')}
        points="4.93 14.3 8.11 17.48 19.07 6.52"
      />
    </React.Fragment>
  );
};

const TickRing: React.FC = () => {
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

const Minus: React.FC = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M4,12 L20,12" />
    </React.Fragment>
  );
};

const MinusRing: React.FC = () => {
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

const Plus: React.FC = () => {
  return (
    <React.Fragment>
      <path className={namespace('stroke stroke--1')} d="M12,4 L12,20" />
      <path className={namespace('stroke stroke--2')} d="M4,12 L20,12" />
    </React.Fragment>
  );
};

const PlusRing: React.FC = () => {
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

const Print: React.FC = () => {
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

const QuestionRing: React.FC = () => {
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

const Search: React.FC = () => {
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
