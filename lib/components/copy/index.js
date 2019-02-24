import PropTypes from 'prop-types';
import React from 'react';

import { prefix } from '../utilities';

const OCCopy = ({ tag, modifiers, href, target, title, children }) => {
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

OCCopy.protoTypes = {
  tag: PropTypes.oneOf([
    'p',
    'a',
    'blockquote',
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

OCCopy.defaultProps = {
  tag: 'p'
};

export default OCCopy;
