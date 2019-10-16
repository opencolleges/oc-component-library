import _ from 'lodash';

// ! This import will be redundant after addNamespace() is moved to it's own
// ! file...
import { NAMESPACE } from './constants';

// ! Need to move this function into it's own file after all refactoring, and
// ! deprecate namespace()...
const addNamespace = (className: string): string => {
  className = _.trim(className);

  return `${NAMESPACE}-${className}`;
};

const ELEMENT_SEPARATOR: string = '__';
const MODIFIER_SEPARATOR: string = '--';

const BEM = (block: string) => {
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
      if (modifier && result.indexOf(modifier) === -1) {
        result += ` ${getModifier(modifier)}`;
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
