export interface ButtonProps {
  i18n: string;
  className?: string;
  handleClick?: (...args: number[]) => void;
  handleClickArg?: number;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit';
}
