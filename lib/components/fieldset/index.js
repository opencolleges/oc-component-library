import React from 'react';
import PropTypes from 'prop-types';

import { prefix } from '../utilities';

import OCDivider from '../divider';

const OCFieldset = ({ name, instruction, children, modifiers }) => {
  return (
    <fieldset>
      <div className={prefix('grid grid--gutter-x-fixed')}>
        <div className={prefix('grid__item grid__item--s-12')}>
          <legend className={prefix('h6')}>{name}</legend>
          {instruction && <p className={prefix('p')}>{instruction}</p>}
        </div>
        {children.length > 1 ? (
          children.map((child, index) => (
            <div
              key={index}
              className={
                !modifiers
                  ? prefix('grid__item grid__item--s-12')
                  : `${prefix(`grid__item ${modifiers}`)}`
              }>
              {child}
            </div>
          ))
        ) : (
          <div
            className={
              !modifiers
                ? prefix('grid__item grid__item--s-12')
                : `${prefix(`grid__item ${modifiers}`)}`
            }>
            {children}
          </div>
        )}
      </div>
      <OCDivider modifiers="divider--m divider--alt" />
    </fieldset>
  );
};

OCFieldset.propTypes = {
  name: PropTypes.string,
  instruction: PropTypes.string,
  modifiers: PropTypes.string
};

export default OCFieldset;
