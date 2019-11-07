import React from 'react';

import BEM from '../utilities/ts/bem';

import Button from '../button';
import Grid from '../grid';
import GridItem from '../grid-item';
import Heading from '../heading';
import ModalImage from './modal-image';

interface TButton {
  label: string;
  modifiers: string;
  onClick: () => void;
}

interface Props {
  active?: boolean;
  backButton?: {
    label: string;
    modifiers: string;
  };
  buttons?: TButton[];
  children: React.ReactNode;
  className?: string;
  message: string;
  style?: React.CSSProperties;
}

interface State {
  mounted: boolean;
}

export default class Modal extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    active: false,
    backButton: {
      label: `Back`,
      modifiers: `secondary`
    },
    buttons: []
  };

  readonly state: Readonly<State> = {
    mounted: false
  };

  componentDidMount(): void {
    if (this.props.active) {
      setTimeout(() => {
        this.showModal();
      }, 1500);
    }
  }

  showModal = (): void => {
    this.setState({ mounted: true });
  };

  closeModal = (): void => {
    this.setState({ mounted: false });
  };

  render() {
    const { props, state, closeModal } = this;

    const bem = BEM(`modal`);
    bem.addClassNames(props.className);

    return (
      <div
        className={`${bem.getResult()}${state.mounted ? ` mounted` : ``}`}
        style={props.style}>
        <div className={bem.getElement(`outer`)}>
          <ModalImage className={bem.getElement(`image`)} />
          <Heading level={3} modifiers="center">
            {props.message}
          </Heading>
          <div className={bem.getElement(`inner`)}>{props.children}</div>

          <div className={bem.getElement(`actions`)}>
            <Grid modifiers="gutter-x-fixed">
              <GridItem
                modifiers={
                  props.buttons.length > 0 ? `s-6` : `s-12 m-6 nudge-m-3`
                }>
                <Button
                  label={props.backButton.label}
                  modifiers={props.backButton.modifiers}
                  onClick={closeModal}
                />
              </GridItem>
              {props.buttons.length > 0 &&
                props.buttons.map((button, index) => (
                  <GridItem key={index} modifiers={`s-6`}>
                    <Button
                      label={button.label}
                      modifiers={button.modifiers}
                      onClick={button.onClick}
                    />
                  </GridItem>
                ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
