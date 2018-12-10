import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../heading/index';
import { prefix } from '../utilities';

const OCFormIntro = props => {
  return (
    <div className={prefix('section__intro')}>
      <Heading level="h3" modifiers={prefix('section__text')}>
        {props.heading}
      </Heading>
      {props.children}
    </div>
  );
};

OCFormIntro.propTypes = {
  heading: PropTypes.string
};

export default OCFormIntro;
