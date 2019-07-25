// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';
import randomise from '../utilities/js/randomise';

// * child imports
import Badge from '../badge';

const coordinates = {
  s: {
    viewBox: '0 0 32 32',
    cx: '16',
    cy: '16',
    r: '15.5'
  },
  m: {
    viewBox: '0 0 40 40',
    cx: '20',
    cy: '20',
    r: '19.5'
  },
  l: {
    viewBox: '0 0 48 48',
    cx: '24',
    cy: '24',
    r: '23.5'
  }
};

// * React component
const Avatar = ({
  modifiers,
  className,
  style,
  href,
  firstName,
  sex,
  image,
  value
}) => {
  const Tag = typeof href === 'undefined' ? 'div' : 'a';

  let classNames = prefix('avatar');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag className={classNames} style={style} href={href} title={firstName}>
      {Object.keys(coordinates).map(index => {
        return (
          find(`avatar--${index}`, modifiers) &&
          (typeof href !== 'undefined' && (
            <svg
              key={index}
              className={prefix('avatar__border-outer')}
              viewBox={coordinates[index].viewBox}>
              <circle
                className={prefix('avatar__border')}
                cx={coordinates[index].cx}
                cy={coordinates[index].cy}
                r={coordinates[index].r}
              />
            </svg>
          ))
        );
      })}
      <div
        className={prefix(
          `avatar__image avatar__image--${
            sex === 'female'
              ? `female-${randomise(1, 2)}`
              : sex === 'male'
              ? `male-${randomise(1, 2)}`
              : `undisclosed-${randomise(1, 2)}`
          }`
        )}
        style={
          image && {
            background: `url('${image}'), rgb(255, 255, 255)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        }
      />
      {!find('avatar--s', modifiers) && find('avatar--error', modifiers) && (
        <Badge value={value} modifiers={'badge--error'} />
      )}
      {!find('avatar--s', modifiers) && find('avatar--success', modifiers) && (
        <Badge value={value} modifiers={'badge--success'} />
      )}
    </Tag>
  );
};

Avatar.propTypes = {
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  sex: PropTypes.oneOf(['female', 'male', 'undisclosed']).isRequired,
  image: PropTypes.string,
  value: PropTypes.number
};

Avatar.defaultProps = {
  sex: 'undisclosed'
};

export default Avatar;
