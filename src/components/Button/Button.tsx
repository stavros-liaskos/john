import React, { useCallback } from 'react';
import { ButtonProps } from './Button.types';
import Spin from '../Icons/spin';

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  i18n,
  handleClick = () => {},
  disabled = false,
  loading = false,
  type = 'button',
  handleClickArg,
  children,
}) => {
  const handleClickCallback = useCallback(() => {
    handleClickArg ? handleClick(handleClickArg) : handleClick();
  }, [handleClick, handleClickArg]);

  if (!i18n && !children) {
    return null;
  }

  return (
    <button
      className={`btn flex ${className ? className : ''}`}
      onClick={handleClickCallback}
      disabled={disabled}
      type={type}
    >
      {loading && <Spin />}
      {i18n}
      {children}
    </button>
  );
};
Button.whyDidYouRender = true;
export default Button;
