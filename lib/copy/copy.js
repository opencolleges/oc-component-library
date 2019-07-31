// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const Copy = ({
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

  let classNames = namespace(Tag);

  modifiers && (classNames += ` ${namespace(modifiers)}`);
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

Copy.propTypes = {
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

Copy.defaultProps = {
  tag: 'p'
};

export default Copy;
