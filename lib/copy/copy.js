// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCCopy = ({
  tag,
  modifiers,
  className,
  style,
  href,
  target,
  title,
  children
}) => {
  const Tag = tag;

  let classNames = prefix(Tag);

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag
      className={classNames}
      style={style}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : null}
      title={title}>
      {children}
    </Tag>
  );
};

OCCopy.propTypes = {
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
    'span',
    'strong',
    'kbd',
    'abbr',
    'small',
    'mark'
  ]),
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
  target: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

OCCopy.defaultProps = {
  tag: 'p'
};

export default OCCopy;
