// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utilty imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';

// * React component
const OCIcon = ({ modifiers, style, size }) => {
  return (
    <svg
      className={prefix(`icon ${modifiers}`)}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true">
      {find('icon--arrow-up', modifiers) && <ArrowUp />}
      {find('icon--arrow-right', modifiers) && <ArrowRight />}
      {find('icon--arrow-down', modifiers) && <ArrowDown />}
      {find('icon--arrow-left', modifiers) && <ArrowLeft />}
      {find('icon--calendar', modifiers) && <Calendar />}
      {find('icon--chevron-up', modifiers) && <ChevronUp />}
      {find('icon--chevron-right', modifiers) && <ChevronRight />}
      {find('icon--chevron-down', modifiers) && <ChevronDown />}
      {find('icon--chevron-left', modifiers) && <ChevronLeft />}{' '}
      {find('icon--clock', modifiers) && <Clock />}
      {find('icon--close', modifiers) && <Close />}
      {find('icon--close-ring', modifiers) && <CloseRing />}
      {find('icon--cloud', modifiers) && <Cloud />}
      {find('icon--cloud-download', modifiers) && <CloudDownload />}
      {find('icon--cloud-upload', modifiers) && <CloudUpload />}
      {find('icon--draggable', modifiers) && <Draggable />}
      {find('icon--hamburger', modifiers) && <Hamburger />}{' '}
      {find('icon--minus', modifiers) && <Minus />}
      {find('icon--minus-ring', modifiers) && <MinusRing />}{' '}
      {find('icon--plus', modifiers) && <Plus />}
      {find('icon--plus-ring', modifiers) && <PlusRing />}
      {find('icon--search', modifiers) && <Search />}
      {find('icon--tick', modifiers) && <Tick />}
      {find('icon--tick-ring', modifiers) && <TickRing />}
    </svg>
  );
};

OCIcon.propTypes = {
  modifiers: PropTypes.string.isRequired,
  style: PropTypes.object,
  size: PropTypes.string
};

OCIcon.defaultProps = {
  size: '24px'
};

const ArrowUp = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M12,20 L12,4.71" />
      <polyline
        className={prefix('stroke stroke--2')}
        points="7.76 8.95 12 4.71 16.25 8.94"
      />
    </g>
  );
};

const ArrowRight = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M4,12 L19.3,12" />
      <polyline
        className={prefix('stroke stroke--2')}
        points="15.05 7.76 19.3 12 15.05 16.24"
      />
    </g>
  );
};

const ArrowDown = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M12,4 L12,19.3" />
      <polyline
        className={prefix('stroke stroke--2')}
        points="7.76 15.06 12 19.3 16.24 15.05"
      />
    </g>
  );
};

const ArrowLeft = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M20,12 L4.71,12" />
      <polyline
        className={prefix('stroke stroke--2')}
        points="8.96 7.76 4.71 12 8.96 16.24"
      />
    </g>
  );
};

const Calendar = () => {
  return (
    <g>
      <rect
        className={prefix('stroke stroke--1')}
        x="4.5"
        y="4.5"
        width="15"
        height="15"
      />
      <path className={prefix('stroke stroke--2')} d="M4.5,7.5 L19.5,7.5" />
      <path className={prefix('stroke stroke--3')} d="M7.5,4.5 L7.5,2" />
      <path className={prefix('stroke stroke--4')} d="M16.5,4.5 L16.5,2" />
    </g>
  );
};

const ChevronUp = () => {
  return (
    <g>
      <polyline
        className={prefix('stroke stroke--1')}
        points="4.93 15.535 12 8.465 19.07 15.535"
      />
    </g>
  );
};

const ChevronRight = () => {
  return (
    <g>
      <polyline
        className={prefix('stroke stroke--1')}
        points="8.47 4.93 15.54 12 8.47 19.07"
      />
    </g>
  );
};

const ChevronDown = () => {
  return (
    <g>
      <polyline
        className={prefix('stroke stroke--1')}
        points="4.93 8.47 12 15.54 19.07 8.47"
      />
    </g>
  );
};

const ChevronLeft = () => {
  return (
    <g>
      <polyline
        className={prefix('stroke stroke--1')}
        points="15.535 4.93 8.465 12 15.535 19.07"
      />
    </g>
  );
};

const Clock = () => {
  return (
    <g>
      <circle className={prefix('stroke-stroke--1')} cx="12" cy="12" r="9.5" />
      <polyline
        className={prefix('stroke stroke--2')}
        points="12 4.5 12 12 15.5 12"
      />
    </g>
  );
};

const Close = () => {
  return (
    <g>
      <path
        className={prefix('stroke stroke--1')}
        d="M6.34,6.34 L17.66,17.66"
      />
      <path
        className={prefix('stroke stroke--2')}
        d="M17.66,6.34 L6.34,17.66"
      />
    </g>
  );
};

const CloseRing = () => {
  return (
    <g>
      <circle className={prefix('stroke stroke--1')} cx="12" cy="12" r="9.5" />
      <path
        className={prefix('stroke stroke--2')}
        d="M8.46,8.46 L15.5395508,15.54"
      />
      <path
        className={prefix('stroke stroke--3')}
        d="M15.54,8.46 L8.46,15.54"
      />
    </g>
  );
};

const Cloud = () => {
  return (
    <g>
      <path
        className={prefix('stroke stroke--1')}
        d="M6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L6,16.5 Z"
      />
    </g>
  );
};

const CloudDownload = () => {
  return (
    <g>
      <path
        className={prefix('stroke stroke--1')}
        d="M9,16.5 L6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L15,16.5"
      />
      <path className={prefix('stroke stroke--2')} d="M12,11 L12,21.3" />
      <polyline
        className={prefix('stroke stroke--3')}
        points="9.17 18.47 12 21.3 14.83 18.47"
      />
    </g>
  );
};

const CloudUpload = () => {
  return (
    <g>
      <path
        className={prefix('stroke stroke--1')}
        d="M9,16.5 L6,16.5 C4.06700338,16.5 2.5,14.9329966 2.5,13 C2.5,11.226031 3.81977468,9.7603119 5.5310174,9.53114933 C5.51053372,9.35694902 5.5,9.17970465 5.5,9 C5.5,6.51471863 7.51471863,4.5 10,4.5 C12.1073308,4.5 13.8763383,5.94853401 14.3656478,7.9042272 C14.8534932,7.64614478 15.4096796,7.5 16,7.5 C17.9329966,7.5 19.5,9.06700338 19.5,11 C19.5,11.1843128 19.4857532,11.3652981 19.4583006,11.5419146 C20.6201319,11.7571689 21.5,12.7758323 21.5,14 C21.5,15.3807119 20.3807119,16.5 19,16.5 L15,16.5"
      />
      <path className={prefix('stroke stroke--2')} d="M12,22 L12,11.7" />
      <polyline
        className={prefix('stroke stroke--3')}
        points="9.17 14.53 12 11.7 14.83 14.53"
      />
    </g>
  );
};

const Draggable = () => {
  return (
    <g>
      <circle className={prefix('stroke stroke--1')} cx="8" cy="4" r="2" />
      <circle className={prefix('stroke stroke--2')} cx="16" cy="4" r="2" />
      <circle className={prefix('stroke stroke--3')} cx="8" cy="12" r="2" />
      <circle className={prefix('stroke stroke--4')} cx="16" cy="12" r="2" />
      <circle className={prefix('stroke stroke--5')} cx="8" cy="20" r="2" />
      <circle className={prefix('stroke stroke--6')} cx="16" cy="20" r="2" />
    </g>
  );
};

const Hamburger = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M0,4.5 L24,4.5" />
      <path className={prefix('stroke stroke--2')} d="M0,12 L24,12" />
      <path className={prefix('stroke stroke--3')} d="M0,19.5 L24,19.5" />
    </g>
  );
};

const Tick = () => {
  return (
    <g>
      <polyline
        className={prefix('stroke stroke--1')}
        points="4.93 14.3 8.11 17.48 19.07 6.52"
      />
    </g>
  );
};

const TickRing = () => {
  return (
    <g>
      <circle className={prefix('stroke stroke--1')} cx="12" cy="12" r="9.5" />
      <polyline
        className={prefix('stroke stroke--2')}
        points="16.35 8.64 9.63 15.36 7.1451416 12.89"
      />
    </g>
  );
};

const Minus = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M4,12 L20,12" />
    </g>
  );
};

const MinusRing = () => {
  return (
    <g>
      <circle className={prefix('stroke stroke--1')} cx="12" cy="12" r="9.5" />
      <path className={prefix('stroke stroke--2')} d="M7,12 L17,12" />
    </g>
  );
};

const Plus = () => {
  return (
    <g>
      <path className={prefix('stroke stroke--1')} d="M12,4 L12,20" />
      <path className={prefix('stroke stroke--2')} d="M4,12 L20,12" />
    </g>
  );
};

const PlusRing = () => {
  return (
    <g>
      <circle className={prefix('stroke stroke--1')} cx="12" cy="12" r="9.5" />
      <path className={prefix('stroke stroke--2')} d="M12,7 L12,17" />
      <path className={prefix('stroke stroke--3')} d="M7,12 L17,12" />
    </g>
  );
};

const Search = () => {
  return (
    <g>
      <circle
        className={prefix('stroke stroke--1')}
        cx="10.5"
        cy="10.5"
        r="5"
      />
      <path
        className={prefix('stroke stroke--2')}
        d="M13.88,13.88 L18.12,18.12"
      />
    </g>
  );
};

export default OCIcon;
