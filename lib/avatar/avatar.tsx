import * as _ from 'lodash';
import * as React from 'react';
// * child imports
import Badge from '../badge';
// * Constants
import { AVATAR_COORDINATES } from '../utilities/js/constants';
import find from '../utilities/js/find';
// * Utility className
import namespace from '../utilities/js/namespace';
// * Types
import { IProps } from './avatar.types';

const Avatar: React.FC<IProps> = props => {
  const Tag: keyof JSX.IntrinsicElements = _.isUndefined(props.href)
    ? 'div'
    : 'a';

  const class_names: string = _.trim(
    `${namespace('avatar', props.modifiers)} ${_.toString(props.className)}`
  );

  return (
    <Tag
      className={class_names}
      style={props.style}
      href={props.href}
      title={props.firstName}>
      {Object.keys(AVATAR_COORDINATES).map(index => {
        return (
          find(`avatar--${index}`, props.modifiers) &&
          (!_.isUndefined(props.href) && (
            <svg
              key={index}
              className={namespace('avatar__border-outer')}
              viewBox={AVATAR_COORDINATES[index].viewBox}>
              <circle
                className={namespace('avatar__border')}
                cx={AVATAR_COORDINATES[index].cx}
                cy={AVATAR_COORDINATES[index].cy}
                r={AVATAR_COORDINATES[index].r}
              />
            </svg>
          ))
        );
      })}
      <div
        className={namespace(
          `avatar__image avatar__image--${
            props.sex === 'female'
              ? `female-${_.random(1, 2)}`
              : props.sex === 'male'
              ? `male-${_.random(1, 2)}`
              : `undisclosed-${_.random(1, 2)}`
          }`
        )}
        style={
          props.image && {
            background: `url('${props.image}'), rgb(255, 255, 255)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        }
      />
      {!find('avatar--s', props.modifiers) &&
        find('avatar--error', props.modifiers) && (
          <Badge value={props.value} modifiers={'badge--error'} />
        )}
      {!find('avatar--s', props.modifiers) &&
        find('avatar--success', props.modifiers) && (
          <Badge value={props.value} modifiers={'badge--success'} />
        )}
    </Tag>
  );
};

Avatar.defaultProps = {
  firstName: '',
  sex: 'undisclosed'
};

export default Avatar;
// * React imports
// import PropTypes from 'prop-types';
// import React from 'react';

// * utility imports
// import find from '../utilities/js/find';
// import namespace from '../utilities/js/namespace';
// import randomise from '../utilities/js/randomise';

// * child imports
// import Badge from '../badge';

// const coordinates = {
//   s: {
//     viewBox: '0 0 32 32',
//     cx: '16',
//     cy: '16',
//     r: '15.5'
//   },
//   m: {
//     viewBox: '0 0 40 40',
//     cx: '20',
//     cy: '20',
//     r: '19.5'
//   },
//   l: {
//     viewBox: '0 0 48 48',
//     cx: '24',
//     cy: '24',
//     r: '23.5'
//   }
// };

// * React component
// const Avatar = ({
//   modifiers,
//   className,
//   style,
//   href,
//   firstName,
//   sex,
//   image,
//   value
// }) => {
//   const Tag = typeof href === 'undefined' ? 'div' : 'a';

//   let classNames = namespace('avatar');

//   modifiers && (classNames += ` ${namespace(modifiers)}`);
//   className && (classNames += ` ${className}`);

//   return (
//     <Tag className={classNames} style={style} href={href} title={firstName}>
//       {Object.keys(coordinates).map(index => {
//         return (
//           find(`avatar--${index}`, modifiers) &&
//           (typeof href !== 'undefined' && (
//             <svg
//               key={index}
//               className={namespace('avatar__border-outer')}
//               viewBox={coordinates[index].viewBox}>
//               <circle
//                 className={namespace('avatar__border')}
//                 cx={coordinates[index].cx}
//                 cy={coordinates[index].cy}
//                 r={coordinates[index].r}
//               />
//             </svg>
//           ))
//         );
//       })}
//       <div
//         className={namespace(
//           `avatar__image avatar__image--${
//             sex === 'female'
//               ? `female-${_.random(1, 2)}`
//               : sex === 'male'
//               ? `male-${_.random(1, 2)}`
//               : `undisclosed-${_.random(1, 2)}`
//           }`
//         )}
//         style={
//           image && {
//             background: `url('${image}'), rgb(255, 255, 255)`,
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: 'cover'
//           }
//         }
//       />
//       {!find('avatar--s', modifiers) && find('avatar--error', modifiers) && (
//         <Badge value={value} modifiers={'badge--error'} />
//       )}
//       {!find('avatar--s', modifiers) && find('avatar--success', modifiers) && (
//         <Badge value={value} modifiers={'badge--success'} />
//       )}
//     </Tag>
//   );
// };

// Avatar.propTypes = {
//   modifiers: PropTypes.string,
//   className: PropTypes.string,
//   style: PropTypes.object,
//   href: PropTypes.string,
//   firstName: PropTypes.string.isRequired,
//   sex: PropTypes.oneOf(['female', 'male', 'undisclosed']).isRequired,
//   image: PropTypes.string,
//   value: PropTypes.number
// };

// Avatar.defaultProps = {
//   sex: 'undisclosed'
// };

// export default Avatar;