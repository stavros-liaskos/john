import { ListEl } from '../List/List.types';

export interface MainI18n {
  todo: string;
}

export interface MainProps {
  i18n: MainI18n;
  className: string;
  defaultList?: ListEl[];
}
