import React from 'react';

export interface ButtonProps {
  i18n: string;
  className?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit';
}
