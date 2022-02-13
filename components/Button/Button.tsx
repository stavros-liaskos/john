import React from 'react';
import { ButtonProps } from './Button.types';

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
      {loading && <div className="loading-icon" />}
      {i18n}
    </button>
  );
};

export default Button;
