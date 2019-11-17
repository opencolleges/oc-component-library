import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getLabel from './utilities/get-label';

type ModifierTypes = `error` | `success`;

interface Props {
  className?: string;
  modifiers?: ModifierTypes;
  style?: React.CSSProperties;
  value?: number | string;
}

/**
 *
 * @param props
 *
 * The following `props` are available to the `<Badge />` component.
 *
 * | Name               | Type(s)              | Arguments              |
 * | :----------------- | :------------------- | :--------------------- |
 * | `props.className?` | `string`             |                        |
 * | `props.modifiers?`  | `string`             | `"error"`, `"success"` |
 * | `props.style?`     | `CSS properties`     |                        |
 * | `props.value?`     | `number` \| `string` |                        |
 *
 * @returns
 *
 * ```
 * <!-- Declaration -->
 * <Badge />
 *
 * <!-- Output -->
 * <span class="uds-badge" unselectable="on">0</span>
 *
 * <!-- Declaration -->
 * <Badge modifiers="success" value={100} className="pad-1-rem" />
 *
 * <!-- Output -->
 * <span class="uds-badge uds-badge--success pad-1-rem" unselectable="on">99+</span>
 *
 *  <!-- Declaration -->
 * <Badge modifiers="error" value={12} style={{ zIndex: '9999' }}/>
 *
 * <!-- Output -->
 * <span class="uds-badge uds-badge--error" style="z-index:9999" unselectable="on">9+</span>
 * ```
 *
 */
const Badge: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`badge`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <span className={getResult()} style={props.style} unselectable="on">
      {getLabel(props.value)}
    </span>
  );
};

Badge.defaultProps = {
  value: 0
};

export { Badge as default };
