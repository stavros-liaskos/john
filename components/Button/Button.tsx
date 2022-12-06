import React from 'react';
import { ButtonProps } from './Button.types';
import Spin from '../Icons/spin';

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  i18n,
  onClick = () => {},
  disabled = false,
  loading = false,
  type,
}) => {
  if (!i18n) {
    return null;
  }

  return (
    <button className={`btn flex ${className}`} onClick={onClick} disabled={disabled} type={type}>
      {loading && <Spin />}
      {i18n}
    </button>
  );
};
Button.whyDidYouRender = true;
export default Button;
