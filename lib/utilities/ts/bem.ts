import _ from 'lodash';

import addNamespace from './add-namespace';

import { ELEMENT_SEPARATOR, MODIFIER_SEPARATOR } from './constants';

interface Bem {
  addClassNames: (classNames: string) => void;
  addModifiers: (modifiers: string, blockOrElement?: string) => void;
  getElement: (element: string) => string;
  getModifier: (modifier: string, blockOrElement?: string) => string;
  getResult: () => string;
}

const BEM = (block: string): Bem => {
  const BLOCK: string = block;
  let result: string = addNamespace(BLOCK);

  const addBEMSyntax = (
    elementOrModifier: string,
    separator: string,
    blockOrElement: string = BLOCK
  ): string => {
    if (elementOrModifier.indexOf(`${blockOrElement}${separator}`) !== -1) {
      return addNamespace(elementOrModifier);
    }

    return addNamespace(`${blockOrElement}${separator}${elementOrModifier}`);
  };

  // Public
  const addClassNames = (classNames: string): void => {
    classNames = _.trim(classNames);

    const CLASS_NAMES: string[] = _.split(classNames, /\s+/g);
    _.forEach(CLASS_NAMES, (className: string) => {
      if (className && result.indexOf(className) === -1) {
        result += ` ${className}`;
      }
    });
  };

  const addModifiers = (
    modifiers: string,
    blockOrElement: string = BLOCK
  ): void => {
    modifiers = _.trim(modifiers);
    blockOrElement = _.trim(blockOrElement);

    if (blockOrElement.indexOf(BLOCK) === -1) {
      blockOrElement = `${BLOCK}${ELEMENT_SEPARATOR}${blockOrElement}`;
    }

    const MODIFIERS: string[] = _.split(modifiers, /\s+/g);

    _.forEach(MODIFIERS, (modifier: string) => {
      modifier = modifier && getModifier(modifier);

      if (modifier && result.indexOf(modifier) === -1) {
        result += ` ${modifier}`;
      }
    });
  };

  const getElement = (element: string): string => {
    element = _.trim(element);

    return addBEMSyntax(element, ELEMENT_SEPARATOR);
  };

  const getModifier = (
    modifier: string,
    blockOrElement: string = BLOCK
  ): string => {
    modifier = _.trim(modifier);
    blockOrElement = _.trim(blockOrElement);

    if (blockOrElement.indexOf(BLOCK) === -1) {
      blockOrElement = `${BLOCK}${ELEMENT_SEPARATOR}${blockOrElement}`;
    }

    return addBEMSyntax(modifier, MODIFIER_SEPARATOR, blockOrElement);
  };

  const getResult = (): string => {
    return result;
  };

  return {
    addClassNames,
    addModifiers,
    getElement,
    getModifier,
    getResult
  };
};

export default BEM;
