import { MainProps } from './Main.types';
import { listData } from '../List/List.data';

const props: MainProps = {
  className: 'mb-auto min-h-[calc(100vh_-_6rem)]',
  i18n: { todo: 'toso' },
  defaultList: listData,
};

export default props;
