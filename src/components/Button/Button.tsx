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
    if (!disabled) {
      handleClickArg ? handleClick(handleClickArg) : handleClick();
    }
  }, [handleClick, handleClickArg, disabled]);

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
      {loading && (
        <span className="flex justify-center items-center -ml-1 mr-3 h-5 w-5">
          <Spin width={20} />
        </span>
      )}
      {i18n}
      {children}
    </button>
  );
};
Button.whyDidYouRender = true;
export default Button;
