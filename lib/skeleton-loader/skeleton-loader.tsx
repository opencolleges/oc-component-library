import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const SkeletonLoader: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`skeleton-loader`);
  const { addClassNames, getResult }: BEMInterface = BEM_MODULE;

  addClassNames(props.className);

  return <div className={getResult()} style={props.style} />;
};

export { SkeletonLoader as default };
