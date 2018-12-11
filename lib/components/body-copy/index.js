import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

const OCBodyCopy = ({ tag, modifiers, href, target, title, children }) => {
  const Tag = tag;

  return (
    <Tag
      className={!modifiers ? prefix(Tag) : prefix(`${Tag} ${modifiers}`)}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : null}
      title={title}>
      {children}
    </Tag>
  );
};

OCBodyCopy.protoTypes = {
  tag: PropTypes.oneOf([
    'p',
    'a',
    'code',
    'sub',
    'sup',
    'pre',
    'ol',
    'ul',
    'li',
    'em',
    'strong',
    'kbd',
    'abbr',
    'small',
    'mark'
  ]),
  modifiers: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

OCBodyCopy.defaultProps = {
  tag: 'p'
};

export default OCBodyCopy;
