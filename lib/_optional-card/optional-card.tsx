import React from 'react';

import Card from '../card';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  visible?: boolean;
}

const OptionalCard: React.FC<Props> = props => {
  return (
    <React.Fragment>
      {props.visible ? (
        <Card
          modifiers={`s ${
            props.disabled || props.readOnly ? 'layer-1' : 'clickable'
          }`}
          tabIndex={false}>
          {props.children}
        </Card>
      ) : (
        props.children
      )}
    </React.Fragment>
  );
};

OptionalCard.defaultProps = {
  disabled: false,
  readOnly: false,
  visible: false
};

export default OptionalCard;
