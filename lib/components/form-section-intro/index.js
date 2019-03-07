// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * child imports
import OCHeading from '../heading';

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
