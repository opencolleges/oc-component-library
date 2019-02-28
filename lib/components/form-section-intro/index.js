// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCHeading from '../heading';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCFormSectionIntro = ({ heading, children }) => {
  return (
    <div className={prefix('form__section-intro')}>
      <OCHeading level={3}>{heading}</OCHeading>
      {children}
    </div>
  );
};

OCFormSectionIntro.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default OCFormSectionIntro;
