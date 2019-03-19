// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';
import randomise from '../utils/randomise';

// * child imports
import OCBadge from '../badge';

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
const OCAvatar = ({ modifiers, link, firstName, sex, image, value }) => {
  const Tag = typeof link === 'undefined' ? 'div' : 'a';

  return (
    <Tag
      className={
        !modifiers ? prefix('avatar') : `${prefix(`avatar ${modifiers}`)}`
      }
      href={link}
      title={firstName}>
      {Object.keys(coordinates).map(index => {
        return (
          find(`avatar--${index}`, modifiers) &&
          (typeof link !== 'undefined' && (
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
        <OCBadge value={value} modifiers={'badge--error'} />
      )}
      {!find('avatar--s', modifiers) && find('avatar--success', modifiers) && (
        <OCBadge value={value} modifiers={'badge--success'} />
      )}
    </Tag>
  );
};

OCAvatar.propTypes = {
  modifiers: PropTypes.string,
  link: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  sex: PropTypes.oneOf(['female', 'male', 'undisclosed']).isRequired,
  image: PropTypes.string
};

OCAvatar.defaultProps = {
  sex: 'undisclosed',
  modifiers: 'avatar--m'
};

export default OCAvatar;
