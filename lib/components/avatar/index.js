// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * silbing imports
import OCBadge from '../badge';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';
import randomise from '../utils/randomise';

import coordinates from './data';

// * React component
class OCAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: coordinates
    };
  }

  render() {
    const { props, state } = this;

    const Tag = typeof props.link === 'undefined' ? 'div' : 'a';

    return (
      <Tag
        className={
          !props.modifiers
            ? prefix('avatar')
            : `${prefix(`avatar ${props.modifiers}`)}`
        }
        href={props.link}
        title={props.firstName}>
        {Object.keys(state.coordinates).map(index => {
          return (
            find(`avatar--${index}`, props.modifiers) &&
            (typeof props.link !== 'undefined' && (
              <SVG key={index} {...state.coordinates[index]} />
            ))
          );
        })}
        <div
          className={prefix(
            `avatar__image avatar__image--${
              props.sex === 'female'
                ? `female-${randomise(1, 2)}`
                : props.sex === 'male'
                ? `male-${randomise(1, 2)}`
                : `undisclosed-${randomise(1, 2)}`
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
        {find('avatar--error', props.modifiers) && (
          <OCBadge {...props} modifiers={'badge--error'} />
        )}
        {find('avatar--success', props.modifiers) && (
          <OCBadge {...props} modifiers={'badge--success'} />
        )}
      </Tag>
    );
  }
}

OCAvatar.propTypes = {
  firstName: PropTypes.string.isRequired,
  sex: PropTypes.oneOf(['female', 'male', 'undisclosed']).isRequired,
  image: PropTypes.string,
  link: PropTypes.string,
  modifiers: PropTypes.string
};

OCAvatar.defaultProps = {
  sex: 'undisclosed',
  modifiers: 'avatar--m'
};

const SVG = ({ viewBox, cx, cy, r }) => {
  return (
    <svg className={prefix('avatar__border-outer')} viewBox={viewBox}>
      <circle className={prefix('avatar__border')} cx={cx} cy={cy} r={r} />
    </svg>
  );
};

SVG.propTypes = {
  viewBox: PropTypes.string.isRequired,
  cx: PropTypes.string.isRequired,
  cy: PropTypes.string.isRequired,
  r: PropTypes.string.isRequired
};

export default OCAvatar;
