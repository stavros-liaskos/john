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
}) => {
  const handleClickCallback = useCallback(() => {
    handleClickArg ? handleClick(handleClickArg) : handleClick();
  }, [handleClick, handleClickArg]);

  if (!i18n) {
    return null;
  }

  return (
    <button className={`btn flex ${className}`} onClick={handleClickCallback} disabled={disabled} type={type}>
      {loading && <Spin />}
      {i18n}
    </button>
  );
};
Button.whyDidYouRender = true;
export default Button;
