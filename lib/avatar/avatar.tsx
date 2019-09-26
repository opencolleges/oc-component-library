import * as React from 'react';

import { AVATAR_COORDINATES } from '../utilities/ts/constants';
import { Props } from './avatar.interface';

import Badge from '../badge';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

const Avatar: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = _.isUndefined(props.href)
    ? 'div'
    : 'a';

  const class_names: string = _.trim(
    `${namespace('avatar', toModifier(props.modifiers, 'avatar'))} ${_.toString(
      props.className
    )}`
  );

  return (
    <Tag
      className={class_names}
      style={props.style}
      href={props.href}
      title={props.firstName}>
      {Object.keys(AVATAR_COORDINATES).map(index => {
        return (
          _.includes(_.split(props.modifiers, ' '), `avatar--${index}`) &&
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
      {!_.includes(_.split(props.modifiers, ' '), 'avatar--s') &&
        _.includes(_.split(props.modifiers, ' '), 'avatar--error') && (
          <Badge value={props.value} modifiers={'badge--error'} />
        )}
      {!_.includes(_.split(props.modifiers, ' '), 'avatar--s') &&
        _.includes(_.split(props.modifiers, ' '), 'avatar--success') && (
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
