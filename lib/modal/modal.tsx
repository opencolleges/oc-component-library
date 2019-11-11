import React from 'react';
import Button from '../button';
import Grid from '../grid';
import GridItem from '../grid-item';
import Heading from '../heading';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import ModalImage from './modal-image';

interface TButton {
  label: string;
  modifiers: string;
  onClick: () => void;
}

interface Props {
  active?: boolean;
  buttons?: TButton[];
  children: React.ReactNode;
  className?: string;
  closeButton?: {
    label: string;
    modifiers: string;
  };
  message: string;
  style?: React.CSSProperties;
}

interface State {
  mounted: boolean;
}

class Modal extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    active: false,
    buttons: [],
    closeButton: {
      label: `Close`,
      modifiers: `secondary`
    }
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

    const BEM_MODULE: BEMInterface = BEM(`modal`);
    const { addClassNames, getElement, getResult }: BEMInterface = BEM_MODULE;

    addClassNames(props.className);

    return (
      <div
        className={`${getResult()}${state.mounted ? ` mounted` : ``}`}
        style={props.style}>
        <div className={getElement(`outer`)}>
          <ModalImage className={getElement(`image`)} />
          <Heading level={3} modifiers="center">
            {props.message}
          </Heading>
          <div className={getElement(`inner`)}>{props.children}</div>

          <div className={getElement(`actions`)}>
            <Grid modifiers="gutter-x-fixed">
              <GridItem
                modifiers={
                  props.buttons.length > 0 ? `s-6` : `s-12 m-6 nudge-m-3`
                }>
                <Button
                  label={props.closeButton.label}
                  modifiers={props.closeButton.modifiers}
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

export { Modal as default };
