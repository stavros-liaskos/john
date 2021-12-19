import { MainProps } from './Main.types';
import List from '../List/List';
import { useEffect, useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';

const Main = ({ i18n, className }: MainProps) => {
  const [list, setList] = useState<ListEl[]>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.json())
      .then(result => setList(result))
      .catch(() => {});
  }, [setList]);

  if (!i18n || !i18n.todo) {
    return null;
  }

  const list2 = [
    {
      name: 'Led Zeppeling',
      href: 'www.google.com',
    },
    {
      name: 'YOYOO',
      href: 'www.google.com',
    },
  ];

  return (
    <main className={className}>
      <h1 className="text-3xl font-bold underline">
        {i18n.todo} to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <Search i18n={searchI18n} />

      <List list={list2} />
    </main>
  );
};

export default Main;
