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
  onClick: (() => void) | string;
}

interface Props {
  buttons: TButton[];
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
    buttons: [
      {
        label: ``,
        modifiers: ``,
        onClick: () => {
          return;
        }
      }
    ]
  };

  readonly state: Readonly<State> = {
    mounted: false
  };

  componentDidMount(): void {
    this.showModal();
  }

  handleClick = (): void => {
    this.setState({ mounted: false });
  };

  showModal = (): void => {
    setTimeout(() => {
      this.setState({ mounted: true });
    }, 1500);
  };

  render() {
    const { props, state, handleClick } = this;

    const bem = BEM(`modal`);
    bem.addModifiers(state.mounted ? `mounted` : ``);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <div className={bem.getElement(`outer`)}>
          <ModalImage className={bem.getElement(`image`)} />
          <Heading level={3} modifiers="center">
            {props.message}
          </Heading>
          <div className={bem.getElement(`inner`)}>{props.children}</div>

          <div className={bem.getElement(`actions`)}>
            <Grid modifiers="gutter-x-fixed">
              {props.buttons.length &&
                props.buttons.map((button, index) => (
                  <GridItem
                    key={index}
                    modifiers={props.buttons.length > 1 ? `s-6` : `s-12 m-6`}>
                    <Button
                      label={button.label}
                      modifiers={button.modifiers}
                      onClick={handleClick}
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
